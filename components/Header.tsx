

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useUser } from '../context/UserContext';
import ThemeToggle from './ThemeToggle';
import CalendarDaysIcon from './icons/CalendarDaysIcon';
import UsersIcon from './icons/UsersIcon';
import BuildingOfficeIcon from './icons/BuildingOfficeIcon';
import LogoutIcon from './icons/LogoutIcon';
import CloseIcon from './icons/CloseIcon';
import Logo from './icons/Logo';
import SearchIcon from './icons/SearchIcon';
import BookmarkIcon from './icons/BookmarkIcon';
import UserIcon from './icons/UserIcon';
import HomeIcon from './icons/HomeIcon';
import MenuIcon from './icons/MenuIcon';
import InfoIcon from './icons/InfoIcon';

type LegalPageType = "impressum" | "privacy" | "about" | "corrections" | "advertise";

interface HeaderProps {
    onGoHome: () => void;
    onToggleCalendar: () => void;
    onOpenCalendarPage: () => void;
    onToggleCommunity: () => void;
    onToggleDirectory: () => void;
    onToggleBookmarks: () => void;
    onToggleProfile: () => void;
    setLegalPage: (page: LegalPageType | null) => void;
    searchQuery: string;
    onSearchChange: (query: string) => void;
    activeView: 'home' | 'community' | 'directory' | 'more' | 'none' | 'calendar';
}

function BottomNavBar(props: HeaderProps) {
    const { onGoHome, onOpenCalendarPage, onToggleCommunity, onToggleDirectory, onToggleBookmarks, onToggleProfile, setLegalPage, activeView } = props;
    const { user, signOut } = useUser();
    const [isMoreMenuOpen, setIsMoreMenuOpen] = useState(false);
    const moreMenuRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (moreMenuRef.current && !moreMenuRef.current.contains(event.target as Node)) {
                setIsMoreMenuOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [moreMenuRef]);

    const navItems = [
        { label: 'Home', icon: <HomeIcon className="w-6 h-6" />, action: onGoHome, view: 'home' },
        { label: 'What\'s On', icon: <CalendarDaysIcon className="w-6 h-6" />, action: onOpenCalendarPage, view: 'calendar' as const },
        { label: 'Community', icon: <UsersIcon className="w-6 h-6" />, action: onToggleCommunity, view: 'community' },
        { label: 'Directory', icon: <BuildingOfficeIcon className="w-6 h-6" />, action: onToggleDirectory, view: 'directory' },
    ];
    
    const baseButtonClass = "flex flex-col items-center justify-center flex-grow text-slate-600 dark:text-slate-400 transition-colors duration-200 pt-2 pb-1";
    const activeButtonClass = "text-brand-blue dark:text-accent-blue";

    return (
        <>
            <AnimatePresence>
                {isMoreMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setIsMoreMenuOpen(false)}
                        className="fixed inset-0 bg-black/40 z-40 md:hidden"
                    />
                )}
            </AnimatePresence>

            <div className="fixed bottom-0 left-0 right-0 z-[60] h-20 bg-white/90 dark:bg-charcoal/90 backdrop-blur-lg border-t border-slate-200 dark:border-slate-700 md:hidden">
                <div className="flex items-stretch justify-around h-full">
                    {navItems.map(item => (
                        <button key={item.label} onClick={item.action} className={`${baseButtonClass} ${activeView === item.view ? activeButtonClass : 'hover:text-brand-accent-red dark:hover:text-accent-red'}`}>
                            {item.icon}
                            <span className={`text-xs mt-1 ${activeView === item.view ? 'font-bold' : ''}`}>{item.label}</span>
                        </button>
                    ))}
                     <div ref={moreMenuRef} className="relative flex flex-col items-center justify-center flex-grow">
                        <button onClick={() => setIsMoreMenuOpen(prev => !prev)} className={`${baseButtonClass} ${activeView === 'more' ? activeButtonClass : 'hover:text-brand-accent-red dark:hover:text-accent-red'}`}>
                            <MenuIcon className="w-6 h-6" />
                            <span className={`text-xs mt-1 ${activeView === 'more' ? 'font-bold' : ''}`}>More</span>
                        </button>

                        <AnimatePresence>
                            {isMoreMenuOpen && (
                                <motion.div
                                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                    transition={{ duration: 0.2, ease: "easeOut" }}
                                    className="absolute bottom-full right-0 mb-3 w-56 rounded-lg shadow-xl bg-white dark:bg-zinc-900 ring-1 ring-black dark:ring-slate-700 ring-opacity-5"
                                >
                                    <div className="p-2">
                                        <button onClick={() => { onToggleBookmarks(); setIsMoreMenuOpen(false); }} className="w-full text-left flex items-center gap-3 px-3 py-2 text-sm text-charcoal dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-md">
                                            <BookmarkIcon className="w-5 h-5" />
                                            <span>Bookmarks</span>
                                        </button>
                                        {user && (
                                            <button onClick={() => { onToggleProfile(); setIsMoreMenuOpen(false); }} className="w-full text-left flex items-center gap-3 px-3 py-2 text-sm text-charcoal dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-md">
                                                <UserIcon className="w-5 h-5" />
                                                <span>My Profile</span>
                                            </button>
                                        )}
                                        <div className="my-1 h-px bg-slate-200 dark:bg-slate-700" />
                                        <button onClick={() => { setLegalPage('about'); setIsMoreMenuOpen(false); }} className="w-full text-left flex items-center gap-3 px-3 py-2 text-sm text-charcoal dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-md">
                                            <InfoIcon className="w-5 h-5" />
                                            <span>About Us</span>
                                        </button>
                                        <button onClick={() => { setLegalPage('advertise'); setIsMoreMenuOpen(false); }} className="w-full text-left flex items-center gap-3 px-3 py-2 text-sm text-charcoal dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-md">
                                            <BuildingOfficeIcon className="w-5 h-5" />
                                            <span>Advertise</span>
                                        </button>
                                        <div className="my-1 h-px bg-slate-200 dark:bg-slate-700" />
                                        <div className="flex items-center justify-between px-3 py-2 text-sm text-charcoal dark:text-slate-300">
                                            <span>Theme</span>
                                            <ThemeToggle />
                                        </div>
                                        {user && (
                                            <>
                                                <div className="my-1 h-px bg-slate-200 dark:bg-slate-700" />
                                                <button onClick={() => { signOut(); setIsMoreMenuOpen(false); }} className="w-full text-left flex items-center gap-3 px-3 py-2 text-sm text-charcoal dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-md">
                                                    <LogoutIcon className="w-5 h-5" />
                                                    <span>Sign Out</span>
                                                </button>
                                            </>
                                        )}
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                     </div>
                </div>
            </div>
        </>
    );
}


export default function Header(props: HeaderProps) {
    const { onGoHome, onToggleCalendar, onToggleCommunity, onToggleDirectory, onToggleBookmarks, onToggleProfile, searchQuery, onSearchChange, activeView } = props;
    const { user, signOut, isLoading } = useUser();
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
    const searchInputRef = useRef<HTMLInputElement>(null);
    const userMenuRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (isSearchOpen && searchInputRef.current) {
            searchInputRef.current.focus();
        }
    }, [isSearchOpen]);
    
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
                setIsUserMenuOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [userMenuRef]);


    const desktopNavItems = [
        { label: 'What\'s On', icon: <CalendarDaysIcon className="w-6 h-6" />, action: onToggleCalendar, view: 'calendar' },
        { label: 'Community', icon: <UsersIcon className="w-6 h-6" />, action: onToggleCommunity, view: 'community' },
        { label: 'Directory', icon: <BuildingOfficeIcon className="w-6 h-6" />, action: onToggleDirectory, view: 'directory' },
        { label: 'Bookmarks', icon: <BookmarkIcon className="w-6 h-6" />, action: onToggleBookmarks, view: 'more' },
    ];
    
    const baseNavButtonClasses = "flex items-center gap-2 px-3 py-2 text-sm font-semibold rounded-lg text-slate-600 dark:text-slate-300 hover:bg-brand-accent-red hover:text-white dark:hover:bg-brand-accent-red dark:hover:text-white transition-colors";
    const activeNavButtonClasses = "bg-brand-blue text-white dark:bg-accent-blue dark:text-white";
    
    const handleCloseSearch = () => {
        setIsSearchOpen(false);
        onSearchChange('');
    };

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                handleCloseSearch();
            }
        };
        if (isSearchOpen) {
            window.addEventListener('keydown', handleKeyDown);
        }
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [isSearchOpen, onSearchChange]);

    return (
        <>
            <header className="sticky top-0 z-30 bg-white/80 dark:bg-charcoal/80 backdrop-blur-lg border-b border-sandstone-ochre/40 dark:border-sandstone-ochre/50">
                <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8">
                    <div className="flex items-center justify-between h-20 md:h-28">
                        {/* Logo */}
                        <div className="flex-shrink-0">
                            <button 
                                onClick={onGoHome} 
                                className="focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-charcoal focus-visible:ring-sandstone-ochre rounded-md" 
                                aria-label="Go to homepage"
                            >
                                <Logo className="h-16 md:h-20 w-auto text-charcoal dark:text-slate-200" />
                            </button>
                        </div>

                        {/* Desktop Navigation & Controls */}
                        <div className="hidden md:flex items-center gap-1 sm:gap-2">
                            <nav className="flex items-center gap-1 sm:gap-2">
                                {desktopNavItems.map(item => (
                                    <button key={item.label} onClick={item.action} className={`${baseNavButtonClasses} ${activeView === item.view ? activeNavButtonClasses : ''}`} title={item.label}>
                                        {item.icon}
                                        <span className="hidden lg:inline">{item.label}</span>
                                    </button>
                                ))}
                            </nav>

                            <div className="w-px h-6 bg-slate-200 dark:bg-slate-700 mx-1 sm:mx-2" />
                            
                            <div className="flex items-center gap-1 sm:gap-2">
                                <button
                                    onClick={() => setIsSearchOpen(true)}
                                    className="p-2 rounded-full text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
                                    aria-label="Open search"
                                >
                                    <SearchIcon className="w-5 h-5" />
                                </button>
                                
                                <ThemeToggle />

                                <div className="relative" ref={userMenuRef}>
                                    {user ? (
                                        <>
                                            <button onClick={() => setIsUserMenuOpen(prev => !prev)} className="rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sandstone-ochre">
                                                <img src={user.picture} alt={user.name} className="w-8 h-8 rounded-full" />
                                            </button>
                                            
                                            <AnimatePresence>
                                                {isUserMenuOpen && (
                                                    <motion.div 
                                                        className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white dark:bg-zinc-900 ring-1 ring-black dark:ring-slate-700 ring-opacity-5 focus:outline-none z-10 top-full"
                                                        initial={{ opacity: 0, scale: 0.95 }}
                                                        animate={{ opacity: 1, scale: 1 }}
                                                        exit={{ opacity: 0, scale: 0.95 }}
                                                        transition={{ duration: 0.1 }}
                                                    >
                                                        <div className="py-1">
                                                            <div className="px-4 py-3 border-b border-slate-200 dark:border-slate-700">
                                                                <p className="text-sm font-semibold text-charcoal dark:text-slate-200 truncate">{user.name}</p>
                                                                <p className="text-xs text-slate-500 dark:text-slate-400 truncate">{user.email}</p>
                                                            </div>
                                                            <div className="p-1">
                                                                <button onClick={() => { onToggleProfile(); setIsUserMenuOpen(false); }} className="w-full text-left flex items-center gap-3 px-3 py-2 text-sm text-charcoal dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-md">
                                                                    <UserIcon className="w-5 h-5" />
                                                                    <span>My Profile</span>
                                                                </button>
                                                                <button onClick={signOut} className="w-full text-left flex items-center gap-3 px-3 py-2 text-sm text-charcoal dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-md">
                                                                    <LogoutIcon className="w-5 h-5" />
                                                                    <span>Sign Out</span>
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </motion.div>
                                                )}
                                            </AnimatePresence>
                                        </>
                                    ) : (
                                        !isLoading && (
                                            <div id="g_id_signin" 
                                                data-type="icon" 
                                                data-shape="circle" 
                                                data-theme="outline" 
                                                data-text="signin_with" 
                                                data-size="large">
                                            </div>
                                        )
                                    )}
                                </div>
                            </div>
                        </div>

                         {/* Mobile Controls */}
                        <div className="flex md:hidden items-center gap-2">
                             <button
                                onClick={() => setIsSearchOpen(true)}
                                className="p-2 rounded-full text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
                                aria-label="Open search"
                            >
                                <SearchIcon className="w-5 h-5" />
                            </button>
                            {!user && !isLoading && (
                                <div id="g_id_signin_mobile" 
                                    data-type="icon" 
                                    data-shape="circle" 
                                    data-theme="outline" 
                                    data-text="signin_with" 
                                    data-size="large">
                                </div>
                            )}
                             {user && (
                                <button onClick={onToggleProfile} className="rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sandstone-ochre">
                                    <img src={user.picture} alt={user.name} className="w-8 h-8 rounded-full" />
                                </button>
                            )}
                        </div>
                    </div>
                </div>
                
                {/* Search Overlay */}
                <AnimatePresence>
                    {isSearchOpen && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className="absolute inset-0 h-20 md:h-28 bg-white/95 dark:bg-charcoal/95 backdrop-blur-sm z-10"
                        >
                            <div className="max-w-7xl mx-auto px-4 lg:px-8 h-full">
                                <div className="flex items-center h-full gap-4">
                                    <SearchIcon className="w-5 h-5 text-slate-400 flex-shrink-0" />
                                    <input
                                        ref={searchInputRef}
                                        type="search"
                                        placeholder="Search for articles, guides, and events..."
                                        value={searchQuery}
                                        onChange={(e) => onSearchChange(e.target.value)}
                                        className="w-full bg-transparent border-none focus:ring-0 text-lg text-charcoal dark:text-slate-200 placeholder-slate-400 dark:placeholder-slate-500"
                                    />
                                    <button
                                        onClick={handleCloseSearch}
                                        className="p-2 rounded-full text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors flex-shrink-0"
                                        aria-label="Close search"
                                    >
                                        <CloseIcon className="w-6 h-6" />
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </header>
            <BottomNavBar {...props} />
        </>
    );
}