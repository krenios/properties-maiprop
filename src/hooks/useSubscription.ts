export function useSubscription() {
  // Minimal implementation: treat everyone as non-Pro.
  // This keeps the app compiling/building; entitlement logic can be
  // implemented later when the billing model is finalized.
  return { isPro: false };
}

