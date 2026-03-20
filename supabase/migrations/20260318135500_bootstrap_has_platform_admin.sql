-- Bridge migration to ensure has_platform_admin(uuid) exists for security migrations.

CREATE OR REPLACE FUNCTION public.has_platform_admin(_user_id UUID)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.profiles p
    WHERE p.user_id = _user_id
      AND COALESCE(p.is_platform_admin, false) = true
  );
$$;
