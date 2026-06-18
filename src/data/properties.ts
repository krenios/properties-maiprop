import type { Json } from "@/integrations/supabase/types";

// Property type matching the database schema (snake_case)
export interface Property {
  id: string;
  title: string;
  description: string;
  images: string[];
  before_image: string;
  after_image: string;
  price: number | null;
  size: number | null;
  bedrooms: number | null;
  floor_plan: string;
  location: string;
  poi: string[];
  poi_cache?: Json;
  tags: string[];
  // status: Available / Booked / Sold
  // (legacy: some older rows used status="under-construction")
  status: "available" | "booked" | "sold" | "under-construction" | "";
  // project_type: Renovated / Under Construction / Ready
  // (legacy: "new" | "delivered")
  project_type: "ready" | "under-construction" | "renovated" | "new" | "delivered" | "";
  yield: string;
  delivery_eta?: string | null;
  gross_yield?: string | null;
  net_yield?: string | null;
  occupancy_rate?: string | null;
  annual_expenses?: string | null;
  roi_notes?: string | null;
  location_highlights?: string[] | null;
  date_added: string;
  floor: string;
  construction_year: string;
  sort_order: number;
  market_report: string;
}
