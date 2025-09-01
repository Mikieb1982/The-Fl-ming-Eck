
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
    const base64Url = token.split('.')[1];
    if (!base64Url) {
      console.error("Invalid JWT: Missing payload part.");
      return null;
    }
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
    
    return JSON.parse(jsonPayload);
  } catch (e) {
    console.error("Error decoding JWT", e);
    return null;
  }
}

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const handleCredentialResponse = useCallback((response: any) => {
    const credential = response?.credential;

    // Add a guard to ensure the credential is a non-empty string before decoding.
    if (typeof credential !== 'string' || !credential) {
        console.error("Invalid or missing credential in Google Sign-In response.", response);
        return;
    }

    const profile = decodeJwt(credential);

    if (profile && typeof profile.name === 'string' && typeof profile.email === 'string' && typeof profile.picture === 'string') {
      const newUser: User = {
        name: profile.name,
        email: profile.email,
        picture: profile.picture,
      };
      try {
        localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(newUser));
      } catch (error) {
        console.error("Failed to save user to localStorage:", error);
      }
      setUser(newUser);
    } else {
        console.error("Received invalid profile object from Google Sign-In.");
    }
  }, []);
  
  const signOut = useCallback(() => {
    if (window.google?.accounts?.id) {
        window.google.accounts.id.disableAutoSelect();
    }
    try {
      localStorage.removeItem(USER_STORAGE_KEY);
    } catch (error) {
      console.error("Failed to remove user from localStorage:", error);
    }
    setUser(null);
  }, []);

  useEffect(() => {
    try {
        const storedUser = localStorage.getItem(USER_STORAGE_KEY);
        if (storedUser) {
            try {
                const parsedUser = JSON.parse(storedUser);
                // Add validation to ensure it's a valid User object
                if (parsedUser && typeof parsedUser.name === 'string' && typeof parsedUser.email === 'string' && typeof parsedUser.picture === 'string') {
                    setUser(parsedUser);
                } else {
                    // Invalid user object in storage, remove it
                    localStorage.removeItem(USER_STORAGE_KEY);
                }
            } catch (error) {
                console.error("Failed to parse stored user:", error);
                localStorage.removeItem(USER_STORAGE_KEY);
            }
        }
    } catch (error) {
        console.error("Failed to access localStorage to get user:", error);
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
            const storedUser = localStorage.getItem(USER_STORAGE_KEY); // Check again in case it was set
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