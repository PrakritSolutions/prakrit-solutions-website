/**
 * Enquiry tracker: receives contact-form enquiries from the website and
 * appends them as rows. Paste into Extensions > Apps Script in the tracker
 * Sheet, then follow README.md in this folder.
 */

const SHEET_NAME = "Enquiries";
const HEADERS = [
  "Received (IST)", "Name", "Company", "Email", "Phone", "Services",
  "Budget", "Timeline", "Project", "Additional information",
  "Status", "Reply due", "Next step", "Notes", "Source", "Fit",
];
const STATUSES = ["New", "Contacted", "Call booked", "Proposal sent", "Won", "Lost"];
const STATUS_COL = 11; // K
const SOURCE_COL = 15; // O
const FIT_COL = 16; // P
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

  // Plain text for the data columns so values like "1-3 months" are not
  // turned into dates. This does NOT stop setValues from evaluating text that
  // starts with "=": see safeCell() for the formula-injection guard.
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

    const sheet = SpreadsheetApp.getActive().getSheetByName(SHEET_NAME);
    if (!sheet) return respond({ ok: false, error: "sheet not found: run setup()" });

    if (body.action === "list") return respond(listRows(sheet, body.limit));

    const q = body.enquiry || {};

    const lock = LockService.getScriptLock();
    lock.waitLock(10000);
    try {
      const row = Math.max(sheet.getLastRow() + 1, FIRST_DATA_ROW);
      sheet.getRange(row, 1).setValue(new Date());
      sheet.getRange(row, 2, 1, 9).setValues([[
        q.name, q.company, q.email, q.phone, q.services,
        q.budget, q.timeline, q.project, q.message,
      ].map(safeCell)]);
      sheet.getRange(row, STATUS_COL).setValue("New");
      sheet.getRange(row, SOURCE_COL).setValue(safeCell(q.source));
      sheet.getRange(row, 12).setFormula("=WORKDAY(INT(A" + row + ")," + REPLY_DUE_BUSINESS_DAYS + ")");
    } finally {
      lock.releaseLock();
    }
    return respond({ ok: true });
  } catch (err) {
    return respond({ ok: false, error: String(err) });
  }
}

/**
 * Visitor input goes straight into cells. Text beginning with = + - @ (or a
 * control character) would otherwise be evaluated as a formula, so it gets a
 * leading space, which keeps it as literal text.
 */
function safeCell(value) {
  const text = String(value == null ? "" : value).slice(0, 5000);
  return /^[=+\-@\t\r]/.test(text) ? " " + text : text;
}

/** Read-only: the most recent rows as objects. Used for reporting; never changes data. */
function listRows(sheet, limit) {
  const n = Math.max(1, Math.min(200, Number(limit) || 50));
  const last = sheet.getLastRow();
  if (last < FIRST_DATA_ROW) return { ok: true, rows: [] };
  const width = Math.max(sheet.getLastColumn(), FIT_COL);
  const start = Math.max(FIRST_DATA_ROW, last - n + 1);
  const headers = sheet.getRange(1, 1, 1, width).getValues()[0];
  const values = sheet.getRange(start, 1, last - start + 1, width).getValues();
  const rows = values.map(function (r) {
    const o = {};
    headers.forEach(function (h, i) {
      const v = r[i];
      o[String(h)] = v instanceof Date ? v.toISOString() : v;
    });
    return o;
  });
  return { ok: true, rows: rows };
}

/**
 * Run ONCE, after pasting this version, on a Sheet that already holds enquiries.
 * Adds the Source and Fit columns without touching existing rows. Do not run
 * setup() on a live Sheet: it clears everything.
 */
function upgrade() {
  const sheet = SpreadsheetApp.getActive().getSheetByName(SHEET_NAME);
  if (!sheet) throw new Error("Enquiries sheet not found");

  sheet.getRange(1, SOURCE_COL, 1, 2).setValues([["Source", "Fit"]])
    .setFontWeight("bold").setBackground("#091127").setFontColor("#ffffff");
  sheet.getRange(FIRST_DATA_ROW, SOURCE_COL, MAX_ROWS, 1).setNumberFormat("@");
  sheet.getRange(FIRST_DATA_ROW, FIT_COL, MAX_ROWS, 1).setDataValidation(
    SpreadsheetApp.newDataValidation().requireValueInList(["A", "B", "C"], true).setAllowInvalid(false).build()
  );
  sheet.setColumnWidth(SOURCE_COL, 170);
  sheet.setColumnWidth(FIT_COL, 60);

  // The filter created by setup() stops at column N; extend it to include the new columns.
  const existing = sheet.getFilter();
  if (existing) existing.remove();
  sheet.getRange(1, 1, MAX_ROWS + 1, FIT_COL).createFilter();
}

function respond(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}
