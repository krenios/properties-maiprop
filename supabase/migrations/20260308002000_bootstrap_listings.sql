-- Bridge migration to ensure listings exists before later ALTER migrations.

DO $$
BEGIN
  CREATE TYPE public.listing_type AS ENUM ('sale', 'rent', 'auction', 'firesale');
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

DO $$
BEGIN
  CREATE TYPE public.property_type AS ENUM ('apartment', 'house', 'villa', 'land', 'commercial', 'office');
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

DO $$
BEGIN
  CREATE TYPE public.listing_status AS ENUM ('draft', 'active', 'paused', 'sold', 'rented', 'expired');
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

CREATE TABLE IF NOT EXISTS public.listings (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  owner_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  address TEXT,
  city TEXT NOT NULL,
  region TEXT,
  postal_code TEXT,
  latitude NUMERIC(10, 7),
  longitude NUMERIC(10, 7),
  price NUMERIC(14, 2) NOT NULL,
  price_per_sqm NUMERIC(10, 2),
  sqm NUMERIC(8, 2) NOT NULL,
  bedrooms INTEGER,
  bathrooms INTEGER,
  floor INTEGER,
  total_floors INTEGER,
  year_built INTEGER,
  energy_class TEXT,
  property_type public.property_type NOT NULL,
  listing_type public.listing_type NOT NULL DEFAULT 'sale',
  status public.listing_status NOT NULL DEFAULT 'draft',
  auction_date TIMESTAMP WITH TIME ZONE,
  auction_starting_bid NUMERIC(14, 2),
  auction_court TEXT,
  has_parking BOOLEAN DEFAULT false,
  has_pool BOOLEAN DEFAULT false,
  has_elevator BOOLEAN DEFAULT false,
  has_garden BOOLEAN DEFAULT false,
  has_storage BOOLEAN DEFAULT false,
  has_security BOOLEAN DEFAULT false,
  has_smart_home BOOLEAN DEFAULT false,
  has_video_tour BOOLEAN DEFAULT false,
  has_virtual_tour BOOLEAN DEFAULT false,
  views_count INTEGER NOT NULL DEFAULT 0,
  ai_score INTEGER,
  cadastre_number TEXT,
  enfia_zone TEXT,
  tags TEXT[],
  cover_image_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.listings ENABLE ROW LEVEL SECURITY;

DO $$ BEGIN
  CREATE POLICY "Active listings are public"
    ON public.listings FOR SELECT
    USING (status = 'active' OR auth.uid() = owner_id);
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN
  CREATE POLICY "Owners can insert listings"
    ON public.listings FOR INSERT
    WITH CHECK (auth.uid() = owner_id);
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN
  CREATE POLICY "Owners can update listings"
    ON public.listings FOR UPDATE
    USING (auth.uid() = owner_id);
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN
  CREATE POLICY "Owners can delete listings"
    ON public.listings FOR DELETE
    USING (auth.uid() = owner_id);
EXCEPTION WHEN duplicate_object THEN NULL; END $$;
