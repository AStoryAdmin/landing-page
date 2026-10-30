/* Interaction checks for the institutions pages (A1, A3, A4, A5).
   Usage: node qa/institutions-2026-10-29/interact.mjs [baseUrl] */
import { chromium } from 'playwright';
import assert from 'node:assert/strict';
const base = process.argv[2] ?? 'http://localhost:5191';
const b = await chromium.launch();
const out = [];
const ok = (m) => out.push('PASS ' + m);

// A1: primary action in the first screen, desktop and phone
for (const [w, h] of [[1440, 900], [393, 852]]) {
  const p = await b.newPage({ viewport: { width: w, height: h }, reducedMotion: 'reduce' });
  for (const r of ['/organizations', '/care-communities']) {
    await p.goto(base + r, { waitUntil: 'networkidle' });
    const btn = p.locator('section[aria-labelledby="page-title"] a', { hasText: 'Book a demo' }).first();
    const box = await btn.boundingBox();
    assert.ok(box && box.y + box.height <= h, `${r} ${w}: Book a demo below the fold (${box?.y})`);
    ok(`${r} @${w}: Book a demo in first screen (y=${Math.round(box.y)})`);
  }
  await p.close();
}

const p = await b.newPage({ viewport: { width: 1440, height: 900 }, reducedMotion: 'reduce' });
// A2/A3: six tiles, each preselects its kind and scrolls to the form
await p.goto(base + '/organizations', { waitUntil: 'networkidle' });
const tiles = p.locator('#who li');
assert.equal(await tiles.count(), 6);
for (let i = 0; i < 6; i++) {
  const label = await tiles.nth(i).locator('small').innerText();
  await tiles.nth(i).locator('.go a').first().click();
  await p.waitForTimeout(500);
  const v = await p.locator('#book select').inputValue();
  const top = await p.evaluate(() => document.getElementById('book').getBoundingClientRect().top);
  assert.ok(v, `${label}: no kind selected`);
  assert.ok(Math.abs(top) < 120, `${label}: #book not in view (${top})`);
  ok(`tile "${label}" -> kind "${v}", #book at ${Math.round(top)}px`);
  await p.evaluate(() => scrollTo(0, 0));
}
// no-script path: ?kind= preselects
await p.goto(base + '/organizations?kind=School#book', { waitUntil: 'networkidle' });
assert.equal(await p.locator('#book select').inputValue(), 'School');
ok('?kind=School#book preselects School');
await p.goto(base + '/organizations?for=care#book', { waitUntil: 'networkidle' });
assert.equal(await p.locator('#book select').inputValue(), 'Senior living or care community');
ok('old link ?for=care still preselects care');

// A4: collaboration form validates, then falls back to a filled mailto when Supabase is absent
await p.goto(base + '/organizations#collaborate', { waitUntil: 'networkidle' });
const c = p.locator('#collaborate form');
await c.locator('button[type=submit]').click();
assert.match(await c.locator('[role=alert]').innerText(), /name/);
const chip = c.locator('.chip', { hasText: 'A grant or funding partnership' });
await chip.evaluate((el) => el.scrollIntoView({ block: 'center' }));
await chip.locator('input').check();
assert.ok(await chip.locator('input').isChecked(), 'idea chip did not check');
await c.getByLabel('Your name').fill('Test Person');
await c.getByLabel('Email').fill('test@example.com');
await c.getByLabel(/Organization/).fill('Test Foundation');
await c.getByLabel('The idea').fill('Fund ten families to record their grandparents.');
await c.locator('button[type=submit]').click();
await p.waitForTimeout(2500);
const status = await p.locator('#collaborate [role=status], #collaborate [role=alert]').first().innerText();
const href = await p.locator('#collaborate [role=alert] a').first().getAttribute('href').catch(() => null);
ok(`collaboration submit -> "${status.slice(0, 80)}"` + (href ? ` | mailto subject: ${decodeURIComponent(href.split('subject=')[1].split('&')[0])}` : ''));

// A5: care page has its own form, care kind picked, no family close
await p.goto(base + '/care-communities', { waitUntil: 'networkidle' });
assert.equal(await p.locator('#book select').inputValue(), 'Senior living or care community');
assert.equal(await p.locator('[aria-labelledby="invitation-title"]').count(), 0);
assert.equal(await p.locator('a[href="/organizations"]', { hasText: 'A Story for colleges' }).count(), 1);
ok('care page: form on page, care preselected, no family close, door to /organizations');
const imgs = await p.evaluate(async () => {
  for (let y = 0; y < document.body.scrollHeight; y += 400) { scrollTo(0, y); await new Promise(r => setTimeout(r, 60)); }
  await new Promise(r => setTimeout(r, 800));
  return [...document.querySelectorAll('#know img')].map(i => [i.alt.slice(0, 30), i.complete && i.naturalWidth > 0]);
});
ok('care #know prints loaded after scroll: ' + JSON.stringify(imgs));
await p.close();

// mobile sticky bar offers Book a demo on these pages
const m = await b.newPage({ viewport: { width: 393, height: 852 }, reducedMotion: 'reduce' });
for (const r of ['/organizations', '/care-communities']) {
  await m.goto(base + r, { waitUntil: 'networkidle' });
  await m.evaluate(() => scrollTo(0, 1600));
  await m.waitForTimeout(600);
  const t = await m.locator('main div[data-shown] a').innerText();
  const shown = await m.locator('main div[data-shown]').getAttribute('data-shown');
  assert.match(t, /Book a demo/);
  ok(`${r} phone sticky bar: "${t.trim()}" shown=${shown}`);
}
await m.goto(base + '/', { waitUntil: 'networkidle' });
ok('home sticky bar still: ' + (await m.locator('main div[data-shown] a').textContent()).trim());
await b.close();
console.log(out.join('\n'));
