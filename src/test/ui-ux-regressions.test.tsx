import React from "react";
import { act, fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it, vi, beforeEach, afterEach } from "vitest";
import CookieConsent from "@/components/CookieConsent";
import DeliveredProjects from "@/components/DeliveredProjects";
import { LeadBotProvider } from "@/components/LeadBotProvider";
import Navbar from "@/components/Navbar";
import PropertyCard from "@/components/PropertyCard";
import type { Property } from "@/data/properties";

const baseProperty: Property = {
  id: "athens-1",
  title: "Athens Golden Visa Apartment",
  description: "A compliant Golden Visa property.",
  images: ["/property.jpg"],
  before_image: "",
  after_image: "/after.jpg",
  price: 250000,
  size: 75,
  bedrooms: 2,
  floor_plan: "",
  location: "Athens",
  poi: [],
  tags: [],
  status: "available",
  project_type: "renovated",
  yield: "5%",
  date_added: "2026-01-01",
  floor: "2nd",
  construction_year: "1975",
  sort_order: 1,
  market_report: "",
};

vi.mock("@/contexts/TranslationContext", () => ({
  LANGUAGES: [{ code: "en", label: "English", flag: "GB" }],
  useTranslation: () => ({
    language: "en",
    setLanguage: () => {},
    t: (text: string) => text,
    isTranslating: false,
  }),
}));

vi.mock("@/contexts/PropertyContext", () => ({
  useProperties: () => ({
    properties: [baseProperty],
  }),
}));

beforeEach(() => {
  localStorage.clear();
  sessionStorage.clear();
});

afterEach(() => {
  vi.useRealTimers();
});

describe("UI/UX regression fixes", () => {
  it("uses property-specific action names on property cards", () => {
    render(
      <MemoryRouter>
        <LeadBotProvider>
          <PropertyCard property={baseProperty} onClick={() => {}} />
        </LeadBotProvider>
      </MemoryRouter>,
    );

    expect(screen.getByRole("button", { name: `Inquire about ${baseProperty.title}` })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: `View ${baseProperty.title}` })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: `Share ${baseProperty.title}` })).toBeInTheDocument();
  });

  it("does not nest links or buttons inside delivered project card buttons", () => {
    render(
      <MemoryRouter>
        <DeliveredProjects />
      </MemoryRouter>,
    );

    const nestedInteractive = Array.from(document.querySelectorAll("button")).filter((button) =>
      button.querySelector("a,button,input,select,textarea,[role='button']")
    );

    expect(nestedInteractive).toHaveLength(0);
  });

  it("opens the mobile navigation as a modal-style drawer", () => {
    render(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>,
    );

    fireEvent.click(screen.getByRole("button", { name: "Open navigation menu" }));

    const drawer = screen.getByRole("dialog", { name: "Mobile navigation" });
    expect(drawer).toHaveAttribute("aria-modal", "true");
    expect(drawer.className).toContain("fixed");
    expect(drawer.className).toContain("bottom-0");
  });

  it("positions cookie consent away from the mobile assistant bottom sheet", async () => {
    vi.useFakeTimers();

    render(<CookieConsent />);
    await act(async () => {
      vi.advanceTimersByTime(1500);
    });

    const banner = screen.getByRole("dialog", { name: "Cookie consent" });
    expect(banner.className).toContain("max-sm:top-20");
    expect(banner.className).toContain("max-sm:bottom-auto");
  });
});
