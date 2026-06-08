import { NextResponse } from "next/server";
import {
  listGuests,
  createGuest,
  updateGuest,
  deleteGuest,
} from "@/lib/supabase/server";
import { getSession } from "@/lib/session";
import type { Language } from "@/lib/types";

async function requireAdmin() {
  const session = await getSession();
  if (!session?.isAdmin) {
    return null;
  }
  return session;
}

export async function GET() {
  const session = await requireAdmin();
  if (!session) {
    return NextResponse.json({ error: "No autorizado" }, { status: 403 });
  }

  try {
    const guests = await listGuests();
    return NextResponse.json({ guests });
  } catch (error) {
    console.error("List guests error:", error);
    return NextResponse.json({ error: "Error al listar invitados" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  const session = await requireAdmin();
  if (!session) {
    return NextResponse.json({ error: "No autorizado" }, { status: 403 });
  }

  try {
    const body = await request.json();
    const username = typeof body.username === "string" ? body.username.trim() : "";
    const display_name =
      typeof body.display_name === "string" ? body.display_name.trim() : "";
    const language = body.language as Language;
    const extra_guests = Number(body.extra_guests ?? 0);

    if (!username || !display_name) {
      return NextResponse.json(
        { error: "Usuario y nombre son requeridos" },
        { status: 400 },
      );
    }

    if (language !== "es" && language !== "de") {
      return NextResponse.json({ error: "Idioma inválido" }, { status: 400 });
    }

    if (!Number.isInteger(extra_guests) || extra_guests < 0) {
      return NextResponse.json(
        { error: "Número de invitados inválido" },
        { status: 400 },
      );
    }

    const guest = await createGuest({
      username: username.toLowerCase(),
      display_name,
      language,
      extra_guests,
    });

    return NextResponse.json({ guest }, { status: 201 });
  } catch (error: unknown) {
    console.error("Create guest error:", error);
    const message =
      error && typeof error === "object" && "code" in error && error.code === "23505"
        ? "Ese nombre de usuario ya existe"
        : "Error al crear invitado";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function PATCH(request: Request) {
  const session = await requireAdmin();
  if (!session) {
    return NextResponse.json({ error: "No autorizado" }, { status: 403 });
  }

  try {
    const body = await request.json();
    const id = typeof body.id === "string" ? body.id : "";
    if (!id) {
      return NextResponse.json({ error: "ID requerido" }, { status: 400 });
    }

    const updates: {
      display_name?: string;
      language?: Language;
      extra_guests?: number;
    } = {};

    if (typeof body.display_name === "string") {
      updates.display_name = body.display_name.trim();
    }
    if (body.language === "es" || body.language === "de") {
      updates.language = body.language;
    }
    if (body.extra_guests !== undefined) {
      const n = Number(body.extra_guests);
      if (!Number.isInteger(n) || n < 0) {
        return NextResponse.json(
          { error: "Número de invitados inválido" },
          { status: 400 },
        );
      }
      updates.extra_guests = n;
    }

    const guest = await updateGuest(id, updates);
    return NextResponse.json({ guest });
  } catch (error) {
    console.error("Update guest error:", error);
    return NextResponse.json({ error: "Error al actualizar" }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  const session = await requireAdmin();
  if (!session) {
    return NextResponse.json({ error: "No autorizado" }, { status: 403 });
  }

  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    if (!id) {
      return NextResponse.json({ error: "ID requerido" }, { status: 400 });
    }

    if (id === session.guestId) {
      return NextResponse.json(
        { error: "No puedes eliminar tu propia cuenta de admin" },
        { status: 400 },
      );
    }

    await deleteGuest(id);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Delete guest error:", error);
    return NextResponse.json({ error: "Error al eliminar" }, { status: 500 });
  }
}
