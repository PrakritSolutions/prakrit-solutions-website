/**
 * Enquiry tracker: receives contact-form enquiries from the website and
 * appends them as rows. Paste into Extensions > Apps Script in the tracker
 * Sheet, then follow README.md in this folder.
 */

const SHEET_NAME = "Enquiries";
const HEADERS = [
  "Received (IST)", "Name", "Company", "Email", "Phone", "Services",
  "Budget", "Timeline", "Project", "Additional information",
  "Status", "Reply due", "Next step", "Notes",
];
const STATUSES = ["New", "Contacted", "Call booked", "Proposal sent", "Won", "Lost"];
const STATUS_COL = 11; // K
const REPLY_DUE_BUSINESS_DAYS = 2;
const FIRST_DATA_ROW = 2;
const MAX_ROWS = 2000;

/** Run once from the editor: builds headers, dropdown and colour rules. */
function setup() {
  const ss = SpreadsheetApp.getActive();
  ss.setSpreadsheetTimeZone("Asia/Kolkata");

  const sheet = ss.getSheetByName(SHEET_NAME) || ss.insertSheet(SHEET_NAME);
  sheet.clear();
  sheet.clearConditionalFormatRules();

  sheet.getRange(1, 1, 1, HEADERS.length).setValues([HEADERS])
    .setFontWeight("bold").setBackground("#091127").setFontColor("#ffffff");
  sheet.setFrozenRows(1);
  sheet.setFrozenColumns(2);

  // Plain text for the data columns so nothing a visitor types is ever
  // interpreted as a formula, and phone numbers like +91... stay intact.
  sheet.getRange(FIRST_DATA_ROW, 2, MAX_ROWS, 9).setNumberFormat("@");
  sheet.getRange(FIRST_DATA_ROW, 1, MAX_ROWS, 1).setNumberFormat("dd mmm yyyy hh:mm");
  sheet.getRange(FIRST_DATA_ROW, 12, MAX_ROWS, 1).setNumberFormat("ddd, dd mmm");

  sheet.getRange(FIRST_DATA_ROW, STATUS_COL, MAX_ROWS, 1).setDataValidation(
    SpreadsheetApp.newDataValidation().requireValueInList(STATUSES, true).setAllowInvalid(false).build()
  );

  const rows = sheet.getRange(FIRST_DATA_ROW, 1, MAX_ROWS, HEADERS.length);
  sheet.setConditionalFormatRules([
    SpreadsheetApp.newConditionalFormatRule()
      .whenFormulaSatisfied('=AND($K2="New",$L2<>"",$L2<TODAY())')
      .setBackground("#fde7c0").setRanges([rows]).build(),
    SpreadsheetApp.newConditionalFormatRule()
      .whenFormulaSatisfied('=$K2="Won"')
      .setBackground("#d9f2e6").setRanges([rows]).build(),
    SpreadsheetApp.newConditionalFormatRule()
      .whenFormulaSatisfied('=$K2="Lost"')
      .setFontColor("#8a8c94").setRanges([rows]).build(),
  ]);

  sheet.getRange(1, 1, MAX_ROWS + 1, HEADERS.length).createFilter();
  const widths = [130, 130, 140, 200, 120, 160, 130, 110, 320, 260, 120, 110, 220, 260];
  widths.forEach((w, i) => sheet.setColumnWidth(i + 1, w));
  sheet.getRange(FIRST_DATA_ROW, 9, MAX_ROWS, 2).setWrap(true);
  sheet.getRange(FIRST_DATA_ROW, 1, MAX_ROWS, HEADERS.length).setVerticalAlignment("top");
}

function doPost(e) {
  try {
    const body = JSON.parse(e.postData.contents);
    const secret = PropertiesService.getScriptProperties().getProperty("WEBHOOK_SECRET");
    if (!secret || body.secret !== secret) return respond({ ok: false, error: "unauthorized" });

    const q = body.enquiry || {};
    const sheet = SpreadsheetApp.getActive().getSheetByName(SHEET_NAME);
    if (!sheet) return respond({ ok: false, error: "sheet not found: run setup()" });

    const lock = LockService.getScriptLock();
    lock.waitLock(10000);
    try {
      const row = Math.max(sheet.getLastRow() + 1, FIRST_DATA_ROW);
      sheet.getRange(row, 1).setValue(new Date());
      sheet.getRange(row, 2, 1, 9).setValues([[
        q.name, q.company, q.email, q.phone, q.services,
        q.budget, q.timeline, q.project, q.message,
      ].map(function (v) { return String(v == null ? "" : v).slice(0, 5000); })]);
      sheet.getRange(row, STATUS_COL).setValue("New");
      sheet.getRange(row, 12).setFormula("=WORKDAY(INT(A" + row + ")," + REPLY_DUE_BUSINESS_DAYS + ")");
    } finally {
      lock.releaseLock();
    }
    return respond({ ok: true });
  } catch (err) {
    return respond({ ok: false, error: String(err) });
  }
}

function respond(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}
