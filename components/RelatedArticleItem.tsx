


import React from 'react';
import { Article } from '../types';

interface RelatedArticleItemProps {
  article: Article;
  onSelectArticle: (id: string) => void;
}

export default function RelatedArticleItem({ article, onSelectArticle }: RelatedArticleItemProps) {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    // Allow standard browser behavior for new tabs (middle-click, ctrl/cmd-click)
    if (e.metaKey || e.ctrlKey || e.button === 1) {
      return;
    }
    e.preventDefault(); // Prevent full page reload
    onSelectArticle(article.id); // Trigger SPA navigation
  };

  return (
    <a 
        href={`/#/article/${article.id}`}
        onClick={handleClick} 
        className="group block p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700/50 cursor-pointer transition-colors"
    >
      <p className="text-xs font-semibold text-ocean dark:text-cyan-400 uppercase tracking-wide select-none">{article.category}</p>
      <h5 className="text-sm font-bold text-charcoal dark:text-slate-200 group-hover:underline select-none">{article.title}</h5>
    </a>
  );
}