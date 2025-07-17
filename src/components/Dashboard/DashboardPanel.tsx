import { Stack, Divider, Paper } from "@mui/material";
import RouteSelector from "./RouteSelector";
import CenterMapButton from "./CenterMapButton";
import SimulationControls from "./SimulationControls";
import HUD from "../HUD/HUD";
import SpeedControlPanel from "./SpeedControlPanel";

interface DashboardPanelProps {
  speedKmh: number;
  onSpeedChange: (_: Event, value: number | number[]) => void;
  currentRouteIndex: number;
  totalRoutes: number;
  onNextRoute: () => void;
  onCenterMap: () => void;
  tempoParado: number;
  tempoRodando: number;
  angulo: number;
  onPlay: () => void;
  onPause: () => void;
  onReset: () => void;
}

export default function DashboardPanel({
  speedKmh,
  onSpeedChange,
  currentRouteIndex,
  totalRoutes,
  onNextRoute,
  onCenterMap,
  tempoParado,
  tempoRodando,
  angulo,
  onPlay,
  onPause,
  onReset,
}: DashboardPanelProps) {
  return (
    <Paper
      elevation={3}
      sx={{
        p: 2,
        height: "100%",
        display: "flex",
        flexDirection: "column",
        gap: 2,
      }}
    >
      <Stack spacing={2} divider={<Divider flexItem />}>
        <SpeedControlPanel value={speedKmh} onChange={onSpeedChange} />
        <RouteSelector
          current={currentRouteIndex}
          total={totalRoutes}
          onNext={onNextRoute}
        />
        <CenterMapButton onClick={onCenterMap} />
        <SimulationControls
          onPlay={onPlay}
          onPause={onPause}
          onReset={onReset}
        />
        <HUD
          tempoParado={tempoParado}
          tempoRodando={tempoRodando}
          velocidade={speedKmh}
          angulo={angulo}
        />
      </Stack>
    </Paper>
  );
}
