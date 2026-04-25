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
  tags: string[];
  // status: Available / Booked / Sold
  // (legacy: some older rows used status="under-construction")
  status: "available" | "booked" | "sold" | "under-construction" | "";
  // project_type: Renovated / Under Construction / Ready
  // (legacy: "new" | "delivered")
  project_type: "ready" | "under-construction" | "renovated" | "new" | "delivered" | "";
  yield: string;
  date_added: string;
  floor: string;
  construction_year: string;
  sort_order: number;
  market_report: string;
  // Optional deal-detail fields (added 2026-04)
  delivery_eta: string;
  gross_yield: string;
  net_yield: string;
  occupancy_rate: string;
  annual_expenses: string;
  roi_notes: string;
  location_highlights: string[];
}
