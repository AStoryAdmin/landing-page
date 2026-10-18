/**
 * The doors into the web app, tested both ways they are built:
 *   - deploy/cloudfront-viewer-request.js, the edge function;
 *   - the inline script at the top of index.html, the no-AWS version.
 * Both must agree on every case below. Run by `npm run check`.
 */
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import vm from 'node:vm';
import { canonicalPath, redirects } from '../../scripts/site-routes.mjs';

const APP = 'https://app.astoryapp.com';
/* [address, where it should end up (null = stays on this site), rewritten S3 key] */
const CASES = [
    ['https://astoryapp.com/?ref=ab12CD', `${APP}/join/AB12CD`],
    ['https://astoryapp.com/index.html?ref=AB12CD', `${APP}/join/AB12CD`],
    ['https://astoryapp.com/join?ref=AB12CD', `${APP}/join/AB12CD`],
    ['https://astoryapp.com/join/?ref=AB12CD', `${APP}/join/AB12CD`],
    ['https://astoryapp.com/join/zzzzz9', `${APP}/join/ZZZZZ9`],
    ['https://astoryapp.com/join/ZZZZZ9/', `${APP}/join/ZZZZZ9`],
    ['https://astoryapp.com/?ref=SHORT', null, '/index.html'],
    ['https://astoryapp.com/?ref=AB12CD7', null, '/index.html'],
    ['https://astoryapp.com/?ref=AB-12C', null, '/index.html'],
    ['https://astoryapp.com/pricing?ref=AB12CD', null, '/pricing/index.html'],
    ['https://astoryapp.com/join/AB12', null, '/join/AB12/index.html'],
    ['https://astoryapp.com/c/rosa-family', `${APP}/c/rosa-family`],
    ['https://astoryapp.com/sign-in', `${APP}/sign-in`],
    ['https://astoryapp.com/sign-in/', `${APP}/sign-in`],
    ['https://astoryapp.com/login', `${APP}/sign-in`],
    ['https://astoryapp.com/sign-up?ref=FRIEND', `${APP}/create-account`],
    ['https://astoryapp.com/account', `${APP}/`],
    ['https://astoryapp.com/start', `${APP}/create-account`],
    ['https://astoryapp.com/start?plan=individual', `${APP}/create-account`],
    ['https://astoryapp.com/start?intent=demo', null, '/start/index.html'],
    ['https://astoryapp.com/sign-in?next=/reserve', null, '/sign-in/index.html'],
    ['https://astoryapp.com/sign-up?next=%2Freserve%23founding', null, '/sign-up/index.html'],
    ['https://astoryapp.com/l?m=abc&k=def', null, '/l/index.html'],
    ['https://astoryapp.com/p/rosa', null, '/p/rosa/index.html'],
    ['https://astoryapp.com/contribute/rosa', null, '/contribute/rosa/index.html'],
    ['https://astoryapp.com/pricing/', null, '/pricing/index.html'],
    ['https://astoryapp.com/terms.html', null, '/terms.html'],
    ['https://astoryapp.com/assets/index-abc.js', null, '/assets/index-abc.js'],
    ['https://astoryapp.com/', null, '/index.html'],
    ['https://www.astoryapp.com/pricing?x=1', 'https://astoryapp.com/pricing?x=1'],
];

/* ── The CloudFront Function ── */
const fnSource = readFileSync(new URL('../../deploy/cloudfront-viewer-request.js', import.meta.url), 'utf8');
const fn = vm.runInNewContext(fnSource + '\n;handler');
const toEvent = (address) => {
    const url = new URL(address);
    const querystring = {};
    for (const [k, v] of url.searchParams) querystring[k] = { value: v };
    return { request: { uri: url.pathname, querystring, headers: { host: { value: url.hostname } } } };
};
for (const [address, expected, key] of CASES) {
    const out = fn(toEvent(address));
    if (expected) {
        assert.ok(out.statusCode === 302 || out.statusCode === 301, `edge: ${address} should redirect`);
        assert.equal(out.headers.location.value, expected, `edge: ${address}`);
    } else {
        assert.equal(out.statusCode, undefined, `edge: ${address} should not redirect`);
        assert.equal(out.uri, key, `edge: ${address} rewrites to ${key}`);
    }
}

/* ── The inline script in index.html ── */
const html = readFileSync(new URL('../../index.html', import.meta.url), 'utf8');
const inline = html.match(/<script>\s*(\(function \(\) \{[\s\S]*?window\.__PRERENDER[\s\S]*?\}\)\(\);)\s*<\/script>/);
assert.ok(inline, 'index.html carries the app-door script');
for (const [address, expected] of CASES) {
    const url = new URL(address);
    let went = null;
    const location = {
        hostname: url.hostname, pathname: url.pathname, search: url.search, hash: url.hash,
        replace: (to) => { went = to; },
    };
    vm.runInNewContext(inline[1], { location, window: {}, URLSearchParams });
    assert.equal(went, expected, `inline: ${address}`);
}
/* And never while the prerender takes its snapshot. */
{
    let went = null;
    const location = { hostname: 'astoryapp.com', pathname: '/sign-in', search: '', hash: '', replace: (to) => { went = to; } };
    vm.runInNewContext(inline[1], { location, window: { __PRERENDER: true }, URLSearchParams });
    assert.equal(went, null, 'inline: skipped while prerendering');
}
/* ── Old addresses: the edge 301s each to the page that replaced it ── */
for (const [from, target] of Object.entries(redirects)) {
    const [path, anchor] = target.split('#');
    const want = canonicalPath(path) + '?utm=x' + (anchor ? '#' + anchor : '');
    for (const variant of [from, from + '/']) {
        const out = fn(toEvent('https://astoryapp.com' + variant + '?utm=x'));
        assert.equal(out.statusCode, 301, `edge: ${variant} is an old address`);
        assert.equal(out.headers.location.value, want, `edge: ${variant}`);
    }
}
console.log(`PASS: ${CASES.length} addresses, edge function and inline script agree.`);
