
import React, { useEffect, useMemo, useState, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";

import { Article } from "./types";
import { articles as initialArticles } from "./articles";
import { sortByDateDesc } from "./utils/helpers";
import Masthead from "./components/Masthead";
import ArticleView from "./components/ArticleView";
import Navigation from "./components/Navigation";
import ArticleGrid from "./components/ArticleGrid";
import EventsCalendar from "./components/EventsCalendar";

export default function App() {
  const [articles] = useState<Article[]>(initialArticles);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);

  const sortedArticles = useMemo(() => sortByDateDesc(articles), [articles]);

  const handleCloseArticle = useCallback(() => {
    setActiveIndex(null);
  }, []);

  const handleSelectArticle = useCallback((index: number) => {
    setActiveIndex(index);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const handleSelectArticleById = useCallback((id: string) => {
    const index = sortedArticles.findIndex(a => a.id === id);
    if (index !== -1) {
      handleSelectArticle(index);
    }
  }, [sortedArticles, handleSelectArticle]);
  
  const handleSearchChange = useCallback((query: string) => {
    setSearchQuery(query);
    if (activeIndex !== null) {
        handleCloseArticle();
    }
  }, [activeIndex, handleCloseArticle]);

  const displayedArticles = useMemo(() => {
    const query = searchQuery.toLowerCase().trim();
    if (!query) {
        return sortedArticles;
    }
    return sortedArticles.filter(article =>
        article.title.toLowerCase().includes(query) ||
        article.excerpt.toLowerCase().includes(query) ||
        article.category.toLowerCase().includes(query)
    );
  }, [searchQuery, sortedArticles]);

  const nextArticle = useCallback(() => {
    if (activeIndex === null) return;
    setActiveIndex((prev) => {
      if (prev === null) return 0;
      return Math.min(prev + 1, sortedArticles.length - 1);
    });
  }, [activeIndex, sortedArticles.length]);

  const prevArticle = useCallback(() => {
    if (activeIndex === null) return;
    setActiveIndex((prev) => {
       if (prev === null) return 0;
      return Math.max(prev - 1, 0);
    });
  }, [activeIndex]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (activeIndex !== null) {
        if (e.key === "ArrowRight") nextArticle();
        if (e.key === "ArrowLeft") prevArticle();
      }
      if (e.key === "Escape") handleCloseArticle();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [nextArticle, prevArticle, handleCloseArticle, activeIndex]);

  const currentArticle = activeIndex !== null ? sortedArticles[activeIndex] : null;
  const trimmedQuery = searchQuery.trim();

  return (
    <div className="bg-warm-white dark:bg-slate-900 font-sans text-slate-800 dark:text-slate-300">
      {/* Sticky Header Wrapper */}
      <div className="sticky top-0 z-30 w-full bg-warm-white/95 dark:bg-slate-900/95 backdrop-blur-sm transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <Masthead 
            onGoHome={handleCloseArticle}
            searchQuery={searchQuery}
            onSearchChange={handleSearchChange}
            onOpenCalendar={() => setIsCalendarOpen(true)}
          />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        <EventsCalendar isOpen={isCalendarOpen} onClose={() => setIsCalendarOpen(false)} />

        <div className="mt-6">
          <main>
            <div className="relative">
              <AnimatePresence mode="wait">
                {currentArticle ? (
                  <motion.div key="articleView">
                    <ArticleView 
                      article={currentArticle} 
                      onClose={handleCloseArticle}
                      allArticles={sortedArticles}
                      onSelectArticle={handleSelectArticleById}
                    />
                    <Navigation
                      onPrev={prevArticle}
                      onNext={nextArticle}
                      isFirst={activeIndex === 0}
                      isLast={activeIndex !== null && activeIndex >= sortedArticles.length - 1}
                    />
                  </motion.div>
                ) : (
                  <motion.div key="articleGrid">
                    {trimmedQuery && (
                      <h2 className="text-2xl font-serif font-bold text-slate-800 dark:text-slate-200 mb-6">
                        Search Results for "{trimmedQuery}"
                      </h2>
                    )}

                    {displayedArticles.length > 0 ? (
                      <ArticleGrid
                        articles={displayedArticles}
                        onSelectArticle={handleSelectArticleById}
                      />
                    ) : (
                      <p className="text-slate-600 dark:text-slate-400">
                        No articles found matching your search.
                      </p>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </main>
        </div>

        <footer className="text-center text-slate-500 dark:text-slate-400 text-sm py-8 mt-12 border-t border-slate-200 dark:border-slate-700">
          © 2025 The Fläming Eck. Edited in English. Facts reviewed prior to publication.
        </footer>
      </div>
    </div>
  );
}
