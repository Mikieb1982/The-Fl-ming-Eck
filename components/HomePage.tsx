
import React from 'react';
import { Article } from '../types';
import { categoryStyleMap } from '../constants';
import WeatherWidget from './WeatherWidget';

// FIX: Added the missing 'HomePageProps' interface.
interface HomePageProps {
  articles: Article[];
  onSelectArticle: (id: string) => void;
}

export default function HomePage({ articles, onSelectArticle }: HomePageProps) {
    if (articles.length < 9) {
        return <div className="p-4 text-center text-slate-500">Not enough articles to build the homepage layout.</div>;
    }
    
    // New, clearer article mapping for the revised layout
    const headlineArticle = articles[0];
    const subFeatureLeft = articles[1];
    const subFeatureRight = articles[2];
    const sidebarArticles = articles.slice(3, 8); // Take 5 for the sidebar

    const headlineCategoryStyles = categoryStyleMap[headlineArticle.category] || categoryStyleMap['default'];
    const subFeatureLeftStyles = categoryStyleMap[subFeatureLeft.category] || categoryStyleMap['default'];
    const subFeatureRightStyles = categoryStyleMap[subFeatureRight.category] || categoryStyleMap['default'];

    return (
        <div className="bg-off-white dark:bg-charcoal p-2 sm:p-4 mx-auto" style={{ maxWidth: '1200px' }}>
            
            {/* Weather Widget Section */}
            <div className="mb-6 flex justify-center md:justify-start">
                <WeatherWidget />
            </div>

            {/* Headline Article Section */}
            <div className="mb-6">
                <div 
                    className="relative cursor-pointer group rounded-lg shadow-md overflow-hidden" 
                    onClick={() => onSelectArticle(headlineArticle.id)}
                >
                    <div className="aspect-video max-h-[65vh]">
                        <img src={headlineArticle.hero[0]} alt={headlineArticle.title} className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" />
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent"></div>
                    <div className="absolute bottom-0 left-0 p-4 sm:p-8 z-10">
                        <span className={`inline-block px-3 py-1.5 text-sm font-bold uppercase rounded-full ${headlineCategoryStyles.bg} ${headlineCategoryStyles.text} drop-shadow-md`}>
                            {headlineArticle.category}
                        </span>
                        <h1 className="text-3xl sm:text-5xl md:text-6xl font-serif font-bold mt-2 text-white leading-tight drop-shadow-lg group-hover:underline decoration-sandstone-ochre">{headlineArticle.title}</h1>
                    </div>
                </div>
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-x-8 gap-y-12">
                
                {/* Main Column (2/3 width) */}
                <div className="md:col-span-2">
                    <p className="font-sans text-charcoal dark:text-gray-300 leading-relaxed text-lg mb-8 border-b border-slate-200 dark:border-slate-700 pb-8">
                        {headlineArticle.excerpt}
                        <button 
                            onClick={(e) => { e.stopPropagation(); onSelectArticle(headlineArticle.id); }}
                            className="text-sm font-semibold text-brand-green hover:underline ml-2 whitespace-nowrap"
                        >
                            Read more &rarr;
                        </button>
                    </p>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-8">
                        {/* Sub-feature Left */}
                        <div className="cursor-pointer group" onClick={() => onSelectArticle(subFeatureLeft.id)}>
                            <img src={subFeatureLeft.hero[0]} alt={subFeatureLeft.title} className="w-full h-auto object-cover mb-4 rounded-md shadow-sm"/>
                            <span className={`inline-block px-2 py-1 text-xs font-bold uppercase rounded-full ${subFeatureLeftStyles.bg} ${subFeatureLeftStyles.text} self-start`}>
                                {subFeatureLeft.category}
                            </span>
                            <h3 className="font-bold font-serif text-2xl text-slate-800 dark:text-white group-hover:underline mt-2">{subFeatureLeft.title}</h3>
                            <p className="text-sm line-clamp-4 mt-2 text-slate-600 dark:text-slate-400">{subFeatureLeft.excerpt}</p>
                        </div>

                        {/* Sub-feature Right */}
                        <div className="cursor-pointer group" onClick={() => onSelectArticle(subFeatureRight.id)}>
                             <img src={subFeatureRight.hero[0]} alt={subFeatureRight.title} className="w-full h-auto object-cover mb-4 rounded-md shadow-sm"/>
                             <span className={`inline-block px-2 py-1 text-xs font-bold uppercase rounded-full ${subFeatureRightStyles.bg} ${subFeatureRightStyles.text} self-start`}>
                                {subFeatureRight.category}
                            </span>
                            <h3 className="font-bold font-serif text-2xl text-slate-800 dark:text-white group-hover:underline mt-2">{subFeatureRight.title}</h3>
                            <p className="text-sm line-clamp-4 mt-2 text-slate-600 dark:text-slate-400">{subFeatureRight.excerpt}</p>
                        </div>
                    </div>
                </div>

                {/* Sidebar Column (1/3 width) */}
                <div className="md:col-span-1">
                    <div className="p-6 rounded-lg bg-brand-blue/5 dark:bg-brand-blue/10">
                        <div className="space-y-8">
                            {sidebarArticles.map(article => {
                                const categoryStyles = categoryStyleMap[article.category] || categoryStyleMap['default'];
                                return (
                                    <div key={article.id} className="cursor-pointer group" onClick={() => onSelectArticle(article.id)}>
                                        <span className={`inline-block px-2 py-1 text-xs font-bold uppercase rounded-full ${categoryStyles.bg} ${categoryStyles.text} self-start`}>
                                            {article.category}
                                        </span>
                                        <h2 className="font-serif text-xl font-bold text-slate-800 dark:text-white group-hover:underline mt-2">{article.title}</h2>
                                        {article.hero && article.hero.length > 0 && (
                                            <div className="flex gap-x-3 mt-2">
                                                <p className="font-sans text-sm text-charcoal dark:text-gray-300 line-clamp-4">{article.excerpt}</p>
                                            </div>
                                        )}
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}