from pathlib import Path
import json
p=Path('scripts/social-cards.mjs');s=p.read_text(encoding='utf-8-sig');s=s.replace("import {mkdir,readFile} from 'node:fs/promises';", "import {mkdir} from 'node:fs/promises';\nimport {brand,brandSvg} from './brand-svg.mjs';")
a=s.index('const paths=');b=s.index('const escape=',a);s=s[:a]+"const mark=Buffer.from(brandSvg());\n"+s[b:]
s=s.replace("tint='#3B291D'",'tint=brand.chocolate').replace("i>0?'#9E4420':'#3B291D'",'i>0?brand.terracotta:brand.chocolate').replace("background:'#F3EBDE'",'background:brand.ivory');p.write_text(s,encoding='utf-8')
p=Path('src/lib/sitePages.json');data=json.loads(p.read_text(encoding='utf-8-sig'));updates={'/':['We call your parents','and ask about their life.'],'/how-it-works':['What happens after you','send the link.'],'/for-families':['Most of a life','goes undocumented.'],'/care-communities':['Every resident has a life worth knowing.','A Story helps you learn it.'],'/organizations':['The knowledge people carry','should not leave with them.'],'/pricing':['Everyone starts free.','Only the calls are metered.'],'/our-story':['They survived.','The stories didn’t.']}
for row in data:
 if row['path'] in updates:row['phrase']=updates[row['path']]
 if row['path']=='/our-story':row['photo']='27'
 if row['path']=='/start':row['photo']='05'
p.write_text(json.dumps(data,indent=2,ensure_ascii=False)+'\n',encoding='utf-8')
p=Path('index.html');s=p.read_text(encoding='utf-8-sig').replace('#3B291D','#4A3327').replace('#B85327','#B85126');p.write_text(s,encoding='utf-8')
