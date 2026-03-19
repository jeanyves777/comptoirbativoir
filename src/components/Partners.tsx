"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Handshake } from "lucide-react";
import { partners } from "@/lib/data";

/* ------------------------------------------------------------------ */
/*  Single partner card with real logo                                 */
/* ------------------------------------------------------------------ */
function PartnerCard({
  name,
  logo,
  index,
}: {
  name: string;
  logo: string;
  index: number;
}) {
  return (
    <motion.div
      className="group relative flex-shrink-0"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.5,
        delay: index * 0.15,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
    >
      {/* Gradient border on hover */}
      <div className="absolute -inset-[1px] rounded-2xl bg-gradient-to-br from-amber-500/25 via-amber-500/5 to-amber-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-[0.5px]" />

      {/* Card body */}
      <div className="relative w-56 h-32 rounded-2xl bg-gray-900/60 backdrop-blur-xl border border-white/[0.06] flex flex-col items-center justify-center gap-3 overflow-hidden transition-transform duration-500 group-hover:scale-105">
        {/* Hover glow */}
        <div className="absolute inset-0 bg-amber-500/[0.04] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        {/* Logo image */}
        <div className="relative flex items-center justify-center w-14 h-14 rounded-lg bg-white/90 p-1.5 overflow-hidden">
          <img
            src={logo}
            alt={name}
            className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-110"
          />
        </div>

        {/* Partner name */}
        <span className="text-gray-300 text-sm font-medium text-center px-4 leading-tight group-hover:text-amber-400 transition-colors duration-300">
          {name}
        </span>

        {/* Corner accent */}
        <svg
          className="absolute top-0 right-0 w-16 h-16 text-amber-500/[0.05]"
          viewBox="0 0 64 64"
          fill="none"
        >
          <path d="M 64 0 L 64 64 L 0 0 Z" fill="currentColor" />
        </svg>
      </div>
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/*  Infinite marquee row                                               */
/* ------------------------------------------------------------------ */
function MarqueeRow({ direction = 1 }: { direction?: 1 | -1 }) {
  const repeated = [...partners, ...partners, ...partners, ...partners];

  return (
    <div className="relative overflow-hidden">
      {/* Fade edges */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-24 z-10 bg-gradient-to-r from-gray-950 to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-24 z-10 bg-gradient-to-l from-gray-950 to-transparent" />

      <motion.div
        className="flex gap-6 w-max"
        animate={{ x: direction === 1 ? ["0%", "-50%"] : ["-50%", "0%"] }}
        transition={{
          x: {
            duration: 30,
            repeat: Infinity,
            ease: "linear" as const,
          },
        }}
      >
        {repeated.map((partner, i) => (
          <PartnerCard
            key={`${partner.name}-${i}`}
            name={partner.name}
            logo={partner.logo}
            index={0}
          />
        ))}
      </motion.div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Partners Section                                                   */
/* ------------------------------------------------------------------ */
export default function Partners() {
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: "-80px" });

  return (
    <section
      ref={sectionRef}
      className="relative py-24 overflow-hidden bg-gray-950"
    >
      {/* ---- Background effects ---- */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-amber-500/[0.03] blur-[140px]"
          animate={{ scale: [1, 1.15, 1] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" as const }}
        />
      </div>

      {/* Top line accent */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber-500/20 to-transparent" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
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
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-amber-500/20 bg-amber-500/5 text-amber-400 text-xs font-semibold uppercase tracking-widest mb-4"
          >
            <Handshake className="w-4 h-4" />
            Nos Partenaires
          </motion.span>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mt-2">
            Ils nous font{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-600">
              confiance
            </span>
          </h2>
          <p className="mt-4 text-gray-500 max-w-lg mx-auto">
            Nous accompagnons des entreprises et institutions de premier plan
            dans leurs projets d&apos;installation et de maintenance.
          </p>
        </motion.div>

        {/* ---- Static partner cards (for smaller lists / accessible view) ---- */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="hidden sm:flex justify-center gap-6 flex-wrap mb-12"
        >
          {partners.map((partner, i) => (
            <motion.div
              key={partner.name}
              initial={{ opacity: 0, y: 40, scale: 0.9 }}
              animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{
                duration: 0.5,
                delay: 0.4 + i * 0.15,
                ease: [0.25, 0.46, 0.45, 0.94],
              }}
              className="group relative"
            >
              {/* Gradient border */}
              <div className="absolute -inset-[1px] rounded-2xl bg-gradient-to-br from-amber-500/25 via-amber-500/5 to-amber-500/20 opacity-50 group-hover:opacity-100 transition-opacity duration-500 blur-[0.5px]" />

              {/* Card */}
              <div className="relative w-64 h-40 rounded-2xl bg-gray-900/60 backdrop-blur-xl border border-white/[0.06] flex flex-col items-center justify-center gap-3 overflow-hidden transition-transform duration-500 group-hover:scale-105 group-hover:-translate-y-1">
                <div className="absolute inset-0 bg-amber-500/[0.03] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                {/* Logo with white background container */}
                <div className="relative flex items-center justify-center w-16 h-16 rounded-xl bg-white p-2 shadow-md overflow-hidden">
                  <img
                    src={partner.logo}
                    alt={partner.name}
                    className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-115"
                  />
                </div>

                <span className="text-gray-300 text-sm font-semibold text-center px-4 leading-tight group-hover:text-amber-400 transition-colors duration-300">
                  {partner.name}
                </span>

                {/* Corner accent */}
                <svg
                  className="absolute top-0 right-0 w-20 h-20 text-amber-500/[0.05]"
                  viewBox="0 0 80 80"
                  fill="none"
                >
                  <path d="M 80 0 L 80 80 L 0 0 Z" fill="currentColor" />
                </svg>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* ---- Marquee (infinite scroll) ---- */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="sm:hidden"
        >
          <MarqueeRow direction={1} />
        </motion.div>

        {/* Desktop marquee below the static cards for visual flair */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="hidden sm:block mt-4"
        >
          <MarqueeRow direction={-1} />
        </motion.div>
      </div>

      {/* Bottom line accent */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber-500/20 to-transparent" />
    </section>
  );
}
