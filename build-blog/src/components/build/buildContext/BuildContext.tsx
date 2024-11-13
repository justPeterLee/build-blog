import {
  getViewPortHeight,
  insertNewElement,
  removeElement,
  setAnimationElement,
  swapOrder,
} from "@/lib/buildUtils/element-utils";
import { SpringRef, SpringValue, useSpring } from "@react-spring/web";
import { nanoid } from "nanoid";
import { createContext, ReactNode, useRef, useState } from "react";

export type ElementSpringType = SpringRef<SpringType>;
export type ModeType = "point" | "drag" | "active";

export interface ElementSpringObj {
  [key: string]: {
    spring: ElementSpringType;
    updateYPos: (newYPos: number) => void;
    getYPos: () => number;
  };
}

export interface ElementContentObj {
  [id: string]: {
    type: "Text" | "Image" | "Video" | "Other";
    content: string | File | null;
  };
}

interface BuildContextType {
  addElement: (
    type: "Text" | "Image" | "Video" | "Other",
    insertIndex: number
  ) => void;

  deleteElement: (id: string) => void;

  getElementList: (type: "ref" | "state") => JsxElementList[];

  getElementContent: (type: "ref" | "state") => ElementContentObj;

  updateElementContent: (
    id: string,
    content: string | File | null
  ) => {
    status: boolean;
    error: string;
  };
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

  focus: {
    value: () => { id: string; reset: () => void } | null;
    onFocus: (id: string, reset: () => void) => void;
    onBlur: () => void;
  };
}

export const BuildContext = createContext<BuildContextType | undefined>(
  undefined
);

export function BuildContextProvider({ children }: { children: ReactNode }) {
  // ================ default values ===================

  // element list reference (for consistency)
  const elementListRef = useRef<JsxElementList[]>([
    { id: "insert-here", component: "Other", content: "" },

    // ---- example value ---

    // { id: "unique-id", component: "Text", content: "" },
    // { id: "unique-id2", component: "Text", content: "text 2" },
    // { id: "unique-id3", component: "Video", content: "" },
  ]);

  // element list state (for rerender)
  const [elementListState, setElementListState] = useState<JsxElementList[]>(
    elementListRef.current
  );

  // element's animation API's { element-id : animation-API }
  const elementSpringObj = useRef<ElementSpringObj>({});

  // element's content
  const elementContentRef = useRef<ElementContentObj>({});

  // element content state
  const [elementContentState, setElementContentState] =
    useState<ElementContentObj>({});

  // view port spring
  const [viewPortSpring, viewPortSpringApi] = useSpring(() => ({
    scaleY: 1,
  }));

  // ================ getter functions ===================
  const getElementList = (type: "ref" | "state") => {
    if (type === "ref") {
      return elementListRef.current;
    } else if (type === "state") {
      return elementListState;
    } else {
      return [];
    }
  };

  const getElementContent = (type: "ref" | "state") => {
    if (type === "ref") {
      return elementContentRef.current;
    } else if (type === "state") {
      return elementContentState;
    } else {
      return {};
    }
  };
  // ================ setter functions ===================

  /* swapping elements 
      - drag (existing) elements and 
        move (vertically) to swap positions
  */
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

  /* add element 
      - drag and drop element selection on to viewport to add to element list
  */
  const addElement = (
    type: "Text" | "Image" | "Video" | "Other",
    insertIndex: number
  ) => {
    // generate new unique id
    const uniqueId = nanoid(10);
    const elementId = uniqueId + "-" + type;

    // update ref
    elementListRef.current = insertNewElement(
      elementId,
      type,
      insertIndex,
      elementListRef.current
    );

    // update state -> ref
    addElementContent(elementId, type);
    setElementListState(() => elementListRef.current);
  };

  /* delete element
      - remove element from element list
  */
  const deleteElement = (id: string) => {
    elementListRef.current = removeElement(id, elementListRef.current);
    delete elementContentRef.current[id];

    setElementContentState(() => elementContentRef.current);
    setElementListState(() => elementListRef.current);
  };

  /* add spring instance
      - add animation API to spring instance object
  */
  const addSpringInstance = (
    id: string,
    spring: ElementSpringType,
    updateYPos: (newYPos: number) => void,
    getYPos: () => number
  ) => {
    elementSpringObj.current[id] = { spring, updateYPos, getYPos };
  };

  // ------------------- content --------------------

  /* add element content
   */
  const addElementContent = (
    id: string,
    type: "Text" | "Image" | "Video" | "Other"
  ) => {
    elementContentRef.current[id] = { type, content: null };
    setElementContentState(() => elementContentRef.current);
  };

  /* update element's content
   */
  const updateElementContent = (id: string, content: string | File | null) => {
    try {
      if (!elementContentRef.current[id])
        return { status: false, error: "unable to identify element" };

      console.log(typeof content);
      if (
        elementContentRef.current[id].type === "Text" &&
        typeof content !== "string" &&
        content !== null
      )
        return { status: false, error: "wrong content type" };

      elementContentRef.current[id].content = content;
      setElementContentState(() => {
        return { ...elementContentRef.current };
      });
      return { status: true, error: "" };
    } catch (error) {
      return { status: false, error: "internal error" };
    }
  };

  // ================ animation functions ===================

  /* initial render
      - update viewport to currrent element state
  */
  const initialRender = () => {
    setAnimationElement(elementListState, elementSpringObj.current, false);
    viewPortSpringApi.start({
      scaleY: getViewPortHeight(elementListRef.current, false),
    });
  };

  // -------- focus ---------
  const [isFocus, setIsFocus] = useState("");
  const focus = useRef<{ id: string; reset: () => void } | null>(null);
  const getFocus = () => {
    return focus.current;
  };
  const onFocus = (id: string, reset: () => void) => {
    if (id === "") {
      focus.current = null;
      setIsFocus("");
      return;
    }

    if (focus.current !== null) {
      focus.current.reset();
      focus.current = null;
      setIsFocus("");
    }

    if (focus.current === null) {
      focus.current = { id, reset };
      setIsFocus(id);
    }
  };

  // -------- blur ---------
  const onBlur = () => {
    if (focus.current !== null) {
      console.log("blurring");
      focus.current.reset();
      focus.current = null;
      setIsFocus("");
    }
  };
  return (
    <BuildContext.Provider
      value={{
        addElement,
        deleteElement,
        getElementList,
        getElementContent,
        updateElementContent,
        viewPortSpring,
        initialRender,
        insertFunc: {
          hideInsert,
          addSpringInstance,
          swapElement,
        },
        focus: {
          value: getFocus,
          onFocus,
          onBlur,
        },
      }}
    >
      {children}
    </BuildContext.Provider>
  );
}
