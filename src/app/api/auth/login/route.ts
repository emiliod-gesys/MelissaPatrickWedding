import { NextResponse } from "next/server";
import { findGuestByLogin } from "@/lib/supabase/server";
import { createSession } from "@/lib/session";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const identifier = typeof body.username === "string" ? body.username.trim() : "";

    if (!identifier) {
      return NextResponse.json(
        { error: "El nombre o usuario es requerido" },
        { status: 400 },
      );
    }

    const guest = await findGuestByLogin(identifier);

    if (!guest) {
      return NextResponse.json({ error: "Usuario no encontrado" }, { status: 404 });
    }

    await createSession({
      guestId: guest.id,
      username: guest.username,
      displayName: guest.display_name,
      language: guest.language,
      extraGuests: guest.extra_guests,
      isConyugal: guest.is_conyugal ?? false,
      isAdmin: guest.is_admin,
    });

    return NextResponse.json({
      success: true,
      isAdmin: guest.is_admin,
    });
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 },
    );
  }
}
