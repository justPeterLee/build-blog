"use client";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
export function Navbar() {
  const [darkMode, setDarkMode] = useState(false);

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
  return (
    <header className="p-10 flex justify-center items-center ">
      {/* links */}
      <nav className="flex justify-between items-center bg-navbar rounded-lg w-[42rem] p-2 px-4 shadow-md">
        <div className="navbar_links flex gap-1">
          <Link
            href={"/"}
            className="hover:bg-navbar-active duration-150 rounded-md p-1 px-3 text-primary-text"
          >
            Home
          </Link>
          <Link
            href={"/"}
            className="hover:bg-navbar-active duration-150 rounded-md p-1 px-3 text-primary-text"
          >
            Articles
          </Link>
          <Link
            href={"/"}
            className="hover:bg-navbar-active duration-150 rounded-md p-1 px-3 text-primary-text"
          >
            Projects
          </Link>
          <Link
            href={"/"}
            className="hover:bg-navbar-active duration-150 rounded-md p-1 px-3 text-primary-text"
          >
            Practice
          </Link>
        </div>

        {/* buttons */}
        <div className="navbar_buttons flex gap-5 justify-center items-center px-2">
          <button className="bg-cta rounded-full px-2 flex gap-2 items-center justify-center h-[32px] hover:bg-cta-active duration-100">
            <Image
              src={"/navbar/search.svg"}
              alt="Search"
              width={15}
              height={15}
            />
            <span className="text-xs text-secondary-text font-semibold rounded-full px-2 shadow bg-navbar-cta flex">
              <Image
                src={"/navbar/control-btn.svg"}
                alt="ctrl"
                width={10}
                height={10}
              />
              +k
            </span>
          </button>

          <div
            className="shadow-[0px_1px_2px_0px_rgba(60,64,67,0.3),0px_1px_3px_1px_rgba(60,64,67,0.15)] rounded-full bg-neutral-50 dark:bg-neutral-800 flex items-center justify-center h-[32px] w-[32px] hover:cursor-pointer"
            onClick={() => {
              setDarkMode(!darkMode);
            }}
          >
            {darkMode ? (
              <Image
                src={"/navbar/dark-mode.svg"}
                alt="light"
                width={20}
                height={20}
              />
            ) : (
              <Image
                src={"/navbar/light-mode.svg"}
                alt="light"
                width={20}
                height={20}
              />
            )}
          </div>
        </div>
      </nav>
    </header>
  );
}
