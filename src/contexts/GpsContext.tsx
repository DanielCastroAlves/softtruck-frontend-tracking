import { createContext, useContext, useState, type ReactNode } from "react";

import { getRouteByIndex } from "../services/useRouteData";
import type { GpsPoint } from "../services/useRouteData";

interface GpsContextType {
  selectedRouteIndex: number;
  setSelectedRouteIndex: (index: number) => void;
  gpsPoints: GpsPoint[];
}

const GpsContext = createContext<GpsContextType | undefined>(undefined);

export const GpsProvider = ({ children }: { children: ReactNode }) => {
  const [selectedRouteIndex, setSelectedRouteIndex] = useState(0);
  const route = getRouteByIndex(selectedRouteIndex);
  const gpsPoints = route?.gps || [];

  return (
    <GpsContext.Provider
      value={{ selectedRouteIndex, setSelectedRouteIndex, gpsPoints }}
    >
      {children}
    </GpsContext.Provider>
  );
};

export const useGps = () => {
  const context = useContext(GpsContext);
  if (!context) {
    throw new Error("useGps deve ser usado dentro de um GpsProvider");
  }
  return context;
};
