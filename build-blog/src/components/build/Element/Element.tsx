import { animated, useSpring } from "@react-spring/web";
import { useContext, useEffect, useRef, useState } from "react";
import { BuildContext, ElementSpringType } from "../buildContext/BuildContext";
import { useDrag } from "@use-gesture/react";
import { ElementSelectionContext } from "../buildContext/ElementSelectorContext";
import { initialNewRender, insertElement } from "@/lib/buildUtils/build-utils";
import { ElementText } from "./ElementText";
import { ElementContent } from "./ElementContent";

export function InsertHereLine({
  addSpring,
}: {
  addSpring: (
    id: string,
    spring: ElementSpringType,
    updateYPos: (newYPos: number) => void,
    getYPos: () => number
  ) => void;
}) {
  const yPos = useRef(0);

  const updateYPos = (newYPos: number) => {
    yPos.current = newYPos;
  };

  const getYPos = () => yPos.current;
  const [spring, api] = useSpring(() => ({
    y: 0,
    opacity: 1,
    zIndex: 0,
    shadow: 0,
    scale: 1,
  }));

  useEffect(() => {
    addSpring("insert-here", api, updateYPos, getYPos);
  }, []);
  return (
    <animated.div
      style={spring}
      id="insert-here"
      className="w-full flex justify-between items-center gap-1 text-primary-text duration-0 absolute select-none"
    >
      <b>&lt;</b>
      <div className="bg-primary-text flex-grow h-[1px]"></div>
      <p className="text-sm italic">insert here</p>
      <div className="bg-primary-text flex-grow h-[1px]"></div>
      <b>&gt;</b>
    </animated.div>
  );
}

export function AnimationElement({
  elementData,
  addSpring,
}: {
  elementData: JsxElementList;
  addSpring: (
    id: string,
    spring: ElementSpringType,
    updateYPos: (newYPos: number) => void,
    getYPos: () => number
  ) => void;
}) {
  const buildContext = useContext(BuildContext);
  const elementSelectionContext = useContext(ElementSelectionContext);

  if (elementSelectionContext === undefined || buildContext === undefined)
    return <></>;
  const element = useRef<HTMLDivElement | null>(null);
  const yPos = useRef(0);
  const currentYPos = useRef(0);
  const initial = useRef(false);
  const initialRender = useRef(false);

  const prevMid = useRef<number | null>(null);
  const currMid = useRef<number | null>(null);

  const moveRef = useRef<number | null>(null);

  const focusRef = useRef<boolean>(false);

  const [spring, api] = useSpring(() => ({
    y: yPos.current,
    zIndex: 10,
    opacity: 1,
    scale: 1,
    shadow: 1,
    immediate: false,
  }));

  const updateYPos = (newYPos: number) => {
    yPos.current = newYPos;
  };

  const getYPos = () => {
    return yPos.current;
  };

  const getMidRange = (pos: DOMRect) => {
    prevMid.current = currMid.current;
    currMid.current = Math.round(pos.top + pos.height / 2);
  };

  const updateMode = () => {
    console.log("update");
    elementSelectionContext.function.setMode("drag");
    buildContext.focus.onFocus("", () => {});
  };
  const isDrag = useRef(false);

  const stopMovement = useRef(false);
  const setStopMovement = (bool: boolean) => {
    stopMovement.current = bool;
  };

  const bind = useDrag(({ movement: [_, my], down }) => {
    // if(focusRef.current && buildContext.focus.value()){
    //   if(fo)
    // }
    // if (currentFocus) return;

    if (elementSelectionContext.getMode() === "active") return;

    if (element.current && !stopMovement.current) {
      const refElement = element.current;
      if (my > 10 || my < -10) {
        // buildContext.getMode() = "drag";
        if (!isDrag.current) {
          updateMode();
          isDrag.current = true;
        }
        elementSelectionContext.function.setMode("drag");
        focusRef.current = true;
      }
      if (down && elementSelectionContext.getMode() === "drag") {
        refElement.style.cursor = "grabbing";
      } else {
        refElement.style.cursor = "pointer";
      }
      getMidRange(refElement.getBoundingClientRect());

      if (
        elementSelectionContext.getZones() &&
        elementSelectionContext.getMarkers()
      ) {
        const move = insertElement(
          refElement,
          prevMid.current,
          elementSelectionContext.getZones()!,
          elementSelectionContext.getMarkers()!,
          false
        );

        if (move !== null && moveRef.current !== move.index) {
          moveRef.current = move.index;
          buildContext.insertFunc.swapElement(
            elementData.id,
            move.index,
            move.id,
            elementData.id
          );
        }
      } else {
        elementSelectionContext.function.updateZones(
          buildContext.getElementList("ref") as JsxElementList[]
        );
      }

      if (!initial.current) {
        const viewPort = document.getElementById("viewPort-view");
        if (viewPort) {
          currentYPos.current =
            refElement.getBoundingClientRect().top -
            viewPort.getBoundingClientRect().top -
            16;
          initial.current = true;
        }
      }

      api.start({
        y: currentYPos.current + my,
        zIndex: 20,
        scale: 1.02,
        shadow: 25,
        immediate: (key: string) => key === "y" || key === "zIndex",
      });
    } else {
    }

    if (!down) {
      // mode.current = "point";
      if (elementSelectionContext.getMode() === "drag") {
        elementSelectionContext.function.setMode("point");
        reset();
      } else {
        api.start({
          y: yPos.current,
          immediate: false,
        });
      }

      initial.current = false;
      currMid.current = null;
      moveRef.current = null;

      // reset();
      elementSelectionContext.function.updateZones(
        buildContext.getElementList("ref") as JsxElementList[]
      );
    }
  });

  const reset = () => {
    api.start({
      y: yPos.current,
      zIndex: 10,
      scale: 1,
      shadow: 1,
      immediate: false,
    });

    setCurrentFocus(false);
    setStopMovement(false);
  };

  const [currentFocus, setCurrentFocus] = useState(false);
  useEffect(() => {
    if (initialRender.current === false) {
      addSpring(elementData.id, api, updateYPos, getYPos);
      initialRender.current = true;
    }

    if (initialRender.current) {
      yPos.current = initialNewRender(
        buildContext.getElementList("ref"),
        elementData.id
      );
      api.start({ y: yPos.current, immediate: true });
    }
  }, []);
  return (
    <animated.div
      {...bind()}
      ref={element}
      style={{
        zIndex: spring.zIndex,
        y: spring.y,
        scale: spring.scale,
        boxShadow: spring.shadow.to(
          (s) => `rgba(0, 0, 0, 0.15) 0px ${s}px ${2 * s}px 0px`
        ),
      }}
      id={elementData.id}
      className="viewport-element absolute touch-none hover:cursor-pointer bg-card"
      onClick={() => {
        focusRef.current = false;

        if (isDrag.current) {
          console.log("was dragging");
          setCurrentFocus(false);
        } else {
          setCurrentFocus(true);
        }
        isDrag.current = false;
      }}
      onMouseDown={() => {
        if (
          !focusRef.current &&
          buildContext.focus.value()?.id !== elementData.id
        ) {
          console.log(buildContext.focus.value());
          buildContext.focus.onFocus(elementData.id, reset);
          // setCurrentFocus(buildContext.focus.value());
        }
      }}

      // onMouseUp={()=>{}}
    >
      <ElementContent
        type={elementData.component}
        content={elementData.content}
        id={elementData.id}
      />
      {/* {elementData.component === "Text" ? (
        <ElementText
          focus={currentFocus}
          content={elementData.content}
          id={elementData.id}
          setStopMovement={setStopMovement}
          initialRender={() => {
            buildContext.initialRender();
          }}
          reset={reset}
        />
      ) : elementData.component === "Image" ? (
        <p>image tag</p>
      ) : (
        <p>video tag</p>
      )} */}
    </animated.div>
  );
}
