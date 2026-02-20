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
}));
