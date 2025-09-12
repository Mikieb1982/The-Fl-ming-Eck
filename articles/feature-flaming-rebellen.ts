import { Article } from '../types';

const article: Article = {
  id: "feature-flaming-rebellen",
  title: "Fläming Rebels: Sustainable Design with a Local Soul",
  author: "Business Desk",
  date: "2025-09-04",
  category: "Community",
  excerpt: "A local workshop in Kuhlowitz is giving old materials new life, blending traditional craftsmanship with modern design to create unique furniture and objects with a strong regional identity.",
  hero: ["https://i.imgur.com/qcvW6DO.jpeg"],
  pullQuote: "We're rebelling against the throwaway culture by showing the beauty and value in what's already here.",
  body: [
    { type: 'paragraph', content: "In a quiet workshop in Kuhlowitz, a small revolution is taking place. Under the banner of 'Flämingrebellen' (Fläming Rebels), a local cooperative is turning discarded materials into high-quality furniture and design objects. This initiative is more than just upcycling; it's a statement about sustainability, regional identity, and the power of community." },
    { type: 'paragraph', content: "Founded by a collective of artisans and designers, the project aims to combat mass production and resource waste. 'We're rebelling against the throwaway culture by showing the beauty and value in what's already here,' explains one of the founders. The workshop sources its materials—from old barn wood to discarded industrial metal—entirely from within the Hoher Fläming region." },
    { type: 'subheading', content: "Socially Minded, Locally Focused" },
    { type: 'paragraph', content: "The project is also a social enterprise, providing training and employment opportunities for people in the area. By combining traditional craftsmanship with modern design principles, Flämingrebellen creates products that are not only sustainable but also tell a story about their origin. Each piece carries the history of its materials, transformed into something new and functional." },
    { type: 'paragraph', content: "Their product line includes everything from rustic-modern tables to unique lighting fixtures, all characterized by clean lines and respect for the original material's character. The workshop is open to the public on weekends, offering a chance to see the artisans at work and purchase one-of-a-kind pieces that embody the spirit of the Fläming." }
  ],
  tags: ['business', 'sustainability', 'design', 'upcycling', 'community', 'kuhlowitz'],
};

export default article;