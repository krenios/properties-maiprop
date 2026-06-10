# End-to-end & visual regression tests

Playwright-based suite that exercises the public site at desktop (1440x900) and
mobile (390x844) breakpoints.

## Running

```bash
# Run everything (spins up `bun run dev` automatically on port 8080)
bunx playwright test

# Single project
bunx playwright test --project=desktop
bunx playwright test --project=mobile

# Update visual baselines after intentional UI changes
bunx playwright test --update-snapshots

# Run against the deployed preview instead of the local dev server
E2E_BASE_URL=https://properties-maiprop.lovable.app bunx playwright test
```

## Layout

- `smoke.spec.ts` — every public route returns 200 + has an H1, no console errors.
- `nav.spec.ts` — desktop nav links + mobile hamburger menu open/close.
- `modals.spec.ts` — property modal open/close, lead-capture bot open/close.
- `property-page.spec.ts` — `/property/:id` deep route renders gallery + meta.
- `visual.spec.ts` — pixel-diff screenshots of key routes and modal states.
  Baselines live in `tests/e2e/__screenshots__/`.

## Notes

- Cookie consent is pre-accepted via `storageState` so the banner doesn't
  interfere with clicks or screenshots.
- Visual tolerance is 2% pixel diff (`maxDiffPixelRatio: 0.02`) to absorb
  font hinting / anti-aliasing differences across runs.
- Property data is fetched live from the backend. The visual specs target
  *layout* (`mask`s applied to image-heavy regions) rather than exact image
  pixels, so adding/removing properties does not break baselines.