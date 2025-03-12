import { IoCloudUploadOutline } from "react-icons/io5";
import { FaAngleDown } from "react-icons/fa";
import { ChangeEvent, ReactNode, useEffect, useRef, useState } from "react";
import { cn, fileSize, validVideo } from "@/lib/utils";
import { FiLink2 } from "react-icons/fi";
import { IoCodeSharp } from "react-icons/io5";
import { FaArrowRightLong } from "react-icons/fa6";
import { FaGear } from "react-icons/fa6";
import { TiDelete } from "react-icons/ti";
import { Modal } from "@/components/modal/modalTemplate";

export function VideoEdit({
  content,
  updateContentValueState,
}: {
  content: VideoContent;
  updateContentValueState: (newContentState: VideoContent) => void;
}) {
  return (
    <div>
      (video edit)
      <VideoInput
        content={content}
        updateContentValueState={updateContentValueState}
      />
    </div>
  );
}

type InputModes = "File" | "Url" | "Embed";
function VideoInput({
  content,
}: {
  content: VideoContent;
  updateContentValueState: (newContentState: VideoContent) => void;
}) {
  const dropZone = useRef<HTMLDivElement | null>(null);
  const [showAltImport, setShowAltImport] = useState(false);

  const closeAltImport = () => {
    setShowAltImport(false);
  };

  const [video, setVideo] = useState<VideoContentType>({
    mode: "File",
    content: null,
    subtitle: "",
    reference: "",
  });
  const [inputMode, setInputMode] = useState<InputModes>("File");
  const [error, setError] = useState({ error: false, message: "" });

  const inputFileHandler = (e: ChangeEvent<HTMLInputElement> | File) => {
    // console.log(e.target.files[0]);
    let videoFile = null;
    if (!(e instanceof File)) {
      if (!e.target.files) return;
      videoFile = e.target.files[0];
    } else {
      videoFile = e;
    }

    const isValid = validVideo(videoFile);
    if (isValid.error) {
      setError(isValid);
      console.log(isValid);
      return;
    }
    setVideo({ ...video, mode: "File", content: videoFile });
    setError(isValid);
  };

  const fileDropHandler = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    const files = e.dataTransfer.files;
    if (files.length > 1) {
      setError({
        error: true,
        message: "Import Error: Only able to accept 1 video.",
      });
      return;
    }
    inputFileHandler(files[0]);
  };

  useEffect(() => {
    window.addEventListener("dragover", (event) => {
      event.preventDefault();
    });

    window.addEventListener("drop", (event) => {
      event.preventDefault();
    });
  }, []);
  if (video.content !== null) {
    return (
      <VideoFileList
        videoFile={video}
        onUpdateVideoFile={(newVideoFile: VideoContentType) => {
          setVideo({ ...newVideoFile });
        }}
        onClear={() => {
          setVideo({ ...video, mode: "File", content: null });
        }}
      />
    );
  }
  return (
    <>
      <div
        className="bg-card rounded-3xl flex justify-center items-center w-full"
        onDragOver={(e) => {
          e.dataTransfer.dropEffect = "copy";
        }}
        onDrop={(e) => {
          fileDropHandler(e);
        }}
        ref={dropZone}
      >
        <div className="relative  text-center min-w-80 min-h-80  max-w-[42rem] w-full h-fit p-10 border-dashed border-cta border-[2px] rounded-2xl flex flex-col justify-center items-center gap-4">
          <VideoInputType
            type={inputMode}
            file={
              <IoCloudUploadOutline
                className="text-secondary-text duration-0"
                size={30}
              />
            }
            url={
              <FiLink2 className="text-secondary-text duration-0" size={30} />
            }
            embed={
              <IoCodeSharp
                className="text-secondary-text duration-0"
                size={30}
              />
            }
          />

          <div className="text-secondary-text duration-0 text-center">
            <p>
              <VideoInputType
                type={inputMode}
                file={"Choose file or drag and drop here"}
                url={"Copy and paste your URL below"}
                embed={"Copy and paste your Embed below"}
              />
            </p>

            <p className="text-sm text-tertiary-text">
              MOV and MP4 formats up to 1GB or URL and Embed
            </p>
          </div>

          <div
            className="relative flex gap-1"
            onClick={() => {
              if (showAltImport) {
                setShowAltImport(false);
              }
            }}
          >
            <VideoInputType
              type={inputMode}
              file={<VideoFileInput setVideo={inputFileHandler} />}
              embed={
                <VideoEmbedInput
                  setVideo={(newVideo) => {
                    setVideo(newVideo);
                  }}
                />
              }
            />

            <button
              className="bg-cta-card rounded px-2 hover:bg-cta-active-card"
              onClick={() => {
                setShowAltImport(!showAltImport);
              }}
            >
              <FaAngleDown
                className={cn("text-secondary-text transition-transform", {
                  "rotate-180": showAltImport,
                })}
              />
            </button>

            {showAltImport && (
              <div
                className="absolute z-[60]  top-[110%] flex flex-col gap-[2px] w-full rounded"
                onClick={closeAltImport}
              >
                <button
                  className="text-secondary-text text-sm bg-cta-card p-1 rounded-t hover:bg-cta-active-card"
                  onClick={() => {
                    setInputMode("File");
                  }}
                >
                  Browse Files
                </button>

                <button
                  className="text-secondary-text text-sm bg-cta-card p-1 rounded-b hover:bg-cta-active-card"
                  onClick={() => {
                    setInputMode("Embed");
                  }}
                >
                  Embed
                </button>
              </div>
            )}
          </div>
          {error.error && (
            <span className="absolute bottom-10 z-20 text-[#BF4153] text-sm max-w-[80%]">
              <p>* {error.message} unable to import video</p>
            </span>
          )}
        </div>
      </div>
    </>
  );
}

function VideoInputType({
  type,
  file,
  url,
  embed,
}: {
  type: InputModes;
  file?: ReactNode;
  url?: ReactNode;
  embed?: ReactNode;
}) {
  if (type === "File" && file) return file;
  if (type === "Url" && url) return url;
  if (type === "Embed" && embed) return embed;

  return <>invalid</>;
}

function VideoFileInput({
  setVideo,
}: {
  setVideo: (e: ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <>
      <label htmlFor="image-upload" className="hover:cursor-pointer">
        <div className="bg-cta-card hover:bg-cta-active-card text-secondary-text px-5 py-1 rounded">
          <p className="duration-0">Browse File</p>
        </div>
      </label>
      <input
        //   ref={inputRef}
        id="image-upload"
        type="file"
        accept=".mov, .mp4"
        className="hidden"
        onChange={(e) => {
          setVideo(e);
          // handleFileChange(e);
        }}
      />
    </>
  );
}

function VideoEmbedInput({
  setVideo,
}: {
  setVideo: (newVideo: VideoContentType) => void;
}) {
  const [inputValue, setInputValue] = useState<null | string>(null);
  return (
    <div className="flex gap-1">
      <input
        placeholder="enter embed"
        className="border border-code-card bg-text-box text-sm outline-none rounded p-1 min-h-8"
        onChange={(e) => {
          setInputValue(e.target.value);
        }}
        value={inputValue ? inputValue : ""}
      />
      <button
        className="h-full bg-cta-card rounded px-2 hover:bg-cta-active-card"
        onClick={() => {
          setVideo({
            mode: "Embed",
            content: inputValue,
            subtitle: "",
            reference: "",
          });
        }}
        disabled={inputValue ? false : true}
      >
        <FaArrowRightLong className="text-secondary-text" />
      </button>
    </div>
  );
}

function VideoFileList({
  videoFile,
  onUpdateVideoFile,
  onClear,
}: {
  videoFile: VideoContentType;
  onUpdateVideoFile: (newVideoFile: VideoContentType) => void;
  onClear: () => void;
}) {
  return (
    <>
      <div>{/* <VideoFileInput setVideo={setFileVideo} /> */}</div>
      <div className="p-3 c border-2 border-code-card pt-5 rounded-lg w-full">
        {videoFile.content instanceof File && (
          <VideoFileInfo
            videoFile={videoFile}
            onUpdateVideoFile={onUpdateVideoFile}
            onClear={onClear}
          />
        )}
      </div>
    </>
  );
}

function VideoFileInfo({
  videoFile,
  onUpdateVideoFile,
  onClear,
}: {
  videoFile: VideoContentType;
  onUpdateVideoFile: (newVideoFile: VideoContentType) => void;
  onClear: () => void;
}) {
  const [modalState, setModalState] = useState(false);

  if (!(videoFile.content instanceof File)) return <></>;
  return (
    <>
      <div className="flex justify-between bg-code-card p-4 py-2 rounded-xl w-full">
        <div>
          <div className="text-secondary-text duration-0">
            <p>{videoFile.content.name}</p>
          </div>
          <div className="flex gap-4 duration-0 text-tertiary-text font-semibold text-sm">
            <span>size: {fileSize(videoFile.content.size)}</span>
            <span>type: {videoFile.content.type}</span>
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
          <button onClick={onClear}>
            <TiDelete
              size={30}
              className="text-tertiary-text hover:text-[#e85367] duration-0"
            />
          </button>
        </div>
      </div>

      {modalState && (
        <VideoHeaderModal
          videoInfo={videoFile}
          onClose={() => {
            setModalState(false);
          }}
          onUpdateVideo={(header: { subtitle: string; reference: string }) => {
            onUpdateVideoFile({ ...videoFile, ...header });
          }}
        />
      )}
    </>
  );
}

function VideoPreview() {}

function VideoHeaderModal({
  videoInfo,
  onUpdateVideo,
  onClose,
}: {
  videoInfo: VideoContentType;
  onUpdateVideo: (header: { subtitle: string; reference: string }) => void;
  onClose: () => void;
}) {
  if (!videoInfo) return <></>;

  const [header, setHeader] = useState({
    subtitle: videoInfo.subtitle ? videoInfo.subtitle : "",
    reference: videoInfo.reference ? videoInfo.reference : "",
  });

  return (
    <Modal onClose={onClose}>
      <div className="flex flex-col gap-4 items-end">
        <div className="w-80 flex flex-col gap-2">
          <span className="flex flex-col">
            <label className="text-xs text-tertiary-text">subtitle</label>
            <input
              id="title"
              className="h-10 w-full text-secondary-text p-2 outline-none border border-code-card rounded-lg bg-text-box opacity-65 focus:opacity-100 transition-none shadow-inner"
              placeholder="add subtitle..."
              value={header.subtitle}
              onChange={(e) => {
                setHeader({ ...header, subtitle: e.target.value });
              }}
            ></input>
          </span>
          <span className="flex flex-col">
            <label className="text-xs text-tertiary-text">reference</label>
            <input
              id="title"
              className="h-10 w-full text-secondary-text p-2 outline-none border border-code-card rounded-lg bg-text-box opacity-65 focus:opacity-100 transition-none shadow-inner"
              placeholder="add reference..."
              value={header.reference}
              onChange={(e) => {
                setHeader({ ...header, reference: e.target.value });
              }}
            ></input>
          </span>
        </div>
        <div className="flex gap-3">
          <button
            className="text-tertiary-text hover:text-secondary-text hover:underline"
            onClick={onClose}
          >
            cancel
          </button>
          <button
            className="bg-cta-card text-secondary-text px-2 rounded"
            onClick={() => {
              onUpdateVideo(header);
              onClose();
            }}
          >
            save
          </button>
        </div>
      </div>
    </Modal>
  );
}
