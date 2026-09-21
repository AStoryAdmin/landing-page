from pathlib import Path
import json
s=Path('qa/redesign/production-contracts.mjs').read_text(encoding='utf-8-sig')
s=s[:s.index('const metadata=')]+'''await import('./compare-sources.mjs');
const compared=JSON.parse(await readFile('qa/definitive/source-comparison.json','utf8'));
for(const file of ['src/lib/pricing.ts','src/lib/product.ts','src/lib/checkout.ts','src/lib/demoScripts.ts']) assert(compared[file].equivalent, `${file} retains the supplied product contract`);
const brand=JSON.parse(await readFile('src/lib/brand.json','utf8'));
assert.deepEqual(Object.values(brand).sort(), ['#F3EBDD','#4A3327','#B85126','#0F4A58','#E0A03F','#EBC86A','#4C4C4C'].sort());
const favicon=await readFile('public/favicon.svg','utf8');
assert(favicon.includes(brand.teal)&&favicon.includes(brand.warmGold));
console.log(`PASS: ${routes.length} public snapshots, private noindex snapshot, ${references} asset references, 7 redirects, seven exact brand tokens and four preserved product sources.`);
'''
Path('qa/definitive/production-contracts.mjs').write_text(s,encoding='utf-8')
p=Path('package.json');d=json.loads(p.read_text(encoding='utf-8-sig'));d['scripts']['check']=d['scripts']['check'].replace('qa/redesign/production-contracts.mjs','qa/definitive/production-contracts.mjs');p.write_text(json.dumps(d,indent=2)+'\n',encoding='utf-8')
