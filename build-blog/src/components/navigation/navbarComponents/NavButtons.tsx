"use client";
import { useEffect, useState } from "react";
import Image from "next/image";

export default function NavThemeButton() {
  const [darkMode, setDarkMode] = useState<boolean | null>(null);

  useEffect(() => {
    const theme = localStorage.getItem("theme");
    if (theme) {
      setDarkMode(theme === "dark");
    } else if (window.matchMedia("(prefers-color-scheme:dark)")) {
      setDarkMode(true);
    } else {
      setDarkMode(false);
    }
  }, []);

  useEffect(() => {
    if (darkMode !== null) {
      if (darkMode) {
        localStorage.setItem("theme", "dark");
        document.body.classList.remove("light");
        document.body.classList.add("dark");
      } else {
        localStorage.setItem("theme", "light");
        document.body.classList.remove("dark");
        document.body.classList.add("light");
      }
    }
  }, [darkMode]);

  return (
    <div
      className="nav-theme-btn shadow-[0px_1px_2px_0px_rgba(60,64,67,0.3),0px_1px_3px_1px_rgba(60,64,67,0.15)] rounded-full bg-navbar-cta flex items-center justify-center h-[32px] w-[32px] hover:cursor-pointer select-none"
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
