"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Phone, ChevronDown } from "lucide-react";
import { companyInfo } from "@/lib/data";
import { useRef } from "react";

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
          initial={{ opacity: 0, y: 40, filter: "blur(8px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.6, delay: 0.3 + i * 0.12, ease: "easeOut" as const }}
          className="inline-block mr-[0.35em]"
        >
          {word}
        </motion.span>
      ))}
    </motion.h1>
  );
}

/* ------------------------------------------------------------------ */
/*  Floating background particles                                     */
/* ------------------------------------------------------------------ */
function Particles() {
  const dots = Array.from({ length: 30 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: 2 + Math.random() * 3,
    duration: 12 + Math.random() * 20,
    delay: Math.random() * 8,
  }));

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {dots.map((d) => (
        <motion.div
          key={d.id}
          className="absolute rounded-full bg-amber-500/20"
          style={{
            width: d.size,
            height: d.size,
            left: `${d.x}%`,
            top: `${d.y}%`,
          }}
          animate={{
            y: [0, -40, 0],
            opacity: [0.2, 0.7, 0.2],
            scale: [1, 1.5, 1],
          }}
          transition={{
            duration: d.duration,
            delay: d.delay,
            repeat: Infinity,
            ease: "easeInOut" as const,
          }}
        />
      ))}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Animated SVG – Industrial / Electrical illustration               */
/* ------------------------------------------------------------------ */
function ElectricalSVG() {
  /* Common stroke-draw animation (dasharray technique) */
  const draw = (delay: number, dur = 2) => ({
    initial: { pathLength: 0, opacity: 0 },
    animate: { pathLength: 1, opacity: 1 },
    transition: { duration: dur, delay, ease: "easeInOut" as const },
  });

  return (
    <motion.svg
      viewBox="0 0 500 500"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-full max-w-[540px]"
      initial={{ opacity: 0, scale: 0.85 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1, delay: 0.5 }}
    >
      {/* Outer glow filter */}
      <defs>
        <filter id="glow">
          <feGaussianBlur stdDeviation="4" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <filter id="glowStrong">
          <feGaussianBlur stdDeviation="8" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <linearGradient id="amberGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#f59e0b" />
          <stop offset="100%" stopColor="#d97706" />
        </linearGradient>
        <linearGradient id="circuitGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.3" />
          <stop offset="50%" stopColor="#f59e0b" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#f59e0b" stopOpacity="0.3" />
        </linearGradient>
      </defs>

      {/* ---- Circuit board lines ---- */}
      <motion.path
        d="M 50 250 H 130 L 150 220 H 200 L 215 250 H 280"
        stroke="url(#circuitGrad)" strokeWidth="2" strokeLinecap="round"
        filter="url(#glow)"
        {...draw(0.2)}
      />
      <motion.path
        d="M 280 250 H 320 V 180 H 380 V 250 H 450"
        stroke="url(#circuitGrad)" strokeWidth="2" strokeLinecap="round"
        filter="url(#glow)"
        {...draw(0.6)}
      />
      <motion.path
        d="M 100 350 H 170 V 300 H 240 L 260 330 H 350"
        stroke="url(#circuitGrad)" strokeWidth="2" strokeLinecap="round"
        filter="url(#glow)"
        {...draw(0.9)}
      />
      <motion.path
        d="M 80 150 H 160 V 120 H 250 V 160 H 310"
        stroke="url(#circuitGrad)" strokeWidth="2" strokeLinecap="round"
        filter="url(#glow)"
        {...draw(1.1)}
      />
      <motion.path
        d="M 200 400 H 280 V 370 H 350 V 410 H 430"
        stroke="url(#circuitGrad)" strokeWidth="2" strokeLinecap="round"
        filter="url(#glow)"
        {...draw(1.3)}
      />

      {/* Junction dots on circuit lines */}
      {[
        [130, 250], [200, 250], [280, 250], [320, 180], [380, 250],
        [170, 300], [240, 330], [350, 330], [160, 120], [250, 160],
        [280, 370], [350, 410],
      ].map(([cx, cy], i) => (
        <motion.circle
          key={`dot-${i}`}
          cx={cx} cy={cy} r="4"
          fill="#f59e0b"
          filter="url(#glow)"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: [0, 1.4, 1], opacity: 1 }}
          transition={{ duration: 0.5, delay: 1.2 + i * 0.08 }}
        />
      ))}

      {/* ---- Central gear (large) ---- */}
      <motion.g filter="url(#glow)" {...draw(0.4, 2.5)}>
        <motion.circle
          cx="250" cy="250" r="55"
          stroke="#f59e0b" strokeWidth="2.5" fill="none"
          {...draw(0.4, 2.5)}
        />
        <motion.circle
          cx="250" cy="250" r="35"
          stroke="#f59e0b" strokeWidth="1.5" fill="none" strokeDasharray="6 4"
          {...draw(0.7, 2)}
        />
        {/* Gear teeth */}
        {Array.from({ length: 12 }).map((_, i) => {
          const angle = (i * 30 * Math.PI) / 180;
          const x1 = 250 + 52 * Math.cos(angle);
          const y1 = 250 + 52 * Math.sin(angle);
          const x2 = 250 + 68 * Math.cos(angle);
          const y2 = 250 + 68 * Math.sin(angle);
          return (
            <motion.line
              key={`tooth-${i}`}
              x1={x1} y1={y1} x2={x2} y2={y2}
              stroke="#f59e0b" strokeWidth="5" strokeLinecap="round"
              initial={{ opacity: 0, pathLength: 0 }}
              animate={{ opacity: 1, pathLength: 1 }}
              transition={{ duration: 0.4, delay: 1.4 + i * 0.06 }}
            />
          );
        })}
      </motion.g>

      {/* Rotating inner element */}
      <motion.g
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" as const }}
        style={{ transformOrigin: "250px 250px" }}
      >
        <motion.path
          d="M 250 225 L 260 250 L 250 275 L 240 250 Z"
          stroke="#f59e0b" strokeWidth="1.5" fill="#f59e0b" fillOpacity="0.15"
          {...draw(1.8)}
        />
      </motion.g>

      {/* ---- Small gear (top-right) ---- */}
      <motion.circle
        cx="370" cy="140" r="28"
        stroke="#f59e0b" strokeWidth="2" fill="none"
        filter="url(#glow)"
        {...draw(0.8, 2)}
      />
      {Array.from({ length: 8 }).map((_, i) => {
        const angle = (i * 45 * Math.PI) / 180;
        const x1 = 370 + 26 * Math.cos(angle);
        const y1 = 140 + 26 * Math.sin(angle);
        const x2 = 370 + 38 * Math.cos(angle);
        const y2 = 140 + 38 * Math.sin(angle);
        return (
          <motion.line
            key={`stooth-${i}`}
            x1={x1} y1={y1} x2={x2} y2={y2}
            stroke="#f59e0b" strokeWidth="4" strokeLinecap="round"
            filter="url(#glow)"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.7 }}
            transition={{ duration: 0.4, delay: 1.6 + i * 0.05 }}
          />
        );
      })}

      {/* ---- Lightning bolt (center-left) ---- */}
      <motion.path
        d="M 120 100 L 105 160 L 125 155 L 108 210"
        stroke="#f59e0b" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"
        fill="none" filter="url(#glowStrong)"
        {...draw(0.5, 1.5)}
      />
      {/* Pulsing glow on lightning */}
      <motion.path
        d="M 120 100 L 105 160 L 125 155 L 108 210"
        stroke="#f59e0b" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round"
        fill="none" filter="url(#glowStrong)"
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 0.5, 0] }}
        transition={{ duration: 2, delay: 2, repeat: Infinity, ease: "easeInOut" as const }}
      />

      {/* ---- Lightning bolt 2 (bottom-right) ---- */}
      <motion.path
        d="M 400 320 L 385 380 L 405 375 L 388 430"
        stroke="#f59e0b" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"
        fill="none" filter="url(#glowStrong)"
        {...draw(0.8, 1.5)}
      />
      <motion.path
        d="M 400 320 L 385 380 L 405 375 L 388 430"
        stroke="#f59e0b" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round"
        fill="none" filter="url(#glowStrong)"
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 0.5, 0] }}
        transition={{ duration: 2.5, delay: 2.5, repeat: Infinity, ease: "easeInOut" as const }}
      />

      {/* ---- Electrical arc sparks ---- */}
      {[
        { cx: 108, cy: 210, d: 1.8 },
        { cx: 388, cy: 430, d: 2.3 },
      ].map((spark, i) => (
        <motion.circle
          key={`spark-${i}`}
          cx={spark.cx} cy={spark.cy} r="3"
          fill="#f59e0b" filter="url(#glowStrong)"
          animate={{ r: [3, 8, 3], opacity: [1, 0.3, 1] }}
          transition={{ duration: spark.d, repeat: Infinity, ease: "easeInOut" as const }}
        />
      ))}

      {/* ---- Hexagonal node (bottom-left) ---- */}
      <motion.path
        d="M 100 400 L 125 385 L 150 400 L 150 425 L 125 440 L 100 425 Z"
        stroke="#f59e0b" strokeWidth="2" fill="#f59e0b" fillOpacity="0.05"
        filter="url(#glow)"
        {...draw(1.0, 2)}
      />

      {/* ---- Pulsing ring around central gear ---- */}
      <motion.circle
        cx="250" cy="250" r="80"
        stroke="#f59e0b" strokeWidth="1" fill="none"
        strokeDasharray="8 6"
        animate={{ opacity: [0.2, 0.6, 0.2], rotate: [0, 360] }}
        transition={{ duration: 15, repeat: Infinity, ease: "linear" as const }}
        style={{ transformOrigin: "250px 250px" }}
      />

      {/* ---- Energy waves ---- */}
      {[90, 100, 110].map((r, i) => (
        <motion.circle
          key={`wave-${i}`}
          cx="250" cy="250" r={r}
          stroke="#f59e0b" strokeWidth="0.5" fill="none"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: [0, 0.3, 0], scale: [0.9, 1.1, 0.9] }}
          transition={{
            duration: 4,
            delay: 2.5 + i * 0.6,
            repeat: Infinity,
            ease: "easeInOut" as const,
          }}
          style={{ transformOrigin: "250px 250px" }}
        />
      ))}
    </motion.svg>
  );
}

/* ------------------------------------------------------------------ */
/*  Hero Component                                                    */
/* ------------------------------------------------------------------ */
export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const yParallax = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const opacityFade = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <section
      ref={ref}
      className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950"
    >
      {/* ---- Grid overlay ---- */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(#f59e0b 1px, transparent 1px), linear-gradient(90deg, #f59e0b 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      {/* ---- Radial glow ---- */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-amber-500/[0.04] blur-[120px] pointer-events-none" />

      {/* ---- Particles ---- */}
      <Particles />

      {/* ---- Content ---- */}
      <motion.div
        style={{ y: yParallax, opacity: opacityFade }}
        className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 w-full grid lg:grid-cols-2 gap-12 items-center py-24"
      >
        {/* Left – Text */}
        <div className="flex flex-col gap-6">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="flex items-center gap-2 w-fit px-4 py-1.5 rounded-full border border-amber-500/30 bg-amber-500/10 text-amber-400 text-sm font-medium tracking-wide"
          >
            <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
            {companyInfo.shortName}
          </motion.div>

          {/* Headline */}
          <AnimatedHeadline
            text={companyInfo.tagline}
            className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight text-white"
          />

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 1.2 }}
            className="text-gray-400 text-lg max-w-xl leading-relaxed"
          >
            {companyInfo.description}
          </motion.p>

          {/* CTA buttons */}
          <motion.div
            className="flex flex-wrap gap-4 mt-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 1.5 }}
          >
            <a
              href="/services"
              className="group inline-flex items-center gap-2 px-7 py-3.5 rounded-lg bg-amber-500 text-gray-950 font-semibold text-sm tracking-wide hover:bg-amber-400 transition-colors shadow-lg shadow-amber-500/20"
            >
              Nos Services
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
            <a
              href="/contact"
              className="group inline-flex items-center gap-2 px-7 py-3.5 rounded-lg border border-gray-600 text-gray-300 font-semibold text-sm tracking-wide hover:border-amber-500/60 hover:text-amber-400 transition-colors"
            >
              <Phone className="w-4 h-4" />
              Contactez-nous
            </a>
          </motion.div>
        </div>

        {/* Right – SVG Illustration */}
        <motion.div
          className="hidden lg:flex justify-center items-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.3 }}
        >
          <ElectricalSVG />
        </motion.div>
      </motion.div>

      {/* ---- Scroll-down indicator ---- */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.2, duration: 0.8 }}
      >
        <span className="text-gray-500 text-xs uppercase tracking-widest">Découvrir</span>
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" as const }}
        >
          <ChevronDown className="w-5 h-5 text-amber-500/70" />
        </motion.div>
      </motion.div>
    </section>
  );
}
