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
      {type === "Text" && <TextElement content={content} />}
      <p>
        {JSON.stringify(buildContext?.getElementContent("state")[id].content)}
      </p>
    </div>
  );
}

export function TextElement({ content }: { content: string }) {
  if (!content.replace(/\s/g, "")) {
    return <p className="text-tertiary-text">add text</p>;
  }

  return <p className="text-primary-text">content</p>;
}
