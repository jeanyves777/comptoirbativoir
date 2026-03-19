'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Phone, Mail, MapPin, Facebook, Instagram, Linkedin } from 'lucide-react'
import { companyInfo, navLinks } from '@/lib/data'
import Logo from '@/components/Logo'

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.5, ease: 'easeOut' as const },
  }),
}

export default function Footer() {
  const currentYear = new Date().getFullYear()

  const socialLinks = [
    { href: companyInfo.social.facebook, icon: Facebook, label: 'Facebook' },
    { href: companyInfo.social.instagram, icon: Instagram, label: 'Instagram' },
    { href: companyInfo.social.linkedin, icon: Linkedin, label: 'LinkedIn' },
  ]

  const services = [
    'Coffret Inverseur',
    'Climatisation',
    'Groupe Électrogène',
    'Maintenance',
    'Électricité Bâtiment',
  ]

  const legalLinks = [
    { href: '/legal', label: 'Mentions Légales' },
    { href: '/privacy', label: 'Confidentialité' },
    { href: '/terms', label: 'CGU' },
    { href: '/cookies', label: 'Cookies' },
  ]

  return (
    <footer className="bg-neutral-900 dark:bg-neutral-950">
      {/* Top amber gradient line */}
      <div className="h-1 bg-gradient-to-r from-orange-500 via-orange-400 to-orange-500" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        {/* Top row: Company info + Contact info */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-10 pb-10 border-b border-neutral-800"
        >
          {/* Company Info + Social */}
          <motion.div variants={fadeInUp} custom={0}>
            <Link href="/" className="inline-block mb-4">
              <Logo size="md" showText />
            </Link>
            <p className="text-neutral-400 text-sm leading-relaxed mb-6 max-w-md">
              {companyInfo.description}
            </p>
            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="flex items-center justify-center w-10 h-10 rounded-lg bg-neutral-800 text-neutral-400 hover:bg-neutral-700 hover:text-orange-400 transition-all duration-300"
                >
                  <social.icon size={18} />
                </a>
              ))}
            </div>
          </motion.div>

          {/* Contact Info */}
          <motion.div variants={fadeInUp} custom={1}>
            <h3 className="text-white font-semibold text-sm uppercase tracking-wider mb-5">
              Contact
            </h3>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 w-9 h-9 rounded-lg bg-orange-500/10 flex items-center justify-center mt-0.5">
                  <Phone size={16} className="text-orange-500" />
                </div>
                <div className="space-y-1">
                  {companyInfo.phones.map((phone) => (
                    <a
                      key={phone}
                      href={`tel:${phone.replace(/\s/g, '')}`}
                      className="block text-neutral-400 hover:text-orange-400 text-sm transition-colors duration-200"
                    >
                      {phone}
                    </a>
                  ))}
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 w-9 h-9 rounded-lg bg-orange-500/10 flex items-center justify-center mt-0.5">
                  <Mail size={16} className="text-orange-500" />
                </div>
                <div className="space-y-1">
                  {companyInfo.emails.map((email) => (
                    <a
                      key={email}
                      href={`mailto:${email}`}
                      className="block text-neutral-400 hover:text-orange-400 text-sm transition-colors duration-200 break-all"
                    >
                      {email}
                    </a>
                  ))}
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 w-9 h-9 rounded-lg bg-orange-500/10 flex items-center justify-center mt-0.5">
                  <MapPin size={16} className="text-orange-500" />
                </div>
                <p className="text-neutral-400 text-sm leading-relaxed">
                  {companyInfo.address}
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Bottom row: 4 columns */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-10"
        >
          {/* Quick Links */}
          <motion.div variants={fadeInUp} custom={0}>
            <h3 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">
              Liens Rapides
            </h3>
            <ul className="space-y-2.5">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-neutral-400 hover:text-orange-400 text-sm transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/blog"
                  className="text-neutral-400 hover:text-orange-400 text-sm transition-colors duration-200"
                >
                  Blog
                </Link>
              </li>
            </ul>
          </motion.div>

          {/* Services */}
          <motion.div variants={fadeInUp} custom={1}>
            <h3 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">
              Nos Services
            </h3>
            <ul className="space-y-2.5">
              {services.map((s) => (
                <li key={s}>
                  <Link
                    href="/services"
                    className="text-neutral-400 hover:text-orange-400 text-sm transition-colors duration-200"
                  >
                    {s}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Legal */}
          <motion.div variants={fadeInUp} custom={2}>
            <h3 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">
              Informations Légales
            </h3>
            <ul className="space-y-2.5">
              {legalLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-neutral-400 hover:text-orange-400 text-sm transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Devis CTA */}
          <motion.div variants={fadeInUp} custom={3}>
            <h3 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">
              Besoin d&apos;un Devis ?
            </h3>
            <p className="text-neutral-400 text-sm leading-relaxed mb-4">
              Contactez-nous pour un devis gratuit et personnalisé.
            </p>
            <Link
              href="/quote"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-orange-500 text-white font-semibold text-sm hover:bg-orange-600 transition-all duration-300"
            >
              Obtenir un Devis
            </Link>
          </motion.div>
        </motion.div>

        {/* Copyright */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="pt-6 border-t border-neutral-800 text-center"
        >
          <p className="text-neutral-500 text-sm">
            &copy; {currentYear} {companyInfo.name}. Tous droits r&eacute;serv&eacute;s.
          </p>
        </motion.div>
      </div>
    </footer>
  )
}
