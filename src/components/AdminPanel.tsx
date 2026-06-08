"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import type { Guest, Language } from "@/lib/types";
import { getTranslations } from "@/lib/i18n";

interface AdminPanelProps {
  language: Language;
}

export function AdminPanel({ language }: AdminPanelProps) {
  const t = getTranslations(language).admin;
  const router = useRouter();

  const [guests, setGuests] = useState<Guest[]>([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  const [username, setUsername] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [guestLanguage, setGuestLanguage] = useState<Language>("es");
  const [extraGuests, setExtraGuests] = useState(0);
  const [creating, setCreating] = useState(false);

  const [editingId, setEditingId] = useState<string | null>(null);
  const [editDisplayName, setEditDisplayName] = useState("");
  const [editLanguage, setEditLanguage] = useState<Language>("es");
  const [editExtraGuests, setEditExtraGuests] = useState(0);

  const showMessage = useCallback((msg: string) => {
    setMessage(msg);
    setTimeout(() => setMessage(""), 3000);
  }, []);

  const fetchGuests = useCallback(async () => {
    try {
      const res = await fetch("/api/admin/guests");
      const data = await res.json();
      if (res.ok) setGuests(data.guests);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchGuests();
  }, [fetchGuests]);

  async function handleCreate(e: React.FormEvent) {
    e.preventDefault();
    setCreating(true);
    try {
      const res = await fetch("/api/admin/guests", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username,
          display_name: displayName,
          language: guestLanguage,
          extra_guests: extraGuests,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        showMessage(data.error || "Error");
        return;
      }
      setUsername("");
      setDisplayName("");
      setGuestLanguage("es");
      setExtraGuests(0);
      showMessage(t.created);
      await fetchGuests();
    } finally {
      setCreating(false);
    }
  }

  function startEdit(guest: Guest) {
    setEditingId(guest.id);
    setEditDisplayName(guest.display_name);
    setEditLanguage(guest.language);
    setEditExtraGuests(guest.extra_guests);
  }

  async function handleSaveEdit(id: string) {
    const res = await fetch("/api/admin/guests", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id,
        display_name: editDisplayName,
        language: editLanguage,
        extra_guests: editExtraGuests,
      }),
    });
    if (res.ok) {
      showMessage(t.updated);
      setEditingId(null);
      await fetchGuests();
    }
  }

  async function handleDelete(id: string) {
    if (!confirm(t.confirmDelete)) return;
    const res = await fetch(`/api/admin/guests?id=${id}`, { method: "DELETE" });
    const data = await res.json();
    if (!res.ok) {
      showMessage(data.error || "Error");
      return;
    }
    showMessage(t.deleted);
    await fetchGuests();
  }

  async function handleLogout() {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/login");
    router.refresh();
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-ivory via-cream to-blush/30 px-4 py-12">
      <div className="mx-auto max-w-4xl">
        <div className="mb-10 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <h1 className="font-[family-name:var(--font-display)] text-4xl font-light text-charcoal">
              {t.title}
            </h1>
            <p className="mt-2 text-sm text-charcoal/60">{t.subtitle}</p>
          </div>
          <div className="flex gap-4">
            <Link
              href="/invitation"
              className="text-sm tracking-widest text-sage-dark uppercase hover:text-gold"
            >
              {t.back}
            </Link>
            <button
              onClick={handleLogout}
              className="text-sm tracking-widest text-charcoal/50 uppercase hover:text-charcoal"
            >
              Salir
            </button>
          </div>
        </div>

        <AnimatePresence>
          {message && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="mb-6 rounded-xl bg-sage/20 px-4 py-3 text-center text-sm text-sage-dark"
            >
              {message}
            </motion.div>
          )}
        </AnimatePresence>

        <motion.form
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          onSubmit={handleCreate}
          className="glass mb-12 rounded-2xl p-6 md:p-8"
        >
          <h2 className="mb-6 font-[family-name:var(--font-display)] text-2xl text-charcoal">
            {t.create}
          </h2>

          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className="mb-1 block text-xs tracking-widest text-charcoal/60 uppercase">
                {t.username}
              </label>
              <input
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                className="w-full rounded-lg border border-gold/20 bg-ivory px-4 py-3 focus:border-gold focus:outline-none"
                placeholder="juan_perez"
              />
            </div>
            <div>
              <label className="mb-1 block text-xs tracking-widest text-charcoal/60 uppercase">
                {t.displayName}
              </label>
              <input
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                required
                className="w-full rounded-lg border border-gold/20 bg-ivory px-4 py-3 focus:border-gold focus:outline-none"
                placeholder="Juan Pérez"
              />
            </div>
            <div>
              <label className="mb-1 block text-xs tracking-widest text-charcoal/60 uppercase">
                {t.language}
              </label>
              <select
                value={guestLanguage}
                onChange={(e) => setGuestLanguage(e.target.value as Language)}
                className="w-full rounded-lg border border-gold/20 bg-ivory px-4 py-3 focus:border-gold focus:outline-none"
              >
                <option value="es">{t.spanish}</option>
                <option value="de">{t.german}</option>
              </select>
            </div>
            <div>
              <label className="mb-1 block text-xs tracking-widest text-charcoal/60 uppercase">
                {t.extraGuests}
              </label>
              <input
                type="number"
                min={0}
                max={10}
                value={extraGuests}
                onChange={(e) => setExtraGuests(Number(e.target.value))}
                className="w-full rounded-lg border border-gold/20 bg-ivory px-4 py-3 focus:border-gold focus:outline-none"
              />
            </div>
          </div>

          <motion.button
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            type="submit"
            disabled={creating}
            className="mt-6 w-full rounded-xl bg-gradient-to-r from-gold to-gold-light py-3 font-medium tracking-widest text-ivory uppercase disabled:opacity-50 md:w-auto md:px-12"
          >
            {t.create}
          </motion.button>
        </motion.form>

        <h2 className="mb-6 font-[family-name:var(--font-display)] text-2xl text-charcoal">
          {t.guests}
        </h2>

        {loading ? (
          <p className="text-center text-charcoal/50">Cargando...</p>
        ) : guests.length === 0 ? (
          <p className="text-center text-charcoal/50">{t.noGuests}</p>
        ) : (
          <div className="space-y-4">
            {guests.map((guest, i) => (
              <motion.div
                key={guest.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="glass rounded-xl p-5"
              >
                {editingId === guest.id ? (
                  <div className="grid gap-3 md:grid-cols-4">
                    <input
                      value={editDisplayName}
                      onChange={(e) => setEditDisplayName(e.target.value)}
                      className="rounded-lg border border-gold/20 bg-ivory px-3 py-2 md:col-span-2"
                    />
                    <select
                      value={editLanguage}
                      onChange={(e) => setEditLanguage(e.target.value as Language)}
                      className="rounded-lg border border-gold/20 bg-ivory px-3 py-2"
                    >
                      <option value="es">{t.spanish}</option>
                      <option value="de">{t.german}</option>
                    </select>
                    <input
                      type="number"
                      min={0}
                      value={editExtraGuests}
                      onChange={(e) => setEditExtraGuests(Number(e.target.value))}
                      className="rounded-lg border border-gold/20 bg-ivory px-3 py-2"
                    />
                    <div className="flex gap-2 md:col-span-4">
                      <button
                        onClick={() => handleSaveEdit(guest.id)}
                        className="rounded-lg bg-sage px-4 py-2 text-sm text-ivory"
                      >
                        {t.save}
                      </button>
                      <button
                        onClick={() => setEditingId(null)}
                        className="rounded-lg border border-charcoal/20 px-4 py-2 text-sm"
                      >
                        Cancelar
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-charcoal">{guest.display_name}</span>
                        {guest.is_admin && (
                          <span className="rounded-full bg-gold/20 px-2 py-0.5 text-xs text-gold">
                            {t.adminBadge}
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-charcoal/50">
                        @{guest.username} · {guest.language === "es" ? t.spanish : t.german} ·{" "}
                        {guest.extra_guests} {t.extraGuests.toLowerCase()}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => startEdit(guest)}
                        className="rounded-lg border border-gold/30 px-4 py-2 text-sm hover:bg-gold/10"
                      >
                        {t.save}
                      </button>
                      {!guest.is_admin && (
                        <button
                          onClick={() => handleDelete(guest.id)}
                          className="rounded-lg border border-red-200 px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                        >
                          {t.delete}
                        </button>
                      )}
                    </div>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
