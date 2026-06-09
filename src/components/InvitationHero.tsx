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
    <section className="relative min-h-dvh overflow-hidden">
      <div className="grid min-h-dvh grid-cols-2">
        <div className="relative flex min-h-dvh flex-col justify-between bg-[#5a727a] px-2 py-4 text-center text-ivory sm:px-4 lg:px-10 lg:py-12">
          <BotanicalDecor />

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: "easeOut" }}
            className="relative z-10 flex flex-col items-center pr-[13vw] lg:pr-0"
          >
            <WeddingLogo
              variant="onDark"
              width={220}
              height={99}
              className="mx-auto h-auto w-[4.5rem] sm:w-32 lg:w-56"
              priority
            />

            <h1 className="mt-2 font-[family-name:var(--font-body)] text-[0.7rem] font-medium leading-tight tracking-wide sm:mt-4 sm:text-lg lg:text-3xl">
              {t.hero.weddingTitle}
            </h1>

            <p className="mt-1.5 font-[family-name:var(--font-display)] text-[0.65rem] font-light leading-snug sm:mt-3 sm:text-base lg:text-2xl">
              {t.greeting.dear} {displayName}
            </p>

            <p className="mt-1.5 line-clamp-3 text-[0.55rem] leading-snug font-light text-ivory/90 sm:mt-2 sm:text-xs sm:leading-relaxed lg:max-w-sm lg:text-base">
              {t.greeting.invited}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.15, ease: "easeOut" }}
            className="relative z-10 flex flex-col items-center pr-[13vw] pb-1 lg:pr-0 lg:pb-0"
          >
            <p className="line-clamp-2 border-t border-ivory/25 pt-2 text-[0.5rem] leading-snug font-light text-ivory/85 sm:text-xs lg:text-sm">
              {extraMessage}
            </p>

            <p className="mt-2 text-[0.55rem] leading-snug tracking-wide sm:mt-3 sm:text-sm lg:text-lg">
              {t.hero.dateLong}
            </p>

            <p className="mt-1 line-clamp-3 text-[0.45rem] leading-tight tracking-[0.08em] text-ivory/75 uppercase sm:text-[0.65rem] sm:tracking-[0.12em] lg:text-xs">
              {t.hero.location}
            </p>

            <a
              href="#rsvp"
              className="mt-2.5 flex h-9 w-9 items-center justify-center rounded-full border-2 border-ivory text-[0.45rem] tracking-[0.15em] transition-colors hover:bg-ivory/10 sm:mt-4 sm:h-12 sm:w-12 sm:text-[0.6rem] lg:mt-8 lg:h-16 lg:w-16 lg:text-xs lg:tracking-[0.2em]"
            >
              {t.hero.rsvp}
            </a>
          </motion.div>
        </div>

        <div className="relative min-h-dvh">
          <Image
            src={HERO_PHOTOS.beach}
            alt="Melissa & Patrick"
            fill
            className="object-cover object-center"
            priority
            sizes="50vw"
          />
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.4, duration: 0.8 }}
        className="pointer-events-none absolute top-1/2 left-1/2 z-20 h-[min(40dvh,320px)] w-[min(24vw,280px)] -translate-x-1/2 -translate-y-1/2 shadow-2xl sm:h-[min(46dvh,400px)] sm:w-[min(26vw,280px)] lg:h-[min(52dvh,480px)] lg:w-[min(28vw,280px)]"
      >
        <Image
          src={HERO_PHOTOS.rings}
          alt=""
          fill
          className="object-cover"
          sizes="(max-width: 1024px) 24vw, 280px"
          priority
        />
      </motion.div>
    </section>
  );
}
