"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { CheckCircle, Shield, Target } from "lucide-react";
import { companyInfo, expertise } from "@/lib/data";

/* ------------------------------------------------------------------ */
/*  Inline SVG – Workers at Electrical Panel                           */
/* ------------------------------------------------------------------ */
function WorkersSVG() {
  return (
    <svg
      viewBox="0 0 500 400"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-auto"
    >
      <style>{`
        @keyframes spark1 {
          0%, 100% { opacity: 0; }
          10%, 30% { opacity: 1; }
          20% { opacity: 0.3; }
        }
        @keyframes spark2 {
          0%, 100% { opacity: 0; }
          40%, 60% { opacity: 1; }
          50% { opacity: 0.2; }
        }
        @keyframes spark3 {
          0%, 100% { opacity: 0; }
          70%, 90% { opacity: 1; }
          80% { opacity: 0.4; }
        }
        @keyframes blink-green {
          0%, 49% { fill: #22c55e; }
          50%, 100% { fill: #166534; }
        }
        @keyframes blink-red {
          0%, 39% { fill: #ef4444; }
          40%, 100% { fill: #7f1d1d; }
        }
        @keyframes blink-orange {
          0%, 59% { fill: #f97316; }
          60%, 100% { fill: #7c2d12; }
        }
        @keyframes gear-spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .about-spark-1 { animation: spark1 1.5s infinite; }
        .about-spark-2 { animation: spark2 1.8s infinite; }
        .about-spark-3 { animation: spark3 1.2s infinite; }
        .about-light-green { animation: blink-green 2s infinite; }
        .about-light-red { animation: blink-red 3s infinite; }
        .about-light-orange { animation: blink-orange 2.5s infinite; }
        .about-gear-1 {
          transform-origin: 440px 80px;
          animation: gear-spin 8s linear infinite;
        }
        .about-gear-2 {
          transform-origin: 60px 350px;
          animation: gear-spin 12s linear infinite reverse;
        }
      `}</style>

      {/* Background grid */}
      <defs>
        <pattern id="about-grid" width="20" height="20" patternUnits="userSpaceOnUse">
          <path d="M 20 0 L 0 0 0 20" fill="none" className="stroke-orange-500/20 dark:stroke-orange-500/10" strokeWidth="0.15" />
        </pattern>
      </defs>
      <rect width="500" height="400" fill="url(#about-grid)" opacity="0.5" />

      {/* Background gear (top-right) */}
      <g className="about-gear-1">
        <circle cx="440" cy="80" r="30" fill="none" className="stroke-orange-500/20 dark:stroke-blue-500/25" strokeWidth="2" />
        {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => (
          <rect
            key={angle}
            x="436"
            y="46"
            width="8"
            height="14"
            rx="2"
            className="fill-orange-500/20 dark:fill-blue-500/25"
            transform={`rotate(${angle} 440 80)`}
          />
        ))}
      </g>

      {/* Background gear (bottom-left) */}
      <g className="about-gear-2">
        <circle cx="60" cy="350" r="22" fill="none" className="stroke-orange-500/15 dark:stroke-orange-500/20" strokeWidth="1.5" />
        {[0, 60, 120, 180, 240, 300].map((angle) => (
          <rect
            key={angle}
            x="57"
            y="325"
            width="6"
            height="10"
            rx="1.5"
            className="fill-orange-500/15 dark:fill-orange-500/20"
            transform={`rotate(${angle} 60 350)`}
          />
        ))}
      </g>

      {/* === Electrical Panel === */}
      <rect x="160" y="80" width="180" height="240" rx="6" className="fill-neutral-300 dark:fill-slate-800" stroke="#334155" strokeWidth="2" />
      <rect x="170" y="90" width="160" height="220" rx="3" fill="none" className="stroke-neutral-400 dark:stroke-slate-600" strokeWidth="1" />
      <rect x="195" y="96" width="110" height="16" rx="2" className="fill-neutral-200 dark:fill-slate-900" />
      <text x="250" y="108" textAnchor="middle" fill="#f97316" fontSize="8" fontFamily="monospace" fontWeight="bold">PANEL 01</text>

      {/* Circuit breakers */}
      {[0, 1, 2, 3].map((i) => (
        <g key={`cb-${i}`}>
          <rect x={190 + i * 30} y="125" width="20" height="35" rx="2" className="fill-neutral-200 dark:fill-slate-900" stroke="#475569" strokeWidth="1" />
          <rect x={195 + i * 30} y="130" width="10" height="8" rx="1" fill={i === 2 ? "#ef4444" : "#22c55e"} />
          <rect x={195 + i * 30} y="142" width="10" height="12" rx="1" className="fill-neutral-100 dark:fill-slate-800" stroke="#64748b" strokeWidth="0.5" />
        </g>
      ))}

      {/* Indicator lights */}
      <circle cx="195" cy="180" r="5" className="about-light-green" />
      <circle cx="215" cy="180" r="5" className="about-light-orange" />
      <circle cx="235" cy="180" r="5" className="about-light-red" />
      <circle cx="255" cy="180" r="5" className="about-light-green" />
      <circle cx="275" cy="180" r="5" className="about-light-green" />
      <circle cx="295" cy="180" r="5" className="about-light-orange" />

      {/* Wires */}
      <path d="M200 195 L200 220 Q200 230 210 230 L230 230" stroke="#3b82f6" strokeWidth="2" fill="none" />
      <path d="M250 195 L250 240 Q250 250 260 250 L280 250" stroke="#f97316" strokeWidth="2" fill="none" />
      <path d="M300 195 L300 210 Q300 220 290 220 L270 220" stroke="#ef4444" strokeWidth="2" fill="none" />

      {/* Meters */}
      <rect x="190" y="260" width="50" height="30" rx="3" className="fill-neutral-200 dark:fill-slate-900" stroke="#3b82f6" strokeWidth="1" />
      <text x="215" y="278" textAnchor="middle" fill="#3b82f6" fontSize="10" fontFamily="monospace">230V</text>
      <rect x="255" y="260" width="50" height="30" rx="3" className="fill-neutral-200 dark:fill-slate-900" stroke="#f97316" strokeWidth="1" />
      <text x="280" y="278" textAnchor="middle" fill="#f97316" fontSize="10" fontFamily="monospace">48.2A</text>

      {/* Sparks */}
      <g className="about-spark-1">
        <line x1="228" y1="226" x2="236" y2="220" stroke="#f97316" strokeWidth="2" strokeLinecap="round" />
        <line x1="232" y1="224" x2="240" y2="228" stroke="#fb923c" strokeWidth="1.5" strokeLinecap="round" />
        <line x1="234" y1="230" x2="226" y2="234" stroke="#f97316" strokeWidth="1" strokeLinecap="round" />
        <circle cx="233" cy="227" r="3" fill="#fff7ed" opacity="0.8" />
      </g>
      <g className="about-spark-2">
        <line x1="278" y1="246" x2="286" y2="240" stroke="#3b82f6" strokeWidth="2" strokeLinecap="round" />
        <line x1="282" y1="244" x2="290" y2="248" stroke="#60a5fa" strokeWidth="1.5" strokeLinecap="round" />
        <circle cx="283" cy="245" r="3" fill="#dbeafe" opacity="0.8" />
      </g>
      <g className="about-spark-3">
        <line x1="268" y1="216" x2="276" y2="212" stroke="#f97316" strokeWidth="1.5" strokeLinecap="round" />
        <line x1="272" y1="218" x2="264" y2="222" stroke="#fb923c" strokeWidth="1" strokeLinecap="round" />
        <circle cx="270" cy="218" r="2.5" fill="#fff7ed" opacity="0.7" />
      </g>

      {/* === Worker 1 (left, with clipboard) === */}
      <g>
        <ellipse cx="105" cy="175" rx="16" ry="6" fill="#f97316" />
        <rect x="92" y="165" width="26" height="12" rx="5" fill="#f97316" />
        <rect x="97" y="160" width="16" height="8" rx="4" fill="#fb923c" />
        <circle cx="105" cy="190" r="12" fill="#c2956a" />
        <circle cx="100" cy="188" r="1.5" className="fill-neutral-800 dark:fill-slate-800" />
        <circle cx="110" cy="188" r="1.5" className="fill-neutral-800 dark:fill-slate-800" />
        <rect x="90" y="202" width="30" height="45" rx="4" fill="#1e40af" />
        <line x1="92" y1="215" x2="118" y2="215" stroke="#f97316" strokeWidth="3" />
        <line x1="92" y1="230" x2="118" y2="230" stroke="#f97316" strokeWidth="3" />
        <rect x="78" y="205" width="12" height="35" rx="5" fill="#1e40af" />
        <rect x="120" y="205" width="12" height="30" rx="5" fill="#1e40af" />
        <circle cx="84" cy="242" r="5" fill="#c2956a" />
        <circle cx="126" cy="237" r="5" fill="#c2956a" />
        <rect x="120" y="225" width="18" height="24" rx="2" className="fill-neutral-200 dark:fill-slate-200" stroke="#94a3b8" strokeWidth="1" />
        <line x1="124" y1="232" x2="134" y2="232" stroke="#64748b" strokeWidth="1" />
        <line x1="124" y1="237" x2="134" y2="237" stroke="#64748b" strokeWidth="1" />
        <line x1="124" y1="242" x2="130" y2="242" stroke="#64748b" strokeWidth="1" />
        <rect x="93" y="247" width="12" height="40" rx="4" className="fill-neutral-600 dark:fill-slate-700" />
        <rect x="108" y="247" width="12" height="40" rx="4" className="fill-neutral-600 dark:fill-slate-700" />
        <rect x="90" y="283" width="18" height="10" rx="3" className="fill-neutral-800 dark:fill-slate-900" />
        <rect x="105" y="283" width="18" height="10" rx="3" className="fill-neutral-800 dark:fill-slate-900" />
      </g>

      {/* === Worker 2 (right, with screwdriver) === */}
      <g>
        <ellipse cx="390" cy="155" rx="16" ry="6" fill="#f97316" />
        <rect x="377" y="145" width="26" height="12" rx="5" fill="#f97316" />
        <rect x="382" y="140" width="16" height="8" rx="4" fill="#fb923c" />
        <circle cx="390" cy="170" r="12" fill="#a0845c" />
        <rect x="381" y="166" width="18" height="7" rx="3" fill="none" stroke="#94a3b8" strokeWidth="1.5" />
        <rect x="375" y="182" width="30" height="50" rx="4" fill="#1e40af" />
        <line x1="377" y1="198" x2="403" y2="198" stroke="#f97316" strokeWidth="3" />
        <line x1="377" y1="212" x2="403" y2="212" stroke="#f97316" strokeWidth="3" />
        <rect x="363" y="185" width="12" height="38" rx="5" fill="#1e40af" transform="rotate(-15 369 185)" />
        <rect x="405" y="182" width="12" height="42" rx="5" fill="#1e40af" transform="rotate(20 411 182)" />
        <circle cx="420" cy="218" r="5" fill="#a0845c" />
        <rect x="418" y="220" width="3" height="20" rx="1" fill="#f97316" />
        <rect x="417" y="238" width="5" height="8" rx="0.5" fill="#94a3b8" />
        <circle cx="358" cy="222" r="5" fill="#a0845c" />
        <rect x="378" y="232" width="12" height="42" rx="4" className="fill-neutral-600 dark:fill-slate-700" />
        <rect x="393" y="232" width="12" height="42" rx="4" className="fill-neutral-600 dark:fill-slate-700" />
        <rect x="375" y="270" width="18" height="10" rx="3" className="fill-neutral-800 dark:fill-slate-900" />
        <rect x="390" y="270" width="18" height="10" rx="3" className="fill-neutral-800 dark:fill-slate-900" />
      </g>

      {/* === Worker 3 (crouching at base) === */}
      <g>
        <ellipse cx="225" cy="300" rx="13" ry="5" fill="#f97316" />
        <rect x="215" y="292" width="20" height="10" rx="4" fill="#f97316" />
        <circle cx="225" cy="312" r="10" fill="#b8926c" />
        <circle cx="221" cy="311" r="1.2" className="fill-neutral-800 dark:fill-slate-800" />
        <circle cx="229" cy="311" r="1.2" className="fill-neutral-800 dark:fill-slate-800" />
        <rect x="213" y="322" width="24" height="30" rx="4" fill="#1e40af" />
        <line x1="215" y1="335" x2="235" y2="335" stroke="#f97316" strokeWidth="2.5" />
        <rect x="200" y="325" width="13" height="10" rx="4" fill="#1e40af" />
        <rect x="237" y="325" width="13" height="10" rx="4" fill="#1e40af" />
        <circle cx="198" cy="330" r="4" fill="#b8926c" />
        <circle cx="252" cy="330" r="4" fill="#b8926c" />
        <rect x="252" y="326" width="22" height="14" rx="2" fill="#dc2626" stroke="#991b1b" strokeWidth="1" />
        <rect x="258" y="324" width="10" height="3" rx="1" fill="#991b1b" />
        <rect x="214" y="350" width="10" height="20" rx="3" className="fill-neutral-600 dark:fill-slate-700" />
        <rect x="228" y="350" width="10" height="20" rx="3" className="fill-neutral-600 dark:fill-slate-700" />
        <rect x="210" y="367" width="16" height="8" rx="2.5" className="fill-neutral-800 dark:fill-slate-900" />
        <rect x="226" y="367" width="16" height="8" rx="2.5" className="fill-neutral-800 dark:fill-slate-900" />
      </g>

      {/* Cables on floor */}
      <path d="M140 370 Q180 360 200 375 Q220 390 260 375 Q300 360 340 370" stroke="#3b82f6" strokeWidth="3" fill="none" opacity="0.4" strokeLinecap="round" />
      <path d="M150 378 Q190 365 220 380 Q250 395 280 380 Q310 365 350 378" stroke="#f97316" strokeWidth="2" fill="none" opacity="0.3" strokeLinecap="round" />

      {/* Floor line */}
      <line x1="50" y1="390" x2="450" y2="390" className="stroke-neutral-400 dark:stroke-slate-700" strokeWidth="1" opacity="0.5" />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/*  Skill progress bars                                                */
/* ------------------------------------------------------------------ */
const skills = [
  { label: "Électricité Industrielle", value: 95 },
  { label: "Groupe Électrogène", value: 90 },
  { label: "Froid & Climatisation", value: 85 },
  { label: "Maintenance", value: 92 },
];

function SkillBar({ label, value, delay }: { label: string; value: number; delay: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <div ref={ref} className="mb-5">
      <div className="flex justify-between mb-1.5">
        <span className="text-sm font-medium text-neutral-600 dark:text-neutral-300">{label}</span>
        <span className="text-sm font-semibold text-orange-600 dark:text-orange-400">{value}%</span>
      </div>
      <div className="w-full h-2.5 bg-neutral-200 dark:bg-neutral-800 rounded-full overflow-hidden">
        <motion.div
          className="h-full rounded-full bg-gradient-to-r from-orange-500 to-orange-400"
          initial={{ width: 0 }}
          animate={isInView ? { width: `${value}%` } : { width: 0 }}
          transition={{ duration: 1.2, delay, ease: "easeOut" as const }}
        />
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Main About Component                                               */
/* ------------------------------------------------------------------ */
export default function About() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  const containerVariants = {
    hidden: {},
    visible: {
      transition: { staggerChildren: 0.08 },
    },
  };

  const textReveal = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" as const } },
  };

  const checkVariant = {
    hidden: { opacity: 0, x: -20, scale: 0.8 },
    visible: { opacity: 1, x: 0, scale: 1, transition: { duration: 0.4, ease: "easeOut" as const } },
  };

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative py-24 section-cool overflow-hidden"
    >
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 bg-orange-50 text-orange-600 border border-orange-200 dark:bg-orange-500/10 dark:text-orange-400 dark:border-orange-500/30 rounded-full text-sm font-medium mb-4">
            Qui sommes-nous
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-neutral-900 dark:text-white">
            À Propos de{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-orange-400">
              {companyInfo.shortName}
            </span>
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* ---- Left: Text content ---- */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            {/* About text */}
            <motion.p
              variants={textReveal}
              className="text-neutral-600 dark:text-neutral-300 text-lg leading-relaxed mb-6"
            >
              {companyInfo.about}
            </motion.p>

            {/* Mission */}
            <motion.div
              variants={textReveal}
              className="flex items-start gap-4 mb-8 p-5 rounded-xl bg-neutral-50 border border-neutral-200 dark:bg-neutral-900 dark:border-neutral-800"
            >
              <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-orange-50 text-orange-600 dark:bg-orange-500/10 dark:text-orange-400 flex items-center justify-center">
                <Target className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-neutral-900 dark:text-white font-semibold text-lg mb-1">Notre Mission</h3>
                <p className="text-neutral-500 dark:text-neutral-400 text-sm leading-relaxed">
                  {companyInfo.mission}
                </p>
              </div>
            </motion.div>

            {/* Expertise list */}
            <motion.div variants={textReveal}>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-lg bg-orange-50 text-orange-600 dark:bg-orange-500/10 dark:text-orange-400 flex items-center justify-center">
                  <Shield className="w-4 h-4" />
                </div>
                <h3 className="text-neutral-900 dark:text-white font-semibold text-lg">Nos Domaines d&apos;Expertise</h3>
              </div>
            </motion.div>

            <motion.ul
              variants={containerVariants}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              className="grid sm:grid-cols-2 gap-x-6 gap-y-2.5 mb-10"
            >
              {expertise.map((item, i) => (
                <motion.li
                  key={i}
                  variants={checkVariant}
                  className="flex items-center gap-2.5 text-neutral-600 dark:text-neutral-300 text-sm"
                >
                  <CheckCircle className="w-4.5 h-4.5 text-orange-500 flex-shrink-0" />
                  {item}
                </motion.li>
              ))}
            </motion.ul>

            {/* Skill bars */}
            <motion.div variants={textReveal}>
              <h3 className="text-neutral-900 dark:text-white font-semibold text-lg mb-5">Nos Compétences</h3>
              {skills.map((s, i) => (
                <SkillBar key={s.label} label={s.label} value={s.value} delay={0.2 + i * 0.15} />
              ))}
            </motion.div>
          </motion.div>

          {/* ---- Right: Photo collage ---- */}
          <motion.div
            initial={{ opacity: 0, x: 60, scale: 0.95 }}
            animate={isInView ? { opacity: 1, x: 0, scale: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" as const }}
            className="relative"
          >
            <div className="grid grid-cols-2 gap-3">
              {/* Large image top-left */}
              <motion.div
                className="col-span-2 rounded-2xl overflow-hidden shadow-lg"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <img
                  src="/images/about/about-team.jpg"
                  alt="Équipe CBI"
                  className="w-full h-52 object-cover"
                />
              </motion.div>
              {/* Bottom left */}
              <motion.div
                className="rounded-xl overflow-hidden shadow-md"
                whileHover={{ scale: 1.03 }}
                transition={{ duration: 0.3 }}
              >
                <img
                  src="/images/gallery/work-1.jpeg"
                  alt="Installation électrique"
                  className="w-full h-36 object-cover"
                />
              </motion.div>
              {/* Bottom right */}
              <motion.div
                className="rounded-xl overflow-hidden shadow-md"
                whileHover={{ scale: 1.03 }}
                transition={{ duration: 0.3 }}
              >
                <img
                  src="/images/gallery/work-2.jpeg"
                  alt="Travaux en cours"
                  className="w-full h-36 object-cover"
                />
              </motion.div>
            </div>
            {/* Experience badge overlay */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.8 }}
              className="absolute -bottom-4 -left-4 bg-orange-500 text-white px-5 py-3 rounded-xl shadow-lg"
            >
              <p className="text-2xl font-bold">10+</p>
              <p className="text-xs font-medium opacity-90">Ans d&apos;expérience</p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
