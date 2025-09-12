import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Article } from '../types';
import { categoryStyleMap } from '../constants';
import WeatherWidget from './WeatherWidget';
import SupportCard from './SupportCard';
import ScheduleBand from './ScheduleBand';
import SupportButton from './SupportButton';

interface HomePageProps {
  featureArticles: Article[];
  newsArticles: Article[];
  onSelectArticle: (id: string) => void;
}

const getHeroUrl = (article: Article): string => {
    if (article?.hero?.[0]) {
        return article.hero[0];
    }
    // Fallback using the same logic as useGeneratedPlaceholder to ensure robustness
    return `https://picsum.photos/seed/${encodeURIComponent(article.id)}/1600/900`;
};


export default function HomePage({ featureArticles, newsArticles, onSelectArticle }: HomePageProps) {
    if (!featureArticles || featureArticles.length === 0) {
        return <div className="p-4 text-center text-slate-500">No articles available to display.</div>;
    }

    const heroRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: heroRef,
        offset: ["start start", "end start"]
    });
    const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
    
    const headlineArticle = featureArticles[0];
    const subFeatureLeft = featureArticles.length > 1 ? featureArticles[1] : null;
    const subFeatureRight = featureArticles.length > 2 ? featureArticles[2] : null;
    const sidebarArticles = newsArticles.slice(0, 5);

    const headlineCategoryStyles = headlineArticle && (categoryStyleMap[headlineArticle.category] || categoryStyleMap['default']);
    const subFeatureLeftStyles = subFeatureLeft && (categoryStyleMap[subFeatureLeft.category] || categoryStyleMap['default']);
    const subFeatureRightStyles = subFeatureRight && (categoryStyleMap[subFeatureRight.category] || categoryStyleMap['default']);

    const handleArticleClick = (e: React.MouseEvent<HTMLAnchorElement>, articleId: string) => {
        // Allow standard browser behavior for new tabs (middle-click, ctrl/cmd-click)
        if (e.metaKey || e.ctrlKey || e.button === 1) {
            return;
        }
        e.preventDefault(); // Prevent full page reload
        onSelectArticle(articleId); // Trigger SPA navigation
    };

    return (
        <div>
            
            {/* Mobile-only top bar */}
            <div className="mb-6 flex md:hidden justify-between items-center gap-4">
                <WeatherWidget />
                <SupportButton />
            </div>
            
            {/* Desktop-only weather widget */}
            <div className="mb-6 hidden md:flex justify-start">
                <WeatherWidget />
            </div>

            {headlineArticle && (
                <div className="mb-6">
                    <a 
                        ref={heroRef}
                        href={`/#/article/${headlineArticle.id}`}
                        onClick={(e) => handleArticleClick(e, headlineArticle.id)}
                        className="relative block cursor-pointer group rounded-lg shadow-md overflow-hidden" 
                    >
                        <div className="aspect-video max-h-[65vh]">
                            <motion.img 
                                src={getHeroUrl(headlineArticle)} 
                                alt={headlineArticle.title} 
                                className="w-full h-full object-cover scale-110" 
                                style={{ y, top: '-5%' }}
                            />
                        </div>
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent"></div>
                        <div className="absolute bottom-0 left-0 p-4 sm:p-8 z-10">
                            <span className={`inline-block px-3 py-1.5 text-sm font-bold uppercase rounded-full ${headlineCategoryStyles.bg} ${headlineCategoryStyles.text} drop-shadow-md`}>
                                {headlineArticle.category}
                            </span>
                            <h1 className="text-3xl sm:text-5xl lg:text-7xl font-serif font-bold mt-2 text-white leading-tight drop-shadow-lg group-hover:underline decoration-poppy select-none">{headlineArticle.title}</h1>
                        </div>
                    </a>
                </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-3 gap-x-8 gap-y-12">
                
                <div className="md:col-span-2">
                    {headlineArticle && (
                        <p className="font-sans text-charcoal dark:text-gray-300 leading-relaxed text-lg mb-8 border-b border-slate-200 dark:border-slate-700 pb-8">
                            {headlineArticle.excerpt}
                            <a 
                                href={`/#/article/${headlineArticle.id}`}
                                onClick={(e) => handleArticleClick(e, headlineArticle.id)}
                                className="text-sm font-semibold text-ocean hover:underline ml-2 whitespace-nowrap"
                            >
                                Read more &rarr;
                            </a>
                        </p>
                    )}
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-8">
                        {subFeatureLeft && subFeatureLeftStyles && (
                            <a href={`/#/article/${subFeatureLeft.id}`} onClick={(e) => handleArticleClick(e, subFeatureLeft.id)} className="cursor-pointer group block">
                                <img src={getHeroUrl(subFeatureLeft)} alt={subFeatureLeft.title} className="w-full h-auto object-cover mb-4 rounded-md shadow-sm"/>
                                <span className={`inline-block px-2 py-1 text-xs font-bold uppercase rounded-full ${subFeatureLeftStyles.bg} ${subFeatureLeftStyles.text} self-start`}>
                                    {subFeatureLeft.category}
                                </span>
                                <h3 className="font-bold font-serif text-2xl text-slate-800 dark:text-white group-hover:underline mt-2 select-none">{subFeatureLeft.title}</h3>
                                <p className="text-sm line-clamp-4 mt-2 text-slate-600 dark:text-slate-400 select-none">{subFeatureLeft.excerpt}</p>
                            </a>
                        )}

                        {subFeatureRight && subFeatureRightStyles && (
                            <a href={`/#/article/${subFeatureRight.id}`} onClick={(e) => handleArticleClick(e, subFeatureRight.id)} className="cursor-pointer group block">
                                 <img src={getHeroUrl(subFeatureRight)} alt={subFeatureRight.title} className="w-full h-auto object-cover mb-4 rounded-md shadow-sm"/>
                                 <span className={`inline-block px-2 py-1 text-xs font-bold uppercase rounded-full ${subFeatureRightStyles.bg} ${subFeatureRightStyles.text} self-start`}>
                                    {subFeatureRight.category}
                                </span>
                                <h3 className="font-bold font-serif text-2xl text-slate-800 dark:text-white group-hover:underline mt-2 select-none">{subFeatureRight.title}</h3>
                                <p className="text-sm line-clamp-4 mt-2 text-slate-600 dark:text-slate-400 select-none">{subFeatureRight.excerpt}</p>
                            </a>
                        )}
                    </div>
                </div>

                <div className="md:col-span-1">
                    <div className="hidden md:block">
                        <SupportCard />
                    </div>
                    {sidebarArticles.length > 0 && (
                        <div className="p-6 rounded-lg bg-ocean/5 dark:bg-ocean/10">
                            <h3 className="text-xl font-serif font-bold text-charcoal dark:text-slate-200 mb-6 border-b border-slate-200 dark:border-slate-700 pb-2">
                                Latest News
                            </h3>
                            <div className="space-y-8">
                                {sidebarArticles.map(article => {
                                    const categoryStyles = categoryStyleMap[article.category] || categoryStyleMap['default'];
                                    return (
                                        <a key={article.id} href={`/#/article/${article.id}`} onClick={(e) => handleArticleClick(e, article.id)} className="cursor-pointer group block">
                                            <span className={`inline-block px-2 py-1 text-xs font-bold uppercase rounded-full ${categoryStyles.bg} ${categoryStyles.text} self-start`}>
                                                {article.category}
                                            </span>
                                            <h2 className="font-serif text-xl font-bold text-slate-800 dark:text-white group-hover:underline mt-2 select-none">{article.title}</h2>
                                            {article.hero && article.hero.length > 0 && (
                                                <div className="flex gap-x-3 mt-2">
                                                    <p className="font-sans text-sm text-charcoal dark:text-gray-300 line-clamp-4 select-none">{article.excerpt}</p>
                                                </div>
                                            )}
                                        </a>
                                    )
                                })}
                            </div>
                        </div>
                    )}
                </div>
            </div>
            
            <ScheduleBand />

        </div>
    );
}