
import { Post } from '../types';

export const initialPosts: Post[] = [
  {
    id: 'post-0',
    author: 'The Fläming Eck Team',
    title: 'Welcome to the Community Forum!',
    content: "Welcome! This is a space to share tips, ask questions, and connect with other English-speakers in the Hoher Fläming region.\n\nTo get started, why not introduce yourself or ask a question about local life? All posts are moderated to keep the space friendly and respectful. Enjoy the conversation!",
    timestamp: '2025-08-20T09:00:00Z',
    replies: [],
    category: 'Announcements',
    pinned: true,
    tags: ['welcome'],
  },
  {
    id: 'post-1',
    author: 'Elena',
    title: 'Favorite spots in Wiesenburg Castle Park?',
    content: "Just visited the Wiesenburg Castle Park for the first time and it's absolutely beautiful! I loved the path by the water. Does anyone have a favorite hidden bench or a particularly lovely view I should look for next time?",
    timestamp: '2025-08-26T10:00:00Z',
    replies: [
      {
        id: 'reply-1-1',
        author: 'Mark',
        content: "There's a great spot near the old pump house, a bit off the main path. It's very quiet and has a perfect view of the castle.",
        timestamp: '2025-08-26T12:30:00Z',
      },
    ],
    category: 'Nature',
    tags: ['wiesenburg', 'park', 'nature', 'walking'],
  },
  {
    id: 'post-2',
    author: 'David',
    title: 'Altstadtsommer - Best food stall?',
    content: "Getting excited for the Altstadtsommer! Last year I had some amazing Bratwurst, but I'm wondering if there are any other must-try food stalls I should check out this year. Any recommendations?",
    timestamp: '2025-08-25T15:20:00Z',
    replies: [],
    category: 'Food',
    tags: ['altstadtsommer', 'food', 'festival'],
  },
];
