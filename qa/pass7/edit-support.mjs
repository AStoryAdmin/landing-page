import fs from 'node:fs';
let p='src/pages/site/HowItWorks.tsx',s=fs.readFileSync(p,'utf8');
s=s.replace('import { ProcessJourney, InterviewRoles }','import { InterviewRoles }').replace('const steps =','import {Storyboard,HowHeroObject} from "./pass7/Storyboard";\nconst depthQuestions=["What did the kitchen at home look like?","What could you hear when you walked in?","Who was usually at the table?","What changed for you that year?","What do you understand about it now?"];\nconst steps =');
s=s.replace('const [depth, setDepth] = useState(0);','const [depth, setDepth] = useState(0);\n  const [chapter,setChapter]=useState(0);');
s=s.replace(/<Photo\s+className="gf-process-photo"[\s\S]*?\/>/,'<HowHeroObject />').replace('<ProcessJourney />','<Storyboard />');
const start=s.indexOf('        <div className="chapter-index">'),end=s.indexOf('\n      </section>',start);
s=s.slice(0,start)+`        <div className="chapter-spine"><div className="chapter-index" aria-label="Explore the chapters">{CHAPTERS.map((c,i)=><button key={c.name} aria-pressed={chapter===i} onClick={()=>setChapter(i)} onFocus={()=>setChapter(i)} onMouseEnter={()=>setChapter(i)}><span>{String(i+1).padStart(2,"0")}</span>{c.name}</button>)}</div><div className="chapter-preview" aria-live="polite"><span className="chapter-numeral">{String(chapter+1).padStart(2,"0")}</span><h3>{CHAPTERS[chapter].name}</h3><p>{CHAPTERS[chapter].blurb}</p>{CHAPTERS[chapter].note&&<small>{CHAPTERS[chapter].note}</small>}</div></div>`+s.slice(end);
s=s.replace('<span className="depth-explanation">{d.blurb}</span>','');
s=s.replace('{DEPTHS[depth].blurb}\n          </p>','“{depthQuestions[depth]}”\n          </p>\n          <p className="depth-context">{DEPTHS[depth].blurb} <small>Illustrative question</small></p>');
fs.writeFileSync(p,s);
p='src/pages/site/shared.tsx';s=fs.readFileSync(p,'utf8');
s=s.replace('<Invite $dark style={{ background: color.teal }}>','<Invite style={{background: "linear-gradient(135deg, "+color.ivory+", color-mix(in srgb, "+color.ivory+" 90%, "+color.accent+"))"}}>');
s=s.replace('<Label style={{ color: color.gold }}>','<Label style={{ color: color.teal }}>');
fs.writeFileSync(p,s);
p='src/pages/site/pass7/ArchiveHero.tsx';s=fs.readFileSync(p,'utf8').replace('h1 em{font:400','h1 em{font:italic 400').replace('A Story calls someone you love and follows where the conversation leads. Their <strong>voice, photographs and memories</strong> become a private archive the whole family can keep adding to.','A Story calls someone you love. Their words become <strong>a private family archive</strong> that keeps growing.');fs.writeFileSync(p,s);
p='src/pages/site/pass7/ArchiveBloom.tsx';s=fs.readFileSync(p,'utf8').replace('reduced?4:step','reduced&&!manual?4:step');fs.writeFileSync(p,s);

