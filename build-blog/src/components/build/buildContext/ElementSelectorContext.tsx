import { createMarkers, createZone } from "@/lib/buildUtils/build-utils";
import { createContext, ReactNode, useRef } from "react";

interface ElementSelectionContextType {
  zones: ZoneValues[] | null;
  markers: number[] | null;

  getZones: () => ZoneValues[] | null;
  getMarkers: () => number[] | null;

  function: {
    updateZones: (elementList: JsxElementList[]) => void;
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

  // mutation functions
  const updateZones = (elementList: JsxElementList[]) => {
    zones.current = createZone(elementList);
    markers.current = createMarkers(elementList);
  };

  return (
    <ElementSelectionContext.Provider
      value={{
        zones: zones.current,
        markers: markers.current,

        getZones,
        getMarkers,

        function: { updateZones },
      }}
    >
      {children}
    </ElementSelectionContext.Provider>
  );
}
