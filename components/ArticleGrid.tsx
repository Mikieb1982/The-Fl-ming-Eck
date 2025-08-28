import React from 'react';
import { motion } from 'framer-motion';
import { Article } from '../types';
import ArticleCard from './ArticleCard';
import HeadlineCard from './HeadlineCard';
import { calculateReadTime } from '../utils/helpers';

interface ArticleGridProps {
  articles: Article[];
  onSelectArticle: (id: string) => void;
}

// Sub-component for the main hero article to keep the grid component clean
function HeroArticleCard({ article, onClick }: { article: Article, onClick: () => void }) {
  const readTime = calculateReadTime(article.body.join(' '));
  
  return (
    <div
      className="group cursor-pointer"
      onClick={onClick}
    >
      <div className="overflow-hidden rounded-lg mb-4 shadow-lg group-hover:shadow-2xl transition-shadow duration-300">
        <div 
          className="aspect-[16/9] bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
          style={{ backgroundImage: `url(${article.hero})` }}
        />
      </div>
      <div>
        <p className="text-sm uppercase tracking-wider font-semibold text-blue-700 dark:text-blue-400">{article.category} · {readTime} min read</p>
        <h2 className="text-3xl lg:text-5xl font-serif font-bold mt-2 text-slate-900 dark:text-slate-100 tracking-tight group-hover:text-blue-800 dark:group-hover:text-blue-300 transition-colors">
          {article.title}
        </h2>
        <p className="text-slate-600 dark:text-slate-400 mt-4 text-base lg:text-lg">{article.excerpt}</p>
      </div>
    </div>
  );
}

export default function ArticleGrid({ articles, onSelectArticle }: ArticleGridProps) {
  if (!articles.length) {
    return <p>No articles to display.</p>;
  }

  const heroArticle = articles[0];
  const topHeadlines = articles.slice(1, 4);
  const secondaryArticles = articles.slice(4);
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 },
  };

  return (
    <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        exit="hidden"
    >
      {/* Top Section: Hero + Headlines */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-10">
        <motion.div variants={itemVariants} className="lg:col-span-2">
          <HeroArticleCard article={heroArticle} onClick={() => onSelectArticle(heroArticle.id)} />
        </motion.div>
        
        {topHeadlines.length > 0 && (
          <motion.div variants={itemVariants} className="lg:col-span-1">
            <div className="flex flex-col gap-4">
              {topHeadlines.map((article) => (
                <div key={article.id} className="border-b border-slate-200 dark:border-slate-700 pb-4 last:border-b-0">
                    <HeadlineCard
                        article={article}
                        onClick={() => onSelectArticle(article.id)}
                    />
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </div>
      
      {secondaryArticles.length > 0 && (
        <>
          <hr className="my-12 border-slate-200 dark:border-slate-700" />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {secondaryArticles.map((article) => (
                <motion.div variants={itemVariants} key={article.id}>
                    <ArticleCard 
                        article={article} 
                        onClick={() => onSelectArticle(article.id)} 
                    />
                </motion.div>
            ))}
          </div>
        </>
      )}
    </motion.div>
  );
}