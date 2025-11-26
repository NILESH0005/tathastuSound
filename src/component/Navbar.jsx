import React from "react";
import { Link } from "react-router-dom";
import { images } from "../../public/index.js";

const Navbar = () => {
  return (
    <main>
      <nav className="flex items-center justify-between py-2 px-4 md:px-6 lg:px-8 bg-DGXblue/10 shadow-lg">
        
        {/* Left Logo */}
        <Link to="/" className="flex items-center">
          <img
            src={images.giventure1}
            className="h-12 md:h-16 object-contain"
            alt="gi-venture logo"
          />
        </Link>

        {/* Right GTU Logo (Responsive Size) */}
        <div className="flex items-center justify-end">
          <img
            src={images.gtu}
            className="h-12 md:h-20 object-contain"
            alt="GTU Logo"
          />
        </div>
      </nav>
      <hr className="border-b-4 border-DGXblue" />
    </main>
  );
};

export default Navbar;
