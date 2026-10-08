import sharp from 'sharp';
import { mkdir, copyFile, writeFile } from 'node:fs/promises';
// Only original portfolio artwork is read. Design screenshots are layout references, never image sources.
const groups = {
  'sand-and-sky': ['ai-campaings/skyandsands.png', 'ai-campaings/skyandsands-2.png'],
  'jo-malone': ['ai-campaings/jo-melone.png', 'ai-campaings/jo-melone-2.png'],
  gucci: ['ai-campaings/gucci.png', 'ai-campaings/gucci-2.png'],
  'coastal-menswear': ['ai-campaings/lcy.png', 'ai-campaings/lcy-2.png'],
  spyder: ['ai-campaings/spyder.png', 'ai-campaings/spyder-2.png'],
  bop: ['branding/bop.png', 'branding/bop-2.png'],
  sike: ['branding/sike.png', 'branding/sike-2.png'],
  cattuccino: ['branding/cattuccino.png'],
  'food-photography': ['photography/food-1.jpg', 'photography/food-2.jpg'],
};
const names = {
  'sand-and-sky': ['skincare-portrait', 'pink-clay-product-world'],
  'jo-malone': ['cologne-at-sunset', 'cologne-beach-portrait'],
  gucci: ['fashion-campaign-artwork', 'city-fashion-portrait'],
  'coastal-menswear': ['coastal-fashion-portrait', 'marina-fashion-portrait'],
  spyder: ['alpine-ski-portrait', 'rainwear-campaign-artwork'],
  bop: ['coffee-brand-applications', 'coffee-packaging-and-signage'],
  sike: ['drinks-packaging-range', 'orange-drink-brand-artwork'],
  cattuccino: ['coffee-brand-identity'],
  'food-photography': ['burger-portrait', 'burger-landscape'],
};
const manifest=[];
for(const [group,sources] of Object.entries(groups)) {
  const destination=`public/portfolio/${group}`;
  await mkdir(destination,{recursive:true});
  for(let i=0;i<sources.length;i++){
    const source=`references/${sources[i]}`;
    const name=names[group][i];
    const extension=source.split('.').pop();
    await copyFile(source,`${destination}/${name}.${extension}`);
    const info=await sharp(source).rotate().resize({width:2400,height:2400,fit:'inside',withoutEnlargement:true}).webp({quality:90}).toFile(`${destination}/${name}.webp`);
    const original=await sharp(source).metadata();
    manifest.push({group,source,original:`/portfolio/${group}/${name}.${extension}`,src:`/portfolio/${group}/${name}.webp`,width:info.width,height:info.height,originalWidth:original.width,originalHeight:original.height});
  }
}
await writeFile('data/portfolio-assets.json',JSON.stringify(manifest,null,2)+'\n');
console.log(`Prepared ${manifest.length} original portfolio images. Reference originals preserved; no upscaling.`);
