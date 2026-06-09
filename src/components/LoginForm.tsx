"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { FloatingPetals } from "./FloatingPetals";
import { LoginLanguageToggle } from "./LoginLanguageToggle";
import { LoginPhotoDecor } from "./LoginPhotoDecor";
import { WeddingLogo } from "./WeddingLogo";
import { getTranslations } from "@/lib/i18n";
import type { Language } from "@/lib/types";

const LOGIN_LANGUAGE_KEY = "login-language";

export function LoginForm() {
  const router = useRouter();
  const [language, setLanguage] = useState<Language>("es");
  const [username, setUsername] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const t = getTranslations(language);

  useEffect(() => {
    const saved = localStorage.getItem(LOGIN_LANGUAGE_KEY);
    if (saved === "es" || saved === "de") {
      setLanguage(saved);
    }
  }, []);

  function handleLanguageChange(next: Language) {
    setLanguage(next);
    localStorage.setItem(LOGIN_LANGUAGE_KEY, next);
    setError("");
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(res.status === 404 ? t.login.error : data.error || t.login.error);
        return;
      }

      router.push(data.isAdmin ? "/admin" : "/invitation");
      router.refresh();
    } catch {
      setError(t.login.connectionError);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden px-4 py-24 md:py-8">
      <LoginPhotoDecor />
      <FloatingPetals />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative z-10 w-full max-w-md"
      >
        <div className="glass rounded-3xl border border-gold/15 p-10 shadow-2xl shadow-gold/20 backdrop-blur-md">
          <LoginLanguageToggle language={language} onChange={handleLanguageChange} />

          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="mb-8"
          >
            <WeddingLogo variant="onLight" priority />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="mb-2 text-center font-[family-name:var(--font-display)] text-4xl font-light tracking-wide text-charcoal"
          >
            {t.login.title}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mb-8 text-center text-sm leading-relaxed text-charcoal/70"
          >
            {t.login.subtitle}
          </motion.p>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder={t.login.placeholder}
                autoComplete="username"
                className="w-full rounded-xl border border-gold/30 bg-ivory/80 px-5 py-4 text-center text-charcoal placeholder:text-charcoal/40 transition-all focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/20"
                disabled={loading}
              />
            </div>

            {error && (
              <motion.p
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center text-sm text-red-600/80"
              >
                {error}
              </motion.p>
            )}

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={loading || !username.trim()}
              className="w-full rounded-xl bg-gradient-to-r from-gold to-gold-light py-4 font-medium tracking-widest text-ivory uppercase transition-opacity disabled:opacity-50"
            >
              {loading ? t.login.loading : t.login.submit}
            </motion.button>
          </form>
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-6 text-center font-[family-name:var(--font-display)] text-lg italic text-gold/80"
        >
          Melissa & Patrick
        </motion.p>
      </motion.div>
    </div>
  );
}
