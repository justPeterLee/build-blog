"use client";

import { fileSize } from "@/lib/utils";
import { ImageInput } from "./fileInput/imageInput";
import { TiDelete } from "react-icons/ti";
import { VideoInput } from "./fileInput/videoInput";
import { User } from "firebase/auth";
import { logout } from "@/lib/db";
import { Login } from "./auth/auth";
import { useState } from "react";
import axios from "axios";
export function FileInput() {
  const [user, setUser] = useState<User | null>(null);

  return (
    <>
      <Login />
      <FetchFile />
      {/* <button
        onClick={async () => {
          await logout();
        }}
      >
        sign out
      </button>
      {user ? <p>welcome, {user.email}</p> : <p>log in</p>} */}
      {/* <ImageInput /> */}
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

export function FetchFile() {
  const [file, setFile] = useState(null);
  const handleFetch = async () => {
    try {
      const url = await axios.get("/api/file/asdf");
      if (url.data) {
        console.log(url.data.url);
        setFile(url.data.url);
      }
    } catch (err) {
      console.log("could not fetch file ", err);
    }
  };
  return (
    <div>
      {file && (
        <iframe
          width="560"
          height="315"
          src={file}
          title="firebase video"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        ></iframe>
      )}
      <button
        className="bg-cta hover:bg-cta-active px-2 p-1 text-secondary-text rounded"
        onClick={() => {
          handleFetch();
        }}
      >
        fetch image
      </button>
    </div>
  );
}
