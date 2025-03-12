import { useContext, useEffect, useRef, useState } from "react";
import { BuildContext } from "../buildContext/BuildContext";
import { ElementSelectionContext } from "../buildContext/ElementSelectorContext";
import { fileSize } from "@/lib/utils";
import { VideoElement } from "./elements/ElementVideo";

export function ElementContent({
  type,
  content,
  id,
}: {
  type: "Text" | "Image" | "Video" | "Other";
  content: any;
  id: string;
}) {
  const buildContext = useContext(BuildContext);
  if (!buildContext) return <></>;
  //   const elementSelectionContext = useContext(ElementSelectionContext);

  //   if (!buildContext || !elementSelectionContext) return <></>;

  //   const parentRef = useRef<HTMLElement | null>(null);
  //   const element = useRef<HTMLDivElement | null>(null);
  //   const height = useRef<number | null>(null);
  //   const [contentState, setContentState] = useState(content);

  //   const updateContentState = (newConentState: any) => {
  //     setContentState(newConentState);
  //   };

  //   // setting default values
  //   useEffect(() => {
  //     if (element.current) {
  //       const parent = element.current.parentElement;
  //       if (height !== null && parent) {
  //         parentRef.current = parent;
  //         height.current = parent.getBoundingClientRect().height;
  //       }
  //     }
  //   }, []);

  //   // update viewport (size) if text bubble size has change -> on text change
  //   useEffect(() => {
  //     if (parentRef.current) {
  //       if (parentRef.current.getBoundingClientRect().height !== height.current) {
  //         height.current = parentRef.current.getBoundingClientRect().height;
  //         buildContext.initialRender();
  //         elementSelectionContext.function.updateZones(
  //           buildContext!.getElementList("ref")
  //         );
  //       }
  //     }
  //   }, [contentState]);

  return (
    <div>
      {/* <p>{id}</p>
      <p>
        {JSON.stringify(buildContext.getElementContent("state")[id].content)}
      </p> */}
      {type === "Text" && (
        <TextElement
          content={
            buildContext.getElementContent("state")[id]
              .content as TextContent | null
          }
        />
      )}
      {type === "Image" && (
        <ImageElement
          content={
            buildContext.getElementContent("state")[id]
              .content as ImagesFileObj | null
          }
        />
      )}

      {type === "Video" && (
        <VideoElement
          content={
            buildContext.getElementContent("state")[id]
              .content as VideoContent | null
          }
        />
      )}
      {/* <p>
        {JSON.stringify(buildContext.getElementContent("state")[id].content)}
      </p> */}
    </div>
  );
}

export function TextElement({ content }: { content: string | null }) {
  if (content === null)
    return <p className="text-tertiary-text">add text...</p>;
  if (!content.replace(/\s/g, "")) {
    return <p className="text-tertiary-text">add text</p>;
  }

  return (
    <div className="flex flex-col">
      <p className="text-tertiary-text text-sm">(text element)</p>
      <p className="text-secondary-text">{content}</p>
    </div>
  );
}

function ImageElement({ content }: { content: ImagesFileObj | null }) {
  if (content === null)
    return <p className="text-tertiary-text">add image...</p>;

  const contentArray = Object.keys(content);
  return (
    <div className="flex flex-col gap-2">
      <p className="text-tertiary-text text-sm">
        (image element) [{contentArray.length}]
      </p>

      <div className="flex flex-col gap-3">
        {contentArray.slice(0, 2).map((key, index) => {
          return <ImageElementView key={index} content={content[key]} />;
        })}
        {contentArray.length > 2 && (
          <div className="flex items-center gap-2">
            <span className="h-[1px] w-full bg-cta-active"></span>
            <p className="whitespace-nowrap text-xs text-tertiary-text">
              {contentArray.length - 2} more
            </p>
            <span className="h-[1px] w-full bg-cta-active"></span>
          </div>
        )}
        {/* <ImageElementView content={content} /> */}
      </div>
      {/* {JSON.stringify(content)} */}
    </div>
  );
}

function ImageElementView({ content }: { content: ImageFile }) {
  return (
    <div className="flex flex-col bg-cta-card rounded p-4 py-2">
      <div className="text-secondary-text duration-0">
        <p>{content.file.name}</p>
      </div>
      <div className="flex gap-4 text-sm font-semibold text-tertiary-text duration-0">
        <span className="duration-0">
          <p>size: {fileSize(content.file.size)}</p>
        </span>
        <span className="duration-0">
          <p>type: {content.file.type}</p>
        </span>
      </div>
    </div>
  );
}
