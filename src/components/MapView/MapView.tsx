import { useEffect, useRef, useState } from "react";
import {
  MapContainer,
  TileLayer,
  Polyline,
} from "react-leaflet";
import { type LatLngExpression } from "leaflet";
import { point as turfPoint } from "@turf/helpers";
import along from "@turf/along";
import bearing from "@turf/bearing";

import { useGps } from "../../contexts/GpsContext";
import { getRouteByIndex } from "../../services/useRouteData";
import { fetchSnappedRoute } from "../../utils/fetchRouteSnap";
import { DISTANCE_UNIT, DEFAULT_CENTER } from "../../config/map";
import { smoothAngle } from "../../utils/angle";

import Car from "../Car/Car";
import DashboardPanel from "../Dashboard/DashboardPanel";
import FollowCarControl from "../FollowCarControl/FollowCarControl";
import StopFollowOnZoom from "../StopFollowOnZoom/StopFollowOnZoom";

import styles from "./MapView.module.scss";

export default function MapView() {
  const { selectedRouteIndex, setSelectedRouteIndex } = useGps();
  const route = getRouteByIndex(selectedRouteIndex);

  const [speedKmh, setSpeedKmh] = useState(10);
  const speedRef = useRef(speedKmh);

  const [followCar, setFollowCar] = useState(true);
  const [carPosition, setCarPosition] = useState<[number, number] | null>(null);
  const [carAngle, setCarAngle] = useState(0);
  const [roadCoords, setRoadCoords] = useState<[number, number][]>([]);
  const [tempoParado, setTempoParado] = useState(0);
  const [tempoRodando, setTempoRodando] = useState(0);

  const animationRef = useRef<number | null>(null);
  const distanceRef = useRef(0);
  const prevTimeRef = useRef<number | null>(null);
  const angleRef = useRef(0);
  const totalDistanceRef = useRef(0);
  const routeLineRef = useRef<any>(null);

  const center: LatLngExpression = roadCoords[0] || DEFAULT_CENTER;

  useEffect(() => {
    speedRef.current = speedKmh;
  }, [speedKmh]);

  useEffect(() => {
    if (!route) return;

    const rawPoints = route.gps
      .filter((p) => p.speed! > 0.5)
      .map((p) => [p.longitude, p.latitude]) as [number, number][];

    if (rawPoints.length < 2) return;

    fetchSnappedRoute(rawPoints).then(({ snappedCoords, snappedLine, totalKm }) => {
      setRoadCoords(snappedCoords);
      routeLineRef.current = snappedLine;
      totalDistanceRef.current = totalKm;

      distanceRef.current = 0;
      prevTimeRef.current = null;
      angleRef.current = 0;

      handleReset();
    });
  }, [route]);

  function animate(ts: number) {
    if (!routeLineRef.current) return;

    if (!prevTimeRef.current) prevTimeRef.current = ts;
    const delta = (ts - prevTimeRef.current) / 1000;
    prevTimeRef.current = ts;

    const speed = speedRef.current / 3600;
    distanceRef.current += speed * delta;

    if (speedRef.current < 2) {
      setTempoParado((prev) => prev + delta);
    } else {
      setTempoRodando((prev) => prev + delta);
    }

    if (distanceRef.current > totalDistanceRef.current) {
      cancelAnimationFrame(animationRef.current!);
      animationRef.current = null;
      return;
    }

    const curr = along(routeLineRef.current, distanceRef.current, DISTANCE_UNIT);
    const prev = along(
      routeLineRef.current,
      Math.max(distanceRef.current - 0.0001, 0),
      DISTANCE_UNIT
    );
    const next = along(
      routeLineRef.current,
      Math.min(distanceRef.current + 0.0001, totalDistanceRef.current),
      DISTANCE_UNIT
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
  }

  function handlePlay() {
    if (!animationRef.current) {
      prevTimeRef.current = null;
      animationRef.current = requestAnimationFrame(animate);
    }
  }

  function handlePause() {
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
      animationRef.current = null;
    }
  }

  function handleReset() {
    distanceRef.current = 0;
    prevTimeRef.current = null;
    angleRef.current = 0;
    setTempoParado(0);
    setTempoRodando(0);
    if (routeLineRef.current) {
      const [lng, lat] = routeLineRef.current.geometry.coordinates[0];
      setCarPosition([lat, lng]);
      setCarAngle(0);
    }
  }

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
          onNextRoute={() =>
            setSelectedRouteIndex((selectedRouteIndex + 1) % 5)
          }
          onCenterMap={() => setFollowCar(true)}
          tempoParado={tempoParado}
          tempoRodando={tempoRodando}
          angulo={carAngle}
          onPlay={handlePlay}
          onPause={handlePause}
          onReset={handleReset}
        />
      </div>
    </div>
  );
}
