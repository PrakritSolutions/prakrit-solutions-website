import { NextResponse } from "next/server";
import { siteConfig } from "@/lib/site-config";
import { logEnquiryToSheet } from "@/lib/enquiry-log";
import {
  buildConfirmationEmail,
  escapeHtml,
  type ContactPayload,
} from "@/lib/contact-email";

const RATE_LIMIT_MAX = 5;
const RATE_LIMIT_WINDOW_MS = 60 * 60 * 1000;
const recentSubmissions = new Map<string, number[]>();

// Best-effort limiter: state is per server instance, so it slows a single
// abuser rather than guaranteeing a global cap.
function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const recent = (recentSubmissions.get(ip) ?? []).filter(
    (time) => now - time < RATE_LIMIT_WINDOW_MS
  );
  if (recent.length >= RATE_LIMIT_MAX) {
    recentSubmissions.set(ip, recent);
    return true;
  }
  recent.push(now);
  recentSubmissions.set(ip, recent);
  return false;
}

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function buildEmail(payload: ContactPayload, trackerUrl?: string) {
  const rows: [string, string][] = [
    ["Name", payload.name],
    ["Company", payload.company || "—"],
    ["Email", payload.email],
    ["Phone", payload.phone || "—"],
    ["Services", payload.services.length ? payload.services.join(", ") : "—"],
    ["Budget", payload.budget || "—"],
    ["Timeline", payload.timeline || "—"],
  ];

  const text = [
    ...rows.map(([label, value]) => `${label}: ${value}`),
    "",
    "Project:",
    payload.project,
    ...(payload.message ? ["", "Additional information:", payload.message] : []),
    ...(trackerUrl ? ["", `Open enquiry tracker: ${trackerUrl}`] : []),
  ].join("\n");

  const html = `
    <div style="font-family: -apple-system, sans-serif; max-width: 560px; margin: 0 auto;">
      <h2 style="margin-bottom: 4px;">New project enquiry</h2>
      <table style="width: 100%; border-collapse: collapse; margin: 16px 0;">
        ${rows
          .map(
            ([label, value]) => `
          <tr>
            <td style="padding: 4px 12px 4px 0; color: #5d5f68; white-space: nowrap; vertical-align: top;">${escapeHtml(label)}</td>
            <td style="padding: 4px 0;">${escapeHtml(value)}</td>
          </tr>`
          )
          .join("")}
      </table>
      <p style="color: #5d5f68; margin-bottom: 4px;">Project</p>
      <p style="white-space: pre-wrap;">${escapeHtml(payload.project)}</p>
      ${
        payload.message
          ? `<p style="color: #5d5f68; margin-bottom: 4px;">Additional information</p>
             <p style="white-space: pre-wrap;">${escapeHtml(payload.message)}</p>`
          : ""
      }
      ${
        trackerUrl
          ? `<p style="margin-top: 20px;"><a href="${escapeHtml(trackerUrl)}">Open enquiry tracker</a></p>`
          : ""
      }
    </div>
  `;

  return { text, html };
}

export async function POST(request: Request) {
  let payload: Partial<ContactPayload> & { website?: string };

  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  // Honeypot: real visitors never see or fill this field. Pretend success so
  // bots get no signal, and send nothing.
  if (typeof payload.website === "string" && payload.website.trim() !== "") {
    return NextResponse.json({ ok: true });
  }

  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  if (isRateLimited(ip)) {
    return NextResponse.json(
      { error: "Too many submissions. Please try again later." },
      { status: 429 }
    );
  }

  const name = payload.name?.trim();
  const email = payload.email?.trim();
  const project = payload.project?.trim();

  if (!name || !email || !project || !EMAIL_PATTERN.test(email)) {
    return NextResponse.json(
      { error: "Name, a valid email, and a project description are required." },
      { status: 400 }
    );
  }

  const full: ContactPayload = {
    name,
    company: payload.company?.trim() ?? "",
    email,
    phone: payload.phone?.trim() ?? "",
    project,
    services: payload.services ?? [],
    budget: payload.budget ?? "",
    timeline: payload.timeline ?? "",
    message: payload.message?.trim() ?? "",
  };

  console.info("[contact] new enquiry", {
    name: full.name,
    email: full.email,
    company: full.company,
    services: full.services,
    budget: full.budget,
    timeline: full.timeline,
  });

  // Runs alongside the emails; never throws.
  const sheetLog = logEnquiryToSheet(full);

  if (process.env.RESEND_API_KEY) {
    const { text, html } = buildEmail(full, process.env.SHEETS_URL);
    const subject = `New project enquiry from ${full.name}${full.company ? ` (${full.company})` : ""}`;

    const resendResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: `Prakrit Solutions <${siteConfig.noreplyEmail}>`,
        to: [siteConfig.email],
        reply_to: full.email,
        subject,
        text,
        html,
      }),
    });

    if (!resendResponse.ok) {
      const errorBody = await resendResponse.text().catch(() => "");
      console.error("[contact] Resend send failed", resendResponse.status, errorBody);
      await sheetLog;
      return NextResponse.json({ error: "Failed to send enquiry." }, { status: 502 });
    }

    // Courtesy confirmation to the visitor. The enquiry has already reached us,
    // so a failure here is logged and never surfaced as a form error.
    try {
      const confirmation = buildConfirmationEmail(full, siteConfig);
      const confirmationResponse = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: `${siteConfig.name} <${siteConfig.noreplyEmail}>`,
          to: [full.email],
          reply_to: siteConfig.email,
          subject: `We have received your enquiry — ${siteConfig.name}`,
          text: confirmation.text,
          html: confirmation.html,
        }),
      });

      if (!confirmationResponse.ok) {
        const errorBody = await confirmationResponse.text().catch(() => "");
        console.error("[contact] confirmation send failed", confirmationResponse.status, errorBody);
      }
    } catch (error) {
      console.error("[contact] confirmation send threw", error);
    }
  }

  await sheetLog;

  return NextResponse.json({ ok: true });
}
