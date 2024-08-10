"use client";
import Link from "next/link";
import Image from "next/image";
import { ReactNode, useEffect, useState } from "react";
import { useParams, usePathname } from "next/navigation";
import { useRouter } from "next/router";
import { cn, currentPathname } from "@/lib/utils";
import { Url } from "next/dist/shared/lib/router/router";
export function Navbar() {
  const pathname = usePathname();
  const [darkMode, setDarkMode] = useState(false);
  const [currentPath, setCurrentPath] = useState(currentPathname(pathname));
  useEffect(() => {
    if (darkMode) {
      document.body.classList.remove("light");
      document.body.classList.add("dark");
    } else if (!darkMode) {
      document.body.classList.remove("dark");
      document.body.classList.add("light");
    } else if (window.matchMedia("prefers-color-scheme:dark)")) {
      document.body.classList.remove("light");
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
      document.body.classList.add("light");
    }
  }, [darkMode]);

  useEffect(() => {
    setCurrentPath(currentPathname(pathname));
  }, [pathname]);
  return (
    <header className="p-10 flex justify-center items-center ">
      {/* links */}
      <nav className="flex justify-between items-center bg-navbar rounded-lg w-[42rem] p-2 px-4 shadow-md">
        <div className="navbar_links flex gap-1">
          <NavLink href={"/"} path="home" currentPath={currentPath}>
            Home
          </NavLink>
          <NavLink href={"/articles"} path="articles" currentPath={currentPath}>
            Articles
          </NavLink>
          <NavLink href={"/projects"} path="projects" currentPath={currentPath}>
            Projects
          </NavLink>
          <NavLink href={"/practice"} path="practice" currentPath={currentPath}>
            Practice
          </NavLink>
        </div>

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

          <div
            className="shadow-[0px_1px_2px_0px_rgba(60,64,67,0.3),0px_1px_3px_1px_rgba(60,64,67,0.15)] rounded-full bg-navbar-cta flex items-center justify-center h-[32px] w-[32px] hover:cursor-pointer select-none"
            onClick={() => {
              setDarkMode(!darkMode);
            }}
          >
            {darkMode ? (
              <Image
                src={"/navbar/dark-mode-white.svg"}
                alt="light"
                width={20}
                height={20}
                className="pointer-events-none"
              />
            ) : (
              <Image
                src={"/navbar/light-mode-fill.svg"}
                alt="light"
                width={20}
                height={20}
                className="pointer-events-none"
              />
            )}
          </div>
        </div>
      </nav>
    </header>
  );
}

function NavLink({
  children,
  href,
  path,
  currentPath,
}: {
  children: ReactNode;
  href: Url;
  path: string;
  currentPath: string;
}) {
  return (
    <Link
      href={href}
      className={cn(
        "hover:bg-navbar-active duration-150 rounded-md p-1 px-3 text-primary-text",
        { "bg-navbar-active": path === currentPath }
      )}
    >
      {children}
    </Link>
  );
}
