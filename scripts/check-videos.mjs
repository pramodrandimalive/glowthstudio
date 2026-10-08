import { chromium, expect } from '@playwright/test';
import assert from 'node:assert/strict';
const browser=await chromium.launch({channel:'chrome'});
try {
 const page=await browser.newPage();const errors=[];page.on('pageerror',e=>errors.push(e.message));
 // Keep external player traffic out of deterministic UI tests; real embeds checked separately.
 await page.route('https://www.youtube-nocookie.com/**',r=>r.fulfill({body:'<html><body>Player fixture</body></html>',contentType:'text/html'}));
 for(const [w,h] of [[1280,800],[1440,900],[1920,1080],[820,1180],[390,844]]) {
  await page.setViewportSize({width:w,height:h});await page.emulateMedia({reducedMotion:'reduce'});
  await page.goto('http://localhost:3000/',{waitUntil:'networkidle'});
  const strip=page.locator('#video-film-strip'), cards=strip.locator('article');
  await page.locator('#films').scrollIntoViewIfNeeded();
  await expect(cards).toHaveCount(9);await expect(page.locator('#video-film-strip iframe')).toHaveCount(0);
  assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false);
  await cards.first().locator('img').evaluate(img=>img.decode());
  await page.locator('#films').screenshot({path:`test-results/inline-videos-${w}.png`});
  const before=await cards.first().boundingBox();
  await cards.first().getByRole('button').click();
  await expect(page.locator('#video-film-strip iframe')).toHaveCount(1);await expect(page.locator('dialog[open]')).toHaveCount(0);
  assert.deepEqual(await cards.first().boundingBox(),before);
  await expect(cards.first().getByRole('button',{name:/Close video/})).toBeFocused();
  await expect(cards.first().getByRole('button',{name:/Watch reel/})).toHaveCount(0);
  if(w>640){await cards.nth(1).getByRole('button').click();await expect(page.locator('#video-film-strip iframe')).toHaveCount(1);await expect(cards.first().locator('iframe')).toHaveCount(0);}
  await page.getByRole('button',{name:/Close video:/}).click();await expect(page.locator('#video-film-strip iframe')).toHaveCount(0);
  await cards.first().getByRole('button').click();await page.getByRole('button',{name:'Next videos',exact:true}).click();
  await expect(page.locator('#video-film-strip iframe')).toHaveCount(0);await expect.poll(()=>strip.evaluate(el=>el.scrollLeft)).toBeGreaterThan(50);
  await strip.evaluate(el=>el.scrollTo({left:0}));await page.mouse.move(0,0);await page.locator(':focus').evaluateAll(es=>es.forEach(e=>e.blur()));
  await page.waitForTimeout(5200);assert.equal(await strip.evaluate(el=>el.scrollLeft),0,'Reduced motion disables auto advance');
  console.log(w,'layout, inline dimensions, exclusive playback, close, manual navigation and reduced motion passed');
 }
 // Use virtual time for pause/resume and looping checks.
 await page.setViewportSize({width:1440,height:900});await page.emulateMedia({reducedMotion:'no-preference'});
 await page.goto('http://localhost:3000/',{waitUntil:'networkidle'});await page.clock.install();
 const strip=page.locator('#video-film-strip');
 await page.mouse.move(0,0);await page.clock.runFor(5600);await expect.poll(()=>strip.evaluate(el=>el.scrollLeft)).toBeGreaterThan(50);
 await strip.hover();const hovered=await strip.evaluate(el=>el.scrollLeft);await page.clock.runFor(6000);assert.equal(await strip.evaluate(el=>el.scrollLeft),hovered);
 await page.mouse.move(0,0);await page.clock.runFor(5600);await expect.poll(()=>strip.evaluate(el=>el.scrollLeft)).toBeGreaterThan(hovered);
 await strip.evaluate(el=>el.scrollTo({left:el.scrollWidth,behavior:'instant'}));await page.clock.runFor(5800);await expect.poll(()=>strip.evaluate(el=>el.scrollLeft)).toBeLessThan(2);
 await strip.locator('[data-play-video="0"]').focus();await page.clock.runFor(6000);assert.equal(await strip.evaluate(el=>el.scrollLeft),0);
 await strip.locator('[data-play-video="0"]').click();await page.mouse.move(0,0);await page.clock.runFor(6000);assert.equal(await strip.evaluate(el=>el.scrollLeft),0);
 await strip.evaluate(el=>el.scrollTo({left:400,behavior:'instant'}));await expect(page.locator('#video-film-strip iframe')).toHaveCount(0);
 assert.deepEqual(errors,[]);console.log('Auto advance, hover pause/resume, end loop, keyboard focus, playback pause and scroll teardown passed');
} finally {await browser.close();}
