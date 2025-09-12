import React from 'react';
import HeartIcon from './icons/HeartIcon';

export default function SupportCard() {
  return (
    <div className="p-6 rounded-lg bg-poppy/5 dark:bg-poppy/10 mb-8 border border-slate-200 dark:border-slate-700 shadow-sm">
      <h3 className="font-serif font-bold text-lg text-charcoal dark:text-slate-200">Support Our Work</h3>
      <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
        If you enjoy our independent magazine, please consider supporting us. Every contribution helps.
      </p>
      <a
        href="https://ko-fi.com/example"
        target="_blank"
        rel="noopener noreferrer"
        className="mt-4 inline-flex items-center justify-center gap-2 w-full px-4 py-2 text-sm font-semibold text-white bg-ocean rounded-lg shadow-sm hover:bg-ocean-dark transition-colors"
      >
        <HeartIcon className="w-4 h-4" />
        <span>Support on Ko-fi</span>
      </a>
    </div>
  );
}