-- Repair migration: normalize legacy values and rebuild properties checks
-- so Admin can update status/project_type reliably.

-- 1) Normalize existing data (legacy -> canonical)
UPDATE public.properties
SET project_type = 'ready'
WHERE project_type = 'new';

UPDATE public.properties
SET project_type = 'renovated'
WHERE project_type = 'delivered';

UPDATE public.properties
SET status = 'available'
WHERE status = 'under-construction';

UPDATE public.properties
SET
  status = COALESCE(status, ''),
  project_type = COALESCE(project_type, 'ready');

-- 2) Drop any old CHECK constraints touching status/project_type
DO $$
DECLARE
  c record;
BEGIN
  FOR c IN
    SELECT conname
    FROM pg_constraint
    WHERE conrelid = 'public.properties'::regclass
      AND contype = 'c'
      AND (
        pg_get_constraintdef(oid) ILIKE '%status%'
        OR pg_get_constraintdef(oid) ILIKE '%project_type%'
      )
  LOOP
    EXECUTE format('ALTER TABLE public.properties DROP CONSTRAINT IF EXISTS %I', c.conname);
  END LOOP;
END $$;

-- 3) Recreate canonical constraints
ALTER TABLE public.properties
ADD CONSTRAINT properties_status_check
CHECK (status IN ('', 'available', 'booked', 'sold'));

ALTER TABLE public.properties
ADD CONSTRAINT properties_project_type_check
CHECK (project_type IN ('', 'ready', 'under-construction', 'renovated'));

-- 4) Canonical defaults
ALTER TABLE public.properties
ALTER COLUMN project_type SET DEFAULT 'ready';

ALTER TABLE public.properties
ALTER COLUMN status SET DEFAULT 'available';
