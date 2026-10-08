# Glowth website

The selected Creative Playground design, built with Next.js App Router, TypeScript and Tailwind CSS.

## Local preview

```sh
npm install
npm run dev
```

Open http://localhost:3000/. The homepage renders directly at `/`; the legacy `/concept-1` and `/concept-2` routes permanently redirect here. No concept switching controls are shown.

## Checks

```sh
npm run build
npm run typecheck
node scripts/check-site.mjs
```

Browser checks require the local server and Google Chrome. They cover 1440 × 900, 1280 × 720, 820 × 1180 and 390 × 844 layouts, hero content visibility, image loading, every project gallery, gallery isolation, complete artwork display, dialog focus restoration, service disclosures, enquiry links, redirects and browser errors. Screenshots are saved in `test-results/`.

## Content and imagery

- `data/site.ts`: shared typed projects, galleries, per-image crop settings, hero selections, services and agency details.
- `data/portfolio-assets.json`: source mapping, published original paths, responsive derivative paths and native dimensions.
- `public/portfolio/<project>/`: copies of selected original assets with descriptive filenames, plus WebP derivatives. All 17 supplied portfolio images are included.
- `scripts/prepare-assets.mjs`: reproducible copy and derivative preparation, exclusively from the original portfolio folders. Does not read design screenshots. Derivatives are bounded to 2400 × 2400 without enlargement; Next Image supplies responsive variants.
- `references/`: supplied originals, preserved unchanged. The AI source folder is actually named `ai-campaings`.

Design screenshots are layout references only. Their five former image crops and the extraction code have been removed. The original Glowth star remains in use.

## Portfolio selections

The hero uses Sand & Sky skincare, Jo Malone cologne, food photography and BOP branding. The first three work cards are Sand & Sky, At the table and BOP. “More of our work” reveals Jo Malone, Gucci, Coastal menswear, Spyder, Sike and Cattuccino, retaining the existing grid layout.

Each gallery is restricted to its own filename group. Gallery artwork uses `width: 100%` and `height: auto` at its natural aspect ratio, inside a viewport bounded, scrollable dialog. Thumbnails have independent `thumbnailSrc`, `thumbnailFit`, `thumbnailPosition`, alt text and background fields in shared project data. The grid uses equal columns (three desktop, two tablet, one mobile) and fixed 4:5 proportions. BOP uses its original portrait applications artwork; Sike uses its alternative orange can artwork. Cattuccino retains the full square board with `contain` and a white background sampled from its source (RGB 255,255,255). A dedicated 4:5 Cattuccino thumbnail would be preferable when available. The previous beige bands came from CSS; white margins within Cattuccino and edge cutoffs in Sike’s original multi-can composition are embedded in the source and remain unchanged in galleries.

Sand & Sky, Jo Malone and Gucci are explicitly labelled **AI concept campaign**, with an independent concept disclosure stating that they were not commissioned by the featured brand and do not imply endorsement or a client relationship. Other work is described without claiming commissioning, client relationships or performance results.

## Details still to confirm

- `lcy` has no verified expanded brand name: displayed as **Coastal menswear**.
- The restaurant and shoot identity for `food-1.jpg` and `food-2.jpg` are not supplied: displayed as **At the table**.
- The supplied artwork visibly identifies BOP, Sike, Cattuccino and Spyder, but their commissioning status, project briefs, credits and dates are not confirmed. No such details are asserted.
- No original hotel/property photograph was supplied. BOP branding replaces the old hotel mockup crop in the hero; no replacement is missing from the visible page.

Navigation, native project dialogs, thumbnails, previous/next image controls, service disclosures, enquiry mailto links and the Glowth Studio link are functional. No CMS, backend, simulated form or deployment is included. Prototype noindex metadata remains in place until publication is requested.

## Bounded hero and shared content widths

All primary sections use a centred 1200 px content area, with a minimum 32 px gutter (24 px on mobile). Coloured section backgrounds remain full width. The hero composition is independently bounded at 1360 px, uses relative positioning, and contains the full rotated card bounds. It has content-driven height with a 740 px desktop minimum and no overflow clipping. The headline caps at 104 px, with a 720 px central copy area.

Hero settings are separate typed entries in `data/site.ts`, with their own source, aspect ratio, fit, focal position and responsive sizes. All four selected hero sources fill 4:5 cards: Sand & Sky at 50% 45%, Jo Malone at 50% 35%, food at 50% 72%, and BOP at 50% 50%. Top cards cap at 224 px wide; bottom cards cap at 184 px. Mobile uses 102 px and 100 px cards. The BOP blue padding was CSS introduced and has been removed. Original artwork and portfolio thumbnail settings remain unchanged.

Run `node scripts/check-hero.mjs` for screenshots and checks at 1280 × 800, 1440 × 900, 1920 × 1080, 2560 × 1440 and 390 × 844. Checks include rotated card containment, text clearance, shared content alignment, horizontal overflow and browser errors.

## Video showcase

The homepage film strip is implemented in `components/video-showcase.tsx`, with scoped CSS and typed records in `data/videos.ts`. All nine supplied YouTube Shorts use verified 1080 × 1920 portrait posters. A real Watch reel button creates just one inline privacy enhanced iframe, preserving the poster's 9:16 dimensions. Closing, selecting another reel or scrolling away destroys the previous player. No modal is used.

Auto sliding advances every five seconds, looping from the end to the beginning. Hover, keyboard focus, touch/mouse interaction, playback and inactive tabs pause movement. The delay restarts after interaction. Reduced motion disables automatic movement. Native touch scrolling and scroll snapping remain available alongside mouse dragging and previous/next controls.

YouTube oEmbed supplied the original titles, recorded as `sourceTitle`. Generic `Reel` categories for Sri Lanka and Aussie, Glowth AI campaigns, LCY, Ellise and Sike require confirmation. Jo Malone retains its independent AI concept disclosure. The Ayla BTS vs shots poster has white space embedded in the source; an alternative portrait cover would be welcome. Confirmation flags are stored in the data without putting editorial notes in the public interface.

Run `node scripts/check-videos.mjs` against the local production preview to verify responsive layout, unchanged inline player dimensions, exclusive playback, teardown, auto sliding, pausing and reduced motion. The deterministic interaction tests stub external iframe content; actual YouTube embedding is checked separately in the browser.
