# Accounts to Create or Re-point to Prakrit Solutions

Audit date: 2026-09-26

Goal: every account that represents the business is under the Prakrit Solutions identity (the business email, not a personal one), with a consistent name, logo and bio, and stored in a password manager.

Related: [LAUNCH_CHECKLIST.md](LAUNCH_CHECKLIST.md) · [PLACEHOLDER_DATA.md](PLACEHOLDER_DATA.md)

Status key: **Exists** = the site or repo already depends on it (verify it is under the business identity) · **Create** = not present yet · **Optional** = nice to have.

## Quick list: what still needs creating

This is the short answer. Everything else below is reference detail for when you get to each one — you don't need to read the full tables to know what to do next.

### Already exists — nothing to create (checked off)

- [x] Domain — `prakritsolutions.in` (registered 2026-08-11)
- [x] Google Workspace business email (`hello@`, `privacy@`, `noreply@prakritsolutions.in`)
- [x] Vercel (hosting, Analytics, Speed Insights)
- [x] GitHub organisation — [github.com/PrakritSolutions](https://github.com/PrakritSolutions)
- [x] Resend (transactional email)
- [x] Google Analytics 4
- [x] Google Sheet + Apps Script enquiry tracker
- [x] Calendly (`calendly.com/mail-prakritsolutions`)
- [x] Facebook Page — [facebook.com/prakritsolutions](https://www.facebook.com/prakritsolutions/)
- [x] Instagram account — [instagram.com/prakritsolutions](https://www.instagram.com/prakritsolutions/)
- [x] Google Search Console — verified 2026-10-01 in the browser: `sc-domain:prakritsolutions.in`, owner `mail@prakritsolutions.in`, status **Verified**. Still **no sitemap submitted** (0 listed) — submit `sitemap.xml` once the site is off `COMING_SOON`.
- [x] Bing Webmaster Tools — verified 2026-10-01 in the browser: `prakritsolutions.in` already added under the signed-in account. Same gap: **no sitemap submitted** (0 rows) — submit once off `COMING_SOON`.
- [x] WhatsApp Business profile — confirmed 2026-10-01 via `wa.me/919033519764`: displays the business name **"Prakrit Solutions"** (public profile info only a WhatsApp Business account exposes). A second check via `wa.me/c/919033519764` (the catalog link) also resolves under the same business name, and confirms a product catalogue is enabled. Owner confirms it's up to date. Not independently checked: category, description, hours, or the catalogue's contents — those are only visible inside a logged-in chat, which wasn't available here.
- [x] Google Business Profile — confirmed 2026-10-01 in Business Profile Manager: **"Prakrit Solutions"**, status **Verified** (100%), category **Consultant**, hours show "Open · Closes 6 pm" (consistent with the site). **Gap:** Google's own panel flags "Add place's phone number" — no phone is attached to the listing. Decide whether to add the WhatsApp number there or leave it phone-less.
- [x] LinkedIn Company Page — created 2026-10-01: [linkedin.com/company/prakritsolutions](https://www.linkedin.com/company/prakritsolutions/). Fully set up and verified 2026-10-01: name, tagline, description/overview, industry (Software Development), size (0–1 employees), type (Self Owned), logo, a custom banner graphic, and location (Surat, Gujarat, India) are all live. Added to `socialLinks` in `src/lib/site-config.ts`, so it shows in the footer and in the Organization JSON-LD `sameAs`. A separate **Services Page** was also created and linked ([overview, 9 services listed, "Request services" button, renders on the public Home tab]) — not tracked elsewhere in this doc since it's a LinkedIn-specific feature. Still open: post an intro update (none in the last 90 days).

### Still need to be created — the core list

All four of the original list (Facebook, Instagram, YouTube, X) and the rest of the core list are now accounted for — see "Deferred" below for the ones not happening right now.

### Deferred — not doing right now (owner's call, 2026-10-01)

- [ ] **YouTube** channel
- [ ] **X** (Twitter) profile
- [ ] **Password manager** (1Password/Bitwarden) to hold all of the above

Revisit these when it makes sense; nothing else in this doc or the launch checklist depends on them. Everything past this point — Threads, Telegram, Clutch, GST, Razorpay, Canva, and so on — is optional or lower-priority groundwork, kept in the full tables below (sections 1–5) so you have it when you're ready.

## How to set up every account

1. Use a business email you control (for example `hello@prakritsolutions.in`), never a personal address, and never share a login.
2. Turn on 2FA (authenticator app or passkey, not SMS if avoidable). Store recovery codes offline.
3. Use one consistent name and handle, ideally `prakritsolutions` (fall back to `prakrit.solutions` or `prakritsolutions_` if taken; use the same fallback everywhere).
4. Use one logo (`public/brand/logo-mark.svg`), one banner, the tagline "We build technology that solves real business problems." and the site URL `https://prakritsolutions.in`.
5. Add UTM-tagged links in bios, for example `https://prakritsolutions.in/?utm_source=linkedin&utm_medium=profile`, so the enquiry Sheet shows where leads come from.
6. Add the finished URL to `socialLinks` in `src/lib/site-config.ts` (only LinkedIn, X and GitHub have entries today).
7. Record each account in the tracking table at the bottom of this file.

## 1. Foundation (do these first)

| Account | Status | Why | Notes |
|---|---|---|---|
| Domain registrar (`prakritsolutions.in`) | Exists (registered 2026-08-11) | Owns the identity | Auto-renew on, 2FA, WHOIS privacy, recovery email you control |
| Google Workspace (business email) | Exists (confirm) | `hello@`, `privacy@`, `noreply@` mailboxes and aliases | Confirm all three addresses receive mail; add a catch-all or aliases; enable 2FA |
| Password manager (1Password, Bitwarden) | Deferred (owner's call, 2026-10-01) | Holds every login above | Not doing right now |
| Vercel | Exists | Hosting, Analytics, Speed Insights, env vars | Confirm the account or team is under the business email; 2FA |
| GitHub organisation `PrakritSolutions` | Exists | Repo and `socialLinks` entry | 2FA, private repo, branch protection; set the org profile, logo and bio |
| Resend | Exists | Enquiry and confirmation emails | Confirm the domain is verified and the account uses the business email |
| Google Analytics 4 | Exists (confirm) | Traffic analytics, consent-gated | Separate production and draft properties; 14-month retention |
| Google Search Console | Exists — verified 2026-10-01 (`sc-domain:prakritsolutions.in`, owner `mail@prakritsolutions.in`) | Indexing and sitemap | No sitemap submitted yet; submit `sitemap.xml` once off `COMING_SOON` |
| Bing Webmaster Tools | Exists — verified 2026-10-01 (`prakritsolutions.in` already added) | Bing and DuckDuckGo indexing | No sitemap submitted yet; submit `sitemap.xml` once off `COMING_SOON` |
| Google Sheet "Prakrit Enquiries" and Apps Script | Exists | Lead tracker | Owned by the business Google account; keep private |
| Calendly | Exists | "Book a 30-minute call" | The slug is `mail-prakritsolutions`; confirm it is the business account |
| Google Calendar (business) | Create or confirm | Calendly sync and Meet links | Use the business Workspace calendar |

## 2. Social media

Your starter list, plus the platforms worth considering for a software agency.

| Platform | Priority | Status | Notes |
|---|---|---|---|
| LinkedIn Company Page | High | Exists — fully set up and verified 2026-10-01 ([linkedin.com/company/prakritsolutions](https://www.linkedin.com/company/prakritsolutions/)), already in `socialLinks` | Description, location, banner, logo and a linked Services Page all confirmed live. Only open item: post an intro update |
| X (Twitter) | Medium | Deferred (owner's call, 2026-10-01) | Not doing right now; when revisited, add the handle to `socialLinks` and to `twitter.creator` in `src/app/layout.tsx` |
| Instagram | Medium | Exists — [instagram.com/prakritsolutions](https://www.instagram.com/prakritsolutions/) | Confirm it's set as a Business account; link to the site; already in `socialLinks` (footer and `sameAs`) |
| Facebook Page | Medium | Exists — [facebook.com/prakritsolutions](https://www.facebook.com/prakritsolutions/) | Confirm it's a Page (not a personal profile) under the business account; needed for Meta Business Suite and future ads |
| YouTube channel | Medium | Deferred (owner's call, 2026-10-01) | Not doing right now |
| GitHub organisation | High | Exists | Already linked in the footer; add a profile README and pinned repos |
| Threads | Optional | Create | Follows Instagram identity |
| WhatsApp Business | High | Exists — confirmed 2026-10-01 (business name "Prakrit Solutions" shown on `wa.me/919033519764`) | Owner confirms it's up to date; hours/description/catalogue not independently checked |
| Telegram channel | Optional | Create | Only if you will use it |
| Medium or Dev.to | Optional | Create | Cross-post articles |
| Reddit | Optional | Create | Only for genuine participation; not for promotion |
| Pinterest | Skip unless useful | | Low value for this business |

## 3. Business listings and discovery

| Account | Priority | Notes |
|---|---|---|
| Google Business Profile | High | Exists — verified 2026-10-01 ("Prakrit Solutions", category Consultant, 100% verified). **No phone number on the listing** — add one or decide to leave it out |
| Apple Business Connect | Optional | Apple Maps listing |
| Bing Places | Optional | Import from Google Business Profile |
| Clutch | Medium | Agency reviews; needs real client reviews |
| GoodFirms | Optional | Similar to Clutch |
| DesignRush / TopDevelopers | Optional | Paid or lead-gen directories; check before paying |
| Crunchbase | Optional | Company profile |
| Justdial / Sulekha / IndiaMART | Optional | India directories; expect spam calls |
| Upwork / Fiverr / Freelancer | Decide | Only if you want marketplace leads; keep separate from the brand site |
| Product Hunt | Optional | Useful when the free tools launch |
| AngelList / Wellfound | Optional | Startup client discovery |

## 4. Business, legal and finance (India)

| Account | Priority | Notes |
|---|---|---|
| Current bank account in the business name | High | Even for a proprietorship, a separate current account keeps books clean; confirm required documents with your bank |
| UPI / payment collection (Razorpay, Cashfree, Stripe, PayPal) | Medium | For international clients you may need Stripe or PayPal; check RBI/FEMA rules and purpose codes with your CA |
| Udyam (MSME) registration | Medium | Free, gives a business identity and some benefits |
| GST registration | Decide with your CA | Required above turnover thresholds and for some inter-state service supply |
| Invoicing tool (Zoho Books, Vyapar, Refrens) | Medium | Sequential GST-ready invoices |
| Accounting / CA contact | High | Not an account, but line one up |
| Trademark search or application for "Prakrit Solutions" | Optional | The name is currently an unregistered trade name |
| Professional email signature and letterhead | Low | Not an account |

## 5. Marketing and operations tools

| Account | Priority | Notes |
|---|---|---|
| Meta Business Suite | Medium | Facebook and Instagram scheduling; needs the Facebook Page |
| Canva (business) | Medium | Social assets and proposals |
| Figma | Optional | Design source files |
| Notion or a CRM (HubSpot free, Zoho CRM) | Medium | The Sheet works for now; move when volume grows |
| Zoom or Google Meet | Low | Meet ships with Workspace |
| Uptime monitor (UptimeRobot, Better Stack) | Medium | Alerts if the site or form goes down |
| Newsletter tool (Buttondown, Substack, Mailchimp) | Optional | Only if you start a newsletter; update the Privacy Policy first |
| Cloud storage (Google Drive) | Medium | Contracts, proposals, brand assets in a shared folder |
| App store developer accounts (Apple Developer, Google Play Console) | Only if publishing your own apps | Client apps stay under the client's accounts |
| Anthropic API, Upstash Redis, Cloudflare Turnstile | Only if you build the free tools | See `docs/tools/` |

## 6. Consistency checklist for every profile

- [ ] Name is exactly "Prakrit Solutions".
- [ ] Handle matches across platforms as closely as possible.
- [ ] Logo and banner uploaded at each platform's required size.
- [ ] Bio uses the tagline and the site link with a UTM tag.
- [ ] Contact email is `hello@prakritsolutions.in`.
- [ ] Location is Surat, Gujarat, India.
- [ ] 2FA on and recovery codes stored.
- [ ] Credentials saved in the password manager.
- [ ] Profile URL added to `socialLinks` and to `sameAs` (automatic via `socialLinks`).

## 7. Tracking table (fill in as you go)

| Account | Handle / URL | Created (date) | Login email | 2FA on | In password manager | Added to site |
|---|---|---|---|---|---|---|
| LinkedIn | https://www.linkedin.com/company/prakritsolutions/ | 2026-10-01 | | | | yes |
| X | | | | | | |
| Instagram | https://www.instagram.com/prakritsolutions/ | exists | | | | yes |
| Facebook | https://www.facebook.com/prakritsolutions/ | exists | | | | yes |
| YouTube | | | | | | |
| GitHub | https://github.com/PrakritSolutions | exists | | | | yes |
| Google Business Profile | 08651985715162624971 | exists | | | | n/a |
| WhatsApp Business | https://wa.me/919033519764 | exists | | | | n/a |
| Search Console | sc-domain:prakritsolutions.in | verified | mail@prakritsolutions.in | | | n/a |
| Bing Webmaster | prakritsolutions.in | verified | | | | n/a |
