"use client";

import { useEffect, useId, useRef, useState, type FormEvent } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRightIcon, CheckIcon } from "@/components/icons";
import { ATTRIBUTION_KEY } from "@/components/analytics/attribution";

type Status = "idle" | "submitting" | "success" | "error";
type FieldErrors = Partial<Record<"email" | "project", string>>;

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const inputClasses =
  "w-full rounded-[var(--radius-sm)] border border-line-strong bg-paper px-4 py-3 text-[0.9375rem] text-ink placeholder:text-muted transition-colors focus-visible:border-accent";

function readAttribution(): Record<string, string> | null {
  try {
    const raw = window.sessionStorage.getItem(ATTRIBUTION_KEY);
    return raw ? (JSON.parse(raw) as Record<string, string>) : null;
  } catch {
    return null;
  }
}

// Two-field version of the enquiry form for visitors who are not ready to
// describe a whole project. It posts to the same endpoint as the full form.
export function QuickContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<FieldErrors>({});
  const [serverError, setServerError] = useState<string | null>(null);
  const successRef = useRef<HTMLHeadingElement>(null);
  const formId = useId();

  useEffect(() => {
    if (status === "success") successRef.current?.focus();
  }, [status]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setServerError(null);

    const form = event.currentTarget;
    const data = new FormData(form);
    const email = String(data.get("email") || "").trim();
    const project = String(data.get("project") || "").trim();

    const fieldErrors: FieldErrors = {};
    if (!email) fieldErrors.email = "Enter your email address.";
    else if (!EMAIL_PATTERN.test(email))
      fieldErrors.email = "Enter a valid email address, such as name@company.com.";
    if (!project) fieldErrors.project = "Add a line about what you need.";
    setErrors(fieldErrors);

    const firstInvalid = (["email", "project"] as const).find((key) => fieldErrors[key]);
    if (firstInvalid) {
      form.querySelector<HTMLElement>(`[name="${firstInvalid}"]`)?.focus();
      return;
    }

    setStatus("submitting");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          project,
          message: "Sent from the quick enquiry form.",
          website: String(data.get("website") || ""),
          source: readAttribution(),
        }),
      });

      if (!res.ok) {
        if (res.status === 400 || res.status === 429) {
          const body = (await res.json().catch(() => null)) as { error?: string } | null;
          if (body?.error) setServerError(body.error);
        }
        throw new Error("Request failed");
      }

      setStatus("success");
      setErrors({});
      form.reset();
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="flex items-start gap-4 rounded-[var(--radius-lg)] border border-line bg-paper-dim/60 p-6">
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-signal-soft">
          <CheckIcon className="h-5 w-5 text-signal" />
        </span>
        <div>
          <h3 ref={successRef} tabIndex={-1} className="text-lg font-medium text-ink focus:outline-none">
            Message sent.
          </h3>
          <p className="text-pretty mt-1 text-[0.9375rem] text-muted">
            Thanks. We will reply by email, usually within a couple of business days.
          </p>
          <button
            type="button"
            onClick={() => setStatus("idle")}
            className="mt-2 min-h-11 text-sm font-medium text-ink underline underline-offset-4 hover:text-accent"
          >
            Send another message
          </button>
        </div>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      aria-labelledby={`${formId}-title`}
      className="rounded-[var(--radius-lg)] border border-line bg-paper-dim/60 p-6"
    >
      <h2 id={`${formId}-title`} className="text-lg font-medium text-ink">
        Short on time? Send a quick note.
      </h2>
      <p className="mt-1 text-[0.9375rem] text-muted">
        Just your email and one line. We will take it from there.
      </p>

      <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label>
          Leave this field empty
          <input type="text" name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <div className="mt-5 grid gap-4 sm:grid-cols-[1fr_1.4fr]">
        <div>
          <label htmlFor={`${formId}-email`} className="mb-2 block text-sm font-medium text-ink">
            Email <span className="text-accent">*</span>
          </label>
          <input
            id={`${formId}-email`}
            name="email"
            type="email"
            autoComplete="email"
            required
            {...(errors.email
              ? { "aria-invalid": true, "aria-describedby": `${formId}-email-error` }
              : {})}
            className={inputClasses}
          />
          {errors.email ? (
            <p id={`${formId}-email-error`} className="mt-1.5 text-sm text-red-600">
              {errors.email}
            </p>
          ) : null}
        </div>
        <div>
          <label htmlFor={`${formId}-project`} className="mb-2 block text-sm font-medium text-ink">
            What do you need? <span className="text-accent">*</span>
          </label>
          <input
            id={`${formId}-project`}
            name="project"
            type="text"
            required
            maxLength={300}
            placeholder="For example: an iOS app for my delivery business"
            {...(errors.project
              ? { "aria-invalid": true, "aria-describedby": `${formId}-project-error` }
              : {})}
            className={inputClasses}
          />
          {errors.project ? (
            <p id={`${formId}-project-error`} className="mt-1.5 text-sm text-red-600">
              {errors.project}
            </p>
          ) : null}
        </div>
      </div>

      {status === "error" ? (
        <p role="alert" className="mt-4 text-sm text-red-600">
          {serverError ??
            "Something went wrong sending your message. Please try again, or email us directly."}
        </p>
      ) : null}

      <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2">
        <Button
          type="submit"
          disabled={status === "submitting"}
          icon={<ArrowRightIcon className="h-4 w-4" />}
        >
          {status === "submitting" ? "Sending…" : "Send note"}
        </Button>
        <p className="text-sm text-muted">
          We use your details only to reply. See our{" "}
          <Link href="/privacy" className="text-ink underline underline-offset-2 hover:text-accent">
            Privacy Policy
          </Link>
          .
        </p>
      </div>
    </form>
  );
}
