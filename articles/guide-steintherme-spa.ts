import { Article } from '../types';

const article: Article = {
  id: "guide-steintherme-spa",
  title: "A Wellness Guide to the SteinTherme Spa",
  author: "Wellness Desk",
  date: "2025-08-26",
  category: "Guides",
  excerpt: "Unwind and recharge at Bad Belzig's famous SteinTherme, a modern spa that combines the healing power of thermal saltwater with a world-class sauna experience.",
  hero: ["https://i.imgur.com/NbOUbrr.jpeg"],
  pullQuote: "The feeling of floating in the warm, buoyant saltwater under the open sky is pure bliss.",
  body: [
    { type: 'paragraph', content: "For those seeking relaxation and rejuvenation, the SteinTherme in Bad Belzig is a must-visit destination. This modern thermal spa is renowned for its unique 'BadeWelt' (Bathing World) and 'SaunaWelt' (Sauna World), offering a comprehensive wellness experience that draws visitors from across the region." },
    { type: 'subheading', content: "The Healing Waters" },
    { type: 'paragraph', content: "The heart of the SteinTherme is its thermal saltwater, sourced from a depth of 775 meters. Rich in minerals, the water is known for its therapeutic properties, helping to soothe muscles, ease joint pain, and promote overall relaxation. The BadeWelt features several indoor and outdoor pools with varying temperatures and salt concentrations. The feeling of floating in the warm, buoyant saltwater under the open sky, especially on a cool evening, is pure bliss." },
    { type: 'video', youtubeId: 'mP36_V-s_fo', caption: 'A short promotional video showcasing the atmosphere of the SteinTherme.' },
    { type: 'subheading', content: "A World of Saunas" },
    { type: 'paragraph', content: "The SaunaWelt is equally impressive, offering a diverse range of saunas and steam rooms to suit every preference. From the traditional Finnish sauna to the gentle Bio-sauna and the aromatic steam bath, there are plenty of ways to sweat out the stress of daily life. A highlight is the regular 'Aufguss' ceremonies, where a sauna master uses essential oils and theatrical towel work to create an intense and invigorating heat experience." },
    { type: 'audio', src: 'https://storage.googleapis.com/aai-web-samples/interview-snippet.mp3', caption: 'Audio: A brief clip from an interview with the spa manager about the benefits of sauna.' },
    { type: 'subheading', content: "Planning Your Visit" },
    { type: 'paragraph', content: "The SteinTherme is open daily, with extended hours for special events like the 'Mondscheinsauna' (Moonlight Sauna). It's advisable to check their website for the latest opening times and event schedules. You can purchase tickets for just the BadeWelt or a combined ticket that includes the SaunaWelt. Don't forget to pack a towel, bathrobe, and flip-flops, although these can also be rented on-site. Whether you have a few hours or a whole day, a visit to the SteinTherme is a perfect way to invest in your well-being." },
    { type: 'paragraph', content: "For the latest opening times, ticket prices, and event schedules, visit the official SteinTherme website: https://www.steintherme.de/" }
  ],
  tags: ['spa', 'wellness', 'bad-belzig', 'guides', 'relaxation'],
};

export default article;