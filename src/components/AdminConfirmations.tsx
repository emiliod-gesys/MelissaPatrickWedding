"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { getTranslations } from "@/lib/i18n";
import type { Language } from "@/lib/types";

interface ConfirmationRow {
  id: string;
  display_name: string;
  username: string;
  extra_guests: number;
  max_attendees: number;
  confirmed_count: number | null;
  extras_confirmed: number | null;
  updated_at: string | null;
  has_confirmed: boolean;
}

interface Summary {
  total_guests: number;
  total_responded: number;
  total_confirmed_attendees: number;
}

interface AdminConfirmationsProps {
  language: Language;
}

function formatDate(iso: string | null, language: Language) {
  if (!iso) return "—";
  return new Date(iso).toLocaleString(language === "de" ? "de-DE" : "es-SV", {
    dateStyle: "short",
    timeStyle: "short",
  });
}

export function AdminConfirmations({ language }: AdminConfirmationsProps) {
  const t = getTranslations(language).confirmations;
  const router = useRouter();
  const [rows, setRows] = useState<ConfirmationRow[]>([]);
  const [summary, setSummary] = useState<Summary | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchData = useCallback(async () => {
    try {
      const res = await fetch("/api/admin/rsvps");
      const data = await res.json();
      if (res.ok) {
        setRows(data.confirmations);
        setSummary(data.summary);
      }
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  async function handleLogout() {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/login");
    router.refresh();
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-ivory via-cream to-blush/30 px-4 py-12">
      <div className="mx-auto max-w-5xl">
        <div className="mb-10 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <h1 className="font-[family-name:var(--font-display)] text-4xl font-light text-charcoal">
              {t.title}
            </h1>
            <p className="mt-2 text-sm text-charcoal/60">{t.subtitle}</p>
          </div>
          <div className="flex flex-wrap gap-4">
            <Link
              href="/admin"
              className="text-sm tracking-widest text-sage-dark uppercase hover:text-gold"
            >
              {t.backGuests}
            </Link>
            <Link
              href="/invitation"
              className="text-sm tracking-widest text-sage-dark uppercase hover:text-gold"
            >
              {t.backInvitation}
            </Link>
            <button
              onClick={handleLogout}
              className="text-sm tracking-widest text-charcoal/50 uppercase hover:text-charcoal"
            >
              {t.logout}
            </button>
          </div>
        </div>

        {summary && (
          <div className="mb-8 grid gap-4 sm:grid-cols-3">
            {[
              { label: t.totalGuests, value: summary.total_guests },
              { label: t.totalResponded, value: summary.total_responded },
              { label: t.totalAttendees, value: summary.total_confirmed_attendees },
            ].map((item, i) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="glass rounded-2xl p-5 text-center"
              >
                <p className="text-3xl font-[family-name:var(--font-display)] text-gold">
                  {item.value}
                </p>
                <p className="mt-1 text-xs tracking-wide text-charcoal/55 uppercase">
                  {item.label}
                </p>
              </motion.div>
            ))}
          </div>
        )}

        {loading ? (
          <p className="text-center text-charcoal/50">{t.loading}</p>
        ) : rows.length === 0 ? (
          <p className="text-center text-charcoal/50">{t.empty}</p>
        ) : (
          <div className="overflow-x-auto rounded-2xl border border-gold/15 bg-ivory/80">
            <table className="w-full min-w-[640px] text-left text-sm">
              <thead>
                <tr className="border-b border-gold/15 text-xs tracking-widest text-charcoal/50 uppercase">
                  <th className="px-5 py-4">{t.guest}</th>
                  <th className="px-5 py-4">{t.max}</th>
                  <th className="px-5 py-4">{t.confirmed}</th>
                  <th className="px-5 py-4">{t.extras}</th>
                  <th className="px-5 py-4">{t.status}</th>
                  <th className="px-5 py-4">{t.updated}</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((row) => (
                  <tr key={row.id} className="border-b border-gold/10 last:border-0">
                    <td className="px-5 py-4">
                      <p className="font-medium text-charcoal">{row.display_name}</p>
                      <p className="text-xs text-charcoal/45">@{row.username}</p>
                    </td>
                    <td className="px-5 py-4 text-charcoal/70">{row.max_attendees}</td>
                    <td className="px-5 py-4 font-medium text-charcoal">
                      {row.confirmed_count ?? "—"}
                    </td>
                    <td className="px-5 py-4 text-charcoal/70">
                      {row.extras_confirmed ?? "—"} / {row.extra_guests}
                    </td>
                    <td className="px-5 py-4">
                      <span
                        className={`rounded-full px-2.5 py-1 text-xs ${
                          row.has_confirmed
                            ? "bg-sage/20 text-sage-dark"
                            : "bg-charcoal/5 text-charcoal/45"
                        }`}
                      >
                        {row.has_confirmed ? t.statusConfirmed : t.statusPending}
                      </span>
                    </td>
                    <td className="px-5 py-4 text-xs text-charcoal/50">
                      {formatDate(row.updated_at, language)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
