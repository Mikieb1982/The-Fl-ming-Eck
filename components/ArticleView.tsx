import React, { useState, useMemo, Fragment, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { Article, ArticleBodyBlock } from '../types';
import { isArticleSafe, fmtDate, calculateReadTime, extractTextFromArticleBody } from '../utils/helpers';
import { generateSummary } from '../services/apiService';
import { Card, CardContent } from './Card';
import SparklesIcon from './icons/SparklesIcon';
import { useGeneratedPlaceholder } from '../hooks/useGeneratedPlaceholder';
import FontSizeAdjuster from './FontSizeAdjuster';
import ArticleCard from './ArticleCard';
import Tag from './Tag';
import AudioPlayer from './AudioPlayer';
import VideoEmbed from './VideoEmbed';
import Poll from './Poll';
import BookmarkButton from './BookmarkButton';
import { categoryStyleMap, BRAND } from '../constants';
import ShareButtons from './ShareButtons';
import Navigation from './Navigation';
import VenueBadge from './poster/VenueBadge';


interface ArticleViewProps {
  article: Article | undefined;
  allArticles: Article[];
  onSelectArticle: (id: string) => void;
  onSelectTag: (tag: string) => void;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
  currentIndex: number | null;
  totalArticles: number;
}

// Helper to render text with clickable links
const renderWithLinks = (text: string) => {
  const urlRegex = /(https?:\/\/[^\s]+)/g;
  const parts = text.split(urlRegex);
  
  return parts.map((part, index) => {
    if (part.match(urlRegex)) {
      // Remove trailing punctuation from the URL
      let url = part;
      let trailingPunctuation = '';
      const punctuationMatch = url.match(/[.,!?)"]+$/);
      if (punctuationMatch) {
        trailingPunctuation = punctuationMatch[0];
        url = url.slice(0, -trailingPunctuation.length);
      }
      return (
        <Fragment key={index}>
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
          >
            {url}
          </a>
          {trailingPunctuation}
        </Fragment>
      );
    }
    return part;
  });
};

const fontSizes = ['prose', 'prose-lg', 'prose-xl', 'prose-2xl'];

export default function ArticleView({ article, allArticles, onSelectArticle, onSelectTag, onClose, onPrev, onNext, currentIndex, totalArticles }: ArticleViewProps) {
  const [summary, setSummary] = useState<string | null>(null);
  const [isSummarizing, setIsSummarizing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [fontSizeIndex, setFontSizeIndex] = useState(1); // Default to prose-lg
  
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);

  useEffect(() => {
    if (!article) return;
    
    const schemaData = {
        '@context': 'https://schema.org',
        '@type': 'NewsArticle',
        'mainEntityOfPage': {
            '@type': 'WebPage',
            '@id': `${window.location.origin}/article/${article.id}`,
        },
        'headline': article.title,
        'image': article.hero,
        'datePublished': article.date,
        'dateModified': article.date,
        'author': {
            '@type': 'Person',
            'name': article.author,
        },
        'publisher': {
            '@type': 'Organization',
            'name': BRAND.title,
        },
        'description': article.excerpt,
    };
    
    const eventSchemaData = article.eventDetails ? {
        '@context': 'https://schema.org',
        '@type': 'Event',
        name: article.title,
        startDate: article.eventDetails.startDate,
        ...(article.eventDetails.endDate && { endDate: article.eventDetails.endDate }),
        location: {
            '@type': 'Place',
            name: article.eventDetails.locationName,
            address: article.eventDetails.locationAddress || 'Bad Belzig, Germany',
        },
        image: article.hero,
        description: article.excerpt,
        eventAttendanceMode: article.eventDetails.isOnline ? 'https://schema.org/OnlineEventAttendanceMode' : 'https://schema.org/OfflineEventAttendanceMode',
        eventStatus: 'https://schema.org/EventScheduled',
    } : null;

    const createScript = (id: string, data: object) => {
        const script = document.createElement('script');
        script.type = 'application/ld+json';
        script.id = id;
        script.innerHTML = JSON.stringify(data);
        document.head.appendChild(script);
        return script;
    };
    
    const articleScript = createScript('article-schema', schemaData);
    const eventScript = eventSchemaData ? createScript('event-schema', eventSchemaData) : null;
    
    return () => {
        document.getElementById('article-schema')?.remove();
        document.getElementById('event-schema')?.remove();
    };
}, [article]);


  const handleGenerateSummary = async () => {
    if (!article) return;
    setIsSummarizing(true);
    setError(null);
    setSummary(null);
    try {
      const articleText = extractTextFromArticleBody(article.body);
      const result = await generateSummary(articleText);
      setSummary(result);
    } catch (e: any) {
      setError(e.message || 'An unknown error occurred.');
    } finally {
      setIsSummarizing(false);
    }
  };
  
  const handleIncreaseFont = () => {
    setFontSizeIndex((prev) => Math.min(prev + 1, fontSizes.length - 1));
  };

  const handleDecreaseFont = () => {
    setFontSizeIndex((prev) => Math.max(prev - 1, 0));
  };

  const relatedArticles = useMemo(() => {
    if (!article) return [];
    return allArticles
        .filter(a => a.id !== article.id && a.category === article.category)
        .slice(0, 3);
  }, [article, allArticles]);
  
  const firstParagraphBlockIndex = useMemo(() => {
    if (!article?.body) return -1;
    return article.body.findIndex(block => block.type === 'paragraph');
  }, [article?.body]);

  if (!isArticleSafe(article)) {
    return (
      <Card>
        <CardContent>
          <p className="text-sm text-charcoal dark:text-seafoam">Article is not available. Please select another item.</p>
        </CardContent>
      </Card>
    );
  }
  
  const hasHero = article.hero && article.hero.length > 0 && article.hero[0];
  const { generatedUrl, isLoading } = useGeneratedPlaceholder(article, !hasHero);
  const heroUrl = hasHero ? article.hero[0] : generatedUrl;

  const readTime = calculateReadTime(article.body);
  const categoryStyles = categoryStyleMap[article.category] || categoryStyleMap['default'];


  const renderArticleBody = (block: ArticleBodyBlock, index: number) => {
    if (!block || typeof block.type !== 'string') {
        return null;
    }
    switch (block.type) {
        case 'subheading':
            // Add a guard to ensure content is a string before rendering.
            if (typeof block.content !== 'string') return null;
            return (
                <h3 key={index} className="text-2xl font-serif font-bold mt-8 mb-4 text-charcoal dark:text-slate-100 border-b-2 border-slate-200 dark:border-slate-700 pb-2">
                    {renderWithLinks(block.content)}
                </h3>
            );
        case 'video':
            return <VideoEmbed key={index} youtubeId={block.youtubeId} caption={block.caption} />;
        case 'audio':
            return <AudioPlayer key={index} src={block.src} caption={block.caption} />;
        case 'poll':
            return <Poll key={index} articleId={article.id} question={block.question} initialOptions={block.options} />;
        case 'paragraph': {
            // Explicitly handle 'paragraph' and add a guard for content.
            if (typeof block.content !== 'string') return null;

            const isFirstParagraph = index === firstParagraphBlockIndex;
            const dropCapChar = block.content.charAt(0);
            const remainingText = block.content.slice(1);

            return (
                <p key={index} className="dark:text-slate-200">
                    {isFirstParagraph && <span className="float-left text-5xl sm:text-6xl leading-none pr-3 font-serif text-ocean dark:text-cyan-400 -mt-2">{dropCapChar}</span>}
                    {isFirstParagraph ? renderWithLinks(remainingText) : renderWithLinks(block.content)}
                </p>
            );
        }
        default:
            // Safely ignore any unknown or malformed block types.
            return null;
    }
  }


  return (
    // @ts-ignore - The TypeScript types for framer-motion seem to be broken in this environment, causing valid props like 'initial' to be flagged as errors.
    <motion.div
      key={article.id}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
    >
        <button 
            onClick={onClose}
            className="mb-4 px-4 py-2 text-sm font-semibold text-charcoal dark:text-seafoam bg-slate-100 dark:bg-slate-800 rounded-lg hover:bg-seafoam dark:hover:bg-slate-700 transition-colors"
        >
            &larr; Back to Magazine
        </button>

      <div
        className="bg-white dark:bg-slate-900 rounded-2xl shadow-lg overflow-hidden bg-texture-paper border border-poppy/50 dark:border-poppy/60"
      >
        {/* HERO SECTION */}
        <div ref={heroRef} className="relative h-[60vh] min-h-[400px] text-white overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent z-10" />
          {isLoading && <div className="absolute inset-0 w-full h-full bg-slate-200 dark:bg-slate-700 animate-pulse" />}
          {!isLoading && heroUrl && (
            <motion.img
              src={heroUrl}
              alt={article.title}
              loading="eager"
              fetchPriority="high"
              className="absolute inset-0 w-full h-full object-cover scale-110"
              style={{ y, top: "-5%" }}
            />
          )}
          <div className="relative z-20 flex flex-col justify-end h-full p-6 md:p-8">
            <span className={`inline-block px-3 py-1.5 text-sm font-bold uppercase rounded-full ${categoryStyles.bg} ${categoryStyles.text} self-start drop-shadow-md`}>
                {article.category}
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold mt-2 tracking-tight leading-tight drop-shadow-lg">{article.title}</h1>
            <div className="text-sm mt-4 text-slate-200 flex items-center gap-x-4 gap-y-1 flex-wrap drop-shadow-md">
              <span>By {article.author}</span>
              <span className="w-1.5 h-1.5 rounded-full bg-slate-400 hidden sm:block" />
              <span>{fmtDate(article.date)}</span>
              <span className="w-1.5 h-1.5 rounded-full bg-slate-400 hidden sm:block" />
              <span>{readTime} min read</span>
            </div>
          </div>
        </div>
        
        {/* ARTICLE BODY & METADATA */}
        <div className="grid grid-cols-12 gap-8 p-6 md:p-8">
           {/* Main Content */}
          <main className="col-span-12 lg:col-span-9">
             <article className={`prose ${fontSizes[fontSizeIndex]} max-w-prose mx-auto dark:prose-invert prose-headings:text-charcoal dark:prose-headings:text-slate-100`}>
              {article.pullQuote && (
                <div className="not-prose my-6">
                    <div className="relative p-6 bg-ocean/20 dark:bg-ocean/30 rounded-lg">
                        <span className="absolute top-0 left-4 h-full w-1 bg-poppy"></span>
                        <blockquote className="pl-4 italic text-charcoal dark:text-slate-200 text-xl md:text-2xl font-serif">“{article.pullQuote}”</blockquote>
                    </div>
                </div>
              )}
               {article.eventDetails && (
                    <div className="not-prose my-6">
                        <VenueBadge name={article.eventDetails.locationName} address={article.eventDetails.locationAddress} />
                    </div>
                )}
              {article.body.map(renderArticleBody)}
            </article>

            {/* TAGS Section */}
            {article.tags && article.tags.length > 0 && (
              <div className="mt-8 pt-6 border-t border-slate-200 dark:border-slate-700 max-w-prose mx-auto">
                <h3 className="text-sm font-semibold text-slate-600 dark:text-slate-300 mb-2">Tags</h3>
                <div className="flex flex-wrap gap-2">
                  {article.tags.map(tag => (
                    <Tag key={tag} tag={tag} onClick={onSelectTag} />
                  ))}
                </div>
              </div>
            )}

             {/* TL;DR Section */}
            <div className="mt-12 pt-8 border-t border-slate-200 dark:border-slate-700 max-w-prose mx-auto">
              <div className="flex items-center gap-4">
                  <h3 className="text-lg font-serif font-bold text-charcoal dark:text-slate-200">TL;DR</h3>
                  <button 
                      onClick={handleGenerateSummary} 
                      disabled={isSummarizing}
                      className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-white bg-ocean rounded-full shadow-md hover:bg-ocean-dark disabled:bg-slate-400 disabled:cursor-not-allowed transition-all transform hover:scale-105"
                  >
                      <SparklesIcon className="w-4 h-4" />
                      {isSummarizing ? "Generating..." : "Generate with AI"}
                  </button>
              </div>

              {isSummarizing && <div className="mt-4 text-sm text-slate-500 dark:text-slate-300">Thinking...</div>}
              {error && <div className="mt-4 text-sm text-red-600 dark:text-red-300 bg-red-50 dark:bg-red-900/50 p-3 rounded-lg">{error}</div>}
              {summary && (
                // @ts-ignore - The TypeScript types for framer-motion seem to be broken in this environment, causing valid props like 'initial' to be flagged as errors.
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-4 p-4 bg-sunshine/30 dark:bg-sunshine/40 border border-sunshine/20 dark:border-sunshine/30 rounded-lg"
                >
                  <p className="text-charcoal dark:text-seafoam italic">{summary}</p>
                </motion.div>
              )}
            </div>
          </main>
           {/* Share & Font Tools - Sidebar */}
          <aside className="col-span-12 lg:col-span-3">
            <div className="lg:sticky lg:top-24 h-fit">
              <div className="flex flex-col items-start gap-y-4 border-b lg:border-b-0 lg:border-l border-slate-200 dark:border-slate-700 pb-4 lg:pb-0 lg:pl-4">
                  <BookmarkButton articleId={article.id} asText />
                  <ShareButtons article={article} />
                  <FontSizeAdjuster 
                    onIncrease={handleIncreaseFont}
                    onDecrease={handleDecreaseFont}
                    isMin={fontSizeIndex === 0}
                    isMax={fontSizeIndex === fontSizes.length - 1}
                  />
              </div>
            </div>
          </aside>
        </div>
        
        {/* RELATED ARTICLES */}
        {relatedArticles.length > 0 && (
          <div className="p-6 md:p-8 border-t border-slate-200 dark:border-slate-700 bg-ocean/10 dark:bg-ocean/20">
            <h3 className="text-2xl font-serif font-bold text-charcoal dark:text-slate-200 mb-6 text-center">More in {article.category}</h3>
            <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {relatedArticles.map(navArticle => (
                  <ArticleCard 
                    key={navArticle.id} 
                    article={navArticle} 
                    onClick={() => onSelectArticle(navArticle.id)}
                  />
              ))}
            </div>
          </div>
        )}
      </div>
      <Navigation
          onPrev={onPrev}
          onNext={onNext}
          isFirst={currentIndex === 0}
          isLast={currentIndex !== null && currentIndex >= totalArticles - 1}
      />
    </motion.div>
  );
}