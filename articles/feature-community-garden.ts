import { Article } from '../types';

const article: Article = {
  id: "feature-community-garden",
  title: "New Community Garden Takes Root in Bad Belzig",
  author: "Community Desk",
  date: "2025-09-02",
  category: "Community",
  excerpt: "A new project for shared gardening and neighborhood exchange is blossoming near the Waldkita in Bad Belzig, offering residents a chance to connect with nature and each other.",
  hero: ["https://i.imgur.com/WFpmGMq.png"],
  pullQuote: "The goal is to create not just a garden, but a meeting place for all generations.",
  body: [
    { type: 'paragraph', content: "A new community project, the 'GemeinschaftsAcker Bad Belzig,' has officially launched, transforming a fallow plot of land into a vibrant space for gardening, learning, and social exchange. Located on Rosa-Luxemburg-Straße, directly next to the Waldkita, the project is a cooperation between several local associations and is open to all residents." },
    { type: 'paragraph', content: "After an initial planning meeting in June, the first planting actions have already taken place. Raised beds have been built and filled with a variety of young plants, including tomatoes, zucchini, and herbs. The project aims to make the origin of food tangible for children and adults alike." },
    { type: 'subheading', content: "More Than Just Gardening" },
    { type: 'paragraph', content: "The project's goals go beyond simply growing vegetables. 'The goal is to create not just a garden, but a meeting place for all generations,' says one of the organizers. It's envisioned as a space for shared learning, working, and harvesting, strengthening neighborhood bonds and promoting environmental awareness." },
    { type: 'paragraph', content: "The Community Garden is freely accessible for anyone interested in stopping by. Regular open gardening times and workshops will be announced via a notice board on-site. All residents are warmly invited to participate and help shape this new green space in the heart of the community." }
  ],
  tags: ['community', 'gardening', 'sustainability', 'bad-belzig', 'volunteering'],
};

export default article;