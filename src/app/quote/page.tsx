'use client'

import { useRef, useState, FormEvent } from 'react'
import Link from 'next/link'
import { motion, useInView, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import {
  User,
  Building2,
  Mail,
  Phone,
  FileText,
  DollarSign,
  Clock,
  Send,
  Loader2,
  CheckCircle2,
  MapPin,
  ArrowRight,
  MessageSquare,
  ChevronDown,
} from 'lucide-react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { services, companyInfo } from '@/lib/data'

/* ------------------------------------------------------------------ */
/*  Page Banner                                                         */
/* ------------------------------------------------------------------ */
function PageBanner() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], [0, 150])

  return (
    <section ref={ref} className="relative min-h-[55vh] flex items-center justify-center overflow-hidden">
      <motion.div style={{ y }} className="absolute inset-0 bg-gradient-to-br from-neutral-100 via-neutral-50 to-neutral-100 dark:from-neutral-950 dark:via-neutral-900 dark:to-neutral-950" />
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
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-amber-500/20 bg-amber-500/5 text-amber-600 dark:text-amber-400 text-xs font-semibold uppercase tracking-widest mb-6"
        >
          <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
          Gratuit et sans engagement
        </motion.span>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="text-4xl sm:text-5xl lg:text-6xl font-bold text-neutral-900 dark:text-white mb-6"
        >
          Demander un{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-600">
            Devis
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="text-neutral-500 dark:text-neutral-400 text-lg sm:text-xl max-w-3xl mx-auto leading-relaxed"
        >
          Decrivez votre projet et recevez un devis personnalise sous 48 heures.
          Notre equipe d&apos;experts analysera votre demande en detail.
        </motion.p>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-neutral-50 dark:from-neutral-950 to-transparent" />
    </section>
  )
}

/* ------------------------------------------------------------------ */
/*  Floating Field                                                      */
/* ------------------------------------------------------------------ */
interface FloatingFieldProps {
  id: string
  label: string
  icon: React.ReactNode
  type?: string
  required?: boolean
  textarea?: boolean
  value: string
  onChange: (v: string) => void
  error?: string
}

function FloatingField({
  id,
  label,
  icon,
  type = 'text',
  required,
  textarea,
  value,
  onChange,
  error,
}: FloatingFieldProps) {
  const baseClass =
    'peer w-full bg-white dark:bg-neutral-900/60 border rounded-lg px-4 pt-6 pb-2 pl-11 text-neutral-900 dark:text-white placeholder-transparent focus:outline-none focus:ring-2 focus:ring-amber-500/50 transition-colors'
  const borderClass = error
    ? 'border-red-500'
    : 'border-neutral-300 dark:border-neutral-600 focus:border-amber-500'

  return (
    <div className="relative">
      <div className="absolute left-3.5 top-4 text-neutral-400 dark:text-neutral-500 peer-focus:text-amber-500 dark:peer-focus:text-amber-400 transition-colors z-10">
        {icon}
      </div>
      {textarea ? (
        <textarea
          id={id}
          rows={5}
          placeholder={label}
          required={required}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={`${baseClass} ${borderClass} resize-none`}
        />
      ) : (
        <input
          id={id}
          type={type}
          placeholder={label}
          required={required}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={`${baseClass} ${borderClass}`}
        />
      )}
      <label
        htmlFor={id}
        className="absolute left-11 top-1.5 text-xs text-neutral-400 dark:text-neutral-500 peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-focus:top-1.5 peer-focus:text-xs peer-focus:text-amber-500 dark:peer-focus:text-amber-400 transition-all pointer-events-none"
      >
        {label}
      </label>
      {error && <p className="mt-1 text-xs text-red-400">{error}</p>}
    </div>
  )
}

/* ------------------------------------------------------------------ */
/*  Select Field                                                        */
/* ------------------------------------------------------------------ */
interface SelectFieldProps {
  id: string
  label: string
  icon: React.ReactNode
  options: { value: string; label: string }[]
  value: string
  onChange: (v: string) => void
  error?: string
}

function SelectField({ id, label, icon, options, value, onChange, error }: SelectFieldProps) {
  const borderClass = error ? 'border-red-500' : 'border-neutral-300 dark:border-neutral-600 focus:border-amber-500'

  return (
    <div className="relative">
      <div className="absolute left-3.5 top-4 text-neutral-400 dark:text-neutral-500 z-10">{icon}</div>
      <select
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`w-full bg-white dark:bg-neutral-900/60 border rounded-lg px-4 pt-6 pb-2 pl-11 pr-10 text-neutral-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-500/50 transition-colors appearance-none ${borderClass} ${
          !value ? 'text-neutral-400 dark:text-neutral-500' : ''
        }`}
      >
        <option value="" className="bg-white dark:bg-neutral-900 text-neutral-400 dark:text-neutral-500">
          {label}
        </option>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value} className="bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white">
            {opt.label}
          </option>
        ))}
      </select>
      <label
        htmlFor={id}
        className={`absolute left-11 text-xs pointer-events-none transition-all ${
          value ? 'top-1.5 text-amber-500 dark:text-amber-400' : 'top-1.5 text-neutral-400 dark:text-neutral-500'
        }`}
      >
        {label}
      </label>
      <ChevronDown className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400 dark:text-neutral-500 pointer-events-none" />
      {error && <p className="mt-1 text-xs text-red-400">{error}</p>}
    </div>
  )
}

/* ------------------------------------------------------------------ */
/*  Contact Side Panel                                                  */
/* ------------------------------------------------------------------ */
function ContactSidePanel() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })

  const contactItems = [
    {
      icon: <Phone className="w-5 h-5 text-amber-500 dark:text-amber-400" />,
      title: 'Telephone',
      lines: companyInfo.phones,
    },
    {
      icon: <Mail className="w-5 h-5 text-amber-500 dark:text-amber-400" />,
      title: 'Email',
      lines: companyInfo.emails,
    },
    {
      icon: <MapPin className="w-5 h-5 text-amber-500 dark:text-amber-400" />,
      title: 'Adresse',
      lines: [companyInfo.address],
    },
  ]

  return (
    <div ref={ref} className="space-y-6">
      {/* Info header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5 }}
      >
        <h3 className="text-xl font-bold text-neutral-900 dark:text-white mb-2">Besoin d&apos;aide ?</h3>
        <p className="text-neutral-500 dark:text-neutral-400 text-sm leading-relaxed">
          Notre equipe est disponible pour vous accompagner dans la definition de votre projet.
        </p>
      </motion.div>

      {/* Contact cards */}
      {contactItems.map((item, i) => (
        <motion.div
          key={item.title}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.1 + i * 0.1 }}
          className="group flex items-start gap-4 p-4 rounded-xl bg-white dark:bg-neutral-800/60 border border-neutral-200 dark:border-neutral-700 hover:border-amber-500/30 transition-colors duration-300"
        >
          <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-amber-500/10 flex items-center justify-center group-hover:bg-amber-500/20 transition-colors">
            {item.icon}
          </div>
          <div>
            <h4 className="text-neutral-900 dark:text-white font-semibold text-sm mb-1">{item.title}</h4>
            {item.lines.map((line, j) => (
              <p key={j} className="text-neutral-500 dark:text-neutral-400 text-sm">
                {line}
              </p>
            ))}
          </div>
        </motion.div>
      ))}

      {/* Process steps */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="p-5 rounded-xl bg-neutral-50 dark:bg-neutral-800/40 border border-neutral-200 dark:border-neutral-700"
      >
        <h4 className="text-neutral-900 dark:text-white font-semibold mb-4">Comment ca marche ?</h4>
        <div className="space-y-4">
          {[
            { step: '01', text: 'Remplissez le formulaire de devis' },
            { step: '02', text: 'Notre equipe analyse votre demande' },
            { step: '03', text: 'Recevez votre devis sous 48h' },
            { step: '04', text: 'Validation et debut des travaux' },
          ].map((item, i) => (
            <div key={item.step} className="flex items-start gap-3">
              <span className="flex-shrink-0 w-8 h-8 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 text-xs font-bold flex items-center justify-center">
                {item.step}
              </span>
              <span className="text-neutral-500 dark:text-neutral-400 text-sm pt-1">{item.text}</span>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/*  Quote Form Section                                                  */
/* ------------------------------------------------------------------ */
function QuoteFormSection() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  const [form, setForm] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    service: '',
    description: '',
    budget: '',
    timeline: '',
  })

  const [errors, setErrors] = useState<Record<string, string>>({})
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  function validate() {
    const errs: Record<string, string> = {}
    if (!form.name.trim()) errs.name = 'Le nom est requis'
    if (!form.email.trim()) {
      errs.email = "L'email est requis"
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      errs.email = 'Email invalide'
    }
    if (!form.phone.trim()) errs.phone = 'Le telephone est requis'
    if (!form.service) errs.service = 'Selectionnez un service'
    if (!form.description.trim()) errs.description = 'Decrivez votre projet'
    setErrors(errs)
    return Object.keys(errs).length === 0
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    if (!validate()) return
    setLoading(true)
    try {
      await new Promise((r) => setTimeout(r, 2000))
      setSuccess(true)
      setForm({
        name: '',
        company: '',
        email: '',
        phone: '',
        service: '',
        description: '',
        budget: '',
        timeline: '',
      })
      setTimeout(() => setSuccess(false), 5000)
    } finally {
      setLoading(false)
    }
  }

  const set = (field: keyof typeof form) => (v: string) => {
    setForm((prev) => ({ ...prev, [field]: v }))
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: '' }))
  }

  const serviceOptions = services.map((s) => ({
    value: s.id,
    label: s.title,
  }))

  const budgetOptions = [
    { value: 'moins-500k', label: 'Moins de 500 000 FCFA' },
    { value: '500k-2m', label: '500 000 - 2 000 000 FCFA' },
    { value: '2m-5m', label: '2 000 000 - 5 000 000 FCFA' },
    { value: '5m-10m', label: '5 000 000 - 10 000 000 FCFA' },
    { value: 'plus-10m', label: 'Plus de 10 000 000 FCFA' },
    { value: 'non-defini', label: 'Budget non defini' },
  ]

  const timelineOptions = [
    { value: 'urgent', label: 'Urgent (moins d\'une semaine)' },
    { value: '1-2-semaines', label: '1 a 2 semaines' },
    { value: '1-mois', label: '1 mois' },
    { value: '2-3-mois', label: '2 a 3 mois' },
    { value: 'plus-3-mois', label: 'Plus de 3 mois' },
    { value: 'flexible', label: 'Flexible' },
  ]

  return (
    <section ref={ref} className="relative py-24 bg-neutral-50 dark:bg-neutral-950 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,rgba(245,158,11,0.06),transparent_60%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(59,130,246,0.03),transparent_50%)]" />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-[1fr_340px] gap-12 lg:gap-16">
          {/* Form */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7 }}
          >
            <form
              onSubmit={handleSubmit}
              className="p-8 md:p-10 rounded-2xl bg-white dark:bg-neutral-800/40 border border-neutral-200 dark:border-neutral-700 backdrop-blur-sm space-y-6"
            >
              <div>
                <h2 className="text-2xl font-bold text-neutral-900 dark:text-white mb-1">Votre projet</h2>
                <p className="text-neutral-500 dark:text-neutral-500 text-sm">
                  Remplissez le formulaire ci-dessous pour recevoir votre devis personnalise.
                </p>
              </div>

              {/* Personal info */}
              <div className="grid sm:grid-cols-2 gap-5">
                <FloatingField
                  id="name"
                  label="Nom complet *"
                  icon={<User className="w-4 h-4" />}
                  required
                  value={form.name}
                  onChange={set('name')}
                  error={errors.name}
                />
                <FloatingField
                  id="company"
                  label="Entreprise"
                  icon={<Building2 className="w-4 h-4" />}
                  value={form.company}
                  onChange={set('company')}
                />
              </div>

              <div className="grid sm:grid-cols-2 gap-5">
                <FloatingField
                  id="email"
                  label="Email *"
                  icon={<Mail className="w-4 h-4" />}
                  type="email"
                  required
                  value={form.email}
                  onChange={set('email')}
                  error={errors.email}
                />
                <FloatingField
                  id="phone"
                  label="Telephone *"
                  icon={<Phone className="w-4 h-4" />}
                  type="tel"
                  required
                  value={form.phone}
                  onChange={set('phone')}
                  error={errors.phone}
                />
              </div>

              {/* Service selection */}
              <SelectField
                id="service"
                label="Service souhaite *"
                icon={<FileText className="w-4 h-4" />}
                options={serviceOptions}
                value={form.service}
                onChange={set('service')}
                error={errors.service}
              />

              {/* Project description */}
              <FloatingField
                id="description"
                label="Description du projet *"
                icon={<MessageSquare className="w-4 h-4" />}
                textarea
                required
                value={form.description}
                onChange={set('description')}
                error={errors.description}
              />

              {/* Budget & timeline */}
              <div className="grid sm:grid-cols-2 gap-5">
                <SelectField
                  id="budget"
                  label="Budget estime"
                  icon={<DollarSign className="w-4 h-4" />}
                  options={budgetOptions}
                  value={form.budget}
                  onChange={set('budget')}
                />
                <SelectField
                  id="timeline"
                  label="Delai souhaite"
                  icon={<Clock className="w-4 h-4" />}
                  options={timelineOptions}
                  value={form.timeline}
                  onChange={set('timeline')}
                />
              </div>

              {/* Submit */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 pt-2">
                <motion.button
                  type="submit"
                  disabled={loading}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="relative w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-amber-500 to-amber-600 text-white dark:text-neutral-950 font-bold rounded-lg overflow-hidden disabled:opacity-70 disabled:cursor-not-allowed transition-shadow hover:shadow-lg hover:shadow-amber-500/25"
                >
                  {/* Shimmer */}
                  <motion.span
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                    initial={{ x: '-100%' }}
                    animate={{ x: '100%' }}
                    transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                  />
                  <span className="relative flex items-center justify-center gap-2">
                    {loading ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        Envoi en cours...
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5" />
                        Envoyer la demande
                      </>
                    )}
                  </span>
                </motion.button>

                <p className="text-neutral-500 dark:text-neutral-500 text-xs">
                  * Champs obligatoires. Reponse sous 48h.
                </p>
              </div>

              {/* Success message */}
              <AnimatePresence>
                {success && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="p-4 rounded-lg bg-green-500/10 border border-green-500/20 text-green-600 dark:text-green-400 text-sm flex items-start gap-3"
                  >
                    <CheckCircle2 className="w-5 h-5 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold">Demande envoyee avec succes !</p>
                      <p className="text-green-600/70 dark:text-green-400/70 mt-1">
                        Nous avons bien recu votre demande de devis et vous repondrons dans les
                        plus brefs delais.
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </form>
          </motion.div>

          {/* Side panel */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="lg:sticky lg:top-28 lg:self-start"
          >
            <ContactSidePanel />
          </motion.div>
        </div>
      </div>
    </section>
  )
}

/* ------------------------------------------------------------------ */
/*  Page                                                                */
/* ------------------------------------------------------------------ */
export default function QuotePage() {
  return (
    <>
      <Header />
      <main>
        <PageBanner />
        <QuoteFormSection />
      </main>
      <Footer />
    </>
  )
}
