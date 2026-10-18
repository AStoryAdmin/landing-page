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
 *   - each public page carries its own canonical, at the address that
 *     answers 200 (with the trailing slash);
 *   - the doors into the web app (index.html's inline script) ride in every page;
 *   - old addresses (/experience, /faq, …) still land somewhere.
 * Exits 1 on any failure, so it can gate a script.
 *
 * Since 2026-10-18 it checks every page in scripts/site-routes.mjs rather than
 * a short list, and a local preview works as the origin:
 *   npm run build && npm run preview -- --port 4173
 *   npm run verify:live -- http://localhost:4173
 */
import { canonicalPath, privateRoutes, redirects, routes, staticPages } from './site-routes.mjs';

const origin = (process.argv[2] || 'https://astoryapp.com').replace(/\/$/, '');

const PAGES = [
    ...[...routes, ...staticPages].map(canonicalPath),
    ...privateRoutes.map((r) => canonicalPath(r.path)),
    '/terms.html', '/privacy.html', '/samples',
];
/* Pages whose canonical is checked: the public React ones. */
const CANONICAL = new Set(routes.map(canonicalPath));

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
    else if (body.length < 20_000)
        fail(`${path} is the bare app shell (${body.length} bytes), not the prebuilt page`);
    else if (CANONICAL.has(path) && !body.includes(`rel="canonical" href="https://astoryapp.com${path}"`))
        fail(`${path} does not carry its own canonical (https://astoryapp.com${path})`);
    else if (!path.startsWith('/samples') && !body.includes('"/join/" + m[1]'))
        fail(`${path} is missing the invitation redirect script (index.html)`);
    else pass(`${path} ${res.status}, ${(body.length / 1024).toFixed(0)} KB`);
}

for (const from of Object.keys(redirects)) {
    const res = await fetch(origin + from, { redirect: 'follow' });
    const body = await res.text();
    if (res.status !== 200) fail(`old address ${from} answered ${res.status}`);
    else if (!res.redirected && !body.includes('http-equiv="refresh"')) fail(`old address ${from} does not move on`);
    else pass(`old address ${from} moves on (${res.redirected ? 'redirect' : 'page'})`);
}

const home = await (await fetch(origin + '/')).text();
if (/join the waitlist/i.test(home)) fail('home page still says "Join the waitlist"');
else pass('no waitlist on the home page');

// /samples is a file in public/, not a React route: the three books must be in it.
const samples = await (await fetch(origin + '/samples')).text();
const books = ['carolyn', 'raymond', 'tom'].filter((b) => samples.includes(`data-book="${b}"`));
if (books.length === 3) pass('/samples carries all three sample books (#carolyn, #raymond, #tom)');
else fail(`/samples is missing books: ${['carolyn', 'raymond', 'tom'].filter((b) => !books.includes(b)).join(', ')}`);

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
