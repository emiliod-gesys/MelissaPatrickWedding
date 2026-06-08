-- Invitados de la boda
CREATE TABLE IF NOT EXISTS guests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  username TEXT NOT NULL UNIQUE,
  display_name TEXT NOT NULL,
  language TEXT NOT NULL CHECK (language IN ('es', 'de')) DEFAULT 'es',
  extra_guests INTEGER NOT NULL DEFAULT 0 CHECK (extra_guests >= 0),
  is_admin BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS guests_username_idx ON guests (lower(username));

-- Trigger para updated_at
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER guests_updated_at
  BEFORE UPDATE ON guests
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();

-- RLS: solo el backend (service role) accede a esta tabla
ALTER TABLE guests ENABLE ROW LEVEL SECURITY;

-- Usuario maestro inicial (cambia el username si lo deseas)
INSERT INTO guests (username, display_name, language, extra_guests, is_admin)
VALUES ('admin', 'Administrador', 'es', 0, true)
ON CONFLICT (username) DO NOTHING;
