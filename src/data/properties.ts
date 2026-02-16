export interface Property {
  id: string;
  title: string;
  description: string;
  images: string[];
  beforeImage: string;
  afterImage: string;
  price: number | null;
  size: number | null;
  bedrooms: number | null;
  floorPlan: string;
  location: string;
  poi: string[];
  tags: string[];
  status: "available" | "sold" | "under-construction" | "";
  projectType: "new" | "delivered";
  yield: string;
  dateAdded: string;
}

export const initialProperties: Property[] = [
  {
    id: "1",
    title: "Athenian Riviera Residence",
    description: "Premium seafront apartment in the Athens Riviera with panoramic Aegean views.",
    images: [
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800",
    ],
    beforeImage: "",
    afterImage: "",
    price: 280000,
    size: 95,
    bedrooms: 2,
    floorPlan: "https://images.unsplash.com/photo-1574362848149-11496d93a7c7?w=800",
    location: "Glyfada, Athens Riviera",
    poi: ["Beach 200m", "Metro 500m", "Marina 1km"],
    tags: ["Balcony", "Sea View", "Luxury"],
    status: "available",
    projectType: "new",
    yield: "5.2%",
    dateAdded: "2024-12-01",
  },
  {
    id: "2",
    title: "Kolonaki Boutique Suite",
    description: "Elegant boutique apartment in Athens' most prestigious neighborhood.",
    images: [
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800",
    ],
    beforeImage: "",
    afterImage: "",
    price: 320000,
    size: 78,
    bedrooms: 1,
    floorPlan: "",
    location: "Kolonaki, Athens",
    poi: ["Syntagma Square 800m", "Lycabettus Hill 300m"],
    tags: ["Studio", "Terrace", "City Center"],
    status: "available",
    projectType: "new",
    yield: "4.8%",
    dateAdded: "2025-01-15",
  },
  {
    id: "3",
    title: "Piraeus Port View Loft",
    description: "Modern loft conversion with direct port views, ideal for short-term rental.",
    images: [
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800",
    ],
    beforeImage: "",
    afterImage: "",
    price: 195000,
    size: 65,
    bedrooms: 1,
    floorPlan: "https://images.unsplash.com/photo-1574362848149-11496d93a7c7?w=800",
    location: "Piraeus, Athens",
    poi: ["Port 100m", "Metro 400m", "Restaurants 200m"],
    tags: ["Loft", "Port View", "Short-Term Rental"],
    status: "available",
    projectType: "new",
    yield: "6.1%",
    dateAdded: "2025-02-01",
  },
  {
    id: "4",
    title: "Psyrri Heritage Renovation",
    description: "Delivered neoclassical building fully renovated in Athens' cultural heart.",
    images: [
      "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=800",
    ],
    beforeImage: "https://images.unsplash.com/photo-1464146072230-91cabc968266?w=800",
    afterImage: "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=800",
    price: 420000,
    size: 120,
    bedrooms: 3,
    floorPlan: "",
    location: "Psyrri, Athens",
    poi: ["Monastiraki 300m", "Acropolis 1km"],
    tags: ["Neoclassical", "Renovation", "Rooftop"],
    status: "sold",
    projectType: "delivered",
    yield: "5.5%",
    dateAdded: "2024-06-01",
  },
  {
    id: "5",
    title: "Vouliagmeni Coastal Villa",
    description: "Luxury delivered villa steps from the coastline with private garden.",
    images: [
      "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800",
    ],
    beforeImage: "https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?w=800",
    afterImage: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800",
    price: 580000,
    size: 180,
    bedrooms: 4,
    floorPlan: "https://images.unsplash.com/photo-1574362848149-11496d93a7c7?w=800",
    location: "Vouliagmeni, Athens",
    poi: ["Beach 100m", "Lake Vouliagmeni 500m"],
    tags: ["Villa", "Garden", "Coastal"],
    status: "sold",
    projectType: "delivered",
    yield: "4.2%",
    dateAdded: "2024-03-15",
  },
];
