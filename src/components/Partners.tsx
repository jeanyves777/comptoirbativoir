"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Handshake } from "lucide-react";
import { partners } from "@/lib/data";

export default function Partners() {
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: "-80px" });

  return (
    <section
      ref={sectionRef}
      className="relative py-24 section-light"
    >
      <div className="max-w-5xl mx-auto px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-amber-200 dark:border-amber-500/30 bg-amber-50 dark:bg-amber-500/10 text-amber-600 dark:text-amber-400 text-xs font-semibold uppercase tracking-widest mb-4">
            <Handshake className="w-4 h-4" />
            Nos Partenaires
          </span>

          <h2 className="text-3xl sm:text-4xl font-bold text-neutral-900 dark:text-white mt-2">
            Ils nous font confiance
          </h2>

          <p className="mt-4 text-neutral-500 dark:text-neutral-400 max-w-lg mx-auto">
            Nous accompagnons des entreprises et institutions de premier plan
            dans leurs projets d&apos;installation et de maintenance.
          </p>
        </motion.div>

        {/* Partner Cards */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex justify-center gap-6 flex-wrap"
        >
          {partners.map((partner, i) => (
            <motion.div
              key={partner.name}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.5,
                delay: 0.4 + i * 0.15,
              }}
              className="w-56 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 flex flex-col items-center gap-3 p-6 transition-transform duration-300 hover:scale-105"
            >
              <div className="flex items-center justify-center w-16 h-16 rounded-lg bg-white p-3 overflow-hidden">
                <img
                  src={partner.logo}
                  alt={partner.name}
                  className="w-full h-full object-contain"
                />
              </div>

              <span className="text-sm font-medium text-neutral-700 dark:text-neutral-300 text-center leading-tight">
                {partner.name}
              </span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
