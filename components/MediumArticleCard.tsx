import React from 'react';
import { Article } from '../types';
import { calculateReadTime, isArticleSafe } from '../utils/helpers';
import { useGeneratedPlaceholder } from '../hooks/useGeneratedPlaceholder';
import { articleCategoryStyleMap } from '../constants';
import BookmarkButton from './BookmarkButton';

interface MediumArticleCardProps {
  article: Article;
  onClick: () => void;
}

export default function MediumArticleCard({ article, onClick }: MediumArticleCardProps) {
  if (!isArticleSafe(article)) {
    return null;
  }

  const readTime = calculateReadTime(article.body);
  const categoryStyles = articleCategoryStyleMap[article.category] || articleCategoryStyleMap['default'];

  const hasHero = article.hero && article.hero.length > 0 && article.hero[0];
  const { generatedUrl, isLoading } = useGeneratedPlaceholder(article, !hasHero);
  const heroUrl = hasHero ? article.hero[0] : generatedUrl;
  
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
      className="group cursor-pointer flex flex-col md:flex-row gap-4 h-full rounded-lg overflow-hidden bg-white dark:bg-slate-800 shadow-md hover:shadow-xl dark:shadow-none dark:hover:shadow-lg dark:hover:shadow-poppy/10 transition-all duration-300 ease-in-out border border-slate-200 dark:border-slate-700 dark:hover:bg-slate-700 relative"
    >
      <div className="absolute top-2 right-2 z-10 bg-white/70 dark:bg-slate-700/70 backdrop-blur-sm rounded-full">
        <BookmarkButton articleId={article.id} />
      </div>
      <div className="w-full md:w-1/3 shrink-0 aspect-[16/9] md:aspect-square overflow-hidden">
        {isLoading && <div className="w-full h-full bg-slate-200 dark:bg-slate-700 animate-pulse" />}
        {!isLoading && heroUrl && (
          <img
            src={heroUrl}
            alt={article.title}
            loading="lazy"
            className="w-full h-full object-cover transition-transform duration-500 ease-in-out group-hover:scale-105"
          />
        )}
      </div>
      <div className="p-5 pt-0 md:pt-5 flex flex-col flex-grow">
        <span className={`inline-block px-2 py-1 text-xs font-bold uppercase rounded-full ${categoryStyles.bg} ${categoryStyles.text} self-start`}>
          {article.category}
        </span>
        <h3 className="text-lg font-serif font-bold mt-2 text-charcoal dark:text-slate-200 group-hover:text-ocean dark:group-hover:text-cyan-300 transition-colors flex-grow group-hover:underline decoration-ocean dark:decoration-cyan-400 select-none">{article.title}</h3>
        <p className="text-sm text-slate-600 dark:text-slate-300 mt-2 line-clamp-2 select-none">{article.excerpt}</p>
        <p className="font-mono text-xs text-slate-600 dark:text-slate-300 mt-auto pt-2 select-none">{readTime} min read</p>
      </div>
    </a>
  );
}
