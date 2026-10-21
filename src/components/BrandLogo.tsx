import React, { useState } from 'react';
import { logoEphata } from '../assets/images';

interface BrandLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'light' | 'dark';
  showSubtitle?: boolean;
}

export const BrandLogo: React.FC<BrandLogoProps> = ({
  className = '',
  size = 'md',
  variant = 'dark',
  showSubtitle = true,
}) => {
  const [imageError, setImageError] = useState(false);
  const isDarkBg = variant === 'light'; // variant 'light' means the logo is placed on a dark background

  // Size configurations
  const heightClasses = {
    sm: 'h-8 sm:h-9 max-w-[120px]',
    md: 'h-11 sm:h-12 max-w-[170px]',
    lg: 'h-16 sm:h-20 max-w-[240px]',
    xl: 'h-20 sm:h-24 max-w-[300px]',
  }[size];

  // If the image fails to load, gracefully fall back to the vector mark
  if (imageError) {
    const dimensions = {
      sm: { iconWidth: 38, iconHeight: 24, titleSize: 'text-base', subSize: 'text-[9px]' },
      md: { iconWidth: 54, iconHeight: 34, titleSize: 'text-xl', subSize: 'text-[11px]' },
      lg: { iconWidth: 76, iconHeight: 48, titleSize: 'text-2xl md:text-3xl', subSize: 'text-xs md:text-sm' },
      xl: { iconWidth: 90, iconHeight: 56, titleSize: 'text-3xl md:text-4xl', subSize: 'text-sm' },
    }[size];

    return (
      <div className={`flex items-center gap-2.5 select-none ${className}`}>
        <svg
          width={dimensions.iconWidth}
          height={dimensions.iconHeight}
          viewBox="0 0 160 90"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="flex-shrink-0"
        >
          <circle cx="28" cy="28" r="14" stroke="#1D4ED8" strokeWidth="6" fill="none" />
          <circle cx="28" cy="54" r="14" stroke="#1D4ED8" strokeWidth="6" fill="none" />
          <circle cx="48" cy="41" r="14" stroke="#1D4ED8" strokeWidth="6" fill="none" />
          <path d="M 52 41 L 110 41" stroke="#1D4ED8" strokeWidth="6" strokeLinecap="round" />
          <path d="M 108 41 L 118 20 L 138 20 L 148 41 L 148 58 L 108 58 Z" stroke="#1D4ED8" strokeWidth="5" fill="none" />
          <rect x="122" y="32" width="6" height="6" rx="1" fill="#F59E0B" />
          <rect x="130" y="32" width="6" height="6" rx="1" fill="#F59E0B" />
          <rect x="122" y="40" width="6" height="6" rx="1" fill="#F59E0B" />
          <rect x="130" y="40" width="6" height="6" rx="1" fill="#F59E0B" />
        </svg>
        <div className="flex flex-col">
          <div className="flex items-baseline gap-1 leading-none font-black">
            <span className="text-amber-500">Ephata</span>
            <span className={isDarkBg ? 'text-white' : 'text-[#0B1E48]'}>Consulting Group</span>
          </div>
          {showSubtitle && (
            <span className={`text-[10px] font-semibold tracking-wide uppercase ${isDarkBg ? 'text-slate-300' : 'text-slate-500'}`}>
              Conseil / Formation / Accompagnement
            </span>
          )}
        </div>
      </div>
    );
  }

  // Real uploaded official logo
  return (
    <div
      className={`inline-flex items-center select-none ${
        isDarkBg ? 'bg-white p-1.5 sm:p-2 rounded-xl shadow-md border border-white/20' : ''
      } ${className}`}
    >
      <img
        src={logoEphata}
        alt="Ephata Consulting Group - Conseil / Formation / Accompagnement"
        className={`${heightClasses} w-auto object-contain transition-transform duration-200 hover:scale-[1.02]`}
        onError={() => setImageError(true)}
      />
    </div>
  );
};
