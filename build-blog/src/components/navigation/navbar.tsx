import { CgSearch } from "react-icons/cg";
import NavLinkContainer from "./navbarComponents/NavLink";
import NavThemeButton, { NavBuildButton } from "./navbarComponents/NavButtons";

export function Navbar() {
  return (
    <header className="p-10 flex justify-center items-center">
      {/* links */}
      <nav className="flex justify-between items-center bg-navbar rounded-lg w-[42rem] p-2 px-4 shadow-md  z-20">
        <NavLinkContainer />

        {/* buttons */}
        <div className="navbar_buttons flex gap-5 justify-center items-center px-2">
          <button className="bg-cta rounded-full px-2 flex gap-2 items-center justify-center h-[32px] hover:bg-cta-active">
            <CgSearch size={18} className="text-primary-text duration-0" />
            <span className="text-xs text-secondary-text font-semibold rounded-full px-2 shadow bg-navbar-cta flex">
              <p className="text-secondary-text">crtl+k</p>
            </span>
          </button>
          <NavBuildButton />
          <NavThemeButton />
        </div>
      </nav>
    </header>
  );
}
