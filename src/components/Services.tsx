"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  Zap,
  Snowflake,
  BatteryCharging,
  Wrench,
  Monitor,
  Building2,
  ArrowRight,
} from "lucide-react";
import { services } from "@/lib/data";
import type { LucideIcon } from "lucide-react";

/* ------------------------------------------------------------------ */
/*  Icon map                                                           */
/* ------------------------------------------------------------------ */
const iconMap: Record<string, LucideIcon> = {
  Zap,
  Snowflake,
  BatteryCharging,
  Wrench,
  Monitor,
  Building2,
};

/* ------------------------------------------------------------------ */
/*  Animated SVG – Toolbox / Electrical Panel                          */
/* ------------------------------------------------------------------ */
function ElectricalPanelSVG() {
  const draw = (delay: number, dur = 2) => ({
    initial: { pathLength: 0, opacity: 0 },
    animate: { pathLength: 1, opacity: 1 },
    transition: { duration: dur, delay, ease: "easeInOut" as const },
  });

  return (
    <motion.svg
      viewBox="0 0 400 400"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-full max-w-[360px] mx-auto"
      initial={{ opacity: 0, scale: 0.85 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1, delay: 0.3 }}
    >
      <defs>
        <filter id="svcGlow">
          <feGaussianBlur stdDeviation="4" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <filter id="svcGlowStrong">
          <feGaussianBlur stdDeviation="8" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <linearGradient id="svcAmberGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#f59e0b" />
          <stop offset="100%" stopColor="#d97706" />
        </linearGradient>
      </defs>

      {/* Panel body */}
      <motion.rect
        x="80" y="40" width="240" height="320" rx="12"
        stroke="#f59e0b" strokeWidth="2" fill="#f59e0b" fillOpacity="0.03"
        filter="url(#svcGlow)"
        {...draw(0.2, 2)}
      />
      {/* Panel inner border */}
      <motion.rect
        x="100" y="60" width="200" height="280" rx="6"
        stroke="#f59e0b" strokeWidth="1" fill="none" strokeDasharray="4 3"
        {...draw(0.5, 1.8)}
      />

      {/* Breaker rows */}
      {[0, 1, 2].map((row) => {
        const y = 90 + row * 85;
        return (
          <motion.g key={`breaker-${row}`}>
            {/* Left breaker */}
            <motion.rect
              x="115" y={y} width="70" height="55" rx="4"
              stroke="#f59e0b" strokeWidth="1.5" fill="#f59e0b" fillOpacity="0.05"
              {...draw(0.6 + row * 0.2)}
            />
            {/* Right breaker */}
            <motion.rect
              x="215" y={y} width="70" height="55" rx="4"
              stroke="#f59e0b" strokeWidth="1.5" fill="#f59e0b" fillOpacity="0.05"
              {...draw(0.7 + row * 0.2)}
            />
            {/* Toggle switches */}
            <motion.line
              x1="150" y1={y + 15} x2="150" y2={y + 40}
              stroke="#f59e0b" strokeWidth="3" strokeLinecap="round"
              filter="url(#svcGlow)"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2 + row * 0.15, duration: 0.4 }}
            />
            <motion.line
              x1="250" y1={y + 15} x2="250" y2={y + 40}
              stroke="#f59e0b" strokeWidth="3" strokeLinecap="round"
              filter="url(#svcGlow)"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.3 + row * 0.15, duration: 0.4 }}
            />
            {/* Status LEDs */}
            <motion.circle
              cx="135" cy={y + 12} r="3" fill="#f59e0b" filter="url(#svcGlow)"
              animate={{ opacity: [0.4, 1, 0.4] }}
              transition={{ duration: 1.5 + row * 0.3, repeat: Infinity, ease: "easeInOut" as const, delay: row * 0.5 }}
            />
            <motion.circle
              cx="235" cy={y + 12} r="3" fill="#f59e0b" filter="url(#svcGlow)"
              animate={{ opacity: [1, 0.4, 1] }}
              transition={{ duration: 1.8 + row * 0.3, repeat: Infinity, ease: "easeInOut" as const, delay: row * 0.3 }}
            />
          </motion.g>
        );
      })}

      {/* Wires connecting from panel outward */}
      {/* Left wires */}
      <motion.path
        d="M 80 120 C 50 120, 40 90, 20 90"
        stroke="#f59e0b" strokeWidth="1.5" strokeLinecap="round" fill="none"
        filter="url(#svcGlow)"
        {...draw(1.5, 1.2)}
      />
      <motion.path
        d="M 80 200 C 45 200, 35 230, 10 230"
        stroke="#f59e0b" strokeWidth="1.5" strokeLinecap="round" fill="none"
        filter="url(#svcGlow)"
        {...draw(1.7, 1.2)}
      />
      <motion.path
        d="M 80 300 C 50 300, 40 340, 15 345"
        stroke="#f59e0b" strokeWidth="1.5" strokeLinecap="round" fill="none"
        filter="url(#svcGlow)"
        {...draw(1.9, 1.2)}
      />
      {/* Right wires */}
      <motion.path
        d="M 320 120 C 350 120, 360 80, 385 80"
        stroke="#f59e0b" strokeWidth="1.5" strokeLinecap="round" fill="none"
        filter="url(#svcGlow)"
        {...draw(1.6, 1.2)}
      />
      <motion.path
        d="M 320 200 C 350 200, 365 170, 390 170"
        stroke="#f59e0b" strokeWidth="1.5" strokeLinecap="round" fill="none"
        filter="url(#svcGlow)"
        {...draw(1.8, 1.2)}
      />
      <motion.path
        d="M 320 300 C 355 300, 365 330, 390 335"
        stroke="#f59e0b" strokeWidth="1.5" strokeLinecap="round" fill="none"
        filter="url(#svcGlow)"
        {...draw(2.0, 1.2)}
      />

      {/* Spark endpoints on wires */}
      {[
        { cx: 20, cy: 90 },
        { cx: 10, cy: 230 },
        { cx: 15, cy: 345 },
        { cx: 385, cy: 80 },
        { cx: 390, cy: 170 },
        { cx: 390, cy: 335 },
      ].map((pos, i) => (
        <motion.circle
          key={`spark-${i}`}
          cx={pos.cx} cy={pos.cy} r="3"
          fill="#f59e0b" filter="url(#svcGlowStrong)"
          animate={{ r: [2, 5, 2], opacity: [0.6, 1, 0.6] }}
          transition={{ duration: 1.5 + i * 0.2, repeat: Infinity, ease: "easeInOut" as const, delay: 2 + i * 0.3 }}
        />
      ))}

      {/* Spark / arc effects at top */}
      <motion.path
        d="M 190 30 L 195 15 L 200 25 L 205 10"
        stroke="#f59e0b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
        fill="none" filter="url(#svcGlowStrong)"
        animate={{ opacity: [0, 1, 0] }}
        transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" as const, delay: 2.5 }}
      />
      <motion.path
        d="M 210 30 L 215 18 L 220 28 L 225 12"
        stroke="#f59e0b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
        fill="none" filter="url(#svcGlowStrong)"
        animate={{ opacity: [0, 1, 0] }}
        transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" as const, delay: 3.0 }}
      />

      {/* Energy pulse ring around panel */}
      <motion.rect
        x="65" y="25" width="270" height="350" rx="18"
        stroke="#f59e0b" strokeWidth="1" fill="none"
        strokeDasharray="8 6"
        animate={{ opacity: [0.1, 0.4, 0.1] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" as const }}
      />
    </motion.svg>
  );
}

/* ------------------------------------------------------------------ */
/*  Service Card                                                       */
/* ------------------------------------------------------------------ */
interface ServiceCardProps {
  service: (typeof services)[number];
  index: number;
  inView: boolean;
}

function ServiceCard({ service, index, inView }: ServiceCardProps) {
  const Icon = iconMap[service.icon] || Zap;

  return (
    <motion.div
      initial={{ opacity: 0, y: 60, scale: 0.92 }}
      animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{
        duration: 0.6,
        delay: index * 0.12,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
      className="group relative"
    >
      {/* Gradient border glow */}
      <div className="absolute -inset-[1px] rounded-2xl bg-gradient-to-br from-amber-500/20 via-transparent to-amber-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-[0.5px]" />

      {/* Card */}
      <div className="relative h-full rounded-2xl bg-gray-900/60 backdrop-blur-xl border border-white/[0.06] p-7 flex flex-col gap-5 overflow-hidden transition-transform duration-500 group-hover:-translate-y-2">
        {/* Hover glow overlay */}
        <div className="absolute inset-0 bg-amber-500/[0.03] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        {/* Icon container */}
        <div className="relative flex items-center justify-center w-14 h-14 rounded-xl bg-amber-500/10 text-amber-500 ring-1 ring-amber-500/20">
          <Icon className="w-6 h-6 relative z-10" />
          {/* Amber glow behind icon */}
          <div className="absolute inset-0 rounded-xl bg-amber-500/20 blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        </div>

        {/* Title */}
        <h3 className="text-lg font-bold text-white group-hover:text-amber-400 transition-colors duration-300">
          {service.title}
        </h3>

        {/* Description */}
        <p className="text-gray-400 text-sm leading-relaxed flex-1">
          {service.shortDescription}
        </p>

        {/* Link */}
        <a
          href={`/services#${service.id}`}
          className="inline-flex items-center gap-2 text-amber-400 text-sm font-medium mt-auto group/link"
        >
          En savoir plus
          <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover/link:translate-x-1.5" />
        </a>

        {/* Decorative corner accent */}
        <svg
          className="absolute top-0 right-0 w-24 h-24 text-amber-500/[0.05]"
          viewBox="0 0 96 96"
          fill="none"
        >
          <path d="M 96 0 L 96 96 L 0 0 Z" fill="currentColor" />
        </svg>
      </div>
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/*  Services Section                                                   */
/* ------------------------------------------------------------------ */
export default function Services() {
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: "-80px" });

  return (
    <section
      ref={sectionRef}
      className="relative py-24 overflow-hidden bg-gray-950"
    >
      {/* ---- Animated gradient blobs ---- */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute -top-1/3 -right-1/4 w-[700px] h-[700px] rounded-full bg-amber-500/[0.03] blur-[140px]"
          animate={{ x: [0, -50, 0], y: [0, 60, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" as const }}
        />
        <motion.div
          className="absolute -bottom-1/3 -left-1/4 w-[600px] h-[600px] rounded-full bg-amber-600/[0.03] blur-[120px]"
          animate={{ x: [0, 40, 0], y: [0, -40, 0] }}
          transition={{ duration: 24, repeat: Infinity, ease: "easeInOut" as const }}
        />
      </div>

      {/* ---- CSS circuit board background pattern ---- */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: `
            repeating-linear-gradient(
              45deg,
              #f59e0b 0px,
              #f59e0b 1px,
              transparent 1px,
              transparent 40px
            ),
            repeating-linear-gradient(
              -45deg,
              #f59e0b 0px,
              #f59e0b 1px,
              transparent 1px,
              transparent 40px
            )
          `,
        }}
      />

      {/* Top / Bottom line accents */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber-500/20 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber-500/20 to-transparent" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        {/* ---- Header ---- */}
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
            <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
            Nos Services
          </motion.span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mt-2">
            Des solutions{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-600">
              sur mesure
            </span>
          </h2>
          <p className="mt-4 text-gray-500 max-w-2xl mx-auto text-lg">
            De l&apos;installation au dépannage, nous couvrons l&apos;ensemble
            de vos besoins en électricité industrielle, climatisation et énergie
            de secours.
          </p>
        </motion.div>

        {/* ---- Cards Grid + SVG illustration ---- */}
        <div className="grid lg:grid-cols-[1fr_320px] gap-12 items-start">
          {/* Cards */}
          <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-6">
            {services.map((service, i) => (
              <ServiceCard
                key={service.id}
                service={service}
                index={i}
                inView={inView}
              />
            ))}
          </div>

          {/* Side SVG illustration – visible on lg+ */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="hidden lg:flex sticky top-32 justify-center"
          >
            <ElectricalPanelSVG />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
