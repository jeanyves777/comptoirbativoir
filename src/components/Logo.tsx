'use client'

interface LogoProps {
  size?: 'sm' | 'md' | 'lg'
  variant?: 'dark' | 'light' | 'auto'
  showText?: boolean
}

const sizeConfig = {
  sm: { icon: 40, textSize: '0.5rem', gap: 4, letterSpacing: '0.08em' },
  md: { icon: 64, textSize: '0.65rem', gap: 6, letterSpacing: '0.1em' },
  lg: { icon: 96, textSize: '0.85rem', gap: 8, letterSpacing: '0.12em' },
}

export default function Logo({ size = 'md', variant = 'auto', showText = true }: LogoProps) {
  const config = sizeConfig[size]

  const getColors = () => {
    if (variant === 'dark') {
      return { primary: '#f59e0b', secondary: '#0f172a', text: '#0f172a' }
    }
    if (variant === 'light') {
      return { primary: '#f59e0b', secondary: '#ffffff', text: '#ffffff' }
    }
    // auto - uses CSS currentColor approach
    return { primary: '#f59e0b', secondary: 'currentColor', text: 'currentColor' }
  }

  const colors = getColors()

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
        viewBox="0 0 120 120"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-label="CBI Logo"
      >
        {/* Shield / Hexagonal shape */}
        <path
          d="M60 4L108 28V72C108 90 88 108 60 116C32 108 12 90 12 72V28L60 4Z"
          fill={colors.primary}
          stroke={colors.primary}
          strokeWidth="2"
          strokeLinejoin="round"
        />

        {/* Inner shield cutout */}
        <path
          d="M60 12L102 33V72C102 86.5 84.5 102 60 109C35.5 102 18 86.5 18 72V33L60 12Z"
          fill={variant === 'dark' ? '#0f172a' : variant === 'light' ? '#1e293b' : '#0f172a'}
        />

        {/* Letter C */}
        <path
          d="M30 52C30 40.954 38.954 32 50 32H54V40H50C43.373 40 38 45.373 38 52V62C38 68.627 43.373 74 50 74H54V82H50C38.954 82 30 73.046 30 62V52Z"
          fill={colors.primary}
          opacity="0.95"
        />

        {/* Letter B with lightning bolt integrated */}
        <path
          d="M56 32H68C74.627 32 80 37.373 80 44V46C80 49.5 78.2 52.6 75.4 54.4C79.1 56.3 82 60 82 64V68C82 75.18 76.18 82 69 82H56V32Z"
          fill={colors.primary}
          opacity="0.95"
        />
        {/* B inner cutout top */}
        <path
          d="M64 40H66C69.314 40 72 42.686 72 46V47C72 50.314 69.314 53 66 53H64V40Z"
          fill={variant === 'dark' ? '#0f172a' : variant === 'light' ? '#1e293b' : '#0f172a'}
        />
        {/* B inner cutout bottom */}
        <path
          d="M64 59H68C71.866 59 75 62.134 75 66V67C75 70.866 71.866 74 68 74H64V59Z"
          fill={variant === 'dark' ? '#0f172a' : variant === 'light' ? '#1e293b' : '#0f172a'}
        />

        {/* Lightning bolt overlay on B - the key brand element */}
        <path
          d="M72 36L63 56H71L60 82L68 60H61L72 36Z"
          fill={variant === 'dark' ? '#0f172a' : variant === 'light' ? '#1e293b' : '#0f172a'}
          opacity="0.6"
        />
        <path
          d="M73 35L64 55H72L61 81L69 59H62L73 35Z"
          fill="#fbbf24"
          opacity="0.35"
        />

        {/* Letter I */}
        <path
          d="M86 32H96V82H86V32Z"
          fill={colors.primary}
          opacity="0.95"
        />

        {/* Circuit/wire pattern at shield bottom */}
        <g opacity="0.5">
          <line x1="35" y1="92" x2="60" y2="92" stroke={colors.primary} strokeWidth="1.5" strokeLinecap="round" />
          <line x1="65" y1="92" x2="85" y2="92" stroke={colors.primary} strokeWidth="1.5" strokeLinecap="round" />
          <circle cx="60" cy="92" r="2.5" fill={colors.primary} />
          <circle cx="35" cy="92" r="1.5" fill={colors.primary} />
          <circle cx="85" cy="92" r="1.5" fill={colors.primary} />
          <line x1="45" y1="98" x2="75" y2="98" stroke={colors.primary} strokeWidth="1" strokeLinecap="round" />
          <circle cx="45" cy="98" r="1.2" fill={colors.primary} />
          <circle cx="75" cy="98" r="1.2" fill={colors.primary} />
          <line x1="60" y1="92" x2="60" y2="98" stroke={colors.primary} strokeWidth="1" strokeLinecap="round" />
        </g>

        {/* Subtle gear teeth on shield edges */}
        <g opacity="0.3">
          <rect x="10" y="42" width="4" height="6" rx="1" fill={colors.primary} />
          <rect x="10" y="54" width="4" height="6" rx="1" fill={colors.primary} />
          <rect x="10" y="66" width="4" height="6" rx="1" fill={colors.primary} />
          <rect x="106" y="42" width="4" height="6" rx="1" fill={colors.primary} />
          <rect x="106" y="54" width="4" height="6" rx="1" fill={colors.primary} />
          <rect x="106" y="66" width="4" height="6" rx="1" fill={colors.primary} />
        </g>
      </svg>

      {showText && (
        <span
          style={{
            fontSize: config.textSize,
            fontWeight: 700,
            letterSpacing: config.letterSpacing,
            textTransform: 'uppercase' as const,
            color: colors.text,
            textAlign: 'center' as const,
            lineHeight: 1.3,
            maxWidth: `${config.icon * 2.2}px`,
            fontFamily: 'inherit',
          }}
        >
          Comptoir des B&acirc;tisseurs Ivoiriens
        </span>
      )}
    </div>
  )
}
