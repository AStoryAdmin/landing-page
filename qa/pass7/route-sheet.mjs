import sharp from 'sharp';
const routes=['for-families','pricing','our-story','care-communities','organizations','start'];const inputs=await Promise.all(routes.map(async(r,i)=>({input:await sharp('qa/pass7/'+r+'-desktop.png').resize({width:570,height:356}).toBuffer(),left:(i%2)*570,top:Math.floor(i/2)*356})));
await sharp({create:{width:1140,height:1068,channels:4,background:'#F3EBDD'}}).composite(inputs).png().toFile('qa/pass7/routes-contact.png');
