import { useEffect, useRef, useState } from "react";

const videos = [
  {
    id: 1,
    title: "Live Concert Setup",
    mp4Url: "/GIPhotoGallery/videos/LiveConcert.mp4",
    instagramUrl: "https://www.instagram.com/reel/DTSa6E6iMwx/",
  },
  {
    id: 2,
    title: "Wedding Sound & Lights",
    mp4Url: "/GIPhotoGallery/videos/Wedding.mp4",
    instagramUrl: "https://www.instagram.com/reel/DSVVmbLDWbA/",
  },
  {
    id: 3,
    title: "DJ Night Experience",
    mp4Url: "/GIPhotoGallery/videos/DJ.mp4",
    instagramUrl: "https://www.instagram.com/reel/DTmx1ElEYuL/",
  },
];

export default function VideoSection() {
  const videoRefs = useRef([]);
  const [mutedMap, setMutedMap] = useState({});

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const video = entry.target;
          if (entry.isIntersecting) {
            video.play().catch(() => {});
          } else {
            video.pause();
          }
        });
      },
      { threshold: 0.6 }
    );

    videoRefs.current.forEach((video) => {
      if (video) observer.observe(video);
    });

    return () => observer.disconnect();
  }, []);

  // 🔊 Toggle mute per video
  const toggleMute = (index) => {
    const video = videoRefs.current[index];
    if (!video) return;

    video.muted = !video.muted;

    setMutedMap((prev) => ({
      ...prev,
      [index]: video.muted,
    }));
  };

  return (
    <section className="w-full min-h-screen bg-black py-20 px-6 md:px-20">
      {/* Section Header */}
      <div className="text-center mb-14">
        <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-400 via-white to-blue-400 bg-clip-text text-transparent">
          Our Live Moments
        </h2>
        <p className="text-white/70 mt-4 text-lg tracking-wide">
          Real events • Real sound • Real impact
        </p>
      </div>

      {/* Reel Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {videos.map((video, index) => (
          <div
            key={video.id}
            className="relative group rounded-3xl overflow-hidden shadow-2xl 
                       bg-gradient-to-br from-purple-900/20 to-blue-900/20 
                       hover:scale-[1.02] transition-all duration-500"
          >
            {/* 🎥 Video */}
            <video
              ref={(el) => (videoRefs.current[index] = el)}
              src={video.mp4Url}
              muted
              loop
              playsInline
              className="w-full h-[480px] object-cover"
            />

            {/* 🌈 Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent 
                            opacity-70 group-hover:opacity-90 transition-all duration-500" />

            {/* 🏷 Title */}
            <div className="absolute bottom-5 left-5 right-5 z-10">
              <h3 className="text-white text-xl font-semibold tracking-wide drop-shadow-lg">
                {video.title}
              </h3>
            </div>

            {/* ▶ Hover Play Glow */}
            <div className="absolute inset-0 flex items-center justify-center 
                            opacity-0 group-hover:opacity-100 transition-all duration-500 z-10">
              <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-md 
                              flex items-center justify-center text-white text-3xl 
                              shadow-lg">
                ▶
              </div>
            </div>

            {/* 🔊 Mute / Unmute */}
            <button
              onClick={() => toggleMute(index)}
              className="absolute top-4 left-4 z-20 
                         w-10 h-10 rounded-full bg-black/40 backdrop-blur-md 
                         flex items-center justify-center text-white text-lg 
                         hover:scale-110 transition-all"
            >
              {mutedMap[index] === false ? "🔊" : "🔇"}
            </button>

            {/* 📸 Instagram Link */}
            <a
              href={video.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="absolute top-4 right-4 z-20 
                         opacity-0 group-hover:opacity-100 
                         transition-all duration-500"
            >
              <div
                className="px-4 py-2 rounded-full 
                           bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500
                           text-white text-sm font-semibold shadow-lg 
                           hover:scale-110 transition-all"
              >
                Instagram ↗
              </div>
            </a>
          </div>
        ))}
      </div>
    </section>
  );
}
