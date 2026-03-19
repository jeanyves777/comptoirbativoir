'use client'

import { useRef } from 'react'
import Link from 'next/link'
import { motion, useInView, useScroll, useTransform } from 'framer-motion'
import {
  Zap,
  Snowflake,
  BatteryCharging,
  Wrench,
  Monitor,
  Building2,
  ArrowRight,
  CheckCircle2,
  Phone,
} from 'lucide-react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { services, companyInfo } from '@/lib/data'
import type { LucideIcon } from 'lucide-react'

/* ------------------------------------------------------------------ */
/*  Icon map                                                            */
/* ------------------------------------------------------------------ */
const iconMap: Record<string, LucideIcon> = {
  Zap,
  Snowflake,
  BatteryCharging,
  Wrench,
  Monitor,
  Building2,
}

/* ------------------------------------------------------------------ */
/*  Decorative SVG Separator                                            */
/* ------------------------------------------------------------------ */
function CircuitSeparator({ flip = false }: { flip?: boolean }) {
  return (
    <motion.svg
      viewBox="0 0 1200 60"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`w-full h-auto max-h-[60px] ${flip ? 'rotate-180' : ''}`}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
    >
      <motion.path
        d="M 0 30 L 200 30 L 230 10 L 260 50 L 290 10 L 320 50 L 350 30 L 550 30"
        stroke="#f59e0b"
        strokeWidth="1.5"
        strokeLinecap="round"
        fill="none"
        opacity="0.3"
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 2, ease: 'easeInOut' as const }}
      />
      <motion.circle
        cx="550" cy="30" r="4" fill="#f59e0b" opacity="0.5"
        animate={{ r: [3, 5, 3], opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 2, repeat: Infinity }}
      />
      <motion.path
        d="M 550 30 L 650 30 L 650 10 L 750 10 L 750 30 L 850 30"
        stroke="#f59e0b"
        strokeWidth="1.5"
        strokeLinecap="round"
        fill="none"
        opacity="0.3"
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 2, delay: 0.5, ease: 'easeInOut' as const }}
      />
      <motion.path
        d="M 850 30 L 900 30 L 930 50 L 960 10 L 990 50 L 1020 30 L 1200 30"
        stroke="#f59e0b"
        strokeWidth="1.5"
        strokeLinecap="round"
        fill="none"
        opacity="0.3"
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 2, delay: 1, ease: 'easeInOut' as const }}
      />

      {/* Energy pulse */}
      <motion.circle cx="0" cy="0" r="3" fill="#f59e0b" opacity="0.8">
        <animateMotion
          dur="4s"
          repeatCount="indefinite"
          path="M 0 30 L 200 30 L 230 10 L 260 50 L 290 10 L 320 50 L 350 30 L 550 30 L 650 30 L 650 10 L 750 10 L 750 30 L 850 30 L 900 30 L 930 50 L 960 10 L 990 50 L 1020 30 L 1200 30"
        />
      </motion.circle>
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
          Ce que nous faisons
        </motion.span>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6"
        >
          Nos{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-600">
            Services
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="text-gray-400 text-lg sm:text-xl max-w-3xl mx-auto leading-relaxed"
        >
          De l&apos;installation au dépannage, nous couvrons l&apos;ensemble de vos besoins en
          électricité industrielle, climatisation et énergie de secours.
        </motion.p>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-gray-950 to-transparent" />
    </section>
  )
}

/* ------------------------------------------------------------------ */
/*  Service Detail Section                                              */
/* ------------------------------------------------------------------ */
interface ServiceDetailProps {
  service: (typeof services)[number]
  index: number
  reversed: boolean
}

function ServiceDetail({ service, index, reversed }: ServiceDetailProps) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const Icon = iconMap[service.icon] || Zap

  const features = [
    'Étude et conception sur mesure',
    'Installation conforme aux normes',
    'Mise en service et tests',
    'Support technique continu',
  ]

  return (
    <section ref={ref} id={service.id} className="relative py-20 scroll-mt-24">
      <div className={`max-w-7xl mx-auto px-6 lg:px-8 grid lg:grid-cols-2 gap-12 lg:gap-16 items-center ${reversed ? 'lg:direction-rtl' : ''}`}>
        {/* Image / Visual Side */}
        <motion.div
          initial={{ opacity: 0, x: reversed ? 60 : -60 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.1 }}
          className={`relative ${reversed ? 'lg:order-2' : ''}`}
        >
          <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-gray-900/60 border border-gray-800 group">
            {/* Gradient placeholder with icon */}
            <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-900/95 to-gray-950 flex items-center justify-center">
              <motion.div
                animate={{ rotate: [0, 5, -5, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' as const }}
                className="w-32 h-32 rounded-3xl bg-amber-500/10 flex items-center justify-center"
              >
                <Icon className="w-16 h-16 text-amber-500/60" />
              </motion.div>
            </div>

            {/* Hover glow */}
            <div className="absolute inset-0 bg-gradient-to-t from-amber-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            {/* Corner accent */}
            <div className="absolute top-4 right-4 px-3 py-1 bg-amber-500/20 rounded-full text-amber-400 text-xs font-semibold backdrop-blur-sm">
              Service {String(index + 1).padStart(2, '0')}
            </div>
          </div>
        </motion.div>

        {/* Content Side */}
        <motion.div
          initial={{ opacity: 0, x: reversed ? -60 : 60 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.2 }}
          className={reversed ? 'lg:order-1' : ''}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-amber-500/10 text-amber-500 ring-1 ring-amber-500/20 mb-6"
          >
            <Icon className="w-7 h-7" />
          </motion.div>

          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">{service.title}</h2>

          <p className="text-gray-400 leading-relaxed mb-6 text-lg">{service.description}</p>

          <div className="space-y-3 mb-8">
            {features.map((feature, i) => (
              <motion.div
                key={feature}
                initial={{ opacity: 0, x: 20 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.4 + i * 0.08, duration: 0.4 }}
                className="flex items-center gap-3"
              >
                <CheckCircle2 className="w-5 h-5 text-amber-400 flex-shrink-0" />
                <span className="text-gray-300 text-sm">{feature}</span>
              </motion.div>
            ))}
          </div>

          <div className="flex flex-wrap gap-4">
            <Link
              href="/quote"
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-amber-500 to-amber-600 text-gray-950 font-semibold rounded-lg hover:shadow-lg hover:shadow-amber-500/25 transition-all duration-300 hover:scale-105 active:scale-95"
            >
              Demander un devis
              <ArrowRight className="w-4 h-4" />
            </Link>

            <a
              href={`tel:${companyInfo.phones[0].replace(/\s/g, '')}`}
              className="inline-flex items-center gap-2 px-6 py-3 border border-amber-500/30 text-amber-400 font-semibold rounded-lg hover:bg-amber-500/5 transition-all duration-300"
            >
              <Phone className="w-4 h-4" />
              Nous appeler
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

/* ------------------------------------------------------------------ */
/*  CTA Section                                                         */
/* ------------------------------------------------------------------ */
function CTASection() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section ref={ref} className="relative py-24 bg-gray-950 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(245,158,11,0.08),transparent_50%)]" />

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7 }}
        className="relative max-w-4xl mx-auto px-6 text-center"
      >
        <div className="p-12 rounded-3xl bg-gray-900/60 border border-gray-800 backdrop-blur-sm relative overflow-hidden">
          {/* Animated border glow */}
          <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-amber-500/10 via-transparent to-amber-500/10 animate-pulse" />

          <h2 className="relative text-3xl sm:text-4xl font-bold text-white mb-4">
            Un projet en tête ?
          </h2>
          <p className="relative text-gray-400 text-lg mb-8 max-w-2xl mx-auto">
            Contactez-nous dès maintenant pour obtenir un devis gratuit et personnalisé.
            Notre équipe est prête à vous accompagner.
          </p>

          <div className="relative flex flex-wrap justify-center gap-4">
            <Link
              href="/quote"
              className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-amber-500 to-amber-600 text-gray-950 font-bold rounded-lg hover:shadow-lg hover:shadow-amber-500/25 transition-all duration-300 hover:scale-105 active:scale-95 text-lg"
            >
              Demander un Devis
              <ArrowRight className="w-5 h-5" />
            </Link>

            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-8 py-4 border border-amber-500/30 text-amber-400 font-bold rounded-lg hover:bg-amber-500/5 transition-all duration-300 text-lg"
            >
              Nous contacter
            </Link>
          </div>
        </div>
      </motion.div>
    </section>
  )
}

/* ------------------------------------------------------------------ */
/*  Page                                                                */
/* ------------------------------------------------------------------ */
export default function ServicesPage() {
  return (
    <>
      <Header />
      <main>
        <PageBanner />

        {services.map((service, index) => (
          <div key={service.id}>
            <ServiceDetail
              service={service}
              index={index}
              reversed={index % 2 !== 0}
            />
            {index < services.length - 1 && (
              <div className="max-w-5xl mx-auto px-6">
                <CircuitSeparator flip={index % 2 !== 0} />
              </div>
            )}
          </div>
        ))}

        <CTASection />
      </main>
      <Footer />
    </>
  )
}
