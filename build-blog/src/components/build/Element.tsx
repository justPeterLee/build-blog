import { animated, useSpring } from "@react-spring/web";
import { useContext, useEffect, useRef } from "react";
import { BuildContext, ElementSpringType } from "./buildContext/BuildContext";
import { useDrag } from "@use-gesture/react";
import { ElementSelectionContext } from "./buildContext/ElementSelectorContext";
import { initialNewRender, insertElement } from "@/lib/buildUtils/build-utils";

export function TextElement({
  id,
  style,
  order,
}: {
  id: string;
  style: any;
  order: number;
}) {
  return (
    <animated.div
      style={style}
      id={id}
      className="bg-card w-full rounded-xl p-2 shadow absolute"
    >
      <p className="text-secondary-text">Text Element {order}</p>
    </animated.div>
  );
}

export function VideoElement({
  id,
  style,
  order,
}: {
  id: string;
  style: any;
  order: number;
}) {
  return (
    <animated.div
      style={style}
      id={id}
      className="bg-card w-full h-32 rounded-xl p-2 shadow absolute"
    >
      <p className="text-secondary-text">Video Element {order}</p>
    </animated.div>
  );
}

export function InsertHereLine({
  style,
  addSpring,
}: {
  style: any;
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
  type,
  id,
  style,
  addSpring,
}: {
  type: string;
  id: string;
  style: any;
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

  const mode = useRef("point");
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

  const bind = useDrag(({ movement: [_, my], down }) => {
    if (element.current) {
      const refElement = element.current;
      if (my > 10 || my < -10) {
        mode.current = "grab";
      }
      if (down && mode.current === "grab") {
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
          buildContext.insertFunc.swapElement(id, move.index, move.id, id);
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
        shadow: 15,
        immediate: (key: string) => key === "y" || key === "zIndex",
      });
    } else {
    }

    if (!down) {
      mode.current = "point";
      initial.current = false;
      currMid.current = null;
      moveRef.current = null;

      api.start({
        y: yPos.current,
        zIndex: 10,
        scale: 1,
        shadow: 1,
        immediate: false,
      });
      elementSelectionContext.function.updateZones(
        buildContext.getElementList("ref") as JsxElementList[]
      );
    }
  });

  useEffect(() => {
    if (initialRender.current === false) {
      addSpring(id, api, updateYPos, getYPos);
      initialRender.current = true;
    }

    if (initialRender.current) {
      yPos.current = initialNewRender(buildContext.getElementList("ref"), id);
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
      id={id}
      className="bg-card w-full rounded-xl p-2 absolute touch-none hover:cursor-pointer"
    >
      {id}
    </animated.div>
  );
}
