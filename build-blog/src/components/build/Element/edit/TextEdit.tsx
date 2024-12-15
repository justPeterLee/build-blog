import {
  MarkdownRender,
  TextOnlyRender,
} from "@/components/blog/MarkdownRender";
import { useState } from "react";

export function TextEdit({
  content,
  updateContentValueState,
}: {
  content: TextContent;
  updateContentValueState: (newContentValueState: any) => void;
}) {
  const [showLivePreview, setShowLivePreview] = useState(false);
  return (
    <div className="flex flex-col gap-12">
      {/* {JSON.stringify(content)} */}
      <div>
        <div className="flex justify-between items-end mb-1">
          <p className="text-secondary-text">(text edit)</p>
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

        <div className="flex-col flex gap-0 relative">
          <textarea
            className="resize-none outline-none m-0 p-2 w-[42rem] min-h-[5rem] border border-code-card rounded-lg bg-text-box opacity-65 focus:opacity-100   transition-none"
            placeholder="add text (markdown format) "
            value={content ? content : ""}
            onChange={(e) => {
              updateContentValueState(e.target.value);
            }}
          ></textarea>

          <a
            href="https://www.markdownguide.org/cheat-sheet/"
            target="_blank"
            className="text-xs text-tertiary-text absolute -bottom-4"
          >
            md format ref
          </a>
        </div>
      </div>

      {/* preview */}
      {showLivePreview && (
        <div className="flex flex-col gap-0 relative">
          <p className="text-secondary-text absolute -top-[18px]">preview :</p>
          <div className="post">
            <TextOnlyRender>{content ? content : ""}</TextOnlyRender>
          </div>
        </div>
      )}
    </div>
  );
}
