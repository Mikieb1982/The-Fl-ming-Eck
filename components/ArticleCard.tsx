import React from 'react';
import { Article } from '../types';
import { calculateReadTime } from '../utils/helpers';

const categoryColorMap: { [key: string]: string } = {
  'Community': 'border-red-500 dark:border-red-400',
  'Events': 'border-purple-500 dark:border-purple-400',
  'History': 'border-yellow-600 dark:border-yellow-500',
  'City Guide': 'border-green-500 dark:border-green-400',
  'Guides': 'border-indigo-500 dark:border-indigo-400',
  'default': 'border-slate-300 dark:border-slate-600',
};

interface ArticleCardProps {
  article: Article;
  onClick: () => void;
}

export default function ArticleCard({ article, onClick }: ArticleCardProps) {
  const readTime = calculateReadTime(article.body.join(' '));
  const borderColor = categoryColorMap[article.category] || categoryColorMap['default'];

  return (
    <div
      onClick={onClick}
      className={`group cursor-pointer flex flex-col h-full rounded-lg overflow-hidden bg-white dark:bg-slate-800 shadow-md hover:shadow-xl transition-shadow duration-300 border-t-4 ${borderColor}`}
    >
      <div className="shrink-0 overflow-hidden">
        <div
          className="w-full h-full aspect-[16/9] bg-cover bg-center transition-transform duration-500 ease-in-out group-hover:scale-105"
          style={{ backgroundImage: `url(${article.hero})` }}
        />
      </div>
      <div className="flex-grow p-4 flex flex-col">
        <p className="text-xs uppercase tracking-wider font-semibold text-blue-700 dark:text-blue-400">{article.category} · {readTime} min read</p>
        <h3 className="text-lg sm:text-xl font-serif font-bold mt-1 text-slate-800 dark:text-slate-200 group-hover:text-blue-800 dark:group-hover:text-blue-300 transition-colors flex-grow">{article.title}</h3>
        <p className="text-sm text-slate-600 dark:text-slate-400 mt-2 line-clamp-3">{article.excerpt}</p>
      </div>
    </div>
  );
}