'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { FileText, ChevronRight } from 'lucide-react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

const lastUpdated = '19 mars 2026'

const tableOfContents = [
  { id: 'objet', label: 'Objet' },
  { id: 'acces', label: 'Accès au Site' },
  { id: 'propriete', label: 'Propriété Intellectuelle' },
  { id: 'responsabilite', label: 'Responsabilité' },
  { id: 'liens', label: 'Liens Hypertextes' },
  { id: 'droit', label: 'Droit Applicable' },
  { id: 'litiges', label: 'Litiges' },
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

export default function TermsPage() {
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
                <FileText className="w-8 h-8 text-orange-500" />
              </div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 text-neutral-900 dark:text-white">
                Conditions Générales d&apos;Utilisation
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
            <AnimatedSection id="objet">
              <h2 className="text-xl sm:text-2xl font-bold mb-4 text-neutral-900 dark:text-white">
                <span className="text-orange-500 mr-2">Article 1 —</span> Objet
              </h2>
              <p className="leading-relaxed mb-4">
                Les présentes Conditions Générales d&apos;Utilisation (ci-après « CGU ») ont pour objet de définir les
                modalités et conditions d&apos;utilisation du site internet <strong>comptoirbativoir.com</strong> (ci-après
                « le Site ») édité par le COMPTOIR DES BATISSEURS IVOIRIENS (ci-après « CBI » ou « la Société »),
                société de droit ivoirien, immatriculée au Registre du Commerce et du Crédit Mobilier (RCCM)
                d&apos;Abidjan sous le numéro [RCCM à compléter].
              </p>
              <p className="leading-relaxed mb-4">
                Numéro de Compte Contribuable (NCC) : [NCC à compléter]
              </p>
              <p className="leading-relaxed">
                L&apos;accès et l&apos;utilisation du Site impliquent l&apos;acceptation pleine et entière des présentes CGU.
                Si vous n&apos;acceptez pas ces conditions, vous êtes invité(e) à ne pas utiliser le Site.
              </p>
            </AnimatedSection>

            <AnimatedSection id="acces">
              <h2 className="text-xl sm:text-2xl font-bold mb-4 text-neutral-900 dark:text-white">
                <span className="text-orange-500 mr-2">Article 2 —</span> Accès au Site
              </h2>
              <p className="leading-relaxed mb-4">
                Le Site est accessible gratuitement à tout utilisateur disposant d&apos;un accès à Internet. Tous les
                coûts afférents à l&apos;accès au Site, que ce soient les frais matériels, logiciels ou d&apos;accès à Internet,
                sont exclusivement à la charge de l&apos;utilisateur.
              </p>
              <p className="leading-relaxed mb-4">
                CBI met en œuvre les moyens raisonnables à sa disposition pour assurer un accès de qualité au Site,
                mais n&apos;est tenue à aucune obligation d&apos;y parvenir. CBI se réserve le droit de suspendre, limiter
                ou interrompre l&apos;accès au Site, en tout ou en partie, pour des raisons de maintenance, de mise à
                jour ou pour toute autre raison jugée nécessaire, et ce sans préavis.
              </p>
              <p className="leading-relaxed">
                L&apos;utilisateur s&apos;engage à utiliser le Site de manière conforme à sa destination et aux lois et
                réglementations ivoiriennes en vigueur, notamment la Loi n°2013-451 du 19 juin 2013 relative à la
                lutte contre la cybercriminalité.
              </p>
            </AnimatedSection>

            <AnimatedSection id="propriete">
              <h2 className="text-xl sm:text-2xl font-bold mb-4 text-neutral-900 dark:text-white">
                <span className="text-orange-500 mr-2">Article 3 —</span> Propriété Intellectuelle
              </h2>
              <p className="leading-relaxed mb-4">
                L&apos;ensemble des éléments composant le Site (textes, graphismes, logiciels, photographies, images,
                vidéos, sons, plans, noms, logos, marques, créations et œuvres protégeables diverses, bases de données,
                etc.) ainsi que le Site lui-même, sont la propriété exclusive de CBI ou font l&apos;objet d&apos;une
                autorisation d&apos;utilisation.
              </p>
              <p className="leading-relaxed mb-4">
                Ces éléments sont protégés par les lois ivoiriennes et les conventions internationales relatives à
                la propriété intellectuelle, notamment l&apos;Accord de Bangui révisé instituant l&apos;Organisation Africaine
                de la Propriété Intellectuelle (OAPI).
              </p>
              <p className="leading-relaxed">
                Toute reproduction, représentation, modification, publication, transmission, dénaturation, totale ou
                partielle du Site ou de son contenu, par quelque procédé que ce soit, et sur quelque support que ce
                soit, est interdite sans l&apos;autorisation écrite préalable de CBI. Toute exploitation non autorisée
                du Site ou de son contenu sera considérée comme constitutive d&apos;une contrefaçon et poursuivie
                conformément aux dispositions des lois en vigueur.
              </p>
            </AnimatedSection>

            <AnimatedSection id="responsabilite">
              <h2 className="text-xl sm:text-2xl font-bold mb-4 text-neutral-900 dark:text-white">
                <span className="text-orange-500 mr-2">Article 4 —</span> Responsabilité
              </h2>
              <p className="leading-relaxed mb-4">
                Les informations diffusées sur le Site sont présentées à titre purement informatif et ne sauraient
                constituer un engagement contractuel de la part de CBI. CBI s&apos;efforce de fournir sur le Site des
                informations aussi précises que possible, mais ne saurait être tenue responsable des omissions, des
                inexactitudes ou des carences dans la mise à jour de ces informations.
              </p>
              <p className="leading-relaxed mb-4">
                CBI ne pourra être tenue responsable des dommages directs ou indirects résultant de l&apos;utilisation
                du Site, y compris, sans limitation :
              </p>
              <ul className="list-disc pl-6 space-y-2 mb-4">
                <li>Les pertes de données ou de programmes ;</li>
                <li>Les dommages causés par des virus informatiques transmis via le Site ;</li>
                <li>L&apos;interruption ou l&apos;indisponibilité du service ;</li>
                <li>L&apos;utilisation non autorisée du Site par un tiers.</li>
              </ul>
              <p className="leading-relaxed">
                L&apos;utilisateur est seul responsable de l&apos;utilisation qu&apos;il fait des informations et contenus
                disponibles sur le Site. L&apos;utilisation des informations et contenus disponibles sur le Site ne
                saurait en aucun cas engager la responsabilité de CBI.
              </p>
            </AnimatedSection>

            <AnimatedSection id="liens">
              <h2 className="text-xl sm:text-2xl font-bold mb-4 text-neutral-900 dark:text-white">
                <span className="text-orange-500 mr-2">Article 5 —</span> Liens Hypertextes
              </h2>
              <p className="leading-relaxed mb-4">
                Le Site peut contenir des liens hypertextes vers d&apos;autres sites internet. CBI n&apos;exerce aucun
                contrôle sur le contenu de ces sites tiers et décline toute responsabilité quant à leur contenu,
                leurs pratiques en matière de protection des données personnelles ou leur utilisation.
              </p>
              <p className="leading-relaxed mb-4">
                La mise en place de liens hypertextes vers le Site est soumise à l&apos;autorisation préalable et écrite
                de CBI. Toute demande d&apos;autorisation doit être adressée à l&apos;adresse e-mail suivante :{' '}
                <a href="mailto:comptoirbatisseurivoiriens@gmail.com" className="text-orange-600 dark:text-orange-400 hover:text-orange-500">
                  comptoirbatisseurivoiriens@gmail.com
                </a>.
              </p>
              <p className="leading-relaxed">
                CBI se réserve le droit de demander la suppression de tout lien hypertexte qui ne serait pas conforme
                à ses intérêts ou à son image.
              </p>
            </AnimatedSection>

            <AnimatedSection id="droit">
              <h2 className="text-xl sm:text-2xl font-bold mb-4 text-neutral-900 dark:text-white">
                <span className="text-orange-500 mr-2">Article 6 —</span> Droit Applicable
              </h2>
              <p className="leading-relaxed mb-4">
                Les présentes CGU sont régies par le droit ivoirien. Elles sont soumises aux lois et réglementations
                de la République de Côte d&apos;Ivoire, et notamment :
              </p>
              <ul className="list-disc pl-6 space-y-2 mb-4">
                <li>La Loi n°2013-450 du 19 juin 2013 relative à la protection des données à caractère personnel ;</li>
                <li>La Loi n°2013-451 du 19 juin 2013 relative à la lutte contre la cybercriminalité ;</li>
                <li>La Loi n°2013-546 du 30 juillet 2013 relative aux transactions électroniques ;</li>
                <li>Les dispositions de l&apos;Acte Uniforme OHADA relatif au droit commercial général ;</li>
                <li>L&apos;Accord de Bangui révisé portant création de l&apos;OAPI en matière de propriété intellectuelle.</li>
              </ul>
              <p className="leading-relaxed">
                CBI se réserve le droit de modifier les présentes CGU à tout moment. Les CGU applicables sont celles
                en vigueur à la date de la dernière consultation du Site par l&apos;utilisateur.
              </p>
            </AnimatedSection>

            <AnimatedSection id="litiges">
              <h2 className="text-xl sm:text-2xl font-bold mb-4 text-neutral-900 dark:text-white">
                <span className="text-orange-500 mr-2">Article 7 —</span> Litiges
              </h2>
              <p className="leading-relaxed mb-4">
                En cas de litige relatif à l&apos;interprétation ou à l&apos;exécution des présentes CGU, les parties
                s&apos;efforceront de trouver une solution amiable dans un esprit de bonne foi et de loyauté.
              </p>
              <p className="leading-relaxed mb-4">
                À défaut d&apos;accord amiable dans un délai de trente (30) jours à compter de la notification du litige
                par l&apos;une des parties, le différend sera soumis à la compétence exclusive des tribunaux
                d&apos;Abidjan-Plateau, République de Côte d&apos;Ivoire, auxquels les parties attribuent compétence
                expresse, nonobstant pluralité de défendeurs ou appel en garantie.
              </p>
              <p className="leading-relaxed">
                Pour toute question relative aux présentes CGU, vous pouvez nous contacter :
              </p>
              <div className="mt-4 p-6 rounded-xl border bg-neutral-50 dark:bg-neutral-800 border-neutral-200 dark:border-neutral-700">
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
            </AnimatedSection>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
