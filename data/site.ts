import assets from './portfolio-assets.json';

export type PortfolioImage = { src: string; original: string; alt: string; width: number; height: number; position: string; fit: 'cover' | 'contain' };
export type Project = { id: string; title: string; category: string; description: string; disclosure?: string; gallery: PortfolioImage[]; cover: PortfolioImage; thumbnailSrc: string; thumbnailFit: 'cover' | 'contain'; thumbnailPosition: string; thumbnailAlt: string; thumbnailBackground: string; featured?: boolean };
function gallery(group: string, details: { alt: string; position: string; fit?: 'cover' | 'contain' }[]): PortfolioImage[] {
  return assets.filter(asset => asset.group === group).map((asset, i) => ({ ...asset, ...details[i], fit: details[i].fit ?? 'cover' }));
}
const sand = gallery('sand-and-sky', [
  {alt: 'Woman holding a pink Sand & Sky skincare bottle against a blue sky', position: '50% 45%'},
  {alt: 'Woman seated on an oversized Sand & Sky Australian Pink Clay jar beneath a blue sky', position: '50% 50%'},
]);
const food = gallery('food-photography', [
  {alt: 'Burger and fries on a wooden serving board in a warmly lit restaurant', position: '50% 68%'},
  {alt: 'Wide photograph of a burger and fries on a restaurant table', position: '50% 58%'},
]);
const bop = gallery('bop', [
  {alt: 'BOP coffee identity across a takeaway cup, branded bag and orange printed materials', position: '50% 50%', fit: 'contain'},
  {alt: 'BOP blue and orange coffee branding on pastry packaging, an iced coffee and street signage', position: '50% 50%', fit: 'contain'},
]);
const jo = gallery('jo-malone', [
  {alt: 'Jo Malone London cologne on a rock with citrus, shells and a sunset sea behind it', position: '50% 52%'},
  {alt: 'Woman holding Jo Malone London cologne on a beach, with the brand name across the artwork', position: '50% 50%', fit: 'contain'},
]);
const gucci = gallery('gucci', [
  {alt: 'Gucci fashion concept artwork featuring a woman in a black dress with a handbag on a city street', position: '50% 50%', fit: 'contain'},
  {alt: 'Woman in a black dress holding a handbag beneath an urban walkway', position: '50% 50%'},
]);
const coastal = gallery('coastal-menswear', [
  {alt: 'Man in a short sleeved shirt seated on grass beside a coastal golf course', position: '50% 50%'},
  {alt: 'Man holding an espresso at a marina café with yachts in the background', position: '50% 48%'},
]);
const spyder = gallery('spyder', [
  {alt: 'Skier in a fur trimmed hood and goggles holding skis in a snowy landscape', position: '50% 42%'},
  {alt: 'Spyder rainwear artwork featuring a hooded man in rain with campaign typography', position: '50% 50%', fit: 'contain'},
]);
const sike = gallery('sike', [
  {alt: 'Sike drink cans in orange, lime and pink variants with a lime green graphic behind them', position: '50% 50%', fit: 'contain'},
  {alt: 'Sike orange drink brand board with colour swatches, a hand holding a can and campaign lettering', position: '50% 50%', fit: 'contain'},
]);
const cattuccino = gallery('cattuccino', [
  {alt: 'Cattuccino coffee brand identity board showing the wordmark, cat illustrations, typefaces, packaging and drinks', position: '50% 50%', fit: 'contain'},
]);
const independent = 'An independent AI concept campaign created by Glowth. This work was not commissioned by the featured brand and does not imply endorsement or a client relationship.';
export const projects: Project[] = [
  { id: 'sand-and-sky', title: 'Sand & Sky', category: 'AI concept campaign', description: 'Pink skincare, blue skies and an imagined product world. Two AI campaign images created by Glowth.', disclosure: independent, gallery: sand, cover: sand[0], thumbnailSrc: sand[0].src, thumbnailFit: 'cover', thumbnailPosition: '50% 45%', thumbnailAlt: sand[0].alt, thumbnailBackground: '#098dcc', featured: true },
  { id: 'food-photography', title: 'At the table', category: 'Food photography', description: 'A burger and fries, photographed in a warmly lit restaurant. Two perspectives from Glowth’s food photography portfolio.', gallery: food, cover: food[0], thumbnailSrc: food[0].src, thumbnailFit: 'cover', thumbnailPosition: '50% 68%', thumbnailAlt: food[0].alt, thumbnailBackground: '#261c13', featured: true },
  { id: 'bop', title: 'BOP', category: 'Branding', description: 'A coffee identity expressed in blue and orange, across packaging, signage and printed materials.', gallery: bop, cover: bop[0], thumbnailSrc: bop[0].src, thumbnailFit: 'cover', thumbnailPosition: '50% 50%', thumbnailAlt: bop[0].alt, thumbnailBackground: '#0347ca', featured: true },
  { id: 'jo-malone', title: 'Jo Malone', category: 'AI concept campaign', description: 'A coastal fragrance story, from a sunset product scene to a beach portrait.', disclosure: independent, gallery: jo, cover: jo[0], thumbnailSrc: jo[0].src, thumbnailFit: 'cover', thumbnailPosition: '50% 52%', thumbnailAlt: jo[0].alt, thumbnailBackground: '#e4b88b' },
  { id: 'gucci', title: 'Gucci', category: 'AI concept campaign', description: 'Fashion imagery set against city architecture, with a black dress and handbag at its centre.', disclosure: independent, gallery: gucci, cover: gucci[0], thumbnailSrc: gucci[0].src, thumbnailFit: 'cover', thumbnailPosition: '50% 50%', thumbnailAlt: gucci[0].alt, thumbnailBackground: '#3f4036' },
  { id: 'coastal-menswear', title: 'Coastal menswear', category: 'AI imagery', description: 'Two menswear images set beside the coast and at a marina café. Created by Glowth.', gallery: coastal, cover: coastal[0], thumbnailSrc: coastal[0].src, thumbnailFit: 'cover', thumbnailPosition: '50% 50%', thumbnailAlt: coastal[0].alt, thumbnailBackground: '#6f804b' },
  { id: 'spyder', title: 'Spyder', category: 'AI imagery', description: 'Outdoor apparel imagery across snowy slopes and a rain soaked scene. Created by Glowth.', gallery: spyder, cover: spyder[0], thumbnailSrc: spyder[0].src, thumbnailFit: 'cover', thumbnailPosition: '50% 42%', thumbnailAlt: spyder[0].alt, thumbnailBackground: '#748493' },
  { id: 'sike', title: 'Sike', category: 'Branding', description: 'Drinks packaging and brand artwork built around expressive lettering and bright colour.', gallery: sike, cover: sike[0], thumbnailSrc: sike[1].src, thumbnailFit: 'cover', thumbnailPosition: '50% 50%', thumbnailAlt: sike[1].alt, thumbnailBackground: '#000000' },
  { id: 'cattuccino', title: 'Cattuccino', category: 'Branding', description: 'A coffee identity bringing together a wordmark, cat illustrations, typography and packaging.', gallery: cattuccino, cover: cattuccino[0], thumbnailSrc: cattuccino[0].src, thumbnailFit: 'contain', thumbnailPosition: '50% 50%', thumbnailAlt: cattuccino[0].alt, thumbnailBackground: '#ffffff' },
];
export type HeroImage = { className: string; src: string; alt: string; aspectRatio: string; fit: 'cover' | 'contain'; position: string; label: string; sizes: string };
// Independent art direction: these settings never affect portfolio thumbnails or galleries.
export const heroImages: HeroImage[] = [
  { className: 'art-flower', src: sand[0].src, alt: sand[0].alt, aspectRatio: '4 / 5', fit: 'cover', position: '50% 45%', label: 'AI concept campaign', sizes: '(max-width: 640px) 102px, 224px' },
  { className: 'art-brand', src: jo[0].src, alt: jo[0].alt, aspectRatio: '4 / 5', fit: 'cover', position: '50% 35%', label: 'AI concept campaign', sizes: '(max-width: 640px) 102px, 224px' },
  { className: 'art-food', src: food[0].src, alt: food[0].alt, aspectRatio: '4 / 5', fit: 'cover', position: '50% 72%', label: '', sizes: '(max-width: 640px) 100px, 184px' },
  { className: 'art-place', src: bop[0].src, alt: bop[0].alt, aspectRatio: '4 / 5', fit: 'cover', position: '50% 50%', label: '', sizes: '(max-width: 640px) 100px, 184px' },
];

export const site = {
  name: 'Glowth',
  email: 'hello@glowth.com.au',
  enquiry: 'mailto:hello@glowth.com.au',
  studio: 'https://glowthstudio.com.au',
  introduction: 'A creative agency for brands with something to say. We bring curious thinking and thoughtful making to Australia and Sri Lanka, with a soft spot for hotels, restaurants and cafés.',
};


export const services = [
  { title: 'Social media management', description: 'A considered presence, from content planning and creation to keeping the conversation going. Built around your brand and the people you want to reach.' },
  { title: 'Branding', description: 'Identity, art direction and a visual language with personality. A clear foundation for everything your brand puts into the world.' },
  { title: 'AI visual campaigns', description: 'Product promotion through AI generated images and videos. Imaginative campaign worlds, guided by a clear creative idea.' },
  { title: 'Photography', description: 'Food, spaces, products and people, captured with care. Photography for hospitality and brands across other industries.' },
  { title: 'Video production', description: 'Stories with movement, from social content to brand films. Thoughtful concepts, considered shoots and a distinctive final edit.' },
];
