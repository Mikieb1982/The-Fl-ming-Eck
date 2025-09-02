import { Article } from '../types';

const article: Article = {
  id: "news-road-closures-2025-08-20",
  title: "Road Closures for B 246 and Brücker Landstraße",
  author: "News Desk",
  date: "2025-08-20",
  category: "News",
  excerpt: "Maintenance work is causing closures and bus detours on two key roads in Bad Belzig. The B 246 and a section of Brücker Landstraße are affected.",
  hero: ["https://images.unsplash.com/photo-1574944985213-3a514e8a1435?q=80&w=2070"],
  pullQuote: "A section of Brücker Landstraße is also closed, rerouting bus lines 580 and 581.",
  body: [
    { type: 'paragraph', content: "Two key roads in Bad Belzig are undergoing maintenance, causing closures and bus detours. The B 246 road and bike path are being renovated between the city entrance and the B 102 intersection." },
    { type: 'paragraph', content: "A section of Brücker Landstraße is also closed, rerouting bus lines 580 and 581 and affecting stops at 'Brandenburger Str./SteinTherme' and 'Am Betriebshof'." },
    { type: 'paragraph', content: "For up-to-date information, please check the official announcements on the Bad Belzig town website: https://www.bad-belzig.de/buergerservice/aktuelles/" }
  ],
  tags: ["infrastructure", "transportation", "roadworks", "public-transit", "bad-belzig"],
};

export default article;
