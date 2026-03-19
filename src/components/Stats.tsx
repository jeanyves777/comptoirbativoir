'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { Users, FolderOpen, HeadphonesIcon, HardHat } from 'lucide-react';
import { companyInfo } from '@/lib/data';

/* ------------------------------------------------------------------ */
/*  Animated counter hook                                              */
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
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(eased * target));
      if (progress < 1) requestAnimationFrame(tick);
    }

    requestAnimationFrame(tick);
  }, [inView, target, duration]);

  return count;
}

/* ------------------------------------------------------------------ */
/*  Stat card                                                          */
/* ------------------------------------------------------------------ */
interface StatCardProps {
  icon: React.ReactNode;
  value: number;
  label: string;
  suffix?: string;
  index: number;
  inView: boolean;
}

function StatCard({ icon, value, label, suffix = '+', index, inView }: StatCardProps) {
  const count = useCountUp(value, inView);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.5,
        delay: index * 0.12,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
      className="rounded-xl bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 shadow-sm dark:shadow-none p-6 sm:p-8 flex flex-col items-center gap-3"
    >
      {/* Icon */}
      <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-orange-50 text-orange-600 dark:bg-orange-500/10 dark:text-orange-400">
        {icon}
      </div>

      {/* Number */}
      <div className="text-3xl sm:text-4xl font-extrabold text-neutral-900 dark:text-white tabular-nums tracking-tight">
        {count.toLocaleString('fr-FR')}
        <span className="text-orange-500">{suffix}</span>
      </div>

      {/* Label */}
      <span className="text-neutral-500 dark:text-neutral-400 text-sm font-medium uppercase tracking-widest">
        {label}
      </span>
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/*  Stats section                                                      */
/* ------------------------------------------------------------------ */
const stats = [
  { icon: <Users className="w-6 h-6" />, value: companyInfo.stats.clients, label: 'Clients' },
  { icon: <FolderOpen className="w-6 h-6" />, value: companyInfo.stats.projects, label: 'Projets' },
  { icon: <HeadphonesIcon className="w-6 h-6" />, value: companyInfo.stats.support, label: 'Heures de support' },
  { icon: <HardHat className="w-6 h-6" />, value: companyInfo.stats.workers, label: 'Ouvriers' },
];

export default function Stats() {
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: '-100px' });

  return (
    <section
      ref={sectionRef}
      className="relative py-20 sm:py-24 section-warm"
    >
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-14"
        >
          <span className="inline-block px-4 py-1.5 rounded-full border border-orange-500/20 bg-orange-50 text-orange-600 dark:bg-orange-500/10 dark:text-orange-400 dark:border-orange-500/20 text-xs font-semibold uppercase tracking-widest mb-4">
            En chiffres
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-neutral-900 dark:text-white">
            Notre impact sur le terrain
          </h2>
          <p className="mt-3 text-neutral-500 dark:text-neutral-400 max-w-md mx-auto">
            Des résultats concrets qui témoignent de notre engagement et de notre expertise.
          </p>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
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
    </section>
  );
}
