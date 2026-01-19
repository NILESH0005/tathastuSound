 export default function Footer() {
  return (
    <footer className="bg-black border-t border-white/10">
      <div className="max-w-7xl mx-auto px-6 py-16">

        {/* TOP GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">

          {/* BRAND */}
          <div>
            <h3 className="text-2xl font-bold text-white tracking-wide">
              Tathastu Sound
            </h3>
            <p className="text-white/70 mt-4 leading-relaxed">
              Delivering powerful sound, immersive lighting, stunning visuals,
              and professional backline for concerts, weddings, DJ nights, and
              corporate events.
            </p>
          </div>

          {/* SERVICES */}
          <div>
            <h4 className="text-white text-lg font-semibold mb-5">
              Our Services
            </h4>
            <ul className="space-y-3 text-white/70">
              <li className="hover:text-white transition">Live Concert Sound</li>
              <li className="hover:text-white transition">Wedding Sound & Lights</li>
              <li className="hover:text-white transition">DJ & Club Setup</li>
              <li className="hover:text-white transition">Corporate Events</li>
            </ul>
          </div>

          {/* INVENTORY */}
          <div>
            <h4 className="text-white text-lg font-semibold mb-5">
              Inventory
            </h4>
            <ul className="space-y-3 text-white/70">
              <li className="hover:text-white transition">Audio Equipment</li>
              <li className="hover:text-white transition">LED Walls & Video</li>
            </ul>
          </div>

          {/* CONTACT */}
          <div>
            <h4 className="text-white text-lg font-semibold mb-5">
              Get in Touch
            </h4>

            <ul className="space-y-4 text-white/70">
              <li>📍  Ahmedabad, India</li>
              <li>📞 +91 XXXXX XXXXX</li>
              <li>✉️ info@tathastusound.com</li>
            </ul>

            {/* SOCIALS */}
            <div className="flex gap-4 mt-6">
              {["Instagram", "YouTube", "Facebook"].map((s) => (
                <div
                  key={s}
                  className="w-10 h-10 rounded-full
                             bg-white/10 flex items-center justify-center
                             hover:bg-gradient-to-r hover:from-purple-600 hover:to-blue-600
                             hover:scale-110 transition-all cursor-pointer"
                >
                  🎵
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* DIVIDER */}
        <div className="border-t border-white/10 my-10" />

        {/* BOTTOM */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-white/50 text-sm">
            © {new Date().getFullYear()} Tathastu Sound. All rights reserved.
          </p>

          <p className="text-white/40 text-sm">
            Designed for live events • Built for impact
          </p>
        </div>
      </div>
    </footer>
  );
}
