# Invoice / Receipt Data Extractor — Implementation Scope

## What it does
User uploads an invoice or receipt (image or PDF) → tool returns structured data: vendor name, date, line items, subtotal, tax, total, currency — shown on-screen and downloadable as JSON/CSV. Free, public, no login. Doubles as a lead magnet ("want this wired into your accounting system? talk to us").

## Route & pages
- `src/app/tools/invoice-extractor/page.tsx` — upload UI + results table (client component).
- `src/app/api/tools/invoice-extractor/route.ts` — POST endpoint, does the extraction. Keeps the API key server-side.

## Model choice
- **Claude Sonnet 5** (`claude-sonnet-5`) with vision input, not Haiku — structured extraction accuracy matters here (numbers, totals) in a way it doesn't for the SQL tool, and this is the tool most likely to get scrutinized as a "would I trust this with real work" test.
- Force a strict JSON response via a `zod` schema passed as a tool/function definition (Anthropic tool-use), not free-text parsing — avoids fragile regex/markdown-stripping on the model's output.
- Cost: vision requests are pricier per call than the SQL tool (image tokens + a larger structured output), but still cents-per-request territory at this volume. Cap monthly spend via a hard per-IP daily limit (see below) rather than trying to precisely budget token cost up front.

## Request shape
```
POST /api/tools/invoice-extractor  (multipart/form-data)
file: <image or PDF, max 8MB>
→ {
    vendor: string | null,
    date: string | null,
    currency: string | null,
    lineItems: { description: string, quantity: number | null, unitPrice: number | null, total: number | null }[],
    subtotal: number | null,
    tax: number | null,
    total: number | null,
    confidence: "high" | "low"   // model self-reports when the scan is too poor to trust
  }
```

## File handling
- **Accept**: JPEG, PNG, WebP, PDF. Reject everything else by MIME sniff, not just extension.
- **PDFs**: Claude's vision input takes images, not PDF bytes directly — convert the first page to an image server-side before sending (e.g. `pdf-to-img` or a serverless-friendly renderer; avoid anything that needs a native Chromium binary on Vercel's default runtime — pick a pure-JS/WASM PDF renderer to stay in the standard Node serverless function).
- **Size cap**: 8MB upload limit, enforced both client-side (immediate feedback) and server-side (don't trust the client).
- **No persistence**: process the file in memory for the duration of the request, discard immediately after. Do not write to disk, S3, or Vercel Blob — invoices routinely contain real names, addresses, and amounts, and this is a public unauthenticated tool. Storing them would turn a fun demo into a real data-handling liability.

## Abuse prevention & cost control
- **Rate limit by IP**: Upstash Redis, same as the SQL tool (share the setup) — but tighter here given the higher per-call cost. Suggest 5 requests/hour, 15/day per IP.
- **Turnstile (Cloudflare)** before upload — more important here than on the SQL tool, since file-upload endpoints are a more attractive scripted-abuse target (cost per hit is higher).
- Server-side file size/type validation before the file ever reaches the model call — reject cheaply, don't spend a model call on a bad upload.

## Data & privacy
- This is the one that actually matters legally: real invoices contain PII (names, addresses) and financial data.
- Add a one-line notice directly on the tool page: "Files are processed in memory and never stored." This should be true by construction (see File handling above), not just a claim.
- No third-party logging of file contents. If analytics is added later (per the launch checklist), make sure the upload endpoint is explicitly excluded from any request-body logging.
- This tool should be referenced from — and consistent with — whatever the Privacy Policy ends up saying about uploaded content once that page is out of placeholder state.

## UI
- Drag-and-drop + click-to-upload zone.
- Preview thumbnail of the uploaded image/PDF page before submitting.
- Results as a clean table (line items) + summary card (vendor/date/total), with a "Download JSON" and "Download CSV" button.
- Explicit low-confidence banner if the model flags the scan as unclear (blurry photo, handwritten receipt, etc.) rather than silently presenting a guess as fact.

## Environment variables
- `ANTHROPIC_API_KEY` (server-only, shared with the SQL tool)
- `UPSTASH_REDIS_REST_URL`, `UPSTASH_REDIS_REST_TOKEN` (server-only, shared with the SQL tool)

## Effort estimate
- Upload UI + preview + API route wiring: ~1 day.
- Anthropic vision call + structured tool-use schema + PDF-to-image conversion: ~1 day.
- Rate limiting (reuses SQL tool's setup) + validation: ~2–3 hours.
- Results table + CSV/JSON export + low-confidence handling: ~half a day.
- **Total: ~2.5–3 days** for a solid v1 — noticeably more than the SQL tool, mainly due to file handling, PDF conversion, and the extra care needed around real PII.

## Out of scope for v1
- Multi-page PDF support (extract only the first page for v1; note it in the UI rather than silently dropping pages 2+).
- Editing/correcting extracted fields in the UI (nice follow-up once there's a reason to believe people want to fix small OCR-style mistakes rather than re-upload).
- Bulk upload (multiple invoices at once) — a natural "hire us to build this properly" upsell rather than a free-tool feature.
