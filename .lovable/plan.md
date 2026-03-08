

## Current State Assessment

**What's already strong:**
- 10 SEO landing pages with full technical SEO (H1, canonical, FAQ JSON-LD, og tags, hreflang)
- Property pages with Apartment JSON-LD, dynamic keywords, before/after slider
- Google Ads remarketing + high-intent behavioral funnel (guide → property)
- Dynamic sitemap, entity graph with @id anchors
- Lead Capture Bot with location tagging

**What's missing / high-impact gaps:**

1. **Review/Rating schema on property pages** — No `aggregateRating` or `review` structured data. Google can show star ratings in SERPs for properties.

2. **Property-level FAQ schema** — Individual property pages have zero FAQ JSON-LD. Adding 3–4 property-specific Q&As (e.g., "Is this property Golden Visa eligible?", "What is the expected rental yield?") would capture long-tail question searches.

3. **Missing `og:locale:alternate` on key pages** — `GoldenVisa250k.tsx`, `GoldenVisaJourney.tsx`, `GreekGoldenVisaRequirements.tsx`, `Guides.tsx`, `Properties.tsx` all lack `og:locale:alternate` tags (the previous work only covered the 10 SEO landing pages + 3 core pages).

4. **Stale `dateModified` on multiple pages** — `GoldenVisa250k.tsx` has `dateModified: "2025-03-01"`, `GoldenVisaJourney.tsx` has `dateModified: "2025-03-01"` (both Article and WebPage schemas), `GreekGoldenVisaRequirements.tsx` has `dateModified: "2025-02-01"` in `articleLd` and `2025-03-01` in `jsonLd`.

5. **`Properties.tsx` missing `og:locale` and `og:locale:alternate`** — The properties catalog page serves as the main investment hub but has no locale meta tags at all.

6. **No `VideoObject` schema** — If any properties have walkthrough videos, this would significantly boost visibility.

7. **No `RealEstateListing` or `LodgingBusiness` cross-linking schema** — The organization schema on PropertyPage doesn't reference the specific properties it lists.

---

## Plan

**5 concrete improvements to implement:**

### 1. Add FAQ JSON-LD to every individual property page
Generate dynamic, property-specific FAQ entries on `PropertyPage.tsx`:
- "Is [title] eligible for the Greek Golden Visa?" → Yes, this property qualifies...
- "What is the expected rental yield for this property?" → Based on location/yield field
- "Where is [title] located?" → [location], Greece, within [area details]
- "How long does it take to complete the Golden Visa purchase?" → 6–9 months...

### 2. Fix stale `dateModified` on 3 remaining pages
- `GoldenVisa250k.tsx`: both `pageLd` and `articleLd` → `"2026-03-06"`
- `GoldenVisaJourney.tsx`: both inline Article and WebPage schemas → `"2026-03-06"`
- `GreekGoldenVisaRequirements.tsx`: `articleLd.dateModified` → `"2026-03-06"`, `jsonLd.dateModified` → `"2026-03-06"`

### 3. Add `og:locale` + `og:locale:alternate` to 5 missing pages
- `GoldenVisa250k.tsx`
- `GoldenVisaJourney.tsx`
- `GreekGoldenVisaRequirements.tsx`
- `Guides.tsx`
- `Properties.tsx`

Each gets: `og:locale=en_US` + alternates for `ar_AE`, `zh_CN`, `ru_RU`, `tr_TR`

### 4. Add `AggregateOffer` schema to `Properties.tsx`
Upgrade the CollectionPage schema on `/properties/` to include an `AggregateOffer` block showing price range and availability count — helps Google display rich price snippets for the property catalog.

### 5. Add `og:type="article"` to `GoldenVisa250k.tsx` and fix `GoldenVisaJourney.tsx`
Currently both use `og:type="website"` but they have Article JSON-LD. These should be `"article"` to match schema intent.

---

## Files to Edit

| File | Changes |
|---|---|
| `src/pages/PropertyPage.tsx` | Add dynamic FAQ JSON-LD |
| `src/pages/GoldenVisa250k.tsx` | Fix dateModified × 2, add og:locale tags, fix og:type → article, add og:locale:alternate × 4 |
| `src/pages/GoldenVisaJourney.tsx` | Fix dateModified × 2, add og:locale tags |
| `src/pages/GreekGoldenVisaRequirements.tsx` | Fix dateModified × 2, add og:locale tags |
| `src/pages/Guides.tsx` | Add og:locale tags |
| `src/pages/Properties.tsx` | Add og:locale tags, upgrade CollectionPage to include AggregateOffer |

All changes are purely metadata/JSON-LD — no visual or functional changes to the UI.

