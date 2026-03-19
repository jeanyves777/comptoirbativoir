'use client'

import { useRef } from 'react'
import Link from 'next/link'
import { motion, useInView, useScroll, useTransform } from 'framer-motion'
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
} from 'lucide-react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

/* ------------------------------------------------------------------ */
/*  Data                                                                */
/* ------------------------------------------------------------------ */
const trainingPrograms = [
  {
    title: 'Sécurité Électrique',
    description:
      'Formation complète aux normes de sécurité électrique. Habilitation électrique, gestes de premiers secours, prévention des risques et conduite à tenir en cas d\'incident.',
    icon: ShieldCheck,
    duration: '5 jours',
    level: 'Tous niveaux',
    topics: [
      'Normes NF C 18-510',
      'Habilitations B0, B1, B2, BR, BC',
      'Premiers secours électriques',
      'Analyse des risques',
    ],
  },
  {
    title: 'Installation Électrique',
    description:
      'Maîtrisez les techniques d\'installation électrique industrielle et bâtiment. Câblage, mise en conformité, lecture de schémas et dimensionnement des installations.',
    icon: Zap,
    duration: '10 jours',
    level: 'Intermédiaire',
    topics: [
      'Lecture de schémas électriques',
      'Câblage d\'armoires industrielles',
      'Dimensionnement des installations',
      'Mise en conformité NF C 15-100',
    ],
  },
  {
    title: 'Maintenance Préventive',
    description:
      'Apprenez les méthodes de maintenance préventive et corrective pour garantir la fiabilité de vos équipements électriques et prolonger leur durée de vie.',
    icon: Wrench,
    duration: '7 jours',
    level: 'Avancé',
    topics: [
      'Planification de maintenance',
      'Diagnostic de pannes',
      'Thermographie infrarouge',
      'Gestion de la documentation technique',
    ],
  },
  {
    title: 'Groupes Électrogènes',
    description:
      'Formation spécialisée sur l\'installation, la mise en service et la maintenance des groupes électrogènes de toutes puissances et marques.',
    icon: Target,
    duration: '5 jours',
    level: 'Intermédiaire',
    topics: [
      'Principes de fonctionnement',
      'Coffrets inverseurs et ATS',
      'Entretien préventif',
      'Dépannage et diagnostic',
    ],
  },
  {
    title: 'Froid & Climatisation',
    description:
      'Formation aux techniques de froid et climatisation : installation, réglage, maintenance et dépannage des systèmes split, VRV/VRF et centrales de traitement d\'air.',
    icon: Lightbulb,
    duration: '10 jours',
    level: 'Intermédiaire',
    topics: [
      'Cycle frigorifique',
      'Installation split et multi-split',
      'Manipulation des fluides frigorigènes',
      'Maintenance des systèmes CTA',
    ],
  },
  {
    title: 'Supervision & Contrôle',
    description:
      'Initiez-vous aux techniques de supervision industrielle, aux automates programmables et aux systèmes de contrôle-commande modernes.',
    icon: BookOpen,
    duration: '7 jours',
    level: 'Avancé',
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
    title: 'Formateurs Expérimentés',
    description: 'Nos formateurs sont des professionnels de terrain avec plus de 15 ans d\'expérience.',
  },
  {
    icon: Award,
    title: 'Certification Reconnue',
    description: 'Recevez une attestation de formation reconnue par les entreprises du secteur.',
  },
  {
    icon: Clock,
    title: 'Horaires Flexibles',
    description: 'Des sessions adaptées à votre emploi du temps, en semaine ou le week-end.',
  },
  {
    icon: GraduationCap,
    title: 'Pratique Intensive',
    description: '70% de travaux pratiques pour une maîtrise concrète des compétences.',
  },
]

/* ------------------------------------------------------------------ */
/*  Page Banner                                                         */
/* ------------------------------------------------------------------ */
function PageBanner() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], [0, 150])

  return (
    <section ref={ref} className="relative min-h-[60vh] flex items-center justify-center overflow-hidden">
      <motion.div style={{ y }} className="absolute inset-0 bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(245,158,11,0.08),transparent_60%)]" />

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
          Développez vos compétences
        </motion.span>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6"
        >
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-600">
            Formation
          </span>{' '}
          Professionnelle
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="text-gray-400 text-lg sm:text-xl max-w-3xl mx-auto leading-relaxed"
        >
          CBI vous propose des formations professionnelles dans les domaines de l&apos;électricité
          industrielle, la sécurité, la maintenance et le froid climatisation.
        </motion.p>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-gray-950 to-transparent" />
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
    <section ref={ref} className="relative py-20 bg-gray-950 overflow-hidden">
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
                <div className="absolute -inset-[1px] rounded-2xl bg-gradient-to-br from-amber-500/20 via-transparent to-amber-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-[0.5px]" />

                <div className="relative h-full p-6 rounded-2xl bg-gray-900/60 border border-gray-800 group-hover:border-amber-500/30 transition-colors duration-300 text-center">
                  <motion.div
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.5 }}
                    className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-amber-500/10 text-amber-400 mb-4"
                  >
                    <Icon className="w-7 h-7" />
                  </motion.div>
                  <h3 className="text-white font-bold mb-2 group-hover:text-amber-400 transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-gray-400 text-sm leading-relaxed">{feature.description}</p>
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
    <section ref={ref} className="relative py-24 bg-gray-950 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(245,158,11,0.06),transparent_60%)]" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber-500/20 to-transparent" />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-amber-500/20 bg-amber-500/5 text-amber-400 text-xs font-semibold uppercase tracking-widest mb-4">
            Nos Programmes
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-white">
            Programmes de{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-600">
              Formation
            </span>
          </h2>
          <p className="mt-4 text-gray-400 max-w-2xl mx-auto">
            Des parcours structurés pour renforcer les compétences de vos équipes dans les
            métiers de l&apos;électricité et du génie climatique.
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
                <div className="absolute -inset-[1px] rounded-2xl bg-gradient-to-br from-amber-500/20 via-transparent to-amber-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-[0.5px]" />

                <div className="relative h-full rounded-2xl bg-gray-900/60 border border-gray-800 p-7 flex flex-col gap-4 overflow-hidden group-hover:border-amber-500/30 transition-colors duration-300">
                  {/* Hover glow */}
                  <div className="absolute inset-0 bg-amber-500/[0.02] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  {/* Header */}
                  <div className="relative flex items-start gap-4">
                    <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-amber-500/10 text-amber-500 ring-1 ring-amber-500/20 flex items-center justify-center">
                      <Icon className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-white group-hover:text-amber-400 transition-colors">
                        {program.title}
                      </h3>
                      <div className="flex gap-3 mt-1">
                        <span className="text-xs text-amber-400/80 bg-amber-500/10 px-2 py-0.5 rounded-full">
                          {program.duration}
                        </span>
                        <span className="text-xs text-gray-500 bg-gray-800/80 px-2 py-0.5 rounded-full">
                          {program.level}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="relative text-gray-400 text-sm leading-relaxed">
                    {program.description}
                  </p>

                  {/* Topics */}
                  <div className="relative space-y-2 flex-1">
                    {program.topics.map((topic) => (
                      <div key={topic} className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-amber-400/70 flex-shrink-0" />
                        <span className="text-gray-300 text-xs">{topic}</span>
                      </div>
                    ))}
                  </div>

                  {/* CTA */}
                  <Link
                    href="/contact"
                    className="relative inline-flex items-center gap-2 text-amber-400 text-sm font-medium mt-2 group/link"
                  >
                    S&apos;inscrire
                    <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover/link:translate-x-1.5" />
                  </Link>

                  {/* Corner accent */}
                  <svg
                    className="absolute top-0 right-0 w-20 h-20 text-amber-500/[0.05]"
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
    <section ref={ref} className="relative py-24 bg-gray-950 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(245,158,11,0.08),transparent_50%)]" />

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7 }}
        className="relative max-w-5xl mx-auto px-6"
      >
        <div className="relative p-10 md:p-16 rounded-3xl bg-gray-900/60 border border-gray-800 backdrop-blur-sm overflow-hidden">
          {/* Animated background glow */}
          <motion.div
            className="absolute -top-1/2 -right-1/4 w-96 h-96 rounded-full bg-amber-500/10 blur-[100px]"
            animate={{ x: [0, 30, 0], y: [0, -20, 0] }}
            transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' as const }}
          />

          <div className="relative grid md:grid-cols-2 gap-10 items-center">
            <div>
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-amber-500/10 text-amber-400 mb-6"
              >
                <GraduationCap className="w-8 h-8" />
              </motion.div>

              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
                Prêt à vous{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-600">
                  former ?
                </span>
              </h2>

              <p className="text-gray-400 leading-relaxed mb-6">
                Inscrivez-vous dès maintenant à l&apos;une de nos formations et développez les compétences
                qui feront la différence dans votre carrière. Sessions individuelles ou en groupe disponibles.
              </p>

              <div className="space-y-3">
                {[
                  'Formation sur site ou dans nos locaux',
                  'Groupes de 5 à 15 participants',
                  'Supports pédagogiques inclus',
                  'Attestation de formation délivrée',
                ].map((item, i) => (
                  <motion.div
                    key={item}
                    initial={{ opacity: 0, x: -20 }}
                    animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: 0.4 + i * 0.08, duration: 0.4 }}
                    className="flex items-center gap-3"
                  >
                    <CheckCircle2 className="w-5 h-5 text-amber-400 flex-shrink-0" />
                    <span className="text-gray-300 text-sm">{item}</span>
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-4 items-start md:items-center">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-amber-500 to-amber-600 text-gray-950 font-bold rounded-lg hover:shadow-lg hover:shadow-amber-500/25 transition-all duration-300 hover:scale-105 active:scale-95 text-lg"
              >
                S&apos;inscrire maintenant
                <ArrowRight className="w-5 h-5" />
              </Link>

              <Link
                href="/quote"
                className="inline-flex items-center gap-2 px-8 py-4 border border-amber-500/30 text-amber-400 font-semibold rounded-lg hover:bg-amber-500/5 transition-all duration-300"
              >
                Demander un programme sur mesure
              </Link>

              <p className="text-gray-500 text-sm text-center mt-2">
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
