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

export function validImage(file: File) {
  const error = { error: false, message: "valid" };
  // valid type
  const allowedTypes = ["image/png", "image/jpeg", "image/gif"];
  if (!allowedTypes.includes(file.type)) {
    error.error = true;
    error.message =
      "File type is not supported. Please upload a supported image type.";
    return error;
  }
  // valid size
  if (file.size > 5 * 1024 * 1024) {
    error.error = true;
    error.message = "File size exceeds the limit of 5 MB";
  }

  return error;
}

export function validVideo(file: File) {
  const error = { error: false, message: "valid" };
  // valid type
  const allowedTypes = ["video/mp4", "video/mov"];
  if (!allowedTypes.includes(file.type)) {
    error.error = true;
    error.message =
      "File type is not supported. Please upload a supported type.";
    return error;
  }
  // valid size
  if (file.size > 10 * 1024 * 1024) {
    error.error = true;
    error.message = "File size exceeds the limit of 5 MB";
  }

  return error;
}

export function fileRefFormat(url: string, file: File) {
  const type = file.type.split("/")[1];
  const name = file.name.replace(/\s/g, "-");
  return `${url}/${type}/${name}`;
}

export function markDownJsFormat(value: string) {
  const json = JSON.parse(value);

  const string = JSON.stringify(["name", "test"]);
  console.log(string);

  return json;
}
