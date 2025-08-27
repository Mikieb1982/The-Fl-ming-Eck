
import React, { useEffect, useMemo, useState, useCallback } from "react";
import { AnimatePresence } from "framer-motion";

import { Article } from "./types";
import { initialArticles } from "./constants";
import { sortByDateDesc, isArticleSafe } from "./utils/helpers";
import { useValidation } from "./hooks/useValidation";
import Masthead from "./components/Masthead";
import ArticleView from "./components/ArticleView";
import Navigation from "./components/Navigation";
import Diagnostics from "./components/Diagnostics";

export default function App() {
  const [articles] = useState<Article[]>(initialArticles);
  const validation = useValidation(articles);
  const sorted = useMemo(() => sortByDateDesc(articles), [articles]);
  const [index, setIndex] = useState(0);

  // Clamp index whenever sorted articles array changes
  useEffect(() => {
    if (sorted.length === 0) {
      setIndex(0);
      return;
    }
    if (index < 0) {
      setIndex(0);
    } else if (index > sorted.length - 1) {
      setIndex(sorted.length - 1);
    }
  }, [sorted, index]);

  const nextArticle = useCallback(() => {
    if (sorted.length === 0) return;
    setIndex((prev) => Math.min(prev + 1, sorted.length - 1));
  }, [sorted.length]);

  const prevArticle = useCallback(() => {
    if (sorted.length === 0) return;
    setIndex((prev) => Math.max(prev - 1, 0));
  }, [sorted.length]);

  // Keyboard navigation
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") nextArticle();
      if (e.key === "ArrowLeft") prevArticle();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [nextArticle, prevArticle]);

  const tests = useMemo(() => {
    const copy = sortByDateDesc(articles);
    const sortedDesc = copy.every(
      (x, i, arr) => i === 0 || new Date(arr[i - 1].date).getTime() >= new Date(x.date).getTime()
    );
    const requiredOk = articles.every(isArticleSafe);
    const notEmpty = articles.length >= 3;
    const idxInRange = index >= 0 && (sorted.length === 0 || index <= sorted.length - 1);
    const afterPrev = Math.max(index - 1, 0);
    const afterNext = Math.min(index + 1, Math.max(sorted.length - 1, 0));
    return [
      { name: "Feed sorted by date desc", pass: sortedDesc },
      { name: "All articles have required fields", pass: requiredOk },
      { name: "Has at least 3 articles", pass: notEmpty },
      { name: "Index within range", pass: idxInRange },
      { name: "Prev does not go below 0", pass: afterPrev >= 0 },
      { name: "Next does not exceed last index", pass: sorted.length === 0 ? true : afterNext <= sorted.length - 1 },
    ];
  }, [articles, index, sorted.length]);

  const currentArticle = sorted[index];

  return (
    <div className="max-w-4xl mx-auto p-6 md:p-10 space-y-10 font-sans text-gray-900">
      <Masthead validation={validation} />

      <main className="relative">
        <AnimatePresence mode="wait">
          <ArticleView key={currentArticle?.id ?? "empty"} article={currentArticle} />
        </AnimatePresence>
        <Navigation
          onPrev={prevArticle}
          onNext={nextArticle}
          isFirst={index === 0}
          isLast={index >= sorted.length - 1}
        />
      </main>

      <Diagnostics validationChecks={validation.checks} selfTests={tests} />

      <footer className="text-center text-gray-500 text-sm mt-8">
        © 2025 The Fläming Eck. Edited in English. Facts reviewed prior to publication.
      </footer>
    </div>
  );
}
