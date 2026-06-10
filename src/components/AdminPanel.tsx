"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import type { Guest, Language } from "@/lib/types";
import {
  downloadGuestsExcel,
  downloadImportTemplate,
  parseGuestsExcel,
} from "@/lib/guestsExcel";
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
  const [isConyugal, setIsConyugal] = useState(false);
  const [creating, setCreating] = useState(false);

  const [editingId, setEditingId] = useState<string | null>(null);
  const [editDisplayName, setEditDisplayName] = useState("");
  const [editLanguage, setEditLanguage] = useState<Language>("es");
  const [editExtraGuests, setEditExtraGuests] = useState(0);
  const [editIsConyugal, setEditIsConyugal] = useState(false);
  const [importing, setImporting] = useState(false);
  const importInputRef = useRef<HTMLInputElement>(null);

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
          is_conyugal: isConyugal,
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
      setIsConyugal(false);
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
    setEditIsConyugal(guest.is_conyugal ?? false);
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
        is_conyugal: editIsConyugal,
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

  async function handleImportFile(file: File) {
    setImporting(true);
    try {
      const buffer = await file.arrayBuffer();
      const parsedRows = parseGuestsExcel(buffer);
      const validRows = parsedRows.filter((row) => row.guest);
      const parseErrors = parsedRows.filter((row) => row.error);

      if (validRows.length === 0) {
        const details = parseErrors.map((row) => `Fila ${row.rowNumber}: ${row.error}`).join(" · ");
        showMessage(details || t.importNoValidRows);
        return;
      }

      const res = await fetch("/api/admin/guests/import", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ guests: validRows }),
      });
      const data = await res.json();

      if (!res.ok) {
        showMessage(data.error || t.importFailed);
        return;
      }

      const apiErrors = (data.errors ?? []) as { row: number; message: string }[];
      const allErrors = [
        ...parseErrors.map((row) => `Fila ${row.rowNumber}: ${row.error}`),
        ...apiErrors.map((row) => `Fila ${row.row}: ${row.message}`),
      ];

      if (allErrors.length > 0) {
        showMessage(
          t.importPartial
            .replace("{n}", String(data.created ?? 0))
            .replace("{e}", String(allErrors.length))
            .replace("{details}", allErrors.slice(0, 3).join(" · ")),
        );
      } else {
        showMessage(t.importSuccess.replace("{n}", String(data.created ?? 0)));
      }

      await fetchGuests();
    } catch {
      showMessage(t.importFailed);
    } finally {
      setImporting(false);
      if (importInputRef.current) importInputRef.current.value = "";
    }
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
          <div className="flex flex-wrap gap-4">
            <Link
              href="/admin/confirmaciones"
              className="text-sm tracking-widest text-sage-dark uppercase hover:text-gold"
            >
              {t.confirmationsLink}
            </Link>
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
            <div className="flex items-start gap-3 md:col-span-2">
              <input
                id="create-conyugal"
                type="checkbox"
                checked={isConyugal}
                onChange={(e) => setIsConyugal(e.target.checked)}
                className="mt-1 h-4 w-4 rounded border-gold/30 text-gold focus:ring-gold/30"
              />
              <label htmlFor="create-conyugal" className="text-sm text-charcoal/80">
                <span className="font-medium text-charcoal">{t.conyugal}</span>
                <span className="mt-0.5 block text-xs text-charcoal/55">{t.conyugalHint}</span>
              </label>
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

        <div className="mb-6 flex flex-col gap-4">
          <h2 className="font-[family-name:var(--font-display)] text-2xl text-charcoal">
            {t.guests}
          </h2>
          <div className="flex flex-wrap gap-3">
            <button
              type="button"
              onClick={downloadImportTemplate}
              className="rounded-lg border border-gold/30 px-4 py-2 text-sm tracking-wide text-sage-dark uppercase transition-colors hover:bg-gold/10"
            >
              {t.downloadTemplate}
            </button>
            <button
              type="button"
              onClick={() => importInputRef.current?.click()}
              disabled={importing}
              className="rounded-lg border border-gold/30 px-4 py-2 text-sm tracking-wide text-sage-dark uppercase transition-colors hover:bg-gold/10 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {importing ? t.importing : t.importGuests}
            </button>
            <button
              type="button"
              onClick={() => downloadGuestsExcel(guests)}
              disabled={guests.length === 0}
              className="rounded-lg border border-gold/30 px-4 py-2 text-sm tracking-wide text-sage-dark uppercase transition-colors hover:bg-gold/10 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {t.exportGuests}
            </button>
            <input
              ref={importInputRef}
              type="file"
              accept=".xlsx,.xls"
              className="hidden"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) void handleImportFile(file);
              }}
            />
          </div>
        </div>

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
                    <label className="flex items-center gap-2 text-sm text-charcoal/80 md:col-span-4">
                      <input
                        type="checkbox"
                        checked={editIsConyugal}
                        onChange={(e) => setEditIsConyugal(e.target.checked)}
                        className="h-4 w-4 rounded border-gold/30 text-gold focus:ring-gold/30"
                      />
                      {t.conyugal}
                    </label>
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
                        {(guest.is_conyugal ?? false) && (
                          <span className="rounded-full bg-sage/20 px-2 py-0.5 text-xs text-sage-dark">
                            {t.conyugalBadge}
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-charcoal/50">
                        @{guest.username} · {guest.language === "es" ? t.spanish : t.german}
                        {(guest.is_conyugal ?? false)
                          ? guest.extra_guests > 0
                            ? ` · 2 cupos + ${guest.extra_guests} ${t.extraGuests.toLowerCase()}`
                            : ` · 2 cupos`
                          : ` · ${guest.extra_guests} ${t.extraGuests.toLowerCase()}`}
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
