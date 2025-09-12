import React from 'react';

export default function RunningIcon({ className }: { className?: string }) {
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
      <circle cx="6.5" cy="4.5" r="2.5" />
      <path d="M14 11.5 8 18" />
      <path d="m7 13 2.5 2.5" />
      <path d="M18 13.5 12 20" />
      <path d="m17 8.5 2.5 2.5" />
    </svg>
  );
}