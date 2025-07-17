import { MapContainer, TileLayer, Polyline, useMap } from "react-leaflet";
import { latLngBounds } from "leaflet";              // ← importe isto
import { useGps } from "../../contexts/GpsContext";
import { getRouteByIndex } from "../../services/useRouteData";
import styles from "./MapView.module.scss";
import { useEffect, useState } from "react";
import type { LatLngExpression } from "leaflet";

function SnappedRoute({ points }: { points: LatLngExpression[] }) {
  const map = useMap();

  useEffect(() => {
    if (points.length) {
      // cria um LatLngBounds a partir do array de pontos
      const bounds = latLngBounds(points);
      map.fitBounds(bounds, { padding: [20, 20] });
    }
  }, [points, map]);

  return points.length > 0
    ? <Polyline positions={points} color="blue" weight={4} />
    : null;
}

export default function MapView() {
  const { selectedRouteIndex } = useGps();
  const route = getRouteByIndex(selectedRouteIndex);
  const [roadCoords, setRoadCoords] = useState<LatLngExpression[]>([]);

  useEffect(() => {
    if (!route) {
      setRoadCoords([]);
      return;
    }

    const moving = route.gps.filter(p => p.speed != null && p.speed > 0.5);
    if (moving.length < 2) {
      setRoadCoords([]);
      return;
    }

    const coordsParam = moving
      .map(p => `${p.longitude},${p.latitude}`)
      .join(";");

    const url = `https://router.project-osrm.org/route/v1/driving/${coordsParam}?overview=full&geometries=geojson`;

    fetch(url)
      .then(res => res.json())
      .then(data => {
        const snapped: [number, number][] = data.routes?.[0]?.geometry?.coordinates || [];
        const latlngs = snapped.map(
          ([lng, lat]) => [lat, lng] as LatLngExpression
        );
        setRoadCoords(latlngs);
      })
      .catch(err => {
        console.error("Erro ao buscar rota OSRM", err);
        setRoadCoords([]);
      });
  }, [route]);

  const center: LatLngExpression = roadCoords[0] || [-23.963214, -46.28054];

  return (
    <div className={styles.mapContainer}>
      <MapContainer
        center={center}
        zoom={13}
        scrollWheelZoom
        className={styles.map}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="&copy; OpenStreetMap contributors"
        />
        <SnappedRoute points={roadCoords} />
      </MapContainer>
    </div>
  );
}
