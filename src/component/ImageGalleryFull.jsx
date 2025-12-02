import React, { useEffect, useState } from "react";
import { importAllImages } from "../utils/loadFolders";

import Masonry from "react-masonry-css";
import { LazyLoadImage } from "react-lazy-load-image-component";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Zoom } from "swiper/modules";

import { FaTimes, FaDownload, FaChevronDown } from "react-icons/fa";

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
  const [expandedFolders, setExpandedFolders] = useState(new Set());
  const [folderLogos, setFolderLogos] = useState({});

  useEffect(() => {
    const galleryData = importAllImages();
    setGallery(galleryData);

    // Extract logo images from each folder
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

    // Remove logo from gallery list
    galleryData[folder] = galleryData[folder].filter(
      (img) => img !== logoImage
    );
  }
});

    setFolderLogos(logos);
    setGallery(galleryData);

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
    Object.values(gallery)
      .flat()
      .forEach((img) => {
        if (img.tags) img.tags.forEach((t) => tags.add(t));
      });
    return ["all", ...tags];
  };

  const filteredImages = (folder) => {
    if (filter === "all") return gallery[folder];
    return gallery[folder].filter((img) => img.tags?.includes(filter));
  };

  const toggleFolder = (folder) => {
    const newExpanded = new Set(expandedFolders);
    if (newExpanded.has(folder)) {
      newExpanded.delete(folder);
    } else {
      newExpanded.add(folder);
    }
    setExpandedFolders(newExpanded);
  };



  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-white py-6 px-4">
      {/* Premium Header */}
      <header className="max-w-7xl mx-auto mb-12 text-center">
        <div className="bg-gradient-to-r from-slate-800 to-slate-600 rounded-2xl p-8 shadow-2xl backdrop-blur-sm bg-white/10 border border-white/20">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 font-poppins">
            Event Photo Gallery
          </h1>
          <p className="text-slate-200 text-lg md:text-xl font-light">
            View memories from all events
          </p>
        </div>
      </header>

      <div className="max-w-7xl mx-auto">
        {/* Timeline Container */}
        <div className="relative">
          {/* Vertical Timeline Line */}
          <div className="absolute left-6 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-500 to-purple-500 rounded-full ml-4"></div>

          {/* FOLDER CARDS WITH TIMELINE */}
          {Object.keys(gallery).map((folder, index) => (
            <div key={folder} className="relative mb-8">
              {/* Timeline Node */}
              <div className="absolute left-[40px] top-[50px] z-10 -translate-x-1/2">
                <div
                  className="w-8 h-8 flex items-center justify-center text-white text-sm font-bold 
                  rounded-full bg-gradient-to-r from-blue-500 to-purple-500 
                  border-4 border-white shadow-lg"
                >
                  {index + 1}
                </div>
              </div>

              <div
                className={`glass-card rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 ml-12 ${expandedFolders.has(folder) ? "bg-white/30" : ""
                  }`}
              >
                {/* Folder Header */}
                <div
                  className="p-6 cursor-pointer flex items-center justify-between hover:bg-white/30 transition-all duration-200 rounded-2xl"
                  onClick={() => toggleFolder(folder)}
                >
                  <div className="flex items-center space-x-4">
                    <div className="relative">
                      {/* Logo Image */}
                      {folderLogos[folder] ? (
                        <div className="w-25 h-25 rounded-xl overflow-hidden shadow-md border-2 border-white">
                          <LazyLoadImage
                            src={folderLogos[folder]}
                            effect="blur"
                            alt={`${folder} logo`}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      ) : (
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-blue-400 to-purple-400 flex items-center justify-center shadow-md">
                          <span className="text-white font-bold text-sm">
                            {folder.charAt(0)}
                          </span>
                        </div>
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-4">
                        <div>
                          <h3 className="text-xl font-semibold text-slate-800 font-inter">
                            {folder}
                          </h3>
                        </div>
                      </div>
                    </div>
                  </div>
                  <FaChevronDown
                    className={`text-slate-400 transition-transform duration-300 ${expandedFolders.has(folder) ? "rotate-180" : ""
                      }`}
                  />
                </div>

                {/* Masonry Gallery */}
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
                          className="image-card group relative rounded-xl overflow-hidden cursor-pointer mb-4 shadow-md hover:shadow-2xl transition-all duration-300"
                          onClick={() => {
                            setZoomFolder(folder);
                            setZoomIndex(index);
                          }}
                        >
                          <LazyLoadImage
                            src={img.src}
                            effect="blur"
                            alt=""
                            className="w-full h-auto transition-transform duration-500 group-hover:scale-105"
                            style={{
                              borderRadius: 12,
                            }}
                          />
                        </div>
                      ))}
                    </Masonry>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* PREMIUM LIGHTBOX */}
        {zoomFolder !== null && (
          <div className="fixed inset-0 bg-black/95 backdrop-blur-xl z-50 flex items-center justify-center animate-fade-in">
            {/* Close Button */}
            <button
              onClick={() => setZoomFolder(null)}
              className="absolute top-6 right-6 z-10 text-white hover:text-slate-300 transition-colors duration-200 group"
            >
              <div className="glass-card rounded-full p-3 group-hover:bg-white/20 transition-all duration-300">
                <FaTimes size={24} />
              </div>
            </button>

            {/* Swiper Container */}
            <div className="w-full h-full max-w-6xl mx-auto px-4 py-20">
              <Swiper
                initialSlide={zoomIndex}
                navigation={{
                  nextEl: ".swiper-button-next",
                  prevEl: ".swiper-button-prev",
                }}
                pagination={{
                  clickable: true,
                  type: "fraction",
                }}
                zoom
                modules={[Navigation, Pagination, Zoom]}
                className="h-full"
              >
                {gallery[zoomFolder].map((img, idx) => (
                  <SwiperSlide key={idx}>
                    <div className="swiper-zoom-container flex items-center justify-center h-full">
                      <img
                        src={img.src}
                        alt=""
                        className="max-h-full max-w-full object-contain rounded-lg"
                      />

                      {/* Download Button */}
                      <a
                        href={img.src}
                        download
                        className="absolute bottom-6 right-6 glass-card rounded-full p-4 hover:bg-white/20 transition-all duration-300 group"
                      >
                        <FaDownload
                          size={20}
                          className="text-white group-hover:text-slate-300 transition-colors"
                        />
                      </a>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>

              {/* Custom Navigation Arrows */}
              <div className="swiper-button-prev !text-white !w-12 !h-12 after:!text-xl glass-card rounded-full hover:bg-white/20 transition-all duration-300"></div>
              <div className="swiper-button-next !text-white !w-12 !h-12 after:!text-xl glass-card rounded-full hover:bg-white/20 transition-all duration-300"></div>
            </div>
          </div>
        )}
      </div>

      {/* Add these styles to your CSS */}
      <style jsx>{`
        .glass-card {
          background: rgba(255, 255, 255, 0.25);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.18);
        }

        .my-masonry-grid {
          display: flex;
          margin-left: -16px;
          width: auto;
        }
        .my-masonry-grid_column {
          padding-left: 16px;
          background-clip: padding-box;
        }

        .image-card {
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
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

        .font-poppins {
          font-family: "Poppins", sans-serif;
        }

        .font-inter {
          font-family: "Inter", sans-serif;
        }
      `}</style>
    </div>
  );
}
