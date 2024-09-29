import { useContext, useRef } from "react";
import { animated, useSpring, useSpringValue } from "@react-spring/web";
import { useDrag } from "@use-gesture/react";

// util functions
import { insertElement, inViewPort } from "@/lib/buildUtils/build-utils";
import { BuildContext } from "./buildContext/BuildContext";
import { ElementSelectionContext } from "./buildContext/ElementSelectorContext";

// icons 15.5k
import { FaVideo } from "react-icons/fa6";
import { FaImage } from "react-icons/fa";
import { LuTextCursor } from "react-icons/lu";
import { MdCancel } from "react-icons/md";
import { FaCheckCircle } from "react-icons/fa";

export default function ElementSelection() {
  const buildContext = useContext(BuildContext);
  if (!buildContext) return <></>;
  const elements: ["Text", "Image", "Video"] = ["Text", "Image", "Video"];

  return (
    <div
      onMouseDown={() => {
        buildContext.focus.onBlur();
      }}
      className="absolute z-30 min-h-12 min-w-12 p-1 rounded-lg bg-card -left-[5rem] -top-0 flex flex-col gap-1"
    >
      {elements.map(
        (element: "Text" | "Image" | "Video" | "Other", index: number) => {
          return <Element element={element} key={index} />;
        }
      )}
    </div>
  );
}

function onGrab(element: HTMLDivElement, isGrab: boolean) {
  if (isGrab) {
    element.style.cursor = "grabbing";
    element.style.backgroundColor = "rgb(248,113,113)";
    element.style.zIndex = "30";
  } else {
    element.style.cursor = "grab";
    element.style.backgroundColor = "transparent";
    element.style.zIndex = "0";
  }
}
function Element({
  element,
}: //   update,
{
  element: "Text" | "Image" | "Video" | "Other";
}) {
  const buildContext = useContext(BuildContext);
  const elementSelectionContext = useContext(ElementSelectionContext);
  if (buildContext === undefined || elementSelectionContext === undefined)
    return <>failed to load</>;
  /* ---------------------------------------------------
   ref values
   ---------------------------------------------------*/
  // current element
  const ref = useRef<HTMLDivElement | null>(null);
  // mid postion range (takes last read input and current input -> value between both input = range)
  const prevMid = useRef<number | null>(null); // min
  const currMid = useRef<number | null>(null); // max
  const moveRef = useRef<number | null>(null);

  // auto call zone detection when element enters viewport (only once)
  const initialRender = useRef(false);

  // postion of added element
  const insertValue = useRef<number | null>(null);

  const onGrabTracker = useRef(false);

  /* ---------------------------------------------------
   springs
   ---------------------------------------------------*/
  // element spring
  const [spring, api] = useSpring(() => ({
    y: 0,
    x: 0,
    scale: 1,
    immediate: (key: string) => key === "zIndex",
    onResolve: () => {
      console.log("test");
    },
  }));

  // icons spring values
  // use spring on icons to allow transformation without causing
  // a re-render

  // fail icon spring
  const failOpacity = useSpringValue(0);
  // valid icon spring
  const validOpacity = useSpringValue(0);

  const getMidRange = (pos: DOMRect) => {
    prevMid.current = currMid.current;
    currMid.current = Math.round(pos.top + pos.height / 2);
  };

  const isValidInsert = (isValid: "Y" | "N" | "OFF") => {
    if (isValid === "Y") {
      validOpacity.set(1);
      failOpacity.set(0);
    } else if (isValid === "N") {
      validOpacity.set(0);
      failOpacity.set(1);
      //   hideInsert();
      buildContext.insertFunc.hideInsert();
    } else {
      validOpacity.set(0);
      failOpacity.set(0);
      buildContext.insertFunc.hideInsert();
      //   hideInsert();
    }
  };

  // motion function (bind) => use Guesture
  const bind = useDrag(({ movement: [mx, my], down }) => {
    if (ref.current) {
      const refElement = ref.current;

      if (down) {
        // on grab styling
        if (!onGrabTracker.current) {
          onGrab(ref.current, true);
          onGrabTracker.current = true;
        }

        // get mid section range -> prevMid , currMid (useRef)
        getMidRange(refElement.getBoundingClientRect());

        // move insert
        if (
          elementSelectionContext.getZones() &&
          elementSelectionContext.getMarkers()
        ) {
          const move = insertElement(
            refElement,
            prevMid.current,
            elementSelectionContext.getZones()!,
            elementSelectionContext.getMarkers()!,
            initialRender.current
          );

          if (move !== null && moveRef.current !== move.index) {
            moveRef.current = move.index;

            buildContext.insertFunc.swapElement(
              "insert-here",
              move.index,
              move.id
            );

            insertValue.current = move.index;

            // elementSelectionContext.function.updateZones(
            //   buildContext.getElementList("ref") as JsxElementList[]
            // );
          }
        } else {
          elementSelectionContext.function.updateZones(
            buildContext.getElementList("ref") as JsxElementList[]
          );
        }

        isValidInsert(insertValue.current !== null ? "Y" : "N");

        // in viewport actions
        if (inViewPort(null, refElement.getBoundingClientRect())) {
          initialRender.current = true;
        } else {
          initialRender.current = false;
          moveRef.current = null;

          insertValue.current = null;
        }
      } else {
        // reset
        moveRef.current = null;
        onGrabTracker.current = false;
        onGrab(ref.current, false);
        isValidInsert("OFF");
        buildContext.insertFunc.hideInsert();
        prevMid.current = null;
        initialRender.current = false;
      }
    }

    api.start({
      y: my,
      x: mx,
      scale: 0.8,
      immediate: (key) => key === "y" || key === "x",
    });
    if (!down) {
      api.start({
        y: 0,
        x: 0,
        scale: 1,
        immediate: true,
        // immediate: (key) => key === "y"
        onResolve: () => {
          if (insertValue.current !== null) {
            buildContext.addElement(element, insertValue.current);
            insertValue.current = null;
          }
        },
      });
    }
  });
  return (
    <div className="bg-code-card rounded-lg h-10  relative duration-0">
      <div className="flex flex-col justify-center items-center h-full text-primary-text select-none duration-0">
        {element === "Text" ? (
          <LuTextCursor color="text-primary-text" className="duration-0" />
        ) : element === "Image" ? (
          <FaImage color="text-primary-text" className="duration-0" />
        ) : (
          <FaVideo color="text-primary-text " className="duration-0" />
        )}
      </div>
      <animated.div
        ref={ref}
        style={spring}
        {...bind()}
        className={
          "bg-code-card rounded-lg h-10 w-10 hover:cursor-grab absolute  top-0 touch-none duration-0 select-none"
        }
      >
        <div className="w-full h-full relative duration-0">
          <div className="flex flex-col justify-center items-center h-full text-primary-text select-none duration-0">
            {element === "Text" ? (
              <LuTextCursor color="text-primary-text" className="duration-0" />
            ) : element === "Image" ? (
              <FaImage color="text-primary-text" className="duration-0" />
            ) : (
              <FaVideo color="text-primary-text " className="duration-0" />
            )}
          </div>
          <animated.div
            style={{ opacity: failOpacity }}
            className={"absolute -top-2 -right-2"}
          >
            <div className="h-full w-full bg-card rounded-full">
              <MdCancel className="text-red-500" size={20} />
            </div>
          </animated.div>
          <animated.div
            style={{ opacity: validOpacity }}
            className={"absolute top-[-0.4rem] right-[-0.4rem]"}
          >
            <div className="h-full w-full bg-card rounded-full">
              <FaCheckCircle className="text-green-500" size={17} />
            </div>
          </animated.div>
        </div>
      </animated.div>
    </div>
  );
}
