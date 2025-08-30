
import React from 'react';
import { motion } from 'framer-motion';
import { Article } from '../types';

interface HeadlineCardProps {
  article: Article;
  onClick: () => void;
  isActive?: boolean;
}

export default function HeadlineCard({ article, onClick, isActive = false }: HeadlineCardProps) {
  const activeClasses = isActive 
    ? 'bg-light-grey dark:bg-slate-800 border-brand-green dark:border-green-600'
    : 'border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800/50 hover:border-slate-300 dark:hover:border-slate-600';

  const activeTextClasses = isActive
    ? 'text-brand-green dark:text-green-300'
    : 'text-charcoal dark:text-slate-200 group-hover:text-brand-green dark:group-hover:text-green-300';

  return (
    <motion.div
      onClick={isActive ? undefined : onClick}
      className={`group ${isActive ? '' : 'cursor-pointer'} p-4 border rounded-lg transition-colors ${activeClasses}`}
      whileHover={isActive ? {} : { x: 3 }}
      transition={{ type: 'spring', stiffness: 400, damping: 15 }}
    >
        <p className="font-mono text-xs uppercase tracking-wider font-semibold text-brand-green dark:text-green-400">{article.category}</p>
        <h3 className={`text-lg font-serif font-bold mt-1 ${activeTextClasses} transition-colors`}>{article.title}</h3>
        {isActive && (
          <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 mt-2">Currently viewing</p>
        )}
    </motion.div>
  );
}