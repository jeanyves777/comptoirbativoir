"use client";

import { motion } from "framer-motion";
import { ArrowRight, Phone, ChevronDown } from "lucide-react";
import { companyInfo } from "@/lib/data";

/* ------------------------------------------------------------------ */
/*  Word-by-word text reveal                                          */
/* ------------------------------------------------------------------ */
function AnimatedHeadline({ text, className }: { text: string; className?: string }) {
  const words = text.split(" ");
  return (
    <motion.h1 className={className}>
      {words.map((word, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 + i * 0.1, ease: "easeOut" }}
          className="inline-block mr-[0.35em]"
        >
          {word}
        </motion.span>
      ))}
    </motion.h1>
  );
}

/* ------------------------------------------------------------------ */
/*  Simple SVG – Circuit lines + gear outline                         */
/* ------------------------------------------------------------------ */
function ElectricalSVG() {
  const draw = (delay: number, dur = 1.8) => ({
    initial: { pathLength: 0, opacity: 0 },
    animate: { pathLength: 1, opacity: 1 },
    transition: { duration: dur, delay, ease: "easeInOut" as const },
  });

  const junctions: [number, number][] = [
    [120, 250], [200, 220], [300, 250], [380, 180],
    [150, 350], [260, 330], [370, 350],
  ];

  return (
    <motion.svg
      viewBox="0 0 500 500"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-full max-w-[500px]"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, delay: 0.4 }}
    >
      {/* Circuit line 1 */}
      <motion.path
        d="M 50 250 H 120 L 150 220 H 200 L 230 250 H 300"
        stroke="#f59e0b" strokeWidth="2" strokeLinecap="round" fill="none"
        className="opacity-60 dark:opacity-80"
        {...draw(0.2)}
      />
      {/* Circuit line 2 */}
      <motion.path
        d="M 300 250 H 340 V 180 H 380 V 250 H 450"
        stroke="#f59e0b" strokeWidth="2" strokeLinecap="round" fill="none"
        className="opacity-60 dark:opacity-80"
        {...draw(0.5)}
      />
      {/* Circuit line 3 */}
      <motion.path
        d="M 80 350 H 150 V 310 H 260 L 280 350 H 370"
        stroke="#f59e0b" strokeWidth="2" strokeLinecap="round" fill="none"
        className="opacity-60 dark:opacity-80"
        {...draw(0.8)}
      />

      {/* Junction dots */}
      {junctions.map(([cx, cy], i) => (
        <motion.circle
          key={`dot-${i}`}
          cx={cx} cy={cy} r="5"
          className="fill-amber-500"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.8 }}
          transition={{ duration: 0.4, delay: 1.0 + i * 0.1 }}
        />
      ))}

      {/* Gear outline – outer circle */}
      <motion.circle
        cx="250" cy="250" r="60"
        stroke="#f59e0b" strokeWidth="2" fill="none"
        className="opacity-50 dark:opacity-70"
        {...draw(0.3, 2)}
      />
      {/* Gear outline – inner circle */}
      <motion.circle
        cx="250" cy="250" r="38"
        stroke="#f59e0b" strokeWidth="1.5" fill="none"
        strokeDasharray="6 4"
        className="opacity-40 dark:opacity-60"
        {...draw(0.6, 1.8)}
      />
      {/* Gear teeth (8 teeth) */}
      {Array.from({ length: 8 }).map((_, i) => {
        const angle = (i * 45 * Math.PI) / 180;
        const x1 = 250 + 57 * Math.cos(angle);
        const y1 = 250 + 57 * Math.sin(angle);
        const x2 = 250 + 72 * Math.cos(angle);
        const y2 = 250 + 72 * Math.sin(angle);
        return (
          <motion.line
            key={`tooth-${i}`}
            x1={x1} y1={y1} x2={x2} y2={y2}
            stroke="#f59e0b" strokeWidth="5" strokeLinecap="round"
            className="opacity-50 dark:opacity-70"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.7 }}
            transition={{ duration: 0.3, delay: 1.4 + i * 0.06 }}
          />
        );
      })}

      {/* Slow rotating dashed ring */}
      <motion.circle
        cx="250" cy="250" r="85"
        stroke="#f59e0b" strokeWidth="1" fill="none"
        strokeDasharray="8 6"
        className="opacity-20 dark:opacity-30"
        animate={{ rotate: 360 }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        style={{ transformOrigin: "250px 250px" }}
      />
    </motion.svg>
  );
}

/* ------------------------------------------------------------------ */
/*  Hero Component                                                    */
/* ------------------------------------------------------------------ */
export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-neutral-50 dark:bg-neutral-950">
      {/* Subtle grid overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03] dark:opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(#f59e0b 1px, transparent 1px), linear-gradient(90deg, #f59e0b 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      {/* Radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-amber-500/[0.03] dark:bg-amber-500/[0.04] blur-[100px] pointer-events-none" />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 w-full grid lg:grid-cols-2 gap-12 items-center py-24">
        {/* Left – Text */}
        <div className="flex flex-col gap-6">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex items-center gap-2 w-fit px-4 py-1.5 rounded-full border bg-amber-50 text-amber-600 border-amber-200 dark:bg-amber-500/10 dark:text-amber-400 dark:border-amber-500/30 text-sm font-medium tracking-wide"
          >
            <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
            {companyInfo.shortName}
          </motion.div>

          {/* Headline */}
          <AnimatedHeadline
            text={companyInfo.tagline}
            className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight text-neutral-900 dark:text-white"
          />

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.0 }}
            className="text-neutral-600 dark:text-neutral-400 text-lg max-w-xl leading-relaxed"
          >
            {companyInfo.description}
          </motion.p>

          {/* CTA buttons */}
          <motion.div
            className="flex flex-wrap gap-4 mt-2"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.3 }}
          >
            <a
              href="/services"
              className="group inline-flex items-center gap-2 px-7 py-3.5 rounded-lg bg-amber-500 text-white dark:text-neutral-950 font-semibold text-sm tracking-wide hover:bg-amber-400 transition-colors shadow-lg shadow-amber-500/20 dark:shadow-amber-500/10"
            >
              Nos Services
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
            <a
              href="/contact"
              className="group inline-flex items-center gap-2 px-7 py-3.5 rounded-lg border border-neutral-300 text-neutral-700 dark:border-neutral-700 dark:text-neutral-300 font-semibold text-sm tracking-wide hover:border-amber-500/60 hover:text-amber-600 dark:hover:border-amber-500/60 dark:hover:text-amber-400 transition-colors"
            >
              <Phone className="w-4 h-4" />
              Contactez-nous
            </a>
          </motion.div>
        </div>

        {/* Right – SVG Illustration (hidden on mobile) */}
        <motion.div
          className="hidden lg:flex justify-center items-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <ElectricalSVG />
        </motion.div>
      </div>

      {/* Scroll-down indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.0, duration: 0.6 }}
      >
        <span className="text-neutral-400 dark:text-neutral-500 text-xs uppercase tracking-widest">
          Découvrir
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown className="w-5 h-5 text-amber-500/70" />
        </motion.div>
      </motion.div>
    </section>
  );
}
