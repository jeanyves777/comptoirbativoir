'use client'

import { useRef } from 'react'
import Link from 'next/link'
import { motion, useInView } from 'framer-motion'
import { Shield, ChevronRight } from 'lucide-react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

const lastUpdated = '19 mars 2026'

const tableOfContents = [
  { id: 'introduction', label: 'Introduction' },
  { id: 'collecte', label: 'Collecte des Données' },
  { id: 'utilisation', label: 'Utilisation des Données' },
  { id: 'cookies', label: 'Cookies' },
  { id: 'droits', label: 'Droits des Utilisateurs' },
  { id: 'securite', label: 'Sécurité' },
  { id: 'contact', label: 'Contact' },
]

function AnimatedSection({ id, children }: { id: string; children: React.ReactNode }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <motion.section
      id={id}
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="mb-12 scroll-mt-28"
    >
      {children}
    </motion.section>
  )
}

export default function PrivacyPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-white dark:bg-neutral-950">
        {/* Hero Banner */}
        <div className="relative pt-24 pb-16 overflow-hidden">
          <div
            className="absolute inset-0"
            style={{
              background: 'linear-gradient(135deg, rgba(245,158,11,0.08) 0%, transparent 50%)',
            }}
          />
          <div className="absolute inset-0 opacity-5" style={{
            backgroundImage: 'linear-gradient(rgba(245,158,11,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(245,158,11,0.3) 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }} />
          <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-orange-500/10 border border-orange-500/20 mb-6">
                <Shield className="w-8 h-8 text-orange-500" />
              </div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 text-neutral-900 dark:text-white">
                Politique de Confidentialité
              </h1>
              <p className="text-lg text-neutral-500 dark:text-neutral-400">
                Dernière mise à jour : {lastUpdated}
              </p>
            </motion.div>
          </div>
        </div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
          {/* Table of Contents */}
          <motion.nav
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mb-16 p-6 rounded-xl border bg-neutral-50 dark:bg-neutral-800 border-neutral-200 dark:border-neutral-700"
          >
            <h2 className="text-lg font-semibold mb-4 text-neutral-900 dark:text-white">
              Table des matières
            </h2>
            <ul className="space-y-2">
              {tableOfContents.map((item, index) => (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    className="flex items-center gap-2 py-1 text-sm transition-colors duration-200 text-neutral-600 dark:text-neutral-300 hover:text-orange-500"
                  >
                    <ChevronRight size={14} className="text-orange-500/60" />
                    <span className="text-orange-500/60 font-mono text-xs">Article {index + 1}</span>
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </motion.nav>

          {/* Content */}
          <div className="legal-content text-neutral-600 dark:text-neutral-300">
            <AnimatedSection id="introduction">
              <h2 className="text-xl sm:text-2xl font-bold mb-4 text-neutral-900 dark:text-white">
                <span className="text-orange-500 mr-2">Article 1 —</span> Introduction
              </h2>
              <p className="leading-relaxed mb-4">
                Le COMPTOIR DES BATISSEURS IVOIRIENS (ci-après « CBI » ou « la Société ») accorde une importance
                particulière à la protection de vos données à caractère personnel. La présente Politique de Confidentialité
                a pour objet de vous informer sur la manière dont nous collectons, traitons et protégeons vos données
                personnelles, conformément à la <strong>Loi n°2013-450 du 19 juin 2013 relative à la protection des
                données à caractère personnel</strong> en République de Côte d&apos;Ivoire et aux réglementations en vigueur
                de l&apos;Autorité de Régulation des Télécommunications/TIC de Côte d&apos;Ivoire (ARTCI).
              </p>
              <p className="leading-relaxed">
                Cette politique s&apos;applique à l&apos;ensemble des services proposés par CBI à travers son site internet
                <strong> comptoirbativoir.com</strong> et dans le cadre de ses activités d&apos;électricité industrielle,
                de froid et climatisation, et de maintenance d&apos;équipements électriques.
              </p>
            </AnimatedSection>

            <AnimatedSection id="collecte">
              <h2 className="text-xl sm:text-2xl font-bold mb-4 text-neutral-900 dark:text-white">
                <span className="text-orange-500 mr-2">Article 2 —</span> Collecte des Données
              </h2>
              <p className="leading-relaxed mb-4">
                Dans le cadre de son activité, CBI est amenée à collecter les catégories de données personnelles suivantes :
              </p>
              <ul className="list-disc pl-6 space-y-2 mb-4">
                <li><strong>Données d&apos;identification :</strong> nom, prénom, raison sociale, fonction ;</li>
                <li><strong>Données de contact :</strong> adresse postale, adresse e-mail, numéro de téléphone ;</li>
                <li><strong>Données professionnelles :</strong> nom de l&apos;entreprise, secteur d&apos;activité, détails du projet ;</li>
                <li><strong>Données de navigation :</strong> adresse IP, type de navigateur, pages consultées, durée de visite ;</li>
                <li><strong>Données de demande de devis :</strong> description des travaux souhaités, localisation du chantier, budget prévisionnel.</li>
              </ul>
              <p className="leading-relaxed">
                Ces données sont collectées lorsque vous remplissez un formulaire de contact, demandez un devis,
                vous inscrivez à notre newsletter ou naviguez sur notre site. La collecte est fondée sur votre
                consentement, l&apos;exécution d&apos;un contrat ou notre intérêt légitime à répondre à vos demandes.
              </p>
            </AnimatedSection>

            <AnimatedSection id="utilisation">
              <h2 className="text-xl sm:text-2xl font-bold mb-4 text-neutral-900 dark:text-white">
                <span className="text-orange-500 mr-2">Article 3 —</span> Utilisation des Données
              </h2>
              <p className="leading-relaxed mb-4">
                Les données personnelles collectées sont utilisées aux fins suivantes :
              </p>
              <ul className="list-disc pl-6 space-y-2 mb-4">
                <li>Traitement de vos demandes de devis et de renseignements ;</li>
                <li>Exécution et suivi de nos prestations de services (installations électriques, maintenance, climatisation) ;</li>
                <li>Gestion de la relation client et communication commerciale ;</li>
                <li>Amélioration de nos services et de l&apos;expérience utilisateur sur notre site ;</li>
                <li>Respect de nos obligations légales et réglementaires ;</li>
                <li>Établissement de statistiques anonymisées de fréquentation.</li>
              </ul>
              <p className="leading-relaxed">
                Vos données ne sont en aucun cas vendues, louées ou cédées à des tiers à des fins commerciales sans votre
                consentement préalable. Elles peuvent être transmises à nos sous-traitants et partenaires uniquement dans
                le cadre de l&apos;exécution de nos prestations.
              </p>
            </AnimatedSection>

            <AnimatedSection id="cookies">
              <h2 className="text-xl sm:text-2xl font-bold mb-4 text-neutral-900 dark:text-white">
                <span className="text-orange-500 mr-2">Article 4 —</span> Cookies
              </h2>
              <p className="leading-relaxed mb-4">
                Notre site utilise des cookies pour améliorer votre expérience de navigation. Les cookies sont de
                petits fichiers texte stockés sur votre terminal lors de votre visite.
              </p>
              <p className="leading-relaxed mb-4">
                Nous utilisons les types de cookies suivants :
              </p>
              <ul className="list-disc pl-6 space-y-2 mb-4">
                <li><strong>Cookies strictement nécessaires :</strong> indispensables au fonctionnement du site (préférence de thème, session) ;</li>
                <li><strong>Cookies de performance :</strong> nous permettent de mesurer l&apos;audience et d&apos;améliorer nos services ;</li>
                <li><strong>Cookies fonctionnels :</strong> mémorisent vos préférences pour personnaliser votre expérience.</li>
              </ul>
              <p className="leading-relaxed">
                Vous pouvez gérer vos préférences en matière de cookies à tout moment via les paramètres de votre
                navigateur. Pour plus de détails, consultez notre{' '}
                <Link href="/cookies" className="text-orange-600 dark:text-orange-400 hover:text-orange-500 underline underline-offset-2">
                  Politique relative aux Cookies
                </Link>.
              </p>
            </AnimatedSection>

            <AnimatedSection id="droits">
              <h2 className="text-xl sm:text-2xl font-bold mb-4 text-neutral-900 dark:text-white">
                <span className="text-orange-500 mr-2">Article 5 —</span> Droits des Utilisateurs
              </h2>
              <p className="leading-relaxed mb-4">
                Conformément à la Loi n°2013-450 du 19 juin 2013 relative à la protection des données à caractère
                personnel, vous disposez des droits suivants :
              </p>
              <ul className="list-disc pl-6 space-y-2 mb-4">
                <li><strong>Droit d&apos;accès :</strong> obtenir la confirmation que des données vous concernant sont traitées et en obtenir une copie ;</li>
                <li><strong>Droit de rectification :</strong> demander la correction de vos données inexactes ou incomplètes ;</li>
                <li><strong>Droit d&apos;opposition :</strong> vous opposer au traitement de vos données pour des motifs légitimes ;</li>
                <li><strong>Droit de suppression :</strong> demander l&apos;effacement de vos données dans les conditions prévues par la loi ;</li>
                <li><strong>Droit à la portabilité :</strong> recevoir vos données dans un format structuré et lisible.</li>
              </ul>
              <p className="leading-relaxed">
                Pour exercer vos droits, vous pouvez nous contacter à l&apos;adresse indiquée à l&apos;Article 7 ci-dessous.
                Nous nous engageons à traiter votre demande dans un délai de trente (30) jours à compter de sa réception.
                En cas de litige, vous pouvez adresser une réclamation auprès de l&apos;ARTCI (Autorité de Régulation des
                Télécommunications/TIC de Côte d&apos;Ivoire).
              </p>
            </AnimatedSection>

            <AnimatedSection id="securite">
              <h2 className="text-xl sm:text-2xl font-bold mb-4 text-neutral-900 dark:text-white">
                <span className="text-orange-500 mr-2">Article 6 —</span> Sécurité
              </h2>
              <p className="leading-relaxed mb-4">
                CBI met en œuvre les mesures techniques et organisationnelles appropriées pour assurer la sécurité et
                la confidentialité de vos données personnelles, notamment :
              </p>
              <ul className="list-disc pl-6 space-y-2 mb-4">
                <li>Chiffrement des données transmises via le protocole HTTPS/SSL ;</li>
                <li>Contrôle strict des accès aux systèmes informatiques ;</li>
                <li>Sauvegarde régulière des données ;</li>
                <li>Sensibilisation du personnel aux enjeux de la protection des données.</li>
              </ul>
              <p className="leading-relaxed">
                Les données personnelles sont conservées pour une durée n&apos;excédant pas celle nécessaire aux finalités
                pour lesquelles elles ont été collectées, et en tout état de cause conformément aux délais de
                prescription légaux applicables en Côte d&apos;Ivoire.
              </p>
            </AnimatedSection>

            <AnimatedSection id="contact">
              <h2 className="text-xl sm:text-2xl font-bold mb-4 text-neutral-900 dark:text-white">
                <span className="text-orange-500 mr-2">Article 7 —</span> Contact
              </h2>
              <p className="leading-relaxed mb-4">
                Pour toute question relative à la présente politique de confidentialité ou pour exercer vos droits
                concernant vos données personnelles, vous pouvez nous contacter :
              </p>
              <div className="p-6 rounded-xl border bg-neutral-50 dark:bg-neutral-800 border-neutral-200 dark:border-neutral-700">
                <p className="mb-2"><strong>COMPTOIR DES BATISSEURS IVOIRIENS</strong></p>
                <p className="mb-1">Responsable du traitement des données</p>
                <p className="mb-1">11 BP 112 Abidjan 11, Angré non loin de la cité GESTOCI</p>
                <p className="mb-1">Abidjan, Côte d&apos;Ivoire</p>
                <p className="mb-1">
                  Téléphone :{' '}
                  <a href="tel:+2252722266533" className="text-orange-600 dark:text-orange-400 hover:text-orange-500">+225 27 22 26 65 33</a>
                </p>
                <p>
                  E-mail :{' '}
                  <a href="mailto:comptoirbatisseurivoiriens@gmail.com" className="text-orange-600 dark:text-orange-400 hover:text-orange-500">
                    comptoirbatisseurivoiriens@gmail.com
                  </a>
                </p>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
