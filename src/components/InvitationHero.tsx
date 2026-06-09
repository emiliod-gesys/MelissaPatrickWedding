"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { WeddingLogo } from "./WeddingLogo";
import type { Language } from "@/lib/types";
import { getExtraGuestsMessage, getTranslations, HERO_PHOTOS } from "@/lib/i18n";

interface InvitationHeroProps {
  displayName: string;
  extraGuests: number;
  language: Language;
}

function BotanicalDecor() {
  return (
    <div
      className="pointer-events-none absolute inset-0 overflow-hidden opacity-[0.14]"
      aria-hidden
    >
      <svg
        viewBox="0 0 400 600"
        className="absolute -right-8 bottom-0 h-[85%] w-auto text-charcoal"
        fill="currentColor"
      >
        <path d="M320 580 C280 520 300 420 240 380 C180 340 120 360 80 300 C50 255 60 200 30 150 C70 180 110 160 150 200 C190 240 220 280 260 260 C300 240 310 180 350 120 C330 200 340 280 380 340 C360 400 340 480 320 580 Z" />
        <path d="M60 80 C90 120 70 180 110 220 C150 260 200 240 230 280 C200 200 160 140 100 100 C80 85 70 70 60 80 Z" opacity="0.6" />
        <ellipse cx="200" cy="450" rx="120" ry="8" opacity="0.3" />
      </svg>
    </div>
  );
}

export function InvitationHero({ displayName, extraGuests, language }: InvitationHeroProps) {
  const t = getTranslations(language);
  const extraMessage = getExtraGuestsMessage(language, extraGuests);

  return (
    <section className="relative min-h-screen overflow-hidden">
      <div className="grid min-h-screen lg:grid-cols-2">
        <div className="relative flex min-h-[72vh] flex-col items-center justify-center bg-[#5a727a] px-6 py-16 text-center text-ivory lg:min-h-screen lg:px-10 lg:py-24">
          <BotanicalDecor />

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: "easeOut" }}
            className="relative z-10 flex max-w-md flex-col items-center"
          >
            <WeddingLogo
              variant="onDark"
              width={220}
              height={99}
              className="mx-auto h-auto w-48 md:w-56"
              priority
            />

            <h1 className="mt-6 font-[family-name:var(--font-body)] text-2xl font-medium tracking-wide md:text-3xl">
              {t.hero.weddingTitle}
            </h1>

            <p className="mt-5 font-[family-name:var(--font-display)] text-xl font-light md:text-2xl">
              {t.greeting.dear} {displayName}
            </p>

            <p className="mt-3 max-w-xs text-sm leading-relaxed font-light text-ivory/90 md:max-w-sm md:text-base">
              {t.greeting.invited}
            </p>

            <p className="mt-5 max-w-xs border-t border-ivory/25 pt-5 text-xs leading-relaxed font-light text-ivory/85 md:text-sm">
              {extraMessage}
            </p>

            <p className="mt-6 font-[family-name:var(--font-body)] text-base tracking-wide md:text-lg">
              {t.hero.dateLong}
            </p>

            <p className="mt-2 max-w-xs text-[0.65rem] leading-relaxed tracking-[0.12em] text-ivory/75 uppercase md:text-xs">
              {t.hero.location}
            </p>

            <a
              href="#rsvp"
              className="mt-10 flex h-16 w-16 items-center justify-center rounded-full border-2 border-ivory text-xs tracking-[0.2em] transition-colors hover:bg-ivory/10"
            >
              {t.hero.rsvp}
            </a>
          </motion.div>
        </div>

        <div className="relative min-h-[45vh] lg:min-h-screen">
          <Image
            src={HERO_PHOTOS.beach}
            alt="Melissa & Patrick"
            fill
            className="object-cover object-center"
            priority
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.4, duration: 0.8 }}
        className="absolute top-[min(72vh,520px)] left-1/2 z-20 h-72 w-48 -translate-x-1/2 -translate-y-1/2 shadow-2xl lg:top-1/2 lg:h-[min(52vh,480px)] lg:w-[min(28vw,280px)]"
      >
        <Image
          src={HERO_PHOTOS.rings}
          alt=""
          fill
          className="object-cover"
          sizes="280px"
          priority
        />
      </motion.div>
    </section>
  );
}
