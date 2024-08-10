import { ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function currentPathname(pathname: string) {
  const pathMap = pathname.split("/").filter((path) => {
    return path !== "";
  });

  if (pathMap.length) {
    return pathMap[0];
  } else {
    return "home";
  }
}
