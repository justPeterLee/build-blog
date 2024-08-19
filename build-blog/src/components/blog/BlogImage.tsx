"use client";

import { useState } from "react";
import { Modal } from "../modal/modalTemplate";

export function BlogImage({
  image,
  folder,
  width,
  heigth,
  subTitle,
  reference,
}: {
  image: string;
  folder: string;
  width?: string;
  heigth?: string;
  subTitle?: string;
  reference?: string;
}) {
  const [fullScreen, setFullScreen] = useState(false);
  return (
    <>
      {fullScreen && (
        <Modal
          onClose={() => {
            setFullScreen(false);
          }}
          modalClassName="w-[80%] max-w-[75rem] flex justify-center items-center"
        >
          <div className="m-auto">
            <img
              src={`/blog/${folder}/${image}`}
              alt={image}
              className="w-auto h-auto"
            />
            <h3 className="text-secondary-text mt-4">{subTitle}</h3>
          </div>
        </Modal>
      )}
      <div className="m-auto my-5">
        <div>
          <img
            src={`/blog/${folder}/${image}`}
            alt={image}
            className="w-auto h-auto max-w-[42rem] min-w-80 rounded-lg shadow hover:cursor-pointer"
            style={{ width: width ? width : "", height: heigth ? heigth : "" }}
            onClick={() => {
              console.log("clicked");
              setFullScreen(true);
            }}
          />
          <div className="mt-1 text-xs text-secondary-text duration-0 flex justify-between">
            <span className="text-xs text-secondary-text">{subTitle}</span>
            {reference && (
              <a href={reference} target="_blank">
                ref
              </a>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
