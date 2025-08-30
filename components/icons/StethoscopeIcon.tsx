
import React from 'react';

export default function StethoscopeIcon({ className }: { className?: string }) {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width="24" 
      height="24" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={className}
    >
        <path d="M4.8 2.3A.3.3 0 1 0 5 2a.3.3 0 0 0-.2.3" />
        <path d="M8 2a2 2 0 0 1 2 2v10a6 6 0 0 0 6 6v0a6 6 0 0 0 6-6V4a2 2 0 0 1 2-2" />
        <path d="M7 22a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z" />
    </svg>
  );
}
