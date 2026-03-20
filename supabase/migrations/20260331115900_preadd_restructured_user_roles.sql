-- Ensure new role enum values are committed before restructure_roles migration.
ALTER TYPE public.user_role ADD VALUE IF NOT EXISTS 'investor';
ALTER TYPE public.user_role ADD VALUE IF NOT EXISTS 'institutional';
ALTER TYPE public.user_role ADD VALUE IF NOT EXISTS 'developer';
