import { useState, useEffect, useRef } from "react";
import logoImg from "../assets/tathastuLogo.jpeg";

export default function HeroSection() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [hoveredElement, setHoveredElement] = useState(null);
  const containerRef = useRef(null);
  const [ripples, setRipples] = useState([]);

  const generateMusicNotes = () => {
    const notes = [];
    for (let i = 0; i < 25; i++) {
      notes.push({
        id: i,
        top: Math.random() * 100,
        left: Math.random() * 100,
        animationDelay: Math.random() * 8,
        note: ["♪", "♫", "♬", "♩", "♪"][Math.floor(Math.random() * 5)],
        size: Math.random() * 1.5 + 1,
        speed: Math.random() * 5 + 3,
      });
    }
    return notes;
  };

  const [audioElements, setAudioElements] = useState(generateMusicNotes());

  // Create ripple effect on hover
  const createRipple = (x, y, color = "rgba(168, 85, 247, 0.3)") => {
    const newRipple = {
      id: Date.now(),
      x,
      y,
      color,
      size: 0,
      maxSize: 100 + Math.random() * 200,
    };
    setRipples((prev) => [...prev, newRipple]);

    // Animate ripple
    const interval = setInterval(() => {
      setRipples((prev) =>
        prev.map((r) =>
          r.id === newRipple.id ? { ...r, size: r.size + 10 } : r,
        ),
      );
    }, 20);

    setTimeout(() => {
      clearInterval(interval);
      setRipples((prev) => prev.filter((r) => r.id !== newRipple.id));
    }, 1000);
  };

  // Mouse move effect for parallax
  const handleMouseMove = (e) => {
    if (!containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setMousePosition({ x, y });
  };

  // Interactive hover effects
  const handleElementHover = (element, e) => {
    setHoveredElement(element);
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    createRipple(x, y, "rgba(59, 130, 246, 0.3)");
  };

  const handlePlayMusic = (e) => {
    setIsPlaying(!isPlaying);
    createRipple(
      e.clientX - e.currentTarget.getBoundingClientRect().left,
      e.clientY - e.currentTarget.getBoundingClientRect().top,
      "rgba(34, 197, 94, 0.4)",
    );
  };

  return (
    <section
      ref={containerRef}
      className="relative w-full min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-[#0a0a0a] via-[#0f0c19] to-[#0a0a0a]"
      onMouseMove={handleMouseMove}
    >
      {/* Dynamic Parallax Background */}
      <div className="absolute inset-0">
        {/* Animated gradient mesh */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `
              radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, rgba(168, 85, 247, 0.15) 0%, transparent 50%),
              radial-gradient(circle at ${100 - mousePosition.x}% ${100 - mousePosition.y}%, rgba(59, 130, 246, 0.1) 0%, transparent 50%)
            `,
          }}
        />
      </div>

      {/* Animated Sound Waves with mouse interaction */}
      <div className="absolute inset-0 flex items-center justify-center opacity-5">
        {[...Array(20)].map((_, i) => {
          const distance = Math.abs((i / 20) * 100 - mousePosition.y);
          const intensity = Math.max(0, 1 - distance / 50);

          return (
            <div
              key={i}
              className="absolute h-[1px] bg-gradient-to-r from-purple-500 via-blue-500 to-purple-500 transition-all duration-300"
              style={{
                width: `${100 + Math.sin(Date.now() / 1000 + i) * 50 + intensity * 100}%`,
                top: `${(i / 20) * 100}%`,
                opacity: 0.1 + intensity * 0.2,
                animationDelay: `${i * 0.2}s`,
                animationDuration: `${2 + Math.sin(i) * 1}s`,
                transform: `translateX(${Math.sin(Date.now() / 2000 + i) * 20}px)`,
                filter: `blur(${intensity * 2}px)`,
              }}
            />
          );
        })}
      </div>

      {/* Background Layers with Parallax */}
      <div
        className="absolute inset-0 transition-transform duration-700"
        style={{
          transform: `translate(${(mousePosition.x - 50) * 0.02}px, ${(mousePosition.y - 50) * 0.02}px)`,
        }}
      >
        <img
          src="https://megasound.in/wp-content/uploads/2021/01/background-layer-4-2.png.webp"
          className="w-full h-full object-cover opacity-15 animate-float-slow"
        />
      </div>

      <div
        className="absolute inset-0 transition-transform duration-500"
        style={{
          transform: `translate(${(mousePosition.x - 50) * 0.03}px, ${(mousePosition.y - 50) * 0.03}px)`,
        }}
      >
        <img
          src="https://megasound.in/wp-content/uploads/2021/01/background-layer-1-1.png.webp"
          className="w-full h-full object-cover opacity-20 animate-float"
        />
      </div>

      {/* Interactive Ripple Effects */}
      {ripples.map((ripple) => (
        <div
          key={ripple.id}
          className="absolute rounded-full pointer-events-none"
          style={{
            left: ripple.x,
            top: ripple.y,
            width: ripple.size,
            height: ripple.size,
            background: ripple.color,
            transform: "translate(-50%, -50%)",
            opacity: 1 - ripple.size / ripple.maxSize,
            transition: "all 0.3s ease-out",
          }}
        />
      ))}

      {/* Musical Notes with dynamic hover */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {audioElements.map((note) => (
          <div
            key={note.id}
            className="absolute transition-all duration-700"
            style={{
              top: `${note.top}%`,
              left: `${note.left}%`,
              animationDelay: `${note.animationDelay}s`,
              fontSize: `${note.size}rem`,
              animationDuration: `${note.speed}s`,
              transform:
                hoveredElement === "logo"
                  ? `translateY(${Math.sin(Date.now() / 500 + note.id) * 20}px) rotate(${Math.sin(Date.now() / 300 + note.id) * 10}deg)`
                  : undefined,
              filter:
                hoveredElement === "logo" ? "brightness(1.5)" : "brightness(1)",
            }}
          >
            <div className="relative group">
              <div className="text-white/5 group-hover:text-purple-300/30 transition-all duration-500 group-hover:scale-125 group-hover:drop-shadow-[0_0_10px_rgba(168,85,247,0.5)]">
                {note.note}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Dynamic Equalizer with hover animation */}
      <div
        className="absolute bottom-20 left-10 flex items-end space-x-[2px] h-24 opacity-40 hover:opacity-80 transition-all duration-500 group"
        onMouseEnter={(e) => handleElementHover("equalizer", e)}
        onMouseLeave={() => setHoveredElement(null)}
      >
        {[...Array(24)].map((_, i) => {
          const isHovered = hoveredElement === "equalizer";
          const baseHeight = 20 + Math.random() * 60;
          const hoverHeight =
            baseHeight * (1.5 + Math.sin(Date.now() / 100 + i) * 0.3);

          return (
            <div
              key={i}
              className="w-[3px] rounded-t transition-all duration-200"
              style={{
                height: `${isHovered ? hoverHeight : baseHeight}%`,
                background: isHovered
                  ? `linear-gradient(to top, #8b5cf6, #3b82f6, #8b5cf6)`
                  : `linear-gradient(to top, #4f46e5, #2563eb)`,
                animationDelay: `${i * 0.05}s`,
                animationDuration: `${0.8 + Math.sin(i) * 0.2}s`,
                animationName: isHovered ? "soundWaveHover" : "soundWave",
                animationIterationCount: "infinite",
                filter: isHovered
                  ? `drop-shadow(0 0 5px rgba(139, 92, 246, 0.5))`
                  : "none",
              }}
            />
          );
        })}
        <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-white/0 text-sm group-hover:text-white/60 transition-all duration-500">
          Equalizer
        </div>
      </div>

      {/* Main Logo with amazing hover effects */}
      <div className="absolute top-20 left-1/2 transform -translate-x-1/2 z-20">
        <div
          className="relative group"
          onMouseEnter={(e) => handleElementHover("logo", e)}
          onMouseLeave={() => setHoveredElement(null)}
        >
          {/* Hover Glow Effect */}
          <div className="absolute -inset-8 bg-gradient-to-r from-purple-600/0 via-purple-600/20 to-purple-600/0 rounded-full blur-xl opacity-0 group-hover:opacity-100 group-hover:animate-pulse transition-all duration-700"></div>

          {/* Animated Rings */}
          <div className="absolute -inset-12 border-2 border-purple-500/20 rounded-full opacity-0 group-hover:opacity-100 group-hover:animate-spin-slow transition-all duration-500"></div>
          <div className="absolute -inset-16 border border-blue-500/10 rounded-full opacity-0 group-hover:opacity-100 group-hover:animate-spin-slow-reverse transition-all duration-700 delay-100"></div>

          {/* Logo Container */}
          <div className="relative flex flex-col items-center">
            {/* Animated Logo Background */}
            <div className="relative mb-6">
              {/* Pulsing Circle */}
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600/30 to-blue-600/30 rounded-full blur-lg opacity-0 group-hover:opacity-100 group-hover:scale-125 transition-all duration-1000"></div>

              {/* Rotating Rings */}
              <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-purple-500/50 group-hover:animate-spin-slow opacity-0 group-hover:opacity-100"></div>
              <div className="absolute inset-4 rounded-full border-2 border-transparent border-b-blue-500/50 group-hover:animate-spin-slow-reverse opacity-0 group-hover:opacity-100"></div>

              <div className="relative w-56 h-56 rounded-full border-4 border-white/10 group-hover:border-purple-500/50 transition-all duration-500 group-hover:scale-110 group-hover:shadow-[0_0_60px_rgba(139,92,246,0.4)]">
                <img
                  src={logoImg}
                  alt="Tathastu Sound"
                  className="w-full h-full rounded-full object-cover p-3 group-hover:p-2 transition-all duration-500"
                />
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-white/0 via-white/0 to-white/10 opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
              </div>

              {/* Floating music notes around logo */}
              {[...Array(8)].map((_, i) => (
                <div
                  key={i}
                  className="absolute text-xl text-purple-300/0 group-hover:text-purple-300/60 transition-all duration-500 delay-100"
                  style={{
                    top: `${50 + 60 * Math.sin((i / 8) * Math.PI * 2)}%`,
                    left: `${50 + 60 * Math.cos((i / 8) * Math.PI * 2)}%`,
                    transform: "translate(-50%, -50%)",
                    animation: "float 3s ease-in-out infinite",
                    animationDelay: `${i * 0.2}s`,
                  }}
                >
                  {["♪", "♫", "♬", "♩"][i % 4]}
                </div>
              ))}
            </div>

            <h1 className="text-6xl md:text-7xl font-bold tracking-tighter mb-3 relative">
              <span className="absolute inset-0 text-transparent bg-gradient-to-r from-purple-600/40 to-blue-600/40 blur-lg opacity-0 group-hover:opacity-100 transition-all duration-500"></span>

              <span className="relative inline-block">
                <span className="bg-gradient-to-r from-purple-400 via-white to-blue-400 bg-clip-text text-transparent bg-[length:200%_auto] transition-all duration-700 group-hover:bg-[length:100%_auto] group-hover:drop-shadow-[0_0_20px_rgba(139,92,246,0.7)]">
                  Tathastu
                </span>
                <span className="text-white animate-pulse">.</span>
                <span className="bg-gradient-to-r from-blue-400 via-white to-purple-400 bg-clip-text text-transparent bg-[length:200%_auto] transition-all duration-700 delay-300 group-hover:bg-[length:100%_auto] group-hover:drop-shadow-[0_0_20px_rgba(59,130,246,0.7)]">
                  sound
                </span>
              </span>
            </h1>

            {/* Tagline with underline animation */}
            {/* <p className="text-white/80 text-xl font-light tracking-wider mb-6 relative inline-block group-hover:text-white transition-colors duration-300">
              Premier Sound Rental Services
              <span className="absolute -bottom-2 left-0 w-0 h-[2px] bg-gradient-to-r from-purple-500 to-blue-500 group-hover:w-full transition-all duration-700"></span>
            </p> */}
          </div>
        </div>
      </div>

      <div
        className="absolute bottom-10 right-10 group pt-4"
        onMouseEnter={(e) => handleElementHover("cloud", e)}
        onMouseLeave={() => setHoveredElement(null)}
        onClick={handlePlayMusic}
      >
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-500">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="absolute inset-0 rounded-full border-2 border-purple-300/30 animate-ping"
              style={{
                animationDelay: `${i * 0.3}s`,
                animationDuration: "2s",
              }}
            />
          ))}
        </div>

        <img
          src="https://megasound.in/wp-content/uploads/2021/01/bg1.png.webp"
          className="w-48 opacity-80 animate-cloud group-hover:scale-110 group-hover:rotate-12 group-hover:opacity-100 group-hover:drop-shadow-[0_0_30px_rgba(168,85,247,0.6)] transition-all duration-500 cursor-pointer"
        />

        <div className="absolute -top-2 -right-2 text-3xl text-white/0 group-hover:text-yellow-300 transition-all duration-500 group-hover:scale-125 group-hover:rotate-12">
          ▶
        </div>

        {isPlaying && (
          <div className="absolute -top-3 -right-3 text-4xl text-green-400 animate-ping">
            ♪
          </div>
        )}
      </div>

      <div className="relative z-10 text-center mt-80">
        <div className="space-y-8">
          <h2
            className="text-white text-2xl md:text-3xl font-semibold tracking-wide animate-fade-in-up relative group inline-block px-8 py-4 rounded-2xl"
            onMouseEnter={(e) => handleElementHover("text1", e)}
            onMouseLeave={() => setHoveredElement(null)}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600/0 via-purple-600/10 to-purple-600/0 rounded-2xl opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
            <span className="relative">AUDIO EXCELLENCE BACKED WITH</span>
          </h2>

          {/* Second line - main highlight */}
          <h3
            className="text-4xl md:text-5xl font-bold tracking-wider animate-fade-in-up delay-300 relative group"
            onMouseEnter={(e) => handleElementHover("text2", e)}
            onMouseLeave={() => setHoveredElement(null)}
          >
            {/* Shimmer effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-yellow-300/20 to-transparent -skew-x-12 opacity-0 group-hover:opacity-100 group-hover:animate-shimmer transition-all duration-700"></div>

            <span className="relative bg-gradient-to-r from-yellow-300 via-yellow-200 to-yellow-300 bg-clip-text text-transparent bg-[length:200%_auto] group-hover:animate-gradient-shift transition-all duration-700">
              EXCELLENT MANPOWER
            </span>
          </h3>

          {/* Third line */}
          <p className="text-white/70 text-xl font-light tracking-wide animate-fade-in-up delay-500 relative group inline-block">
            <span className="relative">
              Experience • Quality • Professionalism
            </span>
            <span className="absolute -bottom-2 left-1/2 w-0 h-[1px] bg-gradient-to-r from-transparent via-blue-400 to-transparent group-hover:w-full group-hover:left-0 transition-all duration-700"></span>
          </p>

          {/* Contact Button with ripple effect */}
          <div className="pt-10 animate-fade-in-up delay-700">
            <a
              href="tel:+919722509697"
              className="relative inline-flex items-center px-10 py-5 overflow-hidden rounded-full group"
              onMouseEnter={(e) => handleElementHover("button", e)}
              onMouseLeave={() => setHoveredElement(null)}
            >
              {/* Button background effects */}
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-blue-600 to-purple-600 bg-[length:200%_100%] group-hover:bg-[length:100%_100%] transition-all duration-500"></div>
              <div className="absolute inset-0 bg-gradient-to-r from-purple-700 via-blue-700 to-purple-700 opacity-0 group-hover:opacity-100 transition-all duration-300"></div>

              {/* Shine effect */}
              <div className="absolute inset-0 -skew-x-12 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 group-hover:animate-shimmer transition-all duration-700"></div>

              {/* Button content */}
              <span className="relative text-white text-xl font-bold tracking-wider flex items-center">
                <span className="mr-4">Contact Us: +91-9722509697</span>
                <span className="transform group-hover:translate-x-2 group-hover:scale-125 transition-all duration-300">
                  📞
                </span>
              </span>

              {/* Glow effect */}
              <div className="absolute -inset-4 bg-gradient-to-r from-purple-600/30 to-blue-600/30 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
            </a>
          </div>

          {/* Additional Info with hover reveal */}
          <div
            className="pt-8 animate-fade-in-up delay-900 opacity-60 hover:opacity-100 transition-all duration-500"
            onMouseEnter={(e) => handleElementHover("info", e)}
            onMouseLeave={() => setHoveredElement(null)}
          >
            <p className="text-white/80 text-sm tracking-wide hover:text-white transition-colors duration-300">
              TSTU STAGE CRAFT PVT.LTD • nikhilpatel7892@gmail.com
            </p>
            <p className="text-white/60 text-xs mt-3 tracking-wider hover:text-white/90 transition-colors duration-300">
              <span className="inline-block hover:scale-110 hover:text-yellow-300 transition-all duration-300 mx-2">
                43 Events
              </span>{" "}
              •
              <span className="inline-block hover:scale-110 hover:text-green-300 transition-all duration-300 mx-2">
                938 Clients
              </span>{" "}
              •
              <span className="inline-block hover:scale-110 hover:text-blue-300 transition-all duration-300 mx-2">
                83 Projects
              </span>
            </p>
          </div>
        </div>
      </div>

      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20"></div>
      <div className="absolute top-10 left-10 text-white/10 hover:text-white/30 transition-all duration-500">
        <div className="text-2xl animate-pulse-slow">♪</div>
      </div>
      <div className="absolute top-10 right-10 text-white/10 hover:text-white/30 transition-all duration-500">
        <div className="text-2xl animate-pulse-slow delay-300">♫</div>
      </div>
      <div className="absolute bottom-10 left-10 text-white/10 hover:text-white/30 transition-all duration-500">
        <div className="text-2xl animate-pulse-slow delay-500">♬</div>
      </div>
    </section>
  );
}
