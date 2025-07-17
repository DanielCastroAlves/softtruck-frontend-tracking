// src/components/MapView/MapView.tsx
import { MapContainer, TileLayer, Polyline, useMap } from "react-leaflet";
import { latLngBounds, type LatLngExpression } from "leaflet";
import { useGps } from "../../contexts/GpsContext";
import { getRouteByIndex } from "../../services/useRouteData";
import Car from "../Car/Car";
import styles from "./MapView.module.scss";
import { useEffect, useState } from "react";
import bearing from "@turf/bearing";

// centraliza e ajusta zoom no carro sempre que ele se move
function FollowCar({ position }: { position: LatLngExpression }) {
  const map = useMap();
  useEffect(() => {
    // define view no carro com zoom 17 (ajuste como quiser)
    map.setView(position, 17, { animate: true });
  }, [position, map]);
  return null;
}

// desenha a rota “snapada” e faz o fitBounds inicial
function SnappedRoute({ points }: { points: LatLngExpression[] }) {
  const map = useMap();
  useEffect(() => {
    if (points.length > 1) {
      const bounds = latLngBounds(points);
      map.fitBounds(bounds, { padding: [20, 20] });
    }
  }, [points, map]);
  return points.length > 0 ? (
    <Polyline positions={points} color="blue" weight={4} />
  ) : null;
}

export default function MapView() {
  const { selectedRouteIndex } = useGps();
  const route = getRouteByIndex(selectedRouteIndex);

  const [roadCoords, setRoadCoords] = useState<[number, number][]>([]);
  const [carPosition, setCarPosition] = useState<[number, number] | null>(null);
  const [carAngle, setCarAngle] = useState(0);
  const [carIndex, setCarIndex] = useState(0);

  // 1) pega a rota do OSRM
  useEffect(() => {
    if (!route) return setRoadCoords([]);

    const moving = route.gps.filter((p) => p.speed! > 0.5);
    if (moving.length < 2) return setRoadCoords([]);

    const coordsParam = moving.map((p) => `${p.longitude},${p.latitude}`).join(";");
    const url = `https://router.project-osrm.org/route/v1/driving/${coordsParam}?overview=full&geometries=geojson`;

    fetch(url)
      .then((r) => r.json())
      .then((data) => {
        const snapped: [number, number][] =
          data.routes?.[0]?.geometry?.coordinates || [];
        const pts = snapped.map(([lng, lat]) => [lat, lng] as [number, number]);
        setRoadCoords(pts);
        // inicia carro
        if (pts.length > 1) {
          setCarIndex(0);
          setCarPosition(pts[0]);
          setCarAngle(
            bearing(
              { type: "Point", coordinates: [pts[0][1], pts[0][0]] },
              { type: "Point", coordinates: [pts[1][1], pts[1][0]] }
            )
          );
        }
      })
      .catch(() => setRoadCoords([]));
  }, [route]);

  // 2) anima o carro ao longo dos pontos
  useEffect(() => {
    if (roadCoords.length < 2) return;
    const iv = setInterval(() => {
      setCarIndex((i) =>
        i < roadCoords.length - 2 ? i + 1 : (clearInterval(iv), i)
      );
    }, 100);
    return () => clearInterval(iv);
  }, [roadCoords]);

  // 3) atualiza posição+ângulo a cada índice
  useEffect(() => {
    if (roadCoords.length < 2 || carIndex >= roadCoords.length - 1) return;
    const cur = roadCoords[carIndex],
      nxt = roadCoords[carIndex + 1];
    setCarPosition(cur);
    setCarAngle(
      bearing(
        { type: "Point", coordinates: [cur[1], cur[0]] },
        { type: "Point", coordinates: [nxt[1], nxt[0]] }
      )
    );
  }, [carIndex, roadCoords]);

  // ponto inicial (fallback)
  const center: LatLngExpression = roadCoords[0] || [-23.963214, -46.28054];

  return (
    <div className={styles.mapContainer}>
      <MapContainer
        center={center}
        zoom={17}         
        scrollWheelZoom
        className={styles.map}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="&copy; OpenStreetMap contributors"
        />
        <SnappedRoute points={roadCoords} />
        {carPosition && <FollowCar position={carPosition} />}
        {carPosition && <Car position={carPosition} angle={carAngle} />}
      </MapContainer>
    </div>
  );
}
