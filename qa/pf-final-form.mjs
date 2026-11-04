/**
 * Phone-first final check: the /get-the-app form, never a real submit.
 *
 *   node qa/serve-dist.mjs dist 5461
 *   node qa/serve-dist.mjs qa/premium-2026-11/dist-stub 5462   (see qa/pf-fix2-serve-stub.md)
 *   node qa/pf-final-form.mjs --plain http://localhost:5461 --stub http://localhost:5462
 *
 * For each build at 390 and 1440: empty submit -> inline errors; valid
 * submit -> the state shown. The stub build's Supabase host is answered 201
 * by Playwright; supabase.co is aborted; every other off-site request is
 * aborted and counted. Screenshots: qa/premium-2026-11/pf-final/.
 */
import { mkdirSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { chromium } from "playwright";

const arg = (n, f) => { const i = process.argv.indexOf("--" + n); return i > -1 ? process.argv[i + 1] : f; };
const builds = { plain: arg("plain", "http://localhost:5461"), stub: arg("stub", "http://localhost:5462") };
const out = join(dirname(fileURLToPath(import.meta.url)), "premium-2026-11", "pf-final");
mkdirSync(out, { recursive: true });

const browser = await chromium.launch();
let fail = 0;
for (const [kind, base] of Object.entries(builds)) {
  for (const w of [390, 1440]) {
    const ctx = await browser.newContext({ viewport: { width: w, height: w > 1000 ? 900 : 844 }, reducedMotion: "reduce" });
    const page = await ctx.newPage();
    const posts = [];
    const offsite = [];
    await page.route("**/*", (r) => {
      const u = r.request().url();
      const host = new URL(u).hostname;
      if (host === "localhost" || host === "127.0.0.1") return r.continue();
      if (/supabase\.co$/.test(host)) { offsite.push(u); return r.abort(); }
      if (host === "supabase.stub.test") {
        if (r.request().method() === "POST") posts.push(new URL(u).pathname);
        const cors = { "access-control-allow-origin": "*", "access-control-allow-headers": "*", "access-control-allow-methods": "*" };
        if (/\/rest\/v1\/waitlist_signups/.test(u)) return r.fulfill({ status: 201, headers: cors, body: "" });
        return r.fulfill({ status: 404, headers: cors, body: "{}" });
      }
      offsite.push(u);
      return r.abort();
    });
    await page.goto(base + "/get-the-app/", { waitUntil: "networkidle" });
    const form = page.locator("form").first();
    await form.locator('button[type="submit"]').click();
    await page.waitForTimeout(400);
    const errors = (await form.locator('[role="alert"], .error, [aria-invalid="true"]').allTextContents()).map((s) => s.trim()).filter(Boolean);
    await form.locator('input[type="email"]').fill("qa-final@example.test");
    await form.locator('input[type="radio"]').first().check({ force: true });
    await form.locator('button[type="submit"]').click();
    await page.waitForTimeout(1500);
    const text = (await page.locator("main").innerText()).replace(/\s+/g, " ");
    const thanks = /We.ll send your invite to qa-final@example\.test/.test(text);
    const fallback = /Almost there/.test(text);
    await page.screenshot({ path: join(out, `form-${kind}-${w}.png`) });
    const want = kind === "stub" ? thanks && posts.length === 1 : fallback && posts.length === 0;
    if (!want || offsite.some((u) => /supabase\.co/.test(u))) fail++;
    console.log(`${want ? "PASS" : "FAIL"}  ${kind} @${w}: empty submit -> ${errors.length} error(s) ${JSON.stringify(errors.slice(0, 2))}; valid submit -> ${thanks ? "thank-you" : fallback ? "fallback 'Almost there'" : "other"}; stub POSTs ${JSON.stringify(posts)}; off-site aborted ${offsite.length}`);
    await ctx.close();
  }
}
await browser.close();
process.exit(fail ? 1 : 0);
