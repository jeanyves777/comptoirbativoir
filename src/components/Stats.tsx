"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Users, FolderOpen, HeadphonesIcon, HardHat } from "lucide-react";
import { companyInfo } from "@/lib/data";

/* ------------------------------------------------------------------ */
/*  Animated counter hook                                             */
/* ------------------------------------------------------------------ */
function useCountUp(target: number, inView: boolean, duration = 2000) {
  const [count, setCount] = useState(0);
  const hasRun = useRef(false);

  useEffect(() => {
    if (!inView || hasRun.current) return;
    hasRun.current = true;

    const start = performance.now();

    function tick(now: number) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      // ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(eased * target));
      if (progress < 1) requestAnimationFrame(tick);
    }

    requestAnimationFrame(tick);
  }, [inView, target, duration]);

  return count;
}

/* ------------------------------------------------------------------ */
/*  Stat card                                                         */
/* ------------------------------------------------------------------ */
interface StatCardProps {
  icon: React.ReactNode;
  value: number;
  label: string;
  suffix?: string;
  index: number;
  inView: boolean;
}

function StatCard({ icon, value, label, suffix = "+", index, inView }: StatCardProps) {
  const count = useCountUp(value, inView);

  return (
    <motion.div
      initial={{ opacity: 0, y: 50, scale: 0.9 }}
      animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{
        duration: 0.6,
        delay: index * 0.15,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
      className="group relative"
    >
      {/* Gradient border (pseudo with wrapper) */}
      <div className="absolute -inset-[1px] rounded-2xl bg-gradient-to-br from-amber-500/30 via-amber-500/5 to-amber-500/20 opacity-60 group-hover:opacity-100 transition-opacity duration-500 blur-[0.5px]" />

      {/* Card */}
      <div className="relative rounded-2xl bg-gray-900/70 backdrop-blur-xl p-8 flex flex-col items-center gap-4 border border-white/[0.04] overflow-hidden">
        {/* Hover glow */}
        <div className="absolute inset-0 bg-amber-500/[0.03] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        {/* Icon container */}
        <motion.div
          initial={{ scale: 0, rotate: -30 }}
          animate={inView ? { scale: 1, rotate: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.3 + index * 0.15, type: "spring", stiffness: 200 }}
          className="relative flex items-center justify-center w-14 h-14 rounded-xl bg-amber-500/10 text-amber-500 ring-1 ring-amber-500/20"
        >
          {icon}
          {/* Ping */}
          <span className="absolute inset-0 rounded-xl ring-2 ring-amber-500/30 animate-ping opacity-20" />
        </motion.div>

        {/* Number */}
        <div className="text-4xl sm:text-5xl font-extrabold text-white tabular-nums tracking-tight">
          {count.toLocaleString("fr-FR")}
          <span className="text-amber-500">{suffix}</span>
        </div>

        {/* Label */}
        <span className="text-gray-400 text-sm font-medium uppercase tracking-widest">
          {label}
        </span>

        {/* Decorative corner accent */}
        <svg
          className="absolute top-0 right-0 w-20 h-20 text-amber-500/[0.07]"
          viewBox="0 0 80 80"
          fill="none"
        >
          <path d="M 80 0 L 80 80 L 0 0 Z" fill="currentColor" />
        </svg>
      </div>
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/*  Stats section                                                     */
/* ------------------------------------------------------------------ */
const stats = [
  { icon: <Users className="w-6 h-6" />, value: companyInfo.stats.clients, label: "Clients" },
  { icon: <FolderOpen className="w-6 h-6" />, value: companyInfo.stats.projects, label: "Projets" },
  { icon: <HeadphonesIcon className="w-6 h-6" />, value: companyInfo.stats.support, label: "Support" },
  { icon: <HardHat className="w-6 h-6" />, value: companyInfo.stats.workers, label: "Ouvriers" },
];

export default function Stats() {
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section
      ref={sectionRef}
      className="relative py-24 overflow-hidden bg-gray-950"
    >
      {/* ---- Animated gradient background ---- */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute -top-1/2 -left-1/4 w-[700px] h-[700px] rounded-full bg-amber-500/[0.04] blur-[140px]"
          animate={{ x: [0, 60, 0], y: [0, 40, 0] }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" as const }}
        />
        <motion.div
          className="absolute -bottom-1/2 -right-1/4 w-[600px] h-[600px] rounded-full bg-amber-600/[0.03] blur-[120px]"
          animate={{ x: [0, -50, 0], y: [0, -30, 0] }}
          transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" as const }}
        />
      </div>

      {/* Subtle horizontal line accent */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber-500/20 to-transparent" />

      <div className="relative z-10 max-w-6xl mx-auto px-6 lg:px-8">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 rounded-full border border-amber-500/20 bg-amber-500/5 text-amber-400 text-xs font-semibold uppercase tracking-widest mb-4">
            En chiffres
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-white">
            Notre impact sur le terrain
          </h2>
          <p className="mt-3 text-gray-500 max-w-md mx-auto">
            Des résultats concrets qui témoignent de notre engagement et de notre expertise.
          </p>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
          {stats.map((stat, i) => (
            <StatCard
              key={stat.label}
              icon={stat.icon}
              value={stat.value}
              label={stat.label}
              index={i}
              inView={inView}
            />
          ))}
        </div>
      </div>

      {/* Bottom line accent */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber-500/20 to-transparent" />
    </section>
  );
}
