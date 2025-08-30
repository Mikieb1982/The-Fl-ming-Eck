
import { Article } from '../types';

const article: Article = {
  id: "guide-nature-park",
  title: "Nature Park Essentials · Hoher Fläming",
  author: "Field Guide",
  date: "2025-08-22",
  category: "Guides",
  excerpt: "Short guide to trails, transport, and safety.",
  hero: ["https://images.unsplash.com/photo-1588195538326-c5b1e9f80a1b?q=80&w=1950"],
  pullQuote: "Water, map, tick checks. Simple prep helps you enjoy the quiet.",
  body: [
    { type: 'paragraph', content: "The Nature Park covers rolling ground moraine with beech stands, open fields, and erratic boulders. Waymarked routes start near Bahnhof Bad Belzig and Wiesenburg." },
    { type: 'paragraph', content: "Carry water, tick protection, and a paper map for areas with weak signal. Buses connect towns, but frequency drops in the evening." },
    { type: 'paragraph', content: "For maps and more information on trails, visit the official Hoher Fläming Nature Park website: https://www.hoher-flaeming-naturpark.de/" }
  ],
  tags: ['hiking', 'nature', 'hoher-fläming', 'outdoors', 'safety'],
};

export default article;
