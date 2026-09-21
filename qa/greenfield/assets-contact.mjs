import sharp from 'sharp';
import fs from 'node:fs/promises';
const ids=['29','28','33','31','32','02','04','03','05','07','21','27','30','34','01','09','10','26','35'];
const tiles=await Promise.all(ids.map(async(id,i)=>({input:await sharp('public/mission/'+id+'-640.webp').resize(240,180,{fit:'contain',background:'#f3ebde'}).extend({bottom:28,background:'#f3ebde'}).composite([{input:Buffer.from(`<svg width="240" height="28"><text x="10" y="20" font-size="18">${id}</text></svg>`),top:180,left:0}]).png().toBuffer(),left:(i%5)*240,top:Math.floor(i/5)*208})));
await sharp({create:{width:1200,height:832,channels:3,background:'#f3ebde'}}).composite(tiles).png().toFile('qa/greenfield/asset-selection.png');
