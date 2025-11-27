// Vite-compatible dynamic importer for images + JSON metadata
export function importAllImages() {
  try {
    // 1) Import all IMAGES from gallery and its subfolders
    const imageModules = import.meta.glob(
      "../assets/gallery/**/*.{png,jpg,jpeg,gif}",
      { eager: true }
    );

    // 2) Import all JSON metadata files
    const jsonModules = import.meta.glob(
      "../assets/gallery/**/*.json",
      { eager: true }
    );

    const gallery = {};

    // Loop through all image paths
    for (const path in imageModules) {
      const fileName = path.split("/").pop();
      const folder = path.split("/assets/gallery/")[1].split("/")[0];

      if (!gallery[folder]) gallery[folder] = [];

      let meta = { caption: "", tags: [] };

      // Expected JSON path (same name but .json)
      const expectedJsonPath = path.replace(/\.\w+$/, ".json");

      if (jsonModules[expectedJsonPath]) {
        meta = jsonModules[expectedJsonPath];
      }

      gallery[folder].push({
        src: imageModules[path].default,
        caption: meta.caption,
        tags: meta.tags,
      });
    }

    return gallery;
  } catch (error) {
    console.error("Error importing images:", error);
    return {};
  }
}
