-- Bridge migration for older firesale_requests shape.

ALTER TABLE public.firesale_requests
  ADD COLUMN IF NOT EXISTS published_to_investors BOOLEAN NOT NULL DEFAULT false;

CREATE INDEX IF NOT EXISTS idx_firesale_requests_published_to_investors
  ON public.firesale_requests (published_to_investors);
