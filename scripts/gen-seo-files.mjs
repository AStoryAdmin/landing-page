import { writeFileSync, readFileSync } from 'node:fs';
import { routes, redirects } from './site-routes.mjs';
const SITE = (process.env.VITE_SITE_URL ?? 'https://astoryapp.com').replace(
    /\/$/,
    '',
);
const lastmod = '2026-09-16';
writeFileSync(
    'public/sitemap.xml',
    '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' +
        routes
            .map(
                (path) =>
                    `  <url><loc>${SITE}${path}</loc><lastmod>${lastmod}</lastmod></url>`,
            )
            .join('\n') +
        '\n</urlset>\n',
);
writeFileSync(
    'public/robots.txt',
    `# Public editorial pages; private links remain excluded.
User-agent: *
Allow: /
Disallow: /p/
Disallow: /contribute/
Disallow: /thanks
Disallow: /__design/

# Search discovery is independent of training preferences.
# No GPTBot override existed in the source; that preference is unchanged.
User-agent: OAI-SearchBot
Allow: /
Disallow: /p/
Disallow: /contribute/
Disallow: /thanks
Disallow: /__design/

Sitemap: ${SITE}/sitemap.xml
`,
);
writeFileSync(
    'public/_redirects',
    Object.entries(redirects)
        .map(([from, to]) => `${from}  ${to}  301`)
        .join('\n') +
        '\n# Existing prerendered files take priority; other paths use the router.\n/*  /index.html  200\n',
);
const config = JSON.parse(readFileSync('vercel.json', 'utf8'));
config.redirects = Object.entries(redirects).map(([source, destination]) => ({
    source,
    destination,
    permanent: true,
}));
config.rewrites = [
    { source: '/__design/a-story-home-vnext', destination: '/__design/a-story-home-vnext/index.html' },
    ...routes
        .filter((x) => x !== '/')
        .map((source) => ({ source, destination: source + '/index.html' })),
    { source: '/((?!api/).*)', destination: '/index.html' },
];
writeFileSync('vercel.json', JSON.stringify(config, null, 2) + '\n');
console.log(
    `Prepared ${routes.length} public routes and ${Object.keys(redirects).length} legacy redirects.`,
);

