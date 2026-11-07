// Real phone-app screenshots for the /how-it-works setup steps (plan task 1b).
// Every image is a capture of the real app (Expo web, the screenshot harness
// or the ?demo=1 walkthrough over the same fake family). Nothing is drawn.
//
//   1. In the phone-app folder:  npx expo start --web --port 8095
//   2. Here:                      node qa/tester-1107/capture-steps.mjs [step,step]
//
// Writes qa/tester-1107/steps-raw/<name>.png (the original, 1170x2532) and
// public/how-it-works/steps/<name>.webp (q82), and prints the URL of each.
import { chromium } from "playwright";
import sharp from "sharp";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const HERE = path.dirname(fileURLToPath(import.meta.url));
const SITE = path.resolve(HERE, "../..");
const RAW = path.join(HERE, "steps-raw");
const OUT = path.join(SITE, "public/how-it-works/steps");
const BASE = process.env.APP_URL || "http://localhost:8095";
const VIEW = { width: 390, height: 844 };
const DPR = 3;
// The page shows them at <= 260 CSS px; 780 = 3x that. The PNGs stay 1170 wide.
const WEBP_W = 780;
// iPhone 14/15 safe areas, as scripts/qa/lib.mjs emulates them.
const INSETS = { top: 47, bottom: 34 };

const harness = (screen, params) =>
  `screenshot=1&screen=${screen}` + (params ? `&params=${encodeURIComponent(JSON.stringify(params))}` : "");

const button = (page, re) => page.getByRole("button", { name: re }).filter({ visible: true }).first();

// name, query, the screen's source file, and (optionally) what to do before the shot.
const STEPS = [
  { name: "01-install-welcome", query: harness("Welcome"), source: "src/screens/WelcomeScreen.js" },
  {
    // Not in the harness's SCREENS: reached in the demo the way it is in the app,
    // on the storyteller's own phone (Rose): Your account -> "A Story calls you at ...".
    // (On Jamie's phone the row says the call is set on Rose's own phone; no hour wheel.)
    name: "02-pick-hour",
    query: "demo=1&as=rose",
    source: "src/screens/ScheduleCallScreen.js (+ src/components/guide/HourWheel.js)",
    how: "Your account -> A Story calls you at 10:00 AM",
    async act(page) {
      await button(page, /^Your account/).click({ timeout: 15000 });
      await page.waitForTimeout(1500);
      await button(page, /^A Story calls you at/).click({ timeout: 15000 });
      await page.waitForTimeout(2500);
      // Open the hour wheel itself.
      await page.getByText(/^Change the hour$/).filter({ visible: true }).first().click({ timeout: 15000 });
      await page.waitForTimeout(2000);
    },
  },
  // Rose's own phone ringing (the demo's incoming call, before Answer), so 03 and 04 are one view.
  { name: "03-phone-rings", query: "demo=1&as=rose&call=1", source: "src/screens/IncomingCallScreen.js", how: "the incoming call at rest, before Answer" },
  {
    // The live call room is LiveTalkScreen (CallVoiceScreen is the call-style settings page).
    name: "04-they-talk",
    query: "demo=1&as=rose&call=1",
    source: "src/screens/LiveTalkScreen.js (opened from src/screens/IncomingCallScreen.js)",
    how: "Answer the call, then 12 s into the call",
    async act(page) {
      await button(page, /^Answer/).click({ timeout: 15000 });
      await page.waitForTimeout(12000);
    },
  },
  { name: "05-memory-appears", query: harness("Memory", { storyId: "story-1", memId: "mem-1" }), source: "src/screens/MemoryScreen.js" },
  {
    name: "06-family-adds",
    query: harness("FamilyMemory", { storyId: "story-1", name: "Rose", personId: "p-rose", memoryId: "mem-1", memoryTitle: "The house with the blue door" }),
    source: "src/screens/FamilyMemoryScreen.js",
  },
];

async function shoot(browser, step) {
  const ctx = await browser.newContext({ viewport: VIEW, deviceScaleFactor: DPR, permissions: ["microphone", "camera"] });
  await ctx.addInitScript(() => {
    try {
      localStorage.setItem("astory-theme", "light");
    } catch {}
  });
  const page = await ctx.newPage();
  const errors = [];
  page.on("pageerror", (e) => errors.push(e.message.split("\n")[0]));
  const cdp = await ctx.newCDPSession(page);
  await cdp.send("Emulation.setSafeAreaInsetsOverride", {
    insets: { top: INSETS.top, topMax: INSETS.top, bottom: INSETS.bottom, bottomMax: INSETS.bottom, left: 0, leftMax: 0, right: 0, rightMax: 0 },
  });
  const url = `${BASE}/?${step.query}`;
  await page.goto(url, { waitUntil: "domcontentloaded", timeout: 300000 });
  if (/screenshot=1/.test(step.query)) {
    await page.waitForFunction(() => window.__screenshotReady === true, null, { timeout: 180000 });
  } else {
    await page.waitForSelector('[role="button"],[role="tab"]', { timeout: 180000 });
  }
  await page.waitForTimeout(4000);
  if (step.act) await step.act(page);
  await page.evaluate(() => {
    const se = document.scrollingElement;
    se.scrollTop = 0;
    se.scrollLeft = 0;
  });
  await page.waitForTimeout(300);
  const text = await page.evaluate(() => document.body.innerText || "");
  const bad = [/No screen called/, /Failed to render/, /Failed to load module/, /Something went wrong/].find((re) => re.test(text));
  const png = path.join(RAW, `${step.name}.png`);
  await page.screenshot({ path: png });
  await sharp(png).resize({ width: WEBP_W }).webp({ quality: 82 }).toFile(path.join(OUT, `${step.name}.webp`));
  await ctx.close();
  return { url, bad: bad ? String(bad) : null, errors, text: text.replace(/\s+/g, " ").slice(0, 200) };
}

const only = process.argv[2] ? process.argv[2].split(",") : null;
fs.mkdirSync(RAW, { recursive: true });
fs.mkdirSync(OUT, { recursive: true });
const browser = await chromium.launch();
// Kept across partial runs (node capture-steps.mjs 02 only re-shoots step 02).
let results = {};
try {
  results = JSON.parse(fs.readFileSync(path.join(RAW, "results.json"), "utf8")).results || {};
} catch {}
for (const step of STEPS) {
  if (only && !only.some((o) => step.name.startsWith(o))) continue;
  try {
    const r = await shoot(browser, step);
    results[step.name] = { ...r, source: step.source, how: step.how || "" };
    console.log(step.name, r.bad ? `BAD ${r.bad}` : "ok", "|", r.url, "|", r.text);
    if (r.errors.length) console.log("  pageerrors:", r.errors.slice(0, 3).join(" / "));
  } catch (e) {
    results[step.name] = { error: e.message.split("\n")[0], source: step.source };
    console.log(step.name, "FAILED", e.message.split("\n")[0]);
  }
}
await browser.close();
fs.writeFileSync(path.join(RAW, "results.json"), JSON.stringify({ at: new Date().toISOString(), viewport: VIEW, dpr: DPR, insets: INSETS, results }, null, 1));
