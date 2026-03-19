'use client'

import { useRef } from 'react'
import Link from 'next/link'
import { motion, useInView } from 'framer-motion'
import { Cookie, ChevronRight } from 'lucide-react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

const lastUpdated = '19 mars 2026'

const tableOfContents = [
  { id: 'definition', label: "Qu'est-ce qu'un cookie ?" },
  { id: 'types', label: 'Types de Cookies Utilisés' },
  { id: 'finalites', label: 'Finalités des Cookies' },
  { id: 'consentement', label: 'Consentement' },
  { id: 'gestion', label: 'Gestion des Cookies' },
  { id: 'duree', label: 'Durée de Conservation' },
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

export default function CookiesPage() {
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
                <Cookie className="w-8 h-8 text-orange-500" />
              </div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 text-neutral-900 dark:text-white">
                Politique relative aux Cookies
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
            <AnimatedSection id="definition">
              <h2 className="text-xl sm:text-2xl font-bold mb-4 text-neutral-900 dark:text-white">
                <span className="text-orange-500 mr-2">Article 1 —</span> Qu&apos;est-ce qu&apos;un cookie ?
              </h2>
              <p className="leading-relaxed mb-4">
                Un cookie est un petit fichier texte déposé sur votre terminal (ordinateur, tablette, téléphone
                mobile) lors de votre visite sur un site internet. Il permet au site de mémoriser des informations
                relatives à votre navigation (langue préférée, identifiants de connexion, préférences d&apos;affichage, etc.)
                afin de faciliter vos visites ultérieures et de rendre le site plus convivial.
              </p>
              <p className="leading-relaxed">
                Les cookies ne causent aucun dommage à votre terminal et ne contiennent pas de virus. Ils sont
                largement utilisés afin de faire fonctionner les sites internet ou d&apos;en améliorer l&apos;efficacité.
              </p>
            </AnimatedSection>

            <AnimatedSection id="types">
              <h2 className="text-xl sm:text-2xl font-bold mb-4 text-neutral-900 dark:text-white">
                <span className="text-orange-500 mr-2">Article 2 —</span> Types de Cookies Utilisés
              </h2>
              <p className="leading-relaxed mb-4">
                Le site <strong>comptoirbativoir.com</strong> utilise les catégories de cookies suivantes :
              </p>

              <div className="space-y-4">
                <div className="p-5 rounded-xl border bg-neutral-50 dark:bg-neutral-800 border-neutral-200 dark:border-neutral-700">
                  <h3 className="font-semibold mb-2 text-neutral-900 dark:text-white">
                    Cookies strictement nécessaires
                  </h3>
                  <p className="text-sm leading-relaxed">
                    Ces cookies sont indispensables au fonctionnement du Site. Ils vous permettent de naviguer sur le
                    Site et d&apos;utiliser ses fonctionnalités essentielles. Sans ces cookies, le Site ne peut pas
                    fonctionner correctement. Ils incluent notamment le cookie de préférence de thème (clair/sombre).
                  </p>
                </div>

                <div className="p-5 rounded-xl border bg-neutral-50 dark:bg-neutral-800 border-neutral-200 dark:border-neutral-700">
                  <h3 className="font-semibold mb-2 text-neutral-900 dark:text-white">
                    Cookies de performance et d&apos;analyse
                  </h3>
                  <p className="text-sm leading-relaxed">
                    Ces cookies nous permettent de collecter des informations sur la façon dont les visiteurs utilisent
                    notre Site (pages les plus visitées, durée des visites, taux de rebond, etc.). Ces informations
                    sont agrégées et anonymisées et nous aident à améliorer le fonctionnement de notre Site.
                  </p>
                </div>

                <div className="p-5 rounded-xl border bg-neutral-50 dark:bg-neutral-800 border-neutral-200 dark:border-neutral-700">
                  <h3 className="font-semibold mb-2 text-neutral-900 dark:text-white">
                    Cookies fonctionnels
                  </h3>
                  <p className="text-sm leading-relaxed">
                    Ces cookies permettent de mémoriser vos choix (tels que votre préférence de langue ou de thème
                    d&apos;affichage) et de fournir des fonctionnalités améliorées et personnalisées. Ils peuvent
                    également être utilisés pour vous fournir des services que vous avez demandés.
                  </p>
                </div>
              </div>
            </AnimatedSection>

            <AnimatedSection id="finalites">
              <h2 className="text-xl sm:text-2xl font-bold mb-4 text-neutral-900 dark:text-white">
                <span className="text-orange-500 mr-2">Article 3 —</span> Finalités des Cookies
              </h2>
              <p className="leading-relaxed mb-4">
                Les cookies que nous utilisons ont pour finalités de :
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Assurer le bon fonctionnement technique du Site ;</li>
                <li>Mémoriser vos préférences d&apos;affichage (thème clair ou sombre) ;</li>
                <li>Mesurer l&apos;audience du Site et analyser les comportements de navigation ;</li>
                <li>Améliorer l&apos;ergonomie et les performances du Site ;</li>
                <li>Prévenir les abus et assurer la sécurité du Site ;</li>
                <li>Mémoriser le contenu de votre formulaire de demande de devis en cas d&apos;interruption.</li>
              </ul>
            </AnimatedSection>

            <AnimatedSection id="consentement">
              <h2 className="text-xl sm:text-2xl font-bold mb-4 text-neutral-900 dark:text-white">
                <span className="text-orange-500 mr-2">Article 4 —</span> Consentement
              </h2>
              <p className="leading-relaxed mb-4">
                Conformément à la réglementation ivoirienne, notamment la Loi n°2013-450 du 19 juin 2013 relative
                à la protection des données à caractère personnel et la Loi n°2013-546 du 30 juillet 2013 relative
                aux transactions électroniques :
              </p>
              <ul className="list-disc pl-6 space-y-2 mb-4">
                <li>
                  Les <strong>cookies strictement nécessaires</strong> sont déposés sans votre consentement préalable
                  car ils sont indispensables au fonctionnement du Site ;
                </li>
                <li>
                  Les <strong>cookies de performance et fonctionnels</strong> ne sont déposés qu&apos;après avoir obtenu
                  votre consentement éclairé, libre et spécifique ;
                </li>
                <li>
                  Vous pouvez <strong>retirer votre consentement</strong> à tout moment en modifiant les paramètres
                  de votre navigateur ou en nous contactant directement.
                </li>
              </ul>
              <p className="leading-relaxed">
                Le refus de certains cookies peut affecter votre expérience de navigation sur le Site et limiter
                l&apos;accès à certaines fonctionnalités.
              </p>
            </AnimatedSection>

            <AnimatedSection id="gestion">
              <h2 className="text-xl sm:text-2xl font-bold mb-4 text-neutral-900 dark:text-white">
                <span className="text-orange-500 mr-2">Article 5 —</span> Gestion des Cookies
              </h2>
              <p className="leading-relaxed mb-4">
                Vous pouvez configurer votre navigateur pour accepter ou refuser les cookies. Voici comment
                procéder sur les principaux navigateurs :
              </p>
              <div className="space-y-3 mb-4">
                <div className="p-4 rounded-lg border bg-neutral-50 dark:bg-neutral-800 border-neutral-200 dark:border-neutral-700">
                  <p className="text-sm">
                    <strong>Google Chrome :</strong> Menu &gt; Paramètres &gt; Confidentialité et sécurité &gt; Cookies et autres données des sites
                  </p>
                </div>
                <div className="p-4 rounded-lg border bg-neutral-50 dark:bg-neutral-800 border-neutral-200 dark:border-neutral-700">
                  <p className="text-sm">
                    <strong>Mozilla Firefox :</strong> Menu &gt; Options &gt; Vie privée et sécurité &gt; Cookies et données de sites
                  </p>
                </div>
                <div className="p-4 rounded-lg border bg-neutral-50 dark:bg-neutral-800 border-neutral-200 dark:border-neutral-700">
                  <p className="text-sm">
                    <strong>Safari :</strong> Préférences &gt; Confidentialité &gt; Cookies et données de sites web
                  </p>
                </div>
                <div className="p-4 rounded-lg border bg-neutral-50 dark:bg-neutral-800 border-neutral-200 dark:border-neutral-700">
                  <p className="text-sm">
                    <strong>Microsoft Edge :</strong> Paramètres &gt; Cookies et autorisations de site &gt; Gérer et supprimer les cookies
                  </p>
                </div>
              </div>
              <p className="leading-relaxed">
                Vous pouvez également supprimer les cookies déjà enregistrés sur votre terminal à tout moment
                via les paramètres de votre navigateur. Veuillez noter que la suppression ou le blocage des
                cookies peut empêcher certaines fonctionnalités du Site de fonctionner correctement.
              </p>
            </AnimatedSection>

            <AnimatedSection id="duree">
              <h2 className="text-xl sm:text-2xl font-bold mb-4 text-neutral-900 dark:text-white">
                <span className="text-orange-500 mr-2">Article 6 —</span> Durée de Conservation
              </h2>
              <p className="leading-relaxed mb-4">
                La durée de conservation des cookies varie en fonction de leur type :
              </p>
              <div className="overflow-x-auto">
                <table className="w-full text-sm border-collapse">
                  <thead>
                    <tr className="border-b-2 border-neutral-200 dark:border-neutral-700">
                      <th className="text-left py-3 pr-4 font-semibold text-neutral-900 dark:text-white">Type de cookie</th>
                      <th className="text-left py-3 pr-4 font-semibold text-neutral-900 dark:text-white">Durée</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-neutral-200 dark:border-neutral-700">
                      <td className="py-3 pr-4">Cookies de session</td>
                      <td className="py-3 pr-4">Supprimés à la fermeture du navigateur</td>
                    </tr>
                    <tr className="border-b border-neutral-200 dark:border-neutral-700">
                      <td className="py-3 pr-4">Cookies de préférences (thème)</td>
                      <td className="py-3 pr-4">12 mois maximum</td>
                    </tr>
                    <tr className="border-b border-neutral-200 dark:border-neutral-700">
                      <td className="py-3 pr-4">Cookies d&apos;analyse</td>
                      <td className="py-3 pr-4">13 mois maximum</td>
                    </tr>
                    <tr>
                      <td className="py-3 pr-4">Cookies de consentement</td>
                      <td className="py-3 pr-4">12 mois maximum</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="leading-relaxed mt-4">
                À l&apos;expiration de leur durée de validité, les cookies sont automatiquement supprimés de votre terminal.
              </p>
            </AnimatedSection>

            <AnimatedSection id="contact">
              <h2 className="text-xl sm:text-2xl font-bold mb-4 text-neutral-900 dark:text-white">
                <span className="text-orange-500 mr-2">Article 7 —</span> Contact
              </h2>
              <p className="leading-relaxed mb-4">
                Pour toute question relative à notre utilisation des cookies ou pour exercer vos droits relatifs
                à vos données personnelles, vous pouvez nous contacter :
              </p>
              <div className="p-6 rounded-xl border bg-neutral-50 dark:bg-neutral-800 border-neutral-200 dark:border-neutral-700">
                <p className="mb-2"><strong>COMPTOIR DES BATISSEURS IVOIRIENS</strong></p>
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
              <p className="leading-relaxed mt-4">
                Pour plus d&apos;informations sur la protection de vos données personnelles, veuillez consulter notre{' '}
                <Link href="/privacy" className="text-orange-600 dark:text-orange-400 hover:text-orange-500 underline underline-offset-2">
                  Politique de Confidentialité
                </Link>.
              </p>
            </AnimatedSection>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
