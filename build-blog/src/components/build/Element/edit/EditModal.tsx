import { Modal } from "@/components/modal/modalTemplate";
import { useContext, useEffect, useState } from "react";
import { BuildContext } from "../../buildContext/BuildContext";
import { TextEdit } from "./TextEdit";

export default function EditModal({
  content,
  values,
  onClose,
  editElement,
}: {
  content: any;
  values: { type: string };
  onClose: () => void;
  editElement: (newContent: any) => {
    status: boolean;
    error: string;
  };
}) {
  const [contentValue, setContentValue] = useState(content);

  const [error, setError] = useState<
    undefined | { status: boolean; error: string }
  >();

  const editElementErrorCheck = (newContent: any) => {
    const response = editElement(newContent);

    if (!response.status) {
      setError(response);
      return;
    }

    onClose();
  };

  const [hasUnsavedContent, setHasUnsavedContent] = useState(false);

  const editUnsavedContent = () => {
    if (contentValue !== content) {
      setHasUnsavedContent(true);
    } else {
      onClose();
    }
  };

  const updateContentValueState = (newContentState: any) => {
    setContentValue(newContentState);
  };

  useEffect(() => {
    console.log("test");
  }, []);
  return (
    <Modal onClose={editUnsavedContent}>
      <div id="edit-modal-content">
        <EditModalContent
          type={values.type}
          contentState={contentValue}
          updateContentValueState={updateContentValueState}
        />
      </div>
      <div id="edit-modal-action" className="mt-4 flex justify-end">
        <div className="flex  gap-3">
          <button
            className="text-tertiary-text hover:text-secondary-text hover:underline"
            onClick={editUnsavedContent}
          >
            cancel
          </button>
          <button
            className="bg-cta-card text-secondary-text px-2 rounded"
            onClick={() => {
              editElementErrorCheck(contentValue);
            }}
          >
            update
          </button>
        </div>
      </div>

      {/* <p>{JSON.stringify(contentValue)}</p> */}
      {error && <p className="text-sm text-red-600">* {error.error}</p>}

      {hasUnsavedContent && (
        <UnsavedContent
          onClose={() => {
            setHasUnsavedContent(false);
          }}
          closeAll={onClose}
        />
      )}
    </Modal>
  );
}

function UnsavedContent({
  onClose,
  closeAll,
}: {
  onClose: () => void;
  closeAll: () => void;
}) {
  return (
    <Modal onClose={onClose}>
      <div className="text-secondary-text">
        Are you sure you want to cancle? <br />
        All changes will be undone.
      </div>
      <button onClick={closeAll} className="text-red-600">
        delete changes
      </button>
    </Modal>
  );
}

function EditModalContent({
  type,
  contentState,
  updateContentValueState,
}: {
  type: elementTypes | string;
  contentState: any;
  updateContentValueState: (newContentValueState: any) => void;
}) {
  const EditModalContentType = () => {
    if (type === "Text")
      return (
        <TextEdit
          content={contentState}
          updateContentValueState={updateContentValueState}
        />
      );
    if (type === "Image") return <>image</>;
    if (type === "Video") return <>video</>;
    return <>null</>;
  };
  return (
    <>
      <div>{EditModalContentType()}</div>
    </>
  );
}
