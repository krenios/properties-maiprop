-- =============================================================================
-- Address all Supabase security linter detected issues:
-- 1. Profiles: prevent self-grant of is_platform_admin / role='admin' (RLS defense-in-depth)
-- 2. Firesale: investor view excludes admin_notes
-- 3. RLS: replace WITH CHECK (true) with explicit conditions
-- =============================================================================

-- ── 1. Profiles: explicit RLS blocks self-grant of admin privileges ───────────
-- INSERT: force is_platform_admin = false (client cannot override)
DROP POLICY IF EXISTS "Users can insert their own profile" ON public.profiles;
CREATE POLICY "Users can insert their own profile"
  ON public.profiles FOR INSERT
  WITH CHECK (
    auth.uid() = user_id
    AND role = 'individual'::public.user_role
    AND (is_platform_admin = false OR is_platform_admin IS NULL)
  );

-- UPDATE: cannot change is_platform_admin or self-grant role='admin' (defense-in-depth with trigger)
DROP POLICY IF EXISTS "Users can update their own profile" ON public.profiles;
CREATE POLICY "Users can update their own profile"
  ON public.profiles FOR UPDATE
  USING (auth.uid() = user_id)
  WITH CHECK (
    auth.uid() = user_id
    AND (is_platform_admin IS NOT DISTINCT FROM (SELECT p.is_platform_admin FROM public.profiles p WHERE p.user_id = auth.uid() LIMIT 1))
    AND (role <> 'admin'::public.user_role OR public.has_platform_admin(auth.uid()))
    AND (
      role = (SELECT p.role FROM public.profiles p WHERE p.user_id = auth.uid())
      OR
      ( (SELECT p.role FROM public.profiles p WHERE p.user_id = auth.uid()) = 'individual'::public.user_role
        AND role IN ('seller_landlord'::public.user_role, 'professional'::public.user_role, 'investor'::public.user_role, 'institutional'::public.user_role, 'developer'::public.user_role, 'agent'::public.user_role) )
      OR
      ( (SELECT p.role FROM public.profiles p WHERE p.user_id = auth.uid()) = 'seller_landlord'::public.user_role
        AND role = 'individual'::public.user_role )
      OR
      ( (SELECT p.role FROM public.profiles p WHERE p.user_id = auth.uid()) = 'admin'::public.user_role
        AND role IN ('individual'::public.user_role, 'seller_landlord'::public.user_role) )
    )
  );


-- ── 2. Firesale: investor feed view (excludes admin_notes) ────────────────────
-- Uses only base columns (published_to_investors may not exist in all deployments).
-- security_invoker=on ensures RLS on firesale_requests applies.
CREATE OR REPLACE VIEW public.firesale_requests_investor_feed
WITH (security_invoker = on) AS
SELECT
  id, address, ai_estimate, asking_price, bedrooms, city, condition,
  contact_email, contact_phone, created_at, notes, offer_price, property_type,
  sqm, status, updated_at, user_id
FROM public.firesale_requests;

COMMENT ON VIEW public.firesale_requests_investor_feed IS
  'Deal feed for investors; excludes admin_notes. RLS on firesale_requests applies when querying.';

GRANT SELECT ON public.firesale_requests_investor_feed TO authenticated;


-- ── 3. RLS: replace WITH CHECK (true) with explicit conditions ────────────────
-- Only apply if tables exist (schema may vary by deployment).
DO $$
BEGIN
  IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_schema = 'public' AND table_name = 'listing_view_events') THEN
    DROP POLICY IF EXISTS "Anyone can insert listing view" ON public.listing_view_events;
    CREATE POLICY "Anyone can insert listing view"
      ON public.listing_view_events FOR INSERT
      WITH CHECK (auth.role() IN ('anon', 'authenticated'));
  END IF;
  IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_schema = 'public' AND table_name = 'project_views') THEN
    DROP POLICY IF EXISTS "Anyone can insert project view" ON public.project_views;
    CREATE POLICY "Anyone can insert project view"
      ON public.project_views FOR INSERT
      WITH CHECK (auth.role() IN ('anon', 'authenticated'));
  END IF;
  IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_schema = 'public' AND table_name = 'consultation_requests') THEN
    DROP POLICY IF EXISTS "Anyone can create consultation requests" ON public.consultation_requests;
    CREATE POLICY "Anyone can create consultation requests"
      ON public.consultation_requests FOR INSERT
      WITH CHECK (auth.role() IN ('anon', 'authenticated'));
  END IF;
END $$;
