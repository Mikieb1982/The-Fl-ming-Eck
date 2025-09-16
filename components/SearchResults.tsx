import React from 'react';
import { motion } from 'framer-motion';
import { Article } from '../types';
import { fmtDate, isArticleSafe } from '../utils/helpers';
import { articleCategoryStyleMap } from '../constants';

interface SearchResultsProps {
  articles: Article[];
  onSelectArticle: (id: string) => void;
  searchQuery: string;
}

// FIX: Type error with framer-motion props. Casting motion component to `any` to bypass type checking issues.
const MotionDiv = motion.div as any;

const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 },
};

const SearchResultItem = ({ article, onSelectArticle }: { article: Article, onSelectArticle: (id: string) => void }) => {
  if (!isArticleSafe(article)) {
    return null;
  }
  const categoryStyles = articleCategoryStyleMap[article.category] || articleCategoryStyleMap['default'];
  
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    // Allow standard browser behavior for new tabs (middle-click, ctrl/cmd-click)
    if (e.metaKey || e.ctrlKey || e.button === 1) {
      return;
    }
    e.preventDefault(); // Prevent full page reload
    onSelectArticle(article.id); // Trigger SPA navigation
  };

  return (
    <MotionDiv variants={itemVariants}>
        <a
            href={`/#/article/${article.id}`}
            onClick={handleClick}
            className="group cursor-pointer block p-4 rounded-lg group-hover:bg-slate-50 dark:group-hover:bg-zinc-900/50 transition-colors"
        >
            <div className="flex items-center gap-2">
                <span className={`inline-block px-2 py-1 text-xs font-bold uppercase rounded-full ${categoryStyles.bg} ${categoryStyles.text} self-start`}>
                    {article.category}
                </span>
                <time dateTime={article.date} className="text-sm text-slate-500 dark:text-slate-300">{fmtDate(article.date)}</time>
            </div>
            <h3 className="mt-2 text-xl font-serif font-bold text-charcoal dark:text-slate-200 group-hover:text-sandstone-ochre dark:group-hover:text-yellow-500 transition-colors select-none">
                {article.title}
            </h3>
            <p className="mt-2 text-slate-600 dark:text-slate-300 line-clamp-2 select-none">
                {article.excerpt}
            </p>
        </a>
    </MotionDiv>
  );
};


export default function SearchResults({ articles, onSelectArticle, searchQuery }: SearchResultsProps) {
  return (
    <>
      <h2 className="text-2xl font-serif font-bold text-slate-800 dark:text-slate-200 mb-6">
        Results for "{searchQuery}"
      </h2>
      <MotionDiv
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
      </MotionDiv>
    </>
  );
}
