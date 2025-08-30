
import React from 'react';
import { BRAND } from '../constants';
import ThemeToggle from './ThemeToggle';
import WeatherWidget from './WeatherWidget';

interface MastheadProps {
  onGoHome: () => void;
  isScrolled?: boolean;
}

export default function Masthead({ onGoHome, isScrolled = false }: MastheadProps) {
  const Logo = () => (
    <button onClick={onGoHome} className="transition-transform duration-300 hover:scale-[1.02]">
      <h1 className="sr-only">{BRAND.title}</h1>
      <img
        src="https://i.imgur.com/ZxROFuO.png"
        alt={BRAND.title}
        className={`w-auto dark:invert transition-all duration-300 ${isScrolled ? 'h-16 lg:h-20' : 'h-20 lg:h-24'}`}
      />
    </button>
  );

  return (
    <header className="py-4 relative">
      {/* Mobile Theme Toggle in corner */}
      <div className="absolute top-4 right-4 md:hidden">
        <ThemeToggle />
      </div>

      {/* Desktop Layout */}
      <div className="hidden md:grid md:grid-cols-3 md:items-center">
        <div className="flex justify-start">
          <WeatherWidget />
        </div>
        <div className="flex justify-center">
          <Logo />
        </div>
        <div className="flex justify-end items-center gap-4">
          <ThemeToggle />
        </div>
      </div>

      {/* Mobile Layout */}
      <div className="md:hidden flex flex-col items-center gap-6">
        <div className="pt-4">
            <Logo />
        </div>
        <WeatherWidget />
      </div>
    </header>
  );
}
