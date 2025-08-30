
import React from 'react';

interface TagProps {
  tag: string;
  onClick: (tag: string) => void;
}

export default function Tag({ tag, onClick }: TagProps) {
  return (
    <button
      onClick={() => onClick(tag)}
      className="px-3 py-1 text-sm font-semibold text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-slate-700 rounded-full hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors"
    >
      #{tag}
    </button>
  );
}
