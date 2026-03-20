-- =============================================================================
-- Leads table — unified lead capture for agents, professionals, developers
-- Replaces legacy marketing leads; used by LeadsCRM for all users who need contacts
-- =============================================================================

CREATE TABLE IF NOT EXISTS public.leads (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  owner_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  source TEXT NOT NULL DEFAULT 'manual' CHECK (source IN (
    'manual', 'listing_inquiry', 'consultation', 'callback', 'project_inquiry', 'viewing', 'message'
  )),
  listing_id UUID REFERENCES public.listings(id) ON DELETE SET NULL,
  professional_id UUID REFERENCES public.professionals(id) ON DELETE SET NULL,
  project_id UUID REFERENCES public.projects(id) ON DELETE SET NULL,
  name TEXT NOT NULL,
  email TEXT,
  phone TEXT,
  message TEXT,
  status TEXT NOT NULL DEFAULT 'new' CHECK (status IN (
    'new', 'contacted', 'qualified', 'proposal', 'negotiation', 'won', 'lost'
  )),
  notes TEXT,
  follow_up_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;

-- Legacy compatibility: some environments already had a leads table with user_id.
ALTER TABLE public.leads ADD COLUMN IF NOT EXISTS owner_id UUID REFERENCES auth.users(id) ON DELETE CASCADE;
ALTER TABLE public.leads ADD COLUMN IF NOT EXISTS source TEXT NOT NULL DEFAULT 'manual';
ALTER TABLE public.leads ADD COLUMN IF NOT EXISTS listing_id UUID REFERENCES public.listings(id) ON DELETE SET NULL;
ALTER TABLE public.leads ADD COLUMN IF NOT EXISTS professional_id UUID REFERENCES public.professionals(id) ON DELETE SET NULL;
ALTER TABLE public.leads ADD COLUMN IF NOT EXISTS project_id UUID REFERENCES public.projects(id) ON DELETE SET NULL;
ALTER TABLE public.leads ADD COLUMN IF NOT EXISTS message TEXT;
ALTER TABLE public.leads ADD COLUMN IF NOT EXISTS status TEXT NOT NULL DEFAULT 'new';
ALTER TABLE public.leads ADD COLUMN IF NOT EXISTS notes TEXT;
ALTER TABLE public.leads ADD COLUMN IF NOT EXISTS follow_up_at TIMESTAMPTZ;
ALTER TABLE public.leads ADD COLUMN IF NOT EXISTS updated_at TIMESTAMPTZ NOT NULL DEFAULT now();

DO $$
BEGIN
  IF EXISTS (
    SELECT 1
    FROM information_schema.columns
    WHERE table_schema = 'public' AND table_name = 'leads' AND column_name = 'user_id'
  ) THEN
    EXECUTE 'UPDATE public.leads SET owner_id = user_id WHERE owner_id IS NULL';
  END IF;
END $$;

-- Users see their own leads
DROP POLICY IF EXISTS "Users select own leads" ON public.leads;
CREATE POLICY "Users select own leads"
  ON public.leads FOR SELECT
  USING (owner_id = auth.uid());

DROP POLICY IF EXISTS "Users insert own leads" ON public.leads;
CREATE POLICY "Users insert own leads"
  ON public.leads FOR INSERT
  WITH CHECK (owner_id = auth.uid());

DROP POLICY IF EXISTS "Users update own leads" ON public.leads;
CREATE POLICY "Users update own leads"
  ON public.leads FOR UPDATE
  USING (owner_id = auth.uid())
  WITH CHECK (owner_id = auth.uid());

DROP POLICY IF EXISTS "Users delete own leads" ON public.leads;
CREATE POLICY "Users delete own leads"
  ON public.leads FOR DELETE
  USING (owner_id = auth.uid());

-- Platform admin sees all leads
DROP POLICY IF EXISTS "Admin select all leads" ON public.leads;
CREATE POLICY "Admin select all leads"
  ON public.leads FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE user_id = auth.uid()
      AND (role::text = 'admin' OR is_platform_admin = true)
    )
  );

CREATE INDEX IF NOT EXISTS idx_leads_owner ON public.leads(owner_id);
CREATE INDEX IF NOT EXISTS idx_leads_status ON public.leads(status);
CREATE INDEX IF NOT EXISTS idx_leads_source ON public.leads(source);
CREATE INDEX IF NOT EXISTS idx_leads_follow_up ON public.leads(follow_up_at);
CREATE INDEX IF NOT EXISTS idx_leads_listing ON public.leads(listing_id);
CREATE INDEX IF NOT EXISTS idx_leads_created ON public.leads(created_at DESC);

DROP TRIGGER IF EXISTS update_leads_updated_at ON public.leads;
CREATE TRIGGER update_leads_updated_at
  BEFORE UPDATE ON public.leads
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
