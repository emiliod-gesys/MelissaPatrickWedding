"use client";

import { motion } from "framer-motion";
import { getTranslations } from "@/lib/i18n";
import type { Language } from "@/lib/types";

interface DressCodeProps {
  language: Language;
}

function FloralAccent() {
  return (
    <svg
      viewBox="0 0 64 32"
      className="mx-auto mb-8 h-8 w-14 text-sage/60"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.2"
      aria-hidden
    >
      <path d="M8 16h48" strokeLinecap="round" />
      <ellipse cx="32" cy="14" rx="4" ry="6" />
      <path d="M32 20v6" strokeLinecap="round" />
      <circle cx="20" cy="15" r="2" fill="currentColor" stroke="none" opacity="0.5" />
      <circle cx="44" cy="15" r="2" fill="currentColor" stroke="none" opacity="0.5" />
    </svg>
  );
}

export function DressCode({ language }: DressCodeProps) {
  const t = getTranslations(language).dressCode;

  return (
    <section className="bg-ivory px-6 py-20 md:py-24">
      <div className="mx-auto max-w-3xl text-center">
        <FloralAccent />

        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-14 font-[family-name:var(--font-display)] text-4xl font-light text-sage-dark md:text-5xl"
        >
          {t.title}
        </motion.h2>

        <div className="grid gap-10 md:grid-cols-2 md:gap-0">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="md:border-r md:border-charcoal/15 md:pr-10"
          >
            <h3 className="mb-6 font-[family-name:var(--font-display)] text-2xl font-light text-sage-dark md:text-3xl">
              {t.womenTitle}
            </h3>
            <ul className="space-y-2 text-sm font-light text-charcoal/65 md:text-base">
              {t.women.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="md:pl-10"
          >
            <h3 className="mb-6 font-[family-name:var(--font-display)] text-2xl font-light text-sage-dark md:text-3xl">
              {t.menTitle}
            </h3>
            <ul className="space-y-2 text-sm font-light text-charcoal/65 md:text-base">
              {t.men.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
