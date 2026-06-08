"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { TIMELINE_ICONS } from "@/lib/i18n";
import type { Translations } from "@/lib/i18n";

interface TimelineProps {
  t: Translations["timeline"];
}

const EVENTS = [
  { key: "photos" as const, icon: TIMELINE_ICONS.photos },
  { key: "ceremony" as const, icon: TIMELINE_ICONS.ceremony },
  { key: "cocktail" as const, icon: TIMELINE_ICONS.cocktail },
  { key: "dinner" as const, icon: TIMELINE_ICONS.dinner },
  { key: "toast" as const, icon: TIMELINE_ICONS.toast },
  { key: "party" as const, icon: TIMELINE_ICONS.party },
];

export function Timeline({ t }: TimelineProps) {
  return (
    <section className="py-20">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mb-16 text-center font-[family-name:var(--font-display)] text-3xl font-light tracking-widest text-charcoal md:text-4xl"
      >
        {t.title}
      </motion.h2>

      <div className="relative mx-auto max-w-lg px-6">
        <div className="absolute top-0 bottom-0 left-1/2 w-px -translate-x-1/2 bg-gradient-to-b from-transparent via-gold/40 to-transparent" />

        {EVENTS.map((event, i) => (
          <motion.div
            key={event.key}
            initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ delay: i * 0.1, duration: 0.6 }}
            className={`relative mb-12 flex items-center gap-6 ${
              i % 2 === 0 ? "flex-row" : "flex-row-reverse"
            }`}
          >
            <div className={`flex-1 ${i % 2 === 0 ? "text-right" : "text-left"}`}>
              <h3 className="font-[family-name:var(--font-display)] text-xl text-charcoal">
                {t[event.key]}
              </h3>
              <p className="mt-1 text-sm tracking-widest text-gold">
                {t[`${event.key}Time` as keyof typeof t]}
              </p>
            </div>

            <motion.div
              whileHover={{ scale: 1.1, rotate: 5 }}
              className="relative z-10 flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-ivory shadow-lg shadow-gold/20"
            >
              <Image
                src={event.icon}
                alt={t[event.key]}
                width={36}
                height={36}
                className="h-9 w-9 object-contain"
              />
            </motion.div>

            <div className="flex-1" />
          </motion.div>
        ))}
      </div>
    </section>
  );
}
