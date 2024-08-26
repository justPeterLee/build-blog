export function insertElement(
  elementSelect: HTMLDivElement,
  //   elementList: JsxElementList[],
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

  if (!initial && isInViewPort) {
    zoneDetect = zoneDetection(selectMid, zones);
  }

  if (prevSelectMid && isInViewPort && initial) {
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
    index: elementList.length,
  });

  // create element zones
  for (let i = 0; i < elementList.length; i++) {
    const elementId = elementList[i].id;
    if (elementId === "insert-here") continue;

    const element = document.getElementById(elementId);
    if (!element) continue;

    const midPoint =
      element.getBoundingClientRect().top +
      element.getBoundingClientRect().height / 2;

    zoneValues.push({ limit: midPoint, index: i });
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

  for (let i = 0; i < zoneValues.length; i++) {
    if (selectedPos < zoneValues[i].limit) {
      index = zoneValues[i].index;
      break;
    }
  }

  return index;
}

export function createMarkers(elementList: JsxElementList[]) {
  const markers = [];
  for (let i = 0; i < elementList.length; i++) {
    if (elementList[i].id === "insert-here") continue;
    const element = document.getElementById(elementList[i].id);
    if (!element) continue;

    markers.push(element.getBoundingClientRect().top + 20);
    markers.push(element.getBoundingClientRect().bottom - 20);
  }

  return markers;
}

function markerDetection(markers: number[], min: number, max: number) {
  return (
    markers.some((num) => num >= min && num <= max) ||
    markers.some((num) => num <= min && num >= max)
  );
}
