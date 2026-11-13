import React from 'react';

interface MascotRobotProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  message?: string;
  mood?: 'happy' | 'thinking' | 'celebrating' | 'teaching';
  interactive?: boolean;
  onClick?: () => void;
}

export const MascotRobot: React.FC<MascotRobotProps> = ({
  className = '',
  size = 'md',
  message,
  mood = 'happy',
  interactive = false,
  onClick
}) => {
  const sizeMap = {
    sm: 'w-16 h-16',
    md: 'w-24 h-24',
    lg: 'w-36 h-36',
    xl: 'w-48 h-48'
  };

  return (
    <div
      onClick={onClick}
      className={`relative inline-flex flex-col items-center ${interactive ? 'cursor-pointer group' : ''} ${className}`}
    >
      {/* Speech bubble if message provided */}
      {message && (
        <div className="mb-2 px-3.5 py-1.5 bg-white text-slate-800 text-xs font-bold rounded-2xl shadow-md border border-brand-100 flex items-center gap-1.5 animate-bounce max-w-xs text-center z-10">
          <span className="text-brand-500">✨</span>
          <span>{message}</span>
        </div>
      )}

      {/* SVG Robot with Graduation Cap */}
      <div className={`relative ${sizeMap[size]} transition-transform duration-300 ${interactive ? 'group-hover:scale-105' : ''}`}>
        <svg
          viewBox="0 0 200 200"
          className="w-full h-full drop-shadow-lg"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            {/* Robot body gradients */}
            <linearGradient id="robotGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#38bdf8" />
              <stop offset="50%" stopColor="#0284c7" />
              <stop offset="100%" stopColor="#0369a1" />
            </linearGradient>
            <linearGradient id="screenGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#0f172a" />
              <stop offset="100%" stopColor="#1e293b" />
            </linearGradient>
            <linearGradient id="eyeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#38bdf8" />
              <stop offset="100%" stopColor="#7dd3fc" />
            </linearGradient>
            <linearGradient id="capGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#1e1b4b" />
              <stop offset="100%" stopColor="#312e81" />
            </linearGradient>
            <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#fbbf24" />
              <stop offset="100%" stopColor="#f59e0b" />
            </linearGradient>
            <linearGradient id="chestPlate" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#ffffff" />
              <stop offset="100%" stopColor="#e0f2fe" />
            </linearGradient>
          </defs>

          {/* Ears / Side Antennas */}
          <rect x="42" y="85" width="10" height="22" rx="5" fill="#0284c7" />
          <rect x="148" y="85" width="10" height="22" rx="5" fill="#0284c7" />
          <circle cx="47" cy="96" r="3" fill="#bae6fd" />
          <circle cx="153" cy="96" r="3" fill="#bae6fd" />

          {/* Robot Head Outer Box */}
          <rect
            x="50"
            y="65"
            width="100"
            height="75"
            rx="24"
            fill="url(#robotGrad)"
            stroke="#ffffff"
            strokeWidth="3"
          />

          {/* Face Visor / Screen */}
          <rect
            x="58"
            y="74"
            width="84"
            height="56"
            rx="18"
            fill="url(#screenGrad)"
          />

          {/* Cheerful Glowing Eyes */}
          {mood === 'happy' || mood === 'celebrating' ? (
            <>
              {/* Left Eye curved arch */}
              <path
                d="M72 102 C72 90, 88 90, 88 102"
                stroke="url(#eyeGrad)"
                strokeWidth="5"
                strokeLinecap="round"
                fill="none"
              />
              {/* Right Eye curved arch */}
              <path
                d="M112 102 C112 90, 128 90, 128 102"
                stroke="url(#eyeGrad)"
                strokeWidth="5"
                strokeLinecap="round"
                fill="none"
              />
            </>
          ) : mood === 'thinking' ? (
            <>
              <circle cx="80" cy="98" r="6" fill="#38bdf8" />
              <circle cx="120" cy="94" r="7" fill="#38bdf8" />
              <path d="M114 86 Q120 83 126 86" stroke="#bae6fd" strokeWidth="2" strokeLinecap="round" />
            </>
          ) : (
            <>
              <circle cx="80" cy="98" r="7" fill="#38bdf8" />
              <circle cx="120" cy="98" r="7" fill="#38bdf8" />
              <circle cx="82" cy="96" r="2.5" fill="#ffffff" />
              <circle cx="122" cy="96" r="2.5" fill="#ffffff" />
            </>
          )}

          {/* Cheeks blush */}
          <ellipse cx="68" cy="112" rx="4.5" ry="3" fill="#f43f5e" opacity="0.6" />
          <ellipse cx="132" cy="112" rx="4.5" ry="3" fill="#f43f5e" opacity="0.6" />

          {/* Happy Mouth / smile LED */}
          <path
            d="M92 114 Q100 121 108 114"
            stroke="#38bdf8"
            strokeWidth="3"
            strokeLinecap="round"
            fill="none"
          />

          {/* Neck */}
          <rect x="88" y="140" width="24" height="10" rx="3" fill="#0369a1" />

          {/* Body Torso */}
          <rect
            x="60"
            y="148"
            width="80"
            height="46"
            rx="18"
            fill="url(#robotGrad)"
            stroke="#ffffff"
            strokeWidth="2.5"
          />

          {/* Torso Chest Plate / Core */}
          <rect
            x="76"
            y="156"
            width="48"
            height="26"
            rx="10"
            fill="url(#chestPlate)"
            stroke="#bae6fd"
            strokeWidth="1.5"
          />

          {/* Center Heart / Sparkle on Chest */}
          <path
            d="M100 162 L102 168 L108 170 L102 172 L100 178 L98 172 L92 170 L98 168 Z"
            fill="url(#goldGrad)"
          />

          {/* Graduation Cap (Mortarboard) on Head */}
          {/* Cap Skull Base */}
          <path
            d="M74 58 C74 48, 126 48, 126 58 Z"
            fill="url(#capGrad)"
          />

          {/* Cap Diamond Top (Angled Mortarboard) */}
          <polygon
            points="100,26 160,46 100,64 40,46"
            fill="url(#capGrad)"
            stroke="#4338ca"
            strokeWidth="2"
          />

          {/* Cap Button / Tassel Center */}
          <circle cx="100" cy="45" r="4" fill="url(#goldGrad)" />

          {/* Golden Tassel Hanging Down Right */}
          <path
            d="M100 45 Q125 50 144 68"
            stroke="url(#goldGrad)"
            strokeWidth="2.5"
            strokeLinecap="round"
            fill="none"
          />
          {/* Tassel Fringe */}
          <polygon
            points="141,66 148,68 145,80 138,78"
            fill="url(#goldGrad)"
          />

          {/* Small Floating Sparkles around robot */}
          <circle cx="36" cy="60" r="2.5" fill="#facc15" className="animate-ping" />
          <circle cx="166" cy="74" r="2" fill="#38bdf8" />
          <circle cx="158" cy="140" r="2.5" fill="#fbbf24" />
        </svg>
      </div>
    </div>
  );
};
