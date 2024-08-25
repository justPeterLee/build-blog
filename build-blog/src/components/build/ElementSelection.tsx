import { animated, useSpring } from "@react-spring/web";
import { useDrag } from "@use-gesture/react";
import { useRef } from "react";
import { FaVideo } from "react-icons/fa6";
import { FaImage } from "react-icons/fa";
import { LuTextCursor } from "react-icons/lu";
import {
  createMarkers,
  createZone,
  insertElement,
} from "@/lib/buildUtils/build-utils";

export default function ElementSelection({
  elementList,
  moveInsert,
  hideInsert,
}: {
  elementList: JsxElementList[];
  order: number[];
  moveInsert: (
    originalIndex: number,
    newIndex: number
  ) => {
    elementList: any[];
    order: any[];
  };
  hideInsert: () => void;
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
          />
        );
      })}
    </div>
  );
}

function Element({
  element,
  elementList,
  moveInsert,
  hideInsert,
}: //   update,
{
  element: string;
  elementList: JsxElementList[];
  moveInsert: (
    originalIndex: number,
    newIndex: number
  ) => {
    elementList: any[];
    order: any[];
  };
  hideInsert: () => void;
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  const prevMid = useRef<number | null>(null);
  const currMid = useRef<number | null>(null);
  const [spring, api] = useSpring(() => ({
    y: 0,
    x: 0,
    scale: 1,
    immediate: (key: string) => key === "zIndex",
  }));

  const zonesRef = useRef<ZoneValues[] | null>(null);
  const markersRef = useRef<number[] | null>(null);
  const insertIndex = useRef<number>(0);
  const initialRef = useRef(false);
  const update = () => {
    zonesRef.current = createZone(elementList);
    markersRef.current = createMarkers(elementList);
  };

  const bind = useDrag(({ movement: [mx, my], down }) => {
    if (ref.current) {
      if (down) {
        ref.current.style.cursor = "grabbing";
        ref.current.style.backgroundColor = "rgb(248,113,113)";
        ref.current.style.zIndex = "30";

        prevMid.current = currMid.current;
        currMid.current = Math.round(
          ref.current.getBoundingClientRect().top +
            ref.current.getBoundingClientRect().height / 2
        );
      } else {
        ref.current.style.cursor = "grab";
        ref.current.style.backgroundColor = "transparent";
        ref.current.style.zIndex = "0";

        prevMid.current = null;
      }

      if (zonesRef.current && markersRef.current) {
        const move = insertElement(
          ref.current,
          prevMid.current,
          zonesRef.current,
          markersRef.current,
          initialRef.current
        );

        if (move !== null) {
          const moveData = moveInsert(insertIndex.current, move);
          if (!initialRef.current) {
            initialRef.current = true;
          }
          insertIndex.current = moveData.order.indexOf(0);
          update();
        }
      } else {
        update();
      }
    }

    if (!down) {
      console.log("dropped");
      hideInsert();
      initialRef.current = false;
    }
    api.start({
      y: my,
      x: mx,
      scale: 0.8,
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
        <div className="flex flex-col justify-center items-center h-full text-primary-text select-none">
          {element === "Text" ? (
            <LuTextCursor color="text-primary-text" className="duration-0" />
          ) : element === "Image" ? (
            <FaImage color="text-primary-text" className="duration-0" />
          ) : (
            <FaVideo color="text-primary-text" className="duration-0" />
          )}
        </div>
      </animated.div>
    </div>
  );
}
