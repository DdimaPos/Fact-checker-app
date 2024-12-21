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
  /*build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, "src/main.tsx"), // Main app entry
        content: resolve(__dirname, "src/content/content.js"), // Content script, if needed
        background: resolve(__dirname, "src/background/background.js"), // Background script
      },
      output: {
        entryFileNames: "assets/[name].js",
      },
    },
  },*/

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
