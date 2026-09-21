import fs from 'node:fs';
function edit(p,fn){p='src/'+p;fs.writeFileSync(p,fn(fs.readFileSync(p,'utf8')));}
edit('pages/site/pass7/Storyboard.tsx',s=>{
 s=s.replace('import {} from "./materials";','import ExampleNote from "./ExampleNote";');
 s=s.replace('                <div className="time">','                <div className="week" aria-label="A Tuesday call"><span>M</span><b>T</b><span>W</span><span>T</span><span>F</span><span>S</span><span>S</span></div>\n                <div className="time">');
 s=s.replace('<div className="layers">\n                  <span>Card</span>\n                  <span>Transcript</span>\n                  <span>Voice</span>\n                </div>','<div className="kept-layers"><div><small>01 · CARD</small><p>The moment, made readable.</p></div><div><small>02 · TRANSCRIPT</small><p>“{sampleMemory.openingWords}”</p></div><div><small>03 · VOICE</small><Wave/><p>The original stays with it.</p></div></div>');
 const start=s.indexOf('              <div className="joining">');const end=s.indexOf('            {step === 4',start);
 s=s.slice(0,start)+`              <div className="joining">
                <figure className="family-photo"><img src="/mission/30-640.webp" alt="A family photograph of an afternoon at the lake"/><figcaption>A photograph · the same afternoon</figcaption></figure>
                <figure className="family-letter"><small>A NOTE FROM THE FAMILY</small><blockquote>“{sampleMemory.voices[1].quote}”</blockquote><figcaption>{sampleMemory.voices[1].name} · {sampleMemory.voices[1].kind}</figcaption></figure>
                <figure className="family-voice"><div><small>ANOTHER VOICE</small><blockquote>“{sampleMemory.voices[2].quote}”</blockquote><figcaption>{sampleMemory.voices[2].name} · {sampleMemory.voices[2].kind}</figcaption></div><Wave/></figure>
              </div>
            )}
`+s.slice(end);
 s=s.replace('      <p style={{ fontSize: 14, marginTop: 18, textAlign: "right" }}>\n        An illustrative journey. Try the working example below.\n      </p>','      <ExampleNote>This journey illustrates the product. Names and memories are fictional. Try the editable example below. No audio is recorded or played here.</ExampleNote>');
 s=s.replace('  @keyframes story-arrive {',`  .week { display:flex; gap:8px; margin-top:24px; justify-content:space-between; }
  .week>* { width:36px; height:40px; display:grid; place-items:center; font-size:16px; border-radius:7px; background: \${cream.deep}; }
  .week b { background: \${color.teal}; color: \${color.ivory}; }
  .kept-layers { display:grid; gap:10px; margin-top:24px; }
  .kept-layers>div { padding:14px 18px; border:1px solid \${color.primaryLine}; border-radius:8px; background: \${cream.warm}; }
  .kept-layers p { font-size:17px; margin-top:7px; }
  .p7-wave { display:flex; align-items:center; gap:3px; height:40px; margin-top:10px; }
  .p7-wave i { width:3px; border-radius:3px; background: \${color.teal}; }
  .joining .family-photo { padding:10px; transform:rotate(-2deg); }
  .joining .family-photo img { width:100%; height:180px; object-fit:cover; margin-bottom:15px; }
  .joining .family-letter { border-radius:2px; background: repeating-linear-gradient(transparent 0 31px, \${color.primaryLine} 32px), \${cream.warm}; }
  .joining .family-letter blockquote { margin-top:20px; }
  .joining .family-voice { grid-column:1/-1; display:flex; justify-content:space-between; gap:20px; align-items:center; margin:0; background: \${color.teal}; color: \${color.ivory}; }
  .family-voice small,.family-voice figcaption { color: \${color.gold}; }
  .family-voice blockquote { margin:15px 0; }
  .family-voice .p7-wave i { background: \${color.gold}; }
  .rail button:hover:not([aria-pressed="true"]) { background: \${cream.deep}; }
  .rail button:active { transform:translateY(1px); }
  @keyframes story-arrive {`);
 s=s.replace('font-size: 12px;','font-size: 14px;');
 s=s.replace('      font-size: 14px;\n    }\n    .rail span','      font-size: 14px;\n    }\n    .rail { grid-template-columns: repeat(3,1fr); }\n    .family-voice .p7-wave { display:none; }\n    .rail span');
 return s;
});
// Correct small secondary text in the affected presentation files only.
for(const p of ['pages/site/pass7/ArchiveBloom.tsx','pages/site/pass7/Storyboard.tsx','pages/site/pass7/LifeActs.tsx','pages/site/pass7/FamilyScenes.tsx','pages/site/HowItWorks.styles.ts','pages/site/Pricing.styles.ts'])edit(p,s=>s.replace(/font-size: 1[12]px;/g,'font-size: 13px;').replace(/font-size: 13px;/g,'font-size: 14px;'));

