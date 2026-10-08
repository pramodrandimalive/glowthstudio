import {chromium} from '@playwright/test';
import assert from 'node:assert/strict';
const browser=await chromium.launch({channel:'chrome'}),page=await browser.newPage();
const errors=[];page.on('pageerror',e=>errors.push(e.message));page.on('console',m=>{if(m.type()==='error')errors.push(m.text())});
for(const [w,h] of [[1280,800],[1440,900],[1920,1080],[2560,1440],[390,844]]){
 await page.setViewportSize({width:w,height:h});await page.goto('http://localhost:3000/concept-1',{waitUntil:'networkidle'});
 await page.evaluate(()=>document.fonts.ready);for(const img of await page.locator('.hero img').all())await img.evaluate(el=>el.decode());
 const composition=await page.locator('.hero-composition').boundingBox();
 assert.ok(composition.width<=1360);assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));
 const textRects=await page.locator('.hero-copy').evaluate(el=>{
   const walker=document.createTreeWalker(el,NodeFilter.SHOW_TEXT),rects=[];let node;
   while(node=walker.nextNode()){if(!node.textContent.trim())continue;const range=document.createRange();range.selectNodeContents(node);for(const r of range.getClientRects())rects.push({x:r.x,y:r.y,width:r.width,height:r.height});}return rects;
 });
 const cards=await page.locator('.floating-art').all();
 for(const card of cards){const b=await card.boundingBox();assert.ok(b.x>=composition.x&&b.x+b.width<=composition.x+composition.width,'Rotated card fits horizontally');assert.ok(b.y>=composition.y&&b.y+b.height<=composition.y+composition.height-24,'Rotated card clears hero boundaries');for(const t of textRects)assert.ok(!(b.x<t.x+t.width&&b.x+b.width>t.x&&b.y<t.y+t.height&&b.y+b.height>t.y),'Card must not overlap hero text');}
 const insets=await page.locator('.header,#work,#services,#about,#contact,.footer').evaluateAll(els=>els.map(el=>{const r=el.getBoundingClientRect(),s=getComputedStyle(el);return {x:r.x+parseFloat(s.paddingLeft),w:r.width-parseFloat(s.paddingLeft)-parseFloat(s.paddingRight)}}));
 console.log(w,{composition:composition.width,content:insets[0].w});
 for(const inset of insets)assert.ok(Math.abs(inset.x-insets[0].x)<1&&Math.abs(inset.w-insets[0].w)<1,'Aligned content');
 await page.screenshot({path:`test-results/hero-${w}.png`});
 for(const img of await page.locator('.project-image img').all()){await img.evaluate(el=>{el.loading='eager'});await img.evaluate(el=>el.decode())}
 await page.screenshot({path:`test-results/page-${w}.png`,fullPage:true});
}
assert.deepEqual(errors,[]);await browser.close();console.log('All viewport, rotated bounds, alignment and console checks passed.');
