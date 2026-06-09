"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { getTranslations, TIMELINE_ICONS } from "@/lib/i18n";
import type { Language } from "@/lib/types";

interface TimelineProps {
  language: Language;
}

const EVENTS = [
  { key: "cocktail" as const, icon: TIMELINE_ICONS.cocktail },
  { key: "ceremony" as const, icon: TIMELINE_ICONS.ceremony },
  { key: "photos" as const, icon: TIMELINE_ICONS.photos },
  { key: "toast" as const, icon: TIMELINE_ICONS.toast },
  { key: "dinner" as const, icon: TIMELINE_ICONS.dinner },
  { key: "party" as const, icon: TIMELINE_ICONS.party },
] as const;

export function Timeline({ language }: TimelineProps) {
  const t = getTranslations(language).timeline;

  return (
    <section className="bg-ivory px-4 py-20 md:py-24">
      <div className="mx-auto max-w-4xl text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-6 font-[family-name:var(--font-body)] text-2xl font-normal tracking-[0.35em] text-sage-dark uppercase md:text-3xl"
        >
          {t.title}
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="mx-auto mb-16 max-w-2xl text-sm leading-relaxed font-light text-charcoal/65 md:text-base"
        >
          {t.subtitle}
        </motion.p>

        <div className="grid grid-cols-2 gap-x-6 gap-y-14 sm:grid-cols-3 sm:gap-x-10 sm:gap-y-16">
          {EVENTS.map((event, i) => (
            <motion.div
              key={event.key}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ delay: i * 0.08, duration: 0.5 }}
              className="flex flex-col items-center"
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
                className="mb-5 flex h-24 w-24 items-center justify-center md:h-28 md:w-28"
              >
                <Image
                  src={event.icon}
                  alt={t[event.key]}
                  width={112}
                  height={112}
                  className="h-full w-full object-contain opacity-80"
                />
              </motion.div>

              <h3 className="mb-1.5 text-sm font-normal tracking-wide text-charcoal/80 md:text-base">
                {t[event.key]}
              </h3>
              <p className="text-sm font-light tracking-wider text-charcoal/50 md:text-base">
                {t[`${event.key}Time`]}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
