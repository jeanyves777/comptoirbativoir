'use client'

interface LogoProps {
  size?: 'sm' | 'md' | 'lg'
  variant?: 'dark' | 'light' | 'auto'
  showText?: boolean
}

const sizeConfig = {
  sm: { icon: 40, textSize: '0.5rem', gap: 4, letterSpacing: '0.08em' },
  md: { icon: 56, textSize: '0.6rem', gap: 6, letterSpacing: '0.1em' },
  lg: { icon: 80, textSize: '0.75rem', gap: 8, letterSpacing: '0.12em' },
}

export default function Logo({ size = 'md', variant = 'auto', showText = true }: LogoProps) {
  const config = sizeConfig[size]

  const amber = '#f59e0b'
  const amberLight = '#fbbf24'
  const dark = variant === 'light' ? '#ffffff' : variant === 'dark' ? '#0f172a' : 'currentColor'

  return (
    <div
      style={{
        display: 'inline-flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: `${config.gap}px`,
      }}
    >
      <svg
        width={config.icon}
        height={config.icon}
        viewBox="0 0 200 200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-label="CBI Logo"
      >
        <defs>
          <linearGradient id="logoGrad" x1="0" y1="0" x2="200" y2="200" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor={amberLight} />
            <stop offset="100%" stopColor={amber} />
          </linearGradient>
          <linearGradient id="boltGrad" x1="100" y1="30" x2="100" y2="170" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#fde68a" />
            <stop offset="100%" stopColor={amber} />
          </linearGradient>
        </defs>

        {/* Outer rounded square frame */}
        <rect
          x="8" y="8" width="184" height="184" rx="32"
          stroke="url(#logoGrad)" strokeWidth="5" fill="none"
        />

        {/* Inner accent lines - top left and bottom right corners */}
        <path d="M40 8 L40 28 Q40 40 28 40 L8 40" stroke={amber} strokeWidth="3" fill="none" strokeLinecap="round" />
        <path d="M160 192 L160 172 Q160 160 172 160 L192 160" stroke={amber} strokeWidth="3" fill="none" strokeLinecap="round" />

        {/* Letter C */}
        <path
          d="M38 80 C38 58 54 42 76 42 L84 42 L84 56 L76 56 C63 56 54 65 54 80 L54 120 C54 135 63 144 76 144 L84 144 L84 158 L76 158 C54 158 38 142 38 120 Z"
          fill="url(#logoGrad)"
        />

        {/* Letter B */}
        <path
          d="M92 42 L120 42 C136 42 146 52 146 66 C146 74 142 80 135 84 C144 88 150 96 150 108 L150 112 C150 128 138 158 120 158 L92 158 Z"
          fill="url(#logoGrad)"
        />
        {/* B inner cutout top */}
        <rect x="108" y="56" width="22" height="22" rx="8" fill={variant === 'dark' ? '#0f172a' : variant === 'light' ? '#1e293b' : '#0f172a'} />
        {/* B inner cutout bottom */}
        <rect x="108" y="90" width="26" height="24" rx="8" fill={variant === 'dark' ? '#0f172a' : variant === 'light' ? '#1e293b' : '#0f172a'} />

        {/* Lightning bolt - the key brand element */}
        <path
          d="M122 36 L106 88 L120 88 L98 168 L118 104 L104 104 L122 36Z"
          fill="url(#boltGrad)"
          opacity="0.9"
        />

        {/* Letter I */}
        <path
          d="M158 42 L178 42 L178 158 L158 158 Z"
          fill="url(#logoGrad)"
        />
        {/* I dot accent */}
        <circle cx="168" cy="30" r="6" fill={amber} />

        {/* Bottom circuit line decoration */}
        <g opacity="0.6">
          <line x1="30" y1="178" x2="80" y2="178" stroke={amber} strokeWidth="2" strokeLinecap="round" />
          <circle cx="80" cy="178" r="3" fill={amber} />
          <line x1="80" y1="178" x2="120" y2="178" stroke={amber} strokeWidth="1.5" strokeLinecap="round" strokeDasharray="4 4" />
          <circle cx="120" cy="178" r="3" fill={amber} />
          <line x1="120" y1="178" x2="170" y2="178" stroke={amber} strokeWidth="2" strokeLinecap="round" />
        </g>
      </svg>

      {showText && (
        <span
          style={{
            fontSize: config.textSize,
            fontWeight: 700,
            letterSpacing: config.letterSpacing,
            textTransform: 'uppercase' as const,
            color: dark,
            textAlign: 'center' as const,
            lineHeight: 1.3,
            maxWidth: `${config.icon * 2.5}px`,
            fontFamily: 'inherit',
          }}
        >
          Comptoir des B&acirc;tisseurs Ivoiriens
        </span>
      )}
    </div>
  )
}
