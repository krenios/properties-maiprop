# Access Audit Export

This document is a code-based export of the current access model in the app.

It reports these 4 lists:

1. Routes and pages gated by global `isPro` / `viewerIsPro`
2. Participant-specific Pro products found in code
3. All `ProtectedRoute` routes and who can access them
4. The two systems in the app:
   - Dashboard/nav visibility
   - Actual route/page access

Main source files used:
- `src/App.tsx`
- `src/pages/Dashboard.tsx`
- `src/pages/Pricing.tsx`
- `src/pages/ProfessionalProfile.tsx`
- `src/pages/PropertyDetail.tsx`
- `src/pages/Auctions.tsx`
- `src/hooks/useSubscription.ts`
- `src/components/ProtectedRoute.tsx`
- `src/components/InvestorRoute.tsx`
- `src/components/AdminRoute.tsx`
- `src/components/SellerRoute.tsx`

---

## 1. Routes and pages gated by global `isPro` / `viewerIsPro`

These are features/pages where premium access is controlled by the app-wide Pro flag from `useSubscription()`, not by a participant-specific paid plan.

### 1.1 Full page or route content gated by global Pro

| Route / page | File | Global gate | What unlocks |
|---|---|---|---|
| `/professionals/:id` | `src/pages/ProfessionalProfile.tsx` | `viewerIsPro` | Full professional profile view |
| `/property/:id` | `src/pages/PropertyDetail.tsx` | `isPro` | Property Valuation, Property Report, premium property insights |
| `/auction/:id` | `src/pages/PropertyDetail.tsx` | `isPro` | Same as property detail for auction detail pages |
| `/auctions` | `src/pages/Auctions.tsx` | `isPro` | Advanced auction filters and larger result cap |
| `/dashboard` | `src/pages/Dashboard.tsx` | `isPro` | Pro dashboard nav/modules via `NAV_BY_TYPE` vs `NAV_BY_TYPE_FREE` |

### 1.2 Public routes that still have major Pro-gated content inside them

| Route | File | Free user sees | Pro user sees |
|---|---|---|---|
| `/professionals/:id` | `src/pages/ProfessionalProfile.tsx` | Simplified profile plus upgrade CTA | Full profile, services/reviews/full content |
| `/property/:id` | `src/pages/PropertyDetail.tsx` | Locked valuation/report cards | Runnable premium property tools |
| `/auction/:id` | `src/pages/PropertyDetail.tsx` | Locked valuation/report cards | Runnable premium property tools |
| `/auctions` | `src/pages/Auctions.tsx` | Max 60 listings, no ownership/round/yield filters | Up to 600 listings and advanced filters |

### 1.3 Other meaningful global Pro gates

| Feature / module | File | Gate | Notes |
|---|---|---|---|
| Property valuation execution | `src/components/PropertyValuation.tsx` | `isPro` | Running the valuation is blocked for non-Pro users |
| Buyer dashboard premium cards | `src/pages/Dashboard.tsx` | `isPro` | Some cards/panels are blurred or upsold on free |
| Pricing/current-plan behavior | `src/pages/Pricing.tsx` | `isPro` | Mostly billing state, not a security gate |

### 1.4 Important conclusion

The runtime Pro model is mostly global because `src/hooks/useSubscription.ts` computes one boolean:

- `isPro`

That means a:

- Pro buyer
- Pro seller
- Pro agent
- Pro developer
- Pro professional

can often unlock the same premium information if the page is gated only by `isPro` or `viewerIsPro`.

Examples:

- A Pro agent can view the full profile on `/professionals/:id`
- A Pro agent can use premium property valuation/report features
- A Pro agent can use advanced auction filters

---

## 2. Participant-specific Pro products found in code

These are the participant-specific pricing products and plan keys currently defined in the codebase.

### 2.1 Public pricing plan keys

Defined in `src/pages/Pricing.tsx` via `PLAN_KEYS`.

| Participant | Plan key | Notes |
|---|---|---|
| Buyer | `pro` | The buyer Pro product is effectively the main global Pro product |
| Seller | `seller_pro` | Participant-specific seller Pro key |
| Agent | `agent_basic` | Main public paid agent plan |
| Developer | `agent_basic` | Developer currently reuses the same key as agent |
| Professional | `professional_basic` | Main public paid professional plan |

### 2.2 Admin pricing products

Defined in `src/pages/AdminPricing.tsx` via `DEFAULT_SEED`.

| Product key | Audience / type | Meaning |
|---|---|---|
| `pro` | buyer | Buyer Pro |
| `seller_pro` | seller | Seller Pro |
| `agent_basic` | agent | Agency Pro / agent paid plan |
| `agent_plus` | agent | Higher agent tier exists in config |
| `professional_basic` | professional | Professional Pro |
| `professional_premium` | professional | Higher professional tier exists in config |
| `valuation_single` | addon | Valuation add-on |
| `valuation_bundle` | addon | Valuation bundle |
| `extra_listing` | addon | Extra listing add-on |
| `featured_listing` | addon | Featured listing add-on |
| `premium_ad` | addon | Premium ad add-on |
| `featured_professional` | addon | Featured professional add-on |

### 2.3 Investor / institutional-style paid keys outside the main pricing page

Defined in `src/hooks/usePricingConfigs.ts`.

| Key | Meaning |
|---|---|
| `investor_private` | Private investor tier |
| `investor_institutional` | Institutional investor tier |
| `investor_developer` | Developer/investor tier |

### 2.4 Pro features promised by participant type

Defined mostly in `src/pages/Pricing.tsx`.

#### Buyer Pro
- Property Valuation
- Property Reports
- All pro auction filters
- Priority auction alerts
- Expanded saved searches / alerts
- Similar sales on each listing
- More auction inventory
- More monthly viewings
- Unlimited professionals access

#### Seller Pro
- More listings
- AI listing description assist
- Featured badge
- Listing analytics
- Priority placement

#### Agent Pro
- Unlimited listings
- AI Listing Assistant
- CRM and contacts
- Performance analytics
- Unlimited auction alerts and searches
- Private owner ad alert
- Priority ads
- Priority in directory
- More viewings

#### Developer Pro
- Unlimited listings
- Project showcase pages
- Pre-sale listing management
- Priority placement
- Featured in new building section

#### Professional Pro
- Priority leads
- AI service/client matching
- Verified badge
- Booking page
- Lead analytics
- Branded video room
- AI property tools
- Consultation messaging suite

### 2.5 Actual runtime reality

Even though participant-specific Pro products exist in pricing/config, runtime access is mostly not enforced participant-by-participant.

The main runtime entitlement model is:

- one global `isPro` flag from `src/hooks/useSubscription.ts`

This is why pricing can say "participant-specific Pro", while the actual unlocked access behaves more like a shared premium tier.

### 2.6 Key product mismatches

| Mismatch | Where |
|---|---|
| Developer reuses `agent_basic` instead of a dedicated developer product | `src/pages/Pricing.tsx` |
| Agent has `agent_plus` in config but it is not clearly represented on the public pricing page | `src/pages/AdminPricing.tsx`, `src/hooks/usePricingConfigs.ts` |
| Professional has `professional_premium` in config but public pricing mainly surfaces one paid track | same |
| `isPro` checks only one main product id | `src/hooks/useSubscription.ts` |

---

## 3. All `ProtectedRoute` routes and who can access them

`ProtectedRoute` is defined in `src/components/ProtectedRoute.tsx`.

Base rule:

- not logged in -> redirected to `/login`
- logged in but onboarding incomplete -> redirected to `/onboarding`
- otherwise -> allowed

So `ProtectedRoute` means:

- authenticated user
- onboarding complete

unless the page itself applies additional restrictions.

### 3.1 Direct `ProtectedRoute` routes from `src/App.tsx`

| Route | Wrapper | Who can access today | Notes |
|---|---|---|---|
| `/listings/new` | `ProtectedRoute` | Any authenticated, onboarded user reaches route | `src/pages/CreateListing.tsx` adds its own participant check |
| `/listings/new-building` | `ProtectedRoute` | Any authenticated, onboarded user reaches route | `src/pages/CreateNewBuildingListing.tsx` adds its own participant check |
| `/professionals/me` | `ProtectedRoute` | Any authenticated, onboarded user | No strict professional-only route wrapper |
| `/onboarding` | `ProtectedRoute` | Any authenticated user | Special loop handling in `ProtectedRoute` |
| `/dashboard` | `ProtectedRoute` | Any authenticated, onboarded user | Sections depend on dashboard/nav logic |
| `/dashboard/:section` | `ProtectedRoute` | Same as `/dashboard` | Invalid/hidden sections fall back inside the page |
| `/messages` | `ProtectedRoute` | Any authenticated, onboarded user | No extra role gate found |
| `/projects` | `ProtectedRoute` | Any authenticated, onboarded user | No route-level developer-only gate |
| `/projects/:id` | `ProtectedRoute` | Any authenticated, onboarded user | No route-level developer-only gate |
| `/portfolios` | `ProtectedRoute` | Any authenticated, onboarded user | No route-level developer-only gate |

### 3.2 Routes with stronger wrappers

| Route | Wrapper | Who can access |
|---|---|---|
| `/investor-dashboard` | `InvestorRoute` | Authenticated, onboarded, eligible investor / quick-sale eligible user |
| `/admin` | `AdminRoute` | Platform admin only |
| `/admin/pricing` | `AdminRoute` | Platform admin only |

### 3.3 Routes that are public but still have feature locks inside them

| Route | Route access | Internal access behavior |
|---|---|---|
| `/professionals/:id` | Public | Full profile is locked unless `viewerIsPro` |
| `/property/:id` | Public | Valuation/report tools locked unless `isPro` |
| `/auction/:id` | Public | Valuation/report tools locked unless `isPro` |
| `/auctions` | Public | Premium filters / larger cap unlocked only for `isPro` |

### 3.4 Important architecture note

`src/components/SellerRoute.tsx` exists and is clearly intended to enforce sell-side role access, but it is not actually used in `src/App.tsx` for:

- `/listings/new`
- `/listings/new-building`

So the real route model is looser than the intended architecture suggests.

---

## 4. The two systems in the app

There are two different systems:

1. Dashboard/nav visibility
2. Actual route/page access

They are not perfectly aligned.

That means:

- the dashboard may hide a module
- but the route may still work if the user knows the URL

### 4.1 System A: Dashboard/nav visibility

Controlled mainly in `src/pages/Dashboard.tsx` by:

- `NAV_BY_TYPE`
- `NAV_BY_TYPE_FREE`
- `getNavItemsForBioType(...)`

This decides which modules appear in the dashboard by participant type and by Free vs Pro.

#### Dashboard/nav modules by participant

| Participant | Free nav/modules | Pro nav/modules |
|---|---|---|
| Buyer | Overview, Saved, Saved Searches, Messages, Viewings, Auction Alerts, Profile, Settings | Overview, Saved, Saved Searches, Open Houses, Messages, Viewings, Auction Alerts, Profile, Settings |
| Seller | Overview, My Listings, Messages, Viewings, Profile, Settings | Overview, My Listings, Saved, Saved Searches, Messages, Viewings, Open Houses, Profile, Settings |
| Agent | Overview, My Listings, Saved, Messages, Viewings, Auction Alerts, Profile, Settings | Overview, My Listings, Analytics, Saved, Saved Searches, Messages, Viewings, Auction Alerts, Open Houses, Leads, Contacts, Profile, Settings |
| Developer | Overview, My Listings, Messages, Profile, Settings | Overview, My Listings, Analytics, Saved, Saved Searches, Messages, Viewings, Leads, Contacts, Projects, Portfolios, Profile, Settings |
| Professional | Overview, My Services, Leads, Messages, Profile, Settings | Overview, My Services, Booking, Leads, Contacts, Analytics, Messages, Viewings, Profile, Settings |
| Admin | Full set | Full set |

### 4.2 System B: Actual route/page access

Controlled mainly in:

- `src/App.tsx`
- `ProtectedRoute`
- `InvestorRoute`
- `AdminRoute`
- page-level checks inside route components
- global `isPro` checks inside public pages

This decides:

- whether the route loads at all
- whether the route loads but shows only partial content
- whether the route is public but premium sections are locked

### 4.3 Confirmed mismatch cases

#### A. Dashboard hides a module, but the route still works

| Module / route | Dashboard visibility | Actual route access | Result |
|---|---|---|---|
| `Projects` / `/projects` | Only shown for developer/admin-style flows | Route is only `ProtectedRoute` | Many authenticated users can open it directly |
| `ProjectDetail` / `/projects/:id` | Hidden unless role/nav exposes it | Route is only `ProtectedRoute` | Direct URL still works |
| `Portfolios` / `/portfolios` | Hidden for most users | Route is only `ProtectedRoute` | Direct URL still works |

#### B. Pricing implies participant-specific premium access, but actual gate is global Pro

| Feature | Pricing implication | Actual gate |
|---|---|---|
| Full professional profile | Feels like a directory/participant-specific premium feature | Actually gated by global `viewerIsPro` |
| Property valuation / reports | Marketed mostly as premium buyer tools | Actually gated by global `isPro` |
| Auction advanced filters | Presented as premium plan benefits by participant | Actually gated by global `isPro` |
| Dashboard premium modules | Displayed as participant-specific modules | Runtime switch is mainly one global `isPro` |

#### C. Pricing and dashboard modules are not one-to-one

| Participant | Dashboard exposes more than pricing explicitly names |
|---|---|
| Buyer Pro | `Open Houses` appears as a module in nav |
| Seller Pro | `Saved`, `Saved Searches`, `Open Houses` appear in nav |
| Agent Pro | `Open Houses`, `Saved Searches`, `Leads`, `Contacts`, `Analytics` appear as modules |
| Developer Pro | `Saved`, `Saved Searches`, `Viewings`, `Leads`, `Contacts`, `Projects`, `Portfolios` appear as modules |
| Professional Pro | `Contacts`, `Viewings`, `Booking`, `Analytics` appear as modules |

### 4.4 Summary of the misalignment

System 1:

- Dashboard/nav visibility
- Participant-aware
- Free vs Pro aware
- Mostly UI/module visibility logic

System 2:

- Actual route/page access
- Not always participant-specific
- Often weaker than the dashboard implies
- Often based on one global `isPro`

### 4.5 Practical result

A user can sometimes:

- not see a module in the dashboard
- but still access the route by typing the URL

Or:

- buy one Pro plan
- and unlock premium information that appears broader than that participant's pricing copy suggests

---

## Final takeaway

The app currently mixes:

- participant-specific pricing language
- one global runtime Pro entitlement
- dashboard visibility rules
- route-level guards

Because those systems are not fully aligned, access behavior can be broader than the pricing page suggests.
