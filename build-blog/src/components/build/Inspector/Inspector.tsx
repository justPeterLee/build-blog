import { useContext, useState } from "react";
import { BuildContext } from "../buildContext/BuildContext";
import { Modal } from "@/components/modal/modalTemplate";

export function Inspector() {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const buildContext = useContext(BuildContext);
  if (!buildContext) return <></>;
  if (!buildContext.focus.value()) return <></>;

  return (
    // right -> viewport padding + inspector width + offset (1rem)
    <>
      <div className="bg-card w-[12rem] z-30 absolute -right-[14rem] -top-[1rem] rounded-lg p-2 flex flex-col gap-2">
        <span className="flex flex-col">
          <p className="text-sm text-tertiary-text">component id:</p>
          <p className="text-primary-text">{buildContext.focus.value()!.id}</p>
        </span>
        <span>
          <p className="text-sm text-tertiary-text">type:</p>
          <p className="text-primary-text">text</p>
        </span>

        <span className="flex flex-col text-primary-text duration-0 gap-2">
          <button className="bg-cta-card p-1 rounded text-secondary-text text-center">
            preview
          </button>
          <button
            className="text-red-600"
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
          <div className="flex flex-col gap-2 items-end">
            <p>are you sure you want to delete this element?</p>
            {/* <p></p> */}

            <span className="flex gap-4">
              <button
                className="bg-cta-card p-1 rounded text-secondary-text"
                onClick={() => {
                  setShowDeleteModal(false);
                }}
              >
                cancel
              </button>
              <button
                className="text-red-600 p-1"
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
    </>
  );
}
