"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { getTranslations, STORY_PHOTO } from "@/lib/i18n";
import type { Language } from "@/lib/types";

interface OurStoryProps {
  language: Language;
}

function FloralAccent() {
  return (
    <svg
      viewBox="0 0 80 48"
      className="mx-auto h-10 w-16 text-sage/70"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.2"
      aria-hidden
    >
      <path d="M40 44V20" strokeLinecap="round" />
      <path d="M40 28c-6-8-14-10-18-6s-2 12 6 14" strokeLinecap="round" />
      <path d="M40 24c6-6 12-8 16-4s4 10-2 12" strokeLinecap="round" />
      <path d="M40 32c-4-6-8-8-12-6" strokeLinecap="round" />
      <path d="M40 30c4-5 8-7 12-5" strokeLinecap="round" />
      <circle cx="22" cy="20" r="2" fill="currentColor" stroke="none" opacity="0.6" />
      <circle cx="58" cy="18" r="1.5" fill="currentColor" stroke="none" opacity="0.5" />
      <circle cx="34" cy="14" r="1.5" fill="currentColor" stroke="none" opacity="0.5" />
      <circle cx="48" cy="12" r="1.5" fill="currentColor" stroke="none" opacity="0.5" />
    </svg>
  );
}

export function OurStory({ language }: OurStoryProps) {
  const t = getTranslations(language).story;

  return (
    <section className="bg-ivory">
      <div className="grid min-h-[32rem] lg:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, x: -24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7 }}
          className="relative min-h-[22rem] lg:min-h-full"
        >
          <Image
            src={STORY_PHOTO}
            alt="Melissa & Patrick"
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="flex flex-col items-center justify-center px-8 py-14 text-center md:px-14 md:py-20 lg:px-16"
        >
          <h2 className="mb-10 font-[family-name:var(--font-display)] text-3xl font-light tracking-wide text-sage-dark md:text-4xl">
            {t.title}
          </h2>

          <div className="max-w-md space-y-6 text-sm leading-relaxed font-light text-charcoal/75 md:text-base md:leading-loose">
            {t.paragraphs.map((paragraph, i) => (
              <motion.p
                key={i}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.15 + i * 0.1 }}
              >
                {paragraph}
              </motion.p>
            ))}
          </div>

          <div className="my-10">
            <FloralAccent />
          </div>

          <div className="space-y-2 text-sm font-light text-charcoal/70 md:text-base">
            <p>{t.cta}</p>
            <p className="font-[family-name:var(--font-display)] text-xl text-sage-dark md:text-2xl">
              {t.date}
            </p>
            <p className="leading-relaxed">{t.location}</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
