-- Persistent translation cache to avoid repeated AI translation costs.
CREATE TABLE IF NOT EXISTS public.translation_cache (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  source_text text NOT NULL,
  target_lang text NOT NULL,
  translated_text text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT translation_cache_unique_source_target UNIQUE (source_text, target_lang)
);

-- Index to speed up lookup by language + source text.
CREATE INDEX IF NOT EXISTS idx_translation_cache_target_source
  ON public.translation_cache (target_lang, source_text);

-- Reuse global updated_at trigger function if it exists.
DO $$
BEGIN
  IF EXISTS (
    SELECT 1
    FROM pg_proc
    WHERE proname = 'update_updated_at_column'
  ) THEN
    DROP TRIGGER IF EXISTS update_translation_cache_updated_at ON public.translation_cache;
    CREATE TRIGGER update_translation_cache_updated_at
      BEFORE UPDATE ON public.translation_cache
      FOR EACH ROW
      EXECUTE FUNCTION public.update_updated_at_column();
  END IF;
END $$;

ALTER TABLE public.translation_cache ENABLE ROW LEVEL SECURITY;

-- Public reads are safe; these are generic UI text mappings.
DROP POLICY IF EXISTS "Translation cache is publicly readable" ON public.translation_cache;
CREATE POLICY "Translation cache is publicly readable"
  ON public.translation_cache
  FOR SELECT
  USING (true);

-- Only admin users can write manually; edge functions use service role and bypass RLS.
DROP POLICY IF EXISTS "Admins can manage translation cache" ON public.translation_cache;
CREATE POLICY "Admins can manage translation cache"
  ON public.translation_cache
  FOR ALL
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));
