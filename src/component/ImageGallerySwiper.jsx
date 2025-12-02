import React, { useEffect, useState } from "react";
import { importAllFolders } from "../utils/loadFolders";

import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Zoom } from "swiper/modules";
import { FaTimes, FaChevronDown } from "react-icons/fa";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/zoom";

export default function ImageGallerySwiper() {
  const [gallery, setGallery] = useState({});
  const [zoomFolder, setZoomFolder] = useState(null);
  const [zoomIndex, setZoomIndex] = useState(0);
  const [expandedFolders, setExpandedFolders] = useState(new Set());
  const [folderLogos, setFolderLogos] = useState({});

  useEffect(() => {
    const data = importAllFolders();
    const logos = {};
    const filteredData = {};

    // Extract logos
    Object.keys(data).forEach((folder) => {
      const logoImage = data[folder].find(
        (img) =>
          img.includes("logo.png") ||
          img.includes("logo.jpg") ||
          img.includes("logo.jpeg") ||
          img.includes("logo.svg") ||
          img.includes("logo.webp") ||
          img.includes("logo.") 

      );

      if (logoImage) {
        logos[folder] = logoImage;
        filteredData[folder] = data[folder].filter((img) => img !== logoImage);
      } else {
        filteredData[folder] = data[folder];
      }
    });

    setFolderLogos(logos);
    setGallery(filteredData);
  }, []);

  const toggleFolder = (folder) => {
    const updated = new Set(expandedFolders);
    updated.has(folder) ? updated.delete(folder) : updated.add(folder);
    setExpandedFolders(updated);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 py-6 px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <header className="max-w-7xl mx-auto mb-12 text-center">
        <div className="bg-gradient-to-r from-slate-800 to-slate-600 rounded-2xl p-6 sm:p-8 shadow-2xl border border-white/20">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-3 sm:mb-4 font-poppins tracking-tight">
            Event Photo Gallery
          </h1>
          <p className="text-slate-200 text-base sm:text-lg md:text-xl font-light max-w-2xl mx-auto leading-relaxed">
            Relive the memories from all our spectacular events and celebrations
          </p>
        </div>
      </header>

      <div className="max-w-7xl mx-auto">
        {/* Timeline Container */}
        <div className="relative">

          {/* Single Vertical Timeline Line */}
          <div className="absolute left-4 sm:left-6 md:left-[24px] top-0 bottom-0 w-0.5 sm:w-1 bg-gradient-to-b from-blue-500 to-purple-500 rounded-full"></div>

          {/* Folders */}
          {Object.keys(gallery).map((folder, index) => (
            <div key={folder} className="relative mb-8 sm:mb-10">

              {/* Card */}
              <div
                className={`glass-card rounded-xl sm:rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 ml-12 sm:ml-16 md:ml-20 ${
                  expandedFolders.has(folder) ? "bg-white/30" : ""
                }`}
              >
                {/* Header */}
                <div
                  className="p-4 sm:p-6 cursor-pointer flex items-center justify-between hover:bg-white/20 transition-all duration-200 rounded-xl sm:rounded-2xl"
                  onClick={() => toggleFolder(folder)}
                >
                  {/* Left Block (Timeline Node + Logo + Title) */}
                  <div className="flex items-center space-x-3 sm:space-x-4 flex-1 min-w-0">

                    {/* Timeline Node */}
                    <div className="w-3 h-3 sm:w-4 sm:h-4 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 border-2 sm:border-4 border-white shadow-md flex-shrink-0"></div>

                    {/* Logo Container - Fixed Size */}
                    <div className="flex-shrink-0">
                      <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl overflow-hidden shadow-md border-2 border-white bg-white">
                        {folderLogos[folder] ? (
                          <LazyLoadImage
                            src={folderLogos[folder]}
                            effect="blur"
                            alt={`${folder} logo`}
                            className="w-full h-full object-contain p-1"
                            width="100%"
                            height="100%"
                          />
                        ) : (
                          <div className="w-full h-full rounded-lg sm:rounded-xl bg-gradient-to-r from-blue-400 to-purple-400 flex items-center justify-center">
                            <span className="text-white font-bold text-xs sm:text-sm">
                              {folder.charAt(0).toUpperCase()}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Title and Status */}
                    <div className="min-w-0 flex-1">
                      <h3 className="text-lg sm:text-xl font-semibold text-slate-800 font-inter truncate">
                        {folder.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                      </h3>
                      <div className="flex items-center space-x-2 mt-1">
                        <div className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium inline-block">
                          Completed
                        </div>
                        <span className="text-xs text-slate-500 font-medium">
                          {gallery[folder]?.length || 0} photos
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Arrow */}
                  <FaChevronDown
                    className={`text-slate-400 transition-transform duration-300 flex-shrink-0 ml-2 ${
                      expandedFolders.has(folder) ? "rotate-180" : ""
                    }`}
                    size={16}
                  />
                </div>

                {/* Image Grid */}
                {expandedFolders.has(folder) && (
                  <div className="px-4 sm:px-6 pb-4 sm:pb-6 animate-fade-in">
                    <div className="grid grid-cols-2 xs:grid-cols-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 sm:gap-4">
                      {gallery[folder].map((img, index) => (
                        <div
                          key={index}
                          className="image-card group relative rounded-lg sm:rounded-xl overflow-hidden cursor-pointer shadow-md hover:shadow-xl transition-all duration-300 aspect-square"
                          onClick={() => {
                            setZoomFolder(folder);
                            setZoomIndex(index);
                          }}
                        >
                          <LazyLoadImage
                            src={img}
                            effect="blur"
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                            alt={`${folder} image ${index + 1}`}
                            placeholderSrc="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZjNmNGY2Ii8+PC9zdmc+"
                          />
                          
                          {/* Overlay */}
                          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 rounded-lg sm:rounded-xl"></div>
                          
                          {/* View Indicator */}
                          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <div className="bg-black/50 text-white px-3 py-2 rounded-lg text-sm font-medium backdrop-blur-sm">
                              View
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Lightbox */}
        {zoomFolder !== null && (
          <div className="fixed inset-0 bg-black/95 backdrop-blur-xl z-50 flex items-center justify-center animate-fade-in">
            {/* Close Button */}
            <button
              onClick={() => setZoomFolder(null)}
              className="absolute top-4 right-4 sm:top-6 sm:right-6 z-10 text-white hover:text-slate-300 transition-colors duration-200 cursor-pointer glass-card rounded-full p-2 sm:p-3 hover:bg-white/20 backdrop-blur-sm border border-white/20"
              aria-label="Close lightbox"
            >
              <FaTimes size={20} className="sm:w-6 sm:h-6" />
            </button>

            {/* Folder Title */}
            <div className="absolute top-4 left-4 sm:top-6 sm:left-6 z-10">
              <h2 className="text-white text-lg sm:text-xl font-semibold font-inter bg-black/30 backdrop-blur-sm px-4 py-2 rounded-lg border border-white/20">
                {zoomFolder.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
              </h2>
            </div>

            {/* Swiper Container */}
            <div className="w-full h-full max-w-6xl mx-auto px-4 py-16 sm:py-20">
              <Swiper
                initialSlide={zoomIndex}
                navigation={{
                  nextEl: ".swiper-button-next",
                  prevEl: ".swiper-button-prev",
                }}
                pagination={{
                  clickable: true,
                  type: "fraction",
                  el: ".swiper-pagination",
                  renderFraction: function (currentClass, totalClass) {
                    return `<span class="${currentClass}"></span> / <span class="${totalClass}"></span>`;
                  }
                }}
                zoom={{
                  maxRatio: 3,
                  minRatio: 1
                }}
                modules={[Navigation, Pagination, Zoom]}
                className="h-full w-full"
              >
                {gallery[zoomFolder].map((src, idx) => (
                  <SwiperSlide key={idx}>
                    <div className="swiper-zoom-container flex items-center justify-center h-full w-full">
                      <img
                        src={src}
                        alt={`${zoomFolder} image ${idx + 1}`}
                        className="max-h-full max-w-full object-contain rounded-lg"
                        loading="eager"
                      />
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>

              {/* Custom Navigation Buttons */}
              <div className="swiper-button-prev !text-white !w-10 !h-10 sm:!w-12 sm:!h-12 after:!text-lg glass-card rounded-full hover:bg-white/20 transition-all duration-300 backdrop-blur-sm border border-white/20"></div>
              <div className="swiper-button-next !text-white !w-10 !h-10 sm:!w-12 sm:!h-12 after:!text-lg glass-card rounded-full hover:bg-white/20 transition-all duration-300 backdrop-blur-sm border border-white/20"></div>
              
              {/* Custom Pagination */}
              <div className="swiper-pagination !bottom-2 !text-white !font-medium"></div>
            </div>
          </div>
        )}
      </div>

      {/* Custom Styles */}
      <style jsx>{`
        .glass-card {
          background: rgba(255, 255, 255, 0.25);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.18);
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

        .image-card {
          transition: all 0.3s ease;
        }

        /* Custom scrollbar for webkit browsers */
        ::-webkit-scrollbar {
          width: 6px;
        }

        ::-webkit-scrollbar-track {
          background: rgba(0, 0, 0, 0.1);
          border-radius: 3px;
        }

        ::-webkit-scrollbar-thumb {
          background: rgba(0, 0, 0, 0.2);
          border-radius: 3px;
        }

        ::-webkit-scrollbar-thumb:hover {
          background: rgba(0, 0, 0, 0.3);
        }
      `}</style>

      {/* Swiper Styles */}
      <style jsx global>{`
        .swiper-pagination-fraction {
          background: rgba(0, 0, 0, 0.5);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.2);
          border-radius: 20px;
          padding: 8px 16px;
          width: auto;
          left: 50%;
          transform: translateX(-50%);
          font-size: 14px;
          font-weight: 500;
        }

        @media (max-width: 640px) {
          .swiper-pagination-fraction {
            font-size: 12px;
            padding: 6px 12px;
          }
        }

        .swiper-button-disabled {
          opacity: 0.3;
          cursor: not-allowed;
        }
      `}</style>
    </div>
  );
}