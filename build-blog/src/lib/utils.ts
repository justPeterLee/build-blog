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

export function navbarSelectionAnmtion(
  anchorContainer: HTMLAnchorElement,
  origin: HTMLAnchorElement
) {
  const originPos = origin.getBoundingClientRect();
  const anchorPos = anchorContainer.getBoundingClientRect();

  // scale from select to anchor
  // anchor / select width
  const scaleX = anchorPos.width / 80;

  const scaleY = anchorPos.height / 80;
  // translate from select to anchor pos
  // anchor - select pos (left pos)
  const x = anchorPos.left - originPos.left;

  return { x, scaleX, scaleY };
}

export function fileSize(size: number) {
  const MB = parseFloat((size / (1024 * 1024)).toFixed(2));
  const KB = parseFloat((size / 1024).toFixed(2));

  if (MB >= 1) {
    return `${MB}MB`;
  }
  return `${KB}KB`;
}

export function fileType(type: string) {
  if (type.startsWith("image/") || type.startsWith("/gif")) {
    return "Image";
  } else if (type.startsWith("video/")) {
    return "Video";
  } else {
    return null;
  }
}
