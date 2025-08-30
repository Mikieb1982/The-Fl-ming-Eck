
import React from 'react';
import { Article } from '../types';
import { calculateReadTime } from '../utils/helpers';
import { useGeneratedPlaceholder } from '../hooks/useGeneratedPlaceholder';

const categoryTextColorMap: { [key: string]: string } = {
  'Community': 'text-warm-terracotta dark:text-yellow-600',
  'Events': 'text-blue-600 dark:text-blue-400',
  'History': 'text-sandstone-ochre dark:text-yellow-500',
  'City Guide': 'text-brand-green dark:text-green-400',
  'Guides': 'text-teal-600 dark:text-teal-400',
  'default': 'text-slate-600 dark:text-slate-400',
};

interface ArticleCardProps {
  article: Article;
  onClick: () => void;
}

export default function ArticleCard({ article, onClick }: ArticleCardProps) {
  const readTime = calculateReadTime(article.body);
  const textColor = categoryTextColorMap[article.category] || categoryTextColorMap['default'];

  const hasHero = article.hero && article.hero.length > 0 && article.hero[0];
  const { generatedUrl, isLoading } = useGeneratedPlaceholder(article, !hasHero);
  const heroUrl = hasHero ? article.hero[0] : generatedUrl;

  return (
    <div
      onClick={onClick}
      className="group cursor-pointer flex flex-col h-full rounded-lg overflow-hidden bg-white dark:bg-slate-800 shadow-sm hover:shadow-xl transition-shadow duration-300 border border-slate-200 dark:border-slate-700"
    >
      <div className="shrink-0">
        {isLoading && <div className="w-full aspect-[16/9] bg-slate-200 dark:bg-slate-700 animate-pulse" />}
        {!isLoading && heroUrl && (
          <img
            src={heroUrl}
            alt={article.title}
            loading="lazy"
            className="w-full aspect-[16/9] object-cover transition-transform duration-500 ease-in-out group-hover:scale-105"
          />
        )}
      </div>
      <div className="flex-grow p-4 flex flex-col">
        <p className={`text-sm font-bold uppercase ${textColor}`}>{article.category}</p>
        <h3 className="text-lg sm:text-xl font-serif font-bold mt-1 text-charcoal dark:text-slate-200 group-hover:text-brand-green dark:group-hover:text-green-300 transition-colors flex-grow group-hover:underline">{article.title}</h3>
        <p className="text-sm text-slate-600 dark:text-slate-400 mt-2 line-clamp-3">{article.excerpt}</p>
        
        <div className="mt-auto pt-2">
            {article.tags && article.tags.length > 0 && (
                <div className="flex flex-wrap gap-1 mb-2">
                    {article.tags.slice(0, 3).map(tag => (
                        <span key={tag} className="text-xs bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 px-2 py-0.5 rounded-full">
                            #{tag}
                        </span>
                    ))}
                </div>
            )}
            <p className="font-mono text-xs text-slate-500 dark:text-slate-400">{readTime} min read</p>
        </div>
      </div>
    </div>
  );
}