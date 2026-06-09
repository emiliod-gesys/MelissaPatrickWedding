"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { getTranslations } from "@/lib/i18n";
import type { Language } from "@/lib/types";

interface InvitationFooterProps {
  language: Language;
  isAdmin: boolean;
}

export function InvitationFooter({ language, isAdmin }: InvitationFooterProps) {
  const t = getTranslations(language).footer;
  const router = useRouter();

  async function handleLogout() {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/login");
    router.refresh();
  }

  return (
    <footer className="border-t border-gold/20 bg-ivory py-16 text-center">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        <p className="font-[family-name:var(--font-display)] text-xl text-charcoal/70 italic">
          {t.love}
        </p>
        <p className="mt-2 font-[family-name:var(--font-display)] text-3xl text-gradient-gold">
          {t.names}
        </p>

        <div className="mt-10 flex flex-col items-center gap-3">
          {isAdmin && (
            <Link
              href="/admin"
              className="text-sm tracking-widest text-sage-dark uppercase transition-colors hover:text-gold"
            >
              {t.admin}
            </Link>
          )}
          <button
            onClick={handleLogout}
            className="text-sm tracking-widest text-charcoal/50 uppercase transition-colors hover:text-charcoal"
          >
            {t.logout}
          </button>
        </div>
      </motion.div>
    </footer>
  );
}
