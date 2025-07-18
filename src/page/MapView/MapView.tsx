import { useEffect, useRef, useState } from "react";
import { MapContainer, TileLayer, Polyline, CircleMarker } from "react-leaflet";
import { type LatLngExpression } from "leaflet";
import { lineString } from "@turf/helpers";
import length from "@turf/length";
import { useGps } from "../../contexts/GpsContext";
import { getRouteByIndex } from "../../services/useRouteData";
import { fetchSnappedRoute } from "../../utils/fetchRouteSnap";
import {
  Car,
  DashboardPanel,
  FollowCarControl,
  RouteMarkers,
  StopFollowOnZoom,
} from "../../components/";
import styles from "./MapView.module.scss";
import { useCarAnimation } from "../../hooks/useCarAnimation";
import { Box, Button, Typography, Stack } from "@mui/material";
import { DISTANCE_UNIT } from "../../config/map";
import { RouteSelector } from "../../components/Dashboard/components";

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

  const [modoReal, setModoReal] = useState(true);
  const [snapDisponivel, setSnapDisponivel] = useState(true);

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

    const pontos = route.gps.map((p) => [p.longitude, p.latitude]) as [
      number,
      number
    ][];

    const latLng = pontos.map(([lng, lat]) => [lat, lng]) as [number, number][];

    if (pontos.length < 1) return;

    const usarReal = async () => {
      try {
        if (modoReal) {
          setRoadCoords(latLng);
          routeLineRef.current = lineString(pontos);
          totalDistanceRef.current = length(
            routeLineRef.current,
            DISTANCE_UNIT
          );
          animationRef.current = null;
          prevTimeRef.current = null;
          handleReset();
        } else {
          const pontosFiltrados = route.gps
            .filter((p) => p.speed && p.speed > 0.5)
            .map((p) => [p.longitude, p.latitude]) as [number, number][];

          const res = await fetchSnappedRoute(pontosFiltrados);
          setRoadCoords(res.snappedCoords);
          routeLineRef.current = res.snappedLine;
          totalDistanceRef.current = res.totalKm;
          animationRef.current = null;
          prevTimeRef.current = null;
          handleReset();
        }
      } catch (e) {
        console.warn("Falha ao usar modo BETA, voltando para modo REAL:", e);
        setModoReal(true);
        setSnapDisponivel(false);
        setRoadCoords(latLng);
        routeLineRef.current = lineString(pontos);
        totalDistanceRef.current = length(routeLineRef.current, DISTANCE_UNIT);
        animationRef.current = null;
        prevTimeRef.current = null;
        handleReset();
      }
    };

    usarReal();
  }, [route, modoReal]);

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
          py: 1.5,
          display: "flex",
          alignItems: "center",
          gap: 2,
        }}
      >
        <RouteSelector
          current={selectedRouteIndex}
          onChange={setSelectedRouteIndex}
        />
        <Stack spacing={0.5} alignItems="center">
          <Button
            size="small"
            variant="outlined"
            color={modoReal ? "secondary" : "primary"}
            onClick={() => setModoReal(!modoReal)}
            disabled={!snapDisponivel}
            sx={{
              whiteSpace: "nowrap",
              minWidth: 110,
              fontWeight: 600,
            }}
          >
            MODO: {modoReal ? "REAL" : "BETA"}
          </Button>
          {!snapDisponivel && (
            <Typography variant="caption" color="error">
              Modo BETA indisponível
            </Typography>
          )}
        </Stack>
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

          {roadCoords.length > 1 ? (
            <Polyline positions={roadCoords} color="blue" weight={4} />
          ) : roadCoords.length === 1 ? (
            <CircleMarker
              center={roadCoords[0]}
              radius={6}
              pathOptions={{
                color: "blue",
                fillColor: "blue",
                fillOpacity: 0.6,
              }}
            />
          ) : null}

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
