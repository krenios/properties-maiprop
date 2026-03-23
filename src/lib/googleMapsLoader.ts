import { importLibrary, setOptions } from "@googlemaps/js-api-loader";

// setOptions must be called exactly once before any importLibrary call.
// Centralising here prevents "Loader must not be initialized" errors
// that occur when multiple components each call setOptions independently.
setOptions({
  key: import.meta.env.VITE_GOOGLE_MAPS_API_KEY || "",
  v: "weekly",
});

export { importLibrary };
