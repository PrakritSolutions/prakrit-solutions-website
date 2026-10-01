# Prakrit Solutions: Launch Checklist

Audit date: 2026-09-26 · Branch: `preview` · Site: https://prakritsolutions.in

Tick `[x]` when an item is done. Items already true at audit time are pre-ticked (marked *verified in code*) so nothing is forgotten; re-confirm them on launch day. Items marked **(owner)** cannot be done from code.

Related: [PLACEHOLDER_DATA.md](PLACEHOLDER_DATA.md) · [ACCOUNTS_TO_CREATE.md](ACCOUNTS_TO_CREATE.md)

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

- [ ] Decide the launch date. The legal effective date is **1 October 2026** (`src/lib/legal-config.ts`); launch on or after it, or change the date. **(owner)**
- [ ] Decide how `preview` reaches production: merge `preview` into `main`, or point Vercel Production at `preview`. `main` is 34 commits behind. **(owner)**
- [ ] Get written approval from Dealerwerx before naming them, or remove/anonymise the case study (`src/lib/content/case-studies.ts`, slug `dealerwerx`). **(owner)**
- [ ] Confirm the MyO case study is approved for publication (client is anonymised as "Restaurant-technology client"). **(owner)**
- [ ] Confirm BookCargo has no objection to being named as a case study. **(owner)**
- [ ] Decide whether the Privacy Policy and Terms get a lawyer's review before launch. **(owner)**
- [ ] Decide whether launch waits for the two free tools (SQL Query Generator, Invoice Extractor) or ships without them. Nothing on the site currently references them.

## 2. Code and build health

- [x] TypeScript passes (`npx tsc --noEmit`), verified 2026-09-26.
- [x] ESLint passes (`npm run lint`), verified 2026-09-26.
- [ ] `npm run build` succeeds locally with production env values.
- [ ] Vercel production build for the merge commit succeeds with no warnings that matter.
- [ ] No `console.log` or debug output left in `src/`.
- [x] No `TODO`/`FIXME` markers in `src/` or `integrations/`, verified in code.
- [ ] Pin the Node version (`engines` in `package.json` or `.nvmrc`); Next 16.3.4 needs Node 20.9 or later.
- [ ] `npm audit` reviewed; no high or critical vulnerabilities in production dependencies.
- [ ] Dependencies are the versions you intend (`npm ci` from the lockfile works on a clean clone).
- [ ] Replace the boilerplate `README.md` (still the create-next-app default) with a real one.
- [ ] Optional: add CI (lint + tsc) and a few tests (source description, validation, Sheet formula guard).

## 3. Environment variables (Vercel dashboard, Production scope)

- [ ] `COMING_SOON` is **unset or not `true`** on Production. It was set to `true` on 2026-09-11 (commit d10f3b6); this is the main switch for going live.
- [ ] `NEXT_PUBLIC_SITE_URL` is **unset** on Production (or exactly `https://prakritsolutions.in`). Any other value turns on the draft banner and `noindex`.
- [ ] `NEXT_PUBLIC_SITE_URL` on Preview is the draft URL, so draft stays noindexed.
- [ ] `RESEND_API_KEY` is set on Production.
- [ ] `NEXT_PUBLIC_GA_MEASUREMENT_ID` is set on Production to the **production** GA4 property (not the draft one).
- [ ] `SHEETS_WEBHOOK_URL`, `SHEETS_WEBHOOK_SECRET`, `SHEETS_URL` are set on Production.
- [ ] The Apps Script property `WEBHOOK_SECRET` matches `SHEETS_WEBHOOK_SECRET`.
- [ ] No secrets committed to git (`.env.local` is ignored; `.env.example` holds names only).
- [ ] The `VERCEL_OIDC_TOKEN` in local `.env.local` is not needed in production and is not committed.
- [ ] Redeploy after changing any env var (they apply only to new deployments).

## 4. Domain, DNS and hosting

- [ ] `prakritsolutions.in` is added to the Vercel project and shows as valid.
- [ ] Apex domain is the primary; `www.prakritsolutions.in` redirects to the apex (the canonical URL is the apex).
- [ ] HTTPS certificate is issued and auto-renewing; the http to https redirect works.
- [ ] Domain auto-renew is on at the registrar (registered 2026-08-11).
- [ ] Registrar account has 2FA and a recovery email you control.
- [ ] Domain WHOIS privacy is on.
- [ ] Vercel plan limits are acceptable for expected traffic (function invocations, bandwidth).
- [ ] Vercel project team and access are correct (owner account only, or intended members).
- [ ] The draft subdomain (`draft.prakritsolutions.in`) still works and is noindexed, or is intentionally retired.
- [ ] Production branch setting in Vercel points at the intended branch.

## 5. Email deliverability (new domain, so this matters)

- [ ] Resend domain `prakritsolutions.in` shows **Verified**.
- [ ] SPF record present and valid (one SPF record only, covering Resend and Google Workspace).
- [ ] DKIM records for Resend and Google Workspace are present and passing.
- [ ] DMARC record exists (start with `p=none`, tighten later) with a reporting address.
- [ ] `hello@prakritsolutions.in` exists as a real mailbox or alias and you receive mail sent to it.
- [ ] `privacy@prakritsolutions.in` exists (it is published on `/privacy`) and forwards to you.
- [ ] `noreply@prakritsolutions.in` sends successfully (used as the From address; replies go to `hello@`).
- [ ] Send a test to Gmail, Outlook and Yahoo; check inbox vs spam and the "Show original" headers for SPF/DKIM/DMARC pass.
- [ ] Confirmation email to the visitor renders well on mobile and in dark mode.
- [ ] Notification email to `hello@` shows the Source line and the "Open enquiry tracker" link.
- [ ] Email signature uses the real name, title, site and phone or WhatsApp.

## 6. Contact form and lead capture

- [x] Honeypot field present (`website`), server returns a fake success to bots, verified in code.
- [x] Rate limit of 5 per hour per IP (best-effort, per instance), verified in code.
- [x] Server validation: name, valid email and project description required, verified in code.
- [x] Sheet formula-injection guard, verified in code (commit 3f57eff).
- [x] Source attribution (utm parameters or referrer) recorded, verified in code.
- [ ] End-to-end test on production: submit a real enquiry and confirm (a) notification email arrives at `hello@`, (b) visitor confirmation email arrives, (c) a Sheet row is created with the Source column filled.
- [ ] Test a failure path: bad email, empty project, very long text; error messages read well.
- [ ] Test the form on mobile Safari and Chrome Android.
- [ ] The budget currency defaults correctly (INR for the Asia/Kolkata timezone, otherwise USD) and can be switched.
- [ ] If the live Sheet predates the Source/Fit columns, run `upgrade()` in Apps Script and re-deploy a new version (`integrations/google-sheets/README.md`).
- [ ] The Sheet is private (not "anyone with the link") and shared only with people who need it.
- [ ] Consider durable rate limiting (Upstash or Vercel KV) or Turnstile if spam appears.
- [ ] Privacy: function logs currently include name, email and company (`route.ts`); confirm this is acceptable and covered by the Privacy Policy, or remove those fields from the log.
- [ ] Plan for deleting Sheet rows older than 24 months (the Privacy Policy promises this).
- [ ] Set a routine for replying to enquiries within the stated "couple of business days".

## 7. Analytics, consent and tracking

- [x] GA4 loads only after the visitor accepts cookies, verified in code.
- [x] Declining or clearing consent removes `_ga*` cookies, verified in code.
- [x] "Cookie settings" link in the footer reopens the choice, verified in code.
- [ ] Production GA4 property exists and its Measurement ID is in Vercel Production.
- [ ] GA4 data retention set to 14 months (the Privacy Policy says 14 months).
- [ ] GA4 Google signals and ad personalisation are off unless you intend to use them (and the policy says so).
- [ ] GA4 real-time report shows a hit after accepting cookies on production; nothing appears after declining.
- [ ] Internal traffic (your own IP/devices) is excluded from GA4.
- [ ] Vercel Web Analytics and Speed Insights are enabled for the project and showing data.
- [ ] Cookie banner appears on first visit, is keyboard accessible, and does not cover the contact form on mobile.
- [ ] Consider GA4 key events (form submitted, booking clicked, WhatsApp clicked).
- [ ] Decide on an ad-tracking policy (no pixels are installed today; keep it that way or update the Privacy Policy first).

## 8. SEO and discoverability

- [x] Per-page `<title>` and meta description on every page, verified in code.
- [x] Canonical URLs set per page; apex domain is canonical, verified in code.
- [x] `robots.ts` blocks all crawling on draft, allows `/` and disallows `/api/` on production, verified in code.
- [x] `sitemap.ts` lists the main pages and case studies, verified in code.
- [x] Organization JSON-LD in the root layout, verified in code.
- [x] Open Graph locale `en_IN`, verified in code.
- [x] Dynamic Open Graph image at `src/app/opengraph-image.tsx`, verified in code.
- [ ] After launch, `https://prakritsolutions.in/robots.txt` shows `Allow: /` and a sitemap line (not `Disallow: /`).
- [ ] After launch, view source on the homepage and confirm there is **no** `noindex` meta tag.
- [ ] `https://prakritsolutions.in/sitemap.xml` loads and every URL returns 200.
- [ ] Organization JSON-LD validates in Google's Rich Results Test; `sameAs` lists the real social profiles once they exist.
- [ ] JSON-LD `logo` points to `/apple-icon.png`, which exists (180x180). Consider a larger logo (at least 112x112, ideally 512x512).
- [ ] Add `LocalBusiness` or `ProfessionalService` schema (Surat, India) if you want local visibility.
- [ ] Twitter/X card metadata: the `twitter` block has no `site` or `creator` handle; add once the X account exists.
- [ ] Share the homepage and a case study on LinkedIn, WhatsApp and X and check the preview card (use the platform debuggers).
- [ ] Verify the site in Google Search Console (domain property) and submit the sitemap.
- [ ] Verify the site in Bing Webmaster Tools and submit the sitemap.
- [ ] Case study pages have unique titles and descriptions.
- [ ] Heading structure: exactly one `<h1>` per page.
- [ ] Every image has alt text (or an empty alt if decorative).
- [ ] Check for duplicate content between `www`, apex and the draft domain.
- [ ] Set up Google Business Profile (see accounts list) and keep the NAP (name, address, phone) consistent with the site.

## 9. Content review (read every page aloud)

- [ ] Home: hero, capability strip, what we build, AI, automation, process, why us, case studies teaser, CTA. Check facts and tone.
- [ ] Services page: all four services and their details.
- [ ] Solutions page: AI and automation sections; the workflow diagram reads correctly.
- [ ] Work page and each case study (BookCargo, Dealerwerx, MyO): facts, client approval, technology lists, outcomes.
- [ ] About page: beliefs, name origin, "who we work with".
- [ ] Contact page: details, hours, FAQ, booking button.
- [ ] Privacy Policy and Terms of Service read end to end (see section 10).
- [ ] Coming-soon page copy is fine if it will ever be used again.
- [ ] 404 page (`not-found.tsx`) reads well and links back home.
- [ ] Spelling and grammar pass (Indian or British English, be consistent).
- [ ] No claims you cannot back up (numbers, "years of experience", client counts).
- [ ] No unreleased product or client names other than approved ones.
- [ ] "Dealerwerx" case study clearly states it is unreleased (it currently does); re-check the wording once approved.
- [ ] Add testimonials, client logos or a team photo if you have real ones (none exist today; do not invent them).
- [ ] Replace or verify everything in [PLACEHOLDER_DATA.md](PLACEHOLDER_DATA.md).

## 10. Legal and compliance (India)

- [ ] `legalConfig` values are final: operator `Vaibhav Jhaveri`, title `Proprietor`, effective date, retention 24 months, analytics retention 14 months, liability cap INR 5,000.
- [ ] Privacy Policy names the correct processors: Vercel, Google Analytics, Calendly, Resend, Google (Sheets/Workspace). Add anything new (for example a CRM or newsletter tool).
- [ ] Grievance Officer details are present and reachable (DPDP Act 2023 context).
- [ ] Privacy Policy states what is sent to the Google Sheet and where it is stored.
- [ ] Terms of Service: governing law and Surat jurisdiction, IP ownership, payment terms and liability cap reviewed.
- [ ] Legal review by a lawyer done, or consciously skipped. **(owner)**
- [ ] Delete or update the stale drafts in `docs/legal/` (they still say "DRAFT" and `www`), so the repo has one authoritative version (the TSX pages).
- [ ] Trade name: decide whether to register the business (sole proprietorship registration, GST, MSME/Udyam). See the accounts list.
- [ ] If you invoice clients, decide on GST registration and invoicing format. **(owner)**
- [ ] Cookie consent behaves as described in the policy (analytics off until accepted).
- [ ] No third-party embeds or trackers beyond those disclosed (Calendly is a link, not an embed).
- [ ] Contract template, NDA template and a standard proposal ready for the first enquiry. **(owner)**
- [ ] Copyright notice year is dynamic (`new Date().getFullYear()`), verified in code.

## 11. Design, UX and accessibility

- [x] Skip-to-content link, verified in code.
- [x] Focus-visible styles on interactive elements, verified in code.
- [x] External links carry `rel="noopener noreferrer"`, and new-tab links have screen-reader text, verified in code.
- [ ] Test on real devices: iPhone Safari, Android Chrome, iPad, and a small laptop.
- [ ] Test at widths 320, 375, 768, 1024, 1440 and 1920 px.
- [ ] Keyboard-only walkthrough: navbar, mobile menu, form, cookie banner, footer.
- [ ] Screen reader spot check (VoiceOver) on Home and Contact.
- [ ] Colour contrast meets WCAG AA for body text, muted text and buttons (light and dark sections).
- [ ] `prefers-reduced-motion` respected by reveal animations and the hero graphic.
- [ ] Forms have labels, errors are announced, and required fields are marked.
- [ ] Favicons: `favicon.ico`, `icon.svg` and `apple-icon.png` appear correctly in browser tabs and the iOS home screen.
- [ ] Add a web app manifest and Android icons only if you want them.
- [ ] Fonts (Geist, Geist Mono) load without a layout shift.
- [ ] Text remains readable with browser zoom at 200%.
- [ ] Print styles are fine for the legal pages.

## 12. Performance and reliability

- [ ] Lighthouse on production for Home, Work and Contact: aim at 90 or above for Performance, Accessibility, Best Practices and SEO.
- [ ] Core Web Vitals in Vercel Speed Insights are green after a few days of traffic.
- [ ] No large unoptimised images (the site uses SVG plus a small number of raster files).
- [ ] The Open Graph image renders quickly and stays under platform size limits.
- [ ] Function region for `/api/contact` is close to India where possible.
- [ ] Uptime monitoring on `/` and the contact route (UptimeRobot, Better Stack or similar).
- [ ] Error alerts: Vercel log alerts or an email notification for failed enquiries (Resend 502s).
- [ ] Rollback plan noted: how to revert to the previous Vercel deployment, and how to re-enable `COMING_SOON`.

## 13. Security

- [x] No secrets in the repo or client bundle (only `NEXT_PUBLIC_*` values are exposed), verified in code.
- [x] HTML in emails is escaped (`escapeHtml`), verified in code.
- [ ] Security headers reviewed (CSP, `X-Content-Type-Options`, `Referrer-Policy`, `X-Frame-Options`/frame-ancestors, `Permissions-Policy`); none are configured in `next.config.ts` today. Check on securityheaders.com.
- [ ] HSTS is on (Vercel adds it on custom domains).
- [ ] GitHub repo is private (or intentionally public), branch protection on the production branch, 2FA on the GitHub account.
- [ ] Vercel account 2FA on; unused tokens revoked.
- [ ] Resend API key has "sending access" only, and is stored only in Vercel.
- [ ] Apps Script web app access limited as intended, and the shared secret is strong and rotated if ever leaked.
- [ ] Google account for Workspace has 2FA or passkeys and a recovery method.
- [ ] Password manager holds every account from [ACCOUNTS_TO_CREATE.md](ACCOUNTS_TO_CREATE.md).

## 14. Business and operations readiness

- [ ] Calendly link (`https://calendly.com/mail-prakritsolutions/30min`) opens, shows real availability in IST, and matches "Monday to Friday, 10 AM to 6 PM IST".
- [ ] Calendly account uses the new business email, notifications go to you, and the event has a good description and confirmation text.
- [ ] Calendly connects to Google Calendar and generates a Meet link.
- [ ] WhatsApp number `+91 90335 19764` is the number you want public; consider WhatsApp Business (profile, hours, greeting).
- [ ] Working hours on the site match the WhatsApp Business hours, Calendly and Google Business Profile.
- [ ] Portfolio proof: BookCargo and MyO App Store links are live and current (`case-studies.ts`).
- [ ] Case study screenshots or visuals are approved by the clients, if you add any.
- [ ] Proposal, pricing approach and payment method ready (bank account, UPI, invoicing tool).
- [ ] Decide on a CRM or keep using the Sheet; define enquiry statuses.

## 15. Social profiles and brand identity

- [ ] All accounts in [ACCOUNTS_TO_CREATE.md](ACCOUNTS_TO_CREATE.md) created with a consistent name, handle, logo, banner and bio.
- [ ] LinkedIn company page URL added to `socialLinks` in `src/lib/site-config.ts`.
- [ ] X profile URL added to `socialLinks`.
- [ ] Any other profile you want in the footer is added to `socialLinks` (empty entries are hidden automatically).
- [x] GitHub organisation link is set, verified in code.
- [ ] Every profile links back to `https://prakritsolutions.in` with a UTM-tagged link so attribution shows in the Sheet.
- [ ] Profile bios use the same tagline and description as the site.
- [ ] Logo exported in the sizes each platform needs; brand colours and fonts noted somewhere.
- [ ] Voice rules followed in all outbound posts: human, polite, specific, no hype, no false urgency; no automation on LinkedIn/WhatsApp/email.
- [ ] Launch post drafted and approved; first 3 posts queued.

## 16. Go-live day sequence

1. [ ] Final backup of out-of-repo state (env values in the password manager, Sheet, Apps Script secret).
2. [ ] Freeze content; run `npm run lint` and `npx tsc --noEmit` one last time.
3. [ ] Merge `preview` into the production branch (fast-forward or merge commit).
4. [ ] Confirm Production env vars (section 3) and redeploy.
5. [ ] Unset `COMING_SOON` on Production and redeploy.
6. [ ] Open the live site in a private window; click through every page and link.
7. [ ] Submit a real test enquiry; confirm emails and the Sheet row.
8. [ ] Accept cookies once and confirm the GA4 real-time hit.
9. [ ] Check `robots.txt`, `sitemap.xml`, canonical tags, no `noindex`.
10. [ ] Submit the sitemap in Search Console and Bing.
11. [ ] Share a link on LinkedIn, WhatsApp and X to validate preview cards.
12. [ ] Publish the launch post and tell your first contacts.
13. [ ] Watch Vercel logs, Resend and the Sheet for the first 24 hours.

## 17. First 30 days after launch

- [ ] Day 1: check errors in Vercel logs, and that the first real enquiry flows through.
- [ ] Week 1: Search Console shows the site indexed; fix any coverage errors.
- [ ] Week 1: review Speed Insights and GA4 for the top pages and drop-off points.
- [ ] Week 2: review which sources bring enquiries (Sheet "Source" column).
- [ ] Week 2: reply to every enquiry within two business days, and record outcomes.
- [ ] Week 4: refresh case studies or add a new one; re-audit this checklist.
- [ ] Month 2: decide on the free tools and a blog or writing plan.
- [ ] Monthly: rotate nothing that does not need it, but verify backups, renewals (domain, Workspace) and the Sheet clean-up.
