import { Article } from '../types';

const article: Article = {
  id: "guide-wiesenburg-park",
  title: "A Walker's Guide to Wiesenburg Castle Park",
  author: "Field Guide",
  date: "2025-08-27",
  category: "Guides",
  excerpt: "Explore the landscaped grounds of Schlosspark Wiesenburg, one of Brandenburg's most significant English-style landscape gardens.",
  hero: ["https://i.imgur.com/foai1Fd.jpeg"],
  pullQuote: "A masterful blend of natural beauty and sculpted landscapes, designed for quiet contemplation.",
  body: [
    { type: 'paragraph', content: "Wiesenburg Castle Park is a jewel of landscape architecture in the Hoher Fläming. Designed in the 19th century with influences from Peter Joseph Lenné, the park blends natural woodland with carefully planned vistas, water features, and sculptures." },
    { type: 'paragraph', content: "Visitors can follow meandering paths to discover ancient trees, a charming pump house, and the impressive castle gate. The park is open year-round and offers a different character each season, from lush summer greens to stark winter beauty." },
    { type: 'paragraph', content: "It's an ideal destination for a peaceful walk and reflection." },
    { type: 'paragraph', content: "For visitor information, please see the official Wiesenburg/Mark tourism page: https://www.wiesenburgmark.de/verzeichnis/objekt.php?mandat=13645" }
  ],
  tags: ['wiesenburg', 'park', 'nature', 'walking', 'gardens'],
};

export default article;