import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  // Relative paths so Electron can load from file://
  base: "./",
  server: {
    port: 5199,
    strictPort: true,
    proxy: {
      "/api": {
        target: "http://127.0.0.1:8742",
        changeOrigin: true,
      },
    },
  },
  build: {
    outDir: "dist",
  },
});
