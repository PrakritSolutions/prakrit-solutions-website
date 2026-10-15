// Server-side check of the Cloudflare Turnstile token sent with the contact form.
// "ok" lets the request continue, "failed" means the token is missing or invalid,
// and "unavailable" means we could not reach Cloudflare or the keys are missing.
export type TurnstileResult = "ok" | "failed" | "unavailable";

const VERIFY_URL = "https://challenges.cloudflare.com/turnstile/v0/siteverify";

export async function verifyTurnstile(token: unknown, ip?: string): Promise<TurnstileResult> {
  const secret = process.env.TURNSTILE_SECRET_KEY;

  if (!secret) {
    // Local development runs without keys. On Vercel a missing key is an outage
    // we want to notice, not a way past the check, so it fails closed.
    return process.env.VERCEL ? "unavailable" : "ok";
  }

  if (typeof token !== "string" || token.length === 0 || token.length > 2048) return "failed";

  try {
    const response = await fetch(VERIFY_URL, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        secret,
        response: token,
        ...(ip && ip !== "unknown" ? { remoteip: ip } : {}),
      }),
      signal: AbortSignal.timeout(5000),
    });
    if (!response.ok) return "unavailable";
    const result = (await response.json()) as { success?: boolean };
    return result.success === true ? "ok" : "failed";
  } catch {
    return "unavailable";
  }
}
