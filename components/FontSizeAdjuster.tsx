
import React from 'react';
import MinusIcon from './icons/MinusIcon';
import PlusIcon from './icons/PlusIcon';
import TypeIcon from './icons/TypeIcon';

interface FontSizeAdjusterProps {
  onIncrease: () => void;
  onDecrease: () => void;
  isMin: boolean;
  isMax: boolean;
}

export default function FontSizeAdjuster({ onIncrease, onDecrease, isMin, isMax }: FontSizeAdjusterProps) {
  const buttonClasses = "p-2 rounded-full text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-transparent";
  
  return (
    <div className="flex items-center gap-1">
        <span className="text-slate-500 dark:text-slate-400" title="Adjust font size">
            <TypeIcon className="w-5 h-5"/>
        </span>
        <button
            onClick={onDecrease}
            disabled={isMin}
            aria-label="Decrease font size"
            className={buttonClasses}
        >
            <MinusIcon className="w-5 h-5" />
        </button>
        <button
            onClick={onIncrease}
            disabled={isMax}
            aria-label="Increase font size"
            className={buttonClasses}
        >
            <PlusIcon className="w-5 h-5" />
        </button>
    </div>
  );
}
