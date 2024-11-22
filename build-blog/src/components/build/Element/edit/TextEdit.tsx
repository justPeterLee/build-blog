import {
  MarkdownRender,
  TextOnlyRender,
} from "@/components/blog/MarkdownRender";
import { useState } from "react";

export function TextEdit({
  content,
  updateContentValueState,
}: {
  content: string | null;
  updateContentValueState: (newContentValueState: any) => void;
}) {
  const [showLivePreview, setShowLivePreview] = useState(false);
  return (
    <div className="flex flex-col gap-4">
      <div>
        <div className="flex justify-between items-end">
          text edit
          <button
            className="text-sm text-tertiary-text hover:text-secondary-text"
            onClick={() => {
              setShowLivePreview(!showLivePreview);
            }}
          >
            {showLivePreview ? "hide" : "show"} preview
          </button>
        </div>

        {/* text editor */}

        <div className="flex-col flex gap-0">
          <textarea
            className="resize-none outline-none m-0 p-2 w-[42rem] min-h-[5rem] border border-black-100"
            placeholder="add text (markdown format) "
            value={content ? content : ""}
            onChange={(e) => {
              updateContentValueState(e.target.value);
            }}
          ></textarea>
          <div>
            <a
              href="https://www.markdownguide.org/cheat-sheet/"
              target="_blank"
              className="text-xs text-tertiary-text p-0 m-0"
            >
              md format ref
            </a>
          </div>
        </div>
      </div>

      {/* preview */}
      {showLivePreview && (
        <div className="flex flex-col gap-0">
          <p>preview :</p>
          <div className="post">
            <TextOnlyRender>{content ? content : ""}</TextOnlyRender>
          </div>
        </div>
      )}
    </div>
  );
}
