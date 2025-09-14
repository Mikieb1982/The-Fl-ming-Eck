
import React, { useEffect, useMemo, useState, useCallback, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";

import { Article, Post, Reply } from "./types";
import { sortByDateDesc, fuzzySearch, extractTextFromArticleBody, sortByTimestampDesc } from "./utils/helpers";
import * as api from './services/apiService';
import { BRAND } from './constants';
import ArticleView from "./components/ArticleView";
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
import RaffleChecker from "./components/RaffleChecker";
import EventsCalendar from "./components/EventsCalendar";
// FIX: Correct import path for PosterLayout to resolve module error.
import PosterLayout from "./components/poster/PosterLayout";
import MobileNewspaperView from "./components/MobileNewspaperView";

// FIX: Refactored to a standard function declaration to resolve potential linter parsing issues.
function useMediaQuery(query: string) {
  const [matches, setMatches] = useState(false);
  useEffect(() => {
    const media = window.matchMedia(query);
    if (media.matches !== matches) {
      setMatches(media.matches);
    }
    const listener = () => setMatches(media.matches);
    window.addEventListener('resize', listener);
    return () => window.removeEventListener('resize', listener);
  }, [matches, query]);
  return matches;
};

// FIX: Refactored to a standard function declaration with an explicit generic type to resolve potential linter parsing issues with arrow functions.
function usePrevious<T>(value: T): T | undefined {
  // FIX: Provide an explicit undefined initial value to `useRef`.
  // The error "Expected 1 arguments, but got 0" suggests the TypeScript
  // environment requires an explicit initial value for `useRef`.
  const ref = useRef<T | undefined>(undefined);
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}

const articleVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? '100%' : '-100%',
    opacity: 0,
    position: 'absolute',
  }),
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1,
    position: 'relative',
  },
  exit: (direction: number) => ({
    zIndex: 0,
    x: direction < 0 ? '100%' : '-100%',
    opacity: 0,
    position: 'absolute',
  }),
};


export default function App() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [isCommunityOpen, setIsCommunityOpen] = useState(false);
  const [isDirectoryOpen, setIsDirectoryOpen] = useState(false);
  const [isRaffleOpen, setIsRaffleOpen] = useState(false);
  const [isBookmarksOpen, setIsBookmarksOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isPosterOpen, setIsPosterOpen] = useState(false);
  const [isEventsPage, setIsEventsPage] = useState(false);
  const [activeTag, setActiveTag] = useState<string | null>(null);
  const [legalPage, setLegalPage] = useState<"impressum" | "privacy" | "about" | "corrections" | "advertise" | null>(null);
  const [isBackToTopVisible, setIsBackToTopVisible] = useState(false);
  const mainContentRef = useRef<HTMLElement>(null);
  
  const isMobile = useMediaQuery('(max-width: 767px)');
  
  const { bookmarks } = useBookmarks();
  const sortedArticles = useMemo(() => sortByDateDesc(articles), [articles]);
  
  const newsArticles = useMemo(() => sortedArticles.filter(a => a.category === 'News'), [sortedArticles]);
  const featureArticles = useMemo(() => sortedArticles.filter(a => a.category !== 'News'), [sortedArticles]);

  // Hash-based routing state
  const [currentPath, setCurrentPath] = useState(() => window.location.hash.substring(1) || '/');

  const navigate = useCallback((path: string) => {
    window.location.hash = path;
    // Scroll to top on navigation is now handled within ArticleView or on view changes
  }, []);
  
  const prevActiveIndex = usePrevious(activeIndex);
  const direction = (prevActiveIndex === null || prevActiveIndex === undefined || activeIndex === null || activeIndex === prevActiveIndex) ? 0 : (activeIndex > prevActiveIndex ? 1 : -1);

  // Listen to hash changes to update the current path
  useEffect(() => {
    const handleHashChange = () => {
      setCurrentPath(window.location.hash.substring(1) || '/');
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);
  
  // Effect to handle routing logic based on the currentPath state
  useEffect(() => {
    const path = currentPath;
    const isCommunity = path === '/community';
    const isDirectory = path === '/directory';
    const isRaffle = path === '/raffle';
    const isBookmarks = path === '/bookmarks';
    const isProfile = path === '/profile';
    const isPoster = path === '/poster';
    const isEvents = path === '/events';
    let articleIndex: number | null = null;

    if (path.startsWith('/article/')) {
        const articleId = path.split('/article/')[1];
        const index = sortedArticles.findIndex(a => a.id === articleId);
        if (index !== -1) {
            articleIndex = index;
        } else {
            // Article not found, navigate to home.
            navigate('/');
        }
    } else {
        window.scrollTo(0, 0); // Scroll to top for non-article view changes
    }

    // Set all view states based on the derived values. React batches these updates.
    setActiveIndex(articleIndex);
    setIsCommunityOpen(isCommunity);
    setIsDirectoryOpen(isDirectory);
    setIsRaffleOpen(isRaffle);
    setIsBookmarksOpen(isBookmarks);
    setIsProfileOpen(isProfile);
    setIsPosterOpen(isPoster);
    setIsEventsPage(isEvents);

    // Reset other states for any navigation
    setSearchQuery('');
    setActiveTag(null);
  }, [currentPath, sortedArticles, navigate]);

  const handleSelectArticleById = useCallback((id: string) => {
    navigate(`/article/${id}`);
  }, [navigate]);

  const handlePrevArticle = useCallback(() => {
    if (activeIndex !== null && activeIndex > 0) {
        const prevArticleId = sortedArticles[activeIndex - 1].id;
        navigate(`/article/${prevArticleId}`);
    }
  }, [activeIndex, sortedArticles, navigate]);

  const handleNextArticle = useCallback(() => {
      if (activeIndex !== null && activeIndex < sortedArticles.length - 1) {
          const nextArticleId = sortedArticles[activeIndex + 1].id;
          navigate(`/article/${nextArticleId}`);
      }
  }, [activeIndex, sortedArticles, navigate]);

  useEffect(() => {
    setArticles(api.getArticles());
    const initialPosts = api.getPosts();
    setPosts(sortByTimestampDesc(initialPosts));
    setIsLoading(false);
  }, []);
  
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
      let path = '/';

      if (activeArticle) {
          title = `${activeArticle.title} | ${BRAND.title}`;
          description = activeArticle.excerpt;
          path = `/article/${activeArticle.id}`;
      } else if (isCommunityOpen) {
          title = `Community Forum | ${BRAND.title}`;
          description = "Join the conversation! A space for English-speakers in the Hoher Fläming to connect.";
          path = `/community`;
      } else if (isDirectoryOpen) {
          title = `Community Directory | ${BRAND.title}`;
          description = "Your guide to essential services and points of interest in Bad Belzig and the Hoher Fläming.";
          path = `/directory`;
      } else if (isRaffleOpen) {
          title = `ALTSTADT SOMMER Raffle Checker | ${BRAND.title}`;
          description = "Check your Altstadtsommer raffle ticket number.";
          path = `/raffle`;
      } else if (isBookmarksOpen) {
          title = `My Bookmarks | ${BRAND.title}`;
          description = "Your saved articles from The Fläming Eck.";
          path = `/bookmarks`;
      } else if (isEventsPage) {
          title = `What's On: Events Calendar | ${BRAND.title}`;
          description = "Your guide to events in Bad Belzig and the Hoher Fläming.";
          path = `/events`;
      }

      document.title = title;
      descriptionTag.setAttribute('content', description);
      
      // Set the canonical URL correctly for hash-based routing.
      const canonicalUrl = path === '/' ? baseUrl : `${baseUrl}/#${path}`;
      canonicalTag.setAttribute('href', canonicalUrl);

  }, [activeArticle, isCommunityOpen, isDirectoryOpen, isRaffleOpen, isBookmarksOpen, isEventsPage]);

  useEffect(() => {
    const handleScroll = () => {
        if (window.scrollY > 300) {
            setIsBackToTopVisible(true);
        } else {
            setIsBackToTopVisible(false);
        }
    };
    
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
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
  }, [navigate]);
  
  const handleSelectTag = useCallback((tag: string) => {
    setActiveTag(tag);
    navigate('/community');
  }, [navigate]);

  const handleGoHome = useCallback(() => {
    navigate('/');
  }, [navigate]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const searchResults = useMemo(() => {
    if (!searchQuery) return [];
    return sortedArticles.filter(
      (a) =>
        fuzzySearch(searchQuery, a.title) ||
        fuzzySearch(searchQuery, a.excerpt) ||
        fuzzySearch(searchQuery, extractTextFromArticleBody(a.body))
    );
  }, [searchQuery, sortedArticles]);
  
  const remainingArticles = useMemo(() => featureArticles.slice(3), [featureArticles]);
  
  let currentView: 'home' | 'article' | 'search' | 'community' | 'directory' | 'bookmarks' | 'profile' | 'raffle' | 'poster' | 'events' = 'home';
  if (isPosterOpen) currentView = 'poster';
  else if (searchQuery) currentView = 'search';
  else if (activeArticle) currentView = 'article';
  else if (isCommunityOpen) currentView = 'community';
  else if (isDirectoryOpen) currentView = 'directory';
  else if (isRaffleOpen) currentView = 'raffle';
  else if (isBookmarksOpen) currentView = 'bookmarks';
  else if (isProfileOpen) currentView = 'profile';
  else if (isEventsPage) currentView = 'events';
  
  const activeMobileView: 'home' | 'community' | 'raffle' | 'events' | 'more' = isEventsPage
    ? 'events'
    : isCommunityOpen
    ? 'community'
    : isRaffleOpen
    ? 'raffle'
    : isDirectoryOpen || isBookmarksOpen || isProfileOpen
    ? 'more'
    : 'home';

  const headerProps = {
      onGoHome: handleGoHome,
      onToggleRaffle: () => navigate('/raffle'),
      onToggleEvents: () => navigate('/events'),
      onToggleCommunity: () => navigate('/community'),
      onToggleDirectory: () => navigate('/directory'),
      onToggleBookmarks: () => navigate('/bookmarks'),
      onToggleProfile: () => navigate('/profile'),
      setLegalPage: setLegalPage,
      searchQuery,
      onSearchChange: setSearchQuery,
      activeView: activeMobileView
  };
  
  if (currentView === 'poster') {
      return (
          <PosterLayout 
              articles={sortedArticles} 
              onNavigate={handleSelectArticleById}
              onGoHome={handleGoHome}
          />
      );
  }

  if (currentView === 'raffle') {
      return (
          <RaffleChecker key="raffle" onClose={handleGoHome} />
      );
  }


  return (
      <div className="bg-cream dark:bg-deep-blue min-h-screen overflow-x-clip">
          <Header {...headerProps} />
          
          <main ref={mainContentRef} className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8 pt-4 md:pt-8 relative">
              <AnimatePresence custom={direction} initial={false}>
                  {currentView === 'article' && activeArticle && (
                      <motion.div
                          key={activeArticle.id}
                          custom={direction}
                          variants={articleVariants}
                          initial="enter"
                          animate="center"
                          exit="exit"
                          transition={{
                              x: { type: "spring", stiffness: 300, damping: 30 },
                              opacity: { duration: 0.2 }
                          }}
                          className="w-full"
                      >
                          <ArticleView 
                              article={activeArticle} 
                              allArticles={sortedArticles}
                              onSelectArticle={handleSelectArticleById}
                              onSelectTag={handleSelectTag}
                              onClose={handleGoHome}
                              onPrev={handlePrevArticle}
                              onNext={handleNextArticle}
                              currentIndex={activeIndex}
                              totalArticles={sortedArticles.length}
                          />
                      </motion.div>
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
                   {currentView === 'events' && (
                        <EventsCalendar
                            key="events-page"
                            isOpen={true} // It's a page, so it's always "open" in this context
                            onClose={handleGoHome} // The back button will navigate home
                            onSelectArticle={handleSelectArticleById}
                            isPage={true}
                        />
                   )}

                  {currentView === 'home' && isMobile && (
                    <MobileNewspaperView 
                      key="home-mobile"
                      featureArticles={featureArticles}
                      newsArticles={newsArticles}
                      onSelectArticle={handleSelectArticleById}
                    />
                  )}

                  {currentView === 'home' && !isMobile && (
                      <div className="space-y-12" key="home-desktop">
                          <HomePage 
                            featureArticles={featureArticles}
                            newsArticles={newsArticles}
                            onSelectArticle={handleSelectArticleById} 
                          />
                          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                              {remainingArticles.map(article => (
                                  <ArticleCard key={article.id} article={article} onClick={() => handleSelectArticleById(article.id)} />
                              ))}
                          </div>
                      </div>
                  )}
              </AnimatePresence>
          </main>
          
          {!(isMobile && currentView === 'home') && (
            <footer className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8 mt-12 text-center text-xs text-slate-500 dark:text-slate-400 py-4 border-t border-slate-200 dark:border-slate-700 pb-24 md:pb-4">
                <button onClick={() => setLegalPage("about")} className="hover:underline px-2">About Us</button>
                <span>|</span>
                <button onClick={() => setLegalPage("impressum")} className="hover:underline px-2">Impressum</button>
                <span>|</span>
                <button onClick={() => setLegalPage("privacy")} className="hover:underline px-2">Data Protection</button>
                <span>|</span>
                <button onClick={() => setLegalPage("corrections")} className="hover:underline px-2">Corrections Policy</button>
                 <span>|</span>
                <button onClick={() => setLegalPage("advertise")} className="hover:underline px-2">Advertise With Us</button>
                <span>|</span>
                <a href="https://ko-fi.com/example" target="_blank" rel="noopener noreferrer" className="hover:underline px-2">Support Us</a>
            </footer>
          )}


          <AnimatePresence>
              {isBackToTopVisible && <BackToTopButton onClick={scrollToTop} />}
          </AnimatePresence>
          
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
      </div>
  );
}