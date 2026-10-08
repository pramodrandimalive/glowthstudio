import {chromium,expect} from '@playwright/test';
import assert from 'node:assert/strict';
const browser=await chromium.launch({channel:'chrome'});
try {
const page=await browser.newPage();const errors=[];page.on('pageerror',e=>errors.push(e.message));
for(const [width,height,ratio] of [[390,844,1],[820,1180,.85],[1280,800,.75],[1440,900,.75],[1920,1080,.75]]){
 await page.setViewportSize({width,height});await page.goto('http://localhost:3000/',{waitUntil:'domcontentloaded'});
 const section=page.locator('#ai-advertising'),frame=section.locator('iframe');
 await section.scrollIntoViewIfNeeded();
 await expect(frame).toHaveAttribute('title','Tropica Chocolate AI advertisement concept');
 await expect(frame).toHaveAttribute('loading','lazy');
 assert.equal(new URL(await frame.getAttribute('src')).searchParams.has('autoplay'),false);
 const metrics=await section.evaluate(el=>{const s=getComputedStyle(el);const f=el.querySelector('iframe').getBoundingClientRect();return {content:el.clientWidth-parseFloat(s.paddingLeft)-parseFloat(s.paddingRight),x:f.x,w:f.width,h:f.height,previous:el.previousElementSibling.className,next:el.nextElementSibling.id};});
 assert.ok(metrics.previous.includes('service-strip'));assert.equal(metrics.next,'work');
 assert.ok(Math.abs(metrics.w/metrics.h-16/9)<.01);assert.ok(metrics.w<=900);
 assert.ok(Math.abs(metrics.w/metrics.content-ratio)<.01);assert.ok(Math.abs(metrics.x-(width-metrics.w)/2)<1);
 assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false);
 const before=await frame.boundingBox();await page.waitForTimeout(1500);assert.deepEqual(await frame.boundingBox(),before);
 await page.screenshot({path:`test-results/spotlight-${width}.png`});
 if(width===1920)await page.screenshot({path:'test-results/spotlight-page-1920.png',fullPage:true});
 console.log(width,metrics.w,metrics.h,'centred, correct ratio and placement; no overflow or layout shift');
}
assert.deepEqual(errors,[]);
}finally{await browser.close()}
