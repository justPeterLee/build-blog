"use client";
import { cn, currentPathname, navbarSelectionAnmtion } from "@/lib/utils";
import { Url } from "next/dist/shared/lib/router/router";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ReactNode, useEffect, useRef, useState } from "react";
import { animated, useSpring } from "@react-spring/web";

export default function NavLinkContainer() {
  const pathname = usePathname();
  const [path, setPath] = useState(currentPathname(pathname));

  useEffect(() => {
    setPath(currentPathname(pathname));
  }, [pathname]);

  const initRender = useRef(false);
  const parentRef = useRef<HTMLDivElement | null>(null);

  const [springs, api] = useSpring(() => ({
    x: 0,
    scaleY: 0,
    scaleX: 0,
  }));

  const handleSelectAnimation = (id: string, initial?: boolean) => {
    const anchor: HTMLAnchorElement | null = parentRef.current!.querySelector(
      `#${id}`
    );
    const origin: HTMLAnchorElement | null =
      parentRef.current!.querySelector("#home");

    if (anchor && origin) {
      const newPos = navbarSelectionAnmtion(anchor, origin);

      if (!initial) {
        api.start(newPos);
      } else {
        if (!initRender.current) {
          initRender.current = true;
          api.set(newPos);
        }
      }
    }
  };

  useEffect(() => {
    if (parentRef.current) {
      const currentPath = currentPathname(pathname);
      handleSelectAnimation(currentPath, true);
    }
  }, []);

  return (
    <div className="navbar_links flex gap-1 relative" ref={parentRef}>
      <animated.div
        id="select-container"
        className={
          "w-20 h-20 bg-navbar-active rounded-md absolute origin-top-left z-10"
        }
        style={springs}
      />
      <NavLink
        href={"/"}
        path="home"
        currentPath={path}
        click={handleSelectAnimation}
      >
        Home
      </NavLink>
      <NavLink
        href={"/articles"}
        path="articles"
        currentPath={path}
        click={handleSelectAnimation}
      >
        Articles
      </NavLink>
      <NavLink
        href={"/projects"}
        path="projects"
        currentPath={path}
        click={handleSelectAnimation}
      >
        Projects
      </NavLink>
      <NavLink
        href={"/practice"}
        path="practice"
        currentPath={path}
        click={handleSelectAnimation}
      >
        Practice
      </NavLink>
    </div>
  );
}

function NavLink({
  children,
  href,
  path,
  currentPath,
  click,
}: {
  children: ReactNode;
  href: Url;
  path: string;
  currentPath: string;
  click: (id: string) => void;
}) {
  return (
    <Link
      onClick={() => {
        click(path);
      }}
      href={href}
      id={path}
      className={cn(
        "duration-150 rounded-md p-1 px-3 text-navbar-link-text hover:text-navbar-link-text-active z-20"
      )}
    >
      {children}
    </Link>
  );
}
