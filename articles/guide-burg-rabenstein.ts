import { Article } from '../types';

const article: Article = {
  id: "guide-burg-rabenstein",
  title: "Burg Rabenstein: A Medieval Gem in the Hoher Fläming",
  author: "History Desk",
  date: "2025-09-05",
  category: "Guides",
  excerpt: "Perched high above the forest near Raben, Burg Rabenstein offers a journey back to the Middle Ages with its well-preserved walls, impressive falconry displays, and rustic charm.",
  hero: ["https://i.imgur.com/H4W4g5z.jpeg"],
  pullQuote: "The highlight for many is the historical falconry show, where birds of prey demonstrate their incredible skill against the backdrop of the ancient castle.",
  body: [
    { type: 'paragraph', content: "As one of the four great castles of the Hoher Fläming, Burg Rabenstein is a must-see for anyone interested in medieval history and nature. Located near the village of Raben, this 13th-century fortress is remarkably well-preserved and offers visitors a genuine glimpse into the past. It serves as a key stop on the 'Burgenwanderweg' (Castle Hiking Trail)." },
    { type: 'subheading', content: "Falconry and Feasts" },
    { type: 'paragraph', content: "The highlight for many visitors is the historical falconry show hosted by the castle's own falconry. Here, eagles, falcons, and owls demonstrate their incredible skill against the backdrop of the ancient walls. It's a thrilling spectacle for all ages." },
    { type: 'paragraph', content: "After exploring the castle grounds, which include a keep, chapel, and knight's hall, visitors can enjoy a meal at the 'Burgschänke' (castle tavern). The tavern serves hearty, traditional German fare in a rustic atmosphere, making it the perfect end to a historical excursion." },
    { type: 'subheading', content: "Planning Your Visit" },
    { type: 'paragraph', content: "Burg Rabenstein also functions as a hotel and event location. It is easily accessible via the Burgenlinie 572 bus from the Bad Belzig train station. The castle is open to day visitors year-round, but it's best to check their official website for the exact opening times of the falconry and tavern, as these can vary seasonally." },
    { type: 'paragraph', content: "For more information, visit the official website: https://www.burgrabenstein.de/" }
  ],
  tags: ['raben', 'castle', 'history', 'guides', 'family-friendly', 'falconry'],
};

export default article;