
import React from 'react';
import { motion } from 'framer-motion';
import { Article } from '../types';
import { useGeneratedPlaceholder } from '../hooks/useGeneratedPlaceholder';
import { articleCategoryStyleMap, BRAND } from '../constants';

interface MobileNewspaperViewProps {
  featureArticles: Article[];
  newsArticles: Article[];
  onSelectArticle: (id: string) => void;
}

// --- Card Components for Print Layout ---

const LargeStoryCard = ({ article, onClick }: { article: Article; onClick: () => void }) => {
  const { generatedUrl, isLoading } = useGeneratedPlaceholder(article, !article.hero?.[0]);
  const heroUrl = article.hero?.[0] || generatedUrl;
  return (
    <motion.div
      onClick={onClick}
      className="flex flex-col h-full cursor-pointer group"
      whileTap={{ scale: 0.98 }}
    >
      <div className="w-full h-2/3 bg-slate-200 dark:bg-slate-700 overflow-hidden">
        {!isLoading && heroUrl && (
          <img src={heroUrl} alt={article.title} className="w-full h-full object-cover" />
        )}
      </div>
      <div className="p-2 flex-grow">
        <span className="text-xs font-bold uppercase text-poppy">{article.category}</span>
        <h3 className="text-2xl font-serif font-black mt-1 text-charcoal dark:text-slate-100 leading-tight group-hover:underline decoration-poppy">{article.title}</h3>
        <p className="text-sm font-sans text-slate-600 dark:text-slate-400 mt-1 line-clamp-2">{article.excerpt}</p>
      </div>
    </motion.div>
  );
};

const MediumStoryCard = ({ article, onClick, imageStyle = 'normal' }: { article: Article; onClick: () => void; imageStyle?: 'normal' | 'faded' }) => {
    const { generatedUrl, isLoading } = useGeneratedPlaceholder(article, !article.hero?.[0]);
    const heroUrl = article.hero?.[0] || generatedUrl;
    const isFaded = imageStyle === 'faded';
  return (
    <motion.div
      onClick={onClick}
      className="relative flex flex-col h-full cursor-pointer group overflow-hidden"
      whileTap={{ scale: 0.98 }}
    >
      <div className="absolute inset-0">
        {!isLoading && heroUrl && (
            <img src={heroUrl} alt={article.title} className={`w-full h-full object-cover transition-opacity duration-300 ${isFaded ? 'opacity-50' : ''}`} />
        )}
      </div>
      <div className={`relative z-10 p-2 flex flex-col flex-grow ${isFaded ? 'justify-end bg-gradient-to-t from-cream via-cream/70 to-transparent dark:from-charcoal dark:via-charcoal/70 dark:to-transparent' : ''}`}>
        <h3 className={`text-base font-serif font-bold ${!isFaded ? 'mt-auto' : ''} text-charcoal dark:text-slate-100 leading-tight group-hover:underline decoration-ocean`}>{article.title}</h3>
      </div>
    </motion.div>
  );
};

const HeadlineCard = ({ article, onClick }: { article: Article; onClick: () => void }) => {
  const categoryStyles = articleCategoryStyleMap[article.category] || articleCategoryStyleMap['default'];
  return (
    <motion.div
        onClick={onClick}
        className="h-full p-2 flex flex-col justify-center cursor-pointer group"
        whileTap={{ scale: 0.98 }}
    >
        <span className={`inline-block px-1.5 py-0.5 text-[10px] font-bold uppercase rounded self-start ${categoryStyles.bg} ${categoryStyles.text}`}>{article.category}</span>
        <h3 className="text-sm font-serif font-semibold mt-1 text-charcoal dark:text-slate-200 group-hover:underline decoration-ocean">{article.title}</h3>
    </motion.div>
  );
};

const NewsColumn = ({ articles, onSelectArticle }: { articles: Article[], onSelectArticle: (id: string) => void }) => (
    <div className="p-2 h-full">
        <h3 className="text-sm font-serif font-black uppercase text-charcoal dark:text-slate-300 border-b-4 border-charcoal dark:border-slate-500 pb-1 mb-2 tracking-widest">NEWS</h3>
        <div className="space-y-3">
            {articles.slice(0, 5).map(article => (
                <div key={article.id} onClick={() => onSelectArticle(article.id)} className="cursor-pointer group">
                    <p className="text-xs font-serif font-semibold text-charcoal dark:text-slate-300 group-hover:underline decoration-poppy">{article.title}</p>
                </div>
            ))}
        </div>
    </div>
);

export default function MobileNewspaperView({ featureArticles, newsArticles, onSelectArticle }: MobileNewspaperViewProps) {
  const mainFeature = featureArticles[0];
  const secondaryFeature = featureArticles[1];
  const twoMediumFeatures = featureArticles.slice(2, 4);
  const nextFourHeadlines = featureArticles.slice(4, 8);
  const finalLargeFeature = featureArticles[8];
  const remainingArticles = featureArticles.slice(9);
  
  return (
    <div className="bg-cream dark:bg-charcoal font-sans -m-2 sm:-m-4 p-2 space-y-4">
      {/* Top Section */}
      {mainFeature && (
        <div className="h-[70vh] border-b-2 border-slate-300 dark:border-slate-600 pb-2">
          <LargeStoryCard article={mainFeature} onClick={() => onSelectArticle(mainFeature.id)} />
        </div>
      )}
      <div className="flex h-48">
        <div className="w-2/3 border-r border-slate-300 dark:border-slate-600 pr-2">
          {secondaryFeature && (
            secondaryFeature.hero?.[0]
              ? <MediumStoryCard article={secondaryFeature} onClick={() => onSelectArticle(secondaryFeature.id)} />
              : <HeadlineCard article={secondaryFeature} onClick={() => onSelectArticle(secondaryFeature.id)} />
          )}
        </div>
        <div className="w-1/3">
          <NewsColumn articles={newsArticles} onSelectArticle={onSelectArticle} />
        </div>
      </div>
      
      {/* Mid Section */}
      {(twoMediumFeatures.length > 0 || nextFourHeadlines.length > 0) && (
        <>
            <div className="border-t-4 border-double border-slate-400 dark:border-slate-600 my-2" />
            
            {twoMediumFeatures.length > 0 && (
                <div className="grid grid-cols-2 gap-2 h-48">
                  {twoMediumFeatures.map(article => (
                    <div key={article.id} className="border border-slate-300 dark:border-slate-600">
                      <MediumStoryCard article={article} onClick={() => onSelectArticle(article.id)} imageStyle="faded" />
                    </div>
                  ))}
                </div>
            )}
            
            {nextFourHeadlines.length > 0 && (
                <div className="grid grid-cols-2 gap-2 mt-2">
                  {nextFourHeadlines.map(article => (
                    <div key={article.id} className="h-28 border border-slate-300 dark:border-slate-600">
                      <HeadlineCard article={article} onClick={() => onSelectArticle(article.id)} />
                    </div>
                  ))}
                </div>
            )}
        </>
      )}

      {/* Bottom Section */}
      {(finalLargeFeature || remainingArticles.length > 0) && (
        <>
            <div className="border-t-4 border-double border-slate-400 dark:border-slate-600 my-2" />

            {finalLargeFeature && (
                <div className="h-[70vh] border-b-2 border-slate-300 dark:border-slate-600 pb-2">
                  <LargeStoryCard article={finalLargeFeature} onClick={() => onSelectArticle(finalLargeFeature.id)} />
                </div>
            )}
            
            {remainingArticles.length > 0 && (
                <div className="grid grid-cols-2 gap-2 mt-2">
                  {remainingArticles.map(article => (
                    <div key={article.id} className="h-28 border border-slate-300 dark:border-slate-600">
                      <HeadlineCard article={article} onClick={() => onSelectArticle(article.id)} />
                    </div>
                  ))}
                </div>
            )}
        </>
      )}

      {/* Footer */}
       <footer className="mt-8 pt-4 border-t border-slate-200 dark:border-slate-700">
        <div className="text-center text-xs text-slate-500 dark:text-slate-400">
          <p className="font-bold">{BRAND.title}</p>
          <p>&copy; {new Date().getFullYear()}. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
