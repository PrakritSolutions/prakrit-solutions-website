export type ContactPayload = {
  name: string;
  company: string;
  email: string;
  phone: string;
  project: string;
  services: string[];
  budget: string;
  timeline: string;
  message: string;
  source: string;
};

export type ConfirmationConfig = {
  name: string;
  url: string;
  hours: string;
  bookingUrl: string;
  location: string;
};

export function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

const INK = "#091127";
const MUTED = "#5d5f68";
const ACCENT = "#0032ea";
const LINE = "#e6e5df";
const PAPER = "#f4f3ee";
const FONT = "-apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif";

function submittedRows(payload: ContactPayload): [string, string][] {
  const rows: [string, string][] = [
    ["Name", payload.name],
    ["Company", payload.company],
    ["Email", payload.email],
    ["Phone", payload.phone],
    ["Services", payload.services.join(", ")],
    ["Budget", payload.budget],
    ["Timeline", payload.timeline],
  ];
  return rows.filter(([, value]) => value.trim() !== "");
}

export function buildConfirmationEmail(payload: ContactPayload, config: ConfirmationConfig) {
  const rows = submittedRows(payload);
  const intro = `Dear ${payload.name},`;
  const body = `Thank you for contacting ${config.name}. We have received your enquiry and will respond within one to two business days (${config.hours}).`;
  const followUp = "If you would like to add anything, simply reply to this email.";

  const text = [
    intro,
    "",
    body,
    "",
    followUp,
    `If you would prefer to speak directly, you may book a 30-minute call: ${config.bookingUrl}`,
    "",
    "YOUR SUBMISSION",
    ...rows.map(([label, value]) => `${label}: ${value}`),
    "",
    "Project:",
    payload.project,
    ...(payload.message ? ["", "Additional information:", payload.message] : []),
    "",
    "Kind regards,",
    config.name,
  ].join("\n");

  const detailRows = rows
    .map(
      ([label, value], index) => `
        <tr>
          <td style="padding: 12px 0; ${index > 0 ? `border-top: 1px solid ${LINE};` : ""}">
            <div style="font-size: 11px; letter-spacing: 0.08em; text-transform: uppercase; color: ${MUTED}; margin-bottom: 3px;">${escapeHtml(label)}</div>
            <div style="font-size: 15px; color: ${INK}; line-height: 1.45;">${escapeHtml(value)}</div>
          </td>
        </tr>`
    )
    .join("");

  const textBlock = (label: string, value: string) => `
        <div style="font-size: 11px; letter-spacing: 0.08em; text-transform: uppercase; color: ${MUTED}; margin: 18px 0 6px;">${escapeHtml(label)}</div>
        <div style="border-left: 3px solid ${ACCENT}; background: #ffffff; padding: 12px 14px; font-size: 15px; line-height: 1.55; color: ${INK}; white-space: pre-wrap;">${escapeHtml(value)}</div>`;

  const html = `<!doctype html>
<html>
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
  </head>
  <body style="margin: 0; padding: 0; background: ${PAPER};">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background: ${PAPER}; padding: 24px 12px;">
      <tr>
        <td align="center">
          <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="width: 100%; max-width: 600px; background: #ffffff; border: 1px solid ${LINE}; border-radius: 12px; overflow: hidden; font-family: ${FONT};">
            <tr><td style="height: 4px; background: ${ACCENT}; font-size: 0; line-height: 0;">&nbsp;</td></tr>
            <tr>
              <td style="padding: 28px 32px 0;">
                <div style="font-size: 18px; font-weight: 700; color: ${INK}; letter-spacing: -0.01em;">${escapeHtml(config.name)}</div>
                <div style="font-size: 11px; letter-spacing: 0.12em; text-transform: uppercase; color: ${ACCENT}; margin-top: 4px;">Enquiry received</div>
              </td>
            </tr>
            <tr>
              <td style="padding: 24px 32px 8px; font-size: 15px; line-height: 1.6; color: ${INK};">
                <p style="margin: 0 0 14px;">${escapeHtml(intro)}</p>
                <p style="margin: 0 0 14px;">${escapeHtml(body)}</p>
                <p style="margin: 0 0 22px;">${escapeHtml(followUp)}</p>
                <table role="presentation" cellpadding="0" cellspacing="0"><tr>
                  <td style="background: ${ACCENT}; border-radius: 8px;">
                    <a href="${escapeHtml(config.bookingUrl)}" style="display: inline-block; padding: 12px 22px; font-size: 14px; font-weight: 600; color: #ffffff; text-decoration: none;">Book a 30-minute call</a>
                  </td>
                </tr></table>
              </td>
            </tr>
            <tr>
              <td style="padding: 28px 32px 32px;">
                <div style="background: ${PAPER}; border-radius: 10px; padding: 18px 22px;">
                  <div style="font-size: 12px; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase; color: ${INK}; padding-bottom: 4px;">Your submission</div>
                  <table role="presentation" width="100%" cellpadding="0" cellspacing="0">${detailRows}</table>
                  ${textBlock("Project", payload.project)}
                  ${payload.message ? textBlock("Additional information", payload.message) : ""}
                </div>
                <p style="margin: 24px 0 0; font-size: 15px; line-height: 1.6; color: ${INK};">Kind regards,<br />${escapeHtml(config.name)}</p>
              </td>
            </tr>
            <tr>
              <td style="padding: 16px 32px; border-top: 1px solid ${LINE}; font-size: 12px; line-height: 1.5; color: ${MUTED};">
                You are receiving this because this address was entered on the contact form at ${escapeHtml(config.url.replace(/^https?:\/\//, ""))}. ${escapeHtml(config.location)}.
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;

  return { text, html };
}
