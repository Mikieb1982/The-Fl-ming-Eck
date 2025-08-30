import React from 'react';
import CalendarDaysIcon from './icons/CalendarDaysIcon';
import SearchIcon from './icons/SearchIcon';
import UsersIcon from './icons/UsersIcon';
import BuildingOfficeIcon from './icons/BuildingOfficeIcon';

interface CategoryNavProps {
  categories: string[];
  activeCategory: string;
  onSelectCategory: (category: string) => void;
  onOpenCalendar: () => void;
  onOpenCommunity: () => void;
  onOpenDirectory: () => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export default function CategoryNav({ categories, activeCategory, onSelectCategory, onOpenCalendar, onOpenCommunity, onOpenDirectory, searchQuery, onSearchChange }: CategoryNavProps) {
  
  const SearchBar = () => (
    <div className="relative w-full max-w-xs sm:max-w-sm">
      <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
        <SearchIcon className="h-5 w-5 text-green-200" />
      </div>
      <input
        type="search"
        name="search"
        id="search"
        value={searchQuery}
        onChange={(e) => onSearchChange(e.target.value)}
        className="block w-full rounded-full border-0 bg-white/10 py-2.5 pl-11 pr-4 text-white ring-1 ring-inset ring-transparent placeholder:text-green-200 focus:ring-2 focus:ring-inset focus:ring-white sm:text-sm transition-colors"
        placeholder="Search articles..."
        aria-label="Search articles"
      />
    </div>
  );

  return (
    <nav className="bg-brand-green border-t border-white/20">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        <div className="flex flex-col items-center py-3 gap-3">
          {/* First line: Categories */}
          <div className="w-full flex justify-center">
            <ul className="flex items-center gap-4 sm:gap-6 overflow-x-auto whitespace-nowrap">
              {categories.map(category => (
                <li key={category}>
                  <button
                    onClick={() => onSelectCategory(category)}
                    className={`text-sm sm:text-base font-bold uppercase tracking-wider transition-colors duration-200 pb-1
                    ${activeCategory === category 
                        ? 'text-white border-b-2 border-sandstone-ochre' 
                        : 'text-green-200 hover:text-white border-b-2 border-transparent'
                    }`}
                  >
                    {category}
                  </button>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Second line: What's On button and Search Bar */}
          <div className="w-full flex justify-center items-center gap-4 flex-wrap">
            <button
              onClick={onOpenCalendar}
              className="flex-shrink-0 flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold bg-white/10 text-white hover:bg-white/20 transition-colors"
              aria-label="Open events calendar"
            >
              <CalendarDaysIcon className="w-4 h-4" />
              <span>What's On</span>
            </button>
            <button
              onClick={onOpenCommunity}
              className="flex-shrink-0 flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold bg-white/10 text-white hover:bg-white/20 transition-colors"
              aria-label="Open community forum"
            >
              <UsersIcon className="w-4 h-4" />
              <span>Community</span>
            </button>
            <button
              onClick={onOpenDirectory}
              className="flex-shrink-0 flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold bg-white/10 text-white hover:bg-white/20 transition-colors"
              aria-label="Open local directory"
            >
              <BuildingOfficeIcon className="w-4 h-4" />
              <span>Directory</span>
            </button>
            <SearchBar />
          </div>
        </div>
      </div>
    </nav>
  );
}