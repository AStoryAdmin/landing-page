// Deployment companion: dry-run by default. Does not change account settings.
import { writeFileSync } from 'node:fs';
import { routes } from './site-routes.mjs';
const site = (process.env.VITE_SITE_URL ?? 'https://astoryapp.com').replace(
    /\/$/,
    '',
);
const key = process.env.INDEXNOW_KEY;
if (!key || !/^[a-zA-Z0-9-]{8,128}$/.test(key))
    throw new Error(
        'Set INDEXNOW_KEY to the domain owner’s valid key before preparing a submission.',
    );
const payload = {
    host: new URL(site).host,
    key,
    keyLocation: site + '/' + key + '.txt',
    urlList: routes.map((r) => site + r),
};
if (process.argv.includes('--prepare-key')) {
    writeFileSync('public/' + key + '.txt', key);
    console.log('Key file prepared; deploy it before submitting.');
}
if (!process.argv.includes('--submit')) {
    console.log(JSON.stringify({ dryRun: true, ...payload }, null, 2));
} else {
    const response = await fetch('https://api.indexnow.org/indexnow', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
    });
    if (!response.ok) throw new Error('IndexNow returned ' + response.status);
    console.log(
        'Submitted ' + payload.urlList.length + ' URLs: ' + response.status,
    );
}
