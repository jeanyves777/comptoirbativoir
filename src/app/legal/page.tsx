'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Scale, ChevronRight } from 'lucide-react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

const lastUpdated = '19 mars 2026'

const tableOfContents = [
  { id: 'editeur', label: 'Éditeur du Site' },
  { id: 'directeur', label: 'Directeur de Publication' },
  { id: 'hebergeur', label: 'Hébergeur' },
  { id: 'propriete', label: 'Propriété Intellectuelle' },
  { id: 'conditions', label: "Conditions d'Utilisation" },
  { id: 'limitation', label: 'Limitation de Responsabilité' },
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

export default function LegalPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen" style={{ backgroundColor: 'var(--bg-primary)' }}>
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
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-amber-500/10 border border-amber-500/20 mb-6">
                <Scale className="w-8 h-8 text-amber-500" />
              </div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>
                Mentions Légales
              </h1>
              <p className="text-lg" style={{ color: 'var(--text-secondary)' }}>
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
            className="mb-16 p-6 rounded-xl border"
            style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border-color)' }}
          >
            <h2 className="text-lg font-semibold mb-4" style={{ color: 'var(--text-primary)' }}>
              Table des matières
            </h2>
            <ul className="space-y-2">
              {tableOfContents.map((item, index) => (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    className="flex items-center gap-2 py-1 text-sm transition-colors duration-200 hover:text-amber-500"
                    style={{ color: 'var(--text-secondary)' }}
                  >
                    <ChevronRight size={14} className="text-amber-500/60" />
                    <span className="text-amber-500/60 font-mono text-xs">Article {index + 1}</span>
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </motion.nav>

          {/* Content */}
          <div className="legal-content" style={{ color: 'var(--text-secondary)' }}>
            <AnimatedSection id="editeur">
              <h2 className="text-xl sm:text-2xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>
                <span className="text-amber-500 mr-2">Article 1 —</span> Éditeur du Site
              </h2>
              <p className="leading-relaxed mb-4">
                Le site internet <strong>comptoirbativoir.com</strong> est édité par :
              </p>
              <div className="p-6 rounded-xl border mb-4" style={{ backgroundColor: 'var(--bg-secondary)', borderColor: 'var(--border-color)' }}>
                <table className="w-full text-sm">
                  <tbody>
                    <tr className="border-b" style={{ borderColor: 'var(--border-color)' }}>
                      <td className="py-3 pr-4 font-semibold whitespace-nowrap" style={{ color: 'var(--text-primary)' }}>Raison sociale</td>
                      <td className="py-3">COMPTOIR DES BATISSEURS IVOIRIENS (CBI)</td>
                    </tr>
                    <tr className="border-b" style={{ borderColor: 'var(--border-color)' }}>
                      <td className="py-3 pr-4 font-semibold whitespace-nowrap" style={{ color: 'var(--text-primary)' }}>Forme juridique</td>
                      <td className="py-3">[Forme juridique à compléter — ex. : SARL]</td>
                    </tr>
                    <tr className="border-b" style={{ borderColor: 'var(--border-color)' }}>
                      <td className="py-3 pr-4 font-semibold whitespace-nowrap" style={{ color: 'var(--text-primary)' }}>Capital social</td>
                      <td className="py-3">[Capital social à compléter] FCFA</td>
                    </tr>
                    <tr className="border-b" style={{ borderColor: 'var(--border-color)' }}>
                      <td className="py-3 pr-4 font-semibold whitespace-nowrap" style={{ color: 'var(--text-primary)' }}>Siège social</td>
                      <td className="py-3">11 BP 112 Abidjan 11, Angré non loin de la cité GESTOCI, Abidjan, Côte d&apos;Ivoire</td>
                    </tr>
                    <tr className="border-b" style={{ borderColor: 'var(--border-color)' }}>
                      <td className="py-3 pr-4 font-semibold whitespace-nowrap" style={{ color: 'var(--text-primary)' }}>RCCM</td>
                      <td className="py-3">[Numéro RCCM à compléter — ex. : CI-ABJ-XXXX-B-XXXXX]</td>
                    </tr>
                    <tr className="border-b" style={{ borderColor: 'var(--border-color)' }}>
                      <td className="py-3 pr-4 font-semibold whitespace-nowrap" style={{ color: 'var(--text-primary)' }}>NCC</td>
                      <td className="py-3">[Numéro de Compte Contribuable à compléter]</td>
                    </tr>
                    <tr className="border-b" style={{ borderColor: 'var(--border-color)' }}>
                      <td className="py-3 pr-4 font-semibold whitespace-nowrap" style={{ color: 'var(--text-primary)' }}>Régime fiscal</td>
                      <td className="py-3">[Régime fiscal à compléter — ex. : Réel Normal d&apos;Imposition]</td>
                    </tr>
                    <tr className="border-b" style={{ borderColor: 'var(--border-color)' }}>
                      <td className="py-3 pr-4 font-semibold whitespace-nowrap" style={{ color: 'var(--text-primary)' }}>Téléphone</td>
                      <td className="py-3">
                        <a href="tel:+2252722266533" className="text-amber-500 hover:text-amber-400">+225 27 22 26 65 33</a>
                        {' / '}
                        <a href="tel:+2250799141199" className="text-amber-500 hover:text-amber-400">+225 07 99 14 11 99</a>
                      </td>
                    </tr>
                    <tr className="border-b" style={{ borderColor: 'var(--border-color)' }}>
                      <td className="py-3 pr-4 font-semibold whitespace-nowrap" style={{ color: 'var(--text-primary)' }}>E-mail</td>
                      <td className="py-3">
                        <a href="mailto:comptoirbatisseurivoiriens@gmail.com" className="text-amber-500 hover:text-amber-400">
                          comptoirbatisseurivoiriens@gmail.com
                        </a>
                      </td>
                    </tr>
                    <tr>
                      <td className="py-3 pr-4 font-semibold whitespace-nowrap" style={{ color: 'var(--text-primary)' }}>Site internet</td>
                      <td className="py-3">
                        <a href="https://comptoirbativoir.com" className="text-amber-500 hover:text-amber-400">
                          comptoirbativoir.com
                        </a>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </AnimatedSection>

            <AnimatedSection id="directeur">
              <h2 className="text-xl sm:text-2xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>
                <span className="text-amber-500 mr-2">Article 2 —</span> Directeur de Publication
              </h2>
              <p className="leading-relaxed mb-4">
                Le Directeur de la publication du Site est :
              </p>
              <div className="p-6 rounded-xl border" style={{ backgroundColor: 'var(--bg-secondary)', borderColor: 'var(--border-color)' }}>
                <p className="mb-1"><strong>[Nom et Prénom du Directeur de Publication]</strong></p>
                <p className="mb-1">En qualité de : [Fonction — ex. : Gérant / Directeur Général]</p>
                <p>
                  Contact :{' '}
                  <a href="mailto:comptoirbatisseurivoiriens@gmail.com" className="text-amber-500 hover:text-amber-400">
                    comptoirbatisseurivoiriens@gmail.com
                  </a>
                </p>
              </div>
            </AnimatedSection>

            <AnimatedSection id="hebergeur">
              <h2 className="text-xl sm:text-2xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>
                <span className="text-amber-500 mr-2">Article 3 —</span> Hébergeur
              </h2>
              <p className="leading-relaxed mb-4">
                Le Site est hébergé par :
              </p>
              <div className="p-6 rounded-xl border" style={{ backgroundColor: 'var(--bg-secondary)', borderColor: 'var(--border-color)' }}>
                <p className="mb-1"><strong>[Nom de l&apos;hébergeur — ex. : Vercel Inc.]</strong></p>
                <p className="mb-1">[Adresse de l&apos;hébergeur]</p>
                <p className="mb-1">[Téléphone de l&apos;hébergeur]</p>
                <p>[Site internet de l&apos;hébergeur]</p>
              </div>
            </AnimatedSection>

            <AnimatedSection id="propriete">
              <h2 className="text-xl sm:text-2xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>
                <span className="text-amber-500 mr-2">Article 4 —</span> Propriété Intellectuelle
              </h2>
              <p className="leading-relaxed mb-4">
                L&apos;ensemble du contenu du Site (textes, images, graphismes, logo, icônes, sons, logiciels, etc.) est
                la propriété exclusive de CBI ou de ses partenaires et est protégé par les lois ivoiriennes et
                internationales relatives à la propriété intellectuelle, notamment l&apos;Accord de Bangui révisé du
                24 février 1999 portant création de l&apos;Organisation Africaine de la Propriété Intellectuelle (OAPI).
              </p>
              <p className="leading-relaxed mb-4">
                Toute reproduction, représentation, diffusion ou redistribution, en tout ou en partie, du contenu
                du Site sur quelque support ou par tout procédé que ce soit, est interdite. Le non-respect de cette
                interdiction constitue une contrefaçon susceptible d&apos;engager la responsabilité civile et pénale
                du contrefacteur.
              </p>
              <p className="leading-relaxed">
                Les marques, logos et signes distinctifs présentés sur le Site sont la propriété de CBI. Toute
                utilisation sans autorisation préalable et écrite est strictement prohibée, conformément aux
                dispositions de l&apos;Annexe III de l&apos;Accord de Bangui relatif aux marques de produits ou de services.
              </p>
            </AnimatedSection>

            <AnimatedSection id="conditions">
              <h2 className="text-xl sm:text-2xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>
                <span className="text-amber-500 mr-2">Article 5 —</span> Conditions d&apos;Utilisation
              </h2>
              <p className="leading-relaxed mb-4">
                L&apos;utilisation du Site implique l&apos;acceptation pleine et entière des conditions générales
                d&apos;utilisation décrites dans nos{' '}
                <a href="/terms" className="text-amber-500 hover:text-amber-400 underline underline-offset-2">
                  Conditions Générales d&apos;Utilisation
                </a>.
              </p>
              <p className="leading-relaxed mb-4">
                Le Site est normalement accessible à tout moment aux utilisateurs. Une interruption pour raison
                de maintenance technique peut être décidée par CBI, qui s&apos;efforcera alors de communiquer
                préalablement aux utilisateurs les dates et heures de l&apos;intervention.
              </p>
              <p className="leading-relaxed">
                CBI met à jour régulièrement le Site et se réserve le droit de modifier le contenu à tout
                moment et sans préavis. En conséquence, l&apos;utilisateur reconnaît utiliser ces informations
                sous sa responsabilité exclusive.
              </p>
            </AnimatedSection>

            <AnimatedSection id="limitation">
              <h2 className="text-xl sm:text-2xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>
                <span className="text-amber-500 mr-2">Article 6 —</span> Limitation de Responsabilité
              </h2>
              <p className="leading-relaxed mb-4">
                CBI ne pourra être tenue responsable des dommages directs et indirects causés au matériel de
                l&apos;utilisateur lors de l&apos;accès au Site, résultant soit de l&apos;utilisation d&apos;un matériel ne
                répondant pas aux spécifications techniques requises, soit de l&apos;apparition d&apos;un bug ou d&apos;une
                incompatibilité.
              </p>
              <p className="leading-relaxed mb-4">
                CBI ne pourra également être tenue responsable des dommages indirects (tels par exemple
                qu&apos;une perte de marché ou perte d&apos;une chance) consécutifs à l&apos;utilisation du Site.
              </p>
              <p className="leading-relaxed mb-4">
                Des espaces interactifs (possibilité de poser des questions dans l&apos;espace contact) peuvent
                être mis à la disposition des utilisateurs. CBI se réserve le droit de supprimer, sans mise
                en demeure préalable, tout contenu déposé dans cet espace qui contreviendrait à la législation
                applicable en Côte d&apos;Ivoire, en particulier aux dispositions relatives à la protection des données.
              </p>
              <p className="leading-relaxed">
                En tout état de cause, la responsabilité de CBI au titre des présentes mentions légales ne
                saurait excéder le montant des sommes effectivement versées par l&apos;utilisateur à CBI dans
                le cadre de l&apos;utilisation du Site, le cas échéant.
              </p>
            </AnimatedSection>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
