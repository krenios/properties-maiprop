
-- Add admin_notes column to firesale_requests
ALTER TABLE public.firesale_requests ADD COLUMN IF NOT EXISTS admin_notes text;

-- Add RLS policy for agent/admin-like users to view/update firesale requests.
-- Guarded for idempotency and to avoid enum-signature mismatch in legacy has_role().
DO $$
BEGIN
  DROP POLICY IF EXISTS "Admins can view all firesale requests" ON public.firesale_requests;
  CREATE POLICY "Admins can view all firesale requests"
    ON public.firesale_requests
    FOR SELECT
    TO authenticated
    USING (
      EXISTS (
        SELECT 1
        FROM public.profiles p
        WHERE p.user_id = auth.uid()
          AND p.role::text = 'agent'
      )
    );

  DROP POLICY IF EXISTS "Admins can update all firesale requests" ON public.firesale_requests;
  CREATE POLICY "Admins can update all firesale requests"
    ON public.firesale_requests
    FOR UPDATE
    TO authenticated
    USING (
      EXISTS (
        SELECT 1
        FROM public.profiles p
        WHERE p.user_id = auth.uid()
          AND p.role::text = 'agent'
      )
    );
END $$;
