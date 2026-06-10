import { NextResponse } from "next/server";
import { createGuest } from "@/lib/supabase/server";
import { getSession } from "@/lib/session";
import type { ImportGuestInput } from "@/lib/guestsExcel";
import type { Language } from "@/lib/types";

interface ImportRequestGuest {
  username: string;
  display_name: string;
  language: Language;
  is_conyugal: boolean;
  extra_guests: number;
}

function normalizeGuest(raw: unknown): ImportGuestInput | null {
  if (!raw || typeof raw !== "object") return null;

  const guest = raw as ImportRequestGuest;
  const username = typeof guest.username === "string" ? guest.username.trim().toLowerCase() : "";
  const display_name =
    typeof guest.display_name === "string" ? guest.display_name.trim() : "";
  const language = guest.language;
  const is_conyugal = Boolean(guest.is_conyugal);
  const extra_guests = Number(guest.extra_guests ?? 0);

  if (!username || !display_name) return null;
  if (language !== "es" && language !== "de") return null;
  if (!Number.isInteger(extra_guests) || extra_guests < 0) return null;

  return {
    username,
    display_name,
    language,
    is_conyugal,
    extra_guests,
  };
}

export async function POST(request: Request) {
  const session = await getSession();
  if (!session?.isAdmin) {
    return NextResponse.json({ error: "No autorizado" }, { status: 403 });
  }

  try {
    const body = await request.json();
    const rows = Array.isArray(body.guests) ? body.guests : [];

    if (rows.length === 0) {
      return NextResponse.json({ error: "No hay invitados para importar" }, { status: 400 });
    }

    let created = 0;
    const errors: { row: number; message: string }[] = [];

    for (let index = 0; index < rows.length; index++) {
      const item = rows[index] as {
        rowNumber?: number;
        guest?: ImportRequestGuest;
      };
      const rowNumber = typeof item?.rowNumber === "number" ? item.rowNumber : index + 2;
      const guest = normalizeGuest(item?.guest ?? item);

      if (!guest) {
        errors.push({ row: rowNumber, message: "Datos de invitado inválidos" });
        continue;
      }

      try {
        await createGuest(guest);
        created += 1;
      } catch (error: unknown) {
        const message =
          error && typeof error === "object" && "code" in error && error.code === "23505"
            ? `El usuario "${guest.username}" ya existe`
            : "No se pudo crear el invitado";
        errors.push({ row: rowNumber, message });
      }
    }

    return NextResponse.json({ created, errors });
  } catch (error) {
    console.error("Import guests error:", error);
    return NextResponse.json({ error: "Error al importar invitados" }, { status: 500 });
  }
}
