import { useContext, useEffect, useRef, useState } from "react";
import { BuildContext } from "../buildContext/BuildContext";
import { ElementSelectionContext } from "../buildContext/ElementSelectorContext";

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
            buildContext.getElementContent("state")[id].content as string | null
          }
        />
      )}
      {type === "Image" && <ImageElement content={null} />}
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

  return <p className="text-secondary-text">{content}</p>;
}

function ImageElement({
  content,
}: {
  content: {
    file: File;
    alt: string;
    height?: number;
    width?: number;
    subTitle?: string;
    reference?: string;
  } | null;
}) {
  if (content === null)
    return <p className="text-tertiary-text">add image...</p>;

  const imageUrl = URL.createObjectURL(content.file);
  return (
    <div>
      <img
        src={imageUrl}
        alt={content.alt}
        className="w-auto h-auto max-w-[42rem] min-w-80 rounded-lg shadow hover:cursor-pointer"
        style={{
          width: content.width ? content.width : "",
          height: content.height ? content.height : "",
        }}
      />
      <div className="mt-1 text-xs text-secondary-text duration-0 flex justify-between">
        <span className="text-xs text-secondary-text">{content.subTitle}</span>
        {content.reference && (
          <a href={content.reference} target="_blank">
            ref
          </a>
        )}
      </div>
    </div>
  );
}
