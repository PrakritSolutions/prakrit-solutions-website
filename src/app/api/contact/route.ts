import { NextResponse } from "next/server";

type ContactPayload = {
  name: string;
  company: string;
  email: string;
  phone: string;
  project: string;
  services: string[];
  budget: string;
  timeline: string;
  message: string;
};

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  let payload: Partial<ContactPayload>;

  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
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

  // Wire up an email/CRM provider here (e.g. Resend, Postmark) using an
  // API key from the environment. Without one configured, enquiries are
  // logged server-side so the form remains usable end to end.
  if (process.env.RESEND_API_KEY) {
    // Intentionally left as a placeholder: add the provider call once
    // RESEND_API_KEY (or an equivalent) is configured for this environment.
  }

  console.info("[contact] new enquiry", {
    name,
    email,
    company: payload.company,
    project,
    services: payload.services,
    budget: payload.budget,
    timeline: payload.timeline,
  });

  return NextResponse.json({ ok: true });
}
