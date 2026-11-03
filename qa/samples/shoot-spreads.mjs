import { chromium } from "playwright";
const [url, out, booksArg] = process.argv.slice(2);
const books = (booksArg || "carolyn,raymond,tom").split(",");
const b = await chromium.launch(); const page = await b.newPage({ viewport: { width: 1280, height: 800 } });
for (const k of books) {
  await page.goto(`${url}#${k}`, { waitUntil: "networkidle" });
  await page.waitForTimeout(800);
  const n = await page.evaluate(() => N);
  for (let i = 0; i <= n; i++) {
    await page.evaluate((i) => go(i), i); await page.waitForTimeout(650);
    await page.screenshot({ path: `${out}/${k}-${String(i).padStart(2, "0")}.png` });
  }
  console.log(k, n + 1, "spreads");
}
await b.close();
