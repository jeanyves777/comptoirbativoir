'use client';

import { useRef, useState, FormEvent } from 'react';
import { motion, useInView } from 'framer-motion';
import {
  MapPin,
  Phone,
  Mail,
  Send,
  Loader2,
  User,
  MessageSquare,
  FileText,
} from 'lucide-react';
import { companyInfo } from '@/lib/data';

/* ------------------------------------------------------------------ */
/*  Contact info card                                                  */
/* ------------------------------------------------------------------ */
interface InfoCardProps {
  icon: React.ReactNode;
  title: string;
  lines: string[];
  delay: number;
}

function InfoCard({ icon, title, lines, delay }: InfoCardProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-40px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30, scale: 0.95 }}
      animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.5, delay, ease: 'easeOut' }}
      className="group flex items-start gap-4 p-5 rounded-xl bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 hover:border-amber-500/30 dark:hover:border-amber-500/30 transition-colors duration-300"
    >
      <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-amber-50 text-amber-500 dark:bg-amber-500/10 dark:text-amber-400 flex items-center justify-center group-hover:bg-amber-100 dark:group-hover:bg-amber-500/20 transition-colors">
        {icon}
      </div>
      <div>
        <h4 className="text-neutral-900 dark:text-white font-semibold mb-1">
          {title}
        </h4>
        {lines.map((line, i) => (
          <p
            key={i}
            className="text-neutral-500 dark:text-neutral-400 text-sm leading-relaxed"
          >
            {line}
          </p>
        ))}
      </div>
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/*  Floating label input                                               */
/* ------------------------------------------------------------------ */
interface FloatingFieldProps {
  id: string;
  label: string;
  icon: React.ReactNode;
  type?: string;
  required?: boolean;
  textarea?: boolean;
  value: string;
  onChange: (v: string) => void;
  error?: string;
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
    'peer w-full bg-white dark:bg-neutral-900 border rounded-lg px-4 pt-6 pb-2 pl-11 text-neutral-900 dark:text-white placeholder-transparent focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500 transition-colors';
  const borderClass = error
    ? 'border-red-500 dark:border-red-400'
    : 'border-neutral-300 dark:border-neutral-600';

  return (
    <div className="relative">
      <div className="absolute left-3.5 top-4 text-neutral-400 dark:text-neutral-500 peer-focus:text-amber-500 dark:peer-focus:text-amber-400 transition-colors z-10">
        {icon}
      </div>
      {textarea ? (
        <textarea
          id={id}
          rows={4}
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
        className="absolute left-11 top-1.5 text-xs text-neutral-500 dark:text-neutral-400 peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-focus:top-1.5 peer-focus:text-xs peer-focus:text-amber-500 dark:peer-focus:text-amber-400 transition-all pointer-events-none"
      >
        {label}
      </label>
      {error && (
        <p className="mt-1 text-xs text-red-500 dark:text-red-400">{error}</p>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Main ContactSection Component                                      */
/* ------------------------------------------------------------------ */
export default function ContactSection() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });

  const [form, setForm] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  function validate() {
    const errs: Record<string, string> = {};
    if (!form.name.trim()) errs.name = 'Le nom est requis';
    if (!form.email.trim()) {
      errs.email = "L'email est requis";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      errs.email = 'Email invalide';
    }
    if (!form.subject.trim()) errs.subject = 'Le sujet est requis';
    if (!form.message.trim()) errs.message = 'Le message est requis';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    try {
      await new Promise((r) => setTimeout(r, 1500));
      setSuccess(true);
      setForm({ name: '', email: '', subject: '', message: '' });
      setTimeout(() => setSuccess(false), 4000);
    } finally {
      setLoading(false);
    }
  }

  const set = (field: keyof typeof form) => (v: string) => {
    setForm((prev) => ({ ...prev, [field]: v }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: '' }));
  };

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative py-24 bg-white dark:bg-neutral-950 overflow-hidden"
    >
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 bg-amber-50 border border-amber-200 dark:bg-amber-500/10 dark:border-amber-500/20 rounded-full text-amber-600 dark:text-amber-400 text-sm font-medium mb-4">
            Contactez-nous
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-neutral-900 dark:text-white mb-4">
            Restons en{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-500">
              Contact
            </span>
          </h2>
          <p className="text-neutral-500 dark:text-neutral-400 max-w-2xl mx-auto">
            N&apos;hésitez pas à nous contacter pour toute demande de devis ou
            d&apos;information. Notre équipe est à votre disposition.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-12">
          {/* ---- Left: Info cards ---- */}
          <div className="lg:col-span-2 space-y-5">
            <InfoCard
              icon={<MapPin className="w-5 h-5" />}
              title="Adresse"
              lines={[companyInfo.address]}
              delay={0.1}
            />
            <InfoCard
              icon={<Phone className="w-5 h-5" />}
              title="Téléphone"
              lines={companyInfo.phones}
              delay={0.2}
            />
            <InfoCard
              icon={<Mail className="w-5 h-5" />}
              title="Email"
              lines={companyInfo.emails}
              delay={0.3}
            />
          </div>

          {/* ---- Right: Contact form ---- */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="lg:col-span-3"
          >
            <form
              onSubmit={handleSubmit}
              className="p-8 rounded-2xl bg-neutral-50 dark:bg-neutral-800/50 border border-neutral-200 dark:border-neutral-700 space-y-5"
            >
              <h3 className="text-xl font-semibold text-neutral-900 dark:text-white mb-2">
                Envoyez-nous un message
              </h3>

              <div className="grid sm:grid-cols-2 gap-5">
                <FloatingField
                  id="name"
                  label="Nom complet"
                  icon={<User className="w-4 h-4" />}
                  required
                  value={form.name}
                  onChange={set('name')}
                  error={errors.name}
                />
                <FloatingField
                  id="email"
                  label="Adresse email"
                  icon={<Mail className="w-4 h-4" />}
                  type="email"
                  required
                  value={form.email}
                  onChange={set('email')}
                  error={errors.email}
                />
              </div>

              <FloatingField
                id="subject"
                label="Sujet"
                icon={<FileText className="w-4 h-4" />}
                required
                value={form.subject}
                onChange={set('subject')}
                error={errors.subject}
              />

              <FloatingField
                id="message"
                label="Votre message"
                icon={<MessageSquare className="w-4 h-4" />}
                required
                textarea
                value={form.message}
                onChange={set('message')}
                error={errors.message}
              />

              {/* Submit button */}
              <motion.button
                type="submit"
                disabled={loading}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full sm:w-auto px-8 py-3.5 bg-amber-500 text-white font-semibold rounded-lg hover:bg-amber-600 disabled:opacity-70 disabled:cursor-not-allowed transition-colors"
              >
                <span className="flex items-center justify-center gap-2">
                  {loading ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Envoi en cours...
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      Envoyer le message
                    </>
                  )}
                </span>
              </motion.button>

              {/* Success message */}
              {success && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="p-4 rounded-lg bg-green-50 border border-green-200 text-green-700 dark:bg-green-500/10 dark:border-green-500/20 dark:text-green-400 text-sm"
                >
                  Votre message a bien été envoyé. Nous vous répondrons dans les
                  plus brefs délais.
                </motion.div>
              )}
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
