
import React from 'react';
import { Article } from '../types';

interface RelatedArticleItemProps {
  article: Article;
  onSelectArticle: (id: string) => void;
}

export default function RelatedArticleItem({ article, onSelectArticle }: RelatedArticleItemProps) {
  return (
    <div 
        onClick={() => onSelectArticle(article.id)} 
        className="group p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700/50 cursor-pointer transition-colors"
    >
      <p className="text-xs font-semibold text-brand-green dark:text-green-400 uppercase tracking-wide">{article.category}</p>
      <h5 className="text-sm font-bold text-charcoal dark:text-slate-200 group-hover:underline">{article.title}</h5>
    </div>
  );
}
