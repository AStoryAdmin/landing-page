/**
 * Phone-first fix 3 measurements (docs/premium/CHIEF-LOG.md "Phone-first fix 3").
 *
 *   node qa/pf-fix3-measure.mjs <base url> [label]
 *
 * Page heights at 390x844 and 1024x768 with the root font at 150 %, and the
 * home book section (#book) at 390 with its parts. Also: page height total
 * and the footer height for each row. Supabase hosts answer 503.
 */
import { chromium } from "playwright";
const base = (process.argv[2] ?? "http://localhost:5412").replace(/\/$/, "");
const label = process.argv[3] ?? base;
const browser = await chromium.launch();
async function open(path, width, height, big) {
  const ctx = await browser.newContext({ viewport: { width, height }, reducedMotion: "reduce" });
  const page = await ctx.newPage();
  await page.route(/supabase\.co|supabase\.stub\.test/, (r) => r.fulfill({ status: 503, body: "{}" }));
  await page.goto(base + path, { waitUntil: "networkidle" });
  /* 150 % text as a stylesheet after load, then 1.5 s to settle: setting the
     inline style before hydration measured unevenly between runs. */
  if (big) await page.evaluate(() => { const s = document.createElement("style"); s.textContent = "html{font-size:150% !important}"; document.head.appendChild(s); });
  await page.evaluate(() => document.fonts.ready);
  await page.waitForTimeout(big ? 1500 : 800);
  return { ctx, page };
}
const out = { label };
for (const [name, path, w, h, big] of [
  ["organizations 1024@150", "/organizations/", 1024, 768, true],
  ["organizations 390", "/organizations/", 390, 844, false],
  ["pricing 390", "/pricing/", 390, 844, false],
  ["pricing 1024@150", "/pricing/", 1024, 768, true],
  ["care 390", "/care-communities/", 390, 844, false],
  ["get-the-app 390", "/get-the-app/", 390, 844, false],
  ["join 390", "/join/", 390, 844, false],
]) {
  const { ctx, page } = await open(path, w, h, big);
  out[name] = await page.evaluate(() => ({ page: document.documentElement.scrollHeight, footer: Math.round(document.querySelector("footer").getBoundingClientRect().height), rootPx: getComputedStyle(document.documentElement).fontSize }));
  await ctx.close();
}
{
  const { ctx, page } = await open("/", 390, 844, false);
  /* Lazy images first: scroll the section through the window. */
  await page.evaluate(async () => {
    const s = document.querySelector("#book");
    s.scrollIntoView();
    for (let y = 0; y < s.offsetHeight; y += 400) {
      window.scrollBy(0, 400);
      await new Promise((r) => setTimeout(r, 150));
    }
    await Promise.all([...s.querySelectorAll("img")].map((i) => (i.complete || !i.offsetParent ? 0 : Promise.race([new Promise((r) => (i.onload = i.onerror = r)), new Promise((r) => setTimeout(r, 4000))]))));
  });
  await page.waitForTimeout(400);
  out["home #book 390"] = await page.evaluate(() => {
    const s = document.querySelector("#book");
    const r = (sel) => {
      const e = s.querySelector(sel);
      if (!e) return null;
      const b = e.getBoundingClientRect();
      return b.height ? Math.round(b.height) : 0;
    };
    return { section: Math.round(s.getBoundingClientRect().height), head: r("h2"), lead: r(".lead"), wrap: r(".book-wrap"), go: r(".go") };
  });
  await ctx.close();
}
console.log(JSON.stringify(out, null, 1));
await browser.close();
