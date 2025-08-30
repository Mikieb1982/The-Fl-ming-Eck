
import { Article } from '../types';

const article: Article = {
  id: "digital-day-in-flaming",
  title: "A Digital Day in the Fläming: An Interactive Journey",
  author: "Digital Desk",
  date: "2025-08-29", // Make it the newest article
  category: "Features",
  excerpt: "Experience a day in the Hoher Fläming through video, audio, and interactive polls. This is a digital-first story designed to showcase what our app can do.",
  hero: ["https://images.unsplash.com/photo-1542383927-4402675902b8?q=80&w=2070"], // A nice forest path image
  pullQuote: "More than just reading an article—it's about experiencing the story.",
  body: [
    { type: 'paragraph', content: "Welcome to a new kind of storytelling from The Fläming Eck. In this special feature, we invite you to experience a day in our beautiful region not just through words, but through sights and sounds. This interactive article is designed to be explored. Let's begin our journey." },
    { type: 'subheading', content: "Morning: A Walk in Wiesenburg Park" },
    { type: 'paragraph', content: "Imagine the crisp morning air as you stroll through the magnificent landscape of Wiesenburg Castle Park. The sun filters through the ancient trees, and the only sound is the crunch of leaves underfoot. To give you a real sense of the scale and beauty, we've included this stunning aerial footage." },
    { type: 'video', youtubeId: 'zK6V0s6mJqg', caption: 'Aerial view of a forest in the Fläming region.' },
    { type: 'subheading', content: "Afternoon: Voices of Bad Belzig" },
    { type: 'paragraph', content: "The heart of any region is its people. We're starting a new series of audio interviews to bring you the stories of local personalities—artists, business owners, and longtime residents. Here's a short clip from our conversation with a spa manager about the importance of wellness in a place like Bad Belzig." },
    { type: 'audio', src: 'https://storage.googleapis.com/aai-web-samples/interview-snippet.mp3', caption: 'Audio: A spa manager discusses the benefits of sauna.' },
    { type: 'subheading', content: "Evening: Your Voice Matters" },
    { type: 'paragraph', content: "As we develop more digital-first content like this, we want to hear from you. Your feedback will shape the future of The Fläming Eck magazine. Please take a moment to vote in our poll below and let us know what you'd like to see more of." },
    {
      type: 'poll',
      question: "What kind of digital content should we create next?",
      options: [
        { text: "More Video Documentaries", votes: 45 },
        { text: "Interactive Maps & Guides", votes: 82 },
        { text: "Audio Interviews (Podcasts)", votes: 61 },
        { text: "Immersive Photo Galleries", votes: 33 },
      ]
    },
    { type: 'paragraph', content: "Thank you for joining us on this digital journey. We're excited to bring you more innovative stories from the heart of the Fläming." }
  ],
  tags: ['digital', 'interactive', 'video', 'audio', 'poll', 'features'],
};

export default article;
