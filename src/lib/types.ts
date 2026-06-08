export type Language = "es" | "de";

export interface Guest {
  id: string;
  username: string;
  display_name: string;
  language: Language;
  extra_guests: number;
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
  isAdmin: boolean;
}

export interface CreateGuestInput {
  username: string;
  display_name: string;
  language: Language;
  extra_guests: number;
}

export interface UpdateGuestInput {
  display_name?: string;
  language?: Language;
  extra_guests?: number;
}
