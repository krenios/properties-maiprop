
DO $$
BEGIN
  -- Ensure profiles.user_id has unique constraint (needed for FK and PostgREST join)
  IF to_regclass('public.profiles') IS NOT NULL THEN
    ALTER TABLE public.profiles DROP CONSTRAINT IF EXISTS profiles_user_id_key;
    ALTER TABLE public.profiles ADD CONSTRAINT profiles_user_id_key UNIQUE (user_id);
  END IF;

  -- Professionals FK adjustments only if professionals table exists
  IF to_regclass('public.professionals') IS NOT NULL THEN
    ALTER TABLE public.professionals DROP CONSTRAINT IF EXISTS professionals_user_id_fkey;
    ALTER TABLE public.professionals
      ADD CONSTRAINT professionals_user_id_fkey
      FOREIGN KEY (user_id) REFERENCES public.profiles(user_id) ON DELETE CASCADE;
  END IF;
END $$;
