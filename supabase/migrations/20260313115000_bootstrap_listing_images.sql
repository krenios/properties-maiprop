-- Bridge migration to ensure listing_images exists before policy migrations.

CREATE TABLE IF NOT EXISTS public.listing_images (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  listing_id UUID NOT NULL REFERENCES public.listings(id) ON DELETE CASCADE,
  url TEXT NOT NULL,
  sort_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.listing_images ENABLE ROW LEVEL SECURITY;

DO $$ BEGIN
  CREATE POLICY "Listing images are public"
    ON public.listing_images FOR SELECT USING (true);
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN
  CREATE POLICY "Owners can manage listing images"
    ON public.listing_images FOR ALL
    USING (
      EXISTS (
        SELECT 1 FROM public.listings l
        WHERE l.id = listing_id
          AND l.owner_id = auth.uid()
      )
    )
    WITH CHECK (
      EXISTS (
        SELECT 1 FROM public.listings l
        WHERE l.id = listing_id
          AND l.owner_id = auth.uid()
      )
    );
EXCEPTION WHEN duplicate_object THEN NULL; END $$;
