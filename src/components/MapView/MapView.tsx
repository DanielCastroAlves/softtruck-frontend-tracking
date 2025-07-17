import { MapContainer, TileLayer, Polyline } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import styles from "./MapView.module.scss";
import { useGps } from "../../contexts/GpsContext";
import type { LatLngExpression } from "leaflet";

const centerPosition: LatLngExpression = [-19.9, -43.9];

const MapView = () => {
  const { gpsPoints } = useGps();

  const routePositions: LatLngExpression[] = gpsPoints.map((p) => [
    p.latitude,
    p.longitude,
  ]);

  return (
    <div className={styles.mapContainer}>
      <MapContainer
        center={centerPosition}
        zoom={13}
        scrollWheelZoom={true}
        className={styles.map}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="&copy; OpenStreetMap contributors"
        />

        {routePositions.length > 0 && (
          <Polyline
            positions={routePositions}
            pathOptions={{ color: "blue", weight: 4 }}
          />
        )}
      </MapContainer>
    </div>
  );
};

export default MapView;
