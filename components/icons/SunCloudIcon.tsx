import React from 'react';

export default function SunCloudIcon({ className }: { className?: string }) {
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
        <path d="M12 16.5A4.5 4.5 0 1 1 7.5 12a4.5 4.5 0 0 1 4.5 4.5z"/>
        <path d="M12 7.27V5"/>
        <path d="M12 21v-2.27"/>
        <path d="m16.5 12 2.27 0"/>
        <path d="M3.23 12H5.5"/>
        <path d="m15.55 8.45-1.6 1.6"/>
        <path d="m6.05 17.95 1.6-1.6"/>
        <path d="m8.45 8.45-1.6-1.6"/>
        <path d="m17.95 17.95-1.6-1.6"/>
        <path d="M16 16.5A4.5 4.5 0 0 0 17.5 8h-1.8a7 7 0 1 0-11.4 0H4.5A4.5 4.5 0 0 0 8 16.5h8z"/>
    </svg>
  );
}