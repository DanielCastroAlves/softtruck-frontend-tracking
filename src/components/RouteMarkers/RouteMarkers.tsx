import { Marker, Tooltip } from "react-leaflet";
import L from "leaflet";
import RoomIcon from "@mui/icons-material/Room";
import FlagIcon from "@mui/icons-material/Flag";
import ReactDOMServer from "react-dom/server";

interface RouteMarkersProps {
  coords: [number, number][];
  durations?: number[];
}

export function RouteMarkers({ coords }: RouteMarkersProps) {
  if (coords.length < 2) return null;

  const startIcon = L.divIcon({
    html: ReactDOMServer.renderToString(
      <RoomIcon style={{ color: "#4caf50", fontSize: 36 }} />
    ),
    className: "",
    iconSize: [36, 36],
    iconAnchor: [18, 36],
  });

  const endIcon = L.divIcon({
    html: ReactDOMServer.renderToString(
      <FlagIcon style={{ color: "#c03131ff", fontSize: 36 }} />
    ),
    className: "",
    iconSize: [36, 36],
    iconAnchor: [18, 36],
  });

  return (
    <>
      <Marker position={coords[0]} icon={startIcon}>
        <Tooltip direction="top" offset={[0, -20]}>
          Ponto de Partida
        </Tooltip>
      </Marker>

      <Marker position={coords[coords.length - 1]} icon={endIcon}>
        <Tooltip direction="top" offset={[0, -20]}>
          Destino Final
        </Tooltip>
      </Marker>
    </>
  );
}
