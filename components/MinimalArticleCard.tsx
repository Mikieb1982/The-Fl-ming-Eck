import React from 'react';
import { Article } from '../types';
import { isArticleSafe, fmtDate } from '../utils/helpers';
import { articleCategoryStyleMap } from '../constants';

interface MinimalArticleCardProps {
  article: Article;
  onClick: () => void;
}

export default function MinimalArticleCard({ article, onClick }: MinimalArticleCardProps) {
  if (!isArticleSafe(article)) {
    return null;
  }
  
  const categoryStyles = articleCategoryStyleMap[article.category] || articleCategoryStyleMap['default'];

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (e.metaKey || e.ctrlKey || e.button === 1) {
      return;
    }
    e.preventDefault();
    onClick();
  };

  return (
    <a 
      href={`/#/article/${article.id}`}
      onClick={handleClick}
      className="group cursor-pointer block py-3 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors -mx-3 px-3"
    >
      <div className="flex items-center gap-2">
        <span className={`inline-block px-2 py-0.5 text-[10px] font-bold uppercase rounded-full ${categoryStyles.bg} ${categoryStyles.text} self-start`}>
            {article.category}
        </span>
        <time dateTime={article.date} className="text-xs text-slate-500 dark:text-slate-400">{fmtDate(article.date)}</time>
      </div>
      <h4 className="mt-1 font-serif font-bold text-slate-800 dark:text-slate-200 group-hover:text-brand-primary dark:group-hover:text-brand-primary transition-colors">{article.title}</h4>
    </a>
  );
}