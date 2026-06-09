"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { getTranslations, LOVE_STORY_PHOTOS } from "@/lib/i18n";
import type { Language } from "@/lib/types";

interface LoveStoryProps {
  language: Language;
}

function CollagePhoto({
  src,
  alt,
  className,
  delay = 0,
}: {
  src: string;
  alt: string;
  className?: string;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.6, delay }}
      className={`relative overflow-hidden shadow-md shadow-charcoal/10 ${className ?? ""}`}
    >
      <Image src={src} alt={alt} fill className="object-cover" sizes="(max-width: 1024px) 45vw, 220px" />
    </motion.div>
  );
}

export function LoveStory({ language }: LoveStoryProps) {
  const t = getTranslations(language).loveStory;

  return (
    <section className="bg-blush px-4 py-16 md:py-24">
      <div className="mx-auto max-w-6xl">
        <div className="grid items-center gap-8 lg:grid-cols-[1fr_1.1fr_1fr] lg:gap-6">
          {/* Columna izquierda */}
          <div className="hidden flex-col gap-8 lg:flex">
            <CollagePhoto
              src={LOVE_STORY_PHOTOS.topLeft}
              alt="Melissa & Patrick"
              className="aspect-[3/4] w-full max-w-[220px]"
              delay={0.1}
            />
            <CollagePhoto
              src={LOVE_STORY_PHOTOS.bottomLeft}
              alt="Melissa & Patrick"
              className="aspect-[3/4] w-full max-w-[220px] translate-x-8"
              delay={0.2}
            />
          </div>

          {/* Centro */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="order-first px-2 text-center lg:order-none lg:px-6"
          >
            <h2 className="mb-8 font-[family-name:var(--font-display)] text-3xl font-light text-sage-dark md:text-4xl lg:text-[2.75rem]">
              {t.title}
            </h2>
            <p className="text-sm leading-relaxed font-light text-charcoal/70 md:text-base md:leading-loose">
              {t.paragraph}
            </p>
          </motion.div>

          {/* Columna derecha */}
          <div className="hidden flex-col gap-8 lg:flex">
            <CollagePhoto
              src={LOVE_STORY_PHOTOS.topRight}
              alt="Melissa & Patrick"
              className="aspect-[3/4] w-full max-w-[220px] ml-auto"
              delay={0.15}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.25 }}
              className="relative ml-auto aspect-[16/10] w-full max-w-[280px] overflow-hidden shadow-md shadow-charcoal/10"
            >
              <Image
                src={LOVE_STORY_PHOTOS.bottomRightLeft}
                alt=""
                fill
                className="object-cover"
                sizes="280px"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-black/5" />
              <div className="absolute inset-y-0 right-0 w-[58%]">
                <Image
                  src={LOVE_STORY_PHOTOS.bottomRightRight}
                  alt="Melissa & Patrick"
                  fill
                  className="object-cover object-left"
                  sizes="160px"
                />
                <div className="absolute inset-y-0 left-0 w-12 bg-gradient-to-r from-blush/0 via-blush/30 to-transparent" />
              </div>
            </motion.div>
          </div>
        </div>

        {/* Móvil: rejilla de fotos */}
        <div className="mt-10 grid grid-cols-2 gap-3 sm:gap-4 lg:hidden">
          {[
            LOVE_STORY_PHOTOS.topLeft,
            LOVE_STORY_PHOTOS.topRight,
            LOVE_STORY_PHOTOS.bottomLeft,
            LOVE_STORY_PHOTOS.bottomRightRight,
          ].map((src, i) => (
            <CollagePhoto
              key={src}
              src={src}
              alt="Melissa & Patrick"
              className="aspect-[3/4] w-full"
              delay={i * 0.08}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
