import { useEffect, useRef, useState } from "react";
import { MapContainer, TileLayer, Polyline } from "react-leaflet";
import { type LatLngExpression } from "leaflet";
import { useGps } from "../../contexts/GpsContext";
import { getRouteByIndex } from "../../services/useRouteData";
import { fetchSnappedRoute } from "../../utils/fetchRouteSnap";

import {
  Car,
  DashboardPanel,
  FollowCarControl,
  RouteMarkers,
  StopFollowOnZoom,
} from "../index";

import styles from "./MapView.module.scss";
import { useCarAnimation } from "../../hooks/useCarAnimation";
import { Box } from "@mui/material";
import { RouteSelector } from "../Dashboard/components/index";

export default function MapView() {
  const { selectedRouteIndex, setSelectedRouteIndex } = useGps();
  const route = getRouteByIndex(selectedRouteIndex);

  const [speedKmh, setSpeedKmh] = useState(10);
  const speedRef = useRef(speedKmh);

  const [followCar, setFollowCar] = useState(true);
  const [roadCoords, setRoadCoords] = useState<[number, number][]>([]);
  const [tempoParado, setTempoParado] = useState(0);
  const [tempoRodando, setTempoRodando] = useState(0);
  const [carAngle, setCarAngle] = useState(0);
  const [carPosition, setCarPosition] = useState<[number, number] | null>(null);

  const {
    routeLineRef,
    totalDistanceRef,
    animationRef,
    prevTimeRef,
    handlePlay,
    handlePause,
    handleReset,
  } = useCarAnimation({
    speedRef,
    setTempoParado,
    setTempoRodando,
    setCarAngle,
    setCarPosition,
    roadCoords,
  });

  const center: LatLngExpression = roadCoords[0] || [-23.963214, -46.28054];

  useEffect(() => {
    speedRef.current = speedKmh;
  }, [speedKmh]);

  useEffect(() => {
    if (!route) return;

    const rawPoints = route.gps
      .filter((p) => p.speed! > 0.5)
      .map((p) => [p.longitude, p.latitude]) as [number, number][];

    if (rawPoints.length < 2) return;

    fetchSnappedRoute(rawPoints).then(
      ({ snappedCoords, snappedLine, totalKm }) => {
        setRoadCoords(snappedCoords);
        routeLineRef.current = snappedLine;
        totalDistanceRef.current = totalKm;

        animationRef.current = null;
        prevTimeRef.current = null;

        handleReset();
      }
    );
  }, [route]);

  return (
    <div className={styles.wrapper}>
      <Box
        sx={{
          position: "fixed",
          top: 16,
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 1100,
          backgroundColor: "#fff",
          borderRadius: 2,
          boxShadow: 3,
          px: 2,
          py: 1,
          minWidth: 300,
        }}
      >
        <RouteSelector
          current={selectedRouteIndex}
          onChange={setSelectedRouteIndex}
        />
      </Box>

      <div className={styles.mapArea}>
        <MapContainer
          center={center}
          zoom={17}
          scrollWheelZoom
          className={styles.map}
        >
          <RouteMarkers coords={roadCoords} />

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
          onChange={(_: Event, val: number | number[]) =>
            setSpeedKmh(Array.isArray(val) ? val[0] : val)
          }
          onCenterMap={() => setFollowCar(true)}
          tempoParado={tempoParado}
          tempoRodando={tempoRodando}
          angulo={carAngle}
          onPlay={handlePlay}
          onPause={handlePause}
          onReset={handleReset}
          currentRouteIndex={selectedRouteIndex}
          onRouteChange={setSelectedRouteIndex}
        />
      </div>
    </div>
  );
}
