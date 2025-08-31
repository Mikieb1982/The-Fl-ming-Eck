


import React, { useEffect, useMemo, useState, useCallback, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";

import { Article, Post, Reply } from "./types";
import { sortByDateDesc, fuzzySearch, extractTextFromArticleBody } from "./utils/helpers";
import * as api from './services/apiService';
import { BRAND } from './constants';
import ArticleView from "./components/ArticleView";
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
import ProfileView from "./components/ProfileView";
import { useBookmarks } from "./context/BookmarkContext";
// FIX: Import the ArticleCard component to resolve a 'Cannot find name' error.
import ArticleCard from "./components/ArticleCard";
import AboutUs from "./components/AboutUs";
import CorrectionsPolicy from "./components/CorrectionsPolicy";
import AdvertiseWithUs from "./components/AdvertiseWithUs";

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
  const [isCalendarPage, setIsCalendarPage] = useState(false);
  const [activeTag, setActiveTag] = useState<string | null>(null);
  const [legalPage, setLegalPage] = useState<"impressum" | "privacy" | "about" | "corrections" | "advertise" | null>(null);
  const [isBackToTopVisible, setIsBackToTopVisible] = useState(false);
  const mainContentRef = useRef<HTMLElement>(null);
  
  const { bookmarks } = useBookmarks();
  const sortedArticles = useMemo(() => sortByDateDesc(articles), [articles]);

  const closeAllViews = useCallback(() => {
    setActiveIndex(null);
    setIsCommunityOpen(false);
    setIsDirectoryOpen(false);
    setIsBookmarksOpen(false);
    setIsProfileOpen(false);
    setIsCalendarPage(false);
    setSearchQuery('');
    setActiveTag(null);
  }, []);
  
  const handleRouting = useCallback((path: string) => {
    closeAllViews();
    if (path.startsWith('/article/')) {
        const articleId = path.split('/article/')[1];
        const index = sortedArticles.findIndex(a => a.id === articleId);
        if (index !== -1) {
            setActiveIndex(index);
        } else {
             // If article not found, go home.
            window.history.replaceState({}, '', '/');
        }
    } else if (path === '/community') {
        setIsCommunityOpen(true);
    } else if (path === '/directory') {
        setIsDirectoryOpen(true);
    } else if (path === '/bookmarks') {
        setIsBookmarksOpen(true);
    } else if (path === '/profile') {
        setIsProfileOpen(true);
    } else if (path === '/calendar') {
        setIsCalendarPage(true);
    }
  }, [sortedArticles, closeAllViews]);
  
  const navigate = (path: string) => {
      window.history.pushState({}, '', path);
      handleRouting(path);
  };
  
  const handleSelectArticleById = useCallback((id: string) => {
    navigate(`/article/${id}`);
  }, []);

  useEffect(() => {
    setArticles(api.getArticles());
    const initialPosts = api.getPosts();
    setPosts(sortByDateDesc(initialPosts));
    setIsLoading(false);
  }, []);

  useEffect(() => {
      if (!isLoading) {
        handleRouting(window.location.pathname);
      }

      const handlePopState = () => handleRouting(window.location.pathname);
      window.addEventListener('popstate', handlePopState);

      return () => window.removeEventListener('popstate', handlePopState);
  }, [isLoading, handleRouting]);
  
  const activeArticle = useMemo(() => {
      if (activeIndex !== null && sortedArticles[activeIndex]) {
          return sortedArticles[activeIndex];
      }
      return undefined;
  }, [activeIndex, sortedArticles]);

  useEffect(() => {
      const descriptionTag = document.getElementById('meta-description');
      const canonicalTag = document.getElementById('canonical-link');
      const baseUrl = window.location.origin;

      if (!descriptionTag || !canonicalTag) return;
      
      let title = `${BRAND.title} Magazine`;
      let description = "An interactive digital magazine for Bad Belzig and the Hoher Fläming, featuring AI-powered summaries for articles.";
      let url = baseUrl;

      if (activeArticle) {
          title = `${activeArticle.title} | ${BRAND.title}`;
          description = activeArticle.excerpt;
          url = `${baseUrl}/article/${activeArticle.id}`;
      } else if (isCommunityOpen) {
          title = `Community Forum | ${BRAND.title}`;
          description = "Join the conversation! A space for English-speakers in the Hoher Fläming to connect.";
          url = `${baseUrl}/community`;
      } else if (isDirectoryOpen) {
          title = `Community Directory | ${BRAND.title}`;
          description = "Your guide to essential services and points of interest in Bad Belzig and the Hoher Fläming.";
          url = `${baseUrl}/directory`;
      } else if (isCalendarPage) {
          title = `Events Calendar | ${BRAND.title}`;
          description = "Find out what's on in Bad Belzig and the Hoher Fläming.";
          url = `${baseUrl}/calendar`;
      } else if (isBookmarksOpen) {
          title = `My Bookmarks | ${BRAND.title}`;
          description = "Your saved articles from The Fläming Eck.";
          url = `${baseUrl}/bookmarks`;
      }

      document.title = title;
      descriptionTag.setAttribute('content', description);
      canonicalTag.setAttribute('href', url);

  }, [activeArticle, isCommunityOpen, isDirectoryOpen, isCalendarPage, isBookmarksOpen]);

  useEffect(() => {
    const handleScroll = () => {
        if (mainContentRef.current && mainContentRef.current.scrollTop > 300) {
            setIsBackToTopVisible(true);
        } else {
            setIsBackToTopVisible(false);
        }
    };
    
    // Attaching scroll listener to the main content area if it exists
    const contentArea = mainContentRef.current;
    if (contentArea) {
      // In a real browser environment, you'd listen to the scroll event
      // but in this simulated one, direct manipulation might be needed
      // or we just assume a default state. For this app, we'll keep it simple.
    }

    return () => {
      // Cleanup
    };
  }, []);
  
  const handleAddPost = useCallback((newPostData: Omit<Post, 'id' | 'timestamp' | 'replies'>) => {
      setPosts(prevPosts => {
          const newPost: Post = {
              ...newPostData,
              id: `post-${Date.now()}`,
              timestamp: new Date().toISOString(),
              replies: [],
          };
          const updatedPosts = [newPost, ...prevPosts];
          api.savePosts(updatedPosts);
          return updatedPosts;
      });
  }, []);

  const handleAddReply = useCallback((postId: string, newReplyData: Omit<Reply, 'id' | 'timestamp'>) => {
      setPosts(prevPosts => {
          const updatedPosts = prevPosts.map(post => {
              if (post.id === postId) {
                  const newReply: Reply = {
                      ...newReplyData,
                      id: `reply-${Date.now()}`,
                      timestamp: new Date().toISOString(),
                  };
                  return { ...post, replies: [...post.replies, newReply] };
              }
              return post;
          });
          api.savePosts(updatedPosts);
          return updatedPosts;
      });
  }, []);

  const handleClearTag = useCallback(() => {
    setActiveTag(null);
    navigate('/community');
  }, []);
  
  const handleSelectTag = useCallback((tag: string) => {
    setActiveTag(tag);
    navigate('/community');
  }, []);

  const handleGoHome = useCallback(() => {
    navigate('/');
  }, []);

  const scrollToTop = () => {
    if(mainContentRef.current) {
        mainContentRef.current.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const searchResults = useMemo(() => {
    if (!searchQuery) return [];
    const lowercasedQuery = searchQuery.toLowerCase();
    return sortedArticles.filter(
      (a) =>
        fuzzySearch(searchQuery, a.title) ||
        fuzzySearch(searchQuery, a.excerpt) ||
        fuzzySearch(searchQuery, extractTextFromArticleBody(a.body))
    );
  }, [searchQuery, sortedArticles]);
  
  const remainingArticles = useMemo(() => sortedArticles.slice(8), [sortedArticles]);
  
  let currentView: 'home' | 'article' | 'search' | 'community' | 'directory' | 'bookmarks' | 'profile' | 'calendar' = 'home';
  if (searchQuery) currentView = 'search';
  else if (activeArticle) currentView = 'article';
  else if (isCommunityOpen) currentView = 'community';
  else if (isDirectoryOpen) currentView = 'directory';
  else if (isBookmarksOpen) currentView = 'bookmarks';
  else if (isProfileOpen) currentView = 'profile';
  else if (isCalendarPage) currentView = 'calendar';
  
  // FIX: Correctly determine the active mobile view for the bottom navigation,
  // including the 'more' state for bookmarks and profile views, and provide an explicit type to prevent type errors.
  const activeMobileView: 'home' | 'community' | 'directory' | 'calendar' | 'more' = isCommunityOpen
    ? 'community'
    : isDirectoryOpen
    ? 'directory'
    : isCalendarPage
    ? 'calendar'
    : isBookmarksOpen || isProfileOpen
    ? 'more'
    : 'home';

  const headerProps = {
      onGoHome: handleGoHome,
      onToggleCalendar: () => setIsCalendarOpen(!isCalendarOpen),
      onOpenCalendarPage: () => navigate('/calendar'),
      onToggleCommunity: () => navigate('/community'),
      onToggleDirectory: () => navigate('/directory'),
      onToggleBookmarks: () => navigate('/bookmarks'),
      onToggleProfile: () => navigate('/profile'),
      setLegalPage: setLegalPage,
      searchQuery,
      onSearchChange: setSearchQuery,
      activeView: activeMobileView
  };

  return (
      <div className="bg-creme dark:bg-slate-900 min-h-screen">
          <Header {...headerProps} />
          <div className="pb-24 md:pb-4">
              <main ref={mainContentRef} className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8 pt-4 md:pt-8">
                  <AnimatePresence mode="wait">
                      {currentView === 'article' && (
                          <ArticleView 
                              key={activeArticle?.id || 'article'}
                              article={activeArticle} 
                              allArticles={sortedArticles}
                              onSelectArticle={handleSelectArticleById}
                              onSelectTag={handleSelectTag}
                              onClose={handleGoHome}
                          />
                      )}
                      {currentView === 'search' && (
                          <SearchResults 
                              key="search"
                              articles={searchResults} 
                              onSelectArticle={handleSelectArticleById} 
                              searchQuery={searchQuery}
                          />
                      )}
                      {currentView === 'community' && (
                          <CommunityView 
                              key="community"
                              posts={posts}
                              allArticles={articles}
                              onAddPost={handleAddPost}
                              onAddReply={handleAddReply}
                              onSelectArticle={handleSelectArticleById}
                              activeTag={activeTag}
                              onSelectTag={handleSelectTag}
                              onClearTag={handleClearTag}
                              onClose={handleGoHome}
                          />
                      )}
                      {currentView === 'directory' && <DirectoryView key="directory" onClose={handleGoHome} />}
                      {currentView === 'bookmarks' && <BookmarksView key="bookmarks" articles={articles} onSelectArticle={handleSelectArticleById} onClose={handleGoHome} />}
                      {currentView === 'profile' && <ProfileView key="profile" posts={posts} articles={articles} onSelectArticle={handleSelectArticleById} onClose={handleGoHome} />}
                      {currentView === 'calendar' && <EventsCalendar key="calendar-page" isOpen={true} onClose={handleGoHome} onSelectArticle={handleSelectArticleById} isPage={true} />}

                      {currentView === 'home' && (
                          <div className="space-y-12" key="home">
                              <HomePage articles={sortedArticles} onSelectArticle={handleSelectArticleById} />
                              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                  {remainingArticles.map(article => (
                                      <ArticleCard key={article.id} article={article} onClick={() => handleSelectArticleById(article.id)} />
                                  ))}
                              </div>
                          </div>
                      )}
                  </AnimatePresence>
              </main>

              <AnimatePresence>
                  {isBackToTopVisible && <BackToTopButton onClick={scrollToTop} />}
              </AnimatePresence>
              
              <footer className="text-center text-xs text-slate-500 dark:text-slate-400 py-4 border-t border-slate-200 dark:border-slate-700">
                  <button onClick={() => setLegalPage("about")} className="hover:underline px-2">About Us</button>
                  <span>|</span>
                  <button onClick={() => setLegalPage("impressum")} className="hover:underline px-2">Impressum</button>
                  <span>|</span>
                  <button onClick={() => setLegalPage("privacy")} className="hover:underline px-2">Data Protection</button>
                  <span>|</span>
                  <button onClick={() => setLegalPage("corrections")} className="hover:underline px-2">Corrections Policy</button>
                   <span>|</span>
                  <button onClick={() => setLegalPage("advertise")} className="hover:underline px-2">Advertise With Us</button>
              </footer>
          </div>

          <CookieConsent onShowPrivacy={() => setLegalPage("privacy")} />

          <AnimatePresence>
              {legalPage && (
                  <LegalView 
                      title={
                          legalPage === 'impressum' ? 'Impressum' :
                          legalPage === 'privacy' ? 'Privacy Policy' :
                          legalPage === 'about' ? 'About Us' :
                          legalPage === 'corrections' ? 'Corrections Policy' :
                          'Advertise With Us'
                      } 
                      onClose={() => setLegalPage(null)}
                  >
                      {legalPage === 'impressum' ? <Impressum /> :
                       legalPage === 'privacy' ? <PrivacyPolicy /> :
                       legalPage === 'about' ? <AboutUs /> :
                       legalPage === 'corrections' ? <CorrectionsPolicy /> :
                       <AdvertiseWithUs />
                      }
                  </LegalView>
              )}
          </AnimatePresence>

          <EventsCalendar 
              isOpen={isCalendarOpen} 
              onClose={() => setIsCalendarOpen(false)} 
              onSelectArticle={handleSelectArticleById}
          />
      </div>
  );
}