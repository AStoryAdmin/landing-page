/**
 * CloudFront Function (runtime: cloudfront-js-2.0), event: viewer request.
 * Attach it to the distribution's default behavior. docs/PUBLISHING.md,
 * "2026-10-18", has the steps.
 *
 * It does two jobs.
 *
 * 1. Doors into the web app (2026-10-18). The same rules as the inline
 *    script at the top of index.html, but at the edge, so they work without
 *    JavaScript and answer with a real redirect. 302, not 301: a 301 sticks
 *    in browsers for good, and these may still change.
 *      www.astoryapp.com/<anything>     → https://astoryapp.com/<anything> (301)
 *      /?ref=CODE, /join?ref=CODE       → app.astoryapp.com/join/CODE
 *      /join/CODE                       → app.astoryapp.com/join/CODE
 *      /c/SLUG                          → app.astoryapp.com/c/SLUG
 *      /sign-in, /signin, /login        → app.astoryapp.com/sign-in
 *      /sign-up, /signup                → app.astoryapp.com/create-account
 *      /account                         → app.astoryapp.com/
 *      /start (not ?intent=demo)        → app.astoryapp.com/create-account
 *    A family code is six letters or digits. The reservation's own sign-in
 *    and sign-up (?next=/reserve...) stay on this site.
 *    Never touched: /l (printed books' listening codes), /p/, /contribute/.
 *    Old addresses (/experience, /faq, …) get a 301 to the page that
 *    replaced them.
 *
 * 2. Every page by its own file. `npm run build` writes each page as
 *    dist/<route>/index.html, and S3 only finds exact names:
 *      /pricing/      → /pricing/index.html
 *      /pricing       → /pricing/index.html
 *      /terms.html    → unchanged (a real file)
 *      /assets/app.js → unchanged
 *    Without this the S3 website endpoint answers /pricing with a 301 to
 *    /pricing/ first.
 *
 * Tested by qa/routing/cloudfront.test.mjs (part of `npm run check`).
 */
var APP = 'https://app.astoryapp.com';
var CODE = /^[A-Za-z0-9]{6}$/;
/* Old addresses, as in scripts/site-routes.mjs `redirects` (the test checks they match). */
var LEGACY = {
    '/experience': '/how-it-works/',
    '/family': '/for-families/',
    '/institution': '/care-communities/',
    '/story': '/our-story/',
    '/faq': '/questions/',
    '/why-it-matters': '/#why-a-story',
};

function redirect(status, location) {
    return {
        statusCode: status,
        statusDescription: status === 301 ? 'Moved Permanently' : 'Found',
        headers: {
            location: { value: location },
            'cache-control': { value: status === 301 ? 'public, max-age=3600' : 'no-store' },
        },
    };
}

function query(qs) {
    var parts = [];
    for (var key in qs) {
        var item = qs[key];
        var values = item.multiValue ? item.multiValue : [item];
        for (var i = 0; i < values.length; i++) {
            parts.push(encodeURIComponent(key) + (values[i].value === '' ? '' : '=' + encodeURIComponent(values[i].value)));
        }
    }
    return parts.length ? '?' + parts.join('&') : '';
}

function handler(event) {
    var request = event.request;
    var uri = request.uri;
    var qs = request.querystring || {};
    var host = request.headers.host ? request.headers.host.value.toLowerCase() : '';

    if (host === 'www.astoryapp.com') return redirect(301, 'https://astoryapp.com' + uri + query(qs));

    var path = uri.replace(/\/index\.html$/, '/');
    var bare = path.length > 1 ? path.replace(/\/$/, '') : path;
    if (LEGACY[bare]) {
        var to = LEGACY[bare].split('#');
        return redirect(301, to[0] + query(qs) + (to[1] ? '#' + to[1] : ''));
    }
    var ref = qs.ref ? qs.ref.value : '';
    var next = qs.next ? qs.next.value : '';
    var m = path.match(/^\/join\/([A-Za-z0-9]{6})\/?$/);
    if (m) return redirect(302, APP + '/join/' + m[1].toUpperCase());
    if (/^\/(join\/?)?$/.test(path) && CODE.test(ref)) return redirect(302, APP + '/join/' + ref.toUpperCase());
    m = path.match(/^\/c\/([A-Za-z0-9_-]{1,80})\/?$/);
    if (m) return redirect(302, APP + '/c/' + m[1]);
    if (!/^\/reserve/.test(next)) {
        if (/^\/(sign-in|signin|login)\/?$/.test(path)) return redirect(302, APP + '/sign-in');
        if (/^\/(sign-up|signup)\/?$/.test(path)) return redirect(302, APP + '/create-account');
        if (/^\/account\/?$/.test(path)) return redirect(302, APP + '/');
        if (/^\/start\/?$/.test(path) && !(qs.intent && qs.intent.value === 'demo')) {
            return redirect(302, APP + '/create-account');
        }
    }

    if (uri.endsWith('/')) {
        request.uri = uri + 'index.html';
    } else if (!uri.split('/').pop().includes('.')) {
        request.uri = uri + '/index.html';
    }
    return request;
}
