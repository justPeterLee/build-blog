"use client";
import { MarkdownRender } from "@/components/blog/MarkdownRender";
import { useContext, useEffect, useRef, useState } from "react";
import { BuildContext } from "../buildContext/BuildContext";
import { ElementSelectionContext } from "../buildContext/ElementSelectorContext";
import { CodeInput } from "@/components/pageComponents/buildComponents/code/CodeSnippet";

export function ElementText({
  content,
  id,
  focus,
  setStopMovement,
  initialRender,
  reset,
}: {
  content: string;
  id: string;
  focus: boolean;
  setStopMovement: (bool: boolean) => void;
  initialRender: () => void;
  reset: () => void;
}) {
  const buildContext = useContext(BuildContext);
  const elementSelectionContext = useContext(ElementSelectionContext);

  if (!buildContext || !elementSelectionContext) return <></>;

  const parentRef = useRef<HTMLElement | null>(null);
  const element = useRef<HTMLTextAreaElement | null>(null);
  const height = useRef<number | null>(null);
  const [contentState, setContentState] = useState(content);

  // setting default values
  useEffect(() => {
    if (element.current) {
      const parent = element.current.parentElement;
      if (height !== null && parent) {
        parentRef.current = parent;
        height.current = parent.getBoundingClientRect().height;
      }
    }
  }, []);

  // update viewport (size) if text bubble size has change -> on text change
  useEffect(() => {
    if (parentRef.current) {
      if (parentRef.current.getBoundingClientRect().height !== height.current) {
        height.current = parentRef.current.getBoundingClientRect().height;
        initialRender();
        elementSelectionContext.function.updateZones(
          buildContext!.getElementList("ref")
        );
      }
    }
  }, [contentState]);

  return (
    <>
      <textarea
        ref={element}
        className="resize-none bg-transparent  w-full pointer-events-none outline-none"
        placeholder="add text"
        value={contentState}
        onChange={(e) => {
          console.log("change");
          setContentState(e.target.value);
        }}
        // onFocus={() => {
        //   setStopMovement(true);
        // }}
        // onBlur={() => {
        //   console.log("stop");
        //   setStopMovement(false);
        // }}
      />
    </>
  );
}
