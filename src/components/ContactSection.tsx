"use client";

import { motion } from "framer-motion";
import { getTranslations } from "@/lib/i18n";
import type { Language } from "@/lib/types";

interface ContactSectionProps {
  language: Language;
}

export function ContactSection({ language }: ContactSectionProps) {
  const t = getTranslations(language).contact;

  return (
    <section className="bg-[#E9C9BD] px-6 py-16 text-center md:py-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="mx-auto max-w-3xl"
      >
        <h2 className="font-[family-name:var(--font-display)] text-4xl font-light text-[#5A6D78] md:text-5xl">
          {t.title}
        </h2>

        <p className="mt-10 font-[family-name:var(--font-body)] text-sm font-medium tracking-wide text-charcoal md:text-base">
          {t.subtitle}
        </p>

        <div className="mt-8 flex flex-col items-center justify-center gap-6 sm:flex-row sm:gap-16 md:gap-24">
          {t.contacts.map((contact) => (
            <a
              key={contact.name}
              href={`tel:${contact.phoneHref}`}
              className="font-[family-name:var(--font-body)] text-sm text-charcoal transition-colors hover:text-[#5A6D78] md:text-base"
            >
              <span className="font-medium">{contact.name}:</span> {contact.phoneDisplay}
            </a>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
