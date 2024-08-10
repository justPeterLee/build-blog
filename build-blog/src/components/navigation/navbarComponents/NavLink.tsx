import { cn, currentPathname } from "@/lib/utils";
import { Url } from "next/dist/shared/lib/router/router";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ReactNode, useEffect, useState } from "react";

export default function NavLinkContainer() {
  const pathname = usePathname();
  const [path, setPath] = useState(currentPathname(pathname));

  useEffect(() => {
    setPath(currentPathname(pathname));
  }, [pathname]);

  return (
    <div className="navbar_links flex gap-1">
      <NavLink href={"/"} path="home" currentPath={path}>
        Home
      </NavLink>
      <NavLink href={"/articles"} path="articles" currentPath={path}>
        Articles
      </NavLink>
      <NavLink href={"/projects"} path="projects" currentPath={path}>
        Projects
      </NavLink>
      <NavLink href={"/practice"} path="practice" currentPath={path}>
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
        "duration-150 rounded-md p-1 px-3 text-navbar-link-text hover:text-navbar-link-text-active",
        {
          "bg-navbar-active": path === currentPath,
        }
      )}
    >
      {children}
    </Link>
  );
}
