import { createHash } from "node:crypto";
import { Redis } from "@upstash/redis";

// Limits that hold across serverless instances, kept as counters in Upstash Redis.
// Keys hold only a hash of the IP or email, never the address itself.
const LIMITS = {
  ip: { max: 5, ttlSeconds: 60 * 60 },
  email: { max: 3, ttlSeconds: 24 * 60 * 60 },
  day: { max: 100, ttlSeconds: 2 * 24 * 60 * 60 },
} as const;

export type LimitResult = "ok" | "ip" | "email" | "day";

let client: Redis | null | undefined;

function redis(): Redis | null {
  if (client !== undefined) return client;
  // The Vercel Marketplace integration sets the KV_* names; a direct Upstash setup uses UPSTASH_*.
  const url = process.env.UPSTASH_REDIS_REST_URL ?? process.env.KV_REST_API_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN ?? process.env.KV_REST_API_TOKEN;
  client = url && token ? new Redis({ url, token }) : null;
  return client;
}

export function hasDurableLimits(): boolean {
  return redis() !== null;
}

const hash = (value: string) => createHash("sha256").update(value).digest("hex").slice(0, 32);

async function bump(store: Redis, key: string, ttlSeconds: number): Promise<number> {
  const count = await store.incr(key);
  if (count === 1) await store.expire(key, ttlSeconds);
  return count;
}

// Checks, in order, the per-IP, per-email and daily total limits. When the store is
// missing or fails, enquiries are let through so a Redis outage never loses a lead.
export async function checkDurableLimits(ip: string, email: string): Promise<LimitResult> {
  const store = redis();
  if (!store) return "ok";

  try {
    const today = new Date().toISOString().slice(0, 10);
    const checks: [LimitResult, string, { max: number; ttlSeconds: number }][] = [
      ["ip", `contact:ip:${hash(ip)}`, LIMITS.ip],
      ["email", `contact:email:${hash(email.trim().toLowerCase())}`, LIMITS.email],
      ["day", `contact:day:${today}`, LIMITS.day],
    ];

    for (const [result, key, limit] of checks) {
      if ((await bump(store, key, limit.ttlSeconds)) > limit.max) return result;
    }
    return "ok";
  } catch (error) {
    console.error("[contact] limit store unavailable", error instanceof Error ? error.name : "error");
    return "ok";
  }
}
