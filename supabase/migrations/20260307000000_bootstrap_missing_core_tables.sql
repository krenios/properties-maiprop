-- Bridge migration for environments where legacy full-schema migration
-- was partially/conditionally skipped. Ensures downstream ALTER migrations
-- have required base tables.

DO $$
BEGIN
  CREATE TYPE public.user_role AS ENUM ('individual', 'agent', 'professional');
EXCEPTION
  WHEN duplicate_object THEN NULL;
END $$;

DO $$
BEGIN
  CREATE TYPE public.listing_type AS ENUM ('sale', 'rent', 'auction', 'firesale');
EXCEPTION
  WHEN duplicate_object THEN NULL;
END $$;

DO $$
BEGIN
  CREATE TYPE public.property_type AS ENUM ('apartment', 'house', 'villa', 'land', 'commercial', 'office');
EXCEPTION
  WHEN duplicate_object THEN NULL;
END $$;

DO $$
BEGIN
  CREATE TYPE public.listing_status AS ENUM ('draft', 'active', 'paused', 'sold', 'rented', 'expired');
EXCEPTION
  WHEN duplicate_object THEN NULL;
END $$;

DO $$
BEGIN
  CREATE TYPE public.viewing_type AS ENUM ('in_person', 'video');
EXCEPTION
  WHEN duplicate_object THEN NULL;
END $$;

DO $$
BEGIN
  CREATE TYPE public.viewing_status AS ENUM ('pending', 'confirmed', 'cancelled', 'completed');
EXCEPTION
  WHEN duplicate_object THEN NULL;
END $$;

DO $$
BEGIN
  CREATE TYPE public.message_status AS ENUM ('sent', 'read');
EXCEPTION
  WHEN duplicate_object THEN NULL;
END $$;

DO $$
BEGIN
  CREATE TYPE public.professional_category AS ENUM (
    'architect',
    'civil_engineer',
    'lawyer',
    'notary',
    'electrician',
    'plumber',
    'contractor',
    'property_manager',
    'valuer',
    'interior_designer',
    'financial_advisor'
  );
EXCEPTION
  WHEN duplicate_object THEN NULL;
END $$;

CREATE TABLE IF NOT EXISTS public.professionals (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
  category public.professional_category NOT NULL,
  title TEXT NOT NULL,
  bio TEXT,
  city TEXT,
  experience_years INTEGER,
  license_number TEXT,
  verified BOOLEAN NOT NULL DEFAULT false,
  rating NUMERIC(3, 2) DEFAULT 0,
  reviews_count INTEGER DEFAULT 0,
  projects_count INTEGER DEFAULT 0,
  specialties TEXT[],
  languages TEXT[],
  hourly_rate NUMERIC(10, 2),
  avatar_url TEXT,
  website_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.professionals ENABLE ROW LEVEL SECURITY;

DO $$ BEGIN
  CREATE POLICY "Professionals are publicly viewable"
    ON public.professionals FOR SELECT USING (true);
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN
  CREATE POLICY "Users can create their own professional profile"
    ON public.professionals FOR INSERT
    WITH CHECK (auth.uid() = user_id);
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN
  CREATE POLICY "Users can update their own professional profile"
    ON public.professionals FOR UPDATE
    USING (auth.uid() = user_id);
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

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

CREATE TABLE IF NOT EXISTS public.firesale_requests (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  address TEXT NOT NULL,
  city TEXT NOT NULL,
  sqm NUMERIC(8, 2) NOT NULL,
  condition TEXT NOT NULL,
  property_type public.property_type,
  bedrooms INTEGER,
  asking_price NUMERIC(14, 2),
  ai_estimate NUMERIC(14, 2),
  offer_price NUMERIC(14, 2),
  status TEXT NOT NULL DEFAULT 'pending',
  contact_email TEXT NOT NULL,
  contact_phone TEXT,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.firesale_requests ENABLE ROW LEVEL SECURITY;

DO $$ BEGIN
  CREATE POLICY "Users can view own firesale requests"
    ON public.firesale_requests FOR SELECT
    USING (auth.uid() = user_id OR user_id IS NULL);
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN
  CREATE POLICY "Anyone can submit a firesale request"
    ON public.firesale_requests FOR INSERT
    WITH CHECK (true);
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN
  CREATE POLICY "Users can update own firesale requests"
    ON public.firesale_requests FOR UPDATE
    USING (auth.uid() = user_id);
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

CREATE TABLE IF NOT EXISTS public.auction_alerts (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  city TEXT,
  min_price NUMERIC(14, 2),
  max_price NUMERIC(14, 2),
  property_type public.property_type,
  court_name TEXT,
  email_notify BOOLEAN DEFAULT true,
  active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.auction_alerts ENABLE ROW LEVEL SECURITY;

DO $$ BEGIN
  CREATE POLICY "Users can manage their own auction alerts"
    ON public.auction_alerts FOR ALL
    USING (auth.uid() = user_id)
    WITH CHECK (auth.uid() = user_id);
EXCEPTION WHEN duplicate_object THEN NULL; END $$;
