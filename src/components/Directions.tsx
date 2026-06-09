"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { getTranslations, DIRECTIONS_BG, VENUE_COORDS } from "@/lib/i18n";
import type { Language } from "@/lib/types";

interface DirectionsProps {
  language: Language;
}

const { lat, lng } = VENUE_COORDS;
const mapsQuery = `${lat},${lng}`;
const embedUrl = `https://maps.google.com/maps?q=${mapsQuery}&z=16&hl=es&output=embed`;
const openMapsUrl = `https://www.google.com/maps/search/?api=1&query=${mapsQuery}`;
const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${mapsQuery}`;

export function Directions({ language }: DirectionsProps) {
  const t = getTranslations(language).directions;

  return (
    <section className="relative overflow-hidden px-4 py-20 md:py-24">
      <div className="absolute inset-0">
        <Image
          src={DIRECTIONS_BG}
          alt=""
          fill
          className="scale-105 object-cover blur-md"
          sizes="100vw"
          priority={false}
        />
        <div className="absolute inset-0 bg-cream/70" />
        <div className="absolute inset-0 bg-gradient-to-b from-ivory/40 via-cream/50 to-cream/80" />
      </div>

      <div className="relative z-10 mx-auto max-w-4xl text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-4 font-[family-name:var(--font-display)] text-3xl font-light text-sage-dark md:text-4xl"
        >
          {t.title}
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="mx-auto mb-3 max-w-2xl text-sm leading-relaxed font-light text-charcoal/75 md:text-base"
        >
          {t.subtitle}
        </motion.p>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.15 }}
          className="mb-10 text-sm tracking-wide text-charcoal/60"
        >
          {t.address}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="overflow-hidden rounded-2xl border border-gold/25 bg-ivory/90 shadow-xl shadow-charcoal/10 backdrop-blur-sm"
        >
          <iframe
            title={t.mapTitle}
            src={embedUrl}
            className="h-[320px] w-full md:h-[420px]"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row"
        >
          <a
            href={openMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full border border-gold/40 bg-ivory/95 px-8 py-3 text-sm tracking-widest text-sage-dark uppercase backdrop-blur-sm transition-colors hover:bg-gold/10"
          >
            {t.openInMaps}
          </a>
          <a
            href={directionsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full bg-gradient-to-r from-gold to-gold-light px-8 py-3 text-sm font-medium tracking-widest text-ivory uppercase shadow-md shadow-gold/20 transition-opacity hover:opacity-90"
          >
            {t.getDirections}
          </a>
        </motion.div>
      </div>
    </section>
  );
}
