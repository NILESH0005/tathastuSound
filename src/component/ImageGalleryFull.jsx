import React, { useEffect, useState } from "react";
import { importAllImages } from "../utils/loadFolders";

import Masonry from "react-masonry-css";
import { LazyLoadImage } from "react-lazy-load-image-component";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Zoom } from "swiper/modules";

import { FaTimes, FaDownload, FaChevronDown } from "react-icons/fa";

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
  const [expandedFolders, setExpandedFolders] = useState(new Set());
  const [folderLogos, setFolderLogos] = useState({});

  // ------------------------------
  // LOAD GALLERY DATA (ASYNC)
  // ------------------------------
  useEffect(() => {
    (async () => {
      const galleryData = await importAllImages();

      // Extract folder logos
      const logos = {};
      Object.keys(galleryData).forEach((folder) => {
        const logoImage = galleryData[folder].find((img) => {
          const file = img.src.toLowerCase();
          return (
            file.endsWith("logo.png") ||
            file.endsWith("logo.jpg") ||
            file.endsWith("logo.jpeg") ||
            file.endsWith("logo.webp")
          );
        });

        if (logoImage) {
          logos[folder] = logoImage.src;

          // Remove logo from gallery
          galleryData[folder] = galleryData[folder].filter(
            (img) => img !== logoImage
          );
        }
      });

      setFolderLogos(logos);
      setGallery(galleryData);
    })();

    document.addEventListener("contextmenu", (e) => e.preventDefault());
  }, []);

  const breakpoints = {
    default: 4,
    1100: 3,
    700: 2,
    500: 1,
  };

  const filteredImages = (folder) => {
    if (filter === "all") return gallery[folder];
    return gallery[folder].filter((img) => img.tags?.includes(filter));
  };

  const toggleFolder = (folder) => {
    const updated = new Set(expandedFolders);
    updated.has(folder) ? updated.delete(folder) : updated.add(folder);
    setExpandedFolders(updated);
  };

  // ------------------------------
  // UI
  // ------------------------------
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-white py-6 px-4">

      {/* HEADER */}
      <header className="max-w-7xl mx-auto mb-12 text-center">
        <div className="bg-gradient-to-r from-slate-800 to-slate-600 rounded-2xl p-8 shadow-2xl backdrop-blur-sm border border-white/20">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 font-poppins">
            Event Photo Gallery
          </h1>
          <p className="text-slate-200 text-lg md:text-xl font-light">
            View memories from all events
          </p>
        </div>
      </header>

      <div className="max-w-7xl mx-auto">
        <div className="relative">

          {/* TIMELINE LINE */}
          <div className="absolute left-6 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-500 to-purple-500 rounded-full ml-4"></div>

          {/* FOLDERS LIST */}
          {Object.keys(gallery).map((folder, index) => (
            <div key={folder} className="relative mb-8">

              {/* TIMELINE DOT */}
              <div className="absolute left-[40px] top-[50px] z-10 -translate-x-1/2">
                <div className="w-8 h-8 flex items-center justify-center text-white font-bold rounded-full bg-gradient-to-r from-blue-500 to-purple-500 border-4 border-white shadow-lg">
                  {index + 1}
                </div>
              </div>

              {/* FOLDER CARD */}
              <div
                className={`glass-card rounded-2xl shadow-lg hover:shadow-xl ml-12 transition-all ${
                  expandedFolders.has(folder) ? "bg-white/30" : ""
                }`}
              >
                {/* HEADER */}
                <div
                  className="p-6 cursor-pointer flex items-center justify-between hover:bg-white/30 transition rounded-2xl"
                  onClick={() => toggleFolder(folder)}
                >
                  <div className="flex items-center space-x-4">
                    <div>
                      {folderLogos[folder] ? (
                        <div className="w-25 h-25 rounded-xl overflow-hidden border-2 border-white shadow-md">
                          <LazyLoadImage
                            src={folderLogos[folder]}
                            effect="blur"
                            className="w-full h-full object-cover"
                          />
                        </div>
                      ) : (
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-blue-400 to-purple-400 text-white flex items-center justify-center shadow-md font-bold">
                          {folder.charAt(0)}
                        </div>
                      )}
                    </div>
                    <h3 className="text-xl font-semibold text-slate-800 font-inter">
                      {folder}
                    </h3>
                  </div>

                  <FaChevronDown
                    className={`text-slate-400 transition ${
                      expandedFolders.has(folder) ? "rotate-180" : ""
                    }`}
                  />
                </div>

                {/* GALLERY GRID */}
                {expandedFolders.has(folder) && (
                  <div className="px-6 pb-6 animate-fade-in">
                    <Masonry
                      breakpointCols={breakpoints}
                      className="my-masonry-grid"
                      columnClassName="my-masonry-grid_column"
                    >
                      {filteredImages(folder)?.map((img, index) => (
                        <div
                          key={index}
                          className="image-card group relative rounded-xl overflow-hidden shadow-md mb-4 cursor-pointer hover:shadow-2xl transition-all"
                          onClick={() => {
                            setZoomFolder(folder);
                            setZoomIndex(index);
                          }}
                        >
                          {img.type === "video" ? (
                            <video
                              src={img.src}
                              controls
                              className="w-full h-auto rounded-xl"
                            />
                          ) : (
                            <LazyLoadImage
                              src={img.src}
                              effect="blur"
                              className="w-full h-auto rounded-xl"
                            />
                          )}
                        </div>
                      ))}
                    </Masonry>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* LIGHTBOX VIEWER */}
        {zoomFolder !== null && (
          <div className="fixed inset-0 bg-black/95 backdrop-blur-xl z-50 flex items-center justify-center animate-fade-in">

            {/* CLOSE BUTTON */}
            <button
              onClick={() => setZoomFolder(null)}
              className="absolute top-6 right-6 text-white group"
            >
              <div className="glass-card p-3 rounded-full group-hover:bg-white/20 transition">
                <FaTimes size={24} />
              </div>
            </button>

            {/* SWIPER */}
            <div className="w-full h-full max-w-6xl mx-auto px-4 py-20">
              <Swiper
                initialSlide={zoomIndex}
                navigation={{
                  nextEl: ".swiper-button-next",
                  prevEl: ".swiper-button-prev",
                }}
                pagination={{ clickable: true, type: "fraction" }}
                zoom
                modules={[Navigation, Pagination, Zoom]}
                className="h-full"
              >
                {gallery[zoomFolder].map((img, idx) => (
                  <SwiperSlide key={idx}>
                    <div className="swiper-zoom-container flex items-center justify-center h-full">
                      {img.type === "video" ? (
                        <video
                          src={img.src}
                          controls
                          className="max-h-full max-w-full object-contain rounded-lg"
                        />
                      ) : (
                        <img
                          src={img.src}
                          className="max-h-full max-w-full object-contain rounded-lg"
                        />
                      )}

                      {/* DOWNLOAD */}
                      <a
                        href={img.src}
                        download
                        className="absolute bottom-6 right-6 glass-card p-4 rounded-full hover:bg-white/20 transition"
                      >
                        <FaDownload size={20} className="text-white" />
                      </a>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>

              {/* NAV ARROWS */}
              <div className="swiper-button-prev !text-white !w-12 !h-12 after:!text-xl glass-card rounded-full hover:bg-white/20"></div>
              <div className="swiper-button-next !text-white !w-12 !h-12 after:!text-xl glass-card rounded-full hover:bg-white/20"></div>
            </div>
          </div>
        )}
      </div>

      {/* CSS */}
      <style jsx>{`
        .glass-card {
          background: rgba(255, 255, 255, 0.25);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.18);
        }
        .my-masonry-grid {
          display: flex;
          margin-left: -16px;
        }
        .my-masonry-grid_column {
          padding-left: 16px;
        }
        .image-card:hover {
          transform: translateY(-4px);
        }
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in {
          animation: fade-in 0.5s ease-out;
        }
      `}</style>
    </div>
  );
}
