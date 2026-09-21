/** Recreate responsive assets from the supplied extracted handoff, without changing sources. */
import sharp from 'sharp';
import {mkdir,readdir,readFile,writeFile,copyFile} from 'node:fs/promises';
import {resolve,join} from 'node:path';
import {createHash} from 'node:crypto';
const source=resolve(process.argv[2]||'..');
await mkdir('public/mission',{recursive:true});await mkdir('public/book-objects',{recursive:true});
const manifest=[];
for(const file of (await readdir(join(source,'photos'))).filter(f=>f.endsWith('-1800.webp'))){
 const input=await readFile(join(source,'photos',file)); const meta=await sharp(input).metadata();
 for(const width of [640,1200,1800])await sharp(input).resize({width,withoutEnlargement:true}).webp({quality:84}).toFile(join('public/mission',file.replace('-1800',`-${width}`)));
 manifest.push({file,source:'Supplied extracted photo pack',width:meta.width,height:meta.height,sha256:createHash('sha256').update(input).digest('hex')});
}
for(const file of (await readdir(join(source,'book-objects'))).filter(f=>f.endsWith('.webp')))await copyFile(join(source,'book-objects',file),join('public/book-objects',file));
await writeFile('public/mission/handoff-manifest.json',JSON.stringify(manifest,null,2));
console.log(`Restored ${manifest.length} photographs at three widths and the original transparent book objects.`);
