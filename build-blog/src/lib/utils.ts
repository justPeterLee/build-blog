import { ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { nanoid } from "nanoid";
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

function validateImage(file: File) {
  const error = { isError: false, file: file, message: "invalid image" };

  // valid types
  const allowedTypes = ["image/png", "image/jpeg", "image/gif", "image/webp"];
  if (!allowedTypes.includes(file.type)) {
    error.isError = true;
    error.message =
      "File type is not supported. Please upload a supported image type.";
    return error;
  }

  // valid size
  if (file.size > 5 * 1024 * 1024) {
    error.isError = true;
    error.message = "File size exceeds the limit of 5 MB";
    return error;
  }

  return error;
}

export function validMultipleImages(
  files: FileList,
  originalObj: ImagesFileObj
) {
  const error: {
    error: boolean;
    fileError: { file: File; message: string }[];
  } = { error: false, fileError: [] };
  let proxyFileObj = { ...originalObj };
  for (let i = 0; i < files.length; i++) {
    const imageError = validateImage(files[i]);
    if (imageError.isError) {
      error.error = true;
      error.fileError.push({ file: files[i], message: imageError.message });
      continue;
    }
    proxyFileObj = imageInfoGen(proxyFileObj, files[i]);
  }

  return { fileObj: proxyFileObj, error: error };
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

export function imageInfoGen(originalObj: ImagesFileObj, file: File) {
  const id = nanoid(4);
  const order = Object.keys(originalObj).length;

  const imageInfoObj = {
    ...originalObj,
    [id]: {
      order: order,
      file: file,
      subtitle: "",
      reference: "",
    },
  };

  return imageInfoObj;
}

export function imageCarouselOrder(imagesInfoObj: ImagesFileObj) {
  const imagesInfoKeys = Object.keys(imagesInfoObj);
  const imagesInfoObjOrder: ImagesFileOrderObj = {};
  for (let i = 0; i < imagesInfoKeys.length; i++) {
    const imageId = imagesInfoKeys[i];
    const imageInfo = imagesInfoObj[imagesInfoKeys[i]];
    imagesInfoObjOrder[imageInfo.order] = {
      id: imageId,
      file: imageInfo.file,
      subtitle: imageInfo.subtitle,
      reference: imageInfo.reference,
    };
  }

  const imageInfoArray = Array.from(
    Object.entries(imagesInfoObjOrder),
    ([_key, value]: [string, ImageFileOrder]) => value
  );

  return { obj: imagesInfoObjOrder, array: imageInfoArray };
}

export function removeImage(imagesInfoObj: ImagesFileObj, id: string) {
  const filteredImageInfoObj = Object.fromEntries(
    Object.entries(imagesInfoObj).filter(([key]) => key !== id)
  );

  const filteredImageInfoKeys = Object.keys(filteredImageInfoObj);
  for (let i = 0; i < filteredImageInfoKeys.length; i++) {
    filteredImageInfoObj[filteredImageInfoKeys[i]].order = i;
  }

  return filteredImageInfoObj;
}

export function changeImageOrder(
  dir: boolean,
  curPosition: number,
  orderObj: ImagesFileOrderObj,
  imageObj: ImagesFileObj
) {
  const swap = !dir ? curPosition + 1 : curPosition - 1;

  const curId = orderObj[curPosition].id;
  const swapId = orderObj[swap].id;

  const proxyImageObj = { ...imageObj };
  proxyImageObj[curId].order = swap;
  proxyImageObj[swapId].order = curPosition;

  return proxyImageObj;
}

export function updateImageHeader(
  curImageId: string,
  header: { subtitle: string; link: string },
  imageObj: ImagesFileObj
) {
  const proxyImageObj = { ...imageObj };
  proxyImageObj[curImageId].subtitle = header.subtitle;
  proxyImageObj[curImageId].reference = header.link;

  return proxyImageObj;
}

export function validContentElementType(
  type: elementTypes,
  content: TextContent | ImageContent
) {
  if (content === null) return false;

  if (type === "Text" && typeof content === "string") return true;

  if (type === "Image" && typeof content === "object") return true;

  return false;
}
