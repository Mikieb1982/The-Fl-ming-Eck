import React from 'react';
import { Article } from '../../types';
import { isArticleSafe } from '../../utils/helpers';

interface ArticleHeroProps {
    article: Article;
}

const getHeroUrl = (article: Article): string => {
    if (article?.hero?.[0]) {
        return article.hero[0];
    }
    return `https://picsum.photos/seed/${encodeURIComponent(article.id)}/1600/900`;
};

export default function ArticleHero({ article }: ArticleHeroProps) {
    if (!isArticleSafe(article)) return null;

    const heroUrl = getHeroUrl(article);

    return (
        <div className="relative w-full h-full overflow-hidden">
            <img 
                src={heroUrl}
                alt={article.title}
                className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent" />
            <div className="relative z-10 flex flex-col justify-end h-full p-8 md:p-12 text-white">
                <span className={`inline-block px-4 py-2 text-base font-bold uppercase rounded-full bg-poppy text-white self-start drop-shadow-md`}>
                    {article.category}
                </span>
                <h1 className="text-5xl sm:text-7xl lg:text-8xl font-black font-serif mt-6 tracking-tighter leading-tight drop-shadow-lg">
                    {article.title}
                </h1>
                <p className="mt-6 text-xl md:text-2xl text-slate-200 max-w-3xl drop-shadow-md">
                    {article.excerpt}
                </p>
            </div>
        </div>
    );
}