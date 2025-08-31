import React from 'react';
import { BRAND } from '../../constants';

export default function Logo({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 350 50"
      className={className}
      aria-label={BRAND.title}
    >
      {/* Icon: Geometric Eck/Corner */}
      <g>
        <path d="M0 5 H25 V11 H6 V30 H0 V5 Z" fill="#c2802a" />
        <path d="M10 15 H35 V21 H16 V40 H10 V15 Z" fill="#24523a" />
      </g>

      {/* Text */}
      <text
        x="45"
        y="36"
        fontFamily="Montserrat, sans-serif"
        fontWeight="700"
        fontSize="32"
        fill="currentColor"
      >
        The Fläming Eck
      </text>
    </svg>
  );
}