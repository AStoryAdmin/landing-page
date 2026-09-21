import fs from 'node:fs';
let p='src/pages/site/pass7/LifeActs.tsx',s=fs.readFileSync(p,'utf8');s=s.replace('.time-path{display:none}', '.time-path{display:block;inset:0;width:100%;height:100%;opacity:.3;z-index:0}.time-scene>*:not(svg){position:relative;z-index:1}').replace('border-left:1px solid ${color.accentLine};','');fs.writeFileSync(p,s);
