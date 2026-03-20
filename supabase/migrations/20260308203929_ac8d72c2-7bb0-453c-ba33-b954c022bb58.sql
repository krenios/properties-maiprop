
-- Create investor_subscriptions table
CREATE TABLE IF NOT EXISTS public.investor_subscriptions (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid NOT NULL,
  tier text NOT NULL CHECK (tier IN ('analyst', 'institutional', 'sovereign')),
  status text NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'cancelled', 'expired', 'trial')),
  started_at timestamp with time zone NOT NULL DEFAULT now(),
  expires_at timestamp with time zone,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now(),
  UNIQUE (user_id)
);

-- Enable Row Level Security
ALTER TABLE public.investor_subscriptions ENABLE ROW LEVEL SECURITY;

DO $$ BEGIN
  CREATE POLICY "Users can view their own subscription"
    ON public.investor_subscriptions
    FOR SELECT
    USING (auth.uid() = user_id);
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN
  CREATE POLICY "Users can create their own subscription"
    ON public.investor_subscriptions
    FOR INSERT
    WITH CHECK (auth.uid() = user_id);
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN
  CREATE POLICY "Users can update their own subscription"
    ON public.investor_subscriptions
    FOR UPDATE
    USING (auth.uid() = user_id);
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

-- Admin-like policy rewritten to avoid legacy enum mismatch in has_role().
DO $$
BEGIN
  DROP POLICY IF EXISTS "Admins can view all subscriptions" ON public.investor_subscriptions;
  CREATE POLICY "Admins can view all subscriptions"
    ON public.investor_subscriptions
    FOR SELECT
    USING (
      EXISTS (
        SELECT 1 FROM public.profiles p
        WHERE p.user_id = auth.uid() AND p.role::text = 'agent'
      )
    );
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$
BEGIN
  DROP POLICY IF EXISTS "Admins can update all subscriptions" ON public.investor_subscriptions;
  CREATE POLICY "Admins can update all subscriptions"
    ON public.investor_subscriptions
    FOR UPDATE
    USING (
      EXISTS (
        SELECT 1 FROM public.profiles p
        WHERE p.user_id = auth.uid() AND p.role::text = 'agent'
      )
    );
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

-- Trigger to auto-update updated_at
DROP TRIGGER IF EXISTS update_investor_subscriptions_updated_at ON public.investor_subscriptions;
CREATE TRIGGER update_investor_subscriptions_updated_at
  BEFORE UPDATE ON public.investor_subscriptions
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
