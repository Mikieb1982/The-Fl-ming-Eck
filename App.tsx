
import React, { useEffect, useMemo, useState, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";

import { Article, Post, Reply } from "./types";
import { sortByDateDesc, fuzzySearch, extractTextFromArticleBody } from "./utils/helpers";
import * as api from './services/apiService';
import { BRAND } from './constants';
import ArticleView from "./components/ArticleView";
import Navigation from "./components/Navigation";
import EventsCalendar from "./components/EventsCalendar";
import SearchResults from "./components/SearchResults";
import CookieConsent from "./components/CookieConsent";
import LegalView from "./components/LegalView";
import Impressum from "./components/Impressum";
import PrivacyPolicy from "./components/PrivacyPolicy";
import CommunityView from "./components/CommunityView";
import BackToTopButton from "./components/BackToTopButton";
import DirectoryView from "./components/DirectoryView";
import HomePage from "./components/HomePage";
import Header from "./components/Header";
import BookmarksView from "./components/BookmarksView";
import WeatherWidget from "./components/WeatherWidget";
import ProfileView from "./components/ProfileView";

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
  const [isBookmarksOpen, setIsBookmarksOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState('All');
  const [activeTag, setActiveTag] = useState<string | null>(null);
  const [legalPage, setLegalPage] = useState<"impressum" | "privacy" | null>(null);
  const [isBackToTopVisible, setIsBackToTopVisible] = useState(false);

  useEffect(() => {
    setArticles(api.getArticles());
    setPosts(api.getPosts());
    setIsLoading(false);
  }, []);

  const sortedArticles = useMemo(() => sortByDateDesc(articles), [articles]);

  const handleClearTag = useCallback(() => {
    setActiveTag(null);
  }, []);

  const handleGoHome = useCallback(() => {
    setActiveIndex(null);
    setActiveCategory('All');
    setSearchQuery('');
    setIsCommunityOpen(false);
    setIsDirectoryOpen(false);
    setIsBookmarksOpen(false);
    setIsProfileOpen(false);
    setActiveTag(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
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
    setIsBookmarksOpen(false);
    setIsProfileOpen(false);
    // Don't close community view, let it filter internally
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const handleSelectArticle = useCallback((index: number) => {
    setActiveIndex(index);
    setIsCommunityOpen(false);
    setIsDirectoryOpen(false);
    setIsBookmarksOpen(false);
    setIsProfileOpen(false);
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
        if(legalPage) {
          setLegalPage(null);
        } else if (isProfileOpen) {
          setIsProfileOpen(false);
        } else if (isBookmarksOpen) {
          setIsBookmarksOpen(false);
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
  }, [nextArticle, prevArticle, handleCloseArticle, activeIndex, legalPage, isCommunityOpen, isDirectoryOpen, isBookmarksOpen, isProfileOpen]);
  
  useEffect(() => {
    const toggleVisibility = () => {
      setIsBackToTopVisible(window.scrollY > 500);
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

  const isHomePage = !searchQuery.trim() && activeCategory === 'All' && !activeTag && !currentArticle && !isCommunityOpen && !isDirectoryOpen && !isBookmarksOpen && !isProfileOpen;

  const openCommunity = () => {
    setIsCommunityOpen(true);
    setActiveIndex(null);
    setSearchQuery('');
    setIsDirectoryOpen(false);
    setIsBookmarksOpen(false);
    setIsProfileOpen(false);
    setActiveTag(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const openDirectory = () => {
      setIsDirectoryOpen(true);
      setActiveIndex(null);
      setSearchQuery('');
      setIsCommunityOpen(false);
      setIsBookmarksOpen(false);
      setIsProfileOpen(false);
      setActiveTag(null);
      window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  
  const openBookmarks = () => {
      setIsBookmarksOpen(true);
      setActiveIndex(null);
      setSearchQuery('');
      setIsCommunityOpen(false);
      setIsDirectoryOpen(false);
      setIsProfileOpen(false);
      setActiveTag(null);
      window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  
  const openProfile = () => {
      setIsProfileOpen(true);
      setActiveIndex(null);
      setSearchQuery('');
      setIsCommunityOpen(false);
      setIsDirectoryOpen(false);
      setIsBookmarksOpen(false);
      setActiveTag(null);
      window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSearchChange = useCallback((query: string) => {
    setSearchQuery(query);
    if (query.trim()) {
      setIsCommunityOpen(false);
      setIsDirectoryOpen(false);
      setIsBookmarksOpen(false);
      setIsProfileOpen(false);
      setActiveIndex(null);
      setActiveTag(null);
    }
  }, []);

  return (
    <div>
      <Header 
        onGoHome={handleGoHome}
        onToggleCalendar={() => setIsCalendarOpen(prev => !prev)}
        onToggleCommunity={openCommunity}
        onToggleDirectory={openDirectory}
        onToggleBookmarks={openBookmarks}
        onToggleProfile={openProfile}
        searchQuery={searchQuery}
        onSearchChange={handleSearchChange}
      />
      <div className="max-w-7xl mx-auto px-4 lg:px-8 pb-4 pt-24 md:pt-28">
        <EventsCalendar 
          isOpen={isCalendarOpen} 
          onClose={() => setIsCalendarOpen(false)} 
          onSelectArticle={handleSelectArticleFromEvent}
        />
        
        {isHomePage && (
          <div className="mb-6">
            <WeatherWidget />
          </div>
        )}

        <main>
            {isLoading ? (
              <div className="flex justify-center items-center py-20">
                <p className="text-slate-400">Loading The Fläming Eck...</p>
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
                  ) : isBookmarksOpen ? (
                    <motion.div key="bookmarksView">
                        <BookmarksView 
                            articles={sortedArticles}
                            onSelectArticle={handleSelectArticleById}
                            onClose={() => setIsBookmarksOpen(false)}
                        />
                    </motion.div>
                  ) : isProfileOpen ? (
                    <motion.div key="profileView">
                      <ProfileView 
                        posts={posts}
                        articles={sortedArticles}
                        onSelectArticle={handleSelectArticleById}
                        onClose={() => setIsProfileOpen(false)}
                      />
                    </motion.div>
                  ) : isHomePage ? (
                     <motion.div key="homePage">
                        <HomePage
                            articles={sortedArticles}
                            onSelectArticle={handleSelectArticleById}
                        />
                     </motion.div>
                  ) : (
                    <motion.div key="filteredView">
                      {displayedArticles.length > 0 ? (
                        <SearchResults
                            articles={displayedArticles}
                            onSelectArticle={handleSelectArticleById}
                            searchQuery={searchQuery}
                        />
                      ) : (
                        <>
                          <h2 className="text-2xl font-serif font-bold text-slate-800 dark:text-slate-200 mb-6">
                            Results for "{searchQuery}"
                          </h2>
                          <p className="text-slate-500 dark:text-slate-400">
                            No articles found matching your criteria.
                          </p>
                        </>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )}
          </main>
        {/* FIX: Removed a misplaced closing </div> tag that broke the JSX structure and caused multiple root elements. */}
        <footer className="text-center text-slate-500 dark:text-slate-400 text-sm py-8 mt-12 border-t border-slate-200 dark:border-slate-700 max-w-7xl mx-auto px-4 lg:px-8">
          <div className="flex justify-center gap-x-6 gap-y-2 flex-wrap mb-4">
            <button onClick={() => setLegalPage('impressum')} className="hover:text-sandstone-ochre transition-colors">Impressum / Legal Notice</button>
            <button onClick={() => setLegalPage('privacy')} className="hover:text-sandstone-ochre transition-colors">Datenschutzerklärung / Privacy Policy</button>
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
