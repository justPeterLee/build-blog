"use client";

import { fileSize } from "@/lib/utils";
import { ImageInput } from "./fileInput/imageInput";
import { TiDelete } from "react-icons/ti";
import { VideoInput } from "./fileInput/videoInput";

export function FileInput() {
  return (
    <>
      <ImageInput />
      <VideoInput />
    </>
  );
}

export function FileList({
  file,
  onClear,
}: {
  file: File;
  onClear: () => void;
}) {
  return (
    <>
      <div className="flex justify-between bg-code-card p-4 py-2 rounded-xl w-full">
        <div className="">
          <div className="text-secondary-text duration-0">
            <p>{file.name}</p>
          </div>
          <div className="flex gap-4 duration-0 text-tertiary-text font-semibold text-sm">
            <span>size: {fileSize(file.size)}</span>
            <span>type: {file.type}</span>
          </div>
        </div>
        <button onClick={onClear}>
          <TiDelete
            size={35}
            className="text-[#e85367] hover:text-[#BF4153] duration-0"
          />
        </button>
      </div>
    </>
  );
}
