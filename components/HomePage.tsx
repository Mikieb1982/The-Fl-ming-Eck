import React from 'react';
import { motion } from 'framer-motion';
import { Article } from '../types';
import { isArticleSafe } from '../utils/helpers';
import MediumArticleCard from './MediumArticleCard';
import MinimalArticleCard from './MinimalArticleCard';
import WeatherWidget from './WeatherWidget';
import ScheduleBand from './ScheduleBand';
import SupportCard from './SupportCard';

interface HomePageProps {
  featureArticles: Article[];
  newsArticles: Article[];
  onSelectArticle: (id: string) => void;
}

function MainFeature({ article, onSelectArticle }: { article: Article, onSelectArticle: (id: string) => void }) {
  if (!isArticleSafe(article)) return null;

  const heroUrl = (article.hero && article.hero.length > 0) ? article.hero[0] : `https://picsum.photos/seed/${encodeURIComponent(article.id)}/1600/900`;

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (e.metaKey || e.ctrlKey || e.button === 1) {
      return;
    }
    e.preventDefault();
    onSelectArticle(article.id);
  };
  
  return (
    <a
      href={`/#/article/${article.id}`}
      onClick={handleClick}
      className="group relative block h-[60vh] min-h-[400px] w-full rounded-2xl overflow-hidden shadow-lg cursor-pointer text-white"
    >
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent z-10" />
      <img
        src={heroUrl}
        alt={article.title}
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 ease-in-out group-hover:scale-105"
      />
      <div className="relative z-20 flex flex-col justify-end h-full p-6 md:p-8">
        <span className="inline-block px-3 py-1.5 text-sm font-bold uppercase rounded-full bg-poppy text-white self-start drop-shadow-md">
          Featured Story
        </span>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold mt-2 tracking-tight leading-tight drop-shadow-lg">{article.title}</h1>
        <p className="mt-2 text-base md:text-lg text-slate-200 max-w-2xl drop-shadow-md hidden sm:block">{article.excerpt}</p>
      </div>
    </a>
  );
}

export default function HomePage({ featureArticles, newsArticles, onSelectArticle }: HomePageProps) {
  const mainFeature = featureArticles[0];
  const secondaryFeatures = featureArticles.slice(1, 3);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="grid grid-cols-12 gap-8">
        {/* Main Content Area */}
        <div className="col-span-12 lg:col-span-9">
          {mainFeature && (
            <MainFeature article={mainFeature} onSelectArticle={onSelectArticle} />
          )}

          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8">
            {secondaryFeatures.map(article => (
              <MediumArticleCard key={article.id} article={article} onClick={() => onSelectArticle(article.id)} />
            ))}
          </div>
        </div>

        {/* Sidebar */}
        <aside className="col-span-12 lg:col-span-3">
            <div className="lg:sticky lg:top-32 space-y-6">
                <WeatherWidget />
                <div className="p-4 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm">
                    <h3 className="font-serif font-bold text-lg text-charcoal dark:text-slate-200 mb-2">Latest News</h3>
                    <div className="divide-y divide-slate-100 dark:divide-slate-700">
                        {newsArticles.slice(0, 5).map(article => (
                            <MinimalArticleCard key={article.id} article={article} onClick={() => onSelectArticle(article.id)} />
                        ))}
                    </div>
                </div>
                 <SupportCard />
            </div>
        </aside>
      </div>
      
      <ScheduleBand />
      
    </motion.div>
  );
}
