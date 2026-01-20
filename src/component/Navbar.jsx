import { useEffect, useState } from "react";
import logo from "../assets/tathastu-logo.jpeg";

export default function Navbar() {
  const [show, setShow] = useState(false);
  const [openInventory, setOpenInventory] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShow(window.scrollY > 80);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-700
      ${
        show
          ? "opacity-100 translate-y-0"
          : "opacity-0 -translate-y-full pointer-events-none"
      }`}
    >
      <nav
        className="mx-auto max-w-7xl px-6 py-4 flex items-center justify-between
                   backdrop-blur-xl bg-black/60 border-b border-white/10
                   shadow-[0_10px_40px_rgba(0,0,0,0.4)]"
      >
        {/* LOGO */}
        <a href="#home" className="flex items-center gap-3">
          <img
            src={logo}
            alt="Tathastu Sound"
            className="w-10 h-10 rounded-full border border-white/20"
          />
          <span className="text-xl font-bold tracking-wide bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
            Tathastu Sound
          </span>
        </a>

        {/* MENU */}
        <ul className="hidden md:flex items-center gap-10 text-white/80 font-medium">
          <NavItem label="Home" link="#home" />
          <NavItem label="Videos" link="#videos" />
          <NavItem label="Events" link="#events" />

          {/* INVENTORY DROPDOWN */}
          <li
            className="relative"
            onMouseEnter={() => setOpenInventory(true)}
            onMouseLeave={() => setOpenInventory(false)}
          >
            <span className="cursor-pointer hover:text-white transition">
              Inventory ▾
            </span>

            {openInventory && (
              <div
                className="absolute top-10 left-0 w-44 rounded-xl overflow-hidden
                           bg-black/90 backdrop-blur-xl border border-white/10
                           shadow-xl"
              >
                <DropdownItem label="Audio" />
                <DropdownItem label="Lighting" />
                <DropdownItem label="Video" />
                <DropdownItem label="Backline" />
              </div>
            )}
          </li>

          <NavItem label="About Us" link="#about" />
          <NavItem label="Contact" link="#contact" />
        </ul>
      </nav>
    </header>
  );
}

/* ---------------- HELPERS ---------------- */

function NavItem({ label, link }) {
  return (
    <li>
      <a
        href={link}
        className="hover:text-white transition relative group"
      >
        {label}
        <span
          className="absolute left-0 -bottom-1 w-0 h-[2px]
                     bg-gradient-to-r from-purple-500 to-blue-500
                     group-hover:w-full transition-all duration-500"
        />
      </a>
    </li>
  );
}

function DropdownItem({ label }) {
  return (
    <a
      href="#inventory"
      className="block px-5 py-3 text-white/80 hover:text-white
                 hover:bg-white/5 transition"
    >
      {label}
    </a>
  );
}
