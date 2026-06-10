import * as XLSX from "xlsx";
import type { Guest } from "@/lib/types";

function languageLabel(language: Guest["language"]): string {
  return language === "es" ? "Español" : "Alemán";
}

export function downloadGuestsExcel(guests: Guest[]): void {
  const rows = guests
    .filter((guest) => !guest.is_admin)
    .map((guest) => ({
      Nombre: guest.display_name,
      Usuario: guest.username,
      Idioma: languageLabel(guest.language),
    }));

  const worksheet = XLSX.utils.json_to_sheet(rows, {
    header: ["Nombre", "Usuario", "Idioma"],
  });
  worksheet["!cols"] = [{ wch: 28 }, { wch: 20 }, { wch: 12 }];

  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Invitados");

  XLSX.writeFile(workbook, "invitados.xlsx");
}
