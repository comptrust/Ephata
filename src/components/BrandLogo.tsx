import React from 'react';

interface BrandLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'light' | 'dark';
  showSubtitle?: boolean;
}

export const BrandLogo: React.FC<BrandLogoProps> = ({
  className = '',
  size = 'md',
  variant = 'dark',
  showSubtitle = true
}) => {
  const isDarkBg = variant === 'light';

  const dimensions = {
    sm: { iconWidth: 38, iconHeight: 24, titleSize: 'text-base', subSize: 'text-[9px]' },
    md: { iconWidth: 54, iconHeight: 34, titleSize: 'text-xl', subSize: 'text-[11px]' },
    lg: { iconWidth: 76, iconHeight: 48, titleSize: 'text-2xl md:text-3xl', subSize: 'text-xs md:text-sm' },
  }[size];

  return (
    <div className={`flex items-center gap-2.5 sm:gap-3 select-none ${className}`}>
      {/* Recreated SVG Mark matching the Ephata key-house logo */}
      <svg
        width={dimensions.iconWidth}
        height={dimensions.iconHeight}
        viewBox="0 0 160 90"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="flex-shrink-0 transition-transform duration-300 hover:scale-105"
      >
        <defs>
          <linearGradient id="ephataBlueGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#1E3A8A" />
            <stop offset="50%" stopColor="#1D4ED8" />
            <stop offset="100%" stopColor="#0B1E48" />
          </linearGradient>
          <linearGradient id="ephataGoldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#F59E0B" />
            <stop offset="50%" stopColor="#D97706" />
            <stop offset="100%" stopColor="#B45309" />
          </linearGradient>
          <filter id="shadowFilter" x="-10%" y="-10%" width="120%" height="120%">
            <feDropShadow dx="0" dy="2" stdDeviation="1.5" floodOpacity="0.2" />
          </filter>
        </defs>

        {/* Key Bow (Loops) */}
        <circle cx="28" cy="28" r="14" stroke="url(#ephataBlueGrad)" strokeWidth="6" fill="none" />
        <circle cx="28" cy="54" r="14" stroke="url(#ephataBlueGrad)" strokeWidth="6" fill="none" />
        <circle cx="48" cy="41" r="14" stroke="url(#ephataBlueGrad)" strokeWidth="6" fill="none" />
        <circle cx="20" cy="41" r="6" fill="url(#ephataBlueGrad)" />

        {/* Key Shaft / Beam */}
        <path
          d="M 52 41 L 110 41"
          stroke="url(#ephataBlueGrad)"
          strokeWidth="6"
          strokeLinecap="round"
        />

        {/* House / Roof Element at Key Bit */}
        <path
          d="M 108 41 L 118 20 L 138 20 L 148 41 L 148 58 L 108 58 Z"
          stroke="url(#ephataBlueGrad)"
          strokeWidth="5"
          strokeLinejoin="round"
          fill="none"
        />
        {/* House Chimney / Key Bit detail */}
        <path
          d="M 134 20 L 134 14 L 141 14 L 141 24"
          stroke="url(#ephataBlueGrad)"
          strokeWidth="4"
          strokeLinecap="round"
        />

        {/* 4 Golden Windows in House */}
        <rect x="122" y="32" width="6" height="6" rx="1" fill="#F59E0B" />
        <rect x="130" y="32" width="6" height="6" rx="1" fill="#F59E0B" />
        <rect x="122" y="40" width="6" height="6" rx="1" fill="#F59E0B" />
        <rect x="130" y="40" width="6" height="6" rx="1" fill="#F59E0B" />
      </svg>

      {/* Brand Typography */}
      <div className="flex flex-col">
        <div className="flex items-baseline gap-1.5 leading-none">
          <span className={`font-black tracking-tight ${dimensions.titleSize} text-amber-500`}>
            Ephata
          </span>
          <span
            className={`font-black tracking-tight ${dimensions.titleSize} ${
              isDarkBg ? 'text-white' : 'text-[#0B1E48]'
            }`}
          >
            Consulting Group
          </span>
        </div>

        {showSubtitle && (
          <div className="mt-1 flex items-center gap-1.5">
            <span
              className={`font-semibold tracking-wider uppercase ${dimensions.subSize} ${
                isDarkBg ? 'text-amber-300' : 'text-[#0B1E48]'
              }`}
            >
              Conseil
            </span>
            <span className="text-amber-500 font-bold text-xs">/</span>
            <span
              className={`font-semibold tracking-wider uppercase ${dimensions.subSize} ${
                isDarkBg ? 'text-amber-300' : 'text-[#0B1E48]'
              }`}
            >
              Formation
            </span>
            <span className="text-amber-500 font-bold text-xs">/</span>
            <span
              className={`font-semibold tracking-wider uppercase ${dimensions.subSize} ${
                isDarkBg ? 'text-amber-300' : 'text-[#0B1E48]'
              }`}
            >
              Accompagnement
            </span>
          </div>
        )}
      </div>
    </div>
  );
};
