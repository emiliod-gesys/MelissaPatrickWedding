"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { WeddingLogo } from "./WeddingLogo";
import type { Language } from "@/lib/types";
import { getGuestCapacityMessage, getTranslations, HERO_PHOTOS } from "@/lib/i18n";

interface InvitationHeroProps {
  displayName: string;
  extraGuests: number;
  isConyugal: boolean;
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

function RingsPhoto({
  className,
  sizes,
  squareCrop = false,
}: {
  className?: string;
  sizes: string;
  squareCrop?: boolean;
}) {
  return (
    <Image
      src={HERO_PHOTOS.rings}
      alt=""
      fill
      className={
        squareCrop
          ? "scale-110 object-cover object-bottom"
          : "object-cover object-bottom"
      }
      sizes={sizes}
      priority
    />
  );
}

export function InvitationHero({
  displayName,
  extraGuests,
  isConyugal,
  language,
}: InvitationHeroProps) {
  const t = getTranslations(language);
  const extraMessage = getGuestCapacityMessage(language, extraGuests, isConyugal);

  return (
    <section className="relative overflow-hidden">
      {/* Móvil: layout vertical estilo referencia Wix */}
      <div className="lg:hidden">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="bg-cream px-6 py-10 text-center"
        >
          <WeddingLogo
            variant="onLight"
            width={260}
            height={117}
            className="mx-auto h-auto w-56"
            priority
          />

          <p className="mt-8 font-[family-name:var(--font-display)] text-2xl font-light text-charcoal">
            {t.greeting.dear} {displayName}
          </p>

          <p className="mx-auto mt-3 max-w-sm text-sm leading-relaxed font-light text-charcoal/75">
            {t.greeting.invited}
          </p>

          <p className="mx-auto mt-4 max-w-sm border-t border-gold/25 pt-4 text-sm leading-relaxed font-light text-charcoal/70">
            {extraMessage}
          </p>

          <p className="mx-auto mt-4 max-w-xs text-[0.65rem] leading-relaxed tracking-[0.12em] text-charcoal/55 uppercase">
            {t.hero.location}
          </p>
        </motion.div>

        <div className="relative bg-[#5a727a] px-6 pt-10 pb-28 text-center text-ivory">
          <BotanicalDecor />

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="relative z-10"
          >
            <h1 className="font-[family-name:var(--font-body)] text-2xl font-medium tracking-wide">
              {t.hero.weddingTitle}
            </h1>

            <p className="mt-4 font-[family-name:var(--font-body)] text-base tracking-wide">
              {t.hero.dateLong}
            </p>

            <a
              href="#rsvp"
              className="mx-auto mt-8 flex h-16 w-16 items-center justify-center rounded-full border-2 border-ivory text-xs tracking-[0.2em] transition-colors hover:bg-ivory/10"
            >
              {t.hero.rsvp}
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.35, duration: 0.7 }}
            className="absolute bottom-0 left-1/2 z-30 aspect-square h-44 w-44 -translate-x-1/2 translate-y-1/2 overflow-hidden shadow-2xl"
          >
            <RingsPhoto sizes="176px" squareCrop />
          </motion.div>
        </div>

        <div className="relative min-h-[52vh]">
          <Image
            src={HERO_PHOTOS.beach}
            alt="Melissa & Patrick"
            fill
            className="object-cover object-center"
            priority
            sizes="100vw"
          />
        </div>
      </div>

      {/* Escritorio: split-screen horizontal */}
      <div className="relative hidden min-h-dvh lg:grid lg:grid-cols-2">
        <div className="relative flex min-h-dvh flex-col items-center justify-center bg-[#5a727a] px-10 py-24 text-center text-ivory">
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
              className="mx-auto h-auto w-56"
              priority
            />

            <h1 className="mt-6 font-[family-name:var(--font-body)] text-3xl font-medium tracking-wide">
              {t.hero.weddingTitle}
            </h1>

            <p className="mt-5 font-[family-name:var(--font-display)] text-2xl font-light">
              {t.greeting.dear} {displayName}
            </p>

            <p className="mt-3 max-w-sm text-base leading-relaxed font-light text-ivory/90">
              {t.greeting.invited}
            </p>

            <p className="mt-5 max-w-sm border-t border-ivory/25 pt-5 text-sm leading-relaxed font-light text-ivory/85">
              {extraMessage}
            </p>

            <p className="mt-6 font-[family-name:var(--font-body)] text-lg tracking-wide">
              {t.hero.dateLong}
            </p>

            <p className="mt-2 max-w-xs text-xs leading-relaxed tracking-[0.12em] text-ivory/75 uppercase">
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

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="pointer-events-none absolute top-1/2 left-1/2 z-20 h-[min(52dvh,480px)] w-[min(28vw,280px)] -translate-x-1/2 -translate-y-1/2 shadow-2xl"
        >
          <RingsPhoto sizes="280px" />
        </motion.div>
      </div>
    </section>
  );
}
