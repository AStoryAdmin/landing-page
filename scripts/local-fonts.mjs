import fs from 'node:fs/promises';
import crypto from 'node:crypto';
const source = 'https://fonts.googleapis.com/css2?family=Figtree:wght@400;500;600;700&family=Source+Serif+4:ital,wght@0,400;0,500;1,400&display=swap';
const response = await fetch(source, { headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36' } });
if (!response.ok) throw new Error(`Font stylesheet: ${response.status}`);
let css = await response.text();
await fs.mkdir('public/fonts', { recursive: true });
const urls = [...new Set([...css.matchAll(/url\((https:[^)]+)\)/g)].map(match => match[1]))];
const registry = [];
for (const url of urls) {
    const font = await fetch(url);
    if (!font.ok) throw new Error(`Font file: ${font.status}`);
    const bytes = Buffer.from(await font.arrayBuffer());
    const name = crypto.createHash('sha256').update(bytes).digest('hex').slice(0, 16) + (url.endsWith('.woff2') ? '.woff2' : '.ttf');
    await fs.writeFile('public/fonts/' + name, bytes);
    css = css.replaceAll(url, '/fonts/' + name);
    registry.push({ source: url, localPath: 'public/fonts/' + name, bytes: bytes.length });
}
await fs.writeFile('public/fonts/fonts.css', css);
for (const [name, url] of [
    ['Figtree-OFL.txt', 'https://raw.githubusercontent.com/google/fonts/main/ofl/figtree/OFL.txt'],
    ['SourceSerif4-OFL.txt', 'https://raw.githubusercontent.com/google/fonts/main/ofl/sourceserif4/OFL.txt'],
]) {
    const license = await fetch(url);
    if (!license.ok) throw new Error(`License ${name}: ${license.status}`);
    await fs.writeFile('public/fonts/' + name, await license.text());
}
await fs.writeFile('qa/resolved/font-sources.json', JSON.stringify({ stylesheetSource: source, registry }, null, 2));
console.log(`Stored ${urls.length} font resources and both licenses locally.`);
