import { useContext, useState } from "react";
import { BuildContext } from "../buildContext/BuildContext";
import { Modal } from "@/components/modal/modalTemplate";
import { cn } from "@/lib/utils";
import EditModal from "../Element/edit/EditModal";

export function Inspector() {
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const buildContext = useContext(BuildContext);
  if (!buildContext) return <></>;
  if (!buildContext.focus.value()) return <></>;

  const elementId = buildContext.focus.value()!.id;
  const elementValues = buildContext.getElementValues(elementId);

  const editElement = (newContent: any) => {
    return buildContext.updateElementContent(
      buildContext.focus.value()!.id,
      newContent
    );
  };
  return (
    // right -> viewport padding + inspector width + offset (1rem)
    <>
      <div className="bg-card w-[12rem] z-30 absolute -right-[1rem] translate-x-[110%] -top-[1rem] rounded-lg p-2 flex flex-col gap-2">
        <span className="flex flex-col">
          <p className="text-sm text-tertiary-text">component id:</p>
          <p className="text-primary-text">{elementId}</p>
        </span>
        <span>
          <p className="text-sm text-tertiary-text">type:</p>
          <p className="text-primary-text">
            {elementValues ? elementValues.type : "null"}
          </p>
        </span>

        <span className="flex flex-col text-primary-text duration-0 gap-2">
          <button
            className="bg-cta-card p-1 rounded text-secondary-text text-center"
            onClick={() => {
              setShowEditModal(true);
            }}
          >
            edit
          </button>
          <button
            className={cn(
              "text-red-600 border border-transparent hover:border-red-600 rounded",
              {
                "bg-red-600 text-white": showDeleteModal,
              }
            )}
            onClick={() => {
              setShowDeleteModal(true);
            }}
          >
            delete
          </button>
        </span>
      </div>

      {showDeleteModal && (
        <Modal
          onClose={() => {
            setShowDeleteModal(false);
          }}
        >
          <div className="flex flex-col gap-4 items-end">
            <p>Are you sure you want to delete this element?</p>
            {/* <p></p> */}

            <span className="flex gap-4">
              <button
                className="bg-cta-card px-2 py-1 rounded text-secondary-text"
                onClick={() => {
                  setShowDeleteModal(false);
                }}
              >
                cancel
              </button>
              <button
                className="text-red-600 px-2 border border-transparent hover:border-red-600 rounded"
                onClick={() => {
                  setShowDeleteModal(false);
                  buildContext.deleteElement(buildContext.focus.value()!.id);
                  buildContext.focus.onBlur();
                }}
              >
                yes
              </button>
            </span>
          </div>
        </Modal>
      )}

      {showEditModal && elementValues && (
        <EditModal
          content={
            buildContext.getElementContent("state")[
              buildContext.focus.value()!.id
            ].content
          }
          values={elementValues}
          onClose={() => {
            setShowEditModal(false);
          }}
          editElement={editElement}
        />
      )}
    </>
  );
}
