import React, { createContext, useState, useEffect, useContext, ReactNode, useCallback } from 'react';
import { User } from '../types';

declare global {
    interface Window {
        google: any;
    }
}

interface UserContextType {
  user: User | null;
  signOut: () => void;
  isLoading: boolean;
}

const UserContext = createContext<UserContextType | undefined>(undefined);
const USER_STORAGE_KEY = 'flaming-eck-user';

function decodeJwt(token: string): any {
  try {
    return JSON.parse(atob(token.split('.')[1]));
  } catch (e) {
    console.error("Error decoding JWT", e);
    return null;
  }
}

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const handleCredentialResponse = useCallback((response: any) => {
    const credential = response.credential;
    const profile = decodeJwt(credential);

    if (profile) {
      const newUser: User = {
        name: profile.name,
        email: profile.email,
        picture: profile.picture,
      };
      localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(newUser));
      setUser(newUser);
    }
  }, []);
  
  const signOut = useCallback(() => {
    if (window.google?.accounts?.id) {
        window.google.accounts.id.disableAutoSelect();
    }
    localStorage.removeItem(USER_STORAGE_KEY);
    setUser(null);
  }, []);

  useEffect(() => {
    const storedUser = localStorage.getItem(USER_STORAGE_KEY);
    if (storedUser) {
        try {
            setUser(JSON.parse(storedUser));
        } catch (error) {
            console.error("Failed to parse stored user:", error);
            localStorage.removeItem(USER_STORAGE_KEY);
        }
    }

    const clientId = process.env.GOOGLE_CLIENT_ID;
    if (!clientId) {
        console.warn("GOOGLE_CLIENT_ID environment variable not set. Google Sign-In will not work.");
        setIsLoading(false);
        return;
    }
    
    const script = document.createElement('script');
    script.src = 'https://accounts.google.com/gsi/client';
    script.async = true;
    script.defer = true;
    script.onload = () => {
        try {
            window.google.accounts.id.initialize({
                client_id: clientId,
                callback: handleCredentialResponse,
            });
            const signInButton = document.getElementById('g_id_signin');
            if (signInButton && !storedUser) {
                 window.google.accounts.id.renderButton(
                    signInButton,
                    { theme: 'outline', size: 'large', type: 'icon', shape: 'circle', text: 'signin_with' }
                );
            }
            const signInButtonMobile = document.getElementById('g_id_signin_mobile');
             if (signInButtonMobile && !storedUser) {
                 window.google.accounts.id.renderButton(
                    signInButtonMobile,
                    { theme: 'outline', size: 'large', type: 'icon', shape: 'circle', text: 'signin_with' }
                );
            }
        } catch (error) {
            console.error("Google Sign-In initialization failed:", error);
        } finally {
            setIsLoading(false);
        }
    };
    document.body.appendChild(script);

    return () => {
        document.body.removeChild(script);
    }

  }, [handleCredentialResponse]);

  return (
    <UserContext.Provider value={{ user, signOut, isLoading }}>
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