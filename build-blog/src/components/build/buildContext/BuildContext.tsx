import {
  fn,
  getViewPortHeight,
  setAnimationElement,
  swapElementAnimation,
  swapOrder,
  switchOrder,
} from "@/lib/buildUtils/element-utils";
import {
  SpringRef,
  SpringValue,
  useSpring,
  useSprings,
} from "@react-spring/web";
import { createContext, ReactNode, useEffect, useRef, useState } from "react";

export type ElementSpringType = SpringRef<SpringType>;

export const BuildContext = createContext<
  | {
      addElement: () => void;
      getElementList: (type: "origin" | "ref" | "state") => JsxElementList[];
      viewPortSpring: {
        scaleY: SpringValue<number>;
      };
      vpElementSprings: {
        y: SpringValue<number>;
        visibility: SpringValue<string>;
      }[];
      initialRender: () => void;
      insertFunc: {
        swapInsert: (newIndex: number) => {
          elementList: JsxElementList[];
          elementListOrder: number[];
        };
        hideInsert: () => void;
        addSpringInstance: (id: string, spring: ElementSpringType) => void;
        swapElement: (
          id: string,
          newIndex: number
        ) => JsxElementList[] | undefined;
      };
    }
  | undefined
>(undefined);

export function BuildContextProvider({ children }: { children: ReactNode }) {
  // do not perform any action on (only used to maintain state)
  const _elementListOrigin = useRef<JsxElementList[]>([
    { id: "insert-here", component: "insert-here", content: "" },
    { id: "unique-id", component: "Text", content: "" },
    { id: "unique-id2", component: "Text", content: "" },
    { id: "unique-id4", component: "Text", content: "" },
    { id: "unique-id5", component: "Text", content: "" },
    { id: "unique-id3", component: "Video", content: "" },
  ]);

  const elementListRef = useRef<JsxElementList[]>(_elementListOrigin.current); //
  const elementListOrder = useRef(
    elementListRef.current.map((_, index) => index)
  );
  const [elementListState, setElementListState] = useState<JsxElementList[]>([
    { id: "insert-here", component: "insert-here", content: "" },
    { id: "unique-id", component: "Text", content: "" },
    { id: "unique-id2", component: "Text", content: "" },
    { id: "unique-id4", component: "Text", content: "" },
    { id: "unique-id5", component: "Text", content: "" },
    { id: "unique-id3", component: "Video", content: "" },
  ]);

  const elementSpringObj = useRef<{
    [key: string]: ElementSpringType;
  }>({});
  const getElementList = (type: "origin" | "ref" | "state") => {
    if (type === "origin") {
      return _elementListOrigin.current;
    } else if (type === "ref") {
      return elementListRef.current;
    } else if (type === "state") {
      return elementListState;
    } else {
      return [];
    }
  };

  const [viewPortSpring, viewPortSpringApi] = useSpring(() => ({
    scaleY: 1,
  }));

  const [vpElementSprings, vpElementSpringsApi] = useSprings(
    _elementListOrigin.current.length,
    () => {
      return { y: 0, visibility: "hidden" };
    }
  );

  // mutation functions
  // swap insert
  const swapInsert = (newIndex: number) => {
    const newLists = switchOrder(
      elementListRef.current,
      elementListOrder.current,
      elementListOrder.current.indexOf(0),
      newIndex
    );

    elementListRef.current = newLists.elementList;
    elementListOrder.current = newLists.order;

    // console.log("test");
    // vpElementSpringsApi.set(
    //   fn(elementListRef.current, elementListOrder.current, true)
    // );
    // viewPortSpringApi.set({
    //   scaleY: getViewPortHeight(elementListRef.current, true),
    // });

    return {
      elementList: elementListRef.current,
      elementListOrder: elementListOrder.current,
    };
  };

  const swapElement = (id: string, newIndex: number) => {
    const currentIndex = elementListRef.current.findIndex(
      (element) => element.id === id
    );
    if (currentIndex < 0) return elementListRef.current;
    // if (currentIndex === newIndex) return elementListRef.current;

    elementListRef.current = swapOrder(
      elementListRef.current,
      currentIndex,
      newIndex
    );

    setAnimationElement(
      elementListRef.current,
      elementSpringObj.current,
      id === "insert-here"
    );

    viewPortSpringApi.start({
      scaleY: getViewPortHeight(elementListRef.current, id === "insert-here"),
    });
    return elementListRef.current;
  };

  // hide insert
  const hideInsert = () => {
    // vpElementSpringsApi.set(
    //   fn(elementListRef.current, elementListOrder.current, false)
    // );
    setAnimationElement(
      elementListRef.current,
      elementSpringObj.current,
      false
    );
    viewPortSpringApi.start({
      scaleY: getViewPortHeight(elementListRef.current, false),
    });
  };

  // add element
  const addElement = () => {
    console.log("add element");
    setElementListState([
      { id: "unique-id", component: "Text", content: "" },
      { id: "unique-id2", component: "Text", content: "" },
      { id: "unique-id3", component: "Video", content: "" },
      { id: "insert-here", component: "insert-here", content: "" },
      { id: "unique-id4", component: "Video", content: "" },
    ]);
    // _elementListOrigin.current = [
    //   { id: "insert-here", component: "insert-here", content: "" },
    //   { id: "unique-id", component: "Text", content: "" },
    //   { id: "unique-id2", component: "Text", content: "" },
    //   { id: "unique-id3", component: "Video", content: "" },
    // ];
  };

  const addSpringInstance = (id: string, spring: ElementSpringType) => {
    elementSpringObj.current[id] = spring;
  };
  const initialRender = () => {
    setAnimationElement(elementListState, elementSpringObj.current, false);
  };

  //   useEffect(() => {
  //     vpElementSpringsApi.set(
  //       fn(elementListRef.current, elementListOrder.current)
  //     );
  //   }, []);

  useEffect(() => {
    viewPortSpringApi.set({
      scaleY: getViewPortHeight(elementListRef.current, false),
    });
    // viewPortSpringApi.set(getViewPortHeight(elementListRef.current,true));
  }, [elementListState]);
  return (
    <BuildContext.Provider
      value={{
        addElement,
        getElementList,
        viewPortSpring,
        vpElementSprings,
        initialRender,
        insertFunc: { swapInsert, hideInsert, addSpringInstance, swapElement },
      }}
    >
      {children}
    </BuildContext.Provider>
  );
}
