import React, { createContext, useState, useEffect, useContext, ReactNode, useCallback } from 'react';
import { User } from '../types';

interface UserContextType {
  user: User | null;
  signIn: () => void;
  signOut: () => void;
  isLoading: boolean;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

const USER_STORAGE_KEY = 'flaming-eck-user';
const mockUser: User = {
  name: 'Demo User',
  email: 'demo@example.com',
  picture: 'https://i.imgur.com/3DoH82w.png', // Generic user avatar
};


export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Effect to load user from storage on initial load
  useEffect(() => {
    try {
        const storedUser = localStorage.getItem(USER_STORAGE_KEY);
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    } catch (error) {
        console.error("Failed to load user from localStorage:", error);
    } finally {
        setIsLoading(false);
    }
  }, []);

  const signIn = useCallback(() => {
    try {
        localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(mockUser));
        setUser(mockUser);
    } catch (error) {
        console.error("Failed to save user to localStorage:", error);
    }
  }, []);

  const signOut = useCallback(() => {
    try {
        localStorage.removeItem(USER_STORAGE_KEY);
        setUser(null);
    } catch (error) {
        console.error("Failed to remove user from localStorage:", error);
    }
  }, []);

  return (
    <UserContext.Provider value={{ user, signIn, signOut, isLoading }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};