# Serving the stub-env build for a panel (phone-first fix 2, item 14)

The plain local build has no Supabase env, so every visitor who sends the
/get-the-app form sees the email fallback. The panel should score the path
a real visitor gets: the form succeeds and says "We'll send your invite to
<email>". This build points Supabase at a host that does not exist, and
Playwright answers it. Nothing ever reaches the real Supabase.

## Build (from the repo root, Git Bash)

```sh
VITE_SUPABASE_URL=http://supabase.stub.test VITE_SUPABASE_ANON_KEY=stub npm run build:static
rm -rf qa/premium-2026-11/dist-stub && cp -r dist qa/premium-2026-11/dist-stub
printf '*\n' > qa/premium-2026-11/dist-stub/.gitignore   # never committed
npm run build:static                                      # put the plain dist back
git diff --ignore-cr-at-eol --stat -- vercel.json public/_redirects public/robots.txt public/sitemap.xml
# empty -> git checkout -- vercel.json public/_redirects public/robots.txt public/sitemap.xml
```

(`scripts/prerender.mjs` always writes `dist/`, so the stub build is made
there and copied.)

## Serve

```sh
node qa/serve-dist.mjs qa/premium-2026-11/dist-stub 5313
```

`/x` and `/x/` serve `x/index.html`; unknown paths serve the app shell.

## Playwright route (required in every context that opens the stub build)

```js
await page.route('**/*', (r) => {
  const u = r.request().url();
  if (/supabase\.co/.test(u)) return r.abort();            // never the real service
  if (!/supabase\.stub\.test/.test(u)) return r.continue();
  if (/\/rest\/v1\/waitlist_signups/.test(u)) {
    return r.fulfill({
      status: 201,
      headers: {
        'access-control-allow-origin': '*',
        'access-control-allow-headers': '*',
        'access-control-allow-methods': '*',
      },
      body: '',
    });
  }
  return r.fulfill({ status: 404, headers: { 'access-control-allow-origin': '*' }, body: '{}' });
});
```

The narrow form of the same rule is the route `**/rest/v1/waitlist_signups*`
answering 201 with the CORS headers above; the catch-all is safer because
it also stops any other stub request and aborts supabase.co.

## Check

`node qa/pf-fix2-shots.mjs --base http://localhost:5312 --form http://localhost:5313`
fills /get-the-app on the stub build and saves
`qa/premium-2026-11/pf-fix2/form-thank-you-390.png` and `-1440.png`
(one `POST /rest/v1/waitlist_signups`, answered 201 by the route), then the
fallback on the plain build (`form-fallback-*.png`, no off-site request).
