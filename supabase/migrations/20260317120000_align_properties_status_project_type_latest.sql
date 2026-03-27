-- Align properties table to the latest canonical values used by the app.
-- project_type: ready | under-construction | renovated
-- status: available | booked | sold (or empty)

-- Normalize legacy values before tightening constraints.
UPDATE public.properties
SET project_type = 'ready'
WHERE project_type = 'new';

UPDATE public.properties
SET project_type = 'renovated'
WHERE project_type = 'delivered';

-- Legacy rows used status="under-construction"; project_type now carries this meaning.
UPDATE public.properties
SET status = 'available'
WHERE status = 'under-construction';

-- Ensure no nulls remain.
UPDATE public.properties
SET status = COALESCE(status, ''),
    project_type = COALESCE(project_type, 'ready');

-- Recreate check constraints with latest accepted values.
ALTER TABLE public.properties DROP CONSTRAINT IF EXISTS properties_status_check;
ALTER TABLE public.properties
ADD CONSTRAINT properties_status_check
CHECK (status IN ('', 'available', 'booked', 'sold'));

ALTER TABLE public.properties DROP CONSTRAINT IF EXISTS properties_project_type_check;
ALTER TABLE public.properties
ADD CONSTRAINT properties_project_type_check
CHECK (project_type IN ('ready', 'under-construction', 'renovated', ''));

-- Move default from legacy "new" to "ready".
ALTER TABLE public.properties
ALTER COLUMN project_type SET DEFAULT 'ready';
