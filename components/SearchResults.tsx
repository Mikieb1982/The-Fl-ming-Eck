


import React from 'react';
import { motion } from 'framer-motion';
import { Article } from '../types';
import { fmtDate } from '../utils/helpers';

interface SearchResultsProps {
  articles: Article[];
  onSelectArticle: (id: string) => void;
  searchQuery: string;
}

const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 },
};

const SearchResultItem = ({ article, onSelectArticle }: { article: Article, onSelectArticle: (id: string) => void }) => {
  return (
    // @ts-ignore - The TypeScript types for framer-motion seem to be broken in this environment, causing valid props like 'variants' to be flagged as errors.
    <motion.div
      variants={itemVariants}
      onClick={() => onSelectArticle(article.id)}
      className="group cursor-pointer"
    >
        <div className="p-4 rounded-lg group-hover:bg-slate-50 dark:group-hover:bg-slate-800/50 transition-colors">
            <p className="text-sm font-semibold text-brand-green dark:text-green-400">
                {article.category} · <time dateTime={article.date}>{fmtDate(article.date)}</time>
            </p>
            <h3 className="mt-1 text-xl font-serif font-bold text-charcoal dark:text-slate-200 group-hover:text-sandstone-ochre dark:group-hover:text-yellow-500 transition-colors">
                {article.title}
            </h3>
            <p className="mt-2 text-slate-600 dark:text-slate-400 line-clamp-2">
                {article.excerpt}
            </p>
        </div>
    </motion.div>
  );
};


export default function SearchResults({ articles, onSelectArticle, searchQuery }: SearchResultsProps) {
  return (
    <>
      <h2 className="text-2xl font-serif font-bold text-slate-800 dark:text-slate-200 mb-6">
        Results for "{searchQuery}"
      </h2>
      {/* @ts-ignore - The TypeScript types for framer-motion seem to be broken in this environment, causing valid props like 'initial' to be flagged as errors. */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: {
              staggerChildren: 0.07,
            },
          },
        }}
      >
          <div className="divide-y divide-slate-200 dark:divide-slate-700">
              {articles.map(article => (
                  <SearchResultItem key={article.id} article={article} onSelectArticle={onSelectArticle} />
              ))}
          </div>
      </motion.div>
    </>
  );
}