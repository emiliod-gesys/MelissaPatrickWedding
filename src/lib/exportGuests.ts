import type { Guest } from "@/lib/types";

function escapeCsvCell(value: string): string {
  return `"${value.replace(/"/g, '""')}"`;
}

function languageLabel(language: Guest["language"]): string {
  return language === "es" ? "Español" : "Alemán";
}

export function downloadGuestsCsv(guests: Guest[]): void {
  const rows = guests
    .filter((guest) => !guest.is_admin)
    .map((guest) => [
      escapeCsvCell(guest.display_name),
      escapeCsvCell(guest.username),
      escapeCsvCell(languageLabel(guest.language)),
    ]);

  const csv = ["Nombre,Usuario,Idioma", ...rows.map((row) => row.join(","))].join("\n");
  const blob = new Blob(["\uFEFF" + csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "invitados.csv";
  link.click();
  URL.revokeObjectURL(url);
}
