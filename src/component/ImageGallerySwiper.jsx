import React, { useEffect, useState } from "react";
import { importAllFolders } from "../utils/loadFolders";

import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Zoom } from "swiper/modules";
import { FaTimes } from "react-icons/fa";

export default function ImageGallerySwiper() {
  const [gallery, setGallery] = useState({});
  const [zoomFolder, setZoomFolder] = useState(null);
  const [zoomIndex, setZoomIndex] = useState(0);

  useEffect(() => {
    const data = importAllFolders();
    setGallery(data);
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <h2>Dynamic Image Gallery (Swiper.js)</h2>

      {Object.keys(gallery).map((folder) => (
        <details key={folder} style={{ marginBottom: "15px" }}>
          <summary style={{ cursor: "pointer", fontSize: "20px" }}>
            📁 {folder}
          </summary>

          <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
            {gallery[folder].map((img, index) => (
              <LazyLoadImage
                key={index}
                src={img}
                effect="blur"
                width={200}
                style={{ cursor: "pointer" }}
                onClick={() => {
                  setZoomFolder(folder);
                  setZoomIndex(index);
                }}
              />
            ))}
          </div>
        </details>
      ))}

      {/* Swiper Lightbox */}
      {zoomFolder !== null && (
  <div
    style={{
      position: "fixed",
      inset: 0,
      background: "rgba(0,0,0,0.85)",
      zIndex: 9999,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      pointerEvents: "auto",
    }}
  >
    {/* Close Button */}
    <FaTimes
      onClick={() => setZoomFolder(null)}
      style={{
        position: "absolute",
        top: 20,
        right: 20,
        fontSize: 40,
        color: "white",
        cursor: "pointer",
        zIndex: 10000,
        pointerEvents: "auto",
      }}
    />

    <div
      style={{
        width: "100%",
        height: "100%",
        position: "relative",
        pointerEvents: "auto",
      }}
    >
      <Swiper
        initialSlide={zoomIndex}
        navigation
        pagination={{ clickable: true }}
        zoom
        modules={[Navigation, Pagination, Zoom]}
        style={{
          width: "100%",
          height: "100%",
        }}
      >
        {gallery[zoomFolder].map((src, idx) => (
          <SwiperSlide key={idx}>
            <div className="swiper-zoom-container">
              <img src={src} alt="" />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  </div>
)}


    </div>
  );
}
