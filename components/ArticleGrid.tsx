
import React, { useMemo, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Article } from '../types';
import ArticleCard from './ArticleCard';
import HeadlineCard from './HeadlineCard';
import { calculateReadTime } from '../utils/helpers';
import ChevronLeftIcon from './icons/ChevronLeftIcon';
import ChevronRightIcon from './icons/ChevronRightIcon';
import { useGeneratedPlaceholder } from '../hooks/useGeneratedPlaceholder';
import Tag from './Tag';

const wrap = (min: number, max: number, v: number) => {
  const rangeSize = max - min;
  return ((((v - min) % rangeSize) + rangeSize) % rangeSize) + min;
};

const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? '100%' : '-100%',
      opacity: 0,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? '100%' : '-100%',
      opacity: 0,
    }),
};

const swipeConfidenceThreshold = 10000;
const swipePower = (offset: number, velocity: number) => {
  return Math.abs(offset) * velocity;
};


function HeroArticleCard({ article, onClick }: { article: Article, onClick: () => void }) {
  const readTime = calculateReadTime(article.body);
  
  const hasHero = article.hero && article.hero.length > 0 && article.hero[0];
  const { generatedUrl, isLoading } = useGeneratedPlaceholder(article, !hasHero);

  const images = useMemo(() => {
    if (hasHero) return article.hero;
    if (generatedUrl) return [generatedUrl];
    return [];
  }, [article.hero, hasHero, generatedUrl]);

  
  const [[page, direction], setPage] = useState([0, 0]);
  const imageIndex = wrap(0, images.length, page);

  const paginate = (newDirection: number) => {
    if (images.length <=1) return;
    setPage([page + newDirection, newDirection]);
  };
  
  useEffect(() => {
    if (images.length > 1) {
        const timer = setTimeout(() => paginate(1), 5000);
        return () => clearTimeout(timer);
    }
  }, [page, direction, images.length]);

  return (
    <div
        className="group cursor-pointer relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-shadow duration-300 aspect-[16/9] lg:aspect-[2/1]"
        onClick={onClick}
    >
        {isLoading && <div className="absolute inset-0 w-full h-full bg-slate-200 dark:bg-slate-700 animate-pulse" />}
        {!isLoading && images.length > 0 && (
            <AnimatePresence initial={false} custom={direction} mode="wait">
            <motion.div
                key={page}
                className="absolute w-full h-full"
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                x: { type: 'spring', stiffness: 300, damping: 30 },
                opacity: { duration: 0.2 },
                }}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={1}
                onDragEnd={(e, { offset, velocity }) => {
                e.stopPropagation();
                const swipe = swipePower(offset.x, velocity.x);

                if (swipe < -swipeConfidenceThreshold) {
                    paginate(1);
                } else if (swipe > swipeConfidenceThreshold) {
                    paginate(-1);
                }
                }}
            >
                <img
                src={images[imageIndex]}
                alt={article.title}
                loading="eager"
                fetchPriority="high"
                className="w-full h-full object-cover"
                />
            </motion.div>
            </AnimatePresence>
        )}
        
        {images.length > 1 && (
            <>
                <div className="absolute top-1/2 left-2 -translate-y-1/2 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <button onClick={(e) => { e.stopPropagation(); paginate(-1); }} className="bg-black/50 text-white p-2 rounded-full hover:bg-black/80 focus:outline-none focus:ring-2 focus:ring-white">
                        <ChevronLeftIcon className="w-6 h-6" />
                    </button>
                </div>
                <div className="absolute top-1/2 right-2 -translate-y-1/2 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <button onClick={(e) => { e.stopPropagation(); paginate(1); }} className="bg-black/50 text-white p-2 rounded-full hover:bg-black/80 focus:outline-none focus:ring-2 focus:ring-white">
                        <ChevronRightIcon className="w-6 h-6" />
                    </button>
                </div>
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 flex gap-2">
                    {images.map((_, i) => (
                        <div
                            key={i}
                            className={`w-2 h-2 rounded-full transition-all duration-300 shadow-md ${i === imageIndex ? 'bg-white scale-125' : 'bg-white/50'}`}
                        />
                    ))}
                </div>
            </>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent" />
        <div className="absolute bottom-0 left-0 p-6 md:p-8 text-white w-full">
            <p className="font-mono text-sm uppercase tracking-wider font-semibold text-sandstone-ochre">{article.category} · {readTime} min read</p>
            <h2 className="text-3xl lg:text-5xl font-serif font-bold mt-2 tracking-tight">
                {article.title}
            </h2>
            <p className="text-slate-200 mt-4 text-base lg:text-lg max-w-3xl line-clamp-2 hidden md:block">{article.excerpt}</p>
        </div>
    </div>
  );
}

interface ArticleGridProps {
  articles: Article[];
  onSelectArticle: (id: string) => void;
  activeCategory: string;
  onSelectCategory: (category: string) => void;
  activeTag: string | null;
  onClearTag: () => void;
  onSelectTag: (tag: string) => void;
}

export default function ArticleGrid({ articles, onSelectArticle, activeCategory, onSelectCategory, activeTag, onClearTag, onSelectTag }: ArticleGridProps) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 },
  };

  const articlesByCategory: Record<string, Article[]> | null = useMemo(() => {
    if (activeCategory !== 'All' || activeTag) return null;
    // Update slice index to account for hero + 2 secondary articles
    const remainingArticles = articles.slice(3); 
    return remainingArticles.reduce((acc, article) => {
      const { category } = article;
      if (!acc[category]) acc[category] = [];
      acc[category].push(article);
      return acc;
    }, {} as Record<string, Article[]>);
  }, [articles, activeCategory, activeTag]);

  const viewContent = (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {articles.map(article => (
        <motion.div variants={itemVariants} key={article.id}>
          <ArticleCard article={article} onClick={() => onSelectArticle(article.id)} />
        </motion.div>
      ))}
    </div>
  );

  if (activeTag) {
    return (
      <motion.div variants={containerVariants} initial="hidden" animate="visible" exit="hidden">
        <div className="flex items-center gap-4 mb-6 border-b-2 border-slate-200 dark:border-slate-700 pb-2">
            <h2 className="text-2xl font-serif font-bold text-charcoal dark:text-slate-200">
                Articles tagged with: <span className="text-brand-green">#{activeTag}</span>
            </h2>
            <button onClick={onClearTag} className="text-sm font-semibold text-sandstone-ochre hover:underline">
                Clear filter
            </button>
        </div>
        {viewContent}
      </motion.div>
    )
  }

  if (activeCategory !== 'All') {
    return (
      <motion.div variants={containerVariants} initial="hidden" animate="visible" exit="hidden">
        <div className="flex justify-between items-center mb-6 border-b-2 border-slate-200 dark:border-slate-700 pb-2">
            <h2 className="text-3xl font-serif font-bold text-charcoal dark:text-green-300">{activeCategory}</h2>
            <button onClick={() => onSelectCategory('All')} className="text-sm font-semibold text-sandstone-ochre hover:underline">
                Show all categories
            </button>
        </div>
        {viewContent}
      </motion.div>
    );
  }

  if (!articles.length) {
    return <p>No articles to display.</p>;
  }

  const heroArticle = articles[0];
  const secondaryArticles = articles.slice(1, 3);

  return (
    <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        exit="hidden"
        className="space-y-16"
    >
      {/* Hero Article */}
      <motion.div variants={itemVariants}>
        <HeroArticleCard article={heroArticle} onClick={() => onSelectArticle(heroArticle.id)} />
      </motion.div>
      
      {/* Secondary Articles */}
      {secondaryArticles.length > 0 && (
          <motion.div variants={itemVariants}>
             <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                 {secondaryArticles.map(article => (
                     <ArticleCard 
                         key={article.id} 
                         article={article} 
                         onClick={() => onSelectArticle(article.id)} 
                     />
                 ))}
             </div>
         </motion.div>
      )}
      
      {/* Category Sections */}
      {articlesByCategory && Object.entries(articlesByCategory).map(([category, categoryArticles]) => (
        categoryArticles.length > 0 && (
          <motion.div variants={itemVariants} key={category}>
            <hr className="border-t-4 border-double border-slate-200 dark:border-slate-700" />
            <div className="pt-12">
                <h2 className="text-xl font-serif font-bold text-charcoal dark:text-slate-200 border-b-2 border-sandstone-ochre pb-2 mb-6 uppercase tracking-widest">
                {category}
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {categoryArticles.map(article => (
                    <ArticleCard 
                        key={article.id}
                        article={article} 
                        onClick={() => onSelectArticle(article.id)} 
                    />
                ))}
                </div>
            </div>
          </motion.div>
        )
      ))}
    </motion.div>
  );
}