import { writeFileSync } from "node:fs";
import { flyers } from "./flyers.mjs";

const esc = (s) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
const hl = (s) => esc(s).replace(/\*(.+?)\*/g, "<em>$1</em>");
const WA = `<svg viewBox="0 0 24 24"><path fill-rule="evenodd" d="M17.5 14.4c-.3-.1-1.8-.9-2-1s-.5-.1-.7.1-.8 1-1 1.2-.4.2-.7.1c-.3-.1-1.3-.5-2.4-1.5-.9-.8-1.5-1.8-1.7-2.1-.2-.3 0-.5.1-.6l.5-.5c.1-.2.2-.3.3-.5s0-.4 0-.5-.7-1.6-.9-2.2c-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4s-1 1-1 2.4 1 2.8 1.2 3c.1.2 2 3.1 4.9 4.3.7.3 1.2.5 1.6.6.7.2 1.3.2 1.8.1.5-.1 1.8-.7 2-1.4.3-.7.3-1.3.2-1.4-.1-.1-.3-.2-.6-.3zM12 2a10 10 0 0 0-8.6 15L2 22l5.2-1.4A10 10 0 1 0 12 2z"/></svg>`;
const CHECK = `<svg viewBox="0 0 24 24"><path d="M5 12.5l4.5 4.5L19 7.5" fill="none" stroke="currentColor" stroke-width="3.2" stroke-linecap="round" stroke-linejoin="round"/></svg>`;

const css = `
*{box-sizing:border-box;margin:0;padding:0}
body{width:1080px;font-family:'Geist','Helvetica Neue',Arial,sans-serif;overflow:hidden;color:var(--fg);background:var(--bg)}
body.story{height:1920px;--pad:88px 88px 170px;--top:150px;--h1:104px;--li:40px}
body.post{height:1350px;--pad:72px 88px 80px;--top:72px;--h1:84px;--li:34px}
.dark{--bg:radial-gradient(900px 700px at 100% 0%,rgba(0,50,234,.55),transparent 70%),radial-gradient(700px 600px at 0% 100%,rgba(24,250,253,.18),transparent 70%),#091127;--fg:#fafaf8;--mut:#c4c7d4;--eyebrow:#18fafd;--em1:#4f7bff;--em2:#18fafd;--chip:rgba(250,250,248,.22);--chipbg:rgba(250,250,248,.06);--card:#fafaf8;--cardfg:#091127;--cardmut:#5d5f68;--foot:#a3a5ae;--footb:#fafaf8;--tile:transparent;--line:rgba(250,250,248,.16)}
.light{--bg:radial-gradient(900px 700px at 100% 0%,rgba(0,50,234,.12),transparent 70%),radial-gradient(700px 600px at 0% 100%,rgba(24,250,253,.22),transparent 70%),#fafaf8;--fg:#091127;--mut:#4a4d58;--eyebrow:#0032ea;--em1:#0032ea;--em2:#0a8fd8;--chip:rgba(9,17,39,.18);--chipbg:rgba(9,17,39,.04);--card:#091127;--cardfg:#fafaf8;--cardmut:#a3a5ae;--foot:#5d5f68;--footb:#091127;--tile:transparent;--line:rgba(9,17,39,.14)}
.blue{--bg:radial-gradient(800px 700px at 100% 0%,rgba(24,250,253,.35),transparent 65%),linear-gradient(160deg,#0032ea,#001a8a);--fg:#fafaf8;--mut:#d6defb;--eyebrow:#18fafd;--em1:#18fafd;--em2:#18fafd;--chip:rgba(250,250,248,.35);--chipbg:rgba(250,250,248,.1);--card:#fafaf8;--cardfg:#091127;--cardmut:#5d5f68;--foot:#c3cdf7;--footb:#fafaf8;--tile:#fafaf8;--line:rgba(250,250,248,.28)}
.mint{--bg:linear-gradient(155deg,#18fafd,#3d8bff 120%);--fg:#091127;--mut:#0b1b45;--eyebrow:#0032ea;--em1:#0032ea;--em2:#001a8a;--chip:rgba(9,17,39,.35);--chipbg:rgba(250,250,248,.35);--card:#091127;--cardfg:#fafaf8;--cardmut:#a3a5ae;--foot:#0b1b45;--footb:#091127;--tile:transparent;--line:rgba(9,17,39,.3)}
.wrap{position:relative;width:100%;height:100%;padding:var(--pad);display:flex;flex-direction:column}
.wrap{padding-top:var(--top)}
.brand{display:flex;align-items:center;gap:22px}
.brand .t{width:96px;height:96px;border-radius:24px;background:var(--tile);display:grid;place-items:center}
.brand img{width:112px;height:112px;margin:-8px -10px -8px -8px}
.brand .t img{width:90px;height:90px;margin:0}
.brand span{font-size:42px;font-weight:700;letter-spacing:-.01em}
.body{margin-top:auto;padding-top:40px;display:flex;flex-direction:column}
.eyebrow{font-size:28px;font-weight:600;letter-spacing:.14em;text-transform:uppercase;color:var(--eyebrow)}
h1{margin-top:26px;font-size:calc(var(--h1) * var(--k,1));line-height:1.04;font-weight:800;letter-spacing:-.035em}
h1 em,.sub em{font-style:normal;background:linear-gradient(90deg,var(--em1),var(--em2));-webkit-background-clip:text;color:transparent}
.sub{margin-top:30px;font-size:34px;line-height:1.4;color:var(--mut);max-width:860px}
.sub em{font-weight:700}
.chips{margin-top:40px;display:flex;flex-wrap:wrap;gap:16px}
.chips b{font-weight:600;font-size:29px;padding:14px 28px;border-radius:100px;border:2px solid var(--chip);background:var(--chipbg)}
.list{margin-top:38px;list-style:none;display:grid;gap:18px}
.list li{display:flex;align-items:center;gap:22px;font-size:var(--li);font-weight:600;letter-spacing:-.01em}
.list li i{flex:none;width:52px;height:52px;border-radius:50%;background:linear-gradient(135deg,var(--em1),var(--em2));display:grid;place-items:center;color:#fff}
.list li i svg{width:30px;height:30px}
.steps{margin-top:36px;display:grid;gap:0;border-top:2px solid var(--line)}
.steps div{display:flex;align-items:baseline;gap:28px;padding:20px 0;border-bottom:2px solid var(--line)}
.steps b{flex:none;width:300px;font-size:calc(var(--li) - 2px);font-weight:700;color:var(--eyebrow)}
.steps span{font-size:calc(var(--li) - 6px);line-height:1.3;color:var(--mut);font-weight:500}
body.post .steps div{padding:11px 0}body.post .steps b,body.post .steps span{font-size:27px}body.post .steps{margin-top:26px}
.cta{margin-top:48px;display:flex;align-items:center;gap:28px;background:var(--card);color:var(--cardfg);border-radius:30px;padding:30px 40px}
.wa{flex:none;width:92px;height:92px;border-radius:50%;background:#25d366;display:grid;place-items:center}
.wa svg{width:54px;height:54px;fill:#fff}
.cta small{display:block;font-size:26px;font-weight:500;color:var(--cardmut)}
.cta strong{display:block;margin-top:4px;font-size:46px;font-weight:800;letter-spacing:-.01em}
.foot{margin-top:30px;display:flex;justify-content:space-between;font-size:28px;color:var(--foot);font-weight:500}
.foot b{color:var(--footb);font-weight:600}
.bar{position:absolute;left:0;right:0;bottom:0;height:16px;background:linear-gradient(90deg,#18fafd,#0032ea)}
`;

function page(f) {
  const len = f.title.replace(/\*/g, "").length;
  const k = len > 70 ? 0.74 : len > 52 ? 0.84 : len > 36 ? 0.93 : 1;
  const extra = f.layout === "list" ? `<ul class="list">${f.items.map((i) => `<li><i>${CHECK}</i>${esc(i)}</li>`).join("")}</ul>`
    : f.layout === "steps" ? `<div class="steps">${f.items.map(([a, b]) => `<div><b>${esc(a)}</b><span>${esc(b)}</span></div>`).join("")}</div>`
    : f.chips ? `<div class="chips">${f.chips.map((c) => `<b>${esc(c)}</b>`).join("")}</div>` : "";
  const sub = f.layout === "steps" || f.layout === "list" ? `<p class="sub" style="font-size:30px;margin-top:22px">${hl(f.sub)}</p>` : `<p class="sub">${hl(f.sub)}</p>`;
  const cta = f.cta === "book"
    ? `<div class="cta"><div class="wa" style="background:#0032ea"><svg viewBox="0 0 24 24"><path d="M7 2v3M17 2v3M3.5 9h17M5 4h14a2 2 0 0 1 2 2v13a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round"/></svg></div><div><small>Book a call, or message us on WhatsApp</small><strong>+91 90335 19764</strong></div></div>`
    : `<div class="cta"><div class="wa">${WA}</div><div><small>${f.hours ? "Message us on WhatsApp · Mon to Fri, 10 AM to 6 PM IST" : "Message us on WhatsApp"}</small><strong>+91 90335 19764</strong></div></div>`;
  const logo = f.theme === "blue" ? `<div class="t"><img src="logo-mark.svg" alt=""></div>` : `<img src="logo-mark.svg" alt="">`;
  return `<!doctype html><html><head><meta charset="utf-8"><link href="https://fonts.googleapis.com/css2?family=Geist:wght@400;500;600;700;800&display=swap" rel="stylesheet"><style>${css}</style></head>
<body class="${f.theme}" id="b"><div class="wrap" style="--k:${k}">
<div class="brand">${logo}<span>Prakrit Solutions</span></div>
<div class="body"><div class="eyebrow">${esc(f.eyebrow)}</div><h1>${hl(f.title)}</h1>${sub}${extra}${cta}
<div class="foot"><b>prakritsolutions.in</b><span>hello@prakritsolutions.in</span></div></div><div class="bar"></div></div>
<script>document.body.classList.add(location.hash.slice(1)||'post')</script></body></html>`;
}

const jobs = [];
flyers.forEach((f, i) => {
  const n = String(i + 1).padStart(2, "0");
  const file = `series/${n}-${f.slug}.html`;
  writeFileSync(new URL("./" + file, import.meta.url), page(f).replaceAll('src="logo-mark.svg"', 'src="../logo-mark.svg"'));
  jobs.push(`${n}-${f.slug}`);
});
writeFileSync(new URL("./series/jobs.txt", import.meta.url), jobs.join("\n") + "\n");
console.log(jobs.length, "flyers");
