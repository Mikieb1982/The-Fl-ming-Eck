import React from 'react';
import { motion } from 'framer-motion';
import { useBookmarks } from '../context/BookmarkContext';
import BookmarkIcon from './icons/BookmarkIcon';

interface BookmarkButtonProps {
    articleId: string;
    className?: string;
    asText?: boolean;
}

export default function BookmarkButton({ articleId, className, asText = false }: BookmarkButtonProps) {
    const { isBookmarked, addBookmark, removeBookmark } = useBookmarks();
    const bookmarked = isBookmarked(articleId);

    const handleClick = (e: React.MouseEvent) => {
        // Prevent the browser's default link navigation and stop the event from bubbling to the parent link's React onClick.
        e.preventDefault();
        e.stopPropagation();
        
        if (bookmarked) {
            removeBookmark(articleId);
        } else {
            addBookmark(articleId);
        }
    };

    if (asText) {
        return (
             <button
                onClick={handleClick}
                className={`flex items-center gap-2 text-sm font-semibold transition-colors ${bookmarked ? 'text-poppy' : 'text-slate-600 dark:text-slate-300'} hover:text-poppy/80 dark:hover:text-poppy/80 ${className}`}
                aria-label={bookmarked ? 'Remove bookmark' : 'Add bookmark'}
            >
                <BookmarkIcon filled={bookmarked} className="w-5 h-5" />
                <span>{bookmarked ? 'Bookmarked' : 'Bookmark'}</span>
            </button>
        )
    }

    return (
        <button
            onClick={handleClick}
            className={`p-2 rounded-full transition-colors ${bookmarked ? 'text-poppy' : 'text-slate-600 dark:text-slate-300'} hover:bg-slate-100 dark:hover:bg-slate-700 ${className}`}
            aria-label={bookmarked ? 'Remove bookmark' : 'Add bookmark'}
            title={bookmarked ? 'Remove bookmark' : 'Add bookmark'}
        >
            <motion.div
                animate={{ scale: bookmarked ? [1, 1.3, 1] : 1 }}
                transition={{ duration: 0.3 }}
            >
                <BookmarkIcon filled={bookmarked} className="w-5 h-5" />
            </motion.div>
        </button>
    );
}