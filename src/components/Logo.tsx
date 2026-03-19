'use client'

interface LogoProps {
  size?: 'sm' | 'md' | 'lg'
  showText?: boolean
}

const sizeConfig = {
  sm: { icon: 36, textSize: '0.65rem', gap: 4, subtitleSize: '0.4rem' },
  md: { icon: 48, textSize: '0.8rem', gap: 6, subtitleSize: '0.5rem' },
  lg: { icon: 72, textSize: '1rem', gap: 8, subtitleSize: '0.6rem' },
}

export default function Logo({ size = 'md', showText = true }: LogoProps) {
  const config = sizeConfig[size]
  const uid = `logo-${size}`

  return (
    <div
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: `${config.gap + 4}px`,
      }}
    >
      <svg
        width={config.icon}
        height={config.icon}
        viewBox="0 0 120 120"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-label="CBI Logo"
      >
        <defs>
          <linearGradient id={`${uid}-amber`} x1="0" y1="0" x2="120" y2="120" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#fbbf24" />
            <stop offset="100%" stopColor="#f59e0b" />
          </linearGradient>
          <linearGradient id={`${uid}-bolt`} x1="60" y1="20" x2="60" y2="90" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#fde68a" />
            <stop offset="100%" stopColor="#f59e0b" />
          </linearGradient>
        </defs>

        {/* Rounded square background */}
        <rect x="4" y="4" width="112" height="112" rx="22" fill="#0f172a" />
        <rect x="4" y="4" width="112" height="112" rx="22" stroke={`url(#${uid}-amber)`} strokeWidth="3" fill="none" />

        {/* Letter C */}
        <path
          d="M22 46 Q22 30 38 30 L46 30 L46 38 L38 38 Q32 38 32 46 L32 68 Q32 76 38 76 L46 76 L46 84 L38 84 Q22 84 22 68 Z"
          fill={`url(#${uid}-amber)`}
        />

        {/* Letter B */}
        <path
          d="M52 30 L70 30 Q82 30 82 40 Q82 48 74 50 Q84 52 84 62 Q84 74 72 74 L68 74 L52 74 Z
             M62 38 L62 47 L68 47 Q72 47 72 42 Q72 38 68 38 Z
             M62 54 L62 66 L70 66 Q74 66 74 60 Q74 54 70 54 Z"
          fill={`url(#${uid}-amber)`}
          fillRule="evenodd"
        />

        {/* Letter I - stem */}
        <rect x="90" y="30" width="10" height="44" rx="2" fill={`url(#${uid}-amber)`} />

        {/* Lightning bolt through the I */}
        <path
          d="M99 26 L91 50 L96 50 L88 78 L100 48 L95 48 L103 26 Z"
          fill={`url(#${uid}-bolt)`}
        />

        {/* Circuit line decoration at the bottom */}
        <g opacity="0.5">
          <line x1="18" y1="98" x2="38" y2="98" stroke="#f59e0b" strokeWidth="1.5" strokeLinecap="round" />
          <circle cx="38" cy="98" r="2.5" fill="#f59e0b" />
          <line x1="43" y1="98" x2="58" y2="98" stroke="#f59e0b" strokeWidth="1" strokeLinecap="round" strokeDasharray="3 3" />
          <circle cx="62" cy="98" r="2" fill="#f59e0b" />
          <line x1="66" y1="98" x2="78" y2="98" stroke="#f59e0b" strokeWidth="1" strokeLinecap="round" strokeDasharray="3 3" />
          <circle cx="82" cy="98" r="2.5" fill="#f59e0b" />
          <line x1="85" y1="98" x2="102" y2="98" stroke="#f59e0b" strokeWidth="1.5" strokeLinecap="round" />
        </g>

        {/* Small circuit node branch going down */}
        <g opacity="0.35">
          <line x1="62" y1="98" x2="62" y2="106" stroke="#f59e0b" strokeWidth="1" strokeLinecap="round" />
          <circle cx="62" cy="107" r="1.5" fill="#f59e0b" />
        </g>
      </svg>

      {showText && (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '1px',
          }}
        >
          <span
            className="text-slate-900 dark:text-white"
            style={{
              fontSize: config.textSize,
              fontWeight: 800,
              letterSpacing: '0.05em',
              lineHeight: 1.1,
            }}
          >
            CBI
          </span>
          <span
            className="text-slate-500 dark:text-slate-400"
            style={{
              fontSize: config.subtitleSize,
              fontWeight: 500,
              letterSpacing: '0.02em',
              lineHeight: 1.3,
            }}
          >
            Comptoir des B&#226;tisseurs Ivoiriens
          </span>
        </div>
      )}
    </div>
  )
}
