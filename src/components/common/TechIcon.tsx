import React from 'react';

interface TechIconProps {
  name: string;
  size?: number;
}

export const TechIcon: React.FC<TechIconProps> = ({ name, size = 18 }) => {
  const normalized = name.toLowerCase().trim();

  // Next.js
  if (normalized.includes('next')) {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5" />
        <path d="M9 16V8L16.5 17.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M15 8V12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    );
  }

  // React
  if (normalized.includes('react')) {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <ellipse cx="12" cy="12" rx="3.5" ry="9" stroke="currentColor" strokeWidth="1.5" transform="rotate(30 12 12)" />
        <ellipse cx="12" cy="12" rx="3.5" ry="9" stroke="currentColor" strokeWidth="1.5" transform="rotate(90 12 12)" />
        <ellipse cx="12" cy="12" rx="3.5" ry="9" stroke="currentColor" strokeWidth="1.5" transform="rotate(150 12 12)" />
        <circle cx="12" cy="12" r="1.5" fill="currentColor" />
      </svg>
    );
  }

  // TypeScript
  if (normalized.includes('typescript') || normalized === 'ts') {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <rect x="3" y="3" width="18" height="18" rx="4" stroke="currentColor" strokeWidth="1.5" />
        <path d="M7 9H13M10 9V17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M14 15.5C14.5 16.5 15.5 17 16.8 17C18 17 19 16.2 19 15C19 13.8 18 13.2 16.8 12.8L16.2 12.6C15 12.2 14.2 11.6 14.2 10.5C14.2 9.4 15.2 8.6 16.5 8.6C17.6 8.6 18.5 9.1 18.8 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    );
  }

  // Tailwind CSS (Official Fluid Waves)
  if (normalized.includes('tailwind')) {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
        <path d="M12.001 4.8c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624C13.666 10.618 15.027 12 18.001 12c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C16.337 6.182 14.976 4.8 12.001 4.8zm-6 7.2c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624 1.177 1.194 2.538 2.576 5.512 2.576 3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C10.337 13.382 8.976 12 6.001 12z" />
      </svg>
    );
  }

  // Figma
  if (normalized.includes('figma')) {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <path d="M8 3.5H12V8H8C6.6 8 5.5 6.9 5.5 5.5C5.5 4.1 6.6 3.5 8 3.5Z" stroke="currentColor" strokeWidth="1.5" />
        <path d="M12 3.5H16C17.4 3.5 18.5 4.6 18.5 6C18.5 7.4 17.4 8.5 16 8.5H12V3.5Z" stroke="currentColor" strokeWidth="1.5" />
        <path d="M12 8.5H16C17.4 8.5 18.5 9.6 18.5 11C18.5 12.4 17.4 13.5 16 13.5H12V8.5Z" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="9.5" cy="11" r="2.5" stroke="currentColor" strokeWidth="1.5" />
        <path d="M12 13.5H9C7.6 13.5 6.5 14.6 6.5 16C6.5 17.4 7.6 18.5 9 18.5C10.4 18.5 12 17.4 12 16V13.5Z" stroke="currentColor" strokeWidth="1.5" />
      </svg>
    );
  }

  // Three.js / WebGL
  if (normalized.includes('three') || normalized.includes('webgl')) {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <path d="M12 3L21 8V16L12 21L3 16V8L12 3Z" stroke="currentColor" strokeWidth="1.5" />
        <path d="M12 3V12M12 21V12M3 8L12 12L21 8" stroke="currentColor" strokeWidth="1.5" />
      </svg>
    );
  }

  // Framer Motion (Official Triangles)
  if (normalized.includes('framer')) {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
        <path d="M4 2h16v7h-8zM4 9h8l8 7H4zM4 16h8v6z" />
      </svg>
    );
  }

  // GSAP / GreenSock Motion
  if (normalized.includes('gsap') || normalized.includes('greensock') || normalized.includes('motion')) {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        {/* Speed motion lines on left */}
        <line x1="3" y1="8" x2="6.5" y2="8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        <line x1="2" y1="12" x2="5.5" y2="12" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        <line x1="3" y1="16" x2="6.5" y2="16" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        {/* Bold Athletic Motion 'G' */}
        <path
          d="M17 7.5C15.8 6.5 14.2 6 12.2 6C8.2 6 5.5 9 5.5 13C5.5 17 8.2 20 12.2 20C16 20 18 17.5 18 14.5V12.5H12"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {/* Motion Speed Arrow Top Right */}
        <path
          d="M17.5 5.5L19.5 7.5L17.5 9.5"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  }

  // Lenis Smooth Scroll
  if (normalized.includes('lenis') || normalized.includes('scroll')) {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <rect x="6" y="3" width="12" height="18" rx="6" stroke="currentColor" strokeWidth="1.5" />
        <path d="M12 7V11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
    );
  }

  // Node.js
  if (normalized.includes('node')) {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <path d="M12 3L20 7.5V16.5L12 21L4 16.5V7.5L12 3Z" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.5" />
      </svg>
    );
  }

  // Supabase / Database
  if (normalized.includes('supabase') || normalized.includes('sql') || normalized.includes('mongo')) {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <ellipse cx="12" cy="6" rx="8" ry="3" stroke="currentColor" strokeWidth="1.5" />
        <path d="M4 6V12C4 13.7 7.6 15 12 15C16.4 15 20 13.7 20 12V6" stroke="currentColor" strokeWidth="1.5" />
        <path d="M4 12V18C4 19.7 7.6 21 12 21C16.4 21 20 19.7 20 18V12" stroke="currentColor" strokeWidth="1.5" />
      </svg>
    );
  }

  // Default Code / Tool
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path d="M16 18L22 12L16 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M8 6L2 12L8 18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
};
