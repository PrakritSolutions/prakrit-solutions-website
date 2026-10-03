"use client";

import {
  useEffect,
  useId,
  useRef,
  useState,
  useSyncExternalStore,
  type FormEvent,
  type ReactNode,
} from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRightIcon, CheckIcon } from "@/components/icons";
import { siteConfig } from "@/lib/site-config";

const serviceOptions = [
  "Mobile Application",
  "Web Application",
  "AI Solution",
  "Automation",
  "Custom Software",
  "Backend & APIs",
  "Not sure yet",
];

type Currency = "INR" | "USD";

const currencyOptions: { code: Currency; label: string }[] = [
  { code: "INR", label: "₹ INR" },
  { code: "USD", label: "$ USD" },
];

function detectCurrency(): Currency {
  const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  return timeZone === "Asia/Kolkata" || timeZone === "Asia/Calcutta" ? "INR" : "USD";
}

const noopSubscribe = () => () => {};

const budgetOptions: Record<Currency, string[]> = {
  INR: [
    "Under ₹50,000",
    "₹50,000 – ₹1 lakh",
    "₹1 – ₹2.5 lakh",
    "₹2.5 – ₹5 lakh",
    "₹5 – ₹10 lakh",
    "₹10 – ₹25 lakh",
    "₹25 – ₹50 lakh",
    "₹50 lakh – ₹1 crore",
    "₹1 crore+",
    "Not sure yet",
  ],
  USD: [
    "Under $1,000",
    "$1,000 – $2,500",
    "$2,500 – $5,000",
    "$5,000 – $10,000",
    "$10,000 – $25,000",
    "$25,000 – $50,000",
    "$50,000 – $100,000",
    "$100,000+",
    "Not sure yet",
  ],
};

const timelineOptions = ["ASAP", "1–3 months", "3–6 months", "6+ months", "Flexible"];

import { ATTRIBUTION_KEY } from "@/components/analytics/attribution";

function readAttribution(): Record<string, string> | null {
  try {
    const raw = window.sessionStorage.getItem(ATTRIBUTION_KEY);
    return raw ? (JSON.parse(raw) as Record<string, string>) : null;
  } catch {
    return null;
  }
}

type Status = "idle" | "submitting" | "success" | "error";
type RequiredField = "name" | "email" | "project";
type FieldErrors = Partial<Record<RequiredField, string>>;

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validate(values: Record<RequiredField, string>): FieldErrors {
  const errors: FieldErrors = {};
  if (!values.name) errors.name = "Enter your name.";
  if (!values.email) errors.email = "Enter your email address.";
  else if (!EMAIL_PATTERN.test(values.email))
    errors.email = "Enter a valid email address, such as name@company.com.";
  if (!values.project) errors.project = "Describe what you want to build.";
  return errors;
}

const inputClasses =
  "w-full rounded-[var(--radius-sm)] border border-line-strong bg-paper px-4 py-3 text-[0.9375rem] text-ink placeholder:text-muted transition-colors focus-visible:border-accent";

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [services, setServices] = useState<string[]>([]);
  const detectedCurrency = useSyncExternalStore(noopSubscribe, detectCurrency, () => "INR" as Currency);
  const [chosenCurrency, setChosenCurrency] = useState<Currency | null>(null);
  const currency = chosenCurrency ?? detectedCurrency;
  const [budget, setBudget] = useState("");
  const [errors, setErrors] = useState<FieldErrors>({});
  const [serverError, setServerError] = useState<string | null>(null);
  const [pendingCurrency, setPendingCurrency] = useState<Currency | null>(null);
  const successRef = useRef<HTMLHeadingElement>(null);
  const formId = useId();

  useEffect(() => {
    if (status === "success") successRef.current?.focus();
  }, [status]);

  function applyCurrency(next: Currency) {
    setChosenCurrency(next);
    setBudget("");
    setPendingCurrency(null);
  }

  // A chosen range is in the old currency, so ask before clearing it.
  function changeCurrency(next: Currency) {
    if (next === currency) return;
    if (budget) setPendingCurrency(next);
    else applyCurrency(next);
  }

  function toggleService(service: string) {
    setServices((prev) =>
      prev.includes(service) ? prev.filter((s) => s !== service) : [...prev, service]
    );
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setServerError(null);

    const form = event.currentTarget;
    const data = new FormData(form);
    const payload = {
      name: String(data.get("name") || "").trim(),
      company: String(data.get("company") || "").trim(),
      email: String(data.get("email") || "").trim(),
      phone: String(data.get("phone") || "").trim(),
      project: String(data.get("project") || "").trim(),
      services,
      budget,
      timeline: String(data.get("timeline") || ""),
      message: String(data.get("message") || "").trim(),
      website: String(data.get("website") || ""),
      source: readAttribution(),
    };

    const fieldErrors = validate(payload);
    setErrors(fieldErrors);
    const firstInvalid = (["name", "email", "project"] as const).find((key) => fieldErrors[key]);
    if (firstInvalid) {
      form.querySelector<HTMLElement>(`[name="${firstInvalid}"]`)?.focus();
      return;
    }

    setStatus("submitting");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        // 400 and 429 carry a message written for the visitor; show it as-is.
        if (res.status === 400 || res.status === 429) {
          const body = (await res.json().catch(() => null)) as { error?: string } | null;
          if (body?.error) setServerError(body.error);
        }
        throw new Error("Request failed");
      }

      setStatus("success");
      setErrors({});
      form.reset();
      setServices([]);
      setBudget("");
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="flex flex-col items-start gap-4 rounded-[var(--radius-lg)] border border-line bg-paper-dim/60 p-8">
        <span className="flex h-11 w-11 items-center justify-center rounded-full bg-signal-soft">
          <CheckIcon className="h-5 w-5 text-signal" />
        </span>
        <h3 ref={successRef} tabIndex={-1} className="text-xl font-medium text-ink focus:outline-none">
          Message sent.
        </h3>
        <p className="text-pretty text-muted">
          Thanks for reaching out — we read every enquiry personally and
          usually reply within a couple of business days.
        </p>
        <Button variant="secondary" onClick={() => setStatus("idle")}>
          Send another message
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-6">
      <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label>
          Leave this field empty
          <input type="text" name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>
      <div className="grid gap-6 sm:grid-cols-2">
        <Field label="Name" htmlFor={`${formId}-name`} required error={errors.name}>
          <input
            id={`${formId}-name`}
            name="name"
            type="text"
            autoComplete="name"
            required
            {...invalidProps(`${formId}-name`, errors.name)}
            className={inputClasses}
          />
        </Field>
        <Field label="Company" htmlFor={`${formId}-company`}>
          <input
            id={`${formId}-company`}
            name="company"
            type="text"
            autoComplete="organization"
            className={inputClasses}
          />
        </Field>
        <Field label="Email" htmlFor={`${formId}-email`} required error={errors.email}>
          <input
            id={`${formId}-email`}
            name="email"
            type="email"
            autoComplete="email"
            required
            {...invalidProps(`${formId}-email`, errors.email)}
            className={inputClasses}
          />
        </Field>
        <Field label="Phone" htmlFor={`${formId}-phone`} optional>
          <input
            id={`${formId}-phone`}
            name="phone"
            type="tel"
            autoComplete="tel"
            className={inputClasses}
          />
        </Field>
      </div>

      <Field
        label="What do you want to build?"
        htmlFor={`${formId}-project`}
        required
        error={errors.project}
      >
        <textarea
          id={`${formId}-project`}
          name="project"
          rows={3}
          required
          {...invalidProps(`${formId}-project`, errors.project)}
          placeholder="A short description is enough to start."
          className={`${inputClasses} resize-y`}
        />
      </Field>

      <fieldset>
        <legend className="mb-3 text-sm font-medium text-ink">
          Services <span className="font-normal text-muted">(select any that apply)</span>
        </legend>
        <div className="flex flex-wrap gap-2">
          {serviceOptions.map((service) => {
            const active = services.includes(service);
            return (
              <button
                type="button"
                key={service}
                aria-pressed={active}
                onClick={() => toggleService(service)}
                className={`rounded-full border px-3.5 py-2.5 text-sm transition-colors sm:py-1.5 ${
                  active
                    ? "border-accent bg-accent-soft text-accent"
                    : "border-line-strong text-muted hover:border-ink hover:text-ink"
                }`}
              >
                {service}
              </button>
            );
          })}
        </div>
      </fieldset>

      <div className="grid gap-6 sm:grid-cols-2">
        <Field
          label="Budget"
          htmlFor={`${formId}-budget`}
          aside={
            <div role="group" aria-label="Budget currency" className="flex gap-1.5">
              {currencyOptions.map((option) => {
                const active = currency === option.code;
                return (
                  <button
                    type="button"
                    key={option.code}
                    aria-pressed={active}
                    onClick={() => changeCurrency(option.code)}
                    className={`relative rounded-full border px-2.5 py-0.5 text-xs transition-colors before:absolute before:-inset-x-1 before:-inset-y-2.5 before:content-[''] ${
                      active
                        ? "border-accent bg-accent-soft text-accent"
                        : "border-line-strong text-muted hover:border-ink hover:text-ink"
                    }`}
                  >
                    {option.label}
                  </button>
                );
              })}
            </div>
          }
        >
          <select
            id={`${formId}-budget`}
            name="budget"
            className={inputClasses}
            value={budget}
            onChange={(event) => setBudget(event.target.value)}
          >
            <option value="" disabled>
              Select a range
            </option>
            {budgetOptions[currency].map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
          {pendingCurrency ? (
            <div
              role="status"
              className="mt-2 rounded-[var(--radius-sm)] border border-line bg-paper-dim px-3 py-2.5 text-sm text-ink"
            >
              <p>Switching to {pendingCurrency} clears the range you chose.</p>
              <div className="mt-2 flex gap-4">
                <button
                  type="button"
                  autoFocus
                  onClick={() => applyCurrency(pendingCurrency)}
                  className="min-h-9 font-medium text-accent underline underline-offset-2"
                >
                  Switch to {pendingCurrency}
                </button>
                <button
                  type="button"
                  onClick={() => setPendingCurrency(null)}
                  className="min-h-9 text-muted underline underline-offset-2 hover:text-ink"
                >
                  Keep {currency}
                </button>
              </div>
            </div>
          ) : null}
        </Field>
        <Field label="Timeline" htmlFor={`${formId}-timeline`}>
          <select id={`${formId}-timeline`} name="timeline" className={inputClasses} defaultValue="">
            <option value="" disabled>
              Select a timeline
            </option>
            {timelineOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </Field>
      </div>

      <Field label="Additional information" htmlFor={`${formId}-message`}>
        <textarea
          id={`${formId}-message`}
          name="message"
          rows={3}
          placeholder="Anything else that would help us understand the project."
          className={`${inputClasses} resize-y`}
        />
      </Field>

      {status === "error" ? (
        <p role="alert" className="text-sm text-red-600">
          {serverError ??
            "Something went wrong sending your message. Please try again, or email us directly."}
        </p>
      ) : null}

      <Button
        type="submit"
        size="lg"
        disabled={status === "submitting"}
        icon={<ArrowRightIcon className="h-4 w-4" />}
        className="w-full sm:w-auto"
      >
        {status === "submitting" ? "Sending…" : "Let's Talk"}
      </Button>

      <p className="text-pretty text-sm text-muted">
        We reply within {siteConfig.responseTime}. We use your details only to
        reply to your enquiry. See our{" "}
        <Link href="/privacy" className="text-ink underline underline-offset-2 hover:text-accent">
          Privacy Policy
        </Link>
        .
      </p>
    </form>
  );
}

function invalidProps(id: string, error?: string) {
  return error ? { "aria-invalid": true, "aria-describedby": `${id}-error` } : {};
}

function Field({
  label,
  htmlFor,
  required,
  optional,
  error,
  aside,
  children,
}: {
  label: string;
  htmlFor: string;
  required?: boolean;
  optional?: boolean;
  error?: string;
  aside?: ReactNode;
  children: ReactNode;
}) {
  return (
    <div>
      <div className="mb-2 flex h-6 items-center justify-between gap-3">
        <label htmlFor={htmlFor} className="block text-sm font-medium text-ink">
          {label}
          {required ? <span className="text-accent"> *</span> : null}
          {optional ? <span className="font-normal text-muted"> (optional)</span> : null}
        </label>
        {aside}
      </div>
      {children}
      {error ? (
        <p id={`${htmlFor}-error`} className="mt-1.5 text-sm text-red-600">
          {error}
        </p>
      ) : null}
    </div>
  );
}
