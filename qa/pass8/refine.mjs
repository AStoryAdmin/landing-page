import fs from 'node:fs';
function edit(file,fn){const p='src/'+file,s=fs.readFileSync(p,'utf8');fs.writeFileSync(p,fn(s));}
function replace(s,a,b){if(!s.includes(a))throw Error('Missing '+a.slice(0,80));return s.replace(a,b);}
// Keep the interaction architecture; refine its material and states.
edit('pages/site/pass7/materials.ts',s=>s.replace('600 12px/1.5','600 13px/1.5').replace('font-size: 18px;','font-size: 20px;').replace('min-height: 52px;','min-height: 54px;').replace('0 6px 15px -10px','0 8px 18px -10px').replace('0 10px 20px -12px','0 12px 24px -12px').replace('background: transparent;\n    color: ${color.primary};\n    box-shadow: none;','background: ${cream.warm};\n    color: ${color.primary};\n    box-shadow: 0 4px 10px -8px ${color.primary};').replace('  &:focus-visible {','  &:active { transform: translateY(1px); box-shadow: inset 0 1px 3px #0002; }\n  &.secondary:hover { background: ${cream.deep}; }\n  &:focus-visible {'));
edit('pages/site/Header.tsx',s=>replace(s,'More <span aria-hidden="true">⌄</span>','More <svg className="more-chevron" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true"><path d="m5 7 5 5 5-5" /></svg>'));
edit('pages/site/chrome.styles.ts',s=>s.replace('.more-toggle span {\n    color: ${color.teal};\n    font-size: 20px;\n  }','.more-chevron { width: 18px; height: 18px; transition: transform 180ms; }\n  .more-toggle[aria-expanded="true"] .more-chevron { transform: rotate(180deg); }\n  .more-toggle:hover { color: ${color.accent}; }').replace('padding: 9px 5px;','padding: 12px 10px;').replace('font-size: 13px;','font-size: 14px;').replace('font-size: 11px;','font-size: 12.5px;').replace('font: 600 12px','font: 600 13px'));
edit('pages/site/pass7/CallsCinema.tsx',s=>{
 s='import ExampleNote from "./ExampleNote";\n'+s;
 s=replace(s,'<span aria-hidden="true">▂▄▆ ▰</span>','<svg className="device-status" viewBox="0 0 78 20" fill="none" aria-hidden="true"><g fill="currentColor"><rect x="1" y="13" width="3" height="5" rx=".6"/><rect x="6" y="10" width="3" height="8" rx=".6"/><rect x="11" y="6" width="3" height="12" rx=".6"/><rect x="16" y="2" width="3" height="16" rx=".6"/></g><g stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"><path d="M28 7q10-9 20 0M32 11q6-5 12 0M36 15q2-2 4 0"/><rect x="55" y="4" width="19" height="12" rx="3"/><path d="M77 8v4"/></g><rect x="58" y="7" width="13" height="6" rx="1" fill="currentColor"/></svg>');
 s=s.replace('.device-top {','.device-status { width: 68px; height: 18px; color: ${color.primary}; flex: none; }\n  .device-top {');
 s=s.replace('font: italic 30px/1.3','font: italic clamp(30px,3.4vw,46px)/1.2').replace('border-top: 1px solid ${color.primaryLine};\n    padding-top: 25px;','border: 1px solid ${color.primaryLine};\n    border-radius: 16px;\n    background: ${cream.warm};\n    padding: 28px 32px;');
 s=s.replace('min-height: 155px;','min-height: 190px;');
 s=s.replace('<p className="chapter">{s.chapter}</p>','<p className="chapter">{s.id === "faith" ? "Hears the aside" : s.id === "childhood" ? "Respects the no" : "Follows the detail"}</p>');
 s=s.replace('<small>{s.id === "faith" ? "Faith" : s.chapter}</small>','<small>{s.id === "faith" ? "Hears the aside" : s.id === "childhood" ? "Respects the no" : "Follows the detail"}</small>');
 s=s.replace('A small aside changes the whole conversation. Watch an interviewer\n          follow the detail, respect a no, and return to what mattered.','A question starts it. What they say decides where it goes.');
 s=s.replace('<p className="demo-disclosure">','<ExampleNote>').replace('recordings.\n        </p>','recordings.\n        </ExampleNote>');
 s=s.replace('    min-height: 46px;','    min-height: 48px;');
 s=s.replace('.phone-controls button:hover {','.phone-controls button:active { transform: translateY(1px); box-shadow: inset 0 1px 3px #0002; }\n  .phone-controls button:focus-visible { outline: 2px solid ${color.accent}; outline-offset: 2px; }\n  .phone-controls button:hover {');
 s=s.replace('  .call-cover {','  .call-cover {\n    animation: bubble-in 450ms both;');
 s=s.replace('font-size: 13px;','font-size: 14px;').replace('font: 600 12px','font: 600 12.5px');
 // Draw attention to the detail without changing any script text.
 s=s.replace('{turn.text}\n                    </div>','{highlightDetail(turn.text, scenario.id)}\n                    </div>');
 s=s.replace('  .turn b {','  .turn mark { background: ${color.ivory}; color: ${color.primary}; padding: 1px 4px; border-radius: 3px; box-decoration-break: clone; }\n  .turn b {');
 const pos=s.indexOf('function Phone(');if(pos<0)throw Error('Phone function missing');
 s=s.slice(0,pos)+`function highlightDetail(text: string, id: string) {
  const phrase = id === "faith" ? "moved the wall" : id === "childhood" ? "No." : "All but one";
  const at = text.toLowerCase().indexOf(phrase.toLowerCase());
  return at < 0 ? text : <>{text.slice(0, at)}<mark>{text.slice(at, at + phrase.length)}</mark>{text.slice(at + phrase.length)}</>;
}
`+s.slice(pos);
 return s;
});
// Stronger transformation rail and a closer retention line.
edit('pages/site/pass7/MemoryLens.tsx',s=>{
 s='import ExampleNote from "./ExampleNote";\n'+s;
 s=s.replace('max-width: 285px;\n    font-size: 19px;','max-width: 400px;\n    font-size: 24px;');
 s=s.replace('.lens-stage {','.lens-heading strong { display: block; margin-top: 9px; color: ${color.teal}; padding: 8px 12px; background: ${color.tealWash}; border-radius: 6px; }\n  .lens-stage {');
 s=s.replace('grid-template-columns: 130px 1.5fr 1fr;','grid-template-columns: 160px 1.5fr 1fr;');
 s=s.replace('gap: 32px;','gap: 12px;').replace('font: 500 16px','font: 600 17px').replace('padding: 6px 0;','padding: 12px;\n    border-radius: 8px;\n    transition: background 180ms, color 180ms;');
 s=s.replace('color: ${color.accent};\n  }\n  .lens-print','color: ${color.ivory};\n    background: ${color.teal};\n    box-shadow: 0 5px 12px -9px ${color.primary};\n  }\n  .lens-rail button:hover:not([aria-pressed="true"]) { background: ${color.primaryWash}; }\n  .lens-print');
 s=s.replace('0 20px 40px -28px','0 22px 40px -20px').replace('font-size: 12px;','font-size: 13px;').replace('font-size: 16px;','font-size: 17px;');
 s=s.replace('font: 400 27px/1.3','font: 400 36px/1.25');
 s=s.replace('<small>Illustrative family and scripted exchange.</small>','<a href="#demo" className="lens-next">Hear what a good question opens <span aria-hidden="true">↓</span></a>');
 s=s.replace('        </div>\n      </Container>','        </div>\n        <ExampleNote>Photographs and family memories illustrate the experience. Names and dialogue are fictional. Voice layers are visual examples; no recording plays.</ExampleNote>\n      </Container>');
 s=s.replace('.lens-coda small {','.lens-next { font-size: 16px; color: ${color.primary}; min-height: 48px; padding: 12px 16px; border: 1px solid ${color.primaryLine}; border-radius: 8px; text-underline-offset: 4px; }\n  .lens-coda small {');
 return s;
});
// Remove the slipcase from every active mapping, retain original files only as source history.
edit('pages/site/pass7/LifeActs.tsx',s=>s.replace('useState("slipcase")','useState("closed")').replace('              ["slipcase", "The volume"],\n','').replace('view === "closed" ? "the cloth cover" : "the volume and slipcase"','"the cloth cover"').replace('height: 500px;','height: 540px;'));
edit('pages/site/Pricing.tsx',s=>s.replace('slipcase-1200.webp','closed-1200.webp').replace('A Story’s physical book and matching slipcase','A Story’s clothbound family book'));
edit('components/product/BookFeature.tsx',s=>s.replace('name="39"','name="38"').replace('The teal A Story volume and its matching slipcase','The teal A Story volume'));
edit('lib/sitePages.json',s=>s.replaceAll('"photo": "39"','"photo": "38"'));
edit('lib/mission.ts',s=>s.replace(/    'book-slipcase': \{[^}]+\},\r?\n/,''));
edit('lib/assetRegistry.json',s=>{const d=JSON.parse(s);delete d['book-object-slipcase'];for(const [key,v]of Object.entries(d)){if(v.id==='39'||key==='39')delete d[key];}return JSON.stringify(d,null,2)+'\n';});
