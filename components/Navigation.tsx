
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
        className="px-6 py-2 bg-white border border-gray-300 rounded-lg shadow-sm font-semibold text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        disabled={isFirst}
      >
        Previous
      </button>
      <button 
        onClick={onNext} 
        className="px-6 py-2 bg-white border border-gray-300 rounded-lg shadow-sm font-semibold text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        disabled={isLast}
      >
        Next
      </button>
    </div>
  );
}
