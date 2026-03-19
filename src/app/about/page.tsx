'use client'

import { useRef } from 'react'
import { motion, useInView, useScroll, useTransform } from 'framer-motion'
import {
  Award,
  Shield,
  Clock,
  Users,
  Zap,
  Target,
  CheckCircle2,
  Building2,
  Lightbulb,
  Wrench,
  BatteryCharging,
  Snowflake,
  Monitor,
  TrendingUp,
  Handshake,
  Star,
} from 'lucide-react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { companyInfo, expertise } from '@/lib/data'
import type { LucideIcon } from 'lucide-react'

/* ------------------------------------------------------------------ */
/*  Animation helpers                                                   */
/* ------------------------------------------------------------------ */
const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] as const },
  }),
}

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
}

/* ------------------------------------------------------------------ */
/*  Inline SVG – Office Building with Electrical Symbols                */
/* ------------------------------------------------------------------ */
function OfficeBuildingSVG() {
  const draw = (delay: number, dur = 2) => ({
    initial: { pathLength: 0, opacity: 0 },
    animate: { pathLength: 1, opacity: 1 },
    transition: { duration: dur, delay, ease: 'easeInOut' as const },
  })

  return (
    <motion.svg
      viewBox="0 0 500 400"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-full max-w-[500px] mx-auto"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <defs>
        <filter id="aboutGlow">
          <feGaussianBlur stdDeviation="4" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <filter id="aboutGlowStrong">
          <feGaussianBlur stdDeviation="8" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Ground line */}
      <motion.line
        x1="30" y1="360" x2="470" y2="360"
        stroke="#f59e0b" strokeWidth="1.5" strokeDasharray="6 4"
        filter="url(#aboutGlow)"
        {...draw(0.2, 1.5)}
      />

      {/* Main building */}
      <motion.rect
        x="120" y="100" width="160" height="260" rx="4"
        stroke="#f59e0b" strokeWidth="2" fill="#f59e0b" fillOpacity="0.03"
        filter="url(#aboutGlow)"
        {...draw(0.3, 2)}
      />

      {/* Building top / antenna */}
      <motion.line
        x1="200" y1="100" x2="200" y2="60"
        stroke="#f59e0b" strokeWidth="2" filter="url(#aboutGlow)"
        {...draw(0.8, 1)}
      />
      <motion.circle
        cx="200" cy="55" r="5" stroke="#f59e0b" strokeWidth="1.5" fill="#f59e0b" fillOpacity="0.2"
        filter="url(#aboutGlowStrong)"
        animate={{ r: [4, 6, 4], opacity: [0.6, 1, 0.6] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' as const }}
      />

      {/* Signal waves from antenna */}
      {[0, 1, 2].map((i) => (
        <motion.path
          key={`signal-${i}`}
          d={`M ${205 + i * 12} ${50 - i * 5} Q ${215 + i * 15} ${35 - i * 8} ${210 + i * 12} ${20 - i * 5}`}
          stroke="#f59e0b" strokeWidth={1.5 - i * 0.3} strokeLinecap="round" fill="none"
          filter="url(#aboutGlow)"
          animate={{ opacity: [0, 0.8, 0] }}
          transition={{ duration: 2, delay: 1.5 + i * 0.4, repeat: Infinity, ease: 'easeInOut' as const }}
        />
      ))}

      {/* Windows grid */}
      {[0, 1, 2, 3, 4].map((row) =>
        [0, 1, 2].map((col) => (
          <motion.rect
            key={`win-${row}-${col}`}
            x={140 + col * 45}
            y={120 + row * 45}
            width="25"
            height="30"
            rx="2"
            stroke="#f59e0b"
            strokeWidth="1"
            fill="#f59e0b"
            fillOpacity="0.08"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1 + (row * 3 + col) * 0.05, duration: 0.4 }}
          />
        )),
      )}

      {/* Window glow animation (random lights) */}
      {[
        { x: 140, y: 120 },
        { x: 230, y: 165 },
        { x: 185, y: 210 },
        { x: 140, y: 300 },
        { x: 230, y: 255 },
      ].map((pos, i) => (
        <motion.rect
          key={`glow-${i}`}
          x={pos.x}
          y={pos.y}
          width="25"
          height="30"
          rx="2"
          fill="#f59e0b"
          fillOpacity="0.15"
          animate={{ fillOpacity: [0.05, 0.2, 0.05] }}
          transition={{ duration: 3 + i * 0.5, repeat: Infinity, ease: 'easeInOut' as const, delay: i * 0.8 }}
        />
      ))}

      {/* Door */}
      <motion.rect
        x="180" y="325" width="40" height="35" rx="3"
        stroke="#f59e0b" strokeWidth="1.5" fill="#f59e0b" fillOpacity="0.1"
        {...draw(1.2, 1)}
      />

      {/* Left smaller building */}
      <motion.rect
        x="40" y="200" width="70" height="160" rx="3"
        stroke="#f59e0b" strokeWidth="1.5" fill="#f59e0b" fillOpacity="0.02"
        filter="url(#aboutGlow)"
        {...draw(0.5, 1.8)}
      />
      {[0, 1, 2].map((row) =>
        [0, 1].map((col) => (
          <motion.rect
            key={`lwin-${row}-${col}`}
            x={50 + col * 30}
            y={215 + row * 45}
            width="18"
            height="25"
            rx="2"
            stroke="#f59e0b"
            strokeWidth="0.8"
            fill="#f59e0b"
            fillOpacity="0.06"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 + (row * 2 + col) * 0.08, duration: 0.4 }}
          />
        )),
      )}

      {/* Right smaller building */}
      <motion.rect
        x="290" y="230" width="80" height="130" rx="3"
        stroke="#f59e0b" strokeWidth="1.5" fill="#f59e0b" fillOpacity="0.02"
        filter="url(#aboutGlow)"
        {...draw(0.6, 1.8)}
      />
      {[0, 1].map((row) =>
        [0, 1].map((col) => (
          <motion.rect
            key={`rwin-${row}-${col}`}
            x={302 + col * 35}
            y={245 + row * 45}
            width="20"
            height="28"
            rx="2"
            stroke="#f59e0b"
            strokeWidth="0.8"
            fill="#f59e0b"
            fillOpacity="0.06"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.6 + (row * 2 + col) * 0.08, duration: 0.4 }}
          />
        )),
      )}

      {/* Circuit paths connecting buildings */}
      <motion.path
        d="M 110 280 L 120 280"
        stroke="#f59e0b" strokeWidth="1.5" strokeLinecap="round" fill="none"
        filter="url(#aboutGlow)"
        {...draw(2, 0.5)}
      />
      <motion.path
        d="M 280 300 L 290 300"
        stroke="#f59e0b" strokeWidth="1.5" strokeLinecap="round" fill="none"
        filter="url(#aboutGlow)"
        {...draw(2.1, 0.5)}
      />

      {/* Electrical symbol - lightning bolt */}
      <motion.path
        d="M 400 120 L 415 155 L 405 155 L 420 195"
        stroke="#f59e0b" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
        fill="none" filter="url(#aboutGlowStrong)"
        animate={{ opacity: [0.3, 1, 0.3] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' as const }}
      />

      {/* Electrical ground symbol */}
      <motion.g filter="url(#aboutGlow)">
        <motion.line
          x1="410" y1="195" x2="410" y2="215"
          stroke="#f59e0b" strokeWidth="2"
          {...draw(2.5, 0.5)}
        />
        <motion.line
          x1="398" y1="215" x2="422" y2="215"
          stroke="#f59e0b" strokeWidth="2"
          {...draw(2.6, 0.3)}
        />
        <motion.line
          x1="402" y1="222" x2="418" y2="222"
          stroke="#f59e0b" strokeWidth="1.5"
          {...draw(2.7, 0.3)}
        />
        <motion.line
          x1="406" y1="229" x2="414" y2="229"
          stroke="#f59e0b" strokeWidth="1"
          {...draw(2.8, 0.3)}
        />
      </motion.g>

      {/* Animated energy pulse along circuit path */}
      <motion.circle
        cx="0" cy="0" r="3" fill="#f59e0b" filter="url(#aboutGlowStrong)"
      >
        <animateMotion
          dur="4s"
          repeatCount="indefinite"
          path="M 40 360 L 120 360 L 120 280 L 280 280 L 280 360 L 370 360"
        />
      </motion.circle>

      {/* Power line from building to right */}
      <motion.path
        d="M 370 300 C 390 300 400 280 420 280 L 460 280"
        stroke="#f59e0b" strokeWidth="1" fill="none" strokeDasharray="4 3"
        filter="url(#aboutGlow)"
        {...draw(2.2, 1.5)}
      />

      {/* Pulsing dot at circuit end */}
      <motion.circle
        cx="460" cy="280" r="4" fill="#f59e0b" filter="url(#aboutGlowStrong)"
        animate={{ r: [3, 6, 3], opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' as const }}
      />
    </motion.svg>
  )
}

/* ------------------------------------------------------------------ */
/*  Page Banner                                                         */
/* ------------------------------------------------------------------ */
function PageBanner() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], [0, 150])

  return (
    <section ref={ref} className="relative min-h-[60vh] flex items-center justify-center overflow-hidden">
      {/* Parallax background */}
      <motion.div style={{ y }} className="absolute inset-0 bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(245,158,11,0.08),transparent_60%)]" />

      {/* Animated grid */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            'linear-gradient(#f59e0b 1px, transparent 1px), linear-gradient(90deg, #f59e0b 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />

      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center pt-24">
        <motion.span
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-amber-500/20 bg-amber-500/5 text-amber-400 text-xs font-semibold uppercase tracking-widest mb-6"
        >
          <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
          Qui sommes-nous
        </motion.span>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6"
        >
          La{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-600">
            Société
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="text-gray-400 text-lg sm:text-xl max-w-3xl mx-auto leading-relaxed"
        >
          {companyInfo.description}
        </motion.p>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-gray-950 to-transparent" />
    </section>
  )
}

/* ------------------------------------------------------------------ */
/*  Timeline                                                            */
/* ------------------------------------------------------------------ */
const milestones = [
  {
    year: '2008',
    title: 'Création de CBI',
    description:
      'Fondation du Comptoir des Bâtisseurs Ivoiriens à Abidjan, avec une vision claire : devenir le partenaire de référence en électricité industrielle en Côte d\'Ivoire.',
    icon: Star,
  },
  {
    year: '2011',
    title: 'Premiers grands projets industriels',
    description:
      'Réalisation de nos premiers projets d\'envergure dans le secteur industriel, posant les bases de notre réputation d\'excellence et de fiabilité.',
    icon: Building2,
  },
  {
    year: '2014',
    title: 'Expansion des services',
    description:
      'Extension de notre offre vers le froid et la climatisation, les groupes électrogènes et la maintenance préventive pour répondre aux besoins croissants de nos clients.',
    icon: TrendingUp,
  },
  {
    year: '2017',
    title: 'Partenariats stratégiques',
    description:
      'Développement de partenariats durables avec des entreprises de renom telles qu\'ALBAYANE, l\'Imprimerie Nationale de CI et CI-PHARM.',
    icon: Handshake,
  },
  {
    year: '2020',
    title: 'Cap des 500 projets',
    description:
      'Franchissement du cap symbolique de 500 projets réalisés, témoignant de la confiance que nos clients nous accordent année après année.',
    icon: Award,
  },
  {
    year: '2024',
    title: 'Innovation & Formation',
    description:
      'Lancement de notre programme de formation continue et intégration de solutions innovantes pour accompagner la transition énergétique de nos clients.',
    icon: Lightbulb,
  },
]

function Timeline() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section ref={ref} className="relative py-24 bg-gray-950 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(245,158,11,0.05),transparent_60%)]" />

      <div className="relative max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-amber-500/20 bg-amber-500/5 text-amber-400 text-xs font-semibold uppercase tracking-widest mb-4">
            Notre Parcours
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-white">
            Années de{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-600">
              Croissance
            </span>
          </h2>
        </motion.div>

        <div className="relative">
          {/* Center line */}
          <motion.div
            initial={{ scaleY: 0 }}
            animate={inView ? { scaleY: 1 } : {}}
            transition={{ duration: 1.5, ease: 'easeInOut' as const }}
            className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-amber-500/50 via-amber-500/20 to-transparent origin-top hidden md:block"
          />

          <div className="space-y-12 md:space-y-0">
            {milestones.map((milestone, index) => {
              const Icon = milestone.icon
              const isLeft = index % 2 === 0

              return (
                <motion.div
                  key={milestone.year}
                  initial={{ opacity: 0, x: isLeft ? -60 : 60 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.6, delay: index * 0.15 }}
                  className={`relative md:flex items-center md:mb-16 ${
                    isLeft ? 'md:flex-row' : 'md:flex-row-reverse'
                  }`}
                >
                  {/* Content */}
                  <div className={`md:w-[calc(50%-2rem)] ${isLeft ? 'md:text-right md:pr-8' : 'md:text-left md:pl-8'}`}>
                    <div
                      className={`p-6 rounded-xl bg-gray-900/60 border border-gray-800 hover:border-amber-500/30 transition-colors duration-300 ${
                        isLeft ? 'md:ml-auto' : 'md:mr-auto'
                      }`}
                    >
                      <span className="inline-block px-3 py-1 bg-amber-500/10 text-amber-400 text-sm font-bold rounded-full mb-3">
                        {milestone.year}
                      </span>
                      <h3 className="text-xl font-bold text-white mb-2">{milestone.title}</h3>
                      <p className="text-gray-400 text-sm leading-relaxed">{milestone.description}</p>
                    </div>
                  </div>

                  {/* Center dot */}
                  <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 w-12 h-12 rounded-full bg-gray-900 border-2 border-amber-500/50 items-center justify-center z-10">
                    <Icon className="w-5 h-5 text-amber-400" />
                  </div>

                  {/* Empty space for the other side */}
                  <div className="hidden md:block md:w-[calc(50%-2rem)]" />
                </motion.div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}

/* ------------------------------------------------------------------ */
/*  Detailed About Section                                              */
/* ------------------------------------------------------------------ */
function DetailedAbout() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section ref={ref} className="relative py-24 bg-gray-950 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(245,158,11,0.06),transparent_60%)]" />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Text content */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7 }}
          >
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-amber-500/20 bg-amber-500/5 text-amber-400 text-xs font-semibold uppercase tracking-widest mb-6">
              À propos de CBI
            </span>

            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
              Notre{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-600">
                Histoire
              </span>
            </h2>

            <div className="space-y-5 text-gray-400 leading-relaxed">
              <p>{companyInfo.about}</p>
              <p className="text-amber-400/90 font-medium border-l-2 border-amber-500/50 pl-4">
                {companyInfo.mission}
              </p>
            </div>

            <div className="mt-8 grid grid-cols-2 gap-4">
              {[
                { value: `${companyInfo.stats.clients}+`, label: 'Clients satisfaits' },
                { value: `${companyInfo.stats.projects}+`, label: 'Projets réalisés' },
                { value: `${companyInfo.stats.workers}+`, label: 'Collaborateurs' },
                { value: `${companyInfo.stats.support}+`, label: 'Interventions' },
              ].map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.3 + i * 0.1, duration: 0.5 }}
                  className="p-4 rounded-lg bg-gray-900/60 border border-gray-800"
                >
                  <div className="text-2xl font-bold text-amber-400">{stat.value}</div>
                  <div className="text-gray-500 text-sm">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* SVG illustration */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <OfficeBuildingSVG />
          </motion.div>
        </div>
      </div>
    </section>
  )
}

/* ------------------------------------------------------------------ */
/*  Expertise Section                                                   */
/* ------------------------------------------------------------------ */
const expertiseIcons: LucideIcon[] = [
  Zap,
  BatteryCharging,
  Wrench,
  Lightbulb,
  Target,
  Zap,
  Lightbulb,
  Shield,
  Monitor,
  Snowflake,
  CheckCircle2,
]

function ExpertiseSection() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section ref={ref} className="relative py-24 bg-gray-950 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(245,158,11,0.04),transparent_50%)]" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber-500/20 to-transparent" />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-amber-500/20 bg-amber-500/5 text-amber-400 text-xs font-semibold uppercase tracking-widest mb-4">
            Nos Domaines
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-white">
            Nos{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-600">
              Expertises
            </span>
          </h2>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
        >
          {expertise.map((item, i) => {
            const Icon = expertiseIcons[i % expertiseIcons.length]
            return (
              <motion.div
                key={item}
                variants={fadeInUp}
                custom={i}
                className="group flex items-center gap-4 p-4 rounded-xl bg-gray-900/40 border border-gray-800 hover:border-amber-500/30 hover:bg-gray-900/60 transition-all duration-300"
              >
                <motion.div
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.5 }}
                  className="flex-shrink-0 w-10 h-10 rounded-lg bg-amber-500/10 flex items-center justify-center group-hover:bg-amber-500/20 transition-colors"
                >
                  <Icon className="w-5 h-5 text-amber-400" />
                </motion.div>
                <span className="text-gray-300 text-sm font-medium group-hover:text-white transition-colors">
                  {item}
                </span>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}

/* ------------------------------------------------------------------ */
/*  Values Section                                                      */
/* ------------------------------------------------------------------ */
const values = [
  {
    title: 'Qualité',
    description:
      'Nous nous engageons à fournir un travail de haute qualité, conforme aux normes les plus strictes du secteur électrique.',
    icon: Award,
    gradient: 'from-amber-500 to-yellow-500',
  },
  {
    title: 'Réactivité',
    description:
      'Notre équipe intervient rapidement pour répondre à vos urgences et respecter vos délais de projet.',
    icon: Clock,
    gradient: 'from-amber-500 to-orange-500',
  },
  {
    title: 'Expertise',
    description:
      'Des années d\'expérience et une formation continue garantissent une maîtrise parfaite de nos métiers.',
    icon: Shield,
    gradient: 'from-amber-600 to-amber-400',
  },
  {
    title: 'Confiance',
    description:
      'La transparence et le sérieux de nos interventions font de nous un partenaire de confiance durable.',
    icon: Users,
    gradient: 'from-yellow-500 to-amber-500',
  },
]

function ValuesSection() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section ref={ref} className="relative py-24 bg-gray-950 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(245,158,11,0.05),transparent_60%)]" />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-amber-500/20 bg-amber-500/5 text-amber-400 text-xs font-semibold uppercase tracking-widest mb-4">
            Ce qui nous guide
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-white">
            Nos{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-600">
              Valeurs
            </span>
          </h2>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {values.map((value, index) => {
            const Icon = value.icon
            return (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 50, rotateX: -15 }}
                animate={inView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.12 }}
                whileHover={{ y: -8, transition: { duration: 0.3 } }}
                className="group relative"
              >
                <div className="absolute -inset-[1px] rounded-2xl bg-gradient-to-br from-amber-500/20 via-transparent to-amber-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-[0.5px]" />

                <div className="relative h-full rounded-2xl bg-gray-900/60 border border-gray-800 p-8 text-center overflow-hidden group-hover:border-amber-500/30 transition-colors duration-300">
                  {/* Glow overlay */}
                  <div className="absolute inset-0 bg-amber-500/[0.02] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  <motion.div
                    whileHover={{ rotate: 360, scale: 1.1 }}
                    transition={{ duration: 0.6 }}
                    className={`relative inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br ${value.gradient} bg-opacity-10 mb-6`}
                    style={{ background: `linear-gradient(135deg, rgba(245,158,11,0.15), rgba(217,119,6,0.1))` }}
                  >
                    <Icon className="w-7 h-7 text-amber-400" />
                  </motion.div>

                  <h3 className="text-xl font-bold text-white mb-3 group-hover:text-amber-400 transition-colors">
                    {value.title}
                  </h3>
                  <p className="text-gray-400 text-sm leading-relaxed">{value.description}</p>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

/* ------------------------------------------------------------------ */
/*  Page                                                                */
/* ------------------------------------------------------------------ */
export default function AboutPage() {
  return (
    <>
      <Header />
      <main>
        <PageBanner />
        <Timeline />
        <DetailedAbout />
        <ExpertiseSection />
        <ValuesSection />
      </main>
      <Footer />
    </>
  )
}
