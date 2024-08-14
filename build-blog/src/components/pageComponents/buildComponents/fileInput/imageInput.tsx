import { ChangeEvent, useEffect, useRef, useState } from "react";
import { IoCloudUploadOutline } from "react-icons/io5";
import Image from "next/image";
import { cn, validImage } from "@/lib/utils";
import { FileList } from "../build";

export function ImageInput() {
  const dropZone = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [file, setFile] = useState<File | undefined>(undefined);
  const [error, setError] = useState({ error: false, message: "" });

  useEffect(() => {
    window.addEventListener("dragover", (event) => {
      event.preventDefault();
    });

    window.addEventListener("drop", (event) => {
      event.preventDefault();
    });
  }, []);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const files = e.target.files;
    if (files) {
      const isValid = validImage(files[0]);
      if (!isValid.error) {
        if (files.length > 0) {
          setFile(files[0]);
          setError({ error: false, message: "" });
        }
      } else {
        console.log(isValid.message);
        setError({ error: true, message: isValid.message });
      }
    }
  };

  const handleFileDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      if (inputRef.current) {
        const isValid = validImage(files[0]);
        if (!isValid.error) {
          inputRef.current.files = files;
          setFile(files[0]);
          setError({ error: false, message: "" });
        } else {
          console.log(isValid.message);
          setError({ error: true, message: isValid.message });
        }
      }
    }
  };

  if (file) {
    return (
      <ImagePreview
        file={file}
        onClear={() => {
          setFile(undefined);
          if (inputRef.current) {
            inputRef.current.value = "";
          }
        }}
      />
    );
  }
  return (
    <div
      onDragOver={(e) => {
        e.dataTransfer.dropEffect = "copy";
      }}
      onDrop={(e) => {
        handleFileDrop(e);
      }}
      ref={dropZone}
      className="bg-card rounded-3xl flex justify-center items-center shadow p-5"
    >
      <div className="relative  text-center min-w-80 min-h-80  max-w-[42rem] w-fit h-fit p-10 border-dashed border-cta border-[2px] rounded-2xl flex flex-col justify-center items-center gap-4">
        <IoCloudUploadOutline
          className="text-secondary-text duration-0"
          size={30}
        />
        <div className="text-secondary-text duration-0 text-center">
          <p>Choose file or drag and drop here</p>
          <p className="text-sm text-tertiary-text">
            JPG, JPEG, PNG, and GIF formats up to 5MB{" "}
          </p>
        </div>

        <label htmlFor="image-upload" className="hover:cursor-pointer">
          <div className="bg-cta-card hover:bg-cta-active-card text-secondary-text px-5 py-1 rounded">
            <p className="duration-0">Browse File</p>
          </div>
        </label>
        <input
          ref={inputRef}
          id="image-upload"
          type="file"
          accept=".png, .jpg, .jpeg, .gif"
          className="hidden"
          onChange={(e) => {
            handleFileChange(e);
          }}
        />
        {error.error && (
          <p className="text-[#BF4153] absolute bottom-10 z-20 text-sm max-w-[80%]">
            * {error.message}
          </p>
        )}
      </div>
    </div>
  );
}

export function ImagePreview({
  file,
  onClear,
}: {
  file: File;
  onClear: () => void;
}) {
  const [isHover, setIsHover] = useState(false);
  const imageUrl = URL.createObjectURL(file);
  return (
    <div className="flex-col bg-card rounded-xl flex justify-center items-center gap-5 shadow p-5">
      <FileList file={file} onClear={onClear} />
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
      <button className="text-secondary-text bg-cta-card hover:bg-cta-active-card rounded-lg p-2">
        upload
      </button>
    </div>
  );
}
