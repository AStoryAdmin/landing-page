import fs from 'node:fs';
let p='src/pages/site/OurStory.tsx',s=fs.readFileSync(p,'utf8');
s=s.replace('import { Photo, Invitation }','import { Photo, Invitation }'); // preserve imports
s=s.replace('export default function OurStory()', 'import {Frame} from "./pass7/materials";\nexport default function OurStory()');
s=s.replace('<Photo\n            id="27"','<Frame className="founder-mount"><Photo\n            id="27"').replace('            priority\n          />','            priority\n          /></Frame>');
s=s.replace(/        <section className="gf-origin-essay">([\s\S]*?)        <\/section>/g,(section,body)=>{
const paragraphs=[...body.matchAll(/            <p>[\s\S]*?            <\/p>/g)];
if(paragraphs.length<2)return section;
const extra=paragraphs.slice(1).map(m=>m[0]).join('\n');
let next=section;
for(const m of paragraphs.slice(1))next=next.replace(m[0],'');
return next.replace(paragraphs[0][0],paragraphs[0][0]+'\n<details><summary>Read Daniel’s reflection</summary>'+extra+'</details>');
});
const mathStart=s.indexOf('              <p>\n                I did not know');
const mathEnd=s.indexOf('              </p>',mathStart)+18;
s=s.slice(0,mathStart)+'<details><summary>The questions I had never asked</summary>'+s.slice(mathStart,mathEnd)+'</details>'+s.slice(mathEnd);
s=s.replace('            Here is the part\n            <br />I had wrong.','            Here is the part\n            <br /><em>I had wrong.</em>');
s=s.replace('            So I stopped\n            <br />\n            waiting for someday.','            Someone, finally,\n            <br /><em>to ask.</em>');
s=s.replace('        <section className="gf-origin-essay">\n          <h2>\n            Here is the part','        <div className="founder-detail"><Frame><Photo id="32" alt="A neighborhood house, a place with stories behind its door"/></Frame><p>“I can call them this afternoon,<br/><em>and I do.</em>”</p></div>\n        <section className="gf-origin-essay">\n          <h2>\n            Here is the part');
fs.writeFileSync(p,s);
p='src/pages/site/Pricing.tsx';s=fs.readFileSync(p,'utf8').replace('import { BookStage } from "./shared";','');
s=s.replace('        <div className="gf-pricing-intro">','        <section className="minute-comparison" aria-label="Call minute comparison"><p className="gf-eyebrow">Call minutes are the meter</p><div>{PLANS.map(p=><article key={p.id}><span>{p.name}</span><strong>{p.meter.match(/\\d+/)?.[0]}<small>{p.id==="express"?"minutes, once":p.id==="family"?"minutes / month, shared":"minutes / month"}</small></strong><div className="minute-track"><i style={{width: (Number(p.meter.match(/\\d+/)?.[0])/200*100)+"%"}}/></div></article>)}</div></section>\n        <div className="gf-pricing-intro">');
s=s.replace('<div className="gf-plan-cost">','<details className="gf-plan-cost"><summary>See full details</summary><p>{p.meterNote}</p><p>{p.blurb}</p>');
s=s.replace('              </div>\n            </article>','              </details>\n            </article>');
s=s.replace('        <div className="gf-print-price">','        <div className="gf-print-price" id="book"><img src="/book-objects/slipcase-1200.webp" alt="A Story’s physical book and matching slipcase" loading="lazy"/>');
s=s.replace('      <BookStage />','');
fs.writeFileSync(p,s);
p='src/pages/site/system.tsx';s=fs.readFileSync(p,'utf8').replaceAll('600 11px/','600 13px/').replace('clamp(32px, 3.4vw, 52px)','clamp(36px, 4.2vw, 62px)');fs.writeFileSync(p,s);
p='src/pages/site/ProcessJourney.tsx';s=fs.readFileSync(p,'utf8');s=s.replace('font: 600 11px','font: 600 14px').replace('font-size: clamp(34px, 4vw, 56px)','font-size: clamp(38px, 4.5vw, 64px)').replace('padding-top: 24px;','padding: 30px;\n    background: color-mix(in srgb, '+ '\${color.teal}' +' 90%, '+ '\${color.ivory}'+');\n    border-radius: 16px;');
s=s.replace('<h3>{h.toUpperCase()}</h3>','<span className="role-icon" aria-hidden="true">{({"Interviewer":"?","Editor":"¶","Historian":"⌁","Biographer":"§"} as Record<string,string>)[h]}</span><h3>{h.toUpperCase()}</h3>');
s=s.replace('  .roles-grid {','  .role-icon{float:right;font:italic 45px '+ '\${font.display}'+';color:'+ '\${color.gold}'+';margin:0 0 10px 20px;}\n  .roles-grid {');
fs.writeFileSync(p,s);

