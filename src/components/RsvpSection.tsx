"use client";

import { useCallback, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { getTranslations } from "@/lib/i18n";
import type { Language } from "@/lib/types";

interface RsvpSectionProps {
  language: Language;
  extraGuests: number;
}

interface RsvpData {
  confirmed_count: number | null;
  max_attendees: number;
  extra_guests: number;
  updated_at: string | null;
}

export function RsvpSection({ language, extraGuests }: RsvpSectionProps) {
  const t = getTranslations(language).rsvp;
  const [data, setData] = useState<RsvpData | null>(null);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [count, setCount] = useState(1);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const maxAttendees = data?.max_attendees ?? 1 + extraGuests;

  const fetchRsvp = useCallback(async () => {
    try {
      const res = await fetch("/api/rsvp");
      const json = await res.json();
      if (res.ok) {
        setData(json);
        setCount(json.confirmed_count ?? 1);
      }
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchRsvp();
  }, [fetchRsvp]);

  function openModal() {
    setError("");
    setSuccess("");
    setCount(data?.confirmed_count ?? 1);
    setOpen(true);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError("");

    try {
      const res = await fetch("/api/rsvp", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ confirmed_count: count }),
      });
      const json = await res.json();

      if (!res.ok) {
        setError(json.error || t.error);
        return;
      }

      setData((prev) =>
        prev
          ? {
              ...prev,
              confirmed_count: json.confirmed_count,
              updated_at: json.updated_at,
            }
          : {
              confirmed_count: json.confirmed_count,
              max_attendees: json.max_attendees,
              extra_guests: extraGuests,
              updated_at: json.updated_at,
            },
      );
      setSuccess(t.success);
      setTimeout(() => setOpen(false), 1200);
    } catch {
      setError(t.error);
    } finally {
      setSaving(false);
    }
  }

  const hint = t.hint.replace("{extras}", String(extraGuests));
  const modalSubtitle = t.modalSubtitle.replace("{max}", String(maxAttendees));

  return (
    <>
      <section id="rsvp" className="relative overflow-hidden bg-cream px-6 py-20 text-center md:py-24">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(201,169,98,0.08)_0%,transparent_70%)]" />

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative mx-auto max-w-xl"
        >
          <h2 className="mb-4 font-[family-name:var(--font-display)] text-3xl font-light text-sage-dark md:text-4xl">
            {t.title}
          </h2>
          <p className="mb-8 text-sm leading-relaxed font-light text-charcoal/70 md:text-base">
            {t.subtitle}
          </p>

          {!loading && data?.confirmed_count != null && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mb-6 text-sm text-sage-dark md:text-base"
            >
              {t.current.replace("{count}", String(data.confirmed_count))}
            </motion.p>
          )}

          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            onClick={openModal}
            disabled={loading}
            className="rounded-full bg-gradient-to-r from-gold to-gold-light px-10 py-4 font-medium tracking-[0.25em] text-ivory uppercase shadow-lg shadow-gold/25 transition-opacity disabled:opacity-50"
          >
            {data?.confirmed_count != null ? t.updateButton : t.button}
          </motion.button>
        </motion.div>
      </section>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-charcoal/50 p-4 backdrop-blur-sm"
            onClick={() => !saving && setOpen(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 20 }}
              transition={{ type: "spring", damping: 26, stiffness: 300 }}
              className="glass w-full max-w-md rounded-3xl border border-gold/20 p-8 shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="mb-2 text-center font-[family-name:var(--font-display)] text-2xl text-charcoal">
                {t.modalTitle}
              </h3>
              <p className="mb-8 text-center text-sm text-charcoal/60">{modalSubtitle}</p>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="mb-2 block text-center text-xs tracking-widest text-charcoal/50 uppercase">
                    {t.label}
                  </label>
                  <div className="flex items-center justify-center gap-4">
                    <button
                      type="button"
                      onClick={() => setCount((c) => Math.max(1, c - 1))}
                      className="flex h-11 w-11 items-center justify-center rounded-full border border-gold/30 text-xl text-charcoal transition-colors hover:bg-gold/10"
                    >
                      −
                    </button>
                    <span className="min-w-[3rem] text-center font-[family-name:var(--font-display)] text-4xl text-sage-dark">
                      {count}
                    </span>
                    <button
                      type="button"
                      onClick={() => setCount((c) => Math.min(maxAttendees, c + 1))}
                      className="flex h-11 w-11 items-center justify-center rounded-full border border-gold/30 text-xl text-charcoal transition-colors hover:bg-gold/10"
                    >
                      +
                    </button>
                  </div>
                  <p className="mt-4 text-center text-xs text-charcoal/50">{hint}</p>
                </div>

                {error && (
                  <p className="text-center text-sm text-red-600/80">{error}</p>
                )}
                {success && (
                  <p className="text-center text-sm text-sage-dark">{success}</p>
                )}

                <div className="flex flex-col gap-3 sm:flex-row">
                  <button
                    type="button"
                    onClick={() => setOpen(false)}
                    disabled={saving}
                    className="flex-1 rounded-xl border border-charcoal/15 py-3 text-sm tracking-widest text-charcoal/60 uppercase"
                  >
                    {t.cancel}
                  </button>
                  <motion.button
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    type="submit"
                    disabled={saving}
                    className="flex-1 rounded-xl bg-gradient-to-r from-gold to-gold-light py-3 text-sm font-medium tracking-widest text-ivory uppercase disabled:opacity-50"
                  >
                    {saving ? t.saving : t.submit}
                  </motion.button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
