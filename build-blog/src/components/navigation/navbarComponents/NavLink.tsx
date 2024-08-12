"use client";
import { currentPathname, navbarSelectionAnmtion } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ReactNode, useEffect, useRef } from "react";
import { animated, useSpring } from "@react-spring/web";

export default function NavLinkContainer() {
  const pathname = usePathname();
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
        api.set(newPos);
      }
    }
  };

  useEffect(() => {
    if (parentRef.current) {
      const currentPath = currentPathname(pathname);
      handleSelectAnimation(currentPath, true);
    }
  }, []);

  useEffect(() => {
    if (parentRef.current) {
      const path = currentPathname(pathname);

      const validAnimeLink = parentRef.current.querySelector(`#${path}`);
      if (validAnimeLink === null) {
        api.set({ scaleX: 0, scaleY: 0 });
      }
    }
  }, [pathname]);
  return (
    <div className="navbar_links flex gap-1 relative" ref={parentRef}>
      <animated.div
        id="select-container"
        className={
          "w-20 h-20 bg-navbar-active rounded-md absolute origin-top-left z-10"
        }
        style={springs}
      />
      <NavLink href={"/"} path="home" click={handleSelectAnimation}>
        Home
      </NavLink>
      <NavLink href={"/posts"} path="posts" click={handleSelectAnimation}>
        Posts
      </NavLink>
      <NavLink href={"/projects"} path="projects" click={handleSelectAnimation}>
        Projects
      </NavLink>
      <NavLink href={"/practice"} path="practice" click={handleSelectAnimation}>
        Practice
      </NavLink>
    </div>
  );
}

function NavLink({
  children,
  href,
  path,
  click,
}: {
  children: ReactNode;
  href: string;
  path: string;
  click: (id: string) => void;
}) {
  return (
    <Link
      onClick={() => {
        click(path);
      }}
      href={href}
      id={path}
      className="duration-150 rounded-md p-1 px-3 text-navbar-link-text hover:text-navbar-link-text-active z-20"
    >
      {children}
    </Link>
  );
}
