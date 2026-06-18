import { defineConfig, type PluginOption } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { componentTagger } from "lovable-tagger";

const chunkGroups: Array<[string, string[]]> = [
  ["vendor-react", ["react", "react-dom"]],
  ["vendor-router", ["react-router-dom", "react-router"]],
  ["vendor-supabase", ["@supabase"]],
  ["vendor-framer", ["framer-motion", "motion-dom", "motion-utils"]],
  ["vendor-lucide", ["lucide-react"]],
  ["vendor-radix", ["@radix-ui"]],
  ["vendor-utils", ["clsx", "tailwind-merge", "class-variance-authority", "date-fns"]],
];

const packageMatcher = (normalizedId: string, packageName: string) =>
  normalizedId.includes(`/node_modules/${packageName}/`) ||
  normalizedId.includes(`/node_modules/${packageName}.`);

const manualChunks = (id: string) => {
  const normalizedId = id.replace(/\\/g, "/");
  if (!normalizedId.includes("/node_modules/")) return undefined;

  const match = chunkGroups.find(([, packageNames]) =>
    packageNames.some((packageName) => packageMatcher(normalizedId, packageName))
  );

  return match?.[0] || "vendor";
};

export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
    hmr: {
      overlay: false,
    },
    proxy: {
      "/sitemap-dynamic.xml": {
        target: "https://cqxcztafhnwkhxgaylne.supabase.co/functions/v1/sitemap",
        changeOrigin: true,
        rewrite: () => "",
      },
    },
  },
  plugins: [react(), mode === "development" ? componentTagger() : null].filter(Boolean) as PluginOption[],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
    dedupe: ["react", "react-dom", "react/jsx-runtime"],
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks,
      },
    },
  },
}));
