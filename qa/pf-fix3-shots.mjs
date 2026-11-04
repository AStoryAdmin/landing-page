/**
 * Phone-first fix 3 evidence (docs/premium/CHIEF-LOG.md "Phone-first fix 3").
 *
 *   node qa/pf-fix3-shots.mjs [--base http://localhost:5412] [--before http://localhost:5411]
 *                             [--shots] [--hero] [--cls] [--sweep]
 *
 * Every Supabase request is answered 503 here; nothing reaches a real
 * service and no form is submitted. Output: qa/premium-2026-11/pf-fix3/
 * and a JSON report on stdout.
 */
import { chromium } from "playwright";
import { mkdirSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const arg = (n, f) => {
  const i = process.argv.indexOf("--" + n);
  return i > -1 ? process.argv[i + 1] : f;
};
const flag = (n) => process.argv.includes("--" + n);
const base = arg("base", "http://localhost:5412").replace(/\/$/, "");
const before = arg("before", "http://localhost:5411").replace(/\/$/, "");
const out = join(dirname(fileURLToPath(import.meta.url)), "premium-2026-11", "pf-fix3");
mkdirSync(out, { recursive: true });
const browser = await chromium.launch();
const report = {};

async function open(width, height, { motion = "reduce", cpu = 0 } = {}) {
  const ctx = await browser.newContext({ viewport: { width, height }, reducedMotion: motion });
  const page = await ctx.newPage();
  await page.route(/supabase\.co|supabase\.stub\.test/, (r) => r.fulfill({ status: 503, body: "{}" }));
  if (cpu) {
    const cdp = await ctx.newCDPSession(page);
    await cdp.send("Emulation.setCPUThrottlingRate", { rate: cpu });
  }
  return { ctx, page };
}
async function load(url, w, h, o = {}) {
  const r = await open(w, h, o);
  await r.page.goto(url, { waitUntil: "networkidle" });
  /* 150 % text as a stylesheet after load, then time to settle. */
  if (o.big) await r.page.evaluate(() => { const s = document.createElement("style"); s.textContent = "html{font-size:150% !important}"; document.head.appendChild(s); });
  await r.page.evaluate(() => document.fonts.ready);
  await r.page.waitForTimeout(o.big ? 1500 : 600);
  return r;
}
/* Scroll so the element's top sits `offset` px under the window top, then
   shoot the window. Returns the element's text. */
async function shotAt(name, url, w, h, sel, o = {}) {
  const { ctx, page } = await load(url, w, h, o);
  const text = await page.evaluate(
    async ([s, offset]) => {
      const e = document.querySelector(s);
      if (!e) return null;
      window.scrollBy(0, e.getBoundingClientRect().top - offset);
      await new Promise((r) => setTimeout(r, 500));
      const box = e.closest("section") ?? e;
      await Promise.all(
        [...box.querySelectorAll("img")].map((i) =>
          i.complete || !i.offsetParent ? 0 : Promise.race([new Promise((r) => (i.onload = i.onerror = r)), new Promise((r) => setTimeout(r, 4000))]),
        ),
      );
      return (box.innerText || "").replace(/\s+/g, " ").trim().slice(0, 600);
    },
    [sel, o.offset ?? 90],
  );
  await page.waitForTimeout(300);
  await page.screenshot({ path: join(out, `${name}.png`) });
  await ctx.close();
  return text;
}
const minRow = () =>
  Math.min(
    ...[...document.querySelectorAll("footer a, footer summary")]
      .filter((a) => a.offsetParent && a.getBoundingClientRect().height)
      .map((a) => Math.round(a.getBoundingClientRect().height)),
  );

if (flag("shots")) {
  const t = (report.text = {});
  t.care1440 = await shotAt("care-know-1440", base + "/care-communities/", 1440, 900, "#know", { offset: 40 });
  t.care390 = await shotAt("care-know-390", base + "/care-communities/", 390, 844, "#know", { offset: 40 });
  {
    const { ctx, page } = await load(base + "/care-communities/", 1440, 900);
    t.careOrder = await page.evaluate(() =>
      [...document.querySelectorAll("main h2")].map((h) => h.textContent.replace(/\s+/g, " ").trim()).slice(0, 10),
    );
    t.careShot = await page.evaluate(() => document.querySelector("#know img")?.getAttribute("src"));
    await ctx.close();
  }
  {
    const { ctx, page } = await load(base + "/pricing/", 390, 844);
    await page.screenshot({ path: join(out, "pricing-390-screen1.png") });
    await page.evaluate(() => window.scrollTo(0, 844));
    await page.waitForTimeout(400);
    await page.screenshot({ path: join(out, "pricing-390-screen2.png") });
    t.pricing = await page.evaluate(() => ({
      status: document.querySelector(".status")?.textContent.replace(/\s+/g, " ").trim(),
      label: document.querySelector(".plans-label")?.textContent,
      orgPrice: document.querySelector(".org-price")?.textContent.replace(/\s+/g, " ").trim(),
      cardNotes: [...document.querySelectorAll(".card-note")].map((n) => n.textContent.trim()),
      included390: [...document.querySelectorAll("details.included")].map((d) => d.open),
    }));
    await ctx.close();
  }
  for (const [k, w, h, big] of [
    ["included1024big", 1024, 768, true],
    ["included1440", 1440, 900, false],
  ]) {
    const { ctx, page } = await load(base + "/pricing/", w, h, { big });
    t[k] = await page.evaluate(() =>
      [...document.querySelectorAll("details.included")].map((d) => ({
        open: d.open,
        summary: getComputedStyle(d.querySelector("summary")).display,
      })),
    );
    await ctx.close();
  }
  t.gta390 = await shotAt("get-the-app-asked-390", base + "/get-the-app/", 390, 844, "#asked-title", { offset: 60 });
  t.gta1440 = await shotAt("get-the-app-asked-1440", base + "/get-the-app/", 1440, 900, "#asked-title", { offset: 120 });
  {
    const { ctx, page } = await load(base + "/get-the-app/", 390, 844);
    await page.screenshot({ path: join(out, "get-the-app-first-390.png") });
    await ctx.close();
  }
  t.join390 = await shotAt("join-code-390", base + "/join/", 390, 844, 'input[name="ref"]', { offset: 200 });
  t.join1440 = await shotAt("join-code-1440", base + "/join/", 1440, 900, "h1", { offset: 110 });
  for (const [k, w, h] of [
    ["joinField390", 390, 844],
    ["joinField1440", 1440, 900],
  ]) {
    const { ctx, page } = await load(base + "/join/", w, h);
    t[k] = await page.evaluate(() => {
      const i = document.querySelector('input[name="ref"]');
      const cs = getComputedStyle(i);
      const ph = getComputedStyle(i, "::placeholder");
      return {
        label: i.closest("label").querySelector("span").innerText.replace(/\s+/g, " / "),
        placeholder: i.placeholder,
        border: [cs.borderTopWidth, cs.borderRightWidth, cs.borderBottomWidth, cs.borderLeftWidth, cs.borderTopStyle, cs.borderTopColor].join(" "),
        ground: cs.backgroundColor,
        placeholderColor: ph.color,
        placeholderOpacity: ph.opacity,
        lines: [...document.querySelectorAll(".join-after .no-app, .join-after .private")].map((p) =>
          p.innerText.replace(/\s+/g, " "),
        ),
        privateHref: document.querySelector(".join-after .private a")?.getAttribute("href"),
        sampleImg: (() => {
          const m = document.querySelector(".memory img");
          return m && { loading: m.loading, fetchPriority: m.getAttribute("fetchpriority"), width: m.getAttribute("width"), height: m.getAttribute("height"), aspect: getComputedStyle(m).aspectRatio, bg: getComputedStyle(m).backgroundColor };
        })(),
      };
    });
    await ctx.close();
  }
  {
    const { ctx, page } = await load(base + "/how-it-works/", 1024, 768, { big: true });
    await page.evaluate(() => document.querySelector("footer").scrollIntoView());
    await page.waitForTimeout(400);
    await page.screenshot({ path: join(out, "footer-1024-150.png") });
    t.footer1024big = await page.evaluate(
      (fn) => ({
        linkFont: getComputedStyle(document.querySelector(".gf-footer-links a")).fontSize,
        minRow: new Function(`return (${fn})()`)(),
        sent: [...document.querySelectorAll(".gf-footer-links h3")].map(
          (h) => h.textContent + ": " + [...h.parentElement.querySelectorAll("h3 ~ a")].map((a) => a.textContent).join(" | "),
        ),
      }),
      minRow.toString(),
    );
    await ctx.close();
  }
  {
    const { ctx, page } = await load(base + "/how-it-works/", 390, 844, { big: true });
    await page.evaluate(() => {
      document.querySelectorAll(".gf-footer-fold details").forEach((d) => (d.open = true));
      document.querySelector(".gf-footer-fold").scrollIntoView();
    });
    await page.waitForTimeout(400);
    await page.screenshot({ path: join(out, "footer-390-150.png") });
    t.footer390big = await page.evaluate(
      (fn) => ({
        linkFont: getComputedStyle(document.querySelector(".gf-footer-fold a")).fontSize,
        minRow: new Function(`return (${fn})()`)(),
      }),
      minRow.toString(),
    );
    await ctx.close();
  }
  for (const [name, b] of [
    ["home-teaser-390-after", base],
    ["home-teaser-390-before", before],
  ]) {
    const { ctx, page } = await load(b + "/", 390, 844);
    report[name] = await page.evaluate(async () => {
      const s = document.querySelector("#book");
      s.scrollIntoView();
      await Promise.all(
        [...s.querySelectorAll("img")]
          .filter((i) => i.offsetParent)
          .map((i) => {
            i.loading = "eager";
            return i.complete || !i.offsetParent ? 0 : Promise.race([new Promise((r) => (i.onload = i.onerror = r)), new Promise((r) => setTimeout(r, 4000))]);
          }),
      );
      await new Promise((r) => setTimeout(r, 300));
      s.scrollIntoView();
      const part = (q) => Math.round(s.querySelector(q)?.getBoundingClientRect().height ?? 0);
      return { section: Math.round(s.getBoundingClientRect().height), head: part("h2"), lead: part(".lead"), book: part(".book-wrap"), go: part(".go") };
    });
    await page.waitForTimeout(300);
    await page.locator("#book").screenshot({ path: join(out, `${name}.png`) });
    await ctx.close();
  }
  for (const [name, w, h] of [
    ["home-close-390", 390, 844],
    ["home-close-1440", 1440, 900],
  ]) {
    t[name] = await shotAt(name, base + "/", w, h, "#invitation-title", { offset: 120 });
  }
  for (const [name, w, h] of [
    ["org-who-1440", 1440, 900],
    ["org-who-390", 390, 844],
  ]) {
    t[name] = await shotAt(name, base + "/organizations/", w, h, "#who-title", { offset: 100 });
  }
}

if (flag("hero")) {
  /* A frame sampler in the page: from the moment the headline is split,
     each animation frame records how much of each line shows inside its
     mask. "whole" = the first frame where every line shows >= 99 %. */
  for (const [name, b] of [
    ["hero-before-390", before],
    ["hero-after-390", base],
  ]) {
    const { ctx, page } = await open(390, 844, { motion: "no-preference", cpu: 4 });
    await page.addInitScript(() => {
      window.__hero = { split: null, whole: null, frames: [] };
      const tick = () => {
        const h = document.querySelector("#hero-title");
        const lines = h ? [...h.querySelectorAll("div")].filter((d) => !d.querySelector("div")) : [];
        if (lines.length) {
          const now = performance.now();
          if (window.__hero.split === null) window.__hero.split = now;
          const shown = lines.map((d) => {
            const r = d.getBoundingClientRect();
            const m = d.parentElement.getBoundingClientRect();
            return Math.max(0, Math.min(r.bottom, m.bottom) - Math.max(r.top, m.top)) / r.height;
          });
          window.__hero.frames.push([Math.round(now - window.__hero.split), shown.map((x) => Math.round(x * 100))]);
          if (window.__hero.whole === null && shown.every((x) => x >= 0.99)) window.__hero.whole = now;
        }
        if (window.__hero.whole === null || performance.now() - window.__hero.whole < 50) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    });
    await page.goto(b + "/", { waitUntil: "commit" });
    await page.waitForFunction(() => window.__hero && window.__hero.split !== null, null, { timeout: 20000 });
    /* The frame 300 ms into the rise. */
    await page.waitForFunction(() => performance.now() - window.__hero.split >= 300, null, { polling: 16 });
    await page.screenshot({ path: join(out, `${name}-300ms.png`) });
    await page.waitForFunction(() => window.__hero.whole !== null, null, { timeout: 20000 });
    const h = await page.evaluate(() => ({
      splitAtMs: Math.round(window.__hero.split),
      wholeAfterSplitMs: Math.round(window.__hero.whole - window.__hero.split),
      wholeAtMs: Math.round(window.__hero.whole),
      at300: window.__hero.frames.find((f) => f[0] >= 300),
      at600: window.__hero.frames.find((f) => f[0] >= 600) ?? "whole before 600",
    }));
    report[name] = h;
    await ctx.close();
  }
}

/* The pf-fix2 sweep rule (qa/pf-fix2-shots.mjs --sweep) over this fix's
   pages: horizontal overflow, and targets under 44 px (inline links inside
   a sentence excepted; footer links only under 24 px tall or 44x44). */
if (flag("sweep")) {
  const pages = ["/", "/get-the-app/", "/join/", "/pricing/", "/organizations/", "/care-communities/", "/how-it-works/", "/for-families/"];
  const sweep = [];
  for (const p of pages) {
    for (const w of [320, 390, 1024, 1440]) {
      for (const big of [false, true]) {
        const { ctx, page } = await load(base + p, w, 900, { big });
        const r = await page.evaluate(() => {
          const over = document.documentElement.scrollWidth - document.documentElement.clientWidth;
          const small = [];
          for (const el of document.querySelectorAll("main a, main button, main summary, header a, header button, footer a, footer summary")) {
            const b = el.getBoundingClientRect();
            const s = getComputedStyle(el);
            if (!b.width || !b.height || s.visibility === "hidden") continue;
            const inline = s.display === "inline" && el.parentElement && /P|LI|SPAN|SMALL|FIGCAPTION|DD/.test(el.parentElement.tagName) && el.parentElement.textContent.trim().length > el.textContent.trim().length + 2;
            if (inline) continue;
            if (b.height < 44 && b.width < 44 ? true : b.height < 24) small.push(`${el.tagName} "${el.textContent.trim().slice(0, 30)}" ${Math.round(b.width)}x${Math.round(b.height)}`);
            else if (b.height < 44 && !el.closest("footer")) small.push(`${el.tagName} "${el.textContent.trim().slice(0, 30)}" ${Math.round(b.width)}x${Math.round(b.height)}`);
          }
          return { over, small: small.slice(0, 6), smallCount: small.length };
        });
        sweep.push({ p, w, big, ...r });
        await ctx.close();
      }
    }
  }
  report.sweepFailures = sweep.filter((s) => s.over > 0 || s.smallCount > 0);
  report.sweepRuns = sweep.length;
}

if (flag("cls")) {
  report.cls = {};
  for (const [w, h] of [
    [1440, 900],
    [390, 844],
  ]) {
    const { ctx, page } = await open(w, h, { motion: "no-preference" });
    await page.addInitScript(() => {
      window.__cls = 0;
      new PerformanceObserver((l) => {
        for (const e of l.getEntries()) if (!e.hadRecentInput) window.__cls += e.value;
      }).observe({ type: "layout-shift", buffered: true });
    });
    await page.goto(base + "/join/", { waitUntil: "networkidle" });
    await page.waitForTimeout(2500);
    report.cls[`/join ${w}`] = Math.round((await page.evaluate(() => window.__cls)) * 10000) / 10000;
    await ctx.close();
  }
}

console.log(JSON.stringify(report, null, 1));
await browser.close();
