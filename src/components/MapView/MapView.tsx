// src/components/MapView/MapView.tsx
import { useEffect, useRef, useState } from "react";
import {
  MapContainer,
  TileLayer,
  Polyline,
  useMap,
  useMapEvents,
} from "react-leaflet";
import { latLngBounds, type LatLngExpression } from "leaflet";
import { Slider } from "@mui/material";
import { point as turfPoint, lineString } from "@turf/helpers";
import along from "@turf/along";
import bearing from "@turf/bearing";
import length from "@turf/length";
import { useGps } from "../../contexts/GpsContext";
import { getRouteByIndex } from "../../services/useRouteData";
import Car from "../Car/Car";
import styles from "./MapView.module.scss";

// 🔁 Suavização do ângulo
function smoothAngle(prev: number, next: number, factor = 0.2) {
  const diff = ((((next - prev) % 360) + 540) % 360) - 180;
  return (prev + diff * factor + 360) % 360;
}

// componente que pára de seguir o carro quando o usuário dá zoom/arrasta
function StopFollowOnZoom({ onStop }: { onStop: () => void }) {
  useMapEvents({
    zoomstart: onStop,
    dragstart: onStop,
  });
  return null;
}

// componente que centraliza a câmera no carro (apenas se followCar=true)
function FollowCarControl({
  position,
  followCar,
}: {
  position: LatLngExpression;
  followCar: boolean;
}) {
  const map = useMap();
  useEffect(() => {
    if (followCar) {
      map.setView(position, 17, { animate: true });
    }
  }, [position, followCar, map]);
  return null;
}

export default function MapView() {
  const { selectedRouteIndex } = useGps();
  const route = getRouteByIndex(selectedRouteIndex);

  // slider de velocidade (km/h)
  const [speedKmh, setSpeedKmh] = useState(10);
  const handleSpeedChange = (_: any, value: number | number[]) => {
    setSpeedKmh(Array.isArray(value) ? value[0] : value);
  };

  // flag de follow automático
  const [followCar, setFollowCar] = useState(true);

  const [carPosition, setCarPosition] = useState<[number, number] | null>(
    null
  );
  const [carAngle, setCarAngle] = useState(0);
  const [roadCoords, setRoadCoords] = useState<[number, number][]>([]);

  const animationRef = useRef<number | null>(null);
  const distanceRef = useRef(0);
  const prevTimeRef = useRef<number | null>(null);
  const angleRef = useRef(0);
  const totalDistanceRef = useRef(0);

  // prepara rota e animação
  useEffect(() => {
    if (!route) return;

    const gpsPoints = route.gps
      .filter((p) => p.speed! > 0.5)
      .map((p) => [p.longitude, p.latitude]) as [number, number][];

    if (gpsPoints.length < 2) return;

    const routeLine = lineString(gpsPoints);
    const totalDist = length(routeLine, { units: "kilometers" });
    totalDistanceRef.current = totalDist;

    setRoadCoords(gpsPoints.map(([lng, lat]) => [lat, lng]));
    distanceRef.current = 0;
    prevTimeRef.current = null;
    angleRef.current = 0;

    // animação
    const animate = (ts: number) => {
      if (!prevTimeRef.current) prevTimeRef.current = ts;
      const delta = (ts - prevTimeRef.current) / 1000;
      prevTimeRef.current = ts;

      // usa velocidade do slider
      const speed = speedKmh / 3600; // km/s
      distanceRef.current += speed * delta;

      if (distanceRef.current > totalDist) {
        cancelAnimationFrame(animationRef.current!);
        return;
      }

      const current = along(routeLine, distanceRef.current, {
        units: "kilometers",
      });
      const prev = along(
        routeLine,
        Math.max(distanceRef.current - 0.0001, 0),
        { units: "kilometers" }
      );
      const next = along(
        routeLine,
        Math.min(distanceRef.current + 0.0001, totalDist),
        { units: "kilometers" }
      );

      const rawAngle = bearing(
        turfPoint(prev.geometry.coordinates),
        turfPoint(next.geometry.coordinates)
      );
      angleRef.current = smoothAngle(angleRef.current, rawAngle);

      const [lng, lat] = current.geometry.coordinates;
      setCarPosition([lat, lng]);
      setCarAngle(angleRef.current);

      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);
    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, [route, speedKmh]);

  const center: LatLngExpression = roadCoords[0] || [-23.963214, -46.28054];

  return (
    <div className={styles.mapContainer}>
      {/* controles */}
      <div
        style={{
          position: "absolute",
          top: 10,
          left: 10,
          zIndex: 1000,
          background: "rgba(255,255,255,0.9)",
          padding: 8,
          borderRadius: 4,
        }}
      >
        <div style={{ marginBottom: 8 }}>
          <label>Velocidade: {speedKmh} km/h</label>
          <Slider
            min={1}
            max={100}
            value={speedKmh}
            onChange={handleSpeedChange}
            style={{ width: 180, marginTop: 4 }}
          />
        </div>
        <button onClick={() => setFollowCar(true)}>🔁 Centralizar</button>
      </div>

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

        {roadCoords.length > 1 && (
          <Polyline positions={roadCoords} color="blue" weight={4} />
        )}

        {/* para parar o follow quando o usuário zoom/arrasta */}
        <StopFollowOnZoom onStop={() => setFollowCar(false)} />

        {/* somente segue o carro se followCar === true */}
        {carPosition && (
          <FollowCarControl position={carPosition} followCar={followCar} />
        )}

        {/* marcador do carro */}
        {carPosition && <Car position={carPosition} angle={carAngle} />}
      </MapContainer>
    </div>
  );
}
