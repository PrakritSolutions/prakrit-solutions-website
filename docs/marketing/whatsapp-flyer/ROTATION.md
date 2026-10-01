# WhatsApp flyer rotation (34 weeks)

One flyer per week. Each has a **Status** version (1080x1920) and a **Group** version (1080x1350) in `series/`.
The original flyer (`prakrit-whatsapp-*.png`) can be used as a bonus or re-run week.

| Week | Topic | Theme | File prefix |
|---|---|---|---|
| 1 | Six things we build well. | dark | series/01-what-we-build |
| 2 | Apps your customers will keep. | light | series/02-mobile-apps |
| 3 | Web products that scale with your team. | blue | series/03-web-apps |
| 4 | Does off-the-shelf software almost fit? | dark | series/04-custom-software |
| 5 | The part users never see is the part that keeps it running. | mint | series/05-backend-apis |
| 6 | AI that does a real job. | dark | series/06-ai-solutions |
| 7 | Bring a language model into the software you already run. | blue | series/07-llm-integration |
| 8 | Assistants scoped to a real workflow. | light | series/08-ai-assistants |
| 9 | Still reading contracts and forms by hand? | mint | series/09-document-intelligence |
| 10 | Can your team find what your business knows? | dark | series/10-ai-search |
| 11 | How automation actually works. | light | series/11-automation-flow |
| 12 | What could we take off your plate? | blue | series/12-automation-examples |
| 13 | Built for your first customer and your thousandth. | dark | series/13-saas-platforms |
| 14 | Account, billing and support in one place. | mint | series/14-customer-portals |
| 15 | Can you see the numbers that run your business? | light | series/15-admin-dashboards |
| 16 | Storefront, checkout and inventory, tuned to how you sell. | blue | series/16-ecommerce |
| 17 | Tired of the back-and-forth to book a slot? | dark | series/17-booking-platforms |
| 18 | Is your customer data stuck in different tools? | mint | series/18-crm-integrations |
| 19 | The software that never makes the roadmap, but should. | light | series/19-internal-tools |
| 20 | Running on spreadsheets and WhatsApp? | blue | series/20-spreadsheets |
| 21 | Every workaround adds cost. | dark | series/21-outgrown |
| 22 | App idea, but not sure where to start? | mint | series/22-app-idea |
| 23 | From first call to launch. | dark | series/23-process |
| 24 | We solve the underlying problem, not just the requested feature. | light | series/24-business-first |
| 25 | One team from product thinking to launch. | blue | series/25-end-to-end |
| 26 | Modern technology, only where it earns its place. | dark | series/26-modern-engineering |
| 27 | Shipping a first version? Extending a live product? Both work. | mint | series/27-startups-and-teams |
| 28 | Launch is a milestone, not the ending. | light | series/28-long-term |
| 29 | What should I have ready before reaching out? | blue | series/29-faq-ready |
| 30 | Do you work with early-stage startups? | dark | series/30-faq-startups |
| 31 | What happens after I message you? | light | series/31-faq-reply |
| 32 | Book a 30-minute call. | mint | series/32-book-a-call |
| 33 | Native or cross-platform? It depends. | dark | series/33-native-or-cross |
| 34 | Old system holding the business back? | blue | series/34-legacy-modernization |

## Editing

- Copy lives in `flyers.mjs`; layout and colours in `generate.mjs`.
- Regenerate HTML: `node generate.mjs`
- Re-render one flyer: `./render.sh 05-backend-apis` (needs Google Chrome)
- Re-render all: `cat series/jobs.txt | xargs -P 6 -I{} ./render.sh {}`

## Posting notes

- Draft only: the owner approves and posts; check each group's rules first.
- Copy only restates what the website already says. No client names, metrics or outcomes.
