"use client";

import {
  useId,
  useState,
  useSyncExternalStore,
  type FormEvent,
  type ReactNode,
} from "react";
import { Button } from "@/components/ui/button";
import { ArrowRightIcon, CheckIcon } from "@/components/icons";

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

const inputClasses =
  "w-full rounded-[var(--radius-sm)] border border-line bg-paper px-4 py-3 text-[0.9375rem] text-ink placeholder:text-muted/70 transition-colors focus-visible:border-accent";

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [services, setServices] = useState<string[]>([]);
  const detectedCurrency = useSyncExternalStore(noopSubscribe, detectCurrency, () => "INR" as Currency);
  const [chosenCurrency, setChosenCurrency] = useState<Currency | null>(null);
  const currency = chosenCurrency ?? detectedCurrency;
  const [budget, setBudget] = useState("");
  const [error, setError] = useState<string | null>(null);
  const formId = useId();

  function changeCurrency(next: Currency) {
    if (next === currency) return;
    setChosenCurrency(next);
    setBudget("");
  }

  function toggleService(service: string) {
    setServices((prev) =>
      prev.includes(service) ? prev.filter((s) => s !== service) : [...prev, service]
    );
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);

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

    if (!payload.name || !payload.email || !payload.project) {
      setError("Please fill in your name, email, and a short project description.");
      return;
    }

    setStatus("submitting");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error("Request failed");

      setStatus("success");
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
        <h3 className="text-xl font-medium text-ink">Message sent.</h3>
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
        <Field label="Name" htmlFor={`${formId}-name`} required>
          <input
            id={`${formId}-name`}
            name="name"
            type="text"
            autoComplete="name"
            required
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
        <Field label="Email" htmlFor={`${formId}-email`} required>
          <input
            id={`${formId}-email`}
            name="email"
            type="email"
            autoComplete="email"
            required
            className={inputClasses}
          />
        </Field>
        <Field label="Phone" htmlFor={`${formId}-phone`}>
          <input
            id={`${formId}-phone`}
            name="phone"
            type="tel"
            autoComplete="tel"
            className={inputClasses}
          />
        </Field>
      </div>

      <Field label="What do you want to build?" htmlFor={`${formId}-project`} required>
        <textarea
          id={`${formId}-project`}
          name="project"
          rows={3}
          required
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
                className={`rounded-full border px-3.5 py-1.5 text-sm transition-colors ${
                  active
                    ? "border-accent bg-accent-soft text-accent"
                    : "border-line text-muted hover:border-ink hover:text-ink"
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
                    className={`rounded-full border px-2.5 py-0.5 text-xs transition-colors ${
                      active
                        ? "border-accent bg-accent-soft text-accent"
                        : "border-line text-muted hover:border-ink hover:text-ink"
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

      {error ? (
        <p role="alert" className="text-sm text-red-600">
          {error}
        </p>
      ) : null}
      {status === "error" ? (
        <p role="alert" className="text-sm text-red-600">
          Something went wrong sending your message. Please try again, or
          email us directly.
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
    </form>
  );
}

function Field({
  label,
  htmlFor,
  required,
  aside,
  children,
}: {
  label: string;
  htmlFor: string;
  required?: boolean;
  aside?: ReactNode;
  children: ReactNode;
}) {
  return (
    <div>
      <div className="mb-2 flex h-6 items-center justify-between gap-3">
        <label htmlFor={htmlFor} className="block text-sm font-medium text-ink">
          {label}
          {required ? <span className="text-accent"> *</span> : null}
        </label>
        {aside}
      </div>
      {children}
    </div>
  );
}
