import tathastuSound from "../assets/tathastuSound.jpg";

export default function AboutSection() {
  return (
    <section className="py-12 sm:py-16 lg:py-24 bg-black">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-14 md:gap-18 lg:gap-24">

          {/* Header */}
          <div className="space-y-5 text-center">
            <h2 className="text-white text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight">
              About Us
            </h2>

            <p className="text-white/70 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
              We are a full-service event production company delivering
              <span className="text-white font-medium"> powerful sound</span>,
              <span className="text-white font-medium"> stunning visuals</span>, and
              <span className="text-white font-medium"> flawless execution</span> for
              concerts, weddings, corporate events, and DJ shows.
            </p>

            <a
              href="#contact"
              className="inline-flex items-center gap-2 rounded-full
                         bg-gradient-to-r from-purple-600 to-blue-600
                         px-8 py-4 text-white font-semibold
                         shadow-lg shadow-purple-500/30
                         hover:scale-110 hover:shadow-purple-500/50
                         transition-all duration-300"
            >
              Know More
              <span className="text-lg">→</span>
            </a>
          </div>

          {/* Image + Stats */}
          <div className="relative w-full rounded-2xl overflow-hidden">

            {/* Image */}
            <img
              src={tathastuSound}
              alt="Tathastu Sound Event Production"
              className="h-full w-full object-cover rounded-2xl"
            />

            {/* Dark overlay for readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------- STAT ITEM ---------------- */

function StatItem({ value, label }) {
  return (
    <div className="flex flex-col items-center justify-center text-center gap-2">
      <span className="text-purple-600 text-4xl font-extrabold">
        {value}
      </span>
      <p className="text-slate-600 text-sm tracking-wide uppercase">
        {label}
      </p>
    </div>
  );
}
