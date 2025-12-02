// utils/loadFolders.js
import heic2any from "heic2any";

export async function importAllImages() {
  try {
    // Import all media files
    const mediaModules = import.meta.glob(
      "../assets/gallery/**/*.{png,jpg,jpeg,gif,webp,mp4,heic,heif}",
      { eager: true }
    );

    const jsonModules = import.meta.glob("../assets/gallery/**/*.json", {
      eager: true,
    });

    const gallery = {};

    for (const path in mediaModules) {
      const fileName = path.split("/").pop();
      const folder = path.split("/assets/gallery/")[1].split("/")[0];

      if (!gallery[folder]) gallery[folder] = [];

      let meta = { caption: "", tags: [] };

      const expectedJsonPath = path.replace(/\.\w+$/, ".json");
      if (jsonModules[expectedJsonPath]) {
        meta = jsonModules[expectedJsonPath];
      }

      const ext = fileName.split(".").pop().toLowerCase();
      let type = ext === "mp4" ? "video" : "image";
      let src = mediaModules[path].default;

      // Convert HEIC / HEIF → JPEG
      if (["heic", "heif"].includes(ext)) {
        try {
          const blob = await fetch(src).then((r) => r.blob());

          const converted = await heic2any({
            blob,
            toType: "image/jpeg",
            quality: 0.9,
          });

          src = URL.createObjectURL(converted);
        } catch (err) {
          console.error("HEIC conversion failed:", err);
        }
      }

      gallery[folder].push({
        type,
        src,
        caption: meta.caption,
        tags: meta.tags,
      });
    }

    return gallery;
  } catch (error) {
    console.error("Error loading gallery:", error);
    return {};
  }
}
