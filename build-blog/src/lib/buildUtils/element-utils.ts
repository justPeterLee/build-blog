import { ElementSpringType } from "@/components/build/buildContext/BuildContext";
import { SpringRef } from "@react-spring/web";
import swap from "lodash-move";
export function getAccYPos(
  index: number,
  elementList: JsxElementList[],
  offset = 16,
  showInsert = true
) {
  let Ypos = 0;
  for (let i = 0; i < index; i++) {
    if (index === 0) break;
    if (!showInsert && elementList[i].id === "insert-here") continue;

    const element = document.getElementById(elementList[i].id);
    if (!element) continue;

    // console.log(elementList[index]);

    if (elementList[index].id === "insert-here" && i === index - 1) {
      Ypos += element.getBoundingClientRect().height;
    } else if (elementList[i].id === "insert-here") {
      Ypos += element.getBoundingClientRect().height;
      if (i > 0) {
        Ypos -= offset;
      }
    } else {
      Ypos += element.getBoundingClientRect().height + offset;
    }
  }

  return Ypos;
}

export function switchOrder(
  elementList: JsxElementList[],
  order: number[],
  originIndex: number,
  newIndex: number
) {
  const newElementList = swap(elementList, originIndex, newIndex);
  const newOrder = swap(order, originIndex, newIndex);
  return { elementList: newElementList, order: newOrder };
}

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

export function fn(
  elementList: JsxElementList[],
  order: number[],
  showInsert = false,
  offset = 16
) {
  return (index: number) => {
    const trueIndex = order.indexOf(index);

    // default show insert state
    if (elementList[trueIndex].id === "insert-here" && !showInsert) {
      return { y: 0, visibility: "hidden" };
    }

    // first index of array
    if (trueIndex === 0) {
      return { y: 0, visibility: "visible" };
    }

    // set previous element to index previous to current index (current: 2 -> previous: 1)
    let prevElement: HTMLElement | null = null;

    // don't accound for insert here element if (showInsert === false)
    if (elementList[trueIndex - 1].id === "insert-here" && !showInsert) {
      // if (showInsert === false && previousElement === "show-insert") -> check condition to make sure not 2nd in array
      if (trueIndex === 1) {
        return { y: 0, visibility: "visible" };
      } else {
        prevElement = document.getElementById(elementList[trueIndex - 2].id);
      }
    } else {
      prevElement = document.getElementById(elementList[trueIndex - 1].id);
    }

    if (!prevElement) return { y: 0, visibility: "hidden" };

    // ----------- independent y pos getter ----------
    const accYpos = getAccYPos(trueIndex, elementList, offset, showInsert);
    return { y: accYpos, visibility: "visible" };
  };
}

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

export function setAnimationElement(
  elementListOrder: JsxElementList[],
  elementApiObj: {
    [key: string]: ElementSpringType;
  },
  showInsert = false,
  offset = 16
) {
  let yTracker = 0;
  for (let i = 0; i < elementListOrder.length; i++) {
    const elementDOM = document.getElementById(elementListOrder[i].id);
    if (!elementDOM) continue;
    const springApi = elementApiObj[elementListOrder[i].id];
    if (!springApi) continue;

    if (elementListOrder[i].id === "insert-here" && !showInsert) {
      springApi.set({ opacity: 0 });
      continue;
    }

    const elementBCR = elementDOM.getBoundingClientRect();

    springApi.start({ y: yTracker, opacity: 1 });
    yTracker += elementBCR.height + offset;
    // console.log(i);
  }
}

export function swapElementAnimation(
  focusId: string,
  swapId: string,
  swapSpring: ElementSpringType,
  focusSpring?: ElementSpringType
) {
  console.log("run");
  const viewPort = document.getElementById("jsxViewPort");
  const swapElement = document.getElementById(swapId);
  const focusElement = document.getElementById(focusId);

  if (!swapElement || !focusElement || !viewPort) return;

  const viewPortBCR = viewPort.getBoundingClientRect();
  const swapBCR = swapElement.getBoundingClientRect();
  const focusBCR = focusElement.getBoundingClientRect();

  const currentYPos = swapBCR.top - viewPortBCR.top - 16;
  const focusYPos = focusBCR.top - viewPortBCR.top - 16;

  // swapSpring.set({ y: focusYPos });

  // if (focusSpring) {
  //   // console.log(currentYPos);
  //   focusSpring.set({ y: currentYPos + 16 });
  // }
}
