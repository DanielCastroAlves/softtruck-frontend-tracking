import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "leaflet/dist/leaflet.css";
import "./i18n";

import { GpsProvider } from "./contexts/GpsContext";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <GpsProvider>
      <App />
    </GpsProvider>
  </StrictMode>
);
