



import React from 'react';
import { Article, ArticleBodyBlock } from '../types';

interface HomePageProps {
  articles: Article[];
  onSelectArticle: (id: string) => void;
}

const VRule = () => <div className="border-l border-slate-300 dark:border-slate-600 h-full mx-2 hidden md:block"></div>;

export default function HomePage({ articles, onSelectArticle }: HomePageProps) {
    if (articles.length < 9) {
        return <div className="p-4 text-center text-slate-500">Not enough articles to build the homepage layout.</div>;
    }
    
    // Article mapping for the newspaper layout
    const mainArticle = articles[0];
    const topStripArticles = articles.slice(1, 4);
    const sideBarTopArticle = articles[4];
    const sideBarMidArticle = articles[5];
    const subFeatureLeft = articles[6];
    const subFeatureRight = articles[7];
    const sideBarBottomArticle = articles[8];

    // FIX: The `ArticleBodyBlock` type is a union. Not all members have a `content` property, so we must safely access it after a type check.
    const firstSubheadingBlock = mainArticle.body.find(b => b.type === 'subheading');
    const firstSubheading = firstSubheadingBlock?.type === 'subheading' ? firstSubheadingBlock.content : undefined;
    const firstParagraphBlock = mainArticle.body.find(b => b.type === 'paragraph');
    const firstParagraph = firstParagraphBlock?.type === 'paragraph' ? firstParagraphBlock.content : undefined;

    return (
        <div className="bg-off-white dark:bg-charcoal p-2 sm:p-4 mx-auto" style={{ maxWidth: '1200px' }}>

            {/* Top image strip */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-1 mb-4">
                {topStripArticles.map(article => (
                    <div key={article.id} className="h-24 sm:h-24 md:h-32 overflow-hidden cursor-pointer group relative" onClick={() => onSelectArticle(article.id)}>
                        <img src={article.hero[0]} alt={article.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                        <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors"></div>
                         <p className="absolute bottom-1 left-2 text-white text-xs font-bold drop-shadow-md leading-tight line-clamp-2">{article.title}</p>
                    </div>
                ))}
            </div>

            {/* Main Content Grid */}
            <div className="flex flex-col md:flex-row gap-x-4">
                
                {/* Left & Center Part (Main Story) */}
                <div className="flex-grow-[3] md:pr-2">
                    <div className="relative cursor-pointer group" onClick={() => onSelectArticle(mainArticle.id)}>
                        <img src={mainArticle.hero[0]} alt={mainArticle.title} className="w-full h-auto object-cover" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent"></div>
                        <div className="absolute bottom-0 left-0 p-4 sm:p-6 z-10">
                            <p className="font-mono text-sm uppercase tracking-wider font-semibold text-sandstone-ochre">{mainArticle.category}</p>
                            <h1 className="text-3xl sm:text-5xl md:text-6xl font-serif font-bold mt-2 text-white leading-tight group-hover:underline decoration-sandstone-ochre">{mainArticle.title}</h1>
                        </div>
                    </div>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 mt-4 font-sans text-charcoal dark:text-gray-300 leading-relaxed">
                        <div className="space-y-4">
                            <div>
                                <p className="mt-1 text-base">{mainArticle.excerpt}</p>
                            </div>
                             <div className="cursor-pointer group" onClick={() => onSelectArticle(subFeatureLeft.id)}>
                                <h3 className="font-bold text-lg text-slate-800 dark:text-white group-hover:underline">{subFeatureLeft.title}</h3>
                                <img src={subFeatureLeft.hero[0]} alt={subFeatureLeft.title} className="w-full h-auto object-cover my-2 rounded-md"/>
                                <p className="text-sm line-clamp-4">{subFeatureLeft.excerpt}</p>
                            </div>
                        </div>
                        <div className="space-y-4 mt-4 sm:mt-0">
                             <div>
                                {firstSubheading && <h3 className="font-bold text-lg text-slate-800 dark:text-white">{firstSubheading}</h3>}
                                {firstParagraph && <p className="mt-1 line-clamp-10 text-sm">{firstParagraph}</p>}
                                <button 
                                    onClick={(e) => { e.stopPropagation(); onSelectArticle(mainArticle.id); }}
                                    className="text-xs font-semibold text-brand-green hover:underline mt-1"
                                >
                                    Read more...
                                </button>
                            </div>
                             <div className="cursor-pointer group" onClick={() => onSelectArticle(subFeatureRight.id)}>
                                <h3 className="font-bold text-lg text-slate-800 dark:text-white group-hover:underline">{subFeatureRight.title}</h3>
                                <p className="mt-1 line-clamp-6 text-sm">{subFeatureRight.excerpt}</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Part */}
                <div className="flex-grow-[2] mt-8 md:mt-0 flex">
                    <VRule />
                    <div className="pl-2 flex-1 space-y-4">
                        <div className="border-b-2 border-slate-300 dark:border-gray-500 pb-4 cursor-pointer group" onClick={() => onSelectArticle(sideBarTopArticle.id)}>
                            <p className="font-mono text-sm uppercase text-sandstone-ochre">{sideBarTopArticle.category}</p>
                            <h2 className="font-serif text-2xl font-bold text-slate-800 dark:text-white group-hover:underline">{sideBarTopArticle.title}</h2>
                            <div className="flex gap-x-3 mt-2">
                                <img src={sideBarTopArticle.hero[0]} alt={sideBarTopArticle.title} className="w-16 h-16 object-cover rounded"/>
                                <p className="font-sans text-sm text-charcoal dark:text-gray-300 line-clamp-5">{sideBarTopArticle.excerpt}</p>
                            </div>
                        </div>

                        <div className="cursor-pointer group" onClick={() => onSelectArticle(sideBarMidArticle.id)}>
                           <p className="font-mono text-sm uppercase text-sandstone-ochre">{sideBarMidArticle.category}</p>
                           <h3 className="font-serif text-2xl font-bold text-slate-800 dark:text-white group-hover:underline">{sideBarMidArticle.title}</h3>
                            <img src={sideBarMidArticle.hero[0]} alt={sideBarMidArticle.title} className="w-full h-auto object-cover my-2 rounded-md"/>
                            <p className="font-sans text-sm text-charcoal dark:text-gray-300 mt-2 line-clamp-4">{sideBarMidArticle.excerpt}</p>
                        </div>
                        
                        <div className="cursor-pointer group pt-4 border-t-2 border-slate-300 dark:border-gray-500" onClick={() => onSelectArticle(sideBarBottomArticle.id)}>
                            <p className="font-mono text-sm uppercase text-sandstone-ochre">{sideBarBottomArticle.category}</p>
                           <h3 className="font-serif text-lg font-bold text-slate-800 dark:text-white group-hover:underline">{sideBarBottomArticle.title}</h3>
                            <p className="font-sans text-sm text-charcoal dark:text-gray-300 mt-1">{sideBarBottomArticle.excerpt}</p>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
}
