import {
  getViewPortHeight,
  insertNewElement,
  setAnimationElement,
  swapOrder,
} from "@/lib/buildUtils/element-utils";
import { SpringRef, SpringValue, useSpring } from "@react-spring/web";
import { createContext, ReactNode, useEffect, useRef, useState } from "react";

export type ElementSpringType = SpringRef<SpringType>;

interface BuildContextType {
  addElement: (type: string, insertIndex: number) => void;
  getElementList: (type: "ref" | "state") => JsxElementList[];
  viewPortSpring: {
    scaleY: SpringValue<number>;
  };
  initialRender: () => void;
  insertFunc: {
    hideInsert: () => void;
    addSpringInstance: (
      id: string,
      spring: ElementSpringType,
      updateYPos: (newYPos: number) => void,
      getYPos: () => number
    ) => void;
    swapElement: (
      id: string,
      newIndex: number,
      swapId: string,
      focus?: string
    ) => JsxElementList[] | undefined;
  };
}

export const BuildContext = createContext<BuildContextType | undefined>(
  undefined
);

export interface ElementSpringObj {
  [key: string]: {
    spring: ElementSpringType;
    updateYPos: (newYPos: number) => void;
    getYPos: () => number;
  };
}
export function BuildContextProvider({ children }: { children: ReactNode }) {
  const elementListRef = useRef<JsxElementList[]>([
    { id: "insert-here", component: "insert-here", content: "" },
    { id: "unique-id", component: "Text", content: "" },
    { id: "unique-id2", component: "Text", content: "" },
    { id: "unique-id3", component: "Video", content: "" },
  ]);

  const [elementListState, setElementListState] = useState<JsxElementList[]>([
    { id: "insert-here", component: "insert-here", content: "" },
    { id: "unique-id", component: "Text", content: "" },
    { id: "unique-id2", component: "Text", content: "" },
    { id: "unique-id3", component: "Video", content: "" },
  ]);

  const elementSpringObj = useRef<ElementSpringObj>({});

  const getElementList = (type: "ref" | "state") => {
    if (type === "ref") {
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

  // mutation functions
  // swap insert

  const swapElement = (
    id: string,
    newIndex: number,
    swapId: string,
    focus?: string
  ) => {
    const currentIndex = elementListRef.current.findIndex(
      (element) => element.id === id
    );
    if (currentIndex < 0) return elementListRef.current;

    if (currentIndex === newIndex) return;

    elementListRef.current = swapOrder(
      elementListRef.current,
      currentIndex,
      newIndex
    );

    setAnimationElement(
      elementListRef.current,
      elementSpringObj.current,
      id === "insert-here",
      focus
    );

    viewPortSpringApi.start({
      scaleY: getViewPortHeight(elementListRef.current, id === "insert-here"),
    });
    return elementListRef.current;
  };

  // hide insert
  const hideInsert = () => {
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
  const addElement = (type: string, insertIndex: number) => {
    // cause a rerender
    // update ref
    elementListRef.current = insertNewElement(
      type,
      insertIndex,
      elementListRef.current
    );

    // update state -> ref
    setElementListState(() => elementListRef.current);
  };

  const addSpringInstance = (
    id: string,
    spring: ElementSpringType,
    updateYPos: (newYPos: number) => void,
    getYPos: () => number
  ) => {
    elementSpringObj.current[id] = { spring, updateYPos, getYPos };
  };

  const initialRender = () => {
    setAnimationElement(elementListState, elementSpringObj.current, false);
  };

  useEffect(() => {
    console.log("rerendered");
    initialRender();
    // console.log(elementListState);
    viewPortSpringApi.set({
      scaleY: getViewPortHeight(elementListRef.current, false),
    });
  }, [elementListState]);

  return (
    <BuildContext.Provider
      value={{
        addElement,
        getElementList,
        viewPortSpring,
        initialRender,
        insertFunc: {
          hideInsert,
          addSpringInstance,
          swapElement,
        },
      }}
    >
      {children}
    </BuildContext.Provider>
  );
}
