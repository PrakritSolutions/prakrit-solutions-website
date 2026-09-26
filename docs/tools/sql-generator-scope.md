# SQL Query Generator & Explainer — Implementation Scope

## What it does
Two modes, one page, one input box:
1. **Generate** — user describes a query in plain English + pastes/describes their table schema → tool returns SQL (Postgres/MySQL/SQLite selectable).
2. **Explain** — user pastes an existing SQL query → tool returns a plain-English breakdown, clause by clause.

Free, public, no login. Lead magnet: demonstrates the "AI-powered products" pitch directly.

## Route & pages
- `src/app/tools/sql-query-generator/page.tsx` — the UI (client component for the form, server actions or an API route for the call).
- `src/app/api/tools/sql-generator/route.ts` — POST endpoint, does the actual model call. Keeps API key server-side only.

## Model choice
- **Claude Haiku 4.5** (`claude-haiku-4-5-20251001`) via the Anthropic SDK. Text-in/text-out, low complexity, cheap, fast — no reason to pay Sonnet/Opus prices for this.
- System prompt fixes: dialect selection, forces the response into a strict shape (SQL in a fenced block + short explanation), refuses non-SQL requests.
- Roughly $1/M input, $5/M output tokens on Haiku 4.5 — at ~300 input + ~300 output tokens per request, cost is a fraction of a cent per use. Even 10,000 uses/month stays well under $10.

## Request shape
```
POST /api/tools/sql-generator
{ mode: "generate" | "explain", dialect: "postgres" | "mysql" | "sqlite", input: string, schema?: string }
→ { sql?: string, explanation: string }
```
Validate with `zod`: cap `input` and `schema` length (e.g. 4,000 chars) to bound token cost and block abuse via huge pastes.

## Abuse prevention & cost control
- **Rate limit by IP**: Vercel's serverless functions are stateless, so use Upstash Redis (`@upstash/ratelimit` + `@upstash/redis`, free tier is enough) — e.g. 10 requests/hour per IP. This is the one new piece of infra the project doesn't have yet.
- **Turnstile (Cloudflare)** on the form before first submission per session — free, no CAPTCHA-solving friction, stops scripted abuse cheaply. Optional for v1, recommended before wide promotion (e.g. Hacker News / Reddit traffic).
- Hard cap `max_tokens` on the Claude call (e.g. 1024) so a single request can't run away in cost.
- No conversation history sent — every request is stateless, single-turn. Removes an entire class of prompt-injection/context-poisoning concern.

## Data & privacy
- Nothing is persisted. No DB write, no logging of the SQL/schema content itself (only aggregate usage metrics if analytics is added later per the launch checklist).
- Users may paste real schema/table names — treat as sensitive by default: don't log request bodies, don't include them in any third-party analytics payload.

## UI
- Textarea for input, dialect dropdown, mode toggle (Generate / Explain), submit button, syntax-highlighted output (a lightweight highlighter like `shiki` or a plain `<pre><code>` with Tailwind — no need for a heavy CodeMirror instance for read-only output).
- Loading state while the request is in flight (matches the existing contact-form pattern for consistency).
- Copy-to-clipboard button on the SQL output.

## Environment variables
- `ANTHROPIC_API_KEY` (server-only)
- `UPSTASH_REDIS_REST_URL`, `UPSTASH_REDIS_REST_TOKEN` (server-only)

## Effort estimate
- Page + form + API route + Anthropic call: ~half a day.
- Rate limiting wired in: ~1–2 hours.
- Polish (syntax highlighting, copy button, loading/error states): ~2–3 hours.
- **Total: ~1–1.5 days** for a solid v1.

## Out of scope for v1
- Running the query against a real database (would need per-user DB credentials — a much bigger, riskier feature; skip entirely for a public tool).
- Query optimization suggestions (different feature, different prompt — natural v2 if this one gets traction).
