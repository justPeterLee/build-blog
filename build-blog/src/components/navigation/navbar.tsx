import Image from "next/image";
import NavLinkContainer from "./navbarComponents/NavLink";
import NavThemeButton from "./navbarComponents/NavButtons";

export function Navbar() {
  return (
    <header className="p-10 flex justify-center items-center ">
      {/* links */}
      <nav className="flex justify-between items-center bg-navbar rounded-lg w-[42rem] p-2 px-4 shadow-md">
        <NavLinkContainer />

        {/* buttons */}
        <div className="navbar_buttons flex gap-5 justify-center items-center px-2">
          <button className="bg-cta rounded-full px-2 flex gap-2 items-center justify-center h-[32px] hover:bg-cta-active duration-100">
            <Image
              src={"/navbar/search.svg"}
              alt="Search"
              width={15}
              height={15}
              className="pointer-events-none"
            />
            <span className="text-xs text-secondary-text font-semibold rounded-full px-2 shadow bg-navbar-cta flex">
              <Image
                src={"/navbar/control-btn.svg"}
                alt="ctrl"
                width={10}
                height={10}
                className="pointer-events-none"
              />
              +k
            </span>
          </button>
          <NavThemeButton />
        </div>
      </nav>
    </header>
  );
}
