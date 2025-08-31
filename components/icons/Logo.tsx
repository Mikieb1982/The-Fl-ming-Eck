
import React from 'react';
import { BRAND } from '../../constants';

export default function Logo({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 520 80"
      className={className}
      aria-label={`${BRAND.title} - The Independent English-language magazine for Bad Belzig and the Hoher Fläming`}
    >
      {/* Icon: Geometric Eck/Corner */}
      <g>
        <path d="M0 5 H25 V11 H6 V30 H0 V5 Z" fill="#c2802a" />
        <path d="M10 15 H35 V21 H16 V40 H10 V15 Z" fill="#24523a" />
      </g>

      {/* Main Title */}
      <text
        x="45"
        y="32"
        fontFamily="Montserrat, sans-serif"
        fontWeight="700"
        fontSize="32"
        fill="currentColor"
      >
        The Fläming Eck
      </text>

      {/* Tagline Motto */}
      <text
        x="45"
        y="48"
        fontFamily="Inter, sans-serif"
        fontWeight="500"
        fontSize="11"
        fill="currentColor"
        opacity="0.7"
      >
        <tspan x="45" dy="1.2em">The Independent English-language magazine</tspan>
        <tspan x="45" dy="1.2em">for Bad Belzig and the Hoher Fläming</tspan>
      </text>
    </svg>
  );
}