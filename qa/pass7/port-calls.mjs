import {readFileSync,writeFileSync} from 'node:fs';
const old=readFileSync('src/pages/site/ThreeCalls.tsx','utf8').replace(/\r\n/g,'\n');
let body=old.slice(old.indexOf('function Phone('));
body=body.replace('const [count, setCount] = useState(scenario.id === "childhood" ? 2 : 0);','const [count, setCount] = useState(scenario.id === "childhood" ? 1 : 0);\n  const [typing,setTyping]=useState(false);');
body=body.replace('const complete = count >= scenario.script.length;','const complete = count > scenario.script.length;');
body=body.replace('const delay = Math.max(2600, scenario.script[count]?.delay ?? 3000);','const next=scenario.script[count];\n    const delay=next?.role==="user"?Math.max(1100,next.delay):Math.max(2400,next?.delay??2400);\n    const thinking=next?.role==="ai"?setTimeout(()=>setTyping(true),350):undefined;');
body=body.replace('() => setCount((n) => Math.min(n + 1, scenario.script.length)),','() => {setTyping(false);setCount((n) => Math.min(n + 1, scenario.script.length+1));},');
body=body.replace('return () => clearTimeout(timer);','return () => {clearTimeout(timer);clearTimeout(thinking);};');
body=body.replace('scroll.current.scrollTop = scroll.current.scrollHeight;','scroll.current.scrollTo({top:scroll.current.scrollHeight,behavior:reduced?"instant":"smooth"});').replace('}, [count, active]);','}, [count, active, typing, reduced]);');
body=body.replace('setCount(2);','setCount(1);\n    setTyping(false);');
body=body.replace('{current.map((turn, i) => (','{current.map((turn, i) => (');
body=body.replace('              </div>\n            </>','                {typing && active && inView && !paused && <div className="typing" aria-label="A Story is considering the next question"><i/><i/><i/></div>}\n              </div>\n            </>');
body=body.replace('Math.min(n + 1, scenario.script.length)','Math.min(n + 1, scenario.script.length+1)');
body=body.replace('setCount(scenario.script.length);','setCount(scenario.script.length+1);');
body=body.replace('                    setPaused(true);\n                    setCount','                    setPaused(true);\n                    setTyping(false);\n                    setCount');
body=body.replace('                  See memory\n                </button>','                  See memory\n                </button>\n                <button onClick={begin}>Restart</button>');
body=body.replace('export default function ThreeCalls()', 'export default function CallsCinema()');
const start=body.indexOf('        <Intro>');const end=body.indexOf('        </Intro>',start);
body=body.slice(0,start)+'        <Intro>A small aside changes the whole conversation. Watch an interviewer follow the detail, respect a no, and return to what mattered.</Intro>'+body.slice(end+'        </Intro>'.length);
body=body.replace('{s.id === "faith" ? "Faith" : s.chapter}','<small>{s.id === "faith" ? "Faith" : s.chapter}</small><strong>{s.label}</strong><span>{s.watch}</span>');
body=body.replace('<div className="call-grid" ref={ref}>','<div className="call-grid" ref={ref} data-entered={inView}>');
body=body.replace('What the interview is doing','What the interview noticed');
writeFileSync('src/pages/site/pass7/CallsCinema.tsx',readFileSync('qa/pass7/calls-css.tmp','utf8')+body);


