import React, { createContext, useState, useEffect, useContext, ReactNode } from 'react';

type Theme = 'light' | 'dark';
type ThemeSetting = Theme | 'system';

interface ThemeContextType {
  theme: Theme; // Effective theme
  themeSetting: ThemeSetting;
  setThemeSetting: (setting: ThemeSetting) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const THEME_SETTING_KEY = 'flaming-eck-theme-setting';

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [themeSetting, setThemeSettingState] = useState<ThemeSetting>(() => {
    if (typeof window !== 'undefined') {
      try {
        const storedSetting = localStorage.getItem(THEME_SETTING_KEY);
        if (storedSetting === 'light' || storedSetting === 'dark' || storedSetting === 'system') {
          return storedSetting as ThemeSetting;
        }
      } catch (error) {
          console.error("Could not read theme setting from localStorage:", error);
      }
    }
    return 'system'; // Default to system preference
  });

  // This state holds the resolved theme ('light' or 'dark')
  const [theme, setTheme] = useState<Theme>('light'); 

  // Effect to determine the effective theme from the setting
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    
    const handleSystemThemeChange = (e: MediaQueryListEvent) => {
      if (themeSetting === 'system') {
        setTheme(e.matches ? 'dark' : 'light');
      }
    };

    if (themeSetting === 'system') {
      setTheme(mediaQuery.matches ? 'dark' : 'light');
      mediaQuery.addEventListener('change', handleSystemThemeChange);
    } else {
      setTheme(themeSetting);
    }
    
    return () => {
      mediaQuery.removeEventListener('change', handleSystemThemeChange);
    };
  }, [themeSetting]);

  // Effect to apply the theme to the document
  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [theme]);

  const setThemeSetting = (setting: ThemeSetting) => {
    try {
      localStorage.setItem(THEME_SETTING_KEY, setting);
    } catch (error) {
      console.error("Could not save theme setting to localStorage:", error);
    }
    setThemeSettingState(setting);
  };

  return (
    <ThemeContext.Provider value={{ theme, themeSetting, setThemeSetting }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
