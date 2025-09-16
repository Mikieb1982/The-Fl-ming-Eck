
import React from 'react';

export default function BrainIcon({ className }: { className?: string }) {
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
      <path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v1a2.5 2.5 0 0 1-2.5 2.5h-1A2.5 2.5 0 0 1 6 5.5v-1A2.5 2.5 0 0 1 8.5 2h1Z" />
      <path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v1a2.5 2.5 0 0 0 2.5 2.5h1A2.5 2.5 0 0 0 18 5.5v-1A2.5 2.5 0 0 0 15.5 2h-1Z" />
      <path d="M6 10a2.5 2.5 0 0 1 2.5 2.5v1A2.5 2.5 0 0 1 6 16H5a2.5 2.5 0 0 1-2.5-2.5v-1A2.5 2.5 0 0 1 5 10h1Z" />
      <path d="M18 10a2.5 2.5 0 0 0-2.5 2.5v1a2.5 2.5 0 0 0 2.5 2.5h1a2.5 2.5 0 0 0 2.5-2.5v-1a2.5 2.5 0 0 0-2.5-2.5h-1Z" />
      <path d="M12 11a2.5 2.5 0 0 1 2.5 2.5v4a2.5 2.5 0 0 1-2.5 2.5h-0a2.5 2.5 0 0 1-2.5-2.5v-4A2.5 2.5 0 0 1 12 11Z" />
      <path d="M6.5 8.5c.5 1 1.5 1.5 2.5 1.5" />
      <path d="M15 10c1 0 2-.5 2.5-1.5" />
    </svg>
  );
}
