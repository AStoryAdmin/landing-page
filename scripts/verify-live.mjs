/**
 * `npm run verify:live` — is astoryapp.com the site on main?
 *
 * Written 2026-10-03 after a week in which the live site was a different,
 * older build than main and every check was a hand-typed curl. Run it after
 * every publish. It asks the live site, not this checkout, so it can be run
 * from anywhere; pass another origin to check a staging copy:
 *
 *   npm run verify:live
 *   npm run verify:live -- https://staging.example.com
 *
 * What it checks, and why each one matters:
 *   - every page answers 200 — a 404 status with the page drawn on top still
 *     breaks search, link previews and Apple's privacy-policy URL check;
 *   - the prebuilt page is served, not the bare app shell (it is large);
 *   - the waitlist is gone from the home page and /reserve is up;
 *   - the build carries a Supabase address, without which sign-up, sign-in
 *     and the live founding counts quietly do nothing.
 * Exits 1 on any failure, so it can gate a script.
 */
const origin = (process.argv[2] || 'https://astoryapp.com').replace(/\/$/, '');

const PAGES = [
    '/', '/reserve/', '/pricing/', '/how-it-works/', '/for-families/', '/questions/',
    '/terms/', '/privacy/', '/terms.html', '/privacy.html', '/sign-up/', '/sign-in/',
];

let failed = 0;
const fail = (msg) => {
    failed++;
    console.log(`  FAIL  ${msg}`);
};
const pass = (msg) => console.log(`  ok    ${msg}`);

for (const path of PAGES) {
    const res = await fetch(origin + path, { redirect: 'follow' });
    const body = await res.text();
    if (res.status !== 200) fail(`${path} answered ${res.status}`);
    else if (body.length < 20_000 && !['/sign-up/', '/sign-in/'].includes(path))
        fail(`${path} is the bare app shell (${body.length} bytes), not the prebuilt page`);
    else pass(`${path} ${res.status}, ${(body.length / 1024).toFixed(0)} KB`);
}

const home = await (await fetch(origin + '/')).text();
if (/join the waitlist/i.test(home)) fail('home page still says "Join the waitlist"');
else pass('no waitlist on the home page');

const scripts = [...home.matchAll(/(?:src|href)="(\/assets\/[^"]+\.js)"/g)].map((m) => m[1]);
let supabase = false;
for (const src of scripts) {
    const js = await (await fetch(origin + src)).text();
    if (/https:\/\/[a-z0-9]{20}\.supabase\.co/.test(js)) {
        supabase = true;
        break;
    }
}
if (!supabase) {
    // The client is in a lazy chunk; follow one level of imports from the entry.
    for (const src of scripts) {
        const js = await (await fetch(origin + src)).text();
        for (const m of js.matchAll(/"(\.?\/?assets\/[^"]+\.js)"|"\.\/([^"]+\.js)"/g)) {
            const file = (m[1] || `assets/${m[2]}`).replace(/^\.?\//, '');
            const chunk = await (await fetch(`${origin}/${file}`)).text();
            if (/https:\/\/[a-z0-9]{20}\.supabase\.co/.test(chunk)) {
                supabase = true;
                break;
            }
        }
        if (supabase) break;
    }
}
if (supabase) pass('the build has a Supabase address (accounts and counts work)');
else fail('no Supabase address in the build — set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY and rebuild');

console.log(failed ? `\n${failed} problem(s) on ${origin}` : `\n${origin} is good.`);
process.exit(failed ? 1 : 0);
