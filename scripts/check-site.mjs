import { chromium, expect } from '@playwright/test';
import assert from 'node:assert/strict';
import { mkdir } from 'node:fs/promises';
await mkdir('test-results', { recursive: true });
const browser = await chromium.launch({ channel: 'chrome' });
const errors = [];
const page = await browser.newPage();
page.on('pageerror', e => errors.push(e.message));
page.on('console', msg => { if (msg.type() === 'error') errors.push(msg.text() + ' ' + msg.location().url); });
for (const [name, width, height] of [['desktop-1440',1440,900],['desktop-1280',1280,720],['tablet',820,1180],['mobile',390,844]]) {
  await page.setViewportSize({width,height});
  await page.goto('http://localhost:3000/', {waitUntil:'networkidle'});
  await page.evaluate(() => document.fonts.ready);
  async function checkGrid(state) {
    const expected=width<=640?1:width<=1024?2:3;
    const before=await page.locator('.project-image').evaluateAll(elements=>elements.map(el=>({w:el.getBoundingClientRect().width,h:el.getBoundingClientRect().height})));
    const columns=await page.locator('.project-grid').evaluate(el=>getComputedStyle(el).gridTemplateColumns.split(' ').length);
    assert.equal(columns,expected);
    for(const box of before){assert.ok(Math.abs(box.w/box.h-.8)<.001,'4:5 thumbnail');assert.ok(Math.abs(box.w-before[0].w)<1,'Equal columns');}
    for(const img of await page.locator('.project-image img').all()){await img.evaluate(el=>{el.loading='eager'});await img.evaluate(el=>el.decode());}
    const after=await page.locator('.project-image').evaluateAll(elements=>elements.map(el=>({w:el.getBoundingClientRect().width,h:el.getBoundingClientRect().height})));
    assert.deepEqual(after,before,'Image loading must not change thumbnail dimensions');
    const titles=await page.locator('.project-caption').evaluateAll(elements=>elements.map(el=>el.getBoundingClientRect().top));
    for(let i=0;i<titles.length;i+=expected){for(let j=i;j<Math.min(i+expected,titles.length);j++)assert.ok(Math.abs(titles[i]-titles[j])<1,'Aligned project titles');}
    await page.locator('.project-grid').screenshot({path:`test-results/${name}-${state}-grid.png`});
  }
  await checkGrid('collapsed');
  assert.equal(await page.title(),'Glowth — Good brands. Wild ideas.');
  assert.equal(await page.getByRole('heading',{level:1}).count(),1);
  assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), `${name}: horizontal overflow`);
  for (const img of await page.locator('img:visible').all()) {
    await img.evaluate(el => { el.loading = 'eager'; });
    await img.evaluate(el => el.decode());
  }
  await page.evaluate(() => window.scrollTo({top:0,behavior:'instant'}));
  const hero = await page.locator('.hero').boundingBox();
  const copy = await page.locator('.hero-copy').boundingBox();
  const cta = await page.locator('.hero-copy .pill').boundingBox();
  assert.ok(copy.y >= hero.y && copy.y + copy.height <= hero.y + hero.height, `${name}: hero content clipped`);
  assert.ok(cta.y + cta.height < height - 30, `${name}: CTA outside comfortable first viewport`);
  console.log(`${name}: headline ${await page.locator('h1').evaluate(el => getComputedStyle(el).fontSize)}, CTA bottom ${Math.round(cta.y + cta.height)}px`);
  await page.screenshot({path:`test-results/${name}-viewport.png`});
  await page.screenshot({path:`test-results/${name}.png`,fullPage:true});
  await page.getByRole('link',{name:'Explore our work'}).click();
  await page.waitForURL('**#work');
  const preview = page.getByRole('button',{name:'Preview Sand & Sky'});
  await preview.click();
  await page.getByRole('dialog').waitFor({state:'visible'});
  assert.ok(await page.getByRole('dialog').innerText().then(t=>t.includes('not commissioned')));
  await page.locator('.portfolio-full-image img').evaluate(el=>el.decode());
  await page.screenshot({path:`test-results/${name}-dialog.png`});
  await page.keyboard.press('Escape');
  assert.equal(await page.getByRole('dialog').count(),0);
  assert.ok(await preview.evaluate(el => el === document.activeElement), 'Focus restored to project');
  await page.getByRole('button',{name:'More of our work'}).click();
  await expect(page.locator('.project-card')).toHaveCount(9);
  await checkGrid('expanded');
  for (const card of await page.locator('.project-card').all()) {
    await card.click();
    const gallery = page.locator('.portfolio-full-image img');
    await gallery.evaluate(el=>el.decode());
    const firstSrc=decodeURIComponent(await gallery.getAttribute('src'));
    const group=firstSrc.match(/portfolio\/([^/]+)\//)[1];
    assert.equal(await gallery.evaluate(el=>getComputedStyle(el).objectFit),'contain');
    const thumbnails=page.locator('.portfolio-thumbnails button');
    for(let i=0;i<await thumbnails.count();i++){
      await thumbnails.nth(i).click();await gallery.evaluate(el=>el.decode());
      const ratio=await gallery.evaluate(el=>({w:el.getBoundingClientRect().width,h:el.getBoundingClientRect().height,sourceW:+el.getAttribute('width'),sourceH:+el.getAttribute('height')}));
      assert.ok(Math.abs(ratio.h-ratio.w*ratio.sourceH/ratio.sourceW)<1,'Gallery must preserve natural aspect ratio');
      const bounds=await page.getByRole('dialog').boundingBox();assert.ok(bounds.y>=0&&bounds.y+bounds.height<=height+1,'Viewer remains inside viewport');
      assert.ok(decodeURIComponent(await gallery.getAttribute('src')).includes(`/portfolio/${group}/`), 'Gallery must stay within its project');
    }
    if(['bop','cattuccino','food-photography'].includes(group)) await page.screenshot({path:`test-results/${name}-${group}.png`});
    await page.getByRole('button',{name:'Close project preview',exact:true}).click();
  }
  assert.equal(await page.locator('a[href="/concept-2"]').count(),0);
  const text=await page.locator('body').innerText();
  assert.ok(!/Reference artwork|Visual direction|Approved project stories|prototype/i.test(text));
  await page.getByRole('button',{name:'Show selected work'}).click();
  await page.getByText('Social media management',{exact:true}).click();
  assert.equal(await page.locator('details[open]').count(),1);
  assert.equal(await page.getByRole('link',{name:'Let’s make it happen'}).getAttribute('href'),'mailto:hello@glowth.com.au');
  assert.equal(await page.getByRole('link',{name:/Meet Glowth Studio/}).getAttribute('href'),'https://glowthstudio.com.au');
  console.log(`${name}: layout, images, project dialog, focus restoration, service disclosure and links passed`);
}
await page.emulateMedia({reducedMotion:'reduce'});
assert.equal(await page.locator('html').evaluate(el=>getComputedStyle(el).scrollBehavior),'auto');
await page.goto('http://localhost:3000/concept-1', {waitUntil:'networkidle'});
assert.equal(page.url(), 'http://localhost:3000/');
await page.goto('http://localhost:3000/concept-2', {waitUntil:'networkidle'});
assert.ok(page.url() === 'http://localhost:3000/');
await page.goto('http://localhost:3000/', {waitUntil:'networkidle'});
assert.ok(page.url() === 'http://localhost:3000/');
assert.deepEqual(errors,[],'Browser console errors');
await browser.close();
console.log('All checks passed; no browser console errors. Screenshots in test-results/.');
