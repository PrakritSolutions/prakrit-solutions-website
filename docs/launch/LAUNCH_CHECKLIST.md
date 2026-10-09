# Prakrit Solutions: Launch Checklist

Audit date: 2026-09-26 · Re-audited: 2026-10-01 · Branch: `preview` · Site: https://prakritsolutions.in

Tick `[x]` when an item is done. Items already true at audit time are pre-ticked (marked *verified in code*) so nothing is forgotten; re-confirm them on launch day. Items marked **(owner)** cannot be done from code.

Related: [PLACEHOLDER_DATA.md](PLACEHOLDER_DATA.md) · [ACCOUNTS_TO_CREATE.md](ACCOUNTS_TO_CREATE.md)

## Priority key

**P0** blocks going live — do before unsetting `COMING_SOON`. **P1** do at or near launch, not strictly blocking. **P2** later, nice-to-have.

## New since 2026-09-26 — act on these first

- 🔴 **P0 — Critical security vulnerability.** `npm audit` (2026-10-01) found a **critical** Next.js RCE in `next/og`'s `ImageResponse` (current: 16.2.0–16.3.5, this repo pins `16.3.4`). The site uses `next/og` in `src/app/opengraph-image.tsx`, so it's affected. Fix: `npm audit fix --force` (upgrades to `next@16.3.8`, outside the declared range — read the Next 16 docs in `node_modules/next/dist/docs/` for breaking changes first), then re-run `tsc`/`eslint`/`build`. GHSA: https://github.com/advisories/GHSA-vcvr-r3jv-pc5j
- 🔴 **P0 — Still gated.** Live check 2026-10-01: `https://prakritsolutions.in` still returns the "Coming Soon" page (`COMING_SOON` is still `true` on Production). Today is also the `legalConfig.effectiveDate` ("1 October 2026") — worth reconciling before go-live.
- 🟢 Done since the last audit: LinkedIn Company Page, Facebook, Instagram, Google Business Profile, Google Search Console, Bing Webmaster Tools and WhatsApp Business are all confirmed live — see [ACCOUNTS_TO_CREATE.md](ACCOUNTS_TO_CREATE.md). `socialLinks` in `site-config.ts` now includes LinkedIn/Instagram/Facebook, and the Organization JSON-LD `sameAs` reflects it.

## Reset and hide (Markdown limitations)

Plain Markdown has no buttons or scripting, so a true "reset" button and "hide when done" cannot live in this file. The equivalents:

- **Reset all ticks** (run from the repo root):

  ```bash
  sed -i '' 's/^\(\s*- \)\[x\]/\1[ ]/' docs/launch/LAUNCH_CHECKLIST.md
  ```

  (On Linux, drop the `''` after `-i`.) Or use `git checkout docs/launch/LAUNCH_CHECKLIST.md` to restore the last committed state.
- **Hide finished items:** in VS Code, search the file with the regex `- \[ \]` to see only open items; or fold sections with the editor's fold controls. GitHub shows open/closed progress on task lists automatically.

If you want a real interactive page with a reset button and a show/hide-done toggle, that needs an HTML page (for example an internal, non-indexed route on the site). Ask and I will build it from this file.

---

## 1. Decisions to make first

- [ ] **P0** Decide the launch date. The legal effective date is **1 October 2026** (`src/lib/legal-config.ts`) — **that is today's date (2026-10-01)**; launch on or after it, or change the date. **(owner)**
- [ ] **P0** Decide how `preview` reaches production: merge `preview` into `main`, or point Vercel Production at `preview`. `main` is 34 commits behind. **(owner)**
- [ ] **P1** Get written approval from Dealerwerx before naming them, or remove/anonymise the case study (`src/lib/content/case-studies.ts`, slug `dealerwerx`). **(owner)**
- [ ] **P1** Confirm the MyO case study is approved for publication (client is anonymised as "Restaurant-technology client"). **(owner)**
- [ ] **P1** Confirm BookCargo has no objection to being named as a case study. **(owner)**
- [ ] **P1** Decide whether the Privacy Policy and Terms get a lawyer's review before launch. **(owner)**
- [ ] **P2** Decide whether launch waits for the two free tools (SQL Query Generator, Invoice Extractor) or ships without them. Nothing on the site currently references them.

## 2. Code and build health

- [x] TypeScript passes (`npx tsc --noEmit`), re-verified 2026-10-01.
- [x] ESLint passes (`npm run lint`), re-verified 2026-10-01.
- [x] No `console.log` or debug output left in `src/`, re-verified 2026-10-01 (none found).
- [x] No `TODO`/`FIXME` markers in `src/` or `integrations/`, verified in code.
- [ ] **P0** `npm audit` reviewed 2026-10-01: **1 critical** vulnerability (Next.js `next/og` RCE, see "New since 2026-09-26" above). Fix before launch.
- [ ] **P1** `npm run build` succeeds locally with production env values.
- [ ] **P1** Vercel production build for the merge commit succeeds with no warnings that matter.
- [ ] **P2** Pin the Node version (`engines` in `package.json` or `.nvmrc`); confirmed still missing 2026-10-01. Next 16.3.4 needs Node 20.9 or later.
- [ ] **P2** Dependencies are the versions you intend (`npm ci` from the lockfile works on a clean clone).
- [ ] **P2** Replace the boilerplate `README.md` (still the create-next-app default, confirmed unchanged 2026-10-01) with a real one.
- [ ] **P2** Optional: add CI (lint + tsc) and a few tests (source description, validation, Sheet formula guard).

## 3. Environment variables (Vercel dashboard, Production scope)

None of these are checkable from the repo or DNS — they live in the Vercel dashboard, which this session has no access to. One is confirmed from the live site; the rest are unverified either way.

- [ ] **P0** `COMING_SOON` is **unset or not `true`** on Production. **Confirmed still `true`** — live check 2026-10-01 shows `prakritsolutions.in` serving the "Coming Soon" page. This is the main switch for going live.
- [ ] **P0** `NEXT_PUBLIC_SITE_URL` is **unset** on Production (or exactly `https://prakritsolutions.in`). Any other value turns on the draft banner and `noindex`.
- [ ] **P1** `NEXT_PUBLIC_SITE_URL` on Preview is the draft URL, so draft stays noindexed.
- [ ] **P0** `RESEND_API_KEY` is set on Production.
- [ ] **P1** `NEXT_PUBLIC_GA_MEASUREMENT_ID` is set on Production to the **production** GA4 property (not the draft one).
- [ ] **P0** `SHEETS_WEBHOOK_URL`, `SHEETS_WEBHOOK_SECRET`, `SHEETS_URL` are set on Production.
- [ ] **P1** The Apps Script property `WEBHOOK_SECRET` matches `SHEETS_WEBHOOK_SECRET`.
- [x] No secrets committed to git, re-verified 2026-10-01 (`.env.local` ignored; `.env.example` holds names only; `git status` clean of any `.env*` beyond the ignored file).
- [ ] **P2** The `VERCEL_OIDC_TOKEN` in local `.env.local` is not needed in production and is not committed.
- [ ] **P0** Redeploy after changing any env var (they apply only to new deployments).

## 4. Domain, DNS and hosting

- [x] `prakritsolutions.in` is added to the Vercel project and resolves — confirmed live 2026-10-01 (HTTPS, 200, serving the Next.js app's Coming Soon page, so TLS and routing both work).
- [ ] **P1** Apex domain is the primary; `www.prakritsolutions.in` redirects to the apex (the canonical URL is the apex).
- [x] HTTPS certificate is issued and working — confirmed via the live `https://` request 2026-10-01.
- [ ] **P1** Domain auto-renew is on at the registrar (registered 2026-08-11).
- [ ] **P1** Registrar account has 2FA and a recovery email you control.
- [ ] **P2** Domain WHOIS privacy is on.
- [ ] **P2** Vercel plan limits are acceptable for expected traffic (function invocations, bandwidth).
- [ ] **P1** Vercel project team and access are correct (owner account only, or intended members).
- [ ] **P2** The draft subdomain (`draft.prakritsolutions.in`) still works and is noindexed, or is intentionally retired.
- [ ] **P0** Production branch setting in Vercel points at the intended branch.

## 5. Email deliverability (new domain, so this matters)

DNS re-checked 2026-10-01 (`dig`, no account access needed):

- [ ] **P1** Resend domain `prakritsolutions.in` shows **Verified** in the Resend dashboard (DNS below is consistent with this, but dashboard status itself wasn't checkable).
- [x] SPF record present: `v=spf1 include:_spf.google.com ~all` — one record, covers Google Workspace. **Gap:** no explicit Resend include; likely fine since DKIM alignment can satisfy DMARC on its own, but confirm in Resend's domain settings.
- [x] DKIM records present and resolving for **both** Google Workspace (`google._domainkey`) and Resend (`resend._domainkey`).
- [x] DMARC record exists: `v=DMARC1; p=none;` — no reporting address (`rua=`) set; consider adding one.
- [ ] **P0** `hello@prakritsolutions.in` exists as a real mailbox or alias and you receive mail sent to it.
- [ ] **P1** `privacy@prakritsolutions.in` exists (it is published on `/privacy`) and forwards to you.
- [ ] **P0** `noreply@prakritsolutions.in` sends successfully (used as the From address; replies go to `hello@`).
- [ ] **P0** Send a test to Gmail, Outlook and Yahoo; check inbox vs spam and the "Show original" headers for SPF/DKIM/DMARC pass.
- [ ] **P1** Confirmation email to the visitor renders well on mobile and in dark mode.
- [ ] **P1** Notification email to `hello@` shows the Source line and the "Open enquiry tracker" link.
- [ ] **P2** Email signature uses the real name, title, site and phone or WhatsApp.

## 6. Contact form and lead capture

- [x] Honeypot field present (`website`), server returns a fake success to bots, verified in code.
- [x] Rate limit of 5 per hour per IP (best-effort, per instance), verified in code.
- [x] Server validation: name, valid email and project description required, verified in code.
- [x] Sheet formula-injection guard, verified in code (commit 3f57eff).
- [x] Source attribution (utm parameters or referrer) recorded, verified in code.
- [ ] **P0** End-to-end test on production: submit a real enquiry and confirm (a) notification email arrives at `hello@`, (b) visitor confirmation email arrives, (c) a Sheet row is created with the Source column filled.
- [ ] **P1** Test a failure path: bad email, empty project, very long text; error messages read well.
- [ ] **P1** Test the form on mobile Safari and Chrome Android.
- [ ] **P2** The budget currency defaults correctly (INR for the Asia/Kolkata timezone, otherwise USD) and can be switched.
- [ ] **P1** If the live Sheet predates the Source/Fit columns, run `upgrade()` in Apps Script and re-deploy a new version (`integrations/google-sheets/README.md`).
- [ ] **P0** The Sheet is private (not "anyone with the link") and shared only with people who need it.
- [ ] **P2** Consider durable rate limiting (Upstash or Vercel KV) or Turnstile if spam appears.
- [ ] **P1** Privacy: function logs currently include name, email and company (`route.ts`); confirm this is acceptable and covered by the Privacy Policy, or remove those fields from the log.
- [ ] **P2** Plan for deleting Sheet rows older than 24 months (the Privacy Policy promises this).
- [ ] **P1** Set a routine for replying to enquiries within the stated "couple of business days".

## 7. Analytics, consent and tracking

- [x] GA4 loads only after the visitor accepts cookies, verified in code.
- [x] Declining or clearing consent removes `_ga*` cookies, verified in code.
- [x] "Cookie settings" link in the footer reopens the choice, verified in code.
- [ ] **P0** Production GA4 property exists and its Measurement ID is in Vercel Production.
- [ ] **P1** GA4 data retention set to 14 months (the Privacy Policy says 14 months).
- [ ] **P1** GA4 Google signals and ad personalisation are off unless you intend to use them (and the policy says so).
- [ ] **P0** GA4 real-time report shows a hit after accepting cookies on production; nothing appears after declining.
- [ ] **P2** Internal traffic (your own IP/devices) is excluded from GA4.
- [ ] **P1** Vercel Web Analytics and Speed Insights are enabled for the project and showing data.
- [ ] **P1** Cookie banner appears on first visit, is keyboard accessible, and does not cover the contact form on mobile.
- [ ] **P2** Consider GA4 key events (form submitted, booking clicked, WhatsApp clicked).
- [ ] **P2** Decide on an ad-tracking policy (no pixels are installed today — note: `public/brand/adsense-landscape-*.png` assets appeared in the repo 2026-10-01, untracked, suggesting AdSense may be planned; update the Privacy Policy first if so).

## 8. SEO and discoverability

- [x] Per-page `<title>` and meta description on every page, verified in code.
- [x] Canonical URLs set per page; apex domain is canonical, verified in code.
- [x] `robots.ts` blocks all crawling on draft, allows `/` and disallows `/api/` on production, verified in code.
- [x] `sitemap.ts` lists the main pages and case studies, verified in code.
- [x] Organization JSON-LD in the root layout, verified in code.
- [x] Open Graph locale `en_IN`, verified in code.
- [x] Dynamic Open Graph image at `src/app/opengraph-image.tsx`, verified in code.
- [ ] **P0** After launch, `https://prakritsolutions.in/robots.txt` shows `Allow: /` and a sitemap line (not `Disallow: /`). **Still blocked** — live check 2026-10-01 shows `/robots.txt` returning the Coming Soon HTML page (the `COMING_SOON` rewrite catches it), not real robots content.
- [ ] **P0** After launch, view source on the homepage and confirm there is **no** `noindex` meta tag. **Still noindexed** — confirmed 2026-10-01 (`<meta name="robots" content="noindex, nofollow"/>` on the live Coming Soon page).
- [ ] **P0** `https://prakritsolutions.in/sitemap.xml` loads and every URL returns 200.
- [x] Organization JSON-LD `sameAs` now lists real profiles — confirmed 2026-10-01: LinkedIn, Instagram, Facebook, GitHub. X is intentionally not included (owner deferred it 2026-10-01). Still worth re-validating in Google's Rich Results Test once live.
- [ ] **P2** JSON-LD `logo` points to `/apple-icon.png`, which exists (180x180). Consider a larger logo (at least 112x112, ideally 512x512).
- [ ] **P2** Add `LocalBusiness` or `ProfessionalService` schema (Surat, India) if you want local visibility.
- [ ] **P2** (deferred) Twitter/X card metadata: the `twitter` block has no `site` or `creator` handle — owner deferred creating the X account 2026-10-01, so this stays open until then.
- [ ] **P1** Share the homepage and a case study on LinkedIn, WhatsApp and X and check the preview card (use the platform debuggers).
- [x] Verify the site in Google Search Console — confirmed 2026-10-01: `sc-domain:prakritsolutions.in`, status **Verified**. **Sitemap not yet submitted** — do once off `COMING_SOON`.
- [x] Verify the site in Bing Webmaster Tools — confirmed 2026-10-01: `prakritsolutions.in` already added. **Sitemap not yet submitted** — do once off `COMING_SOON`.
- [ ] **P1** Case study pages have unique titles and descriptions.
- [ ] **P1** Heading structure: exactly one `<h1>` per page.
- [ ] **P1** Every image has alt text (or an empty alt if decorative).
- [ ] **P2** Check for duplicate content between `www`, apex and the draft domain.
- [x] Google Business Profile set up — confirmed 2026-10-01: "Prakrit Solutions", category Consultant, 100% verified. **Gap:** no phone number on the listing (NAP incomplete) — see [ACCOUNTS_TO_CREATE.md](ACCOUNTS_TO_CREATE.md).

## 9. Content review (read every page aloud)

- [ ] **P1** Home: hero, capability strip, what we build, AI, automation, process, why us, case studies teaser, CTA. Check facts and tone.
- [ ] **P1** Services page: all four services and their details.
- [ ] **P1** Solutions page: AI and automation sections; the workflow diagram reads correctly.
- [ ] **P1** Work page and each case study (BookCargo, Dealerwerx, MyO): facts, client approval, technology lists, outcomes.
- [ ] **P2** About page: beliefs, name origin, "who we work with".
- [ ] **P1** Contact page: details, hours, FAQ, booking button.
- [ ] **P0** Privacy Policy and Terms of Service read end to end (see section 10).
- [ ] **P2** Coming-soon page copy is fine if it will ever be used again.
- [ ] **P2** 404 page (`not-found.tsx`) reads well and links back home.
- [ ] **P1** Spelling and grammar pass (Indian or British English, be consistent).
- [ ] **P1** No claims you cannot back up (numbers, "years of experience", client counts).
- [ ] **P0** No unreleased product or client names other than approved ones.
- [ ] **P1** "Dealerwerx" case study clearly states it is unreleased (it currently does); re-check the wording once approved.
- [ ] **P2** Add testimonials, client logos or a team photo if you have real ones (none exist today; do not invent them).
- [ ] **P1** Replace or verify everything in [PLACEHOLDER_DATA.md](PLACEHOLDER_DATA.md).

## 10. Legal and compliance (India)

- [ ] **P0** `legalConfig` values are final: operator `Vaibhav Jhaveri`, title `Proprietor`, effective date **(today, 2026-10-01)**, retention 24 months, analytics retention 14 months, liability cap INR 5,000. Re-verified unchanged in code 2026-10-01.
- [ ] **P1** Privacy Policy names the correct processors: Vercel, Google Analytics, Calendly, Resend, Google (Sheets/Workspace). Add anything new (for example a CRM or newsletter tool).
- [ ] **P0** Grievance Officer details are present and reachable (DPDP Act 2023 context).
- [ ] **P1** Privacy Policy states what is sent to the Google Sheet and where it is stored.
- [ ] **P1** Terms of Service: governing law and Surat jurisdiction, IP ownership, payment terms and liability cap reviewed.
- [ ] **P1** Legal review by a lawyer done, or consciously skipped. **(owner)**
- [ ] **P1** Delete or update the stale drafts in `docs/legal/` — re-confirmed 2026-10-01, both still say "DRAFT" — so the repo has one authoritative version (the TSX pages).
- [ ] **P2** Trade name: decide whether to register the business (sole proprietorship registration, GST, MSME/Udyam). See the accounts list.
- [ ] **P2** If you invoice clients, decide on GST registration and invoicing format. **(owner)**
- [x] Cookie consent behaves as described in the policy (analytics off until accepted), verified in code.
- [x] No third-party embeds or trackers beyond those disclosed, verified in code (Calendly is a link, not an embed).
- [ ] **P2** Contract template, NDA template and a standard proposal ready for the first enquiry. **(owner)**
- [x] Copyright notice year is dynamic (`new Date().getFullYear()`), verified in code.

## 11. Design, UX and accessibility

- [x] Skip-to-content link, verified in code.
- [x] Focus-visible styles on interactive elements, verified in code.
- [x] External links carry `rel="noopener noreferrer"`, and new-tab links have screen-reader text, verified in code.
- [ ] **P1** Test on real devices: iPhone Safari, Android Chrome, iPad, and a small laptop.
- [ ] **P1** Test at widths 320, 375, 768, 1024, 1440 and 1920 px.
- [ ] **P1** Keyboard-only walkthrough: navbar, mobile menu, form, cookie banner, footer.
- [ ] **P2** Screen reader spot check (VoiceOver) on Home and Contact.
- [ ] **P1** Colour contrast meets WCAG AA for body text, muted text and buttons (light and dark sections).
- [ ] **P2** `prefers-reduced-motion` respected by reveal animations and the hero graphic.
- [ ] **P1** Forms have labels, errors are announced, and required fields are marked.
- [ ] **P1** Favicons: `favicon.ico`, `icon.svg` and `apple-icon.png` appear correctly in browser tabs and the iOS home screen.
- [ ] **P2** Add a web app manifest and Android icons only if you want them.
- [ ] **P2** Fonts (Geist, Geist Mono) load without a layout shift.
- [ ] **P2** Text remains readable with browser zoom at 200%.
- [ ] **P2** Print styles are fine for the legal pages.

## 12. Performance and reliability

- [ ] **P1** Lighthouse on production for Home, Work and Contact: aim at 90 or above for Performance, Accessibility, Best Practices and SEO.
- [ ] **P2** Core Web Vitals in Vercel Speed Insights are green after a few days of traffic.
- [ ] **P2** No large unoptimised images (the site uses SVG plus a small number of raster files).
- [ ] **P1** The Open Graph image renders quickly and stays under platform size limits — **re-check after the `next/og` security fix above**, since that's the code path involved.
- [ ] **P2** Function region for `/api/contact` is close to India where possible.
- [ ] **P1** Uptime monitoring on `/` and the contact route (UptimeRobot, Better Stack or similar).
- [ ] **P1** Error alerts: Vercel log alerts or an email notification for failed enquiries (Resend 502s).
- [ ] **P0** Rollback plan noted: how to revert to the previous Vercel deployment, and how to re-enable `COMING_SOON`.

## 13. Security

- [x] No secrets in the repo or client bundle (only `NEXT_PUBLIC_*` values are exposed), verified in code.
- [x] HTML in emails is escaped (`escapeHtml`), verified in code.
- [ ] **P0** Fix the critical Next.js `next/og` RCE (see "New since 2026-09-26" at the top) — the single most important item in this whole checklist.
- [ ] **P1** Security headers reviewed (CSP, `X-Content-Type-Options`, `Referrer-Policy`, `X-Frame-Options`/frame-ancestors, `Permissions-Policy`); re-confirmed 2026-10-01 that `next.config.ts` still has none configured. Check on securityheaders.com.
- [ ] **P2** HSTS is on (Vercel adds it on custom domains).
- [ ] **P1** GitHub repo is private (or intentionally public), branch protection on the production branch, 2FA on the GitHub account.
- [ ] **P1** Vercel account 2FA on; unused tokens revoked.
- [ ] **P1** Resend API key has "sending access" only, and is stored only in Vercel.
- [ ] **P1** Apps Script web app access limited as intended, and the shared secret is strong and rotated if ever leaked.
- [ ] **P1** Google account for Workspace has 2FA or passkeys and a recovery method.
- [ ] **P2** (deferred) Password manager to hold every account from [ACCOUNTS_TO_CREATE.md](ACCOUNTS_TO_CREATE.md) — owner deferred this 2026-10-01.

## 14. Business and operations readiness

- [ ] **P1** Calendly link (`https://calendly.com/mail-prakritsolutions/30min`) opens, shows real availability in IST, and matches "Monday to Friday, 10 AM to 6 PM IST".
- [ ] **P2** Calendly account uses the new business email, notifications go to you, and the event has a good description and confirmation text.
- [ ] **P2** Calendly connects to Google Calendar and generates a Meet link.
- [x] WhatsApp number `+91 90335 19764` confirmed as a WhatsApp Business profile 2026-10-01 (name "Prakrit Solutions" shown publicly, plus a product catalogue). Owner confirms it's up to date.
- [x] Working hours cross-checked 2026-10-01: Google Business Profile shows "Open · Closes 6 pm", consistent with the site's "Monday to Friday, 10 AM to 6 PM IST". Calendly's actual availability wasn't checked.
- [ ] **P1** Portfolio proof: BookCargo and MyO App Store links are live and current (`case-studies.ts`).
- [ ] **P2** Case study screenshots or visuals are approved by the clients, if you add any.
- [ ] **P1** Proposal, pricing approach and payment method ready (bank account, UPI, invoicing tool).
- [ ] **P2** Decide on a CRM or keep using the Sheet; define enquiry statuses.

## 15. Social profiles and brand identity

- [ ] **P1** All accounts in [ACCOUNTS_TO_CREATE.md](ACCOUNTS_TO_CREATE.md) created with a consistent name, handle, logo, banner and bio. Done: LinkedIn, Facebook, Instagram, GitHub, WhatsApp Business, Google Business Profile, Search Console, Bing Webmaster Tools. Deferred by owner: YouTube, X, password manager.
- [x] LinkedIn company page URL added to `socialLinks` — done 2026-10-01 (`https://www.linkedin.com/company/prakritsolutions/`), verified in code and live.
- [ ] **P2** (deferred) X profile URL added to `socialLinks` — owner deferred creating the X account 2026-10-01.
- [x] Instagram and Facebook added to `socialLinks` (commit `fd8f5d0`), verified in code and live.
- [x] GitHub organisation link is set, verified in code.
- [ ] **P2** Every profile links back to `https://prakritsolutions.in` with a UTM-tagged link so attribution shows in the Sheet.
- [ ] **P1** Profile bios use the same tagline and description as the site. LinkedIn's does (confirmed 2026-10-01); Facebook/Instagram not checked.
- [ ] **P2** Logo exported in the sizes each platform needs; brand colours and fonts noted somewhere.
- [ ] **P1** Voice rules followed in all outbound posts: human, polite, specific, no hype, no false urgency; no automation on LinkedIn/WhatsApp/email.
- [ ] **P1** Launch post drafted and approved; first 3 posts queued. LinkedIn has 0 posts so far (confirmed 2026-10-01).

## 16. Go-live day sequence

All **P0** — this is launch day itself, run in order. Step 0 added 2026-10-01: fix the critical vulnerability before anything else.

0. [ ] **P0** Fix the critical Next.js `next/og` RCE (section 2 / section 13) and re-verify `tsc`/`eslint`/`build`.
1. [ ] Final backup of out-of-repo state (Sheet, Apps Script secret; password manager deferred, so note credentials somewhere safe instead).
2. [ ] Freeze content; run `npm run lint` and `npx tsc --noEmit` one last time.
3. [ ] Merge `preview` into the production branch (fast-forward or merge commit).
4. [ ] Confirm Production env vars (section 3) and redeploy.
5. [ ] Unset `COMING_SOON` on Production and redeploy.
6. [ ] Open the live site in a private window; click through every page and link.
7. [ ] Submit a real test enquiry; confirm emails and the Sheet row.
8. [ ] Accept cookies once and confirm the GA4 real-time hit.
9. [ ] Check `robots.txt`, `sitemap.xml`, canonical tags, no `noindex`.
10. [ ] Submit the sitemap in Search Console and Bing — both properties already verified (2026-10-01), so this is just the submit step.
11. [ ] Share a link on LinkedIn and WhatsApp to validate preview cards (X deferred).
12. [ ] Publish the launch post and tell your first contacts.
13. [ ] Watch Vercel logs, Resend and the Sheet for the first 24 hours.

## 17. First 30 days after launch

- [ ] **P1** Day 1: check errors in Vercel logs, and that the first real enquiry flows through.
- [ ] **P1** Week 1: Search Console shows the site indexed; fix any coverage errors.
- [ ] **P2** Week 1: review Speed Insights and GA4 for the top pages and drop-off points.
- [ ] **P2** Week 2: review which sources bring enquiries (Sheet "Source" column).
- [ ] **P1** Week 2: reply to every enquiry within two business days, and record outcomes.
- [ ] **P2** Week 4: refresh case studies or add a new one; re-audit this checklist.
- [ ] **P2** Month 2: decide on the free tools and a blog or writing plan.
- [ ] **P2** Monthly: rotate nothing that does not need it, but verify backups, renewals (domain, Workspace) and the Sheet clean-up.
