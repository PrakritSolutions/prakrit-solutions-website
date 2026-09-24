import type { ContactPayload } from "@/lib/contact-email";

const REQUEST_TIMEOUT_MS = 8000;

// Appends the enquiry as a row in the Google Sheet tracker (see
// integrations/google-sheets). Never throws: the enquiry email is the primary
// record, so a tracker failure is logged and otherwise ignored.
export async function logEnquiryToSheet(payload: ContactPayload): Promise<void> {
  const url = process.env.SHEETS_WEBHOOK_URL;
  const secret = process.env.SHEETS_WEBHOOK_SECRET;
  if (!url || !secret) return;

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "text/plain;charset=utf-8" },
      body: JSON.stringify({
        secret,
        enquiry: {
          name: payload.name,
          company: payload.company,
          email: payload.email,
          phone: payload.phone,
          services: payload.services.join(", "),
          budget: payload.budget,
          timeline: payload.timeline,
          project: payload.project,
          message: payload.message,
        },
      }),
      signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS),
    });

    const result: { ok?: boolean; error?: string } | null = await response
      .json()
      .catch(() => null);

    if (!response.ok || !result?.ok) {
      console.error("[contact] sheet log failed", response.status, result?.error ?? "");
    }
  } catch (error) {
    console.error("[contact] sheet log threw", error);
  }
}
