export function insertElement(
  elementSelect: HTMLDivElement,
  prevSelectMid: number | null,
  zones: ZoneValues[],
  markers: number[],
  initial: boolean
) {
  let zoneDetect = null;

  const viewPort = document.getElementById("viewPort-view");
  const selectPos = elementSelect.getBoundingClientRect();
  const selectMid = selectPos.top + selectPos.height / 2;

  if (!viewPort) return null;

  // check if selectedPos is in viewPort (not exact)
  const viewPortPos = viewPort.getBoundingClientRect();
  const isInViewPort = inViewPort(viewPortPos, selectPos);

  if (initial && isInViewPort) {
    zoneDetect = zoneDetection(selectMid, zones);
  }

  if (prevSelectMid && isInViewPort) {
    if (markerDetection(markers, prevSelectMid, selectMid)) {
      zoneDetect = zoneDetection(selectMid, zones);
    }
  }

  return zoneDetect;
}

export function inViewPort(viewPortPos: DOMRect | null, selectPos: DOMRect) {
  let viewPort = viewPortPos;
  if (!viewPort) {
    const vp = document.getElementById("viewPort-view");
    if (!vp) return false;
    viewPort = vp.getBoundingClientRect();
  }

  const leftBound = viewPort.left - 5 < selectPos.right + 5;
  const rightBound = viewPort.right + 5 > selectPos.left - 5;
  const topBound = viewPort.top - 5 < selectPos.bottom + 5;
  const botBound = viewPort.bottom + 5 > selectPos.top - 5;

  if (leftBound && rightBound && topBound && botBound) {
    return true;
  } else {
    return false;
  }
}

export function createZone(elementList: JsxElementList[]) {
  // initiate local values
  const zoneValues: ZoneValues[] = [];

  const viewPort = document.getElementById("viewPort-view");
  if (!viewPort) return [];

  // create deafult zone
  zoneValues.push({
    limit: viewPort.getBoundingClientRect().bottom,
    index: elementList.length - 1,
    id: "bottom",
  });

  // create element zones
  let yTracker = viewPort.getBoundingClientRect().top;
  let previousHeight = 0;

  for (let i = 0; i < elementList.length; i++) {
    const elementId = elementList[i].id;
    if (elementId === "insert-here") continue;

    const element = document.getElementById(elementId);
    if (!element) continue;

    const halfHeight = element.getBoundingClientRect().height / 2;

    if (i === 0) {
      yTracker += halfHeight + 16;
      // previousHeight = halfHeight
    } else {
      yTracker += previousHeight + halfHeight + 16;
      // previousHeight = halfHeight
    }
    previousHeight = halfHeight;

    zoneValues.push({
      limit: yTracker,
      index: 0,
      id: elementList[i].id,
    });
  }

  // sort boundaries
  zoneValues.sort((a, b) => a.limit - b.limit);

  for (let i = 0; i < zoneValues.length; i++) {
    zoneValues[i].index = i;
  }
  return zoneValues;
}

export function zoneDetection(selectedPos: number, zoneValues: ZoneValues[]) {
  let index = null;

  if (zoneValues.length === 1) {
    return { index: zoneValues[0].index, id: zoneValues[0].id };
  }
  for (let i = 0; i < zoneValues.length; i++) {
    if (selectedPos < zoneValues[i].limit) {
      index = { index: zoneValues[i].index, id: zoneValues[i].id };
      break;
    }

    if (zoneValues.length - 1 === i) {
      //   console.log(i);
    }
  }

  return index;
}

export function createMarkers(elementList: JsxElementList[]) {
  const markers = [];
  const viewPort = document.getElementById("viewPort-view");
  if (!viewPort) return [];
  let yTracker = viewPort.getBoundingClientRect().top;

  for (let i = 0; i < elementList.length; i++) {
    if (elementList[i].id === "insert-here") continue;
    const element = document.getElementById(elementList[i].id);
    if (!element) continue;

    markers.push(yTracker + 16);
    yTracker += 16 + element.getBoundingClientRect().height;

    markers.push(yTracker);
  }

  return markers;
}

function markerDetection(markers: number[], min: number, max: number) {
  return (
    markers.some((num) => num >= min && num <= max) ||
    markers.some((num) => num <= min && num >= max)
  );
}

export function initialNewRender(elementList: JsxElementList[], id: string) {
  // get index of element in list
  const index = elementList.findIndex((element) => element.id === id);

  if (index === 0) {
    // default
    return 0;
  }

  const viewPort = document.getElementById("viewPort-view");
  const prevElement = document.getElementById(elementList[index - 1].id);
  if (!prevElement || !viewPort) return 0;

  const yPosOrigin =
    prevElement.getBoundingClientRect().bottom -
    viewPort.getBoundingClientRect().top;

  return yPosOrigin;
}
