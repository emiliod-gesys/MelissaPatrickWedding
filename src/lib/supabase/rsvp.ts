import { createAdminClient } from "@/lib/supabase/server";
import type { Guest, GuestWithRsvp, Rsvp } from "@/lib/types";

export async function getGuestById(id: string): Promise<Guest | null> {
  const supabase = createAdminClient();
  const { data, error } = await supabase
    .from("guests")
    .select("*")
    .eq("id", id)
    .maybeSingle();

  if (error) throw error;
  return data as Guest | null;
}

export async function getRsvpByGuestId(guestId: string): Promise<Rsvp | null> {
  const supabase = createAdminClient();
  const { data, error } = await supabase
    .from("rsvps")
    .select("*")
    .eq("guest_id", guestId)
    .maybeSingle();

  if (error) throw error;
  return data as Rsvp | null;
}

export async function upsertRsvp(
  guestId: string,
  confirmedCount: number,
): Promise<Rsvp> {
  const supabase = createAdminClient();
  const { data, error } = await supabase
    .from("rsvps")
    .upsert(
      { guest_id: guestId, confirmed_count: confirmedCount },
      { onConflict: "guest_id" },
    )
    .select()
    .single();

  if (error) throw error;
  return data as Rsvp;
}

export async function listGuestsWithRsvps(): Promise<GuestWithRsvp[]> {
  const supabase = createAdminClient();
  const { data, error } = await supabase
    .from("guests")
    .select("*, rsvps(confirmed_count, updated_at)")
    .order("display_name", { ascending: true });

  if (error) throw error;

  return (data ?? []).map((row) => {
    const rsvpRow = row.rsvps as
      | { confirmed_count: number; updated_at: string }
      | { confirmed_count: number; updated_at: string }[]
      | null;

    const rsvp = Array.isArray(rsvpRow) ? (rsvpRow[0] ?? null) : rsvpRow;

    const { rsvps: _, ...guest } = row as Guest & {
      rsvps: unknown;
    };

    return {
      ...guest,
      rsvp: rsvp
        ? {
            confirmed_count: rsvp.confirmed_count,
            updated_at: rsvp.updated_at,
          }
        : null,
    };
  });
}
