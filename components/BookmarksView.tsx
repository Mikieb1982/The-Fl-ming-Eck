
import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { Article } from '../types';
import { useBookmarks } from '../context/BookmarkContext';
import ArticleCard from './ArticleCard';

interface BookmarksViewProps {
  articles: Article[];
  onSelectArticle: (id: string) => void;
  onClose: () => void;
}

export default function BookmarksView({ articles, onSelectArticle, onClose }: BookmarksViewProps) {
  const { bookmarks } = useBookmarks();

  const bookmarkedArticles = useMemo(() => {
    const bookmarkedSet = new Set(bookmarks);
    return articles.filter(article => bookmarkedSet.has(article.id));
  }, [articles, bookmarks]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
    >
      <div className="flex justify-between items-center mb-6 border-b-2 border-slate-200 dark:border-slate-700 pb-2">
        <h2 className="text-3xl font-serif font-bold text-charcoal dark:text-green-300">Your Bookmarks</h2>
        <button 
            onClick={onClose}
            className="shrink-0 ml-4 px-4 py-2 text-sm font-semibold text-charcoal dark:text-slate-300 bg-slate-100 dark:bg-slate-800 rounded-lg hover:bg-light-grey dark:hover:bg-slate-700 transition-colors"
        >
            &larr; Back to Magazine
        </button>
      </div>

      {bookmarkedArticles.length > 0 ? (
        <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            initial="hidden"
            animate="visible"
            variants={{
                hidden: { opacity: 0 },
                visible: {
                    opacity: 1,
                    transition: { staggerChildren: 0.1 }
                }
            }}
        >
          {bookmarkedArticles.map(article => (
            <motion.div key={article.id} variants={{ hidden: { y: 20, opacity: 0 }, visible: { y: 0, opacity: 1 } }}>
                <ArticleCard article={article} onClick={() => onSelectArticle(article.id)} />
            </motion.div>
          ))}
        </motion.div>
      ) : (
        <div className="text-center py-20 bg-white dark:bg-slate-800 rounded-lg shadow-sm">
          <p className="text-slate-600 dark:text-slate-400">You haven't bookmarked any articles yet.</p>
          <p className="text-sm text-slate-500 dark:text-slate-500 mt-2">Click the bookmark icon on any article to save it for later.</p>
        </div>
      )}
    </motion.div>
  );
}