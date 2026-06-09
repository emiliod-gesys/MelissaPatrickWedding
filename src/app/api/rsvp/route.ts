import { NextResponse } from "next/server";
import { getSession } from "@/lib/session";
import { getMaxAttendees } from "@/lib/rsvp";
import { getGuestById, getRsvpByGuestId, upsertRsvp } from "@/lib/supabase/rsvp";

export async function GET() {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }

  try {
    const guest = await getGuestById(session.guestId);
    if (!guest) {
      return NextResponse.json({ error: "Invitado no encontrado" }, { status: 404 });
    }

    const rsvp = await getRsvpByGuestId(session.guestId);
    const maxAttendees = getMaxAttendees(guest.extra_guests);

    return NextResponse.json({
      confirmed_count: rsvp?.confirmed_count ?? null,
      max_attendees: maxAttendees,
      extra_guests: guest.extra_guests,
      updated_at: rsvp?.updated_at ?? null,
    });
  } catch (error) {
    console.error("GET rsvp error:", error);
    return NextResponse.json({ error: "Error al obtener confirmación" }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const confirmedCount = Number(body.confirmed_count);

    if (!Number.isInteger(confirmedCount)) {
      return NextResponse.json(
        { error: "Cantidad de confirmados inválida" },
        { status: 400 },
      );
    }

    const guest = await getGuestById(session.guestId);
    if (!guest) {
      return NextResponse.json({ error: "Invitado no encontrado" }, { status: 404 });
    }

    const maxAttendees = getMaxAttendees(guest.extra_guests);

    if (confirmedCount < 1 || confirmedCount > maxAttendees) {
      return NextResponse.json(
        {
          error: `Puedes confirmar entre 1 y ${maxAttendees} persona(s)`,
        },
        { status: 400 },
      );
    }

    const rsvp = await upsertRsvp(session.guestId, confirmedCount);

    return NextResponse.json({
      confirmed_count: rsvp.confirmed_count,
      max_attendees: maxAttendees,
      updated_at: rsvp.updated_at,
    });
  } catch (error) {
    console.error("PUT rsvp error:", error);
    return NextResponse.json({ error: "Error al guardar confirmación" }, { status: 500 });
  }
}
