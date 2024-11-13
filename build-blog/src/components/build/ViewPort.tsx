"use client";

import { useContext, useEffect, useRef } from "react";
import ElementSelection from "./ElementSelection";
import { AnimationElement, InsertHereLine } from "./Element/Element";
import { animated } from "@react-spring/web";

import {
  BuildContext,
  BuildContextProvider,
} from "./buildContext/BuildContext";
import {
  ElementSelectionContext,
  ElementSelectionContextProvider,
} from "./buildContext/ElementSelectorContext";
import { Inspector } from "./Inspector/Inspector";

export default function ViewPort() {
  return (
    <BuildContextProvider>
      <ElementSelectionContextProvider>
        <FocusBackdrop />
        <article className="w-[42rem] flex-grow flex flex-col justify-center items-center m-auto">
          <div className="w-full relative">
            <JsxViewPort />
          </div>
        </article>
      </ElementSelectionContextProvider>
    </BuildContextProvider>
  );
}

function JsxViewPort() {
  const buildContext = useContext(BuildContext);
  const elementSelectionContext = useContext(ElementSelectionContext);
  if (buildContext === undefined || elementSelectionContext === undefined)
    return <>failed to loads</>;

  useEffect(() => {
    // console.log(buildContext.getElementContent("state"));
    buildContext.initialRender();
    elementSelectionContext.function.updateZones(
      buildContext.getElementList("ref")
    );
  }, [
    buildContext.getElementList("state"),
    buildContext.getElementContent("state"),
  ]);

  return (
    <>
      <animated.div
        style={buildContext.viewPortSpring}
        id="viewPort-view"
        className="w-full h-[10rem] absolute origin-top rounded bg-cta-active"
      ></animated.div>
      <div
        id="jsxViewPort"
        className="w-full h-[10rem]  min-h-40 p-4 rounded-xl"
      >
        <div className="w-full h-full flex flex-col items-center relative">
          <ElementSelection />

          <animated.div
            id="viewPort"
            className="w-full h-[10rem] flex flex-col gap-3 origin-top"
          >
            {buildContext.getElementList("state").map((element, index) => {
              if (element.id === "insert-here")
                return (
                  <InsertHereLine
                    key={element.id}
                    addSpring={buildContext.insertFunc.addSpringInstance}
                  />
                );
              return (
                <AnimationElement
                  key={element.id}
                  elementData={element}
                  addSpring={buildContext.insertFunc.addSpringInstance}
                />
              );
            })}
          </animated.div>

          <Inspector />
        </div>
      </div>
    </>
  );
}

export function FocusBackdrop() {
  const buildContext = useContext(BuildContext);
  if (!buildContext) return <></>;
  return (
    <div
      className="fixed top-0 h-screen w-full z-10 "
      onClick={() => {
        buildContext.focus.onBlur();
        // console.log("blura");
      }}
    ></div>
  );
}
