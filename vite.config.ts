import path from "path";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import { resolve } from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server:{
    port:5173
  },
  build: {
    rollupOptions: {
      input: {
        index: resolve(__dirname, "index.html"), // Include the HTML file
        content: resolve(__dirname, "src/content/content.js"), // Content script
        background: resolve(__dirname, "src/background/background.js"), // Background script
      },
      output: {
        entryFileNames: "assets/[name].js",
      },
    },
  },
});
