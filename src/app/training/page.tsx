'use client'

import { useRef, useState, useEffect, useCallback } from 'react'
import Link from 'next/link'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import {
  GraduationCap,
  ShieldCheck,
  Zap,
  Wrench,
  Users,
  Clock,
  Award,
  BookOpen,
  ArrowRight,
  CheckCircle2,
  Target,
  Lightbulb,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

/* ------------------------------------------------------------------ */
/*  Data                                                                */
/* ------------------------------------------------------------------ */
const trainingPrograms = [
  {
    title: 'Securite Electrique',
    description:
      'Formation complete aux normes de securite electrique. Habilitation electrique, gestes de premiers secours, prevention des risques et conduite a tenir en cas d\'incident.',
    icon: ShieldCheck,
    duration: '5 jours',
    level: 'Tous niveaux',
    topics: [
      'Normes NF C 18-510',
      'Habilitations B0, B1, B2, BR, BC',
      'Premiers secours electriques',
      'Analyse des risques',
    ],
  },
  {
    title: 'Installation Electrique',
    description:
      'Maitrisez les techniques d\'installation electrique industrielle et batiment. Cablage, mise en conformite, lecture de schemas et dimensionnement des installations.',
    icon: Zap,
    duration: '10 jours',
    level: 'Intermediaire',
    topics: [
      'Lecture de schemas electriques',
      'Cablage d\'armoires industrielles',
      'Dimensionnement des installations',
      'Mise en conformite NF C 15-100',
    ],
  },
  {
    title: 'Maintenance Preventive',
    description:
      'Apprenez les methodes de maintenance preventive et corrective pour garantir la fiabilite de vos equipements electriques et prolonger leur duree de vie.',
    icon: Wrench,
    duration: '7 jours',
    level: 'Avance',
    topics: [
      'Planification de maintenance',
      'Diagnostic de pannes',
      'Thermographie infrarouge',
      'Gestion de la documentation technique',
    ],
  },
  {
    title: 'Groupes Electrogenes',
    description:
      'Formation specialisee sur l\'installation, la mise en service et la maintenance des groupes electrogenes de toutes puissances et marques.',
    icon: Target,
    duration: '5 jours',
    level: 'Intermediaire',
    topics: [
      'Principes de fonctionnement',
      'Coffrets inverseurs et ATS',
      'Entretien preventif',
      'Depannage et diagnostic',
    ],
  },
  {
    title: 'Froid & Climatisation',
    description:
      'Formation aux techniques de froid et climatisation : installation, reglage, maintenance et depannage des systemes split, VRV/VRF et centrales de traitement d\'air.',
    icon: Lightbulb,
    duration: '10 jours',
    level: 'Intermediaire',
    topics: [
      'Cycle frigorifique',
      'Installation split et multi-split',
      'Manipulation des fluides frigorigenes',
      'Maintenance des systemes CTA',
    ],
  },
  {
    title: 'Supervision & Controle',
    description:
      'Initiez-vous aux techniques de supervision industrielle, aux automates programmables et aux systemes de controle-commande modernes.',
    icon: BookOpen,
    duration: '7 jours',
    level: 'Avance',
    topics: [
      'Automates programmables (API)',
      'Interfaces homme-machine (IHM)',
      'Bus de communication industriels',
      'Supervision SCADA',
    ],
  },
]

const features = [
  {
    icon: Users,
    title: 'Formateurs Experimentes',
    description: 'Nos formateurs sont des professionnels de terrain avec plus de 15 ans d\'experience.',
  },
  {
    icon: Award,
    title: 'Certification Reconnue',
    description: 'Recevez une attestation de formation reconnue par les entreprises du secteur.',
  },
  {
    icon: Clock,
    title: 'Horaires Flexibles',
    description: 'Des sessions adaptees a votre emploi du temps, en semaine ou le week-end.',
  },
  {
    icon: GraduationCap,
    title: 'Pratique Intensive',
    description: '70% de travaux pratiques pour une maitrise concrete des competences.',
  },
]

/* ------------------------------------------------------------------ */
/*  Page Banner                                                         */
/* ------------------------------------------------------------------ */
const heroSlides = [
  { src: '/images/training/training-1.jpg', alt: 'Formation en salle' },
  { src: '/images/training/training-2.jpg', alt: 'Travaux pratiques' },
  { src: '/images/training/training-3.jpg', alt: 'Session de groupe' },
]

function PageBanner() {
  const [current, setCurrent] = useState(0)
  const [direction, setDirection] = useState(1)

  const next = useCallback(() => {
    setDirection(1)
    setCurrent((p) => (p + 1) % heroSlides.length)
  }, [])

  const prev = useCallback(() => {
    setDirection(-1)
    setCurrent((p) => (p - 1 + heroSlides.length) % heroSlides.length)
  }, [])

  useEffect(() => {
    const t = setInterval(next, 5000)
    return () => clearInterval(t)
  }, [next])

  return (
    <section className="relative min-h-[70vh] flex items-center overflow-hidden">
      {/* Slideshow background */}
      <div className="absolute inset-0">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={current}
            custom={direction}
            initial={{ scale: 1.1, opacity: 0 }}
            animate={{ scale: 1, opacity: 1, transition: { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] as const } }}
            exit={{ scale: 1.05, opacity: 0, transition: { duration: 0.5 } }}
            className="absolute inset-0"
          >
            <img
              src={heroSlides[current].src}
              alt={heroSlides[current].alt}
              className="w-full h-full object-cover"
            />
          </motion.div>
        </AnimatePresence>
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/30" />
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-neutral-50 dark:from-neutral-950 to-transparent" />
      </div>

      {/* Arrows */}
      <button
        onClick={prev}
        className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-30 p-2 rounded-full bg-white/10 backdrop-blur-sm text-white/80 hover:bg-white/20 transition-all"
        aria-label="Precedent"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>
      <button
        onClick={next}
        className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-30 p-2 rounded-full bg-white/10 backdrop-blur-sm text-white/80 hover:bg-white/20 transition-all"
        aria-label="Suivant"
      >
        <ChevronRight className="w-5 h-5" />
      </button>

      {/* Dots */}
      <div className="absolute bottom-20 left-1/2 -translate-x-1/2 z-30 flex gap-2">
        {heroSlides.map((_, i) => (
          <button
            key={i}
            onClick={() => { setDirection(i > current ? 1 : -1); setCurrent(i) }}
            className={`h-1.5 rounded-full transition-all duration-300 ${i === current ? 'w-8 bg-orange-500' : 'w-3 bg-white/40 hover:bg-white/60'}`}
            aria-label={`Image ${i + 1}`}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-20 max-w-4xl mx-auto px-6 text-center pt-24">
        <motion.span
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/20 bg-white/10 backdrop-blur-sm text-white text-xs font-semibold uppercase tracking-widest mb-6"
        >
          <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse" />
          Developpez vos competences
        </motion.span>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 drop-shadow-lg"
        >
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-500">
            Formation
          </span>{' '}
          Professionnelle
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="text-neutral-200 text-lg sm:text-xl max-w-3xl mx-auto leading-relaxed"
        >
          CBI vous propose des formations professionnelles dans les domaines de l&apos;electricite
          industrielle, la securite, la maintenance et le froid climatisation.
        </motion.p>
      </div>
    </section>
  )
}

/* ------------------------------------------------------------------ */
/*  Features Grid                                                       */
/* ------------------------------------------------------------------ */
function FeaturesGrid() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section ref={ref} className="relative py-20 bg-neutral-50 dark:bg-neutral-950 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(245,158,11,0.05),transparent_60%)]" />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 40 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -6, transition: { duration: 0.3 } }}
                className="group relative"
              >
                <div className="absolute -inset-[1px] rounded-2xl bg-gradient-to-br from-orange-500/20 via-transparent to-orange-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-[0.5px]" />

                <div className="relative h-full p-6 rounded-2xl bg-white dark:bg-neutral-800/60 border border-neutral-200 dark:border-neutral-700 group-hover:border-orange-500/30 transition-colors duration-300 text-center">
                  <motion.div
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.5 }}
                    className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-orange-500/10 text-orange-500 dark:text-orange-400 mb-4"
                  >
                    <Icon className="w-7 h-7" />
                  </motion.div>
                  <h3 className="text-neutral-900 dark:text-white font-bold mb-2 group-hover:text-orange-500 dark:group-hover:text-orange-400 transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-neutral-500 dark:text-neutral-400 text-sm leading-relaxed">{feature.description}</p>
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
/*  Training Programs                                                   */
/* ------------------------------------------------------------------ */
function TrainingPrograms() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section ref={ref} className="relative py-24 bg-white dark:bg-neutral-950 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(245,158,11,0.06),transparent_60%)]" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-orange-500/20 to-transparent" />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-orange-500/20 bg-orange-500/5 text-orange-600 dark:text-orange-400 text-xs font-semibold uppercase tracking-widest mb-4">
            Nos Programmes
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-neutral-900 dark:text-white">
            Programmes de{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-600">
              Formation
            </span>
          </h2>
          <p className="mt-4 text-neutral-500 dark:text-neutral-400 max-w-2xl mx-auto">
            Des parcours structures pour renforcer les competences de vos equipes dans les
            metiers de l&apos;electricite et du genie climatique.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {trainingPrograms.map((program, index) => {
            const Icon = program.icon
            return (
              <motion.div
                key={program.title}
                initial={{ opacity: 0, y: 50, scale: 0.95 }}
                animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -6, transition: { duration: 0.3 } }}
                className="group relative"
              >
                <div className="absolute -inset-[1px] rounded-2xl bg-gradient-to-br from-orange-500/20 via-transparent to-orange-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-[0.5px]" />

                <div className="relative h-full rounded-2xl bg-white dark:bg-neutral-800/60 border border-neutral-200 dark:border-neutral-700 p-7 flex flex-col gap-4 overflow-hidden group-hover:border-orange-500/30 transition-colors duration-300">
                  {/* Hover glow */}
                  <div className="absolute inset-0 bg-orange-500/[0.02] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  {/* Header */}
                  <div className="relative flex items-start gap-4">
                    <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-orange-500/10 text-orange-500 ring-1 ring-orange-500/20 flex items-center justify-center">
                      <Icon className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-neutral-900 dark:text-white group-hover:text-orange-500 dark:group-hover:text-orange-400 transition-colors">
                        {program.title}
                      </h3>
                      <div className="flex gap-3 mt-1">
                        <span className="text-xs text-orange-600 dark:text-orange-400/80 bg-orange-500/10 px-2 py-0.5 rounded-full">
                          {program.duration}
                        </span>
                        <span className="text-xs text-neutral-500 dark:text-neutral-500 bg-neutral-100 dark:bg-neutral-700/80 px-2 py-0.5 rounded-full">
                          {program.level}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="relative text-neutral-500 dark:text-neutral-400 text-sm leading-relaxed">
                    {program.description}
                  </p>

                  {/* Topics */}
                  <div className="relative space-y-2 flex-1">
                    {program.topics.map((topic) => (
                      <div key={topic} className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-orange-500/70 dark:text-orange-400/70 flex-shrink-0" />
                        <span className="text-neutral-600 dark:text-neutral-300 text-xs">{topic}</span>
                      </div>
                    ))}
                  </div>

                  {/* CTA */}
                  <Link
                    href="/contact"
                    className="relative inline-flex items-center gap-2 text-orange-600 dark:text-orange-400 text-sm font-medium mt-2 group/link"
                  >
                    S&apos;inscrire
                    <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover/link:translate-x-1.5" />
                  </Link>

                  {/* Corner accent */}
                  <svg
                    className="absolute top-0 right-0 w-20 h-20 text-orange-500/[0.05]"
                    viewBox="0 0 80 80"
                    fill="none"
                  >
                    <path d="M 80 0 L 80 80 L 0 0 Z" fill="currentColor" />
                  </svg>
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
/*  Registration CTA Section                                            */
/* ------------------------------------------------------------------ */
function RegistrationCTA() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section ref={ref} className="relative py-24 bg-neutral-50 dark:bg-neutral-950 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(245,158,11,0.08),transparent_50%)]" />

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7 }}
        className="relative max-w-5xl mx-auto px-6"
      >
        <div className="relative p-10 md:p-16 rounded-3xl bg-white dark:bg-neutral-800/60 border border-neutral-200 dark:border-neutral-700 backdrop-blur-sm overflow-hidden">
          {/* Animated background glow */}
          <motion.div
            className="absolute -top-1/2 -right-1/4 w-96 h-96 rounded-full bg-orange-500/10 blur-[100px]"
            animate={{ x: [0, 30, 0], y: [0, -20, 0] }}
            transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' as const }}
          />

          <div className="relative grid md:grid-cols-2 gap-10 items-center">
            <div>
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-orange-500/10 text-orange-500 dark:text-orange-400 mb-6"
              >
                <GraduationCap className="w-8 h-8" />
              </motion.div>

              <h2 className="text-3xl sm:text-4xl font-bold text-neutral-900 dark:text-white mb-4">
                Pret a vous{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-600">
                  former ?
                </span>
              </h2>

              <p className="text-neutral-500 dark:text-neutral-400 leading-relaxed mb-6">
                Inscrivez-vous des maintenant a l&apos;une de nos formations et developpez les competences
                qui feront la difference dans votre carriere. Sessions individuelles ou en groupe disponibles.
              </p>

              <div className="space-y-3">
                {[
                  'Formation sur site ou dans nos locaux',
                  'Groupes de 5 a 15 participants',
                  'Supports pedagogiques inclus',
                  'Attestation de formation delivree',
                ].map((item, i) => (
                  <motion.div
                    key={item}
                    initial={{ opacity: 0, x: -20 }}
                    animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: 0.4 + i * 0.08, duration: 0.4 }}
                    className="flex items-center gap-3"
                  >
                    <CheckCircle2 className="w-5 h-5 text-orange-500 dark:text-orange-400 flex-shrink-0" />
                    <span className="text-neutral-600 dark:text-neutral-300 text-sm">{item}</span>
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-4 items-start md:items-center">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-orange-500 to-orange-600 text-white dark:text-neutral-950 font-bold rounded-lg hover:shadow-lg hover:shadow-orange-500/25 transition-all duration-300 hover:scale-105 active:scale-95 text-lg"
              >
                S&apos;inscrire maintenant
                <ArrowRight className="w-5 h-5" />
              </Link>

              <Link
                href="/quote"
                className="inline-flex items-center gap-2 px-8 py-4 border border-orange-500/30 text-orange-600 dark:text-orange-400 font-semibold rounded-lg hover:bg-orange-500/5 transition-all duration-300"
              >
                Demander un programme sur mesure
              </Link>

              <p className="text-neutral-500 dark:text-neutral-500 text-sm text-center mt-2">
                Contactez-nous pour des tarifs de groupe
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  )
}

/* ------------------------------------------------------------------ */
/*  Page                                                                */
/* ------------------------------------------------------------------ */
export default function TrainingPage() {
  return (
    <>
      <Header />
      <main>
        <PageBanner />
        <FeaturesGrid />
        <TrainingPrograms />
        <RegistrationCTA />
      </main>
      <Footer />
    </>
  )
}
