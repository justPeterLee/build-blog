import { animated, useSpring } from "@react-spring/web";
import { useDrag } from "@use-gesture/react";
import { useRef } from "react";
import { FaVideo } from "react-icons/fa6";
import { FaImage } from "react-icons/fa";
import { LuTextCursor } from "react-icons/lu";
import { MdCancel } from "react-icons/md";
import { FaCheckCircle } from "react-icons/fa";

import {
  createMarkers,
  createZone,
  insertElement,
  inViewPort,
} from "@/lib/buildUtils/build-utils";

export default function ElementSelection({
  elementList,
  moveInsert,
  hideInsert,
  addNewElement,
  getElementList,
}: {
  elementList: JsxElementList[];
  order: number[];
  moveInsert: (newIndex: number) => {
    elementList: any[];
    order: any[];
  };
  hideInsert: () => void;
  addNewElement: () => void;
  getElementList: () => JsxElementList[];
}) {
  const elements = ["Text", "Image", "Video"];

  return (
    <div className="absolute min-h-12 min-w-12 p-1 rounded-lg bg-card -left-[5rem] -top-0 flex flex-col gap-1">
      {elements.map((element: string, index: number) => {
        return (
          <Element
            element={element}
            elementList={elementList}
            // oredr={order}
            key={index}
            moveInsert={moveInsert}
            hideInsert={hideInsert}
            addNewElement={addNewElement}
            getElementList={getElementList}
          />
        );
      })}
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
  elementList,
  moveInsert,
  hideInsert,
  addNewElement,
  getElementList,
}: //   update,
{
  element: string;
  elementList: JsxElementList[];
  moveInsert: (newIndex: number) => {
    elementList: any[];
    order: any[];
  };
  hideInsert: () => void;
  addNewElement: () => void;
  getElementList: () => JsxElementList[];
}) {
  /* ---------------------------------------------------
   ref values
   ---------------------------------------------------*/
  // current element
  const ref = useRef<HTMLDivElement | null>(null);

  // mid postion range (takes last read input and current input -> value between both input = range)
  const prevMid = useRef<number | null>(null); // min
  const currMid = useRef<number | null>(null); // max

  // zone detection (limits)
  // when zone detection function is called ->
  // use this reference value to determine the zone the element mid position is in
  const zonesRef = useRef<ZoneValues[] | null>(null);

  // marker detetion (limits)
  // when a marker detection falls between the [mid position] range ->
  // call zone detection
  const markersRef = useRef<number[] | null>(null);

  // current index of "insert-here" element in elementList (order of viewport)
  const insertIndex = useRef<number>(0);

  // auto call zone detection when element enters viewport (only once)
  const initialRender = useRef(false);

  // postion of added element
  const insertValue = useRef<number | null>(null);

  /* ---------------------------------------------------
   springs
   ---------------------------------------------------*/
  // element spring
  const [spring, api] = useSpring(() => ({
    y: 0,
    x: 0,
    scale: 1,
    immediate: (key: string) => key === "zIndex",
  }));

  // icons spring values
  // use spring on icons to allow transformation without causing
  // a re-render

  // fail icon spring
  const [failSpring, failApi] = useSpring(() => ({
    opacity: 0,
  }));
  // valid icon spring
  const [vaildSpring, vaildApi] = useSpring(() => ({
    opacity: 0,
  }));

  // local functions
  const updateZones = () => {
    zonesRef.current = createZone(elementList);
    markersRef.current = createMarkers(elementList);
  };

  const getMidRange = (pos: DOMRect) => {
    prevMid.current = currMid.current;
    currMid.current = Math.round(pos.top + pos.height / 2);
  };

  const isValidInsert = (isValid: "Y" | "N" | "OFF") => {
    if (isValid === "Y") {
      vaildApi.set({ opacity: 1 });
      failApi.set({ opacity: 0 });
    } else if (isValid === "N") {
      vaildApi.set({ opacity: 0 });
      failApi.set({ opacity: 1 });
      hideInsert();
    } else {
      vaildApi.set({ opacity: 0 });
      failApi.set({ opacity: 0 });
      hideInsert();
    }
  };

  // motion function (bind) => use Guesture
  const bind = useDrag(({ movement: [mx, my], down }) => {
    if (ref.current) {
      const refElement = ref.current;
      if (down) {
        // on grab styling
        onGrab(ref.current, true);

        // get mid section range -> prevMid , currMid (useRef)
        getMidRange(refElement.getBoundingClientRect());

        // move insert
        if (zonesRef.current && markersRef.current) {
          const move = insertElement(
            refElement,
            prevMid.current,
            zonesRef.current,
            markersRef.current,
            initialRender.current
          );

          if (move !== null) {
            const moveData = moveInsert(move);
            insertValue.current = move;
            insertIndex.current = moveData.order.indexOf(0);

            updateZones();
          }
        } else {
          updateZones();
        }

        isValidInsert(insertValue.current !== null ? "Y" : "N");

        // in viewport actions
        if (inViewPort(null, refElement.getBoundingClientRect())) {
          initialRender.current = true;
        } else {
          initialRender.current = false;
          insertValue.current = null;
        }
      } else {
        // reset
        onGrab(ref.current, false);
        isValidInsert("OFF");

        prevMid.current = null;
        initialRender.current = false;

        if (insertValue.current !== null) {
          addNewElement();
          insertValue.current = null;
        }
      }
    }

    api.start({
      y: my,
      x: mx,
      scale: 0.8,
      immediate: true,
    });
    if (!down) {
      api.set({
        y: 0,
        x: 0,
        scale: 1,
      });
    }
  });
  return (
    <div className="bg-code-card rounded-lg h-10  relative">
      <div className="flex flex-col justify-center items-center h-full text-primary-text select-none">
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
          "bg-code-card rounded-lg h-10 w-10 hover:cursor-grab absolute  top-0 touch-none duration-0"
        }
      >
        <div className="w-full h-full relative ">
          <div className="flex flex-col justify-center items-center h-full text-primary-text select-none">
            {element === "Text" ? (
              <LuTextCursor color="text-primary-text" className="duration-0" />
            ) : element === "Image" ? (
              <FaImage color="text-primary-text" className="duration-0" />
            ) : (
              <FaVideo color="text-primary-text" className="duration-0" />
            )}
          </div>
          <animated.div
            style={failSpring}
            className={"absolute -top-2 -right-2"}
          >
            <div className="h-full w-full bg-card rounded-full">
              <MdCancel className="text-red-500" size={20} />
            </div>
          </animated.div>
          <animated.div
            style={vaildSpring}
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
