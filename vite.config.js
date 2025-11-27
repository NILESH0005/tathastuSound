// vite.config.js
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  
  // IMPORTANT: must match your IIS folder name
  base: "/GIPhotoGallery/",
  
  assetsInclude: ["**/*.woff", "**/*.woff2", "**/*.ttf"],
});
