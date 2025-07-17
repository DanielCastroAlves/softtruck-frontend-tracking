import { createContext, useContext, useState, type ReactNode } from 'react';

interface GpsContextType {
  selectedRouteIndex: number;
  setSelectedRouteIndex: (index: number) => void;
}

const GpsContext = createContext<GpsContextType | undefined>(undefined);

export const GpsProvider = ({ children }: { children: ReactNode }) => {
  const [selectedRouteIndex, setSelectedRouteIndex] = useState(0); // padrão: rota 0

  return (
    <GpsContext.Provider value={{ selectedRouteIndex, setSelectedRouteIndex }}>
      {children}
    </GpsContext.Provider>
  );
};

export const useGps = () => {
  const context = useContext(GpsContext);
  if (!context) {
    throw new Error('useGps deve ser usado dentro de um GpsProvider');
  }
  return context;
};
