import { ElementSpringType } from "@/components/build/buildContext/BuildContext";
import swap from "lodash-move";
import { nanoid } from "nanoid";

// main animation function
export function setAnimationElement(
  elementListOrder: JsxElementList[],
  elementApiObj: {
    [key: string]: {
      spring: ElementSpringType;
      updateYPos: (newYPos: number) => void;
      getYPos: () => void;
    };
  },
  showInsert = false,
  focus?: string,
  offset = 16
) {
  let yTracker = 0;
  for (let i = 0; i < elementListOrder.length; i++) {
    const elementDOM = document.getElementById(elementListOrder[i].id);
    if (!elementDOM) continue;
    const springApi = elementApiObj[elementListOrder[i].id];
    if (!springApi) continue;

    // console.log(elementListOrder[i].id);
    if (elementListOrder[i].id === "insert-here" && !showInsert) {
      springApi.spring.set({ opacity: 0 });
      continue;
    }

    const elementBCR = elementDOM.getBoundingClientRect();

    springApi.updateYPos(yTracker);
    if (focus !== elementListOrder[i].id) {
      springApi.spring.start({ y: yTracker, opacity: 1 });
    }

    yTracker += elementBCR.height + offset;
  }
}

// update viewport scale
export function getViewPortHeight(
  elementList: JsxElementList[],
  showInsert = false,
  offset = 16
) {
  let height = 16;

  const vpHeight = 160;

  for (let i = 0; i < elementList.length; i++) {
    if (elementList[i].id === "insert-here" && !showInsert) continue;

    const element = document.getElementById(elementList[i].id);
    if (!element) continue;

    height += element.getBoundingClientRect().height + offset;
  }

  const scaleRatio = height / vpHeight;

  if (scaleRatio < 1) {
    return 1;
  }

  return scaleRatio;
}

// array functions
// move elements
export function swapOrder(
  elementList: JsxElementList[],
  originIndex: number,
  newIndex: number
) {
  const newElementList = swap(
    elementList,
    originIndex,
    newIndex
  ) as JsxElementList[];
  return newElementList;
}

//insert elements
export function insertNewElement(
  elementId: string,
  type: "Text" | "Image" | "Video" | "Other",
  insertIndex: number,
  elementList: JsxElementList[]
) {
  const newElement = { id: elementId, component: type, content: "" };

  const newArray: JsxElementList[] = [
    ...elementList.slice(0, insertIndex),
    newElement,
    ...elementList.slice(insertIndex),
  ];

  return newArray;
}

export function removeElement(id: string, elementList: JsxElementList[]) {
  // find index
  const newElementList = elementList.filter((element) => element.id !== id);
  return newElementList;
}
