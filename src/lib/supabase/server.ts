import { createClient } from "@supabase/supabase-js";
import type { Guest } from "@/lib/types";

function getSupabaseUrl() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  if (!url) throw new Error("NEXT_PUBLIC_SUPABASE_URL no está configurada");
  return url;
}

function getServiceRoleKey() {
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!key) throw new Error("SUPABASE_SERVICE_ROLE_KEY no está configurada");
  return key;
}

export function createAdminClient() {
  return createClient(getSupabaseUrl(), getServiceRoleKey(), {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}

export async function findGuestByLogin(identifier: string): Promise<Guest | null> {
  const supabase = createAdminClient();
  const trimmed = identifier.trim();
  if (!trimmed) return null;

  const { data: byUsername, error: usernameError } = await supabase
    .from("guests")
    .select("*")
    .ilike("username", trimmed)
    .maybeSingle();

  if (usernameError) throw usernameError;
  if (byUsername) return byUsername as Guest;

  const { data: byDisplayName, error: displayNameError } = await supabase
    .from("guests")
    .select("*")
    .ilike("display_name", trimmed)
    .limit(1)
    .maybeSingle();

  if (displayNameError) throw displayNameError;
  return byDisplayName as Guest | null;
}

export async function listGuests(): Promise<Guest[]> {
  const supabase = createAdminClient();
  const { data, error } = await supabase
    .from("guests")
    .select("*")
    .order("created_at", { ascending: true });

  if (error) throw error;
  return (data ?? []) as Guest[];
}

export async function createGuest(
  input: Omit<Guest, "id" | "is_admin" | "created_at" | "updated_at"> & {
    is_admin?: boolean;
  },
): Promise<Guest> {
  const supabase = createAdminClient();
  const { data, error } = await supabase
    .from("guests")
    .insert({
      username: input.username.trim().toLowerCase(),
      display_name: input.display_name.trim(),
      language: input.language,
      extra_guests: input.extra_guests,
      is_conyugal: input.is_conyugal ?? false,
      is_admin: input.is_admin ?? false,
    })
    .select()
    .single();

  if (error) throw error;
  return data as Guest;
}

export async function updateGuest(
  id: string,
  updates: Partial<
    Pick<Guest, "display_name" | "language" | "extra_guests" | "is_conyugal" | "is_admin">
  >,
): Promise<Guest> {
  const supabase = createAdminClient();
  const { data, error } = await supabase
    .from("guests")
    .update(updates)
    .eq("id", id)
    .select()
    .single();

  if (error) throw error;
  return data as Guest;
}

export async function deleteGuest(id: string): Promise<void> {
  const supabase = createAdminClient();
  const { error } = await supabase.from("guests").delete().eq("id", id);
  if (error) throw error;
}
