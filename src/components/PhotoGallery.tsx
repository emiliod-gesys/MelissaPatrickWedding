"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { getTranslations, PHOTOS } from "@/lib/i18n";
import type { Language } from "@/lib/types";

interface PhotoGalleryProps {
  language: Language;
}

export function PhotoGallery({ language }: PhotoGalleryProps) {
  const t = getTranslations(language).gallery;

  return (
    <section className="py-20">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mb-12 text-center font-[family-name:var(--font-display)] text-3xl font-light tracking-widest text-charcoal md:text-4xl"
      >
        {t.title}
      </motion.h2>

      <div className="columns-2 gap-3 px-4 md:columns-3 md:gap-4 lg:columns-4">
        {PHOTOS.map((src, i) => (
          <motion.div
            key={src}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-30px" }}
            transition={{ delay: (i % 4) * 0.1, duration: 0.5 }}
            className="mb-3 break-inside-avoid overflow-hidden rounded-2xl md:mb-4"
          >
            <motion.div whileHover={{ scale: 1.03 }} transition={{ duration: 0.4 }}>
              <Image
                src={src}
                alt={`Foto ${i + 1}`}
                width={600}
                height={800}
                className="h-auto w-full object-cover"
                sizes="(max-width: 768px) 50vw, 25vw"
              />
            </motion.div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
