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
      {/* CSS animations */}
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
        @keyframes blink-amber {
          0%, 59% { fill: #f59e0b; }
          60%, 100% { fill: #78350f; }
        }
        @keyframes gear-spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes pulse-glow {
          0%, 100% { opacity: 0.15; }
          50% { opacity: 0.4; }
        }
        .spark-1 { animation: spark1 1.5s infinite; }
        .spark-2 { animation: spark2 1.8s infinite; }
        .spark-3 { animation: spark3 1.2s infinite; }
        .light-green { animation: blink-green 2s infinite; }
        .light-red { animation: blink-red 3s infinite; }
        .light-amber { animation: blink-amber 2.5s infinite; }
        .gear-rotate {
          transform-origin: 440px 80px;
          animation: gear-spin 8s linear infinite;
        }
        .gear-rotate-2 {
          transform-origin: 60px 350px;
          animation: gear-spin 12s linear infinite reverse;
        }
        .pulse { animation: pulse-glow 3s ease-in-out infinite; }
      `}</style>

      {/* Background grid pattern */}
      <defs>
        <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
          <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#f59e0b" strokeWidth="0.15" opacity="0.3" />
        </pattern>
      </defs>
      <rect width="500" height="400" fill="url(#grid)" opacity="0.5" />

      {/* Background glow */}
      <circle cx="250" cy="200" r="160" fill="#f59e0b" className="pulse" />

      {/* Background gear (top-right) */}
      <g className="gear-rotate">
        <circle cx="440" cy="80" r="30" fill="none" stroke="#3b82f6" strokeWidth="2" opacity="0.25" />
        {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => (
          <rect
            key={angle}
            x="436"
            y="46"
            width="8"
            height="14"
            rx="2"
            fill="#3b82f6"
            opacity="0.25"
            transform={`rotate(${angle} 440 80)`}
          />
        ))}
      </g>

      {/* Background gear (bottom-left) */}
      <g className="gear-rotate-2">
        <circle cx="60" cy="350" r="22" fill="none" stroke="#f59e0b" strokeWidth="1.5" opacity="0.2" />
        {[0, 60, 120, 180, 240, 300].map((angle) => (
          <rect
            key={angle}
            x="57"
            y="325"
            width="6"
            height="10"
            rx="1.5"
            fill="#f59e0b"
            opacity="0.2"
            transform={`rotate(${angle} 60 350)`}
          />
        ))}
      </g>

      {/* === Electrical Panel === */}
      <rect x="160" y="80" width="180" height="240" rx="6" fill="#1e293b" stroke="#334155" strokeWidth="2" />
      {/* Panel inner border */}
      <rect x="170" y="90" width="160" height="220" rx="3" fill="none" stroke="#475569" strokeWidth="1" />
      {/* Panel title bar */}
      <rect x="195" y="96" width="110" height="16" rx="2" fill="#0f172a" />
      <text x="250" y="108" textAnchor="middle" fill="#f59e0b" fontSize="8" fontFamily="monospace" fontWeight="bold">PANEL 01</text>

      {/* Circuit breakers */}
      {[0, 1, 2, 3].map((i) => (
        <g key={`cb-${i}`}>
          <rect x={190 + i * 30} y="125" width="20" height="35" rx="2" fill="#0f172a" stroke="#475569" strokeWidth="1" />
          <rect x={195 + i * 30} y="130" width="10" height="8" rx="1" fill={i === 2 ? "#ef4444" : "#22c55e"} />
          <rect x={195 + i * 30} y="142" width="10" height="12" rx="1" fill="#1e293b" stroke="#64748b" strokeWidth="0.5" />
        </g>
      ))}

      {/* Indicator lights */}
      <circle cx="195" cy="180" r="5" className="light-green" />
      <circle cx="215" cy="180" r="5" className="light-amber" />
      <circle cx="235" cy="180" r="5" className="light-red" />
      <circle cx="255" cy="180" r="5" className="light-green" />
      <circle cx="275" cy="180" r="5" className="light-green" />
      <circle cx="295" cy="180" r="5" className="light-amber" />

      {/* Wires coming out of panel */}
      <path d="M200 195 L200 220 Q200 230 210 230 L230 230" stroke="#3b82f6" strokeWidth="2" fill="none" />
      <path d="M250 195 L250 240 Q250 250 260 250 L280 250" stroke="#f59e0b" strokeWidth="2" fill="none" />
      <path d="M300 195 L300 210 Q300 220 290 220 L270 220" stroke="#ef4444" strokeWidth="2" fill="none" />

      {/* Display/meter on panel */}
      <rect x="190" y="260" width="50" height="30" rx="3" fill="#0f172a" stroke="#3b82f6" strokeWidth="1" />
      <text x="215" y="278" textAnchor="middle" fill="#3b82f6" fontSize="10" fontFamily="monospace">230V</text>

      <rect x="255" y="260" width="50" height="30" rx="3" fill="#0f172a" stroke="#f59e0b" strokeWidth="1" />
      <text x="280" y="278" textAnchor="middle" fill="#f59e0b" fontSize="10" fontFamily="monospace">48.2A</text>

      {/* === Sparking wires === */}
      {/* Spark cluster 1 */}
      <g className="spark-1">
        <line x1="228" y1="226" x2="236" y2="220" stroke="#f59e0b" strokeWidth="2" strokeLinecap="round" />
        <line x1="232" y1="224" x2="240" y2="228" stroke="#fbbf24" strokeWidth="1.5" strokeLinecap="round" />
        <line x1="234" y1="230" x2="226" y2="234" stroke="#f59e0b" strokeWidth="1" strokeLinecap="round" />
        <circle cx="233" cy="227" r="3" fill="#fef3c7" opacity="0.8" />
      </g>

      {/* Spark cluster 2 */}
      <g className="spark-2">
        <line x1="278" y1="246" x2="286" y2="240" stroke="#3b82f6" strokeWidth="2" strokeLinecap="round" />
        <line x1="282" y1="244" x2="290" y2="248" stroke="#60a5fa" strokeWidth="1.5" strokeLinecap="round" />
        <circle cx="283" cy="245" r="3" fill="#dbeafe" opacity="0.8" />
      </g>

      {/* Spark cluster 3 */}
      <g className="spark-3">
        <line x1="268" y1="216" x2="276" y2="212" stroke="#f59e0b" strokeWidth="1.5" strokeLinecap="round" />
        <line x1="272" y1="218" x2="264" y2="222" stroke="#fbbf24" strokeWidth="1" strokeLinecap="round" />
        <circle cx="270" cy="218" r="2.5" fill="#fef3c7" opacity="0.7" />
      </g>

      {/* === Worker 1 (left, standing, with clipboard) === */}
      <g>
        {/* Hard hat */}
        <ellipse cx="105" cy="175" rx="16" ry="6" fill="#f59e0b" />
        <rect x="92" y="165" width="26" height="12" rx="5" fill="#f59e0b" />
        <rect x="97" y="160" width="16" height="8" rx="4" fill="#fbbf24" />
        {/* Head */}
        <circle cx="105" cy="190" r="12" fill="#c2956a" />
        {/* Eyes */}
        <circle cx="100" cy="188" r="1.5" fill="#1e293b" />
        <circle cx="110" cy="188" r="1.5" fill="#1e293b" />
        {/* Body - safety vest */}
        <rect x="90" y="202" width="30" height="45" rx="4" fill="#1e40af" />
        {/* Vest stripes */}
        <line x1="92" y1="215" x2="118" y2="215" stroke="#f59e0b" strokeWidth="3" />
        <line x1="92" y1="230" x2="118" y2="230" stroke="#f59e0b" strokeWidth="3" />
        {/* Arms */}
        <rect x="78" y="205" width="12" height="35" rx="5" fill="#1e40af" />
        <rect x="120" y="205" width="12" height="30" rx="5" fill="#1e40af" />
        {/* Hands */}
        <circle cx="84" cy="242" r="5" fill="#c2956a" />
        <circle cx="126" cy="237" r="5" fill="#c2956a" />
        {/* Clipboard */}
        <rect x="120" y="225" width="18" height="24" rx="2" fill="#e2e8f0" stroke="#94a3b8" strokeWidth="1" />
        <line x1="124" y1="232" x2="134" y2="232" stroke="#64748b" strokeWidth="1" />
        <line x1="124" y1="237" x2="134" y2="237" stroke="#64748b" strokeWidth="1" />
        <line x1="124" y1="242" x2="130" y2="242" stroke="#64748b" strokeWidth="1" />
        {/* Legs */}
        <rect x="93" y="247" width="12" height="40" rx="4" fill="#334155" />
        <rect x="108" y="247" width="12" height="40" rx="4" fill="#334155" />
        {/* Boots */}
        <rect x="90" y="283" width="18" height="10" rx="3" fill="#1e293b" />
        <rect x="105" y="283" width="18" height="10" rx="3" fill="#1e293b" />
      </g>

      {/* === Worker 2 (right, working on panel with tool) === */}
      <g>
        {/* Hard hat */}
        <ellipse cx="390" cy="155" rx="16" ry="6" fill="#f59e0b" />
        <rect x="377" y="145" width="26" height="12" rx="5" fill="#f59e0b" />
        <rect x="382" y="140" width="16" height="8" rx="4" fill="#fbbf24" />
        {/* Head */}
        <circle cx="390" cy="170" r="12" fill="#a0845c" />
        {/* Safety glasses */}
        <rect x="381" y="166" width="18" height="7" rx="3" fill="none" stroke="#94a3b8" strokeWidth="1.5" />
        {/* Body */}
        <rect x="375" y="182" width="30" height="50" rx="4" fill="#1e40af" />
        {/* Vest stripes */}
        <line x1="377" y1="198" x2="403" y2="198" stroke="#f59e0b" strokeWidth="3" />
        <line x1="377" y1="212" x2="403" y2="212" stroke="#f59e0b" strokeWidth="3" />
        {/* Left arm (reaching toward panel) */}
        <rect x="363" y="185" width="12" height="38" rx="5" fill="#1e40af" transform="rotate(-15 369 185)" />
        {/* Right arm (holding tool, extended to panel) */}
        <rect x="405" y="182" width="12" height="42" rx="5" fill="#1e40af" transform="rotate(20 411 182)" />
        {/* Hand with screwdriver */}
        <circle cx="420" cy="218" r="5" fill="#a0845c" />
        {/* Screwdriver */}
        <rect x="418" y="220" width="3" height="20" rx="1" fill="#f59e0b" />
        <rect x="417" y="238" width="5" height="8" rx="0.5" fill="#94a3b8" />
        {/* Left hand */}
        <circle cx="358" cy="222" r="5" fill="#a0845c" />
        {/* Legs */}
        <rect x="378" y="232" width="12" height="42" rx="4" fill="#334155" />
        <rect x="393" y="232" width="12" height="42" rx="4" fill="#334155" />
        {/* Boots */}
        <rect x="375" y="270" width="18" height="10" rx="3" fill="#1e293b" />
        <rect x="390" y="270" width="18" height="10" rx="3" fill="#1e293b" />
      </g>

      {/* === Worker 3 (small, crouching at base of panel) === */}
      <g>
        {/* Hard hat */}
        <ellipse cx="225" cy="300" rx="13" ry="5" fill="#f59e0b" />
        <rect x="215" y="292" width="20" height="10" rx="4" fill="#f59e0b" />
        {/* Head */}
        <circle cx="225" cy="312" r="10" fill="#b8926c" />
        {/* Eyes */}
        <circle cx="221" cy="311" r="1.2" fill="#1e293b" />
        <circle cx="229" cy="311" r="1.2" fill="#1e293b" />
        {/* Body (crouching) */}
        <rect x="213" y="322" width="24" height="30" rx="4" fill="#1e40af" />
        {/* Vest stripe */}
        <line x1="215" y1="335" x2="235" y2="335" stroke="#f59e0b" strokeWidth="2.5" />
        {/* Arms */}
        <rect x="200" y="325" width="13" height="10" rx="4" fill="#1e40af" />
        <rect x="237" y="325" width="13" height="10" rx="4" fill="#1e40af" />
        {/* Hands */}
        <circle cx="198" cy="330" r="4" fill="#b8926c" />
        <circle cx="252" cy="330" r="4" fill="#b8926c" />
        {/* Toolbox */}
        <rect x="252" y="326" width="22" height="14" rx="2" fill="#dc2626" stroke="#991b1b" strokeWidth="1" />
        <rect x="258" y="324" width="10" height="3" rx="1" fill="#991b1b" />
        {/* Legs (crouching) */}
        <rect x="214" y="350" width="10" height="20" rx="3" fill="#334155" />
        <rect x="228" y="350" width="10" height="20" rx="3" fill="#334155" />
        {/* Boots */}
        <rect x="210" y="367" width="16" height="8" rx="2.5" fill="#1e293b" />
        <rect x="226" y="367" width="16" height="8" rx="2.5" fill="#1e293b" />
      </g>

      {/* Cables on floor */}
      <path d="M140 370 Q180 360 200 375 Q220 390 260 375 Q300 360 340 370" stroke="#3b82f6" strokeWidth="3" fill="none" opacity="0.4" strokeLinecap="round" />
      <path d="M150 378 Q190 365 220 380 Q250 395 280 380 Q310 365 350 378" stroke="#f59e0b" strokeWidth="2" fill="none" opacity="0.3" strokeLinecap="round" />

      {/* Floor line */}
      <line x1="50" y1="390" x2="450" y2="390" stroke="#334155" strokeWidth="1" opacity="0.5" />
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
        <span className="text-sm font-medium text-gray-300">{label}</span>
        <span className="text-sm font-semibold text-amber-400">{value}%</span>
      </div>
      <div className="w-full h-2.5 bg-gray-800 rounded-full overflow-hidden">
        <motion.div
          className="h-full rounded-full bg-gradient-to-r from-amber-500 to-amber-400"
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
      className="relative py-24 bg-gray-950 overflow-hidden"
    >
      {/* Subtle background gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(245,158,11,0.06),transparent_60%)]" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 bg-amber-500/10 border border-amber-500/20 rounded-full text-amber-400 text-sm font-medium mb-4">
            Qui sommes-nous
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white">
            À Propos de{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-500">
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
              className="text-gray-300 text-lg leading-relaxed mb-6"
            >
              {companyInfo.about}
            </motion.p>

            {/* Mission */}
            <motion.div
              variants={textReveal}
              className="flex items-start gap-4 mb-8 p-5 rounded-xl bg-gray-900/60 border border-gray-800"
            >
              <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-amber-500/10 flex items-center justify-center">
                <Target className="w-6 h-6 text-amber-400" />
              </div>
              <div>
                <h3 className="text-white font-semibold text-lg mb-1">Notre Mission</h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  {companyInfo.mission}
                </p>
              </div>
            </motion.div>

            {/* Expertise list */}
            <motion.div variants={textReveal}>
              <div className="flex items-center gap-2 mb-4">
                <Shield className="w-5 h-5 text-amber-400" />
                <h3 className="text-white font-semibold text-lg">Nos Domaines d&apos;Expertise</h3>
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
                  className="flex items-center gap-2.5 text-gray-300 text-sm"
                >
                  <CheckCircle className="w-4.5 h-4.5 text-amber-400 flex-shrink-0" />
                  {item}
                </motion.li>
              ))}
            </motion.ul>

            {/* Skill bars */}
            <motion.div variants={textReveal}>
              <h3 className="text-white font-semibold text-lg mb-5">Nos Compétences</h3>
              {skills.map((s, i) => (
                <SkillBar key={s.label} label={s.label} value={s.value} delay={0.2 + i * 0.15} />
              ))}
            </motion.div>
          </motion.div>

          {/* ---- Right: SVG Illustration ---- */}
          <motion.div
            initial={{ opacity: 0, x: 60, scale: 0.95 }}
            animate={isInView ? { opacity: 1, x: 0, scale: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" as const }}
            className="relative"
          >
            {/* Glow behind SVG */}
            <div className="absolute -inset-6 bg-gradient-to-br from-amber-500/5 via-transparent to-blue-500/5 rounded-3xl blur-2xl" />
            <div className="relative bg-gray-900/40 border border-gray-800 rounded-2xl p-6 backdrop-blur-sm">
              <WorkersSVG />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
