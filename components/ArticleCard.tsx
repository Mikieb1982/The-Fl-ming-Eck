


import React from 'react';
import { Article } from '../types';
import { calculateReadTime, isArticleSafe } from '../utils/helpers';
import { useGeneratedPlaceholder } from '../hooks/useGeneratedPlaceholder';
import BookmarkButton from './BookmarkButton';
import { categoryStyleMap } from '../constants';

interface ArticleCardProps {
  article: Article;
  onClick: () => void;
}

export default function ArticleCard({ article, onClick }: ArticleCardProps) {
  // Add a guard to prevent rendering if the article object is incomplete or invalid.
  // This makes the component more resilient to potential data issues upstream.
  if (!isArticleSafe(article)) {
    // Render null to avoid crashing the entire application if a malformed 
    // article object is passed in from a list.
    return null; 
  }

  const readTime = calculateReadTime(article.body);
  const categoryStyles = categoryStyleMap[article.category] || categoryStyleMap['default'];

  const hasHero = article.hero && article.hero.length > 0 && article.hero[0];
  const { generatedUrl, isLoading } = useGeneratedPlaceholder(article, !hasHero);
  const heroUrl = hasHero ? article.hero[0] : generatedUrl;

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    // Allow standard browser behavior for new tabs (middle-click, ctrl/cmd-click)
    if (e.metaKey || e.ctrlKey || e.button === 1) {
      return;
    }
    e.preventDefault(); // Prevent full page reload
    onClick(); // Trigger the SPA navigation
  };

  return (
    <a
      href={`/#/article/${article.id}`}
      onClick={handleClick}
      className="group cursor-pointer flex flex-col h-full rounded-lg overflow-hidden bg-white dark:bg-zinc-900 shadow-md hover:shadow-xl dark:shadow-none dark:hover:shadow-2xl dark:hover:shadow-poppy/10 transition-all duration-300 ease-in-out group-hover:-translate-y-1 border border-slate-200 dark:border-slate-700 relative"
    >
      <div className="absolute top-2 right-2 z-10 bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm rounded-full">
        <BookmarkButton articleId={article.id} />
      </div>
      <div className="shrink-0 overflow-hidden">
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
      <div className="flex-grow p-5 flex flex-col">
        <span className={`inline-block px-2 py-1 text-xs font-bold uppercase rounded-full ${categoryStyles.bg} ${categoryStyles.text} self-start`}>
            {article.category}
        </span>
        <h3 className="text-lg sm:text-xl font-serif font-bold mt-2 text-charcoal dark:text-slate-200 group-hover:text-ocean dark:group-hover:text-cyan-300 transition-colors flex-grow group-hover:underline decoration-ocean dark:decoration-cyan-400 select-none">{article.title}</h3>
        <p className="text-sm text-slate-600 dark:text-slate-400 mt-2 line-clamp-3 select-none">{article.excerpt}</p>
        
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
            <p className="font-mono text-xs text-slate-500 dark:text-slate-400 select-none">{readTime} min read</p>
        </div>
      </div>
    </a>
  );
}