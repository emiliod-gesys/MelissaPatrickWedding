-- Confirmaciones de asistencia (RSVP)
CREATE TABLE IF NOT EXISTS rsvps (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  guest_id UUID NOT NULL UNIQUE REFERENCES guests(id) ON DELETE CASCADE,
  confirmed_count INTEGER NOT NULL CHECK (confirmed_count >= 1),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS rsvps_guest_id_idx ON rsvps (guest_id);

CREATE TRIGGER rsvps_updated_at
  BEFORE UPDATE ON rsvps
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();

ALTER TABLE rsvps ENABLE ROW LEVEL SECURITY;
