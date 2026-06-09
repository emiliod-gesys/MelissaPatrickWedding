import { NextResponse } from "next/server";
import { getSession } from "@/lib/session";
import { getMaxAttendees } from "@/lib/rsvp";
import { listGuestsWithRsvps } from "@/lib/supabase/rsvp";

export async function GET() {
  const session = await getSession();
  if (!session?.isAdmin) {
    return NextResponse.json({ error: "No autorizado" }, { status: 403 });
  }

  try {
    const guests = await listGuestsWithRsvps();

    const confirmations = guests
      .filter((g) => !g.is_admin)
      .map((guest) => ({
        id: guest.id,
        display_name: guest.display_name,
        username: guest.username,
        extra_guests: guest.extra_guests,
        max_attendees: getMaxAttendees(guest.extra_guests),
        confirmed_count: guest.rsvp?.confirmed_count ?? null,
        extras_confirmed: guest.rsvp
          ? Math.max(0, guest.rsvp.confirmed_count - 1)
          : null,
        updated_at: guest.rsvp?.updated_at ?? null,
        has_confirmed: guest.rsvp !== null,
      }));

    const totalConfirmed = confirmations.reduce(
      (sum, item) => sum + (item.confirmed_count ?? 0),
      0,
    );
    const totalResponded = confirmations.filter((item) => item.has_confirmed).length;

    return NextResponse.json({
      confirmations,
      summary: {
        total_guests: confirmations.length,
        total_responded: totalResponded,
        total_confirmed_attendees: totalConfirmed,
      },
    });
  } catch (error) {
    console.error("GET admin rsvps error:", error);
    return NextResponse.json({ error: "Error al listar confirmaciones" }, { status: 500 });
  }
}
