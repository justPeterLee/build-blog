import { createMarkers, createZone } from "@/lib/buildUtils/build-utils";
import { createContext, ReactNode, useEffect, useRef } from "react";

export type ModeType = "point" | "drag" | "active";

interface ElementSelectionContextType {
  zones: ZoneValues[] | null;
  markers: number[] | null;

  getZones: () => ZoneValues[] | null;
  getMarkers: () => number[] | null;

  getMode: () => ModeType;
  getFocus: () => string | null;

  function: {
    updateZones: (elementList: JsxElementList[]) => void;
    setMode: (newMode: ModeType) => void;
    setFocus: (newMode: JsxElementList) => void;
  };
}
export const ElementSelectionContext = createContext<
  ElementSelectionContextType | undefined
>(undefined);

export function ElementSelectionContextProvider({
  children,
}: {
  children: ReactNode;
}) {
  // zone detection (limits)
  // when zone detection function is called ->
  // use this reference value to determine the zone the element mid position is in
  const zones = useRef<ZoneValues[] | null>(null);

  // marker detetion (limits)
  // when a marker detection falls between the [mid position] range ->
  // call zone detection
  const markers = useRef<number[] | null>(null);

  const getZones = () => {
    return zones.current;
  };

  const getMarkers = () => {
    return markers.current;
  };

  const mode = useRef<ModeType>("point");
  const focus = useRef<string | null>(null);

  // mutation functions
  const updateZones = (elementList: JsxElementList[]) => {
    zones.current = createZone(elementList);
    markers.current = createMarkers(elementList);
  };

  const setMode = (newMode: ModeType) => {
    mode.current = newMode;
  };
  const setFocus = (newFocus: JsxElementList) => {
    focus.current = newFocus.id;
  };

  const getMode = () => mode.current;
  const getFocus = () => focus.current;

  const handleClick = () => {
    console.log("click");
  };

  return (
    <ElementSelectionContext.Provider
      value={{
        zones: zones.current,
        markers: markers.current,

        getZones,
        getMarkers,

        getMode,
        getFocus,

        function: { updateZones, setMode, setFocus },
      }}
    >
      {children}
    </ElementSelectionContext.Provider>
  );
}
