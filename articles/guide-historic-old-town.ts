
import { Article } from '../types';

const article: Article = {
  id: "guide-historic-old-town",
  title: "Historic Old Town of Bad Belzig",
  author: "City Desk",
  date: "2025-08-27",
  category: "City Guide",
  excerpt: "Timber-framed lanes, a market square, and landmarks around Burg Eisenhardt.",
  hero: ["https://images.unsplash.com/photo-1541635532818-644d93f7da83?q=80&w=2070"],
  pullQuote: "An old town shaped by trade routes, brickwork, and careful restoration.",
  body: [
    { type: 'paragraph', content: "Bad Belzig’s historic core formed as a market settlement north of Burg Eisenhardt in the early 13th century and gained town rights in the 14th century. Today the compact center shows irregular medieval street lines that frame the market square." },
    { type: 'paragraph', content: "Highlights include St. Mary’s Town Church, where Martin Luther preached in 1530, the timber-framed Reissiger House linked to composer Carl Gottlieb Reissiger, and the town hall ensemble. Guided tours such as ‘Houses Tell History’ bring details to life." },
    { type: 'paragraph', content: "Start your walk at the market and circle the lanes toward the castle." },
    { type: 'paragraph', content: "For more information on guided tours and local sights, visit the official Bad Belzig tourism website: https://www.bad-belzig.de/tourismus/" }
  ],
  tags: ['bad-belzig', 'history', 'city-guide', 'walking', 'architecture'],
};

export default article;
