"use client";

import { cn, fileSize } from "@/lib/utils";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { IoCloudUploadOutline } from "react-icons/io5";
import { TiDelete } from "react-icons/ti";

export function FileInput() {
  const dropZone = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const [file, setFile] = useState<File | undefined>(undefined);

  useEffect(() => {
    console.log("reset");
    window.addEventListener("dragover", (event) => {
      event.preventDefault();
    });

    window.addEventListener("drop", (event) => {
      event.preventDefault();
    });
  }, []);

  if (file) {
    return (
      <div className="flex-col bg-card rounded-xl flex justify-center items-center gap-5 shadow p-5">
        <ImagePreview
          file={file}
          onClear={() => {
            setFile(undefined);
            if (inputRef.current) {
              inputRef.current.value = "";
            }
          }}
        />
        <button className="text-secondary-text bg-cta-card hover:bg-cta-active-card rounded-lg p-2">
          upload
        </button>
      </div>
    );
  }
  return (
    <div
      onDragEnter={(e) => {
        console.log(e.dataTransfer.types);
        console.log(e.dataTransfer.files);
      }}
      onDragOver={(e) => {
        e.dataTransfer.dropEffect = "copy";
      }}
      onDragLeave={(e) => {}}
      onDrop={(e) => {
        e.preventDefault();
        e.stopPropagation();
        console.log("test");
        const files = e.dataTransfer.files;
        if (files.length > 0) {
          if (inputRef.current) {
            inputRef.current.files = files;
            setFile(files[0]);
          }
        }
      }}
      ref={dropZone}
      className="bg-card rounded-3xl flex justify-center items-center shadow p-5"
    >
      <div className="min-w-80 min-h-80  max-w-[42rem] w-fit h-fit p-10 border-dashed border-cta border-[2px] rounded-2xl flex flex-col justify-center items-center gap-4">
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
            <p>Browse File</p>
          </div>
        </label>
        <input
          ref={inputRef}
          id="file-upload"
          type="file"
          className="hidden"
          onChange={(e) => {
            console.log("change");
            if (e.target.files) {
              if (e.target.files.length > 0) {
                setFile(e.target.files[0]);
              }
            }
          }}
        />
      </div>
    </div>
  );
}

function ImagePreview({ file, onClear }: { file: File; onClear: () => void }) {
  const [isHover, setIsHover] = useState(false);
  const imageUrl = URL.createObjectURL(file);
  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between bg-code-card p-4 py-2 rounded-xl">
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

      <div
        className="relative"
        onMouseEnter={() => {
          setIsHover(true);
        }}
        onMouseLeave={() => {
          setIsHover(false);
        }}
        onClick={onClear}
      >
        <p
          className={cn(
            "text-white absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 hover:cursor-pointer",
            { hidden: !isHover }
          )}
        >
          x
        </p>
        <div
          draggable={false}
          onDragStart={(e) => e.preventDefault()}
          onClick={() => {}}
          className={cn({ "brightness-75 hover:cursor-pointer": isHover })}
        >
          <Image
            draggable={false}
            onDragStart={(e) => e.preventDefault()}
            className="select-none rounded-xl max-w-[34rem]"
            src={imageUrl}
            alt="image preview"
            width={0}
            height={0}
            //   sizes="80vw"
            style={{ width: "auto", height: "auto" }}
          />
        </div>
      </div>
    </div>
  );
}
