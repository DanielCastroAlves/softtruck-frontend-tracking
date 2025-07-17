// src/components/MapView/MapView.tsx
import { useEffect, useRef, useState } from "react";
import {
  MapContainer,
  TileLayer,
  Polyline,
  useMap,
  useMapEvents,
} from "react-leaflet";
import { type LatLngExpression } from "leaflet";
import { point as turfPoint, lineString } from "@turf/helpers";
import along from "@turf/along";
import bearing from "@turf/bearing";
import length from "@turf/length";
import { useGps } from "../../contexts/GpsContext";
import { getRouteByIndex } from "../../services/useRouteData";
import Car from "../Car/Car";
import styles from "./MapView.module.scss";
import DashboardPanel from "../Dashboard/DashboardPanel";

// 🔁 Suavização de ângulo
function smoothAngle(prev: number, next: number, factor = 0.2) {
  const diff = ((((next - prev) % 360) + 540) % 360) - 180;
  return (prev + diff * factor + 360) % 360;
}

// 🚫 Parar follow quando o usuário mexer no mapa
function StopFollowOnZoom({ onStop }: { onStop: () => void }) {
  useMapEvents({
    zoomstart: onStop,
    dragstart: onStop,
  });
  return null;
}

// 🎯 Seguir o carro no mapa
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
  const { selectedRouteIndex, setSelectedRouteIndex } = useGps();
  const route = getRouteByIndex(selectedRouteIndex);

  const [speedKmh, setSpeedKmh] = useState(10);
  const [followCar, setFollowCar] = useState(true);
  const [carPosition, setCarPosition] = useState<[number, number] | null>(null);
  const [carAngle, setCarAngle] = useState(0);
  const [roadCoords, setRoadCoords] = useState<[number, number][]>([]);

  const animationRef = useRef<number | null>(null);
  const distanceRef = useRef(0);
  const prevTimeRef = useRef<number | null>(null);
  const angleRef = useRef(0);
  const totalDistanceRef = useRef(0);
  const routeLineRef = useRef<any>(null);

  // 📡 Carregar e preparar a rota
  useEffect(() => {
    if (!route) return;

    const rawPoints = route.gps
      .filter((p) => p.speed! > 0.5)
      .map((p) => [p.longitude, p.latitude]) as [number, number][];

    if (rawPoints.length < 2) return;

    const coordsParam = rawPoints
      .map(([lon, lat]) => `${lon},${lat}`)
      .join(";");

    fetch(
      `https://router.project-osrm.org/route/v1/driving/${coordsParam}?overview=full&geometries=geojson`
    )
      .then((res) => res.json())
      .then((data) => {
        const snapped: [number, number][] =
          data.routes?.[0]?.geometry?.coordinates || rawPoints;

        setRoadCoords(snapped.map(([lng, lat]) => [lat, lng]));

        const snappedLine = lineString(snapped);
        routeLineRef.current = snappedLine;
        totalDistanceRef.current = length(snappedLine, { units: "kilometers" });

        distanceRef.current = 0;
        prevTimeRef.current = null;
        angleRef.current = 0;
      });
  }, [route]);

  // 🚗 Animar o carro ao longo da rota
  useEffect(() => {
    if (!routeLineRef.current) return;

    const animate = (ts: number) => {
      if (!prevTimeRef.current) prevTimeRef.current = ts;
      const delta = (ts - prevTimeRef.current) / 1000;
      prevTimeRef.current = ts;

      const speed = speedKmh / 3600;
      distanceRef.current += speed * delta;

      if (distanceRef.current > totalDistanceRef.current) {
        cancelAnimationFrame(animationRef.current!);
        return;
      }

      const curr = along(routeLineRef.current, distanceRef.current, {
        units: "kilometers",
      });
      const prev = along(
        routeLineRef.current,
        Math.max(distanceRef.current - 0.0001, 0),
        { units: "kilometers" }
      );
      const next = along(
        routeLineRef.current,
        Math.min(distanceRef.current + 0.0001, totalDistanceRef.current),
        { units: "kilometers" }
      );

      const rawAngle = bearing(
        turfPoint(prev.geometry.coordinates),
        turfPoint(next.geometry.coordinates)
      );
      angleRef.current = smoothAngle(angleRef.current, rawAngle);

      const [lng, lat] = curr.geometry.coordinates;
      setCarPosition([lat, lng]);
      setCarAngle(angleRef.current);

      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);
    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, [speedKmh]);

  const center: LatLngExpression = roadCoords[0] || [-23.963214, -46.28054];

return (
  <div className={styles.wrapper}>
    <div className={styles.mapArea}>
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

        <StopFollowOnZoom onStop={() => setFollowCar(false)} />

        {carPosition && (
          <>
            <FollowCarControl position={carPosition} followCar={followCar} />
            <Car position={carPosition} angle={carAngle} />
          </>
        )}
      </MapContainer>
    </div>

    <div className={styles.dashboardArea}>
      <DashboardPanel
        speedKmh={speedKmh}
        onSpeedChange={(_: Event, val: number | number[]) =>
          setSpeedKmh(Array.isArray(val) ? val[0] : val)
        }
        currentRouteIndex={selectedRouteIndex}
        totalRoutes={5}
        onNextRoute={() => {
          setSelectedRouteIndex((selectedRouteIndex + 1) % 5);
        }}
        onCenterMap={() => setFollowCar(true)}
      />
    </div>
  </div>
);

}
