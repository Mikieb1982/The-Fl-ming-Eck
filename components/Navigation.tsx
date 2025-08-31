

import React from 'react';

interface NavigationProps {
  onPrev: () => void;
  onNext: () => void;
  isFirst: boolean;
  isLast: boolean;
}

export default function Navigation({ onPrev, onNext, isFirst, isLast }: NavigationProps) {
  return (
    <div className="flex justify-between mt-4">
      <button 
        onClick={onPrev} 
        className="px-6 py-2 bg-white dark:bg-zinc-900 border border-gray-300 dark:border-slate-600 rounded-lg shadow-sm font-semibold text-gray-700 dark:text-slate-300 hover:bg-gray-50 dark:hover:bg-slate-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        disabled={isFirst}
      >
        Previous
      </button>
      <button 
        onClick={onNext} 
        className="px-6 py-2 bg-white dark:bg-zinc-900 border border-gray-300 dark:border-slate-600 rounded-lg shadow-sm font-semibold text-gray-700 dark:text-slate-300 hover:bg-gray-50 dark:hover:bg-slate-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        disabled={isLast}
      >
        Next
      </button>
    </div>
  );
}