"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

/* ------------------------------------------------------------------ */
/*  Google "G" Logo SVG                                                */
/* ------------------------------------------------------------------ */
function GoogleLogo({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.27-4.74 3.27-8.1z"
        fill="#4285F4"
      />
      <path
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
        fill="#34A853"
      />
      <path
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
        fill="#FBBC05"
      />
      <path
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
        fill="#EA4335"
      />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/*  Star SVG                                                           */
/* ------------------------------------------------------------------ */
function Star({ filled = true }: { filled?: boolean }) {
  return (
    <svg
      className={`w-4 h-4 ${
        filled
          ? "text-amber-400"
          : "text-neutral-300 dark:text-neutral-600"
      }`}
      viewBox="0 0 20 20"
      fill="currentColor"
    >
      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
    </svg>
  );
}

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((i) => (
        <Star key={i} filled={i <= rating} />
      ))}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Review data                                                        */
/* ------------------------------------------------------------------ */
const reviews = [
  {
    name: "Kouadio Amani",
    rating: 5,
    date: "Il y a 2 semaines",
    text: "Excellent travail sur la maintenance de notre groupe electrogene. L'equipe de CBI est intervenue rapidement et le travail a ete fait dans les regles de l'art. Je recommande vivement leurs services.",
  },
  {
    name: "Fatou Diabate",
    rating: 5,
    date: "Il y a 1 mois",
    text: "Installation de la climatisation dans nos bureaux realisee par CBI. Travail propre, equipe professionnelle et respectueuse des delais. Le systeme fonctionne parfaitement depuis.",
  },
  {
    name: "Yao N'Guessan",
    rating: 5,
    date: "Il y a 1 mois",
    text: "CBI a realise l'installation complete de notre tableau electrique industriel. Un travail remarquable, conforme aux normes et livre dans les temps. Partenaire fiable pour nos projets.",
  },
  {
    name: "Adjoua Koffi",
    rating: 4,
    date: "Il y a 2 mois",
    text: "Tres bonne prestation pour la mise en service de notre coffret inverseur. L'equipe technique est competente et a su repondre a toutes nos questions. Service client au top.",
  },
  {
    name: "Ibrahim Coulibaly",
    rating: 5,
    date: "Il y a 3 mois",
    text: "Nous faisons appel a CBI pour la maintenance preventive de nos equipements electriques depuis 2 ans. Toujours ponctuels, serieux et les rapports d'intervention sont detailles.",
  },
  {
    name: "Marie-Claire Ble",
    rating: 5,
    date: "Il y a 3 mois",
    text: "Depannage urgent de notre groupe electrogene un samedi. CBI a repondu rapidement et a resolu le probleme en quelques heures. Tres reconnaissante pour leur reactivite.",
  },
];

const overallRating = (
  reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
).toFixed(1);

/* ------------------------------------------------------------------ */
/*  Review Card                                                        */
/* ------------------------------------------------------------------ */
function ReviewCard({
  review,
  index,
  inView,
}: {
  review: (typeof reviews)[0];
  index: number;
  inView: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.5,
        delay: 0.2 + index * 0.1,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
      className="h-full p-6 rounded-xl bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 shadow-sm"
    >
      {/* Header: avatar + name + Google icon */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-3">
          {/* Avatar */}
          <div className="w-10 h-10 rounded-full bg-amber-50 dark:bg-amber-500/10 border border-amber-200 dark:border-amber-500/20 flex items-center justify-center text-amber-600 dark:text-amber-400 font-bold text-sm">
            {review.name.charAt(0)}
          </div>
          <div>
            <h4 className="text-neutral-900 dark:text-white font-semibold text-sm">
              {review.name}
            </h4>
            <p className="text-neutral-400 dark:text-neutral-500 text-xs">
              {review.date}
            </p>
          </div>
        </div>
        <GoogleLogo className="w-5 h-5 opacity-60" />
      </div>

      {/* Stars */}
      <div className="mb-3">
        <StarRating rating={review.rating} />
      </div>

      {/* Review text */}
      <p className="text-neutral-600 dark:text-neutral-400 text-sm leading-relaxed">
        {review.text}
      </p>
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/*  Google Reviews Section                                             */
/* ------------------------------------------------------------------ */
export default function GoogleReviews() {
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: "-80px" });

  return (
    <section
      ref={sectionRef}
      className="py-24 bg-neutral-50 dark:bg-neutral-900"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* ---- Section Header ---- */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <motion.span
            initial={{ opacity: 0, scale: 0.8 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-amber-200 dark:border-amber-500/30 bg-amber-50 dark:bg-amber-500/10 text-amber-600 dark:text-amber-400 text-xs font-semibold uppercase tracking-widest mb-4"
          >
            <GoogleLogo className="w-4 h-4" />
            Avis Clients
          </motion.span>
          <h2 className="text-3xl sm:text-4xl font-bold text-neutral-900 dark:text-white mt-2">
            Avis de nos clients
          </h2>
          <p className="mt-4 text-neutral-600 dark:text-neutral-400 max-w-lg mx-auto">
            Decouvrez ce que nos clients pensent de nos services et de notre
            accompagnement.
          </p>
        </motion.div>

        {/* ---- Rating Summary Card ---- */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="flex justify-center mb-12"
        >
          <div className="inline-flex items-center gap-6 px-8 py-5 rounded-xl bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 shadow-sm">
            {/* Google G */}
            <GoogleLogo className="w-10 h-10" />

            {/* Divider */}
            <div className="w-px h-12 bg-neutral-200 dark:bg-neutral-700" />

            {/* Rating */}
            <div className="text-center">
              <div className="flex items-baseline gap-2">
                <span className="text-4xl font-bold text-neutral-900 dark:text-white">
                  {overallRating}
                </span>
                <span className="text-neutral-400 dark:text-neutral-500 text-sm">
                  /5
                </span>
              </div>
              <div className="flex justify-center mt-1">
                <StarRating rating={Math.round(Number(overallRating))} />
              </div>
            </div>

            {/* Divider */}
            <div className="w-px h-12 bg-neutral-200 dark:bg-neutral-700" />

            {/* Info */}
            <div className="text-center">
              <p className="text-neutral-900 dark:text-white font-semibold text-lg">
                Avis Google
              </p>
              <p className="text-neutral-400 dark:text-neutral-500 text-sm">
                {reviews.length} avis verifies
              </p>
            </div>
          </div>
        </motion.div>

        {/* ---- Review Cards Grid ---- */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reviews.map((review, i) => (
            <ReviewCard
              key={review.name}
              review={review}
              index={i}
              inView={inView}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
