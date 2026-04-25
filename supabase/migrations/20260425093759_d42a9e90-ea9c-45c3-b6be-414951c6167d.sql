ALTER TABLE public.properties
  ADD COLUMN IF NOT EXISTS delivery_eta text NOT NULL DEFAULT '',
  ADD COLUMN IF NOT EXISTS gross_yield text NOT NULL DEFAULT '',
  ADD COLUMN IF NOT EXISTS net_yield text NOT NULL DEFAULT '',
  ADD COLUMN IF NOT EXISTS occupancy_rate text NOT NULL DEFAULT '',
  ADD COLUMN IF NOT EXISTS annual_expenses text NOT NULL DEFAULT '',
  ADD COLUMN IF NOT EXISTS roi_notes text NOT NULL DEFAULT '',
  ADD COLUMN IF NOT EXISTS location_highlights text[] NOT NULL DEFAULT '{}'::text[];