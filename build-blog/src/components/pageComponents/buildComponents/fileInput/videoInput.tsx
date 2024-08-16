"use client";

import { Modal } from "@/components/modal/modalTemplate";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import { BiMoviePlay } from "react-icons/bi";
import { FileList } from "../build";
import { validVideo } from "@/lib/utils";
import axios from "axios";
export function VideoInput({}: {}) {
  const dropZone = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [file, setFile] = useState<File | string | undefined>(undefined);
  const [error, setError] = useState({ error: false, message: "" });

  useEffect(() => {
    window.addEventListener("dragover", (event) => {
      event.preventDefault();
    });

    window.addEventListener("drop", (event) => {
      event.preventDefault();
    });
  }, []);
  const [showURLModal, setShowURLModal] = useState(false);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const files = e.target.files;
    if (files) {
      const isValid = validVideo(files[0]);
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
        const isValid = validVideo(files[0]);
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
      <VideoPlayer
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
      {showURLModal && (
        <URLModal
          setFile={(url: string) => {
            setFile(url);
          }}
          onClose={() => {
            setShowURLModal(false);
          }}
        />
      )}
      <div className="relative text-center min-w-80 min-h-80  max-w-[42rem] w-fit h-fit p-10 border-dashed border-cta border-[2px] rounded-2xl flex flex-col justify-center items-center ">
        <BiMoviePlay
          className="text-secondary-text duration-0 mb-4"
          size={30}
        />

        <div className="text-secondary-text duration-0 text-center mb-4">
          <p>Choose file or drag and drop here</p>
          <p className="text-sm text-tertiary-text">
            MP4 and MOV formats up to 10MB
          </p>
        </div>
        <label htmlFor="video-upload" className="hover:cursor-pointer">
          <div className="bg-cta-card hover:bg-cta-active-card text-secondary-text px-5 py-1 rounded">
            <p className="duration-0">Browse File</p>
          </div>
        </label>
        <input
          ref={inputRef}
          accept=".mp4, .mov"
          id="video-upload"
          type="file"
          className="hidden"
          onChange={(e) => {
            handleFileChange(e);
          }}
        />

        <div className="flex flex-col justify-center items-center text-sm text-tertiary-text duration-0">
          <p className="">or</p>
          <button
            className="hover:underline rounded"
            onClick={() => {
              setShowURLModal(true);
            }}
          >
            From URL
          </button>
        </div>
        {error.error && (
          <p className="text-[#BF4153] absolute bottom-5 z-20 text-sm max-w-[80%]">
            * {error.message}
          </p>
        )}
      </div>
    </div>
  );
}

function URLModal({
  onClose,
  setFile,
}: {
  onClose: () => void;
  setFile: (url: string) => void;
}) {
  const [url, setUrl] = useState("");

  return (
    <Modal onClose={onClose}>
      <div className="flex flex-col gap-5">
        <label htmlFor="url-input">
          <div>
            <p className="text-secondary-text">Enter URL for video</p>
            <p className="text-sm text-tertiary-text">
              url must be an imbedded video or else video may fail to load
            </p>
          </div>
        </label>
        <input
          id="url-input"
          type="text"
          className="h-10 w-full p-3 rounded bg-cta-card text-sm text-secondary-text outline-none placeholder:text-tertiary-text"
          placeholder="Enter URL"
          value={url}
          onChange={(e) => {
            setUrl(e.target.value);
          }}
        />
        <div className="flex gap-4">
          <button
            className="bg-cta-card rounded p-4 py-1 hover:bg-cta-active-card"
            onClick={() => {
              setFile(url);
              onClose();
            }}
          >
            submit
          </button>
          <button
            className="hover:underline text-secondary-text"
            onClick={onClose}
          >
            cancel
          </button>
        </div>
      </div>
    </Modal>
  );
}

export function VideoPlayer({
  file,
  onClear,
}: {
  file: string | File;
  onClear: () => void;
}) {
  if (typeof file === "string") {
    return <EmbbedVideoPreview url={file} onClear={onClear} />;
  }

  if (typeof file !== "string") {
    return (
      <div className="flex-col bg-card rounded-xl flex justify-center items-center gap-5 shadow p-5">
        <FileList file={file} onClear={onClear} />
        <div draggable={false} onDragStart={(e) => e.preventDefault()}>
          <video width="100%" height="auto" controls preload="none">
            <source src={URL.createObjectURL(file)} type={file.type}></source>
          </video>
        </div>
        <UploadFile file={file} />
      </div>
    );
  }
}

export function EmbbedVideoPreview({
  url,
  onClear,
}: {
  url: string;
  onClear: () => void;
}) {
  return (
    <div className="flex-col bg-card rounded-xl flex justify-center items-center gap-5 shadow p-5">
      <div draggable={false} onDragStart={(e) => e.preventDefault()}></div>
      <iframe
        width="560"
        height="315"
        src={url}
        title="YouTube video player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
      ></iframe>
      <div>
        <button className="mr-4 text-secondary-text bg-cta-card hover:bg-cta-active-card rounded-lg p-2">
          upload
        </button>
        <button
          className="hover:underline text-secondary-text"
          onClick={onClear}
        >
          cancel
        </button>
      </div>
    </div>
  );
}

function UploadFile({ file }: { file: File }) {
  const handleUpload = async () => {
    try {
      const formData = new FormData();
      formData.append("file", file);

      await axios.post(
        "/api/file/upload",
        { file, url: "example" },
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <button
      onClick={() => {
        handleUpload();
      }}
      className="mr-4 text-secondary-text bg-cta-card hover:bg-cta-active-card rounded-lg p-2"
    >
      upload
    </button>
  );
}
