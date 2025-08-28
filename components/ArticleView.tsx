import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Article } from '../types';
import { isArticleSafe, fmtDate, calculateReadTime } from '../utils/helpers';
import { generateSummary } from '../services/geminiService';
import { Card, CardContent } from './Card';
import SparklesIcon from './icons/SparklesIcon';
import HeadlineCard from './HeadlineCard';

interface ArticleViewProps {
  article: Article | undefined;
  allArticles: Article[];
  onSelectArticle: (id: string) => void;
  onClose: () => void;
}

export default function ArticleView({ article, allArticles, onSelectArticle, onClose }: ArticleViewProps) {
  const [summary, setSummary] = useState<string | null>(null);
  const [isSummarizing, setIsSummarizing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerateSummary = async () => {
    if (!article) return;
    setIsSummarizing(true);
    setError(null);
    setSummary(null);
    try {
      const result = await generateSummary(article.body.join(' '));
      setSummary(result);
    } catch (e: any) {
      setError(e.message || 'An unknown error occurred.');
    } finally {
      setIsSummarizing(false);
    }
  };

  const navigationArticles = useMemo(() => {
    if (!article) return [];
    const otherArticles = allArticles.filter(a => a.id !== article.id);
    const sameCategory = otherArticles.filter(a => a.category === article.category);
    const differentCategory = otherArticles.filter(a => a.category !== article.category);
    const related = [...sameCategory, ...differentCategory].slice(0, 2);
    return [article, ...related];
  }, [article, allArticles]);

  if (!isArticleSafe(article)) {
    return (
      <Card>
        <CardContent>
          <p className="text-sm text-slate-700 dark:text-slate-300">Article is not available. Please select another item.</p>
        </CardContent>
      </Card>
    );
  }

  const readTime = calculateReadTime(article.body.join(' '));

  return (
    <motion.div
      key={article.id}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
    >
        <button 
            onClick={onClose}
            className="mb-4 px-4 py-2 text-sm font-semibold text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
        >
            &larr; Back to Magazine
        </button>

      <div
        className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg overflow-hidden"
      >
        <div className="p-6 md:p-8">
          <p className="text-xs uppercase tracking-wider font-semibold text-blue-700 dark:text-blue-400">{article.category} · {fmtDate(article.date)} · {readTime} min read</p>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold mt-1 text-slate-900 dark:text-slate-100 tracking-tight">{article.title}</h2>
          <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">By {article.author}</p>
          
          <div className="my-6">
            <img 
              src={article.hero} 
              alt={article.title}
              className="max-w-2xl mx-auto rounded-xl shadow-inner w-full h-auto"
            />
          </div>

          {article.pullQuote && (
            <blockquote className="border-l-4 border-blue-200 dark:border-blue-800 pl-4 italic text-slate-700 dark:text-slate-300 text-xl md:text-2xl my-6 font-serif">“{article.pullQuote}”</blockquote>
          )}

          <div className="mt-6 prose md:prose-lg max-w-none dark:prose-invert">
              {article.body.map((paragraph, index) => (
              <p key={index}>
                  {index === 0 && <span className="float-left text-5xl sm:text-6xl leading-none pr-3 font-serif text-blue-700 dark:text-blue-400 -mt-2">{paragraph.charAt(0)}</span>}
                  {index === 0 ? paragraph.slice(1) : paragraph}
              </p>
              ))}
          </div>

          <div className="mt-8 pt-6 border-t border-slate-200 dark:border-slate-700">
              <div className="flex items-center gap-4">
                  <h3 className="text-lg font-serif font-bold text-slate-800 dark:text-slate-200">TL;DR</h3>
                  <button 
                      onClick={handleGenerateSummary} 
                      disabled={isSummarizing}
                      className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-white bg-blue-600 rounded-full shadow-md hover:bg-blue-700 disabled:bg-slate-400 disabled:cursor-not-allowed transition-all transform hover:scale-105"
                  >
                      <SparklesIcon className="w-4 h-4" />
                      {isSummarizing ? "Generating..." : "Generate with AI"}
                  </button>
              </div>

              {isSummarizing && <div className="mt-4 text-sm text-slate-500 dark:text-slate-400">Thinking...</div>}
              {error && <div className="mt-4 text-sm text-red-600 dark:text-red-300 bg-red-50 dark:bg-red-900/50 p-3 rounded-lg">{error}</div>}
              {summary && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-4 p-4 bg-slate-50 dark:bg-slate-700/50 border border-slate-200 dark:border-slate-600 rounded-lg"
                >
                  <p className="text-slate-700 dark:text-slate-300 italic">{summary}</p>
                </motion.div>
              )}
          </div>
          
          {navigationArticles.length > 0 && (
            <div className="mt-12 pt-8 border-t border-slate-200 dark:border-slate-700">
              <h3 className="text-2xl font-serif font-bold text-slate-800 dark:text-slate-200 mb-4">More Articles</h3>
              <div className="flex flex-col gap-4">
                {navigationArticles.map(navArticle => (
                  <HeadlineCard 
                    key={navArticle.id} 
                    article={navArticle} 
                    onClick={() => onSelectArticle(navArticle.id)}
                    isActive={navArticle.id === article.id}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}