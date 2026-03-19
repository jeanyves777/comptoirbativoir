"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Megaphone, ChevronLeft, ChevronRight } from "lucide-react";

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */
interface Announcement {
  id: string;
  text: string;
  image?: string;
  link?: string;
}

/* ------------------------------------------------------------------ */
/*  Main Announcements Component                                       */
/* ------------------------------------------------------------------ */
export default function Announcements() {
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [current, setCurrent] = useState(0);
  const [dismissed, setDismissed] = useState(false);
  const [direction, setDirection] = useState(1); // 1 = forward, -1 = backward

  /* Fetch announcements */
  useEffect(() => {
    let cancelled = false;
    async function load() {
      try {
        const res = await fetch("/api/announcements");
        if (!res.ok) return;
        const data: Announcement[] = await res.json();
        if (!cancelled && data.length > 0) {
          setAnnouncements(data);
        }
      } catch {
        // Silently fail — no announcements rendered
      }
    }
    load();
    return () => {
      cancelled = true;
    };
  }, []);

  /* Auto-rotate every 5 seconds */
  const next = useCallback(() => {
    setDirection(1);
    setCurrent((prev) => (prev + 1) % announcements.length);
  }, [announcements.length]);

  const prev = useCallback(() => {
    setDirection(-1);
    setCurrent((prev) => (prev - 1 + announcements.length) % announcements.length);
  }, [announcements.length]);

  useEffect(() => {
    if (announcements.length <= 1) return;
    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, [announcements.length, next]);

  /* Render nothing if no announcements or dismissed */
  if (dismissed || announcements.length === 0) return null;

  const item = announcements[current];

  const slideVariants = {
    enter: (d: number) => ({
      x: d > 0 ? 300 : -300,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (d: number) => ({
      x: d > 0 ? -300 : 300,
      opacity: 0,
    }),
  };

  return (
    <div className="relative w-full bg-gradient-to-r from-orange-600 via-orange-500 to-orange-600 text-white overflow-hidden">
      {/* Animated background pattern */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              "repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(255,255,255,0.1) 10px, rgba(255,255,255,0.1) 20px)",
          }}
          animate={{ x: [0, 28] }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" as const }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-center gap-3 py-2.5 min-h-[44px]">
          {/* Megaphone icon */}
          <Megaphone className="w-4 h-4 flex-shrink-0 opacity-80" />

          {/* Previous button */}
          {announcements.length > 1 && (
            <button
              onClick={prev}
              className="p-0.5 rounded hover:bg-white/20 transition-colors flex-shrink-0"
              aria-label="Annonce précédente"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
          )}

          {/* Announcement content */}
          <div className="relative flex-1 flex items-center justify-center overflow-hidden min-h-[24px]">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={item.id}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.35, ease: "easeInOut" as const }}
                className="absolute flex items-center gap-3"
              >
                {item.image && (
                  <img
                    src={item.image}
                    alt=""
                    className="w-6 h-6 rounded object-cover flex-shrink-0"
                  />
                )}
                {item.link ? (
                  <a
                    href={item.link}
                    className="text-sm font-medium text-center hover:underline underline-offset-2"
                  >
                    {item.text}
                  </a>
                ) : (
                  <span className="text-sm font-medium text-center">
                    {item.text}
                  </span>
                )}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Next button */}
          {announcements.length > 1 && (
            <button
              onClick={next}
              className="p-0.5 rounded hover:bg-white/20 transition-colors flex-shrink-0"
              aria-label="Annonce suivante"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          )}

          {/* Dots indicator */}
          {announcements.length > 1 && (
            <div className="flex items-center gap-1 flex-shrink-0 ml-1">
              {announcements.map((_, i) => (
                <button
                  key={i}
                  onClick={() => {
                    setDirection(i > current ? 1 : -1);
                    setCurrent(i);
                  }}
                  className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                    i === current
                      ? "bg-white w-3"
                      : "bg-white/40 hover:bg-white/60"
                  }`}
                  aria-label={`Annonce ${i + 1}`}
                />
              ))}
            </div>
          )}

          {/* Dismiss button */}
          <button
            onClick={() => setDismissed(true)}
            className="p-1 rounded hover:bg-white/20 transition-colors flex-shrink-0 ml-1"
            aria-label="Fermer les annonces"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
