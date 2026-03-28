-- Harden user_roles against privilege escalation: never allow an authenticated session
-- to INSERT a row that grants *itself* the admin role, even if other policies were
-- misconfigured. Existing admins can still grant admin to *other* user_ids.
--
-- Bootstrap: the first admin row must be inserted as postgres / service role (RLS bypass)
-- or via Supabase SQL Editor — not as a normal authenticated self-insert.

CREATE POLICY "user_roles_block_self_admin_insert"
  ON public.user_roles
  AS RESTRICTIVE
  FOR INSERT
  TO authenticated
  WITH CHECK (
    NOT (
      user_id = auth.uid()
      AND role = 'admin'::public.app_role
    )
  );

-- Same guard on UPDATE so a row cannot be changed to (self, admin) via a buggy policy.
CREATE POLICY "user_roles_block_self_admin_update"
  ON public.user_roles
  AS RESTRICTIVE
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (
    NOT (
      user_id = auth.uid()
      AND role = 'admin'::public.app_role
    )
  );
