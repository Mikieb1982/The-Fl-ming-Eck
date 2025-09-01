import { Article } from '../types';

const article: Article = {
  id: "news-trabant-accident-2025-08-30",
  title: "Two Injured in Trabant Accident on B102",
  author: "News Desk",
  date: "2025-08-30",
  category: "News",
  excerpt: "A serious accident occurred on Saturday on the B102 federal road near Bad Belzig, between the districts of Schwanebeck and Lütte.",
  hero: ["https://images.unsplash.com/photo-1620593128893-614742338318?q=80&w=2070"],
  pullQuote: "One person was seriously injured and had to be airlifted to a hospital by a rescue helicopter.",
  body: [
    { type: 'paragraph', content: "A serious accident occurred on Saturday on the B102 federal road near Bad Belzig. The incident took place between the districts of Schwanebeck and Lütte." },
    { type: 'paragraph', content: "A Trabant car with two occupants left the road, resulting in two injuries. One person was seriously injured and had to be airlifted to a hospital by a rescue helicopter." },
    { type: 'paragraph', content: "The road was temporarily closed to allow emergency services to manage the scene." }
  ],
  tags: ["traffic accident", "B102", "emergency services", "Schwanebeck"],
};

export default article;