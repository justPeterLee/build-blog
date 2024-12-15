import { Modal } from "@/components/modal/modalTemplate";
import { ImageInput } from "@/components/pageComponents/buildComponents/fileInput/imageInput";
import { useState } from "react";

export function ImageEdit({
  content,
  updateContentValueState,
}: {
  content: ImageContent;
  updateContentValueState: (newContentState: ImageContent) => void;
}) {
  return (
    <div>
      <p className="text-secondary-text mb-1">(image edit)</p>
      <ImageInput
        content={content}
        updateContentValueState={updateContentValueState}
      />
    </div>
  );
}

export function ImageHeaderModal({
  imageInfo,
  onUpdateImage,
  onClose,
}: {
  imageInfo: ImageFileOrder;
  onUpdateImage: (header: { subtitle: string; link: string }) => void;
  onClose: () => void;
}) {
  const [header, setHeader] = useState({
    subtitle: imageInfo.subtitle ? imageInfo.subtitle : "",
    link: imageInfo.reference ? imageInfo.reference : "",
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
            <label className="text-xs text-tertiary-text">link</label>
            <input
              id="title"
              className="h-10 w-full text-secondary-text p-2 outline-none border border-code-card rounded-lg bg-text-box opacity-65 focus:opacity-100 transition-none shadow-inner"
              placeholder="add link..."
              value={header.link}
              onChange={(e) => {
                setHeader({ ...header, link: e.target.value });
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
              onUpdateImage(header);
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
