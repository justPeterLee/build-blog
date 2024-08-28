"use client";

import { useContext, useEffect } from "react";
import ElementSelection from "./ElementSelection";
import { AnimationElement, InsertHereLine } from "./Element";
import { animated } from "@react-spring/web";

import {
  BuildContext,
  BuildContextProvider,
} from "./buildContext/BuildContext";

export default function ViewPort() {
  return (
    <BuildContextProvider>
      <div className="w-full relative">
        <JsxViewPort />
      </div>
    </BuildContextProvider>
  );
}

function JsxViewPort() {
  const buildContext = useContext(BuildContext);
  if (buildContext === undefined) return <>failed to loads</>;

  useEffect(() => {
    console.log("rerender viewport");
    buildContext.initialRender();
  }, [buildContext.getElementList("state")]);

  return (
    <>
      <button
        onClick={() => {
          buildContext.initialRender();
        }}
      >
        click
      </button>
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
                    key={index}
                    style={{}}
                    addSpring={buildContext.insertFunc.addSpringInstance}
                  />
                );
              return (
                <AnimationElement
                  key={index}
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
