'use client'

import { useRef, useState } from 'react'
import { motion, useInView, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import ContactSection from '@/components/ContactSection'

/* ------------------------------------------------------------------ */
/*  Page Banner                                                         */
/* ------------------------------------------------------------------ */
function PageBanner() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], [0, 150])

  return (
    <section ref={ref} className="relative min-h-[60vh] flex items-center justify-center overflow-hidden">
      <motion.div style={{ y }} className="absolute inset-0 bg-gradient-to-br from-neutral-100 via-neutral-50 to-neutral-100 dark:from-neutral-950 dark:via-neutral-900 dark:to-neutral-950" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(245,158,11,0.08),transparent_60%)]" />

      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            'linear-gradient(#f97316 1px, transparent 1px), linear-gradient(90deg, #f97316 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />

      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center pt-24">
        <motion.span
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-orange-500/20 bg-orange-50 dark:bg-orange-500/5 text-orange-600 dark:text-orange-400 text-xs font-semibold uppercase tracking-widest mb-6"
        >
          <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse" />
          Restons en contact
        </motion.span>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="text-4xl sm:text-5xl lg:text-6xl font-bold text-neutral-900 dark:text-white mb-6"
        >
          Contactez-
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-600">
            nous
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="text-neutral-600 dark:text-neutral-300 text-lg sm:text-xl max-w-3xl mx-auto leading-relaxed"
        >
          Notre équipe est à votre écoute pour toute demande de renseignement, devis ou intervention.
          N&apos;hésitez pas à nous contacter.
        </motion.p>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white dark:from-neutral-950 to-transparent" />
    </section>
  )
}

/* ------------------------------------------------------------------ */
/*  FAQ Accordion                                                       */
/* ------------------------------------------------------------------ */
const faqItems = [
  {
    question: 'Quels sont vos délais d\'intervention ?',
    answer:
      'Pour les urgences, nous intervenons dans un délai de 24 à 48 heures. Pour les projets planifiés, nous établissons un calendrier en concertation avec le client dès la validation du devis.',
  },
  {
    question: 'Travaillez-vous avec des particuliers ou uniquement des professionnels ?',
    answer:
      'Nous travaillons principalement avec des professionnels (industries, entreprises, bâtiments tertiaires), mais nous acceptons également les projets résidentiels d\'envergure.',
  },
  {
    question: 'Comment obtenir un devis ?',
    answer:
      'Vous pouvez nous contacter par téléphone, email ou via notre formulaire de demande de devis en ligne. Nous vous répondons sous 48 heures avec une proposition détaillée et personnalisée.',
  },
  {
    question: 'Quelles zones géographiques couvrez-vous ?',
    answer:
      'Nous intervenons principalement à Abidjan et dans toute la Côte d\'Ivoire. Pour les projets d\'envergure, nous pouvons également intervenir dans la sous-région ouest-africaine.',
  },
  {
    question: 'Proposez-vous des contrats de maintenance ?',
    answer:
      'Oui, nous proposons des contrats de maintenance préventive adaptés à vos besoins : maintenance trimestrielle, semestrielle ou annuelle avec des rapports détaillés après chaque intervention.',
  },
  {
    question: 'Quelles normes respectez-vous dans vos installations ?',
    answer:
      'Toutes nos installations sont conformes aux normes NF C 15-100 (bâtiment), NF C 13-100 et NF C 13-200 (installations HT/BT), ainsi qu\'aux normes de sécurité NF C 18-510.',
  },
  {
    question: 'Proposez-vous des formations certifiantes ?',
    answer:
      'Nous proposons des formations professionnelles avec délivrance d\'une attestation de formation. Nos programmes couvrent la sécurité électrique, l\'installation, la maintenance et le froid climatisation.',
  },
]

function FAQItem({ item, index }: { item: typeof faqItems[0]; index: number }) {
  const [isOpen, setIsOpen] = useState(false)
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.06 }}
      className="border border-neutral-200 dark:border-neutral-700 rounded-xl overflow-hidden hover:border-orange-500/20 dark:hover:border-orange-500/20 transition-colors duration-300"
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-5 md:p-6 text-left bg-neutral-50 dark:bg-neutral-800/40 hover:bg-neutral-100 dark:hover:bg-neutral-800/60 transition-colors duration-200"
      >
        <span className="text-neutral-900 dark:text-white font-medium pr-4">{item.question}</span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3, ease: 'easeInOut' as const }}
          className="flex-shrink-0"
        >
          <ChevronDown className="w-5 h-5 text-orange-500 dark:text-orange-400" />
        </motion.div>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="overflow-hidden"
          >
            <div className="px-5 md:px-6 pb-5 md:pb-6 pt-1">
              <p className="text-neutral-600 dark:text-neutral-300 leading-relaxed text-sm">{item.answer}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

function FAQSection() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section ref={ref} className="relative py-24 bg-neutral-50 dark:bg-neutral-900 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(245,158,11,0.05),transparent_60%)]" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-orange-500/20 to-transparent" />

      <div className="relative max-w-3xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-orange-500/20 bg-orange-50 dark:bg-orange-500/5 text-orange-600 dark:text-orange-400 text-xs font-semibold uppercase tracking-widest mb-4">
            FAQ
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-neutral-900 dark:text-white mb-3">
            Questions{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-600">
              fréquentes
            </span>
          </h2>
          <p className="text-neutral-600 dark:text-neutral-300">
            Retrouvez les réponses aux questions les plus posées par nos clients.
          </p>
        </motion.div>

        <div className="space-y-3">
          {faqItems.map((item, index) => (
            <FAQItem key={index} item={item} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}

/* ------------------------------------------------------------------ */
/*  Page                                                                */
/* ------------------------------------------------------------------ */
export default function ContactPage() {
  return (
    <>
      <Header />
      <main>
        <PageBanner />
        <ContactSection hideHeader />
        <FAQSection />
      </main>
      <Footer />
    </>
  )
}
