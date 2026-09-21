from pathlib import Path
p=Path('src/pages/site/HowItWorks.tsx')
s=p.read_text(encoding='utf-8-sig')
s=s.replace('import { Photo, Invitation } from "./shared";', 'import { Photo, Invitation } from "./shared";\nimport {ProcessJourney, InterviewRoles} from "./ProcessJourney";')
s=s.replace('  const [chapter, setChapter] = useState(0);\n','')
s=s.replace('Start talking. <br />\n            <em>See what comes back.</em>', 'What happens after you <br />\n            <em>send the link.</em>')
s=s.replace('A familiar voice. A small detail. A question that follows it. That’s\n            how a family archive begins.', 'A gentle, unhurried process. They answer the phone; A Story does the rest.')
start=s.index('        <div className="gf-process-map">')
end=s.index('      <section className="gf-example"', start)
s=s[:start]+'      </div>\n      <ProcessJourney />\n      <InterviewRoles />\n'+s[end:]
start=s.index('        <div>\n          <label>\n            Explore a chapter')
end=s.index('      <section className="depths">',start)
s=s[:start]+'''        <div className="chapter-index">{CHAPTERS.map((c,i)=><article key={c.name}><span>{String(i+1).padStart(2,'0')}</span><div><h3>{c.name}</h3><p>{c.blurb}</p>{c.note&&<p className="chapter-note">{c.note}</p>}</div></article>)}</div>
      </section>
'''+s[end:]
s=s.replace('{d.name}\n              </button>', '<strong>{d.name}</strong><span className="depth-explanation">{d.blurb}</span>\n              </button>')
s=s.replace('{SENSITIVE_COUNT} questions are marked sensitive.', '{SENSITIVE_COUNT} of {QUESTION_COUNT} questions are marked sensitive.')
p.write_text(s,encoding='utf-8')
p=Path('src/pages/site/ThreeCalls.tsx');s=p.read_text(encoding='utf-8-sig').replace('justify-content:space-between;gap:40px','justify-content:center;gap:40px').replace('.interview-move p{','.interview-move > p:last-child{');p.write_text(s,encoding='utf-8')
p=Path('src/pages/site/ProcessJourney.tsx');s=p.read_text(encoding='utf-8-sig').replace('open-900.webp','open-1200.webp');p.write_text(s,encoding='utf-8')
p=Path('src/pages/site/Home.tsx');s=p.read_text(encoding='utf-8-sig').replace('We call your parents <br/><em>and ask about their life.</em>', '<span className="hero-first">We call your parents</span><br/><em>and ask about<br/>their life.</em>');s=s.replace(' @media(max-width:1100px)', ' @media(min-width:1280px){.hero-first{white-space:nowrap;}}\n @media(max-width:1100px)',1);p.write_text(s,encoding='utf-8')
p=Path('src/pages/site/OurStory.tsx');s=p.read_text(encoding='utf-8-sig').replace('<p>The stories were leaving first. Going quiet while the people were still in the room with me.</p>', '<p>Not a grand interview.<br/>Just another afternoon.<br/>One more question<br/>across the table.</p>');p.write_text(s,encoding='utf-8')
