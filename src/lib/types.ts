export type Language = "es" | "de";

export interface Guest {
  id: string;
  username: string;
  display_name: string;
  language: Language;
  extra_guests: number;
  is_conyugal: boolean;
  is_admin: boolean;
  created_at: string;
  updated_at: string;
}

export interface SessionPayload {
  guestId: string;
  username: string;
  displayName: string;
  language: Language;
  extraGuests: number;
  isConyugal: boolean;
  isAdmin: boolean;
}

export interface CreateGuestInput {
  username: string;
  display_name: string;
  language: Language;
  extra_guests: number;
  is_conyugal?: boolean;
}

export interface UpdateGuestInput {
  display_name?: string;
  language?: Language;
  extra_guests?: number;
  is_conyugal?: boolean;
}

export interface Rsvp {
  id: string;
  guest_id: string;
  confirmed_count: number;
  created_at: string;
  updated_at: string;
}

export interface GuestWithRsvp extends Guest {
  rsvp: Pick<Rsvp, "confirmed_count" | "updated_at"> | null;
}
