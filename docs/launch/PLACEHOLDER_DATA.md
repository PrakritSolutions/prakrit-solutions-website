# Placeholder, Draft and Unconfirmed Data

Audit date: 2026-09-26 · Branch: `preview`

Everything on the site that is still a placeholder, a draft value, or a fact that needs your confirmation before going live. The site has no lorem ipsum and no fake testimonials; the items below are the real gaps found by reading the code.

Related: [LAUNCH_CHECKLIST.md](LAUNCH_CHECKLIST.md) · [ACCOUNTS_TO_CREATE.md](ACCOUNTS_TO_CREATE.md)

Legend: **Replace** = must change before launch · **Confirm** = looks real but needs your OK · **Remove** = delete if not used · **Decide** = needs a choice.

## A. Must replace

| # | Where | What is there now | Action |
|---|---|---|---|
| 1 | `src/lib/site-config.ts` → `socialLinks` (LinkedIn) | Empty `href: ""`, so it is hidden in the footer and omitted from JSON-LD `sameAs` | **Replace** with the LinkedIn company page URL once created |
| 2 | `src/lib/site-config.ts` → `socialLinks` (X / Twitter) | Empty `href: ""` | **Replace** with the X profile URL once created |
| 3 | `src/lib/site-config.ts` → `socialLinks` (other platforms) | Only LinkedIn, X and GitHub exist as entries | **Decide** whether to add Instagram, YouTube, Facebook and others; add entries only when the profile exists |
| 4 | `src/app/layout.tsx` → `twitter` metadata | No `site` / `creator` handle | **Replace** by adding the X handle after the account exists |
| 5 | Vercel Production env `COMING_SOON` | Was set to `true` on 2026-09-11 (commit d10f3b6) | **Replace** by unsetting it to go live |
| 6 | Vercel Production env `NEXT_PUBLIC_GA_MEASUREMENT_ID` | Unknown; draft and production use separate GA4 properties | **Replace** with the production Measurement ID (`G-XXXXXXXXXX`) |
| 7 | `.env.example` → `NEXT_PUBLIC_SITE_URL` | `https://draft.prakritsolutions.in` (example for staging) | **Confirm** it stays unset on Production |
| 8 | `README.md` | Default create-next-app boilerplate | **Replace** with a real project README |

## B. Content that needs your confirmation

| # | Where | What is there now | Action |
|---|---|---|---|
| 9 | `src/lib/content/case-studies.ts` → `dealerwerx` | Client named publicly; status "In development"; written approval not confirmed | **Confirm** written approval or **Remove** / anonymise |
| 10 | `case-studies.ts` → `myo` | Client shown as "Restaurant-technology client"; app named MyO (formerly nuBottle) | **Confirm** the client approves publication and the "formerly nuBottle" mention |
| 11 | `case-studies.ts` → `bookcargo` | Named client, two App Store links | **Confirm** client approval and that both App Store links are live |
| 12 | `case-studies.ts` → `myo` `storeLinks` | App Store link for "MyO - My Order" | **Confirm** it is live |
| 13 | `case-studies.ts` → outcomes and durations | For example "roughly a year and a half", "many releases", "full UI redesign" | **Confirm** accuracy with your own records |
| 14 | `case-studies.ts` → `technology` arrays | Lists such as Cashfree, Square, Stripe, Mapbox, AWS Cognito | **Confirm** each is accurate and not under NDA |
| 15 | `src/lib/legal-config.ts` → `effectiveDate` | `1 October 2026` | **Confirm** or update to the real launch date |
| 16 | `legal-config.ts` → `operatorName`, `operatorTitle` | `Vaibhav Jhaveri`, `Proprietor` | **Confirm** (it is published on /privacy and /terms); update if you register a firm or company |
| 17 | `legal-config.ts` → `retentionPeriod`, `analyticsRetention`, `liabilityCap` | `24 months`, `14 months`, `INR 5,000` | **Confirm** these match reality (GA4 retention setting, Sheet clean-up routine, contract terms) |
| 18 | `src/app/privacy/page.tsx`, `src/app/terms/page.tsx` | Published, but counsel review status is unknown | **Decide** on a lawyer review |
| 19 | `docs/legal/PRIVACY_POLICY.md`, `TERMS_OF_SERVICE.md` | Still say "DRAFT: pending legal review" and `[Effective Date]`, use `www` | **Remove** or update so they match the TSX pages |
| 20 | `src/lib/site-config.ts` → `whatsapp`, `whatsappUrl` | `+91-9033519764` | **Confirm** it is the public number you want (ideally a WhatsApp Business number) |
| 21 | `site-config.ts` → `bookingUrl` | `https://calendly.com/mail-prakritsolutions/30min` | **Confirm** the account and slug are the ones you want long-term (the slug is tied to a personal-style mail name) |
| 22 | `site-config.ts` → `hours` | `Monday to Friday, 10 AM to 6 PM IST` | **Confirm** matches Calendly availability |
| 23 | `site-config.ts` → `location` | `Surat, Gujarat, India` | **Confirm**; add a registered address to the legal pages if you need one |
| 24 | `site-config.ts` → `email`, `privacyEmail`, `noreplyEmail` | `hello@`, `privacy@`, `noreply@prakritsolutions.in` | **Confirm** each mailbox or alias exists (see accounts list) |
| 25 | `src/lib/content/faq.ts` | "reply personally, usually within a couple of business days" | **Confirm** you can honour it |
| 26 | Budget ranges in `src/components/forms/contact-form.tsx` | INR and USD ranges | **Confirm** they match how you price |

## C. Marketing copy that makes claims

Read these aloud and confirm you can stand behind them.

| # | Where | Note |
|---|---|---|
| 27 | `src/lib/content/why-us.ts` | "Why us" points |
| 28 | `src/lib/content/process.ts` | Process steps and any time frames |
| 29 | `src/lib/content/services.ts` | Service descriptions and deliverables |
| 30 | `src/lib/content/solutions.ts` | AI and automation capabilities: only list what you can actually deliver |
| 31 | `src/lib/content/what-we-build.ts` | "What we build" list |
| 32 | `src/app/about/page.tsx` | Beliefs, "Who we work with", the Prakrit name story (check the Jain-scripture claim reads the way you want) |
| 33 | `src/app/layout.tsx` → `keywords` | SEO keyword list |

## D. Development-only or unused items

| # | Where | What is there now | Action |
|---|---|---|---|
| 34 | `src/components/layout/draft-banner.tsx` | "Work in progress, this is a draft preview" | **Confirm** it never shows on Production (it appears only when `NEXT_PUBLIC_SITE_URL` differs from production) |
| 35 | `src/app/coming-soon/page.tsx` | "Something new is on its way." | **Decide** whether to keep for future maintenance mode |
| 36 | `case-studies.ts` → `placeholder?: boolean` field, and `case-study-card.tsx` "Placeholder project" pill | Supported by the type but no entry uses it now | **Remove** the dead code, or keep for future drafts |
| 37 | `src/app/opengraph-image.tsx` | Generated image with an embedded logo | **Confirm** wording and design suit social sharing |
| 38 | `src/app/apple-icon.png` (180x180), `icon.svg`, `favicon.ico` | Present | **Confirm** they are the final logo |
| 39 | `public/brand/logo-mark.svg` | Present | **Confirm** it is the final mark; no wordmark or full logo file exists yet |
| 40 | `docs/tools/*.md` | Scope documents for two free tools not yet built | **Decide** whether to build; nothing on the site links to them |

## E. Missing items (not placeholders, but absent)

| # | Gap | Note |
|---|---|---|
| 41 | Testimonials or client quotes | None on site. Add only real ones with permission |
| 42 | Team or founder photo and bio | About page has no person or photo |
| 43 | Client logos | None; requires approval |
| 44 | Blog or articles | None |
| 45 | Case study screenshots or visuals | Text only |
| 46 | Pricing or engagement models page | None; budget ranges appear only in the form |
| 47 | Security headers | Not configured in `next.config.ts` |
