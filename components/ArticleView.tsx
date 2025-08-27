
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Article } from '../types';
import { isArticleSafe, fmtDate } from '../utils/helpers';
import { generateSummary } from '../services/geminiService';
import { Card, CardContent } from './Card';
import SparklesIcon from './icons/SparklesIcon';

interface ArticleViewProps {
  article: Article | undefined;
}

export default function ArticleView({ article }: ArticleViewProps) {
  const [summary, setSummary] = useState<string | null>(null);
  const [isSummarizing, setIsSummarizing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerateSummary = async () => {
    if (!article) return;
    setIsSummarizing(true);
    setError(null);
    setSummary(null);
    try {
      const result = await generateSummary(article.body);
      setSummary(result);
    } catch (e: any) {
      setError(e.message || 'An unknown error occurred.');
    } finally {
      setIsSummarizing(false);
    }
  };

  if (!isArticleSafe(article)) {
    return (
      <Card>
        <CardContent>
          <p className="text-sm text-gray-700">Article is not available. Please select another item.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <motion.div
      key={article.id}
      initial={{ rotateY: 90, opacity: 0, scale: 0.95 }}
      animate={{ rotateY: 0, opacity: 1, scale: 1 }}
      exit={{ rotateY: -90, opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.6, ease: "easeInOut" }}
      className="bg-white rounded-2xl shadow-lg"
      style={{ transformOrigin: "left center", perspective: 2000 }}
    >
      <div
        className="aspect-[16/9] bg-gray-200 bg-cover bg-center rounded-t-2xl"
        style={{ backgroundImage: `url(${article.hero})` }}
        aria-label={article.title}
        role="img"
      />
      <div className="p-6 md:p-8">
        <p className="text-xs uppercase tracking-wider font-semibold text-blue-600">{article.category} · {fmtDate(article.date)}</p>
        <h2 className="text-4xl font-extrabold mt-1 text-gray-900 tracking-tight">{article.title}</h2>
        <p className="text-gray-500 text-sm mt-1">By {article.author}</p>
        
        {article.pullQuote && (
          <blockquote className="border-l-4 border-blue-200 pl-4 italic text-gray-700 text-lg my-6">“{article.pullQuote}”</blockquote>
        )}

        <p className="text-lg leading-relaxed text-gray-800 mt-6 prose prose-lg">
          <span className="float-left text-7xl leading-none pr-3 font-serif text-gray-900">{article.body.charAt(0)}</span>
          {article.body.slice(1)}
        </p>

        <div className="mt-8 pt-6 border-t border-gray-200">
            <div className="flex items-center gap-4">
                <h3 className="text-lg font-bold text-gray-800">TL;DR</h3>
                 <button 
                    onClick={handleGenerateSummary} 
                    disabled={isSummarizing}
                    className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-white bg-blue-600 rounded-full shadow-md hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-all transform hover:scale-105"
                 >
                    <SparklesIcon className="w-4 h-4" />
                    {isSummarizing ? "Generating..." : "Generate with AI"}
                 </button>
            </div>

            {isSummarizing && <div className="mt-4 text-sm text-gray-500">Thinking...</div>}
            {error && <div className="mt-4 text-sm text-red-600 bg-red-50 p-3 rounded-lg">{error}</div>}
            {summary && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-4 p-4 bg-gray-50 border border-gray-200 rounded-lg"
              >
                <p className="text-gray-700 italic">{summary}</p>
              </motion.div>
            )}
        </div>
      </div>
    </motion.div>
  );
}
