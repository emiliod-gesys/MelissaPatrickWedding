import * as XLSX from "xlsx";
import type { Guest, Language } from "@/lib/types";

export const IMPORT_COLUMNS = [
  "Usuario",
  "Nombre",
  "Idioma",
  "Conyugal",
  "Adicionales",
] as const;

export interface ImportGuestInput {
  username: string;
  display_name: string;
  language: Language;
  is_conyugal: boolean;
  extra_guests: number;
}

export interface ParsedImportRow {
  rowNumber: number;
  guest?: ImportGuestInput;
  error?: string;
}

const TEMPLATE_EXAMPLES = [
  {
    Usuario: "juan_perez",
    Nombre: "Juan Pérez",
    Idioma: "ESP",
    Conyugal: "F",
    Adicionales: 0,
  },
  {
    Usuario: "maria_carlos",
    Nombre: "María y Carlos García",
    Idioma: "ESP",
    Conyugal: "T",
    Adicionales: 2,
  },
  {
    Usuario: "hans_mueller",
    Nombre: "Hans Müller",
    Idioma: "ALE",
    Conyugal: "F",
    Adicionales: 1,
  },
];

function languageLabel(language: Guest["language"]): string {
  return language === "es" ? "Español" : "Alemán";
}

function normalizeHeader(value: string): string {
  return value.trim().toLowerCase();
}

function parseLanguage(value: unknown): Language | null {
  const normalized = String(value ?? "")
    .trim()
    .toUpperCase();
  if (normalized === "ESP" || normalized === "ES") return "es";
  if (normalized === "ALE" || normalized === "DE") return "de";
  return null;
}

function parseConyugal(value: unknown): boolean | null {
  const normalized = String(value ?? "")
    .trim()
    .toUpperCase();
  if (normalized === "T") return true;
  if (normalized === "F") return false;
  return null;
}

function buildWorkbook(
  rows: Record<string, string | number>[],
  sheetName: string,
): XLSX.WorkBook {
  const worksheet = XLSX.utils.json_to_sheet(rows, { header: [...IMPORT_COLUMNS] });
  worksheet["!cols"] = [
    { wch: 22 },
    { wch: 30 },
    { wch: 10 },
    { wch: 10 },
    { wch: 12 },
  ];

  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, sheetName);
  return workbook;
}

export function downloadImportTemplate(): void {
  const workbook = buildWorkbook(TEMPLATE_EXAMPLES, "Invitados");
  XLSX.writeFile(workbook, "plantilla-invitados.xlsx");
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

function getCell(row: Record<string, unknown>, ...keys: string[]): unknown {
  for (const key of keys) {
    if (row[key] !== undefined && row[key] !== "") return row[key];
  }

  const normalizedEntries = Object.entries(row);
  for (const key of keys) {
    const match = normalizedEntries.find(
      ([header]) => normalizeHeader(header) === normalizeHeader(key),
    );
    if (match && match[1] !== undefined && match[1] !== "") return match[1];
  }

  return undefined;
}

function isEmptyRow(row: Record<string, unknown>): boolean {
  return Object.values(row).every(
    (value) => value === undefined || value === null || String(value).trim() === "",
  );
}

export function parseGuestsExcel(buffer: ArrayBuffer): ParsedImportRow[] {
  const workbook = XLSX.read(buffer, { type: "array" });
  const sheetName = workbook.SheetNames[0];
  if (!sheetName) {
    return [{ rowNumber: 1, error: "El archivo no contiene hojas" }];
  }

  const sheet = workbook.Sheets[sheetName];
  const rawRows = XLSX.utils.sheet_to_json<Record<string, unknown>>(sheet, {
    defval: "",
    raw: false,
  });

  const parsed: ParsedImportRow[] = [];
  const usernamesInFile = new Set<string>();

  rawRows.forEach((row, index) => {
    const rowNumber = index + 2;

    if (isEmptyRow(row)) return;

    const username = String(getCell(row, "Usuario", "usuario") ?? "").trim();
    const displayName = String(getCell(row, "Nombre", "nombre") ?? "").trim();
    const language = parseLanguage(getCell(row, "Idioma", "idioma"));
    const isConyugal = parseConyugal(getCell(row, "Conyugal", "conyugal"));
    const adicionalesRaw = getCell(row, "Adicionales", "adicionales");

    if (!username) {
      parsed.push({ rowNumber, error: "Usuario es requerido" });
      return;
    }

    if (!displayName) {
      parsed.push({ rowNumber, error: "Nombre es requerido" });
      return;
    }

    if (!language) {
      parsed.push({ rowNumber, error: "Idioma debe ser ESP o ALE" });
      return;
    }

    if (isConyugal === null) {
      parsed.push({ rowNumber, error: "Conyugal debe ser T o F" });
      return;
    }

    const adicionalesText = String(adicionalesRaw ?? "").trim();
    const extraGuestsNumber = adicionalesText === "" ? 0 : Number(adicionalesText);
    if (!Number.isInteger(extraGuestsNumber) || extraGuestsNumber < 0) {
      parsed.push({ rowNumber, error: "Adicionales debe ser un entero mayor o igual a 0" });
      return;
    }

    const normalizedUsername = username.toLowerCase();
    if (usernamesInFile.has(normalizedUsername)) {
      parsed.push({ rowNumber, error: `Usuario duplicado en el archivo: ${username}` });
      return;
    }
    usernamesInFile.add(normalizedUsername);

    parsed.push({
      rowNumber,
      guest: {
        username: normalizedUsername,
        display_name: displayName,
        language,
        is_conyugal: isConyugal,
        extra_guests: extraGuestsNumber,
      },
    });
  });

  if (parsed.length === 0) {
    return [{ rowNumber: 1, error: "No se encontraron filas para importar" }];
  }

  return parsed;
}
