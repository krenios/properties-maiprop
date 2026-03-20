-- Bridge migration to ensure admin role exists for legacy checks.

ALTER TYPE public.user_role ADD VALUE IF NOT EXISTS 'admin';
