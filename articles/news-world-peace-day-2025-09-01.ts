import { Article } from '../types';

const article: Article = {
  id: "news-world-peace-day-2025-09-01",
  title: "Memorial Walk Held for World Peace Day",
  author: "News Desk",
  date: "2025-09-01",
  category: "News",
  excerpt: "A memorial walk took place in Bad Belzig to mark World Peace Day, commemorating the victims of war and remembering local history.",
  hero: ["https://images.unsplash.com/photo-1516629512349-b072b251a3a4?q=80&w=2070"],
  body: [
    { type: 'paragraph', content: "A memorial walk took place in Bad Belzig today to mark World Peace Day. The event is held annually on September 1st to commemorate the victims of war." },
    { type: 'paragraph', content: "Participants walked from the town's market square to the memorial stone for the former Roederhof subcamp. This site was a satellite camp of the Ravensbrück concentration camp." },
    { type: 'paragraph', content: "The walk serves as a public remembrance of local history and a call for peace." }
  ],
  tags: ["world-peace-day", "memorial", "local-history", "bad-belzig", "roederhof"],
};

export default article;
