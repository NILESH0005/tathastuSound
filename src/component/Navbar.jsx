import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import logo from "../assets/tathastu-logo.jpeg";

export default function Navbar() {
  const [show, setShow] = useState(false);
  const [openInventory, setOpenInventory] = useState(false);
  const location = useLocation();

  const isHome = location.pathname === "/";

  useEffect(() => {
    if (!isHome) {
      setShow(true);
      return;
    }

    const handleScroll = () => {
      setShow(window.scrollY > 80);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isHome]);

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-700
      ${
        show
          ? "opacity-100 translate-y-0"
          : "opacity-0 -translate-y-full pointer-events-none"
      }`}
    >
      {/* 🎛 CONSOLE BAR */}
      <nav
        className="mx-auto max-w-7xl px-6 py-3 flex items-center justify-between
                   bg-gradient-to-b from-zinc-900 via-black to-zinc-950
                   border-b border-white/10
                   shadow-[0_8px_30px_rgba(0,0,0,0.8)]
                   relative"
      >
        {/* Fake top groove line (like hardware panel seam) */}
        <div className="absolute top-0 left-0 w-full h-[2px] bg-white/5" />

        {/* LOGO SECTION = Master Channel */}
        <Link to="/" className="flex items-center gap-3 group">
          <div className="relative">
            <img
              src={logo}
              alt="Tathastu Sound"
              className="w-10 h-10 rounded-full 
                         border border-white/20 
                         shadow-inner"
            />
            {/* Power LED */}
            <span
              className="absolute -bottom-1 -right-1 w-2.5 h-2.5 
                             bg-green-500 rounded-full 
                             shadow-[0_0_8px_#22c55e]"
            />
          </div>

          <span
            className="text-xl font-bold tracking-wide
                           bg-gradient-to-r from-purple-400 to-blue-400 
                           bg-clip-text text-transparent"
          >
            Tathastu Sound
          </span>
        </Link>

        {/* MENU = Channel Buttons */}
        <ul className="hidden md:flex items-center gap-8 text-white/80 font-medium">
          <NavItem label="Home" link="/" />
          <NavItem label="Videos" link="/#videos" />
          <NavItem label="Events" link="/#events" />

          {/* INVENTORY DROPDOWN = Effects Section */}
          <li
            className="relative"
            onMouseEnter={() => setOpenInventory(true)}
            onMouseLeave={() => setOpenInventory(false)}
          >
            <span
              className="cursor-pointer px-4 py-2 rounded-lg
                         bg-zinc-900 border border-white/10
                         hover:bg-zinc-800 hover:text-white
                         shadow-inner transition"
            >
              Inventory ▾
            </span>

            {openInventory && (
              <div
                className="absolute top-full left-0 w-44 rounded-xl overflow-hidden
                           bg-gradient-to-b from-zinc-900 to-black
                           backdrop-blur-xl border border-white/10
                           shadow-xl mt-2"
              >
                <DropdownItem label="Audio" to="/inventory/audio" />
                <DropdownItem label="Light" to="/inventory/light" />
              </div>
            )}
          </li>

          <NavItem label="About Us" link="/about" />

          {/* CONTACT = RECORD BUTTON */}
          <NavItem label="Contact" link="/contact" highlight />
        </ul>

        {/* Bottom groove line */}
        <div className="absolute bottom-0 left-0 w-full h-[2px] bg-black/60" />
      </nav>
    </header>
  );
}

/* ---------------- HELPERS ---------------- */

function NavItem({ label, link, highlight }) {
  const isHashLink = link.includes("#");

  const baseClasses = `
    relative px-4 py-2 rounded-lg
    border border-white/10
    bg-zinc-900
    hover:bg-zinc-800 hover:text-white
    shadow-inner transition
    font-medium tracking-wide
  `;

  const highlightClasses = highlight
    ? "bg-red-600/80 hover:bg-red-600 shadow-[0_0_12px_rgba(239,68,68,0.6)]"
    : "";

  if (isHashLink) {
    return (
      <li>
        <a href={link} className={`${baseClasses} ${highlightClasses}`}>
          {label}
        </a>
      </li>
    );
  }

  return (
    <li>
      <Link to={link} className={`${baseClasses} ${highlightClasses}`}>
        {label}
      </Link>
    </li>
  );
}

function DropdownItem({ label, to }) {
  return (
    <Link
      to={to}
      className="block px-5 py-3 text-white/80 hover:text-white hover:bg-white/5 transition"
    >
      {label}
    </Link>
  );
}
