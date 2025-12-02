// vite.config.js
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],

  // Your hosting base
  base: "/GIPhotoGallery/",

  // MUST add these or Vite will try to parse .heic like JS
  assetsInclude: [
    "**/*.heic",
    "**/*.HEIC",
    "**/*.heif",
    "**/*.HEIF",
    "**/*.woff",
    "**/*.woff2",
    "**/*.ttf"
  ],
});
