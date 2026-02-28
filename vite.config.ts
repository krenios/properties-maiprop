import { defineConfig, type PluginOption } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// Makes CSS non-render-blocking by using preload + onload pattern
function cssNonBlockingPlugin(): PluginOption {
  return {
    name: "css-non-blocking",
    enforce: "post",
    transformIndexHtml(html) {
      return html.replace(
        /<link rel="stylesheet"(.*?)href="(.*?)"(.*?)\/?>/g,
        `<link rel="preload" as="style" href="$2" onload="this.onload=null;this.rel='stylesheet'"$1$3><noscript><link rel="stylesheet" href="$2"$1$3></noscript>`
      );
    },
  };
}

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
    hmr: {
      overlay: false,
    },
  },
  plugins: [react(), mode === "development" && componentTagger(), cssNonBlockingPlugin()].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
    dedupe: ["react", "react-dom", "react/jsx-runtime"],
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          // React core — smallest, most-cached chunk
          "vendor-react": ["react", "react-dom", "react/jsx-runtime"],
          // Router — needed for all pages
          "vendor-router": ["react-router-dom"],
          // Supabase — large, rarely changes
          "vendor-supabase": ["@supabase/supabase-js"],
          // Framer Motion — heavy animation library, lazy-loaded sections
          "vendor-framer": ["framer-motion"],
          // Lucide icons — tree-shaken but still benefits from isolation
          "vendor-lucide": ["lucide-react"],
          // Radix UI primitives
          "vendor-radix": [
            "@radix-ui/react-dialog",
            "@radix-ui/react-dropdown-menu",
            "@radix-ui/react-tooltip",
            "@radix-ui/react-accordion",
            "@radix-ui/react-tabs",
            "@radix-ui/react-select",
          ],
          // Misc utilities
          "vendor-utils": ["clsx", "tailwind-merge", "class-variance-authority", "date-fns"],
        },
      },
    },
    // Increase chunk size warning limit — we've split intentionally
    chunkSizeWarningLimit: 600,
  },
}));
