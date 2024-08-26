"use client";

import { useEffect, useRef } from "react";
import ElementSelection from "./ElementSelection";
import { TextElement, VideoElement } from "./Element";
import { animated, useSpring, useSprings } from "@react-spring/web";
import {
  fn,
  switchOrder,
  getViewPortHeight,
} from "@/lib/buildUtils/element-utils";

export default function ViewPort() {
  return (
    <div className="w-full relative">
      <JsxViewPort />
    </div>
  );
}

function JsxViewPort() {
  const list = [
    { id: "insert-here", component: "insert-here", content: "" },
    { id: "unique-id", component: "Text", content: "" },
    { id: "unique-id3", component: "Video", content: "" },
    { id: "unique-id2", component: "Text", content: "" },
  ];
  const elementListRef = useRef(list);
  const order = useRef(list.map((_, index) => index));

  const [portSpring, portApi] = useSpring(() => ({
    scaleY: 1,
  }));
  const [springs, springsApi] = useSprings(
    elementListRef.current.length,
    () => ({ y: 0, visibility: "hidden" })
  );

  useEffect(() => {
    springsApi.set(fn(elementListRef.current, order.current));
    portApi.set({ scaleY: getViewPortHeight(elementListRef.current, false) });
  }, []);

  const moveInsert = (newIndex: number) => {
    const newLists = switchOrder(
      elementListRef.current,
      order.current,
      order.current.indexOf(0),
      newIndex
    );

    elementListRef.current = newLists.elementList;
    order.current = newLists.order;

    springsApi.set(fn(elementListRef.current, order.current, true));
    portApi.set({ scaleY: getViewPortHeight(elementListRef.current, true) });
    return { elementList: elementListRef.current, order: order.current };
  };

  const hideInsert = () => {
    springsApi.set(fn(elementListRef.current, order.current, false));
    portApi.set({ scaleY: getViewPortHeight(elementListRef.current, false) });
  };

  const addNewElement = () => {
    console.log("insert element");
  };

  const getElementList = () => {
    return elementListRef.current;
  };

  return (
    <>
      <animated.div
        style={portSpring}
        id="viewPort-view"
        className="w-full h-[10rem] absolute origin-top rounded bg-cta-active"
      ></animated.div>
      <div
        id="jsxViewPort"
        className="w-full h-full min-h-32 p-4 bg-cta-active rounded-xl shadow-inner"
      >
        <div className="w-full h-full flex flex-col items-center relative">
          <ElementSelection
            elementList={elementListRef.current}
            moveInsert={moveInsert}
            order={order.current}
            hideInsert={hideInsert}
            addNewElement={addNewElement}
            getElementList={getElementList}
          />

          <animated.div
            id="viewPort"
            className="w-full h-[10rem] flex flex-col gap-3 origin-top"
          >
            {springs.map((spring, i) => {
              if (elementListRef.current[i].component !== "insert-here") {
                if (elementListRef.current[i].component === "Video") {
                  return (
                    <VideoElement
                      key={i}
                      style={spring}
                      id={elementListRef.current[i].id}
                      order={i}
                    />
                  );
                }
                return (
                  <TextElement
                    key={i}
                    style={spring}
                    id={elementListRef.current[i].id}
                    order={i}
                  />
                );
              }
              return <InsertHereLine key={i} style={spring} order={i} />;
            })}
          </animated.div>
          {/* <button
            className="absolute -top-12"
            onClick={() => {
              moveInsert(0);
            }}
          >
            click
          </button>
          <button
            className="absolute -top-9 z-[100]"
            onClick={() => {
              moveInsert(1);
              console.log(elementListRef.current);
            }}
          >
            click here
          </button> */}
        </div>
      </div>
    </>
  );
}

function InsertHereLine({ style, order }: { style: any; order: number }) {
  return (
    <animated.div
      style={style}
      id="insert-here"
      className="w-full flex justify-between items-center gap-1 text-primary-text duration-0 absolute"
    >
      <b>&lt;</b>
      <div className="bg-primary-text flex-grow h-[1px]"></div>
      <p className="text-sm italic">insert here {order}</p>
      <div className="bg-primary-text flex-grow h-[1px]"></div>
      <b>&gt;</b>
    </animated.div>
  );
}
