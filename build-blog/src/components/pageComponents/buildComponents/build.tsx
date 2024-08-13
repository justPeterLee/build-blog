"use client";

import { useState } from "react";
import { IoCloudUploadOutline } from "react-icons/io5";

export function FileInput() {
  const [file, setFile] = useState<File | undefined>(undefined);

  return (
    <div className="bg-card w-80 h-80 rounded-3xl flex justify-center items-center shadow">
      <div className="h-[90%] w-[90%] border-dashed border-cta border-[2px] rounded-2xl flex flex-col justify-center items-center gap-4">
        <IoCloudUploadOutline
          className="text-secondary-text duration-0"
          size={30}
        />
        <div className="text-secondary-text duration-0 text-center">
          <p>Choose file or drag and drop here</p>
          <p className="text-sm text-tertiary-text">
            JPEG and PNG formats up to 50MB{" "}
          </p>
        </div>
        <label htmlFor="file-upload" className="hover:cursor-pointer">
          <div className="bg-cta-card hover:bg-cta-active-card text-secondary-text px-5 py-1 rounded">
            Browse Files
          </div>
        </label>
        <input
          id="file-upload"
          type="file"
          className="hidden"
          onChange={(e) => {
            if (e.target.files) {
              console.log(e.target.files[0]);
              setFile(e.target.files[0]);
              console.log(e.target.value);
            }
          }}
        />
      </div>
    </div>
  );
}
