
import React, { createContext, useState, useEffect, useContext, ReactNode, useCallback } from 'react';
import { useUser } from './UserContext';

interface BookmarkContextType {
  bookmarks: string[];
  addBookmark: (id: string) => void;
  removeBookmark: (id: string) => void;
  isBookmarked: (id: string) => boolean;
}

const BookmarkContext = createContext<BookmarkContextType | undefined>(undefined);

export const BookmarkProvider = ({ children }: { children: ReactNode }) => {
  const { user } = useUser();
  const [bookmarks, setBookmarks] = useState<string[]>([]);
  const [storageKey, setStorageKey] = useState('flaming-eck-bookmarks-guest');

  // Determine storage key based on user login state
  useEffect(() => {
    const newKey = user ? `flaming-eck-bookmarks-${user.email}` : 'flaming-eck-bookmarks-guest';
    setStorageKey(newKey);
  }, [user]);

  // Load bookmarks from localStorage when the key changes
  useEffect(() => {
    try {
      const storedBookmarks = localStorage.getItem(storageKey);
      if (storedBookmarks) {
        const parsedBookmarks = JSON.parse(storedBookmarks);
        // Validate that it's an array of strings to prevent crashes from corrupted data
        if (Array.isArray(parsedBookmarks) && parsedBookmarks.every(item => typeof item === 'string')) {
          setBookmarks(parsedBookmarks);
        } else {
          setBookmarks([]);
        }
      } else {
        setBookmarks([]); // Reset if key changes and no bookmarks exist for it
      }
    } catch (error) {
      console.error("Failed to load bookmarks from localStorage:", error);
      setBookmarks([]);
    }
  }, [storageKey]);

  // Save bookmarks to localStorage whenever they change
  useEffect(() => {
    try {
      localStorage.setItem(storageKey, JSON.stringify(bookmarks));
    } catch (error) {
      console.error("Failed to save bookmarks to localStorage:", error);
    }
  }, [bookmarks, storageKey]);

  const addBookmark = useCallback((id: string) => {
    setBookmarks((prev) => [...new Set([...prev, id])]);
  }, []);

  const removeBookmark = useCallback((id: string) => {
    setBookmarks((prev) => prev.filter((bId) => bId !== id));
  }, []);

  const isBookmarked = useCallback((id: string) => {
    return bookmarks.includes(id);
  }, [bookmarks]);

  return (
    <BookmarkContext.Provider value={{ bookmarks, addBookmark, removeBookmark, isBookmarked }}>
      {children}
    </BookmarkContext.Provider>
  );
};

export const useBookmarks = () => {
  const context = useContext(BookmarkContext);
  if (context === undefined) {
    throw new Error('useBookmarks must be used within a BookmarkProvider');
  }
  return context;
};
