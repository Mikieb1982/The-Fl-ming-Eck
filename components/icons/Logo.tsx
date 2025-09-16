import React from 'react';
import { BRAND } from '../../constants';

export default function Logo({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 400 50"
      className={className}
      aria-label={`${BRAND.title} - The Independent English-language magazine for Bad Belzig and the Hoher Fläming`}
    >
      {/* Icon: Geometric Eck/Corner */}
      <g transform="scale(0.8)">
        <path d="M0 5 H25 V11 H6 V30 H0 V5 Z" fill="#c2802a" />
        <path d="M10 15 H35 V21 H16 V40 H10 V15 Z" fill="#24523a" />
      </g>

      {/* Desktop Title */}
      <text
        className="hidden sm:block"
        x="40"
        y="35"
        fontFamily="Playfair Display, serif"
        fontWeight="900"
        fontSize="38"
        fill="currentColor"
        letterSpacing="-0.5"
      >
        The Fläming Eck
      </text>
      
      {/* Mobile Title */}
       <text
        className="block sm:hidden"
        x="40"
        y="35"
        fontFamily="Playfair Display, serif"
        fontWeight="900"
        fontSize="38"
        fill="currentColor"
        letterSpacing="-0.5"
      >
        Fläming Eck
      </text>
    </svg>
  );
}