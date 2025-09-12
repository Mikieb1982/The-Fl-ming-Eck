import React from 'react';
import HeartIcon from './icons/HeartIcon';

export default function SupportButton() {
  return (
    <a
      href="https://ko-fi.com/example"
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-2 p-3 rounded-lg bg-poppy/10 dark:bg-poppy/20 border border-poppy/20 dark:border-poppy/30 text-poppy-dark dark:text-red-300 font-semibold text-sm hover:bg-poppy/20 transition-colors"
    >
      <HeartIcon className="w-5 h-5" />
      <span>Support Us</span>
    </a>
  );
}
