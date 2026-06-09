"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { getTranslations, GIFT_PHOTOS } from "@/lib/i18n";
import type { Language } from "@/lib/types";

interface GiftRegistryProps {
  language: Language;
}

function BankDetails({
  title,
  fields,
}: {
  title: string;
  fields: { label: string; value: string }[];
}) {
  return (
    <div className="flex h-full min-h-[18rem] flex-col items-center justify-center bg-ivory px-8 py-12 text-center md:min-h-[22rem] md:px-12">
      <h3 className="mb-8 font-[family-name:var(--font-display)] text-2xl font-light text-sage-dark md:text-3xl">
        {title}
      </h3>
      <dl className="space-y-4 text-sm font-light text-charcoal/70 md:text-base">
        {fields.map((field) => (
          <div key={field.label}>
            <dt className="mb-0.5">{field.label}</dt>
            <dd className="text-charcoal/85">{field.value}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}

function GiftPhoto({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="relative min-h-[18rem] md:min-h-[22rem]">
      <Image src={src} alt={alt} fill className="object-cover" sizes="(max-width: 1024px) 100vw, 50vw" />
    </div>
  );
}

export function GiftRegistry({ language }: GiftRegistryProps) {
  const t = getTranslations(language).gifts;

  return (
    <section className="bg-cream">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mx-auto max-w-3xl px-6 py-20 text-center md:py-24"
      >
        <p className="mb-4 text-sm font-light tracking-wide text-charcoal/55 md:text-base">
          {t.label}
        </p>
        <h2 className="mb-10 font-[family-name:var(--font-display)] text-4xl font-light text-sage-dark md:text-5xl">
          {t.title}
        </h2>
        <div className="space-y-6 text-sm leading-relaxed font-light text-charcoal/70 md:text-base md:leading-loose">
          <p>{t.paragraph1}</p>
          <p>{t.paragraph2}</p>
        </div>
      </motion.div>

      <div className="grid lg:grid-cols-2">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <GiftPhoto src={GIFT_PHOTOS.topLeft} alt="Melissa & Patrick" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
        >
          <BankDetails title={t.internationalTitle} fields={t.international} />
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.15 }}
          className="lg:order-3"
        >
          <BankDetails title={t.localTitle} fields={t.local} />
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="lg:order-4"
        >
          <GiftPhoto src={GIFT_PHOTOS.bottomRight} alt="Melissa & Patrick" />
        </motion.div>
      </div>
    </section>
  );
}
