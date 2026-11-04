/**
 * Phone-first fix 2 evidence (docs/premium/CHIEF-LOG.md "Phone-first fix 2").
 *
 *   node qa/pf-fix2-shots.mjs [--base http://localhost:5312]
 *                             [--before http://localhost:5311]
 *                             [--heights] [--shots] [--sweep]
 *                             [--form <stub-build base>] [--hero]
 *
 * Every request to a Supabase host is intercepted (503, or 201 for the
 * waitlist insert on the stub build), so nothing reaches a real service.
 * Output: qa/premium-2026-11/pf-fix2/ and a JSON report on stdout.
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
const base = arg("base", "http://localhost:5312").replace(/\/$/, "");
const before = arg("before", "").replace(/\/$/, "");
const out = join(dirname(fileURLToPath(import.meta.url)), "premium-2026-11", "pf-fix2");
mkdirSync(out, { recursive: true });

const browser = await chromium.launch();
const report = {};

async function open(url, width, height, big = false, opts = {}) {
  const ctx = await browser.newContext({ viewport: { width, height }, ...opts });
  const page = await ctx.newPage();
  await page.route(/supabase\.co|supabase\.stub\.test/, (r) => r.fulfill({ status: 503, body: "{}" }));
  if (big) {
    await page.addInitScript(() => {
      document.addEventListener("DOMContentLoaded", () => {
        document.documentElement.style.fontSize = "150%";
      });
    });
  }
  await page.goto(url, { waitUntil: "networkidle" });
  if (big) await page.evaluate(() => (document.documentElement.style.fontSize = "150%"));
  await page.evaluate(() => document.fonts.ready);
  await page.waitForTimeout(1000);
  return { ctx, page };
}

const height = async (b, p) => {
  const { ctx, page } = await open(b + p, 390, 844);
  const h = await page.evaluate(() => document.documentElement.scrollHeight);
  await ctx.close();
  return h;
};

if (flag("heights")) {
  report.heights390 = {};
  for (const p of ["/pricing/", "/care-communities/", "/organizations/", "/join/", "/get-the-app/"]) {
    const after = await height(base, p);
    const was = before ? await height(before, p) : null;
    report.heights390[p] = {
      before: was,
      after,
      change: was ? after - was : null,
      pct: was ? Math.round(((after - was) / was) * 1000) / 10 : null,
    };
  }
}

if (flag("shots")) {
  const shot = async (name, path, w, h, fn, big = false) => {
    const { ctx, page } = await open(base + path, w, h, big);
    const r = fn ? await fn(page) : undefined;
    await page.screenshot({ path: join(out, `${name}.png`) });
    await ctx.close();
    return r;
  };
  const toSel = (sel) => async (page) => {
    const el = page.locator(sel).first();
    await el.scrollIntoViewIfNeeded();
    await page.evaluate((s) => {
      const e = document.querySelector(s);
      window.scrollBy(0, e.getBoundingClientRect().top - 90);
    }, sel);
    await page.waitForTimeout(400);
    return page.evaluate((s) => {
      const e = document.querySelector(s);
      return e ? e.innerText.replace(/\s+/g, " ").trim().slice(0, 600) : null;
    }, sel);
  };
  report.text = {};
  report.text.joinBand390 = await shot("join-being-asked-390", "/join/", 390, 844, toSel("#being-asked"));
  report.text.joinBand1440 = await shot("join-being-asked-1440", "/join/", 1440, 900, toSel("#being-asked"));
  report.text.joinCode390 = await shot("join-code-390", "/join/", 390, 844, async (page) => {
    await page.locator('input[name="ref"]').scrollIntoViewIfNeeded();
    return page.evaluate(() => {
      const i = document.querySelector('input[name="ref"]').getBoundingClientRect();
      const b = document.querySelector('.code-row button').getBoundingClientRect();
      return { inputWidth: Math.round(i.width), buttonWidth: Math.round(b.width) };
    });
  });
  report.text.joinCard1024big = await shot("join-1024-150-scrolled", "/join/", 1024, 768, async (page) => {
    await page.evaluate(() => window.scrollBy(0, 500));
    await page.waitForTimeout(400);
    return page.evaluate(() => {
      const o = document.querySelector(".opening-object");
      const r = o.getBoundingClientRect();
      return { position: getComputedStyle(o).position, top: Math.round(r.top), bottom: Math.round(r.bottom), vh: innerHeight };
    });
  }, true);
  report.text.pricing390first = await shot("pricing-390-screen1", "/pricing/", 390, 844);
  report.text.pricing390second = await shot("pricing-390-screen2", "/pricing/", 390, 844, async (page) => {
    await page.evaluate(() => window.scrollTo(0, 844));
    await page.waitForTimeout(400);
    return page.evaluate(() => ({
      included: [...document.querySelectorAll("details.included")].map((d) => d.open),
      notes: [...document.querySelectorAll("#express .card-note")].map((n) => n.textContent.trim()),
    }));
  });
  report.text.pricing1440 = await shot("pricing-1440-cards", "/pricing/", 1440, 900, toSel(".plans"));
  report.text.getTheAppNote390 = await shot("get-the-app-note-390", "/get-the-app/", 390, 844, toSel(".gift-note"));
  report.text.getTheAppAfter = await shot("get-the-app-after-390", "/get-the-app/", 390, 844, toSel("#after-title"));
  report.text.careReview390 = await shot("care-review-390-closed", "/care-communities/", 390, 844, async (page) => {
    const t = await toSel(".rq")(page);
    return { open: await page.evaluate(() => document.querySelector(".rq").open), t };
  });
  report.text.careReview1440 = await shot("care-review-1440", "/care-communities/", 1440, 900, toSel("#review-title"));
  report.text.orgReview1440 = await shot("org-review-1440", "/organizations/", 1440, 900, toSel("#review-title"));
  report.text.orgNeed390 = await shot("org-need-390", "/organizations/", 390, 844, toSel("#need, [aria-labelledby='need-title'], .need"));
  report.text.careBook390 = await shot("care-book-390", "/care-communities/", 390, 844, toSel("#book"));
  report.text.orgBook1440 = await shot("org-book-1440", "/organizations/", 1440, 900, toSel("#book"));
  report.text.homeClose390 = await shot("home-close-390", "/", 390, 844, toSel("#invitation-title"));
  report.text.homeClose1440 = await shot("home-close-1440", "/", 1440, 900, toSel("#invitation-title"));
  /* Agenda count per page. */
  for (const p of ["/care-communities/", "/organizations/"]) {
    const { ctx, page } = await open(base + p, 390, 844);
    report.text[`agendaCount ${p}`] = await page.evaluate(
      () => (document.querySelector("main").innerText.match(/price is quoted on the demo/g) ?? []).length,
    );
    await ctx.close();
  }
}

if (flag("hero")) {
  /* The first 300 ms of the home hero at 1440, motion on: the button's
     opacity, every 50 ms, and a frame at 150 ms. */
  for (const [label, b] of [["before", before], ["after", base]]) {
    if (!b) continue;
    const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
    const page = await ctx.newPage();
    await page.goto(b + "/", { waitUntil: "commit" });
    await page.waitForSelector(".hero-actions a", { state: "attached" });
    const samples = [];
    const t0 = Date.now();
    let shotTaken = false;
    while (Date.now() - t0 < 1200) {
      const s = await page.evaluate(() => {
        const a = document.querySelector(".hero-actions");
        const l = document.querySelector(".hero-lead");
        return { actions: getComputedStyle(a).opacity, lead: l ? getComputedStyle(l).opacity : null };
      });
      samples.push({ ms: Date.now() - t0, ...s });
      if (!shotTaken && Date.now() - t0 > 150) {
        await page.screenshot({ path: join(out, `hero-${label}-150ms-1440.png`) });
        shotTaken = true;
      }
      await page.waitForTimeout(40);
    }
    report[`hero ${label}`] = samples.filter((_, i) => i % 2 === 0).slice(0, 12);
    await ctx.close();
  }
}

if (flag("sweep")) {
  const pages = ["/", "/get-the-app/", "/get-the-app/?for=someone", "/join/", "/pricing/", "/organizations/", "/care-communities/", "/questions/"];
  const sweep = [];
  for (const p of pages) {
    for (const w of [320, 390, 1024, 1440]) {
      for (const big of [false, true]) {
        const { ctx, page } = await open(base + p, w, 900, big);
        const r = await page.evaluate(() => {
          const over = document.documentElement.scrollWidth - document.documentElement.clientWidth;
          const small = [];
          for (const el of document.querySelectorAll("main a, main button, main summary, header a, header button, footer a")) {
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

const form = arg("form", "");
if (form) {
  /* (a) The real thank-you on the stub-env build: the insert is answered
     201 here; every other stub request 404s; supabase.co is aborted. */
  for (const [w, h] of [[390, 844], [1440, 900]]) {
    const ctx = await browser.newContext({ viewport: { width: w, height: h } });
    const page = await ctx.newPage();
    const hits = [];
    await page.route("**/*", (r) => {
      const u = r.request().url();
      if (/supabase\.co/.test(u)) return r.abort();
      if (!/supabase\.stub\.test/.test(u)) return r.continue();
      hits.push(`${r.request().method()} ${new URL(u).pathname}`);
      if (/\/rest\/v1\/waitlist_signups/.test(u)) {
        return r.fulfill({
          status: 201,
          headers: { "access-control-allow-origin": "*", "access-control-allow-headers": "*", "access-control-allow-methods": "*" },
          body: "",
        });
      }
      return r.fulfill({ status: 404, headers: { "access-control-allow-origin": "*" }, body: "{}" });
    });
    await page.goto(form + "/get-the-app/", { waitUntil: "networkidle" });
    await page.fill('input[name="email"]', "qa-stub@example.test");
    await page.check('input[name="iphone"][value="yes"]', { force: true });
    await page.click('button[type="submit"]');
    await page.waitForSelector(".done h2", { timeout: 8000 });
    await page.locator(".sheet").scrollIntoViewIfNeeded();
    await page.screenshot({ path: join(out, `form-thank-you-${w}.png`) });
    report[`thankYou@${w}`] = { text: (await page.locator(".sheet").innerText()).replace(/\s+/g, " ").trim(), stubRequests: hits };
    await ctx.close();
  }
  /* (b) The fallback on the plain build (no Supabase env, no request). */
  for (const [w, h] of [[390, 844], [1440, 900]]) {
    const ctx = await browser.newContext({ viewport: { width: w, height: h } });
    const page = await ctx.newPage();
    const off = [];
    page.on("request", (r) => { if (!r.url().startsWith(base)) off.push(r.url()); });
    await page.goto(base + "/get-the-app/", { waitUntil: "networkidle" });
    await page.fill('input[name="email"]', "qa-stub@example.test");
    await page.check('input[name="iphone"][value="not-sure"]', { force: true });
    await page.click('button[type="submit"]');
    await page.waitForSelector(".fallback h2", { timeout: 8000 });
    await page.locator(".sheet").scrollIntoViewIfNeeded();
    await page.screenshot({ path: join(out, `form-fallback-${w}.png`) });
    report[`fallback@${w}`] = {
      text: (await page.locator(".sheet").innerText()).replace(/\s+/g, " ").trim(),
      mailto: (await page.locator(".fallback a").first().getAttribute("href"))?.slice(0, 60),
      addressUserSelect: await page.evaluate(() => getComputedStyle(document.querySelector(".fallback .address")).userSelect),
      offSiteRequests: off.filter((u) => !/fonts\.g/.test(u)),
    };
    await ctx.close();
  }
}

await browser.close();
console.log(JSON.stringify(report, null, 1));
