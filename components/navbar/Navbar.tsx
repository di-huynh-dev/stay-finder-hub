import React from "react";
import Logo from "./Logo";
import LinksDropdown from "./LinksDropdown";
import DarkMode from "./DarkMode";
import NavSearch from "./NavSearch";

function Navbar() {
  return (
    <nav className="border-b">
      <div className="container flex flex-col sm:flex-row sm:justify-between sm:items-center flex-wrap gap-4">
        <Logo />
        <NavSearch />
        <div className="flex gap-4 items-center py-8">
          <DarkMode />
          <LinksDropdown />
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
