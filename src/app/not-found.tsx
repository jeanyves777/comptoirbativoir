'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Home, ArrowLeft } from 'lucide-react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

function FloatingParticles() {
  const [particles, setParticles] = useState<
    { id: number; x: number; y: number; size: number; duration: number; delay: number }[]
  >([])

  useEffect(() => {
    const generated = Array.from({ length: 30 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 4 + 1,
      duration: Math.random() * 6 + 4,
      delay: Math.random() * 4,
    }))
    setParticles(generated)
  }, [])

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full bg-amber-500/20"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
          }}
          animate={{
            y: [0, -40, 0],
            opacity: [0, 0.8, 0],
            scale: [0.5, 1.2, 0.5],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  )
}

function BrokenCableSVG() {
  return (
    <svg
      viewBox="0 0 400 300"
      className="w-full max-w-md mx-auto"
      xmlns="http://www.w3.org/2000/svg"
    >
      <style>{`
        @keyframes spark1 {
          0%, 100% { opacity: 0; transform: translate(0, 0) scale(0.5); }
          20% { opacity: 1; transform: translate(-8px, -12px) scale(1.2); }
          40% { opacity: 0.3; transform: translate(5px, -18px) scale(0.8); }
          60% { opacity: 1; transform: translate(-3px, -8px) scale(1); }
          80% { opacity: 0; }
        }
        @keyframes spark2 {
          0%, 100% { opacity: 0; transform: translate(0, 0) scale(0.5); }
          15% { opacity: 0.8; transform: translate(10px, -15px) scale(1.1); }
          35% { opacity: 1; transform: translate(-6px, -20px) scale(1.3); }
          55% { opacity: 0.4; transform: translate(8px, -10px) scale(0.9); }
          75% { opacity: 0; }
        }
        @keyframes spark3 {
          0%, 100% { opacity: 0; transform: translate(0, 0) scale(0.3); }
          10% { opacity: 1; transform: translate(12px, -8px) scale(1); }
          30% { opacity: 0.6; transform: translate(-10px, -22px) scale(1.4); }
          50% { opacity: 1; transform: translate(6px, -14px) scale(0.7); }
          70% { opacity: 0; }
        }
        @keyframes cableSwingLeft {
          0%, 100% { transform: rotate(0deg); }
          25% { transform: rotate(-3deg); }
          75% { transform: rotate(2deg); }
        }
        @keyframes cableSwingRight {
          0%, 100% { transform: rotate(0deg); }
          25% { transform: rotate(3deg); }
          75% { transform: rotate(-2deg); }
        }
        @keyframes sparkFlash {
          0%, 100% { opacity: 0; }
          5% { opacity: 1; }
          10% { opacity: 0; }
          15% { opacity: 0.8; }
          20% { opacity: 0; }
          50% { opacity: 0; }
          55% { opacity: 1; }
          58% { opacity: 0; }
        }
        .cable-left { animation: cableSwingLeft 3s ease-in-out infinite; transform-origin: 120px 80px; }
        .cable-right { animation: cableSwingRight 3s ease-in-out infinite; transform-origin: 280px 80px; }
        .spark-1 { animation: spark1 1.2s ease-in-out infinite; }
        .spark-2 { animation: spark2 1.5s ease-in-out infinite 0.3s; }
        .spark-3 { animation: spark3 1s ease-in-out infinite 0.6s; }
        .spark-flash { animation: sparkFlash 2s ease-in-out infinite; }
      `}</style>

      {/* Left cable with plug */}
      <g className="cable-left">
        {/* Cable */}
        <path
          d="M 50 80 Q 100 85 160 140"
          stroke="#f59e0b"
          strokeWidth="6"
          fill="none"
          strokeLinecap="round"
        />
        <path
          d="M 50 80 Q 100 85 160 140"
          stroke="#fbbf24"
          strokeWidth="2"
          fill="none"
          strokeLinecap="round"
          opacity="0.5"
        />
        {/* Plug body */}
        <rect x="145" y="130" width="30" height="45" rx="4" fill="#374151" stroke="#4b5563" strokeWidth="1.5" />
        <rect x="148" y="125" width="24" height="8" rx="2" fill="#4b5563" />
        {/* Plug prongs */}
        <rect x="153" y="175" width="4" height="16" rx="1" fill="#d4d4d8" />
        <rect x="163" y="175" width="4" height="16" rx="1" fill="#d4d4d8" />
        {/* Cable strain relief */}
        <ellipse cx="160" cy="132" rx="8" ry="4" fill="#1f2937" />
        {/* Broken end sparks */}
        <circle cx="158" cy="190" r="3" fill="#f59e0b" className="spark-1" />
        <circle cx="165" cy="188" r="2.5" fill="#fbbf24" className="spark-2" />
        <circle cx="152" cy="185" r="2" fill="#f59e0b" className="spark-3" />
      </g>

      {/* Right cable with socket */}
      <g className="cable-right">
        {/* Cable */}
        <path
          d="M 350 80 Q 300 85 240 140"
          stroke="#f59e0b"
          strokeWidth="6"
          fill="none"
          strokeLinecap="round"
        />
        <path
          d="M 350 80 Q 300 85 240 140"
          stroke="#fbbf24"
          strokeWidth="2"
          fill="none"
          strokeLinecap="round"
          opacity="0.5"
        />
        {/* Socket body */}
        <rect x="225" y="130" width="30" height="45" rx="4" fill="#374151" stroke="#4b5563" strokeWidth="1.5" />
        <rect x="228" y="125" width="24" height="8" rx="2" fill="#4b5563" />
        {/* Socket holes */}
        <rect x="233" y="175" width="5" height="10" rx="2" fill="#111827" />
        <rect x="243" y="175" width="5" height="10" rx="2" fill="#111827" />
        {/* Cable strain relief */}
        <ellipse cx="240" cy="132" rx="8" ry="4" fill="#1f2937" />
      </g>

      {/* Central spark/electric arc */}
      <g className="spark-flash">
        {/* Lightning bolt */}
        <path
          d="M 195 155 L 200 165 L 193 165 L 198 180 L 202 168 L 196 168 L 205 155 Z"
          fill="#f59e0b"
        />
        <path
          d="M 195 155 L 200 165 L 193 165 L 198 180 L 202 168 L 196 168 L 205 155 Z"
          fill="#fbbf24"
          opacity="0.6"
          transform="translate(2, -2) scale(0.8)"
        />
      </g>

      {/* Scattered spark particles */}
      <circle cx="190" cy="150" r="1.5" fill="#fbbf24" className="spark-1" />
      <circle cx="210" cy="148" r="2" fill="#f59e0b" className="spark-2" />
      <circle cx="200" cy="142" r="1" fill="#fbbf24" className="spark-3" />
      <circle cx="185" cy="160" r="1.5" fill="#f59e0b" className="spark-2" />
      <circle cx="215" cy="158" r="1" fill="#fbbf24" className="spark-1" />

      {/* Electric arc lines */}
      <path d="M 175 175 Q 185 168 195 178" stroke="#f59e0b" strokeWidth="1" fill="none" opacity="0.5" className="spark-flash" />
      <path d="M 205 175 Q 215 168 225 178" stroke="#fbbf24" strokeWidth="1" fill="none" opacity="0.4" className="spark-flash" />

      {/* Ground shadow */}
      <ellipse cx="200" cy="220" rx="80" ry="8" fill="url(#shadow)" />
      <defs>
        <radialGradient id="shadow">
          <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.15" />
          <stop offset="100%" stopColor="#f59e0b" stopOpacity="0" />
        </radialGradient>
      </defs>
    </svg>
  )
}

export default function NotFound() {
  return (
    <>
      <Header />
      <main className="relative min-h-screen flex items-center justify-center overflow-hidden bg-white dark:bg-neutral-950">
        {/* Background grid pattern */}
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage:
              'linear-gradient(rgba(245,158,11,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(245,158,11,0.3) 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }}
        />

        <FloatingParticles />

        {/* Radial glow */}
        <div
          className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(245,158,11,0.08) 0%, transparent 70%)',
          }}
        />

        <div className="relative z-10 text-center px-4 py-32">
          {/* Glitch 404 */}
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="relative mb-4"
          >
            <style>{`
              @keyframes glitch {
                0%, 100% { text-shadow: 2px 0 #f59e0b, -2px 0 #3b82f6; transform: translate(0); }
                2% { text-shadow: -2px 0 #f59e0b, 2px 0 #3b82f6; transform: translate(2px, -1px); }
                4% { text-shadow: 2px 0 #f59e0b, -2px 0 #3b82f6; transform: translate(-2px, 1px); }
                6% { text-shadow: 0 0 transparent; transform: translate(0); }
                20% { text-shadow: 2px 0 #f59e0b, -2px 0 #3b82f6; }
                22% { text-shadow: -3px 0 #f59e0b, 3px 0 #3b82f6; transform: translate(3px, 0); }
                24% { text-shadow: 0 0 transparent; transform: translate(0); }
                50% { text-shadow: 2px 0 #f59e0b, -2px 0 #3b82f6; }
                52% { text-shadow: -1px 2px #f59e0b, 1px -2px #3b82f6; transform: translate(-1px, 2px); }
                54% { text-shadow: 0 0 transparent; transform: translate(0); }
                80% { text-shadow: 2px 0 #f59e0b, -2px 0 #3b82f6; }
                82% { clip-path: inset(30% 0 40% 0); transform: translate(-4px, 0); }
                84% { clip-path: inset(60% 0 10% 0); transform: translate(4px, 0); }
                86% { clip-path: inset(0); transform: translate(0); }
              }
              @keyframes flicker {
                0%, 100% { opacity: 1; }
                10% { opacity: 0.8; }
                12% { opacity: 1; }
                20% { opacity: 0.6; }
                22% { opacity: 1; }
                50% { opacity: 1; }
                52% { opacity: 0.4; }
                54% { opacity: 1; }
                80% { opacity: 1; }
                82% { opacity: 0.7; }
                84% { opacity: 1; }
              }
              .glitch-text {
                animation: glitch 4s ease-in-out infinite, flicker 3s ease-in-out infinite;
              }
            `}</style>
            <h1
              className="glitch-text text-[10rem] sm:text-[14rem] md:text-[18rem] font-black leading-none select-none text-neutral-900 dark:text-white"
              style={{
                WebkitTextStroke: '2px rgba(245, 158, 11, 0.3)',
              }}
            >
              404
            </h1>
          </motion.div>

          {/* SVG Illustration */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mb-8"
          >
            <BrokenCableSVG />
          </motion.div>

          {/* Text */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 text-neutral-900 dark:text-white">
              Page introuvable
            </h2>
            <p className="text-lg max-w-md mx-auto mb-10 text-neutral-500 dark:text-neutral-400">
              La page que vous recherchez n&apos;existe pas ou a été déplacée.
            </p>
          </motion.div>

          {/* Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link
              href="/"
              className="group inline-flex items-center gap-2 px-8 py-3.5 text-base font-semibold text-gray-950 rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-amber-500/25 hover:scale-105 active:scale-95"
              style={{
                background: 'linear-gradient(135deg, #f59e0b, #d97706)',
              }}
            >
              <Home size={18} />
              Retour à l&apos;accueil
            </Link>
            <button
              onClick={() => window.history.back()}
              className="inline-flex items-center gap-2 px-8 py-3.5 text-base font-semibold rounded-lg border transition-all duration-300 hover:scale-105 active:scale-95 text-neutral-900 dark:text-white border-neutral-200 dark:border-neutral-700"
            >
              <ArrowLeft size={18} />
              Page précédente
            </button>
          </motion.div>
        </div>
      </main>
      <Footer />
    </>
  )
}
