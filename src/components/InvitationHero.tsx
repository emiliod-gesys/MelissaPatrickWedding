"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { WeddingLogo } from "./WeddingLogo";
import type { Language } from "@/lib/types";
import { getExtraGuestsMessage, getTranslations } from "@/lib/i18n";

interface InvitationHeroProps {
  displayName: string;
  extraGuests: number;
  language: Language;
}

export function InvitationHero({ displayName, extraGuests, language }: InvitationHeroProps) {
  const t = getTranslations(language);
  const extraMessage = getExtraGuestsMessage(language, extraGuests);
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section ref={ref} className="relative min-h-screen overflow-hidden">
      <motion.div style={{ y }} className="absolute inset-0">
        <Image
          src="/media/fotos/IMG_1471.jpeg"
          alt="Melissa & Patrick"
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
      </motion.div>

      <motion.div
        style={{ opacity }}
        className="hero-text-shadow relative z-10 flex min-h-screen flex-col items-center justify-center px-6 text-center text-ivory"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="mb-8"
        >
          <WeddingLogo
            variant="onDark"
            width={300}
            height={135}
            className="hero-logo-shadow mx-auto h-auto w-72 md:w-84"
            priority
          />
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="mb-2 font-[family-name:var(--font-display)] text-3xl font-light tracking-[0.3em] uppercase md:text-4xl"
        >
          {t.hero.together}
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="mb-6 font-[family-name:var(--font-display)] text-7xl font-light md:text-[6.75rem] lg:text-[9rem]"
        >
          Melissa <span className="text-gold-light">&</span> Patrick
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ delay: 0.7, duration: 0.6 }}
          className="mb-8 h-px w-48 bg-gold-light/60"
        />

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9 }}
          className="mb-1 font-[family-name:var(--font-display)] text-4xl md:text-5xl"
        >
          {t.greeting.dear} {displayName}
        </motion.p>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.1 }}
          className="max-w-2xl text-xl leading-relaxed text-ivory md:text-2xl"
        >
          {t.greeting.invited}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.3 }}
          className="mt-8 rounded-2xl border border-white/25 bg-charcoal/45 px-10 py-5 backdrop-blur-sm"
        >
          <p className="text-base tracking-wide text-ivory md:text-xl">{extraMessage}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="mt-10 space-y-1"
        >
          <p className="font-[family-name:var(--font-display)] text-4xl tracking-widest text-ivory">
            {t.hero.date}
          </p>
          <p className="max-w-xl text-sm leading-relaxed tracking-[0.15em] text-ivory uppercase md:text-base">
            {t.hero.location}
          </p>
        </motion.div>

        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="absolute bottom-10"
        >
          <div className="h-10 w-6 rounded-full border-2 border-ivory/40 p-1">
            <div className="mx-auto h-2 w-1 rounded-full bg-ivory/60" />
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
