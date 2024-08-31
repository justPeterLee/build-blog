"use client";

import { useContext, useEffect, useRef } from "react";
import ElementSelection from "./ElementSelection";
import { AnimationElement, InsertHereLine } from "./Element";
import { animated } from "@react-spring/web";

import {
  BuildContext,
  BuildContextProvider,
} from "./buildContext/BuildContext";
import {
  ElementSelectionContext,
  ElementSelectionContextProvider,
} from "./buildContext/ElementSelectorContext";

export default function ViewPort() {
  return (
    <BuildContextProvider>
      <ElementSelectionContextProvider>
        <div className="w-full relative">
          <JsxViewPort />
        </div>
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
    buildContext.initialRender();
    elementSelectionContext.function.updateZones(
      buildContext.getElementList("ref")
    );
  }, [buildContext.getElementList("state")]);

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
                    style={{}}
                    addSpring={buildContext.insertFunc.addSpringInstance}
                  />
                );
              return (
                <AnimationElement
                  key={element.id}
                  id={element.id}
                  type={element.component}
                  style={{ y: 10 }}
                  addSpring={buildContext.insertFunc.addSpringInstance}
                />
              );
            })}
          </animated.div>
        </div>
      </div>
    </>
  );
}
