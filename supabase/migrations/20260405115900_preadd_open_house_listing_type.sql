-- Ensure open_house listing_type value is committed before index usage.
ALTER TYPE public.listing_type ADD VALUE IF NOT EXISTS 'open_house';
