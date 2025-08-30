
import React from 'react';

export default function TrainIcon({ className }: { className?: string }) {
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
      <rect width="16" height="16" x="4" y="3" rx="2" />
      <path d="M4 11h16" />
      <path d="M12 3v-2" />
      <path d="M20 19v2" />
      <path d="M4 19v2" />
      <path d="M12 19v2" />
      <path d="m8 19-2 2" />
      <path d="m18 21-2-2" />
    </svg>
  );
}
