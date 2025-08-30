
import React, { useEffect, useMemo, useState, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";

import { Article, Post, Reply } from "./types";
import { sortByDateDesc, fuzzySearch, extractTextFromArticleBody } from "./utils/helpers";
import * as api from './services/apiService';
import { BRAND } from './constants';
import Masthead from "./components/Masthead";
import ArticleView from "./components/ArticleView";
import Navigation from "./components/Navigation";
import ArticleGrid from "./components/ArticleGrid";
import EventsCalendar from "./components/EventsCalendar";
import CategoryNav from "./components/CategoryNav";
import SearchResults from "./components/SearchResults";
import CookieConsent from "./components/CookieConsent";
import LegalView from "./components/LegalView";
import Impressum from "./components/Impressum";
import PrivacyPolicy from "./components/PrivacyPolicy";
import CommunityView from "./components/CommunityView";
import BackToTopButton from "./components/BackToTopButton";
import DirectoryView from "./components/DirectoryView";
import PersonalizeView from "./components/PersonalizeView";

const USER_INTERESTS_KEY = 'flaming-eck-user-interests';

export default function App() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [isCommunityOpen, setIsCommunityOpen] = useState(false);
  const [isDirectoryOpen, setIsDirectoryOpen] = useState(false);
  const [isPersonalizeOpen, setIsPersonalizeOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState('All');
  const [activeTag, setActiveTag] = useState<string | null>(null);
  const [legalPage, setLegalPage] = useState<"impressum" | "privacy" | null>(null);
  const [isBackToTopVisible, setIsBackToTopVisible] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [userInterests, setUserInterests] = useState<string[]>([]);

  useEffect(() => {
    setArticles(api.getArticles());
    setPosts(api.getPosts());
    try {
        const storedInterests = localStorage.getItem(USER_INTERESTS_KEY);
        if (storedInterests) {
            setUserInterests(JSON.parse(storedInterests));
        }
    } catch (error) {
        console.error("Failed to load user interests:", error);
    }
    setIsLoading(false);
  }, []);
  
  const handleSaveInterests = (interests: string[]) => {
      setUserInterests(interests);
      try {
          localStorage.setItem(USER_INTERESTS_KEY, JSON.stringify(interests));
      } catch (error) {
          console.error("Failed to save user interests:", error);
      }
  };

  const sortedArticles = useMemo(() => sortByDateDesc(articles), [articles]);
  
  const uniqueCategories = useMemo(() => {
    return ['All', ...Array.from(new Set(articles.map(a => a.category)))];
  }, [articles]);

  const handleClearTag = useCallback(() => {
    setActiveTag(null);
  }, []);
  
  const handleSelectCategory = useCallback((category: string) => {
    setActiveCategory(category);
    setActiveTag(null); // Clear tag when category changes
  }, []);

  const handleGoHome = useCallback(() => {
    setActiveIndex(null);
    setActiveCategory('All');
    setSearchQuery('');
    setIsCommunityOpen(false);
    setIsDirectoryOpen(false);
    setActiveTag(null);
  }, []);

  const handleCloseArticle = useCallback(() => {
    setActiveIndex(null);
  }, []);

  const handleSelectTag = useCallback((tag: string) => {
    setActiveTag(tag);
    setSearchQuery('');
    setActiveCategory('All');
    setActiveIndex(null);
    setIsDirectoryOpen(false);
    // Don't close community view, let it filter internally
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const handleSelectArticle = useCallback((index: number) => {
    setActiveIndex(index);
    setIsCommunityOpen(false);
    setIsDirectoryOpen(false);
    setActiveTag(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const handleSelectArticleById = useCallback((id: string) => {
    const index = sortedArticles.findIndex(a => a.id === id);
    if (index !== -1) {
      handleSelectArticle(index);
    }
  }, [sortedArticles, handleSelectArticle]);
  
  const handleSelectArticleFromEvent = useCallback((id: string) => {
    setIsCalendarOpen(false); // Close calendar first
    // Use a small timeout to let the calendar close animation finish before the page scrolls up
    setTimeout(() => {
        handleSelectArticleById(id);
    }, 300);
  }, [handleSelectArticleById]);

  const handleOpenCommunity = () => {
    setActiveIndex(null);
    setSearchQuery('');
    setActiveTag(null);
    setIsCommunityOpen(true);
    setIsDirectoryOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenDirectory = () => {
    setActiveIndex(null);
    setSearchQuery('');
    setActiveTag(null);
    setIsCommunityOpen(false);
    setIsDirectoryOpen(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleAddPost = (post: Omit<Post, 'id' | 'timestamp' | 'replies'>) => {
    const newPost: Post = {
        ...post,
        id: `post-${Date.now()}`,
        timestamp: new Date().toISOString(),
        replies: [],
    };
    setPosts(prevPosts => {
      const updatedPosts = [newPost, ...prevPosts];
      api.savePosts(updatedPosts);
      return updatedPosts;
    });
  };

  const handleAddReply = (postId: string, reply: Omit<Reply, 'id' | 'timestamp'>) => {
      const newReply: Reply = {
          ...reply,
          id: `reply-${Date.now()}`,
          timestamp: new Date().toISOString(),
      };
      setPosts(currentPosts => {
        const updatedPosts = currentPosts.map(p => {
            if (p.id === postId) {
                return { ...p, replies: [...p.replies, newReply] };
            }
            return p;
        });
        api.savePosts(updatedPosts);
        return updatedPosts;
      });
  };
  
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const articleId = params.get('article');
    if (articleId && articles.length > 0) {
      handleSelectArticleById(articleId);
    }
  }, [handleSelectArticleById, articles]);

  const handleSearchChange = useCallback((query: string) => {
    setSearchQuery(query);
    setActiveCategory('All'); // Reset category when searching
    setActiveTag(null); // Reset tag when searching
    setIsCommunityOpen(false); // Close community when searching
    setIsDirectoryOpen(false);
    if (activeIndex !== null) {
        handleCloseArticle();
    }
  }, [activeIndex, handleCloseArticle]);

  const displayedArticles = useMemo(() => {
    const query = searchQuery.trim();
    
    let filtered = sortedArticles;

    if (activeTag) {
        return sortedArticles.filter(article => article.tags?.includes(activeTag));
    }

    if (activeCategory !== 'All') {
        filtered = filtered.filter(article => article.category === activeCategory);
    }

    if (!query) {
        return filtered;
    }

    return filtered.filter(article =>
        fuzzySearch(query, article.title) ||
        fuzzySearch(query, article.excerpt) ||
        fuzzySearch(query, extractTextFromArticleBody(article.body))
    );
  }, [searchQuery, sortedArticles, activeCategory, activeTag]);

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
      if (e.key === "Escape") {
        if (isPersonalizeOpen) {
            setIsPersonalizeOpen(false);
        } else if(legalPage) {
          setLegalPage(null);
        } else if (isDirectoryOpen) {
          setIsDirectoryOpen(false);
        } else if (isCommunityOpen) {
          setIsCommunityOpen(false);
        } else if (activeIndex !== null) {
          handleCloseArticle();
        }
      }
      if (activeIndex !== null) {
        if (e.key === "ArrowRight") nextArticle();
        if (e.key === "ArrowLeft") prevArticle();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [nextArticle, prevArticle, handleCloseArticle, activeIndex, legalPage, isCommunityOpen, isDirectoryOpen, isPersonalizeOpen]);
  
  useEffect(() => {
    const toggleVisibility = () => {
      setIsBackToTopVisible(window.scrollY > 500);
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', toggleVisibility);

    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = useCallback(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }, []);

  const currentArticle = activeIndex !== null ? sortedArticles[activeIndex] : null;
  
  useEffect(() => {
    const baseCanonicalUrl = window.location.origin + window.location.pathname;
    const defaultTitle = 'The Fläming Eck Magazine';
    const defaultDescription = "An interactive digital magazine for Bad Belzig and the Hoher Fläming, featuring AI-powered summaries for articles.";

    let canonicalLink = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!canonicalLink) {
        canonicalLink = document.createElement('link');
        canonicalLink.rel = 'canonical';
        document.head.appendChild(canonicalLink);
    }
    
    let metaDescription = document.querySelector<HTMLMetaElement>('meta[name="description"]');
    if (!metaDescription) {
        metaDescription = document.createElement('meta');
        metaDescription.name = 'description';
        document.head.appendChild(metaDescription);
    }

    if (currentArticle) {
        document.title = `${currentArticle.title} | ${BRAND.title}`;
        metaDescription.setAttribute('content', currentArticle.excerpt);
        canonicalLink.setAttribute('href', `${baseCanonicalUrl}?article=${currentArticle.id}`);
    } else {
        document.title = defaultTitle;
        metaDescription.setAttribute('content', defaultDescription);
        canonicalLink.setAttribute('href', baseCanonicalUrl);
    }
  }, [currentArticle]);

  const trimmedQuery = searchQuery.trim();

  return (
    <div className="bg-off-white dark:bg-slate-900 font-sans text-charcoal dark:text-slate-300">
      {/* Sticky Header Wrapper */}
      <div className="sticky top-0 z-30 w-full bg-off-white/95 dark:bg-slate-900/95 backdrop-blur-sm transition-colors duration-300 border-b border-slate-200 dark:border-slate-700">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <Masthead 
            onGoHome={handleGoHome}
            onOpenPersonalize={() => setIsPersonalizeOpen(true)}
            isScrolled={isScrolled}
          />
        </div>
        {!currentArticle && !isCommunityOpen && !isDirectoryOpen && (
            <CategoryNav 
                categories={uniqueCategories}
                activeCategory={activeCategory}
                onSelectCategory={handleSelectCategory}
                onOpenCalendar={() => setIsCalendarOpen(true)}
                onOpenCommunity={handleOpenCommunity}
                onOpenDirectory={handleOpenDirectory}
                searchQuery={searchQuery}
                onSearchChange={handleSearchChange}
            />
        )}
      </div>

      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        <EventsCalendar 
          isOpen={isCalendarOpen} 
          onClose={() => setIsCalendarOpen(false)} 
          onSelectArticle={handleSelectArticleFromEvent}
        />
        
        <PersonalizeView 
            isOpen={isPersonalizeOpen}
            onClose={() => setIsPersonalizeOpen(false)}
            onSave={handleSaveInterests}
            allCategories={uniqueCategories}
            currentInterests={userInterests}
        />
        
        <div className="mt-6">
          <main>
            {isLoading ? (
              <div className="flex justify-center items-center py-20">
                <p className="text-slate-500 dark:text-slate-400">Loading The Fläming Eck...</p>
              </div>
            ) : (
              <div className="relative">
                <AnimatePresence mode="wait">
                  {currentArticle ? (
                    <motion.div key="articleView">
                      <ArticleView 
                        article={currentArticle} 
                        onClose={handleCloseArticle}
                        allArticles={sortedArticles}
                        onSelectArticle={handleSelectArticleById}
                        onSelectTag={handleSelectTag}
                      />
                      <Navigation
                        onPrev={prevArticle}
                        onNext={nextArticle}
                        isFirst={activeIndex === 0}
                        isLast={activeIndex !== null && activeIndex >= sortedArticles.length - 1}
                      />
                    </motion.div>
                  ) : isCommunityOpen ? (
                     <motion.div key="communityView">
                        <CommunityView 
                          posts={posts}
                          allArticles={sortedArticles}
                          onAddPost={handleAddPost}
                          onAddReply={handleAddReply}
                          onSelectArticle={handleSelectArticleById}
                          activeTag={activeTag}
                          onSelectTag={handleSelectTag}
                          onClearTag={handleClearTag}
                          onClose={() => setIsCommunityOpen(false)}
                        />
                    </motion.div>
                  ) : isDirectoryOpen ? (
                    <motion.div key="directoryView">
                      <DirectoryView 
                        onClose={() => setIsDirectoryOpen(false)}
                      />
                    </motion.div>
                  ) : (
                    <motion.div key="articleGrid">
                      {trimmedQuery && (
                        <h2 className="text-2xl font-serif font-bold text-charcoal dark:text-slate-200 mb-6">
                          Search Results for "{trimmedQuery}"
                        </h2>
                      )}

                      {displayedArticles.length > 0 ? (
                          trimmedQuery ? (
                              <SearchResults
                                  articles={displayedArticles}
                                  onSelectArticle={handleSelectArticleById}
                              />
                          ) : (
                              <ArticleGrid
                                  articles={displayedArticles}
                                  onSelectArticle={handleSelectArticleById}
                                  activeCategory={activeCategory}
                                  onSelectCategory={handleSelectCategory}
                                  activeTag={activeTag}
                                  onClearTag={handleClearTag}
                                  onSelectTag={handleSelectTag}
                                  userInterests={userInterests}
                              />
                          )
                      ) : (
                        <p className="text-slate-600 dark:text-slate-400">
                          No articles found matching your criteria.
                        </p>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )}
          </main>
        </div>

        <footer className="text-center text-slate-500 dark:text-slate-400 text-sm py-8 mt-12 border-t border-slate-200 dark:border-slate-700">
          <div className="flex justify-center gap-x-6 gap-y-2 flex-wrap mb-4">
            <button onClick={() => setLegalPage('impressum')} className="hover:text-sandstone-ochre dark:hover:text-sandstone-ochre transition-colors">Impressum / Legal Notice</button>
            <button onClick={() => setLegalPage('privacy')} className="hover:text-sandstone-ochre dark:hover:text-sandstone-ochre transition-colors">Datenschutzerklärung / Privacy Policy</button>
          </div>
          © 2025 The Fläming Eck. Edited in English. Facts reviewed prior to publication.
        </footer>
      </div>

      <AnimatePresence>
        {legalPage && (
          <LegalView 
            title={legalPage === 'impressum' ? 'Impressum / Legal Notice' : 'Datenschutzerklärung / Privacy Policy'} 
            onClose={() => setLegalPage(null)}
          >
            {legalPage === 'impressum' ? <Impressum /> : <PrivacyPolicy />}
          </LegalView>
        )}
      </AnimatePresence>

      <CookieConsent onShowPrivacy={() => setLegalPage('privacy')} />
      
      <AnimatePresence>
        {isBackToTopVisible && <BackToTopButton onClick={scrollToTop} />}
      </AnimatePresence>
    </div>
  );
}