import React from 'react';

export default function LogoIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 40 40"
      className={className}
      aria-hidden="true"
    >
      <g>
        <path d="M0 5 H25 V11 H6 V30 H0 V5 Z" fill="#c2802a" />
        <path d="M10 15 H35 V21 H16 V40 H10 V15 Z" fill="#24523a" />
      </g>
    </svg>
  );
}
