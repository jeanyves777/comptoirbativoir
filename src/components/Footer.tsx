'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Phone, Mail, MapPin, Facebook, Instagram, Linkedin } from 'lucide-react'
import { companyInfo, navLinks } from '@/lib/data'
import Logo from '@/components/Logo'

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
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

  return (
    <footer className="relative bg-gray-950 border-t border-gray-800/50">
      {/* Animated Divider */}
      <div className="absolute top-0 left-0 right-0 h-px overflow-hidden">
        <div
          className="h-full w-[200%] animate-[shimmer_3s_linear_infinite]"
          style={{
            background:
              'linear-gradient(90deg, transparent, #f59e0b, #d97706, #f59e0b, transparent)',
          }}
        />
      </div>

      <style jsx>{`
        @keyframes shimmer {
          0% {
            transform: translateX(-50%);
          }
          100% {
            transform: translateX(0%);
          }
        }
      `}</style>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8"
        >
          {/* Company Info */}
          <motion.div variants={fadeInUp} custom={0} className="lg:col-span-1">
            <Link href="/" className="inline-block mb-4">
              <Logo size="md" variant="light" showText={true} />
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed mb-6">
              {companyInfo.description}
            </p>

            {/* Social Links */}
            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="flex items-center justify-center w-9 h-9 rounded-lg bg-gray-800/50 text-gray-400 hover:bg-amber-500/10 hover:text-amber-400 border border-gray-700/50 hover:border-amber-500/30 transition-all duration-300"
                >
                  <social.icon size={16} />
                </a>
              ))}
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div variants={fadeInUp} custom={1}>
            <h3 className="text-white font-semibold text-sm uppercase tracking-wider mb-5">
              Liens Rapides
            </h3>
            <ul className="space-y-3">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-amber-400 text-sm transition-colors duration-200 inline-flex items-center gap-1.5 group"
                  >
                    <span className="w-1 h-1 rounded-full bg-gray-600 group-hover:bg-amber-500 transition-colors duration-200" />
                    {link.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/blog" className="text-gray-400 hover:text-amber-400 text-sm transition-colors duration-200 inline-flex items-center gap-1.5 group">
                  <span className="w-1 h-1 rounded-full bg-gray-600 group-hover:bg-amber-500 transition-colors duration-200" />
                  Blog
                </Link>
              </li>
            </ul>
          </motion.div>

          {/* Legal Links */}
          <motion.div variants={fadeInUp} custom={1.5}>
            <h3 className="text-white font-semibold text-sm uppercase tracking-wider mb-5">
              Informations Légales
            </h3>
            <ul className="space-y-3">
              {[
                { href: '/legal', label: 'Mentions Légales' },
                { href: '/privacy', label: 'Politique de Confidentialité' },
                { href: '/terms', label: 'Conditions Générales' },
                { href: '/cookies', label: 'Politique des Cookies' },
              ].map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-gray-400 hover:text-amber-400 text-sm transition-colors duration-200 inline-flex items-center gap-1.5 group">
                    <span className="w-1 h-1 rounded-full bg-gray-600 group-hover:bg-amber-500 transition-colors duration-200" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact Info */}
          <motion.div variants={fadeInUp} custom={2} className="lg:col-span-2">
            <h3 className="text-white font-semibold text-sm uppercase tracking-wider mb-5">
              Contact
            </h3>
            <div className="space-y-4">
              {/* Address */}
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-amber-500/10 flex items-center justify-center mt-0.5">
                  <MapPin size={14} className="text-amber-500" />
                </div>
                <p className="text-gray-400 text-sm leading-relaxed">
                  {companyInfo.address}
                </p>
              </div>

              {/* Phones */}
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-amber-500/10 flex items-center justify-center mt-0.5">
                  <Phone size={14} className="text-amber-500" />
                </div>
                <div className="space-y-1">
                  {companyInfo.phones.map((phone) => (
                    <a
                      key={phone}
                      href={`tel:${phone.replace(/\s/g, '')}`}
                      className="block text-gray-400 hover:text-amber-400 text-sm transition-colors duration-200"
                    >
                      {phone}
                    </a>
                  ))}
                </div>
              </div>

              {/* Emails */}
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-amber-500/10 flex items-center justify-center mt-0.5">
                  <Mail size={14} className="text-amber-500" />
                </div>
                <div className="space-y-1">
                  {companyInfo.emails.map((email) => (
                    <a
                      key={email}
                      href={`mailto:${email}`}
                      className="block text-gray-400 hover:text-amber-400 text-sm transition-colors duration-200 break-all"
                    >
                      {email}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="mt-12 pt-6 border-t border-gray-800/50"
        >
          <p className="text-center text-gray-500 text-sm">
            &copy; {currentYear} {companyInfo.name}. Tous droits r&eacute;serv&eacute;s.
          </p>
        </motion.div>
      </div>
    </footer>
  )
}
