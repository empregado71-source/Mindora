import React from 'react';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  showSlogan?: boolean;
  onClick?: () => void;
}

export const Logo: React.FC<LogoProps> = ({
  className = '',
  size = 'md',
  showSlogan = true,
  onClick
}) => {
  const iconSizes = {
    sm: 'w-8 h-8',
    md: 'w-11 h-11',
    lg: 'w-14 h-14'
  };

  const textSizes = {
    sm: 'text-xl',
    md: 'text-2xl',
    lg: 'text-3xl'
  };

  return (
    <div
      onClick={onClick}
      className={`inline-flex items-center gap-3 select-none ${onClick ? 'cursor-pointer group' : ''} ${className}`}
    >
      {/* Icon: Open Book combined with Graduation Cap Mortarboard */}
      <div
        className={`${iconSizes[size]} rounded-2xl bg-gradient-to-tr from-brand-700 via-brand-600 to-sky-400 p-2 text-white shadow-md shadow-brand-500/25 flex items-center justify-center shrink-0 transition-transform duration-200 group-hover:scale-105`}
      >
        <svg viewBox="0 0 100 100" fill="none" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          {/* Graduation Cap Mortarboard */}
          <polygon points="50,15 85,28 50,40 15,28" fill="#ffffff" />
          <polygon points="50,40 68,34 68,44 50,50 32,44 32,34" fill="#bae6fd" />
          {/* Tassel */}
          <path d="M50 28 L75 36 L75 52" stroke="#fde047" strokeWidth="3" strokeLinecap="round" />
          <circle cx="75" cy="54" r="2.5" fill="#fde047" />

          {/* Open Book Pages */}
          <path
            d="M20 62 C32 58 45 60 50 66 C55 60 68 58 80 62 L80 84 C68 80 55 82 50 88 C45 82 32 80 20 84 Z"
            fill="#ffffff"
            opacity="0.95"
          />
          {/* Book Spine Center Divider */}
          <line x1="50" y1="66" x2="50" y2="88" stroke="#0284c7" strokeWidth="2.5" strokeLinecap="round" />
          {/* Left Page Lines */}
          <line x1="28" y1="69" x2="44" y2="69" stroke="#93c5fd" strokeWidth="2" strokeLinecap="round" />
          <line x1="28" y1="75" x2="42" y2="75" stroke="#93c5fd" strokeWidth="2" strokeLinecap="round" />
          {/* Right Page Lines */}
          <line x1="56" y1="69" x2="72" y2="69" stroke="#93c5fd" strokeWidth="2" strokeLinecap="round" />
          <line x1="58" y1="75" x2="72" y2="75" stroke="#93c5fd" strokeWidth="2" strokeLinecap="round" />
        </svg>
      </div>

      {/* Brand Text */}
      <div className="flex flex-col justify-center">
        <div className="flex items-center gap-1.5 leading-none">
          <span
            className={`${textSizes[size]} font-black tracking-tight bg-gradient-to-r from-brand-800 via-brand-600 to-sky-500 bg-clip-text text-transparent`}
          >
            MINDORA
          </span>
          <span className="w-1.5 h-1.5 rounded-full bg-brand-500"></span>
        </div>
        {showSlogan && (
          <span className="text-[10px] font-extrabold uppercase tracking-widest text-brand-600 mt-1">
            Aprender. Jogar. Evoluir.
          </span>
        )}
      </div>
    </div>
  );
};
