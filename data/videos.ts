export type ShowcaseVideo = {
  id: string;
  youtubeId: string;
  title: string;
  category: string;
  thumbnail: string;
  alt: string;
  sourceTitle: string;
  confirmationNeeded: ('title' | 'category' | 'thumbnail')[];
  disclosure?: string;
};

// Titles checked against YouTube oEmbed metadata; posters visually reviewed.
// Generic Reel categories remain provisional, with no commissioning claims.
const video = (youtubeId: string, title: string, sourceTitle: string, category: string, alt: string, confirmationNeeded: ShowcaseVideo['confirmationNeeded'] = [], disclosure?: string): ShowcaseVideo => ({
  id: youtubeId, youtubeId, title, sourceTitle, category, alt, confirmationNeeded, disclosure,
  thumbnail: `https://i.ytimg.com/vi/${youtubeId}/oardefault.jpg`,
});

export const videos: ShowcaseVideo[] = [
  video('A-gUHdlRJLA', 'Sri Lanka and Aussie', 'Sri lanka and aussie', 'Reel', 'Presenter in a red headscarf seated beside tropical greenery', ['category']),
  video('6FhEVrLMLxA', 'Glowth AI campaigns', 'Glowth Ai campaigns', 'Reel', 'Presenter holding a microphone beside the beach', ['category']),
  video('X_BYW6CoLaM', 'Glowth and VXD BTS', 'BTS video Glowth and VXD', 'Behind the scenes', 'Seated presenter beside a studio light'),
  video('qyUuOOefreg', 'Jo Malone', 'Glowth x Jo Malone', 'AI concept campaign', 'Woman beside the sea at sunset', [], 'An independent AI concept campaign by Glowth. Not commissioned by or affiliated with Jo Malone.'),
  video('jtHDtpHXHGc', 'LCY', 'Glowth x LCY', 'Reel', 'Man wearing sunglasses seated on a coastal lawn', ['category']),
  video('wS0Y2RcvDMQ', 'Ellise', 'Ellise', 'Reel', 'Green branded bottles against a vivid yellow background', ['category']),
  video('YgvuzsyPRfM', 'Sike', 'Sike', 'Reel', 'Woman wearing headphones and yellow sunglasses holding a drinks can', ['category']),
  video('b4-qb0BtEaQ', 'Ayla BTS', 'BTS Ayla video 1', 'Behind the scenes', 'Camera crew arranging a restaurant food shoot'),
  video('mAk8qWO-zYk', 'Ayla BTS vs shots', 'Ayla BTS vs Shots', 'Behind the scenes', 'Food photograph inset on a white background', ['thumbnail']),
];
