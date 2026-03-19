"use client";

import { useRef, useState, FormEvent } from "react";
import { motion, useInView } from "framer-motion";
import {
  MapPin,
  Phone,
  Mail,
  Send,
  Loader2,
  User,
  MessageSquare,
  FileText,
} from "lucide-react";
import { companyInfo } from "@/lib/data";

/* ------------------------------------------------------------------ */
/*  Inline SVG – Animated Envelope with Signal Waves                   */
/* ------------------------------------------------------------------ */
function EnvelopeSVG() {
  return (
    <svg
      viewBox="0 0 200 160"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full max-w-[200px] h-auto mx-auto"
    >
      <style>{`
        @keyframes wave1 {
          0% { opacity: 0; transform: translate(0, 0) scale(0.8); }
          30% { opacity: 0.8; }
          100% { opacity: 0; transform: translate(20px, -15px) scale(1.3); }
        }
        @keyframes wave2 {
          0% { opacity: 0; transform: translate(0, 0) scale(0.8); }
          30% { opacity: 0.6; }
          100% { opacity: 0; transform: translate(26px, -20px) scale(1.4); }
        }
        @keyframes wave3 {
          0% { opacity: 0; transform: translate(0, 0) scale(0.8); }
          30% { opacity: 0.5; }
          100% { opacity: 0; transform: translate(32px, -24px) scale(1.5); }
        }
        @keyframes float-envelope {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-4px); }
        }
        .sig-wave-1 { animation: wave1 2s ease-out infinite; }
        .sig-wave-2 { animation: wave2 2s ease-out 0.4s infinite; }
        .sig-wave-3 { animation: wave3 2s ease-out 0.8s infinite; }
        .envelope-float { animation: float-envelope 3s ease-in-out infinite; }
      `}</style>

      <g className="envelope-float">
        {/* Envelope body */}
        <rect x="30" y="55" width="120" height="80" rx="6" fill="#1e293b" stroke="#f59e0b" strokeWidth="2" />
        {/* Flap */}
        <path d="M30 55 L90 100 L150 55" fill="none" stroke="#f59e0b" strokeWidth="2" strokeLinejoin="round" />
        {/* Inner flap shading */}
        <path d="M32 57 L90 95 L148 57" fill="#f59e0b" opacity="0.1" />
        {/* Letter peeking */}
        <rect x="50" y="42" width="80" height="30" rx="3" fill="#fef3c7" />
        <line x1="60" y1="50" x2="120" y2="50" stroke="#d97706" strokeWidth="1.5" opacity="0.5" />
        <line x1="60" y1="57" x2="110" y2="57" stroke="#d97706" strokeWidth="1.5" opacity="0.3" />
        <line x1="60" y1="64" x2="100" y2="64" stroke="#d97706" strokeWidth="1.5" opacity="0.2" />
      </g>

      {/* Signal waves */}
      <path d="M140 60 Q155 48 148 35" fill="none" stroke="#f59e0b" strokeWidth="2" strokeLinecap="round" className="sig-wave-1" />
      <path d="M145 55 Q165 38 155 20" fill="none" stroke="#f59e0b" strokeWidth="1.8" strokeLinecap="round" className="sig-wave-2" />
      <path d="M150 50 Q175 28 162 5" fill="none" stroke="#f59e0b" strokeWidth="1.5" strokeLinecap="round" className="sig-wave-3" />
    </svg>
  );
}

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
  const isInView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30, scale: 0.95 }}
      animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.5, delay, ease: "easeOut" as const }}
      className="group flex items-start gap-4 p-5 rounded-xl bg-gray-900/60 border border-gray-800 hover:border-amber-500/30 transition-colors duration-300"
    >
      <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-amber-500/10 flex items-center justify-center group-hover:bg-amber-500/20 transition-colors">
        {icon}
      </div>
      <div>
        <h4 className="text-white font-semibold mb-1">{title}</h4>
        {lines.map((line, i) => (
          <p key={i} className="text-gray-400 text-sm leading-relaxed">
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
  type = "text",
  required,
  textarea,
  value,
  onChange,
  error,
}: FloatingFieldProps) {
  const baseClass =
    "peer w-full bg-gray-900/60 border rounded-lg px-4 pt-6 pb-2 pl-11 text-white placeholder-transparent focus:outline-none focus:ring-2 focus:ring-amber-500/50 transition-colors";
  const borderClass = error
    ? "border-red-500"
    : "border-gray-700 focus:border-amber-500";

  return (
    <div className="relative">
      <div className="absolute left-3.5 top-4 text-gray-500 peer-focus:text-amber-400 transition-colors z-10">
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
        className="absolute left-11 top-1.5 text-xs text-gray-500 peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-focus:top-1.5 peer-focus:text-xs peer-focus:text-amber-400 transition-all pointer-events-none"
      >
        {label}
      </label>
      {error && <p className="mt-1 text-xs text-red-400">{error}</p>}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Main ContactSection Component                                      */
/* ------------------------------------------------------------------ */
export default function ContactSection() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  function validate() {
    const errs: Record<string, string> = {};
    if (!form.name.trim()) errs.name = "Le nom est requis";
    if (!form.email.trim()) {
      errs.email = "L'email est requis";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      errs.email = "Email invalide";
    }
    if (!form.subject.trim()) errs.subject = "Le sujet est requis";
    if (!form.message.trim()) errs.message = "Le message est requis";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    try {
      // Simulate API call
      await new Promise((r) => setTimeout(r, 1500));
      setSuccess(true);
      setForm({ name: "", email: "", subject: "", message: "" });
      setTimeout(() => setSuccess(false), 4000);
    } finally {
      setLoading(false);
    }
  }

  const set = (field: keyof typeof form) => (v: string) => {
    setForm((prev) => ({ ...prev, [field]: v }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: "" }));
  };

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative py-24 bg-gray-950 overflow-hidden"
    >
      {/* Background radial gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,rgba(245,158,11,0.06),transparent_60%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(59,130,246,0.04),transparent_50%)]" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 bg-amber-500/10 border border-amber-500/20 rounded-full text-amber-400 text-sm font-medium mb-4">
            Contactez-nous
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
            Restons en{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-500">
              Contact
            </span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            N&apos;hésitez pas à nous contacter pour toute demande de devis ou d&apos;information.
            Notre équipe est à votre disposition.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-12">
          {/* ---- Left: Info cards + map ---- */}
          <div className="lg:col-span-2 space-y-5">
            {/* Envelope SVG */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="mb-6"
            >
              <EnvelopeSVG />
            </motion.div>

            <InfoCard
              icon={<MapPin className="w-5 h-5 text-amber-400" />}
              title="Adresse"
              lines={[companyInfo.address]}
              delay={0.15}
            />
            <InfoCard
              icon={<Phone className="w-5 h-5 text-amber-400" />}
              title="Téléphone"
              lines={companyInfo.phones}
              delay={0.25}
            />
            <InfoCard
              icon={<Mail className="w-5 h-5 text-amber-400" />}
              title="Email"
              lines={companyInfo.emails}
              delay={0.35}
            />

            {/* Google Maps embed placeholder */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.45 }}
              className="rounded-xl overflow-hidden border border-gray-800 h-52"
            >
              <iframe
                title="Localisation CBI"
                src={`https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3972.5!2d-3.9639916!3d5.4016402!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2z!5e0!3m2!1sfr!2sci!4v1`}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition-all duration-500"
              />
            </motion.div>
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
              className="p-8 rounded-2xl bg-gray-900/40 border border-gray-800 backdrop-blur-sm space-y-5"
            >
              <h3 className="text-xl font-semibold text-white mb-2">
                Envoyez-nous un message
              </h3>

              <div className="grid sm:grid-cols-2 gap-5">
                <FloatingField
                  id="name"
                  label="Nom complet"
                  icon={<User className="w-4 h-4" />}
                  required
                  value={form.name}
                  onChange={set("name")}
                  error={errors.name}
                />
                <FloatingField
                  id="email"
                  label="Adresse email"
                  icon={<Mail className="w-4 h-4" />}
                  type="email"
                  required
                  value={form.email}
                  onChange={set("email")}
                  error={errors.email}
                />
              </div>

              <FloatingField
                id="subject"
                label="Sujet"
                icon={<FileText className="w-4 h-4" />}
                required
                value={form.subject}
                onChange={set("subject")}
                error={errors.subject}
              />

              <FloatingField
                id="message"
                label="Votre message"
                icon={<MessageSquare className="w-4 h-4" />}
                required
                textarea
                value={form.message}
                onChange={set("message")}
                error={errors.message}
              />

              {/* Submit button */}
              <motion.button
                type="submit"
                disabled={loading}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="relative w-full sm:w-auto px-8 py-3.5 bg-gradient-to-r from-amber-500 to-amber-600 text-white font-semibold rounded-lg overflow-hidden disabled:opacity-70 disabled:cursor-not-allowed transition-shadow hover:shadow-lg hover:shadow-amber-500/25"
              >
                {/* Animated shimmer */}
                <motion.span
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                  initial={{ x: "-100%" }}
                  animate={{ x: "100%" }}
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
                  className="p-4 rounded-lg bg-green-500/10 border border-green-500/20 text-green-400 text-sm"
                >
                  Votre message a bien été envoyé. Nous vous répondrons dans les plus brefs délais.
                </motion.div>
              )}
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
