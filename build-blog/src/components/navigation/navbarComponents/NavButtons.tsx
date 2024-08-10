"use client";
import { useEffect, useState } from "react";
import Image from "next/image";

export default function NavThemeButton() {
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
  );
}
