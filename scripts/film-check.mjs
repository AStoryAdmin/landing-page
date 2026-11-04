/**
 * Film check (design spec §2, Check 2). Needs a preview of the static build:
 *   npm run build:static && npx vite preview --port 5202 --strictPort
 *   node scripts/film-check.mjs [base]
 *
 * For each engine: zero .mp4 requests before the tap, no <video> in the DOM,
 * one tap plays with sound (paused === false, muted === false within 3 s),
 * a captions track "English" that is not on by default, and "Watch again"
 * after `ended`. Also: .vtt served as text/vtt, Range honoured on .mp4.
 *
 * Playwright's own Chromium has no H.264, so the Chromium run uses the
 * installed Edge (channel "msedge"). WebKit runs with the iPhone 13
 * descriptor. A pass here is "passed only in Chromium/WebKit-desktop",
 * never "passed on iPhone" (spec M9).
 */
import { chromium, devices, webkit } from "playwright";

const base = (process.argv[2] ?? "http://localhost:5202").replace(/\/$/, "");
const url = `${base}/how-it-works/`;
let failed = 0;
const check = (name, ok, detail = "") => {
  if (!ok) failed++;
  console.log(`${ok ? "PASS" : "FAIL"}  ${name}${detail ? `  (${detail})` : ""}`);
};

async function run(label, launcher, launchOpts, ctxOpts) {
  console.log(`\n== ${label}`);
  let browser;
  try {
    browser = await launcher.launch(launchOpts);
  } catch (e) {
    check(`${label}: launch`, false, String(e.message).split("\n")[0]);
    return;
  }
  const ctx = await browser.newContext(ctxOpts);
  const page = await ctx.newPage();
  let mp4Before = 0;
  let tapped = false;
  page.on("request", (r) => {
    if (!tapped && /\.mp4(\?|$)/.test(r.url())) mp4Before++;
  });
  await page.goto(url, { waitUntil: "networkidle" });
  await page.locator("#film").scrollIntoViewIfNeeded();
  await page.waitForTimeout(800);
  check(`${label}: 0 .mp4 requests before the tap`, mp4Before === 0, `${mp4Before}`);
  check(`${label}: no <video> before the tap`, (await page.locator("#film video").count()) === 0);
  const facade = page.locator("button.film-facade");
  check(
    `${label}: facade name`,
    (await facade.getAttribute("aria-label")) === "Play the film, 49 seconds, with sound",
  );

  tapped = true;
  if (ctxOpts?.hasTouch) await facade.tap();
  else await facade.click();
  await page.waitForTimeout(3000);
  const state = await page.evaluate(() => {
    const v = document.querySelector("#film video");
    if (!v) return null;
    const tracks = [...v.textTracks].map((t) => ({ label: t.label, kind: t.kind, mode: t.mode }));
    return {
      paused: v.paused,
      muted: v.muted,
      t: v.currentTime,
      src: v.currentSrc,
      autoplay: v.hasAttribute("autoplay"),
      loop: v.loop,
      tracks,
      error: v.error && v.error.code,
      focused: document.activeElement === v,
    };
  });
  console.log("      state:", JSON.stringify(state));
  check(`${label}: playing after one tap`, !!state && state.paused === false && state.t > 0.5);
  check(`${label}: sound on`, !!state && state.muted === false);
  check(`${label}: no autoplay, no loop`, !!state && !state.autoplay && !state.loop);
  check(
    `${label}: English captions, off by default`,
    !!state &&
      state.tracks.length === 1 &&
      state.tracks[0].label === "English" &&
      state.tracks[0].kind === "captions" &&
      state.tracks[0].mode !== "showing",
  );

  await page.evaluate(() => {
    const v = document.querySelector("#film video");
    v.currentTime = Math.max(0, v.duration - 0.4);
  });
  await page.waitForTimeout(2500);
  const again = page.getByRole("button", { name: "Watch again" });
  check(`${label}: "Watch again" after ended`, await again.isVisible().catch(() => false));
  await browser.close();
}

await run("Edge (Chromium, desktop 1440)", chromium, { channel: "msedge" }, {
  viewport: { width: 1440, height: 900 },
});
await run("Edge (Chromium, 390)", chromium, { channel: "msedge" }, {
  viewport: { width: 390, height: 844 },
  deviceScaleFactor: 3,
  hasTouch: true,
  isMobile: true,
});
await run("WebKit (iPhone 13)", webkit, {}, { ...devices["iPhone 13"] });

console.log("\n== Hosting (vite preview)");
const vtt = await fetch(`${base}/film/a-story-film.en.vtt`);
check("vtt Content-Type text/vtt", (vtt.headers.get("content-type") ?? "").startsWith("text/vtt"), vtt.headers.get("content-type"));
const range = await fetch(`${base}/film/a-story-film-720.mp4`, { headers: { Range: "bytes=0-1023" } });
check("mp4 honours Range", range.status === 206, `${range.status} ${range.headers.get("content-range")}`);

console.log(failed ? `\n${failed} failed` : "\nall passed");
process.exit(failed ? 1 : 0);
