"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { getTranslations, WEDDING_DATE } from "@/lib/i18n";
import type { Language } from "@/lib/types";

interface CountdownProps {
  language: Language;
}

function getTimeLeft() {
  const diff = WEDDING_DATE.getTime() - Date.now();
  if (diff <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  }
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

export function Countdown({ language }: CountdownProps) {
  const t = getTranslations(language).countdown;
  const [time, setTime] = useState(getTimeLeft);

  useEffect(() => {
    const id = setInterval(() => setTime(getTimeLeft()), 1000);
    return () => clearInterval(id);
  }, []);

  const units = [
    { value: time.days, label: t.days },
    { value: time.hours, label: t.hours },
    { value: time.minutes, label: t.minutes },
    { value: time.seconds, label: t.seconds },
  ];

  return (
    <section className="py-20 text-center">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mb-10 font-[family-name:var(--font-display)] text-3xl font-light tracking-widest text-charcoal md:text-4xl"
      >
        {t.title}
      </motion.h2>

      <div className="mx-auto flex max-w-2xl justify-center gap-4 px-4 md:gap-8">
        {units.map((unit, i) => (
          <motion.div
            key={unit.label}
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="flex-1"
          >
            <div className="glass rounded-2xl px-3 py-6 md:px-6 md:py-8">
              <motion.span
                key={unit.value}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="block font-[family-name:var(--font-display)] text-4xl font-medium text-gold md:text-5xl"
              >
                {String(unit.value).padStart(2, "0")}
              </motion.span>
              <span className="mt-2 block text-xs tracking-widest text-charcoal/60 uppercase md:text-sm">
                {unit.label}
              </span>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
