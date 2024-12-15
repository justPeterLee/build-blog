import { ChangeEvent, useEffect, useMemo, useRef, useState } from "react";
import { IoCloudUploadOutline } from "react-icons/io5";
import {
  changeImageOrder,
  cn,
  imageCarouselOrder,
  removeImage,
  updateImageHeader,
  validMultipleImages,
} from "@/lib/utils";
import { FileList } from "../build";
import { Modal } from "@/components/modal/modalTemplate";

export function ImageInput({
  content,
  updateContentValueState,
}: {
  content: ImagesFileObj | null;
  updateContentValueState: (newContentState: ImageContent) => void;
}) {
  const dropZone = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const [fileObj, setFileObj] = useState<ImagesFileObj>(content ? content : {});

  const [error, setError] = useState<{
    error: boolean;
    fileError: { file: File; message: string }[];
  }>({ error: false, fileError: [] });

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

    if (files && files.length) {
      const isValid = validMultipleImages(files, fileObj);
      if (isValid.error.error) {
        setError(isValid.error);
        console.log(error.fileError);
        return;
      }

      updateContentValueState(isValid.fileObj);
      setFileObj(isValid.fileObj);
      setError(isValid.error);
    }
  };

  const handleFileDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    const files = e.dataTransfer.files;
    if (files.length) {
      const isValid = validMultipleImages(files, fileObj);
      if (isValid.error.error) {
        setError(isValid.error);
        console.log(error.fileError);
        return;
      }
      updateContentValueState(isValid.fileObj);
      setFileObj(isValid.fileObj);
      setError(isValid.error);
    }
  };

  const removeFile = (id: string) => {
    const filteredFileObj = removeImage(fileObj, id);
    updateContentValueState(filteredFileObj);
    setFileObj(() => {
      return { ...filteredFileObj };
    });
  };

  const changeOrder = (
    dir: boolean,
    curPosition: number,
    orderObj: ImagesFileOrderObj
  ) => {
    if (
      (dir && curPosition <= 0) ||
      (!dir && curPosition + 1 >= Object.keys(orderObj).length)
    ) {
      return;
    }
    const newFileObj = changeImageOrder(dir, curPosition, orderObj, fileObj);
    updateContentValueState(newFileObj);
    setFileObj(() => {
      return { ...newFileObj };
    });
  };

  const updateFileHeader = (
    imageId: string,
    header: { subtitle: string; link: string }
  ) => {
    const newFileObj = updateImageHeader(imageId, header, fileObj);
    updateContentValueState(newFileObj);
    setFileObj(() => {
      return { ...newFileObj };
    });
  };

  if (Object.keys(fileObj).length) {
    return (
      <div className="flex flex-col gap-2 relative">
        {error.error && (
          <span className="absolute -top-5 right-0 z-20 text-[#BF4153] text-sm max-w-[80%]">
            <p>
              * File Error: Unable to to import ({error.fileError.length}){" "}
              {error.fileError.length > 1 ? "files" : "file"}
            </p>
          </span>
        )}

        <label htmlFor="add-file" className="hover:cursor-pointer">
          <div className="w-full flex justify-center items-center gap-1 border-2 border-cta p-[6px] px-4 rounded-xl text-tertiary-text hover:bg-cta hover:text-white">
            <p className="duration-0">Add File</p>
          </div>
        </label>

        <input
          id="add-file"
          type="file"
          accept=".png, .jpg, .jpeg, .gif .webp"
          className="hidden"
          onChange={(e) => {
            handleFileChange(e);
          }}
          multiple
        />

        <ImagePreview
          files={fileObj}
          onRemoveImage={removeFile}
          onChangeOrder={changeOrder}
          onUpdateImage={updateFileHeader}
        />
      </div>
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
      className="bg-card rounded-3xl flex justify-center items-center w-full"
    >
      {/* {JSON.stringify(fileObj)} */}
      <div className="relative  text-center min-w-80 min-h-80  max-w-[42rem] w-full h-fit p-10 border-dashed border-cta border-[2px] rounded-2xl flex flex-col justify-center items-center gap-4">
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
          accept=".png, .jpg, .jpeg, .gif .webp"
          className="hidden"
          onChange={(e) => {
            handleFileChange(e);
          }}
          multiple
        />
        {error.error && (
          <span className="absolute bottom-10 z-20 text-[#BF4153] text-sm max-w-[80%]">
            <p>
              * File Error: Unable to to import ({error.fileError.length}){" "}
              {error.fileError.length > 1 ? "files" : "file"}
            </p>
          </span>
        )}
      </div>
    </div>
  );
}

export function ImagePreview({
  files,
  onUpdateImage,
  onChangeOrder,
  onRemoveImage,
}: {
  files: ImagesFileObj;
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
  const [showPreview, setShowPreview] = useState(false);
  const [imageFocusIndex, setImageFocusIndex] = useState(0);

  const images = useMemo(() => {
    return imageCarouselOrder(files);
  }, [files]);

  return (
    <div className="flex-col bg-card rounded-xl flex justify-center items-center gap-1">
      <FileList
        files={images}
        imageFocusIndex={imageFocusIndex}
        onUpdateImage={onUpdateImage}
        onChangeOrder={onChangeOrder}
        onRemoveImage={onRemoveImage}
      />
      <div className=" w-full flex ">
        <button
          className="text-xs text-tertiary-text"
          onClick={() => {
            setShowPreview(!showPreview);
          }}
        >
          {showPreview ? "hide" : "show"} preview
        </button>
      </div>
      {showPreview && (
        <ImageCarousel
          files={images}
          imageFocusIndex={imageFocusIndex}
          setImageFocusIndex={(index: number) => {
            setImageFocusIndex(index);
          }}
        />
      )}
    </div>
  );
}

export function ImageCarousel({
  files,
  imageFocusIndex,
  setImageFocusIndex,
}: {
  files: {
    obj: ImagesFileOrderObj;
    array: ImageFileOrder[];
  };
  imageFocusIndex: number;
  setImageFocusIndex: (index: number) => void;
}) {
  const imageFocus = files.array[imageFocusIndex];

  const scrollImage = (dir: boolean) => {
    const dirValue = dir ? 1 : -1;
    const newImageIndex = imageFocusIndex + dirValue;
    const min = 0;
    const max = files.array.length - 1;
    if (newImageIndex <= min) {
      setImageFocusIndex(0);
      return;
    }
    if (newImageIndex >= max) {
      setImageFocusIndex(max);
      return;
    }

    setImageFocusIndex(newImageIndex);
  };

  useEffect(() => {
    if (!imageFocus) {
      setImageFocusIndex(files.array.length - 1);
    }
  }, [files, imageFocusIndex]);
  if (!imageFocus) {
    return (
      <div className="relative w-[40rem] h-[20rem] bg-cta shadow-inner p-2 rounded-md flex justify-center items-center">
        <p>loading...</p>
      </div>
    );
  }

  return (
    <>
      <div className="m-auto my-5 relative">
        <div className=" text-xs text-secondary-text duration-0 flex justify-between absolute -top-5 w-full">
          {imageFocus.subtitle && (
            <span className="text-xs text-secondary-text">
              {imageFocus.subtitle}
            </span>
          )}
          {imageFocus.reference && (
            <a href={imageFocus.reference} target="_blank">
              ref
            </a>
          )}
        </div>

        {files.array.length <= 1 ? (
          <ImageView fileInfo={files.obj[0]} isSingle={true} />
        ) : (
          <>
            <div className="relative w-[42rem] h-[22rem] bg-cta shadow-inner p-2 rounded-md flex justify-center items-center">
              <ImageView fileInfo={imageFocus} />
            </div>

            <div className="mt-1 text-xs text-secondary-text duration-0 flex justify-between">
              <span className="text-xs text-secondary-text">
                Photo: {imageFocusIndex + 1}/{files.array.length}
              </span>
              <span className="flex gap-2">
                <button
                  className="text-xs text-secondary-text underline hover:text-primary-text transition-none"
                  onClick={() => {
                    scrollImage(false);
                  }}
                >
                  prev
                </button>
                <p>|</p>
                <button
                  className="text-xs text-secondary-text underline hover:text-primary-text transition-none"
                  onClick={() => {
                    scrollImage(true);
                  }}
                >
                  next
                </button>
              </span>
            </div>
          </>
        )}
      </div>
    </>
  );
}

export function ImageView({
  fileInfo,
  isSingle = false,
}: {
  fileInfo: ImageFileOrder | ImageFile;
  isSingle?: boolean;
}) {
  const imageUrl = URL.createObjectURL(fileInfo.file);
  const [fullScreen, setFullScreen] = useState(false);

  return (
    <>
      {fullScreen && (
        <Modal
          onClose={() => {
            setFullScreen(false);
          }}
          modalClassName="w-auto max-w-[75rem] max-h-[80%] overflow-auto flex justify-center items-center"
        >
          <div className="m-auto">
            <img
              src={imageUrl}
              alt={fileInfo.file.name}
              className="w-auto h-auto"
            />
            {fileInfo.subtitle && (
              <h3 className="text-secondary-text mt-4">{fileInfo.subtitle}</h3>
            )}
          </div>
        </Modal>
      )}
      <img
        src={imageUrl}
        alt={fileInfo.file.name}
        className={cn(
          "max-w-[41rem] max-h-[21rem] hover:cursor-pointer bg-card rounded-md  hover:brightness-75 transition-all",
          { "max-w-[42rem] max-h-[22rem]": isSingle }
        )}
        onClick={() => {
          console.log("clicked");
          setFullScreen(true);
        }}
      />
    </>
  );
}
