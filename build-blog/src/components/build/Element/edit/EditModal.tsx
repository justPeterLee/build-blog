import { Modal } from "@/components/modal/modalTemplate";
import { useContext, useState } from "react";
import { BuildContext } from "../../buildContext/BuildContext";

export default function EditModal({
  content,
  onClose,
  editElement,
}: {
  content: any;
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
  return (
    <Modal onClose={editUnsavedContent}>
      <div className="text-primary-text">edit</div>
      <p>{contentValue}</p>
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
