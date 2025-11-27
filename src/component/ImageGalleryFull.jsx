import React, { useEffect, useState } from "react";
import { importAllImages } from "../utils/loadFolders";

import Masonry from "react-masonry-css";
import { LazyLoadImage } from "react-lazy-load-image-component";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Zoom } from "swiper/modules";

import { FaTimes, FaDownload } from "react-icons/fa";

// CSS imports
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/zoom";

import "react-lazy-load-image-component/src/effects/blur.css";

export default function ImageGalleryFull() {
  const [gallery, setGallery] = useState({});
  const [filter, setFilter] = useState("all");

  const [zoomFolder, setZoomFolder] = useState(null);
  const [zoomIndex, setZoomIndex] = useState(0);

  useEffect(() => {
    setGallery(importAllImages());
    document.addEventListener("contextmenu", (e) => e.preventDefault());
  }, []);

  const breakpoints = {
    default: 4,
    1100: 3,
    700: 2,
    500: 1,
  };

  const getAllTags = () => {
    const tags = new Set();
    Object.values(gallery).flat().forEach((img) => {
      if (img.tags) img.tags.forEach((t) => tags.add(t));
    });
    return ["all", ...tags];
  };

  const filteredImages = (folder) => {
    if (filter === "all") return gallery[folder];
    return gallery[folder].filter((img) => img.tags?.includes(filter));
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Advanced Image Gallery</h2>

      {/* FILTER BUTTONS */}
      <div style={{ marginBottom: 20 }}>
        {getAllTags().map((tag) => (
          <button
            key={tag}
            onClick={() => setFilter(tag)}
            style={{
              marginRight: 10,
              padding: "6px 12px",
              borderRadius: 6,
              border: "1px solid #999",
              background: filter === tag ? "#333" : "#fff",
              color: filter === tag ? "#fff" : "#000",
              cursor: "pointer",
            }}
          >
            {tag}
          </button>
        ))}
      </div>

      {/* FOLDER + MASONRY */}
      {Object.keys(gallery).map((folder) => (
        <details key={folder} style={{ marginBottom: 20 }}>
          <summary style={{ cursor: "pointer", fontSize: 20 }}>
            📁 {folder}
          </summary>

          <Masonry
            breakpointCols={breakpoints}
            className="my-masonry-grid"
            columnClassName="my-masonry-grid_column"
            style={{ marginTop: 20 }}
          >
            {filteredImages(folder)?.map((img, index) => (
              <div
                key={index}
                className="img-card"
                onClick={() => {
                  setZoomFolder(folder);
                  setZoomIndex(index);
                }}
              >
                <LazyLoadImage
                  src={img.src}
                  effect="blur"
                  alt=""
                  style={{
                    width: "100%",
                    borderRadius: 8,
                    cursor: "pointer",
                    transition: "transform .3s",
                  }}
                />

                <div className="caption-overlay">{img.caption}</div>
              </div>
            ))}
          </Masonry>
        </details>
      ))}

      {/* SWIPER LIGHTBOX */}
      {zoomFolder !== null && (
        <div className="overlay">
          <FaTimes className="close-btn" onClick={() => setZoomFolder(null)} />

          <Swiper
            initialSlide={zoomIndex}
            navigation
            pagination={{ clickable: true }}
            zoom
            modules={[Navigation, Pagination, Zoom]}
            style={{ width: "100%", height: "100%" }}
          >
            {gallery[zoomFolder].map((img, idx) => (
              <SwiperSlide key={idx}>
                <div className="swiper-zoom-container">
                  <img src={img.src} alt="" />

                  <a href={img.src} download className="download-btn">
                    <FaDownload size={26} />
                  </a>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      )}
    </div>
  );
}
