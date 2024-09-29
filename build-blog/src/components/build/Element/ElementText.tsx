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
  useEffect(() => {
    if (element.current) {
      const parent = element.current.parentElement;
      if (height !== null && parent) {
        parentRef.current = parent;
        height.current = parent.getBoundingClientRect().height;
      }
    }
  }, []);

  useEffect(() => {
    if (parentRef.current) {
      if (parentRef.current.getBoundingClientRect().height !== height.current) {
        height.current = parentRef.current.getBoundingClientRect().height;
        console.log("test");
        // console.log(initialRender);
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
        // style={{
        //   cursor:
        //     buildContext.getMode() === "point"
        //       ? "pointer"
        //       : buildContext.getMode() === "drag"
        //       ? "grabbing"
        //       : "default",
        // }}
        style={{
          pointerEvents:
            buildContext.focus.value()?.id === id && focus ? "auto" : "none",
        }}
        className="resize-none bg-transparent  w-full pointer-events-none outline-none"
        placeholder="add text"
        value={contentState}
        onChange={(e) => {
          console.log("change");
          setContentState(e.target.value);
        }}
        onFocus={() => {
          setStopMovement(true);
        }}
        onBlur={() => {
          console.log("stop");
          setStopMovement(false);
        }}
      />
      {/* <CodeInput /> */}
      {/* <MarkdownRender build={true}>{contentState}</MarkdownRender> */}
      {/* {focus && <p>{focus.id}</p>} */}
      {/* <p>{buildContext.focus.value()?.id}</p> */}
    </>
  );
}
