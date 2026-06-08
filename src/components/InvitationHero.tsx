"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import type { Translations } from "@/lib/i18n";

interface InvitationHeroProps {
  displayName: string;
  extraGuests: number;
  t: Translations;
}

export function InvitationHero({ displayName, extraGuests, t }: InvitationHeroProps) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  const extraMessage =
    extraGuests === 0
      ? t.greeting.extraZero
      : extraGuests === 1
        ? t.greeting.extraOne
        : t.greeting.extraMany(extraGuests);

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
        <div className="absolute inset-0 bg-gradient-to-b from-charcoal/50 via-charcoal/30 to-cream" />
      </motion.div>

      <motion.div
        style={{ opacity }}
        className="relative z-10 flex min-h-screen flex-col items-center justify-center px-6 text-center text-ivory"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="mb-8"
        >
          <Image
            src="/media/iconos/Logo_Blanco.png"
            alt="Logo"
            width={200}
            height={90}
            className="mx-auto h-auto w-48 md:w-56"
            priority
          />
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="mb-2 font-[family-name:var(--font-display)] text-xl font-light tracking-[0.3em] uppercase md:text-2xl"
        >
          {t.hero.together}
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="mb-6 font-[family-name:var(--font-display)] text-5xl font-light md:text-7xl lg:text-8xl"
        >
          Melissa <span className="text-gold-light">&</span> Patrick
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ delay: 0.7, duration: 0.6 }}
          className="mb-8 h-px w-32 bg-gold-light/60"
        />

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9 }}
          className="mb-1 font-[family-name:var(--font-display)] text-2xl md:text-3xl"
        >
          {t.greeting.dear} {displayName}
        </motion.p>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.1 }}
          className="max-w-lg text-base leading-relaxed text-ivory/90 md:text-lg"
        >
          {t.greeting.invited}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.3 }}
          className="mt-8 rounded-2xl border border-gold-light/30 bg-charcoal/30 px-8 py-4 backdrop-blur-sm"
        >
          <p className="text-sm tracking-wide text-gold-light md:text-base">{extraMessage}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="mt-10 space-y-1"
        >
          <p className="font-[family-name:var(--font-display)] text-2xl tracking-widest text-gold-light">
            {t.hero.date}
          </p>
          <p className="text-sm tracking-[0.2em] text-ivory/70 uppercase">{t.hero.location}</p>
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
