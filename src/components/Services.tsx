'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import {
  Zap,
  Snowflake,
  BatteryCharging,
  Wrench,
  Monitor,
  Building2,
  ArrowRight,
} from 'lucide-react';
import { services } from '@/lib/data';
import type { LucideIcon } from 'lucide-react';

const iconMap: Record<string, LucideIcon> = {
  Zap,
  Snowflake,
  BatteryCharging,
  Wrench,
  Monitor,
  Building2,
};

interface ServiceCardProps {
  service: (typeof services)[number];
  index: number;
  inView: boolean;
}

function ServiceCard({ service, index, inView }: ServiceCardProps) {
  const Icon = iconMap[service.icon] || Zap;

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.5,
        delay: index * 0.1,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
      className="group"
    >
      <div className="h-full rounded-xl bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 p-6 flex flex-col gap-4">
        {/* Icon */}
        <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-orange-50 text-orange-600 dark:bg-orange-500/10 dark:text-orange-400">
          <Icon className="w-6 h-6" />
        </div>

        {/* Title */}
        <h3 className="text-lg font-semibold text-neutral-900 dark:text-white group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors duration-200">
          {service.title}
        </h3>

        {/* Description */}
        <p className="text-sm leading-relaxed text-neutral-500 dark:text-neutral-400 flex-1">
          {service.shortDescription}
        </p>

        {/* Link */}
        <a
          href={`/services#${service.id}`}
          className="inline-flex items-center gap-1.5 text-sm font-medium text-orange-600 dark:text-orange-400 mt-auto"
        >
          En savoir plus
          <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
        </a>
      </div>
    </motion.div>
  );
}

export default function Services() {
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: '-80px' });

  return (
    <section
      ref={sectionRef}
      className="py-24 section-warm"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-widest border bg-orange-50 text-orange-600 border-orange-200 dark:bg-orange-500/10 dark:text-orange-400 dark:border-orange-500/30 mb-4">
            Nos Services
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-neutral-900 dark:text-white mt-2">
            Des solutions sur mesure
          </h2>
          <p className="mt-4 text-neutral-500 dark:text-neutral-400 max-w-2xl mx-auto text-lg">
            De l&apos;installation au dépannage, nous couvrons l&apos;ensemble
            de vos besoins en électricité industrielle, climatisation et énergie
            de secours.
          </p>
        </motion.div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, i) => (
            <ServiceCard
              key={service.id}
              service={service}
              index={i}
              inView={inView}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
