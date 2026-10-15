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
import { trackEvent } from "@/lib/analytics";
import { Turnstile, turnstileSiteKey } from "@/components/forms/turnstile";
import {
  budgetOptions,
  contactLimits,
  serviceOptions,
  timelineOptions,
} from "@/lib/contact-options";

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
type RequiredField = "name" | "email" | "phone" | "services";
type FieldErrors = Partial<Record<RequiredField, string>>;

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const requiredOrder: RequiredField[] = ["name", "email", "phone", "services"];

function validate(values: {
  name: string;
  email: string;
  phone: string;
  services: string[];
}): FieldErrors {
  const errors: FieldErrors = {};
  if (!values.name) errors.name = "Enter your name.";
  if (!values.email) errors.email = "Enter your email address.";
  else if (!EMAIL_PATTERN.test(values.email))
    errors.email = "Enter a valid email address, such as name@company.com.";
  if (!values.phone) errors.phone = "Enter your phone number.";
  else if (values.phone.replace(/\D/g, "").length < 7)
    errors.phone = "Enter a valid phone number, including the country code if outside India.";
  if (values.services.length === 0) errors.services = "Select at least one service.";
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
  const [showExtras, setShowExtras] = useState(false);
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null);
  const [turnstileReset, setTurnstileReset] = useState(0);
  const successRef = useRef<HTMLHeadingElement>(null);
  const startedRef = useRef(false);
  const formId = useId();

  // Fires once per attempt, when the visitor first touches any field.
  function trackStart() {
    if (startedRef.current) return;
    startedRef.current = true;
    trackEvent("contact_form_start");
  }

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
    setErrors((prev) => ({ ...prev, services: undefined }));
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
      website: String(data.get("website") || ""),
      source: readAttribution(),
      turnstileToken,
    };

    const fieldErrors = validate(payload);
    setErrors(fieldErrors);
    const firstInvalid = requiredOrder.find((key) => fieldErrors[key]);
    if (firstInvalid) {
      trackEvent("contact_form_error", {
        error_source: "validation",
        error_fields: Object.keys(fieldErrors).join(","),
      });
      const target =
        firstInvalid === "services" ? "[data-service-chip]" : `[name="${firstInvalid}"]`;
      form.querySelector<HTMLElement>(target)?.focus();
      return;
    }

    // The security check usually finishes before the visitor has filled the form.
    if (turnstileSiteKey && !turnstileToken) {
      setServerError("The security check is still running. Please wait a moment and try again.");
      setStatus("error");
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
        trackEvent("contact_form_error", { error_source: "server", status: res.status });
        // These statuses carry a message written for the visitor; show it as-is.
        if ([400, 403, 429, 503].includes(res.status)) {
          const body = (await res.json().catch(() => null)) as { error?: string } | null;
          if (body?.error) setServerError(body.error);
        }
        throw new Error("Request failed");
      }

      trackEvent("generate_lead", { form: "contact" });
      startedRef.current = false;
      setStatus("success");
      setErrors({});
      form.reset();
      setServices([]);
      setBudget("");
      setShowExtras(false);
    } catch {
      setStatus("error");
    } finally {
      // A token works once, so every attempt needs a fresh one.
      setTurnstileToken(null);
      setTurnstileReset((count) => count + 1);
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
          reply in {siteConfig.responseTime}.
        </p>
        <Button variant="secondary" onClick={() => setStatus("idle")}>
          Send another message
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} onFocus={trackStart} noValidate className="space-y-6">
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
            maxLength={contactLimits.name}
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
            maxLength={contactLimits.company}
            className={inputClasses}
          />
        </Field>
        <Field label="Email" htmlFor={`${formId}-email`} required error={errors.email}>
          <input
            id={`${formId}-email`}
            name="email"
            type="email"
            autoComplete="email"
            maxLength={contactLimits.email}
            required
            {...invalidProps(`${formId}-email`, errors.email)}
            className={inputClasses}
          />
        </Field>
        <Field
          label="Phone"
          htmlFor={`${formId}-phone`}
          required
          hint="Only used to discuss your project. WhatsApp number is fine."
          error={errors.phone}
        >
          <input
            id={`${formId}-phone`}
            name="phone"
            type="tel"
            autoComplete="tel"
            maxLength={contactLimits.phone}
            required
            {...invalidProps(`${formId}-phone`, errors.phone)}
            aria-describedby={`${formId}-phone-hint${errors.phone ? ` ${formId}-phone-error` : ""}`}
            className={inputClasses}
          />
        </Field>
      </div>

      <Field label="What do you want to build?" htmlFor={`${formId}-project`} optional>
        <textarea
          id={`${formId}-project`}
          name="project"
          rows={3}
          maxLength={contactLimits.project}
          placeholder="A short description is enough to start."
          className={`${inputClasses} resize-y`}
        />
      </Field>

      <fieldset
        aria-invalid={errors.services ? true : undefined}
        aria-describedby={errors.services ? `${formId}-services-error` : undefined}
      >
        <legend className="mb-3 text-sm font-medium text-ink">
          Services <span className="text-accent">*</span>{" "}
          <span className="font-normal text-muted">(select at least one)</span>
        </legend>
        <div className="flex flex-wrap gap-2">
          {serviceOptions.map((service) => {
            const active = services.includes(service);
            return (
              <button
                type="button"
                key={service}
                data-service-chip
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
        {errors.services ? (
          <p id={`${formId}-services-error`} role="alert" className="mt-2 text-sm text-red-600">
            {errors.services}
          </p>
        ) : null}
      </fieldset>

      <div>
        <button
          type="button"
          aria-expanded={showExtras}
          aria-controls={`${formId}-extras`}
          onClick={() => setShowExtras((open) => !open)}
          className="-my-1 inline-flex min-h-11 items-center gap-2 text-sm font-medium text-ink transition-colors hover:text-accent"
        >
          <ArrowRightIcon
            className={`h-4 w-4 transition-transform ${showExtras ? "rotate-90" : ""}`}
          />
          {showExtras ? "Hide budget and timeline" : "Add budget and timeline"}
          <span className="font-normal text-muted">(optional)</span>
        </button>
      </div>

      {/* Hidden, not unmounted, so a chosen budget or timeline survives a collapse. */}
      <div
        id={`${formId}-extras`}
        hidden={!showExtras}
        className="grid gap-6 sm:grid-cols-2"
      >
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

      <Turnstile onToken={setTurnstileToken} resetSignal={turnstileReset} />

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
        We reply in {siteConfig.responseTime}. We use your details only to
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
  hint,
  error,
  aside,
  children,
}: {
  label: string;
  htmlFor: string;
  required?: boolean;
  optional?: boolean;
  hint?: string;
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
      {hint ? (
        <p id={`${htmlFor}-hint`} className="mt-1.5 text-sm text-muted">
          {hint}
        </p>
      ) : null}
      {error ? (
        <p id={`${htmlFor}-error`} className="mt-1.5 text-sm text-red-600">
          {error}
        </p>
      ) : null}
    </div>
  );
}
