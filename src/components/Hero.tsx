"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Phone, ChevronDown, ChevronLeft, ChevronRight } from "lucide-react";
import { companyInfo } from "@/lib/data";

/* ------------------------------------------------------------------ */
/*  Slideshow images                                                   */
/* ------------------------------------------------------------------ */
const slides = [
  {
    src: "/images/hero/hero-banner.jpg",
    alt: "Installation électrique industrielle",
  },
  {
    src: "/images/services/coffret-new.jpg",
    alt: "Coffret inverseur",
  },
  {
    src: "/images/gallery/work-1.jpeg",
    alt: "Travaux électriques",
  },
  {
    src: "/images/services/electrogene-new.jpg",
    alt: "Groupe électrogène",
  },
  {
    src: "/images/gallery/work-3.jpeg",
    alt: "Équipe CBI en intervention",
  },
  {
    src: "/images/services/climatisation-new.jpg",
    alt: "Climatisation industrielle",
  },
];

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
/*  Floating stat pill                                                 */
/* ------------------------------------------------------------------ */
function FloatingPill({
  value,
  label,
  delay,
  className,
}: {
  value: string;
  label: string;
  delay: number;
  className: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.6, delay }}
      className={`absolute z-20 px-4 py-2.5 rounded-xl bg-white/90 dark:bg-neutral-800/90 backdrop-blur-md shadow-lg border border-neutral-200/50 dark:border-neutral-700/50 ${className}`}
    >
      <motion.div
        animate={{ y: [0, -4, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      >
        <p className="text-lg font-bold text-orange-500">{value}</p>
        <p className="text-[10px] font-medium text-neutral-500 dark:text-neutral-400 uppercase tracking-wider">
          {label}
        </p>
      </motion.div>
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/*  Hero Component                                                    */
/* ------------------------------------------------------------------ */
export default function Hero() {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);

  const next = useCallback(() => {
    setDirection(1);
    setCurrent((prev) => (prev + 1) % slides.length);
  }, []);

  const prev = useCallback(() => {
    setDirection(-1);
    setCurrent((prev) => (prev - 1 + slides.length) % slides.length);
  }, []);

  // Auto-advance every 5s
  useEffect(() => {
    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, [next]);

  const slideVariants = {
    enter: (d: number) => ({
      scale: 1.1,
      opacity: 0,
      x: d > 0 ? 60 : -60,
    }),
    center: {
      scale: 1,
      opacity: 1,
      x: 0,
      transition: { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] as const },
    },
    exit: (d: number) => ({
      scale: 1.05,
      opacity: 0,
      x: d > 0 ? -60 : 60,
      transition: { duration: 0.6 },
    }),
  };

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* ---- Background slideshow ---- */}
      <div className="absolute inset-0">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={current}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            className="absolute inset-0"
          >
            <img
              src={slides[current].src}
              alt={slides[current].alt}
              className="w-full h-full object-cover"
            />
          </motion.div>
        </AnimatePresence>

        {/* Dark overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/50 to-black/30" />
        {/* Bottom gradient fade */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-neutral-50 dark:from-neutral-950 to-transparent" />
      </div>

      {/* ---- Slide navigation arrows ---- */}
      <button
        onClick={prev}
        className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-30 p-2 rounded-full bg-white/10 backdrop-blur-sm text-white/80 hover:bg-white/20 hover:text-white transition-all"
        aria-label="Image précédente"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>
      <button
        onClick={next}
        className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-30 p-2 rounded-full bg-white/10 backdrop-blur-sm text-white/80 hover:bg-white/20 hover:text-white transition-all"
        aria-label="Image suivante"
      >
        <ChevronRight className="w-5 h-5" />
      </button>

      {/* ---- Slide dots ---- */}
      <div className="absolute bottom-20 left-1/2 -translate-x-1/2 z-30 flex gap-2">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => {
              setDirection(i > current ? 1 : -1);
              setCurrent(i);
            }}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              i === current
                ? "w-8 bg-orange-500"
                : "w-3 bg-white/40 hover:bg-white/60"
            }`}
            aria-label={`Image ${i + 1}`}
          />
        ))}
      </div>

      {/* ---- Content ---- */}
      <div className="relative z-20 max-w-7xl mx-auto px-6 lg:px-8 w-full grid lg:grid-cols-2 gap-12 items-center py-32 lg:py-24">
        {/* Left – Text */}
        <div className="flex flex-col gap-6">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex items-center gap-2 w-fit px-4 py-1.5 rounded-full border bg-white/10 backdrop-blur-sm text-white border-white/20 text-sm font-medium tracking-wide"
          >
            <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse" />
            {companyInfo.shortName}
          </motion.div>

          {/* Headline */}
          <AnimatedHeadline
            text={companyInfo.tagline}
            className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight text-white drop-shadow-lg"
          />

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.0 }}
            className="text-neutral-200 text-lg max-w-xl leading-relaxed"
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
              className="group inline-flex items-center gap-2 px-7 py-3.5 rounded-lg bg-orange-500 text-white font-semibold text-sm tracking-wide hover:bg-orange-400 transition-colors shadow-lg shadow-orange-500/25"
            >
              Nos Services
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
            <a
              href="/contact"
              className="group inline-flex items-center gap-2 px-7 py-3.5 rounded-lg border border-white/30 text-white font-semibold text-sm tracking-wide hover:border-orange-400 hover:text-orange-400 transition-colors backdrop-blur-sm"
            >
              <Phone className="w-4 h-4" />
              Contactez-nous
            </a>
          </motion.div>
        </div>

        {/* Right – Floating stats (hidden on mobile) */}
        <div className="hidden lg:block relative h-[400px]">
          <FloatingPill
            value={`${companyInfo.stats.clients}+`}
            label="Clients satisfaits"
            delay={1.5}
            className="top-8 right-12"
          />
          <FloatingPill
            value={`${companyInfo.stats.projects}+`}
            label="Projets réalisés"
            delay={1.8}
            className="top-32 left-4"
          />
          <FloatingPill
            value={`${companyInfo.stats.workers}+`}
            label="Techniciens"
            delay={2.1}
            className="bottom-16 right-8"
          />

          {/* Decorative rings */}
          <motion.div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 rounded-full border-2 border-dashed border-white/20"
            animate={{ rotate: 360 }}
            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          />
          <motion.div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 rounded-full border-2 border-orange-500/40"
            animate={{ rotate: -360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          />
          <motion.div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-28 h-28 rounded-full border border-white/30"
            animate={{ rotate: 360 }}
            transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          />
          {/* Pulsing wave rings */}
          {[0, 1, 2].map((i) => (
            <motion.div
              key={`wave-${i}`}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-orange-400/30"
              initial={{ width: 80, height: 80, opacity: 0.6 }}
              animate={{
                width: [80, 280],
                height: [80, 280],
                opacity: [0.5, 0],
              }}
              transition={{
                duration: 3,
                delay: i * 1,
                repeat: Infinity,
                ease: "easeOut",
              }}
            />
          ))}
          {/* Center glow dot */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-orange-500/60 shadow-[0_0_20px_rgba(249,115,22,0.5)]" />
        </div>
      </div>

      {/* Scroll-down indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-20"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.0, duration: 0.6 }}
      >
        <span className="text-white/60 text-xs uppercase tracking-widest">
          Découvrir
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown className="w-5 h-5 text-orange-500/80" />
        </motion.div>
      </motion.div>
    </section>
  );
}
