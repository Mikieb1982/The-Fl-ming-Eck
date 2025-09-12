import React from 'react';

export default function PaletteIcon({ className }: { className?: string }) {
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
      <circle cx="12" cy="12" r="10" />
      <path d="M6 12c0-1.5.6-2.8 1.5-3.7" />
      <path d="M17.5 7.5a4.5 4.5 0 0 0-4.5 4.5" />
      <path d="M12 18a6 6 0 0 0 6-6" />
    </svg>
  );
}