
import React from 'react';
import { Article } from '../types';

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

    return (
        <div className="bg-off-white dark:bg-charcoal p-2 sm:p-4 mx-auto" style={{ maxWidth: '1200px' }}>

            {/* Headline Article Section */}
            <div className="mb-6">
                <div className="relative cursor-pointer group" onClick={() => onSelectArticle(headlineArticle.id)}>
                    <img src={headlineArticle.hero[0]} alt={headlineArticle.title} className="w-full h-auto object-cover max-h-[65vh] rounded-lg shadow-md" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent rounded-lg"></div>
                    <div className="absolute bottom-0 left-0 p-4 sm:p-8 z-10">
                        <p className="font-mono text-sm uppercase tracking-wider font-semibold text-sandstone-ochre">{headlineArticle.category}</p>
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
                            <p className="font-mono text-xs uppercase text-sandstone-ochre">{subFeatureLeft.category}</p>
                            <h3 className="font-bold font-serif text-2xl text-slate-800 dark:text-white group-hover:underline">{subFeatureLeft.title}</h3>
                            <p className="text-sm line-clamp-4 mt-2 text-slate-600 dark:text-slate-400">{subFeatureLeft.excerpt}</p>
                        </div>

                        {/* Sub-feature Right */}
                        <div className="cursor-pointer group" onClick={() => onSelectArticle(subFeatureRight.id)}>
                             <img src={subFeatureRight.hero[0]} alt={subFeatureRight.title} className="w-full h-auto object-cover mb-4 rounded-md shadow-sm"/>
                            <p className="font-mono text-xs uppercase text-sandstone-ochre">{subFeatureRight.category}</p>
                            <h3 className="font-bold font-serif text-2xl text-slate-800 dark:text-white group-hover:underline">{subFeatureRight.title}</h3>
                            <p className="text-sm line-clamp-4 mt-2 text-slate-600 dark:text-slate-400">{subFeatureRight.excerpt}</p>
                        </div>
                    </div>
                </div>

                {/* Sidebar Column (1/3 width) */}
                <div className="md:col-span-1">
                    <div className="space-y-8">
                        {sidebarArticles.map(article => (
                             <div key={article.id} className="cursor-pointer group" onClick={() => onSelectArticle(article.id)}>
                                <p className="font-mono text-sm uppercase text-sandstone-ochre">{article.category}</p>
                                <h2 className="font-serif text-xl font-bold text-slate-800 dark:text-white group-hover:underline">{article.title}</h2>
                                {article.hero && article.hero.length > 0 && (
                                    <div className="flex gap-x-3 mt-2">
                                        <p className="font-sans text-sm text-charcoal dark:text-gray-300 line-clamp-4">{article.excerpt}</p>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
