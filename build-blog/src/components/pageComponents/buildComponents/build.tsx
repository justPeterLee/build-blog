"use client";

import { ImageHeaderModal } from "@/components/build/Element/edit/ImageEdit";

import { cn, fileSize } from "@/lib/utils";

import { useState } from "react";

import { TiDelete } from "react-icons/ti";
import { GoTriangleUp, GoTriangleDown } from "react-icons/go";
import { FaGear } from "react-icons/fa6";

export function FileList({
  files,
  imageFocusIndex,
  onUpdateImage,
  onChangeOrder,
  onRemoveImage,
}: {
  files: {
    obj: ImagesFileOrderObj;
    array: ImageFileOrder[];
  };
  imageFocusIndex: number;
  onUpdateImage: (
    imageId: string,
    header: {
      subtitle: string;
      link: string;
    }
  ) => void;
  onChangeOrder: (
    dir: boolean,
    curPosition: number,
    orderObj: ImagesFileOrderObj
  ) => void;
  onRemoveImage: (id: string) => void;
}) {
  return (
    <div className="grid grid-cols-[50px_auto] grid-rows-[0px_auto] gap-3 p-3 c border-2 border-code-card pt-5 rounded-lg w-full">
      <p className="justify-self-center self-center text-xs text-tertiary-text underline">
        order
      </p>

      <div className="col-start-2 col-span-1 row-start-1 row-span-1"></div>

      {files.array.map((imageInfo, index) => {
        return (
          <FileInfo
            key={index}
            order={index}
            imageFocusIndex={imageFocusIndex}
            imageInfo={imageInfo}
            onUpdateImage={(header: { subtitle: string; link: string }) => {
              onUpdateImage(imageInfo.id, header);
            }}
            onChangeOrder={(dir: boolean) => {
              onChangeOrder(dir, index, files.obj);
            }}
            onRemoveImage={onRemoveImage}
          />
        );
      })}
    </div>
  );
}

function FileInfo({
  imageInfo,
  order,
  imageFocusIndex,
  onUpdateImage,
  onChangeOrder,
  onRemoveImage,
}: {
  imageInfo: ImageFileOrder;
  order: number;
  imageFocusIndex: number;
  onUpdateImage: (header: { subtitle: string; link: string }) => void;
  onChangeOrder: (dir: boolean) => void;
  onRemoveImage: (id: string) => void;
}) {
  const [modalState, setModalState] = useState(false);
  return (
    <>
      <div className="justify-self-center self-center">
        <p
          className={cn(
            "flex justify-center items-center h-8 w-8 bg-code-card rounded-full text-sm text-secondary-text font-semibold",
            { "bg-cta-active-card": imageFocusIndex === order }
          )}
        >
          {order + 1}
        </p>
      </div>

      <div className="flex w-full h-full justify-self-center items-center self-center col-start-2 col-span-1">
        <div className="w-full flex flex-col">
          <div className="flex justify-between bg-code-card p-4 py-2 rounded-xl w-full">
            <div>
              <div className="text-secondary-text duration-0">
                <p>{imageInfo.file.name}</p>
              </div>
              <div className="flex gap-4 duration-0 text-tertiary-text font-semibold text-sm">
                <span>size: {fileSize(imageInfo.file.size)}</span>
                <span>type: {imageInfo.file.type}</span>
              </div>
            </div>

            <div className="flex justify-center items-center gap-3">
              <button
                onClick={() => {
                  setModalState(true);
                }}
              >
                <FaGear
                  size={20}
                  className={cn(
                    "text-tertiary-text hover:rotate-90 hover:text-indigo-500 transition-transform",
                    { "text-indigo-500 rotate-90": modalState }
                  )}
                />
              </button>
              <button
                onClick={() => {
                  onRemoveImage(imageInfo.id);
                }}
              >
                <TiDelete
                  size={30}
                  className="text-tertiary-text hover:text-[#e85367] duration-0"
                />
              </button>
            </div>
          </div>
        </div>

        <div className="flex flex-col justify-center items-center w-10 h-[80%] gap-1 ml-3">
          <button
            className="h-1/2 w-full  rounded hover:bg-cta-card flex justify-center items-center"
            onClick={() => {
              console.log("clicked up");
              onChangeOrder(true);
            }}
          >
            <GoTriangleUp className="text-primary-text" />
          </button>
          <button
            className="h-1/2 w-full  rounded hover:bg-cta-card flex justify-center items-center"
            onClick={() => {
              // changeImageOrder(false);
              console.log("clicked down");
              onChangeOrder(false);
            }}
          >
            <GoTriangleDown className="text-primary-text" />
          </button>
        </div>
      </div>

      {modalState && (
        <ImageHeaderModal
          imageInfo={imageInfo}
          onUpdateImage={onUpdateImage}
          onClose={() => {
            setModalState(false);
          }}
        />
      )}
    </>
  );
}

// export function FileInput({ post }: { post: string | null }) {
//   return (
//     <>
//       <Image src="/blog/example/tony.jpg" alt="" height={100} width={100} />
//       <CodeInput />
//     </>
//   );
// }

// export function FetchFile() {
//   const [file, setFile] = useState(null);
//   const handleFetch = async () => {
//     try {
//       // const url = await axios.get("/api/file/asdf");
//       // if (url.data) {
//       //   console.log(url.data.url);
//       //   setFile(url.data.url);
//       // }
//     } catch (err) {
//       console.log("could not fetch file ", err);
//     }
//   };
//   return (
//     <div>
//       {file && (
//         <iframe
//           width="560"
//           height="315"
//           src={file}
//           title="firebase video"
//           allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
//           referrerPolicy="strict-origin-when-cross-origin"
//           allowFullScreen
//         ></iframe>
//       )}
//       <button
//         className="bg-cta hover:bg-cta-active px-2 p-1 text-secondary-text rounded"
//         onClick={() => {
//           handleFetch();
//         }}
//       >
//         fetch image
//       </button>
//     </div>
//   );
// }
