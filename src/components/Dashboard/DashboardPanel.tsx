import {
  Stack,
  Divider,
  Paper,
  Box,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import RouteSelector from "./RouteSelector";
import SimulationControls from "./SimulationControls";
import HUD from "../HUD/HUD";
import SpeedControlPanel from "./SpeedControlPanel";
import LanguageSelector from "./LanguageSelector";
import VehicleCard from "./VehicleCard";

interface DashboardPanelProps {
  speedKmh: number;
  onChange: (_: Event, value: number | number[]) => void;
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
  onChange,
  currentRouteIndex,
  totalRoutes,
  onNextRoute,
  onCenterMap,
  tempoParado,
  tempoRodando,
  onPlay,
  onPause,
  onReset,
}: DashboardPanelProps) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Paper
      elevation={3}
      sx={{
        p: 2,
        height: "100vh",
        width: "100%",
        maxWidth: 360,
        display: "flex",
        flexDirection: "column",
        boxSizing: "border-box",
        overflow: "hidden",
      }}
    >
      <LanguageSelector />
      <VehicleCard />
      <HUD
        tempoParado={tempoParado}
        tempoRodando={tempoRodando}
        velocidade={speedKmh}
      />

      <Box sx={{ flex: 1, overflowY: "auto", pr: 1 }}>
        <Stack
          spacing={2}
          divider={<Divider flexItem />}
          sx={{ width: "100%" }}
        >
          <SpeedControlPanel value={speedKmh} onChange={onChange} />

          {/* Seletor de rota no painel lateral apenas no mobile */}
          {isMobile && (
            <RouteSelector
              current={currentRouteIndex}
              total={totalRoutes}
              onNext={onNextRoute}
            />
          )}

          {isMobile && (
            <SimulationControls
              onPlay={onPlay}
              onPause={onPause}
              onReset={onReset}
              onCenterMap={onCenterMap}
            />
          )}
        </Stack>
      </Box>

      {/* Desktop: botões de controle fixos na parte inferior + seletor no topo */}
      {!isMobile && (
        <>
          <Box
            sx={{
              position: "fixed",
              top: 16,
              left: "50%",
              transform: "translateX(-50%)",
              zIndex: 1000,
              backgroundColor: "#fff",
              borderRadius: 2,
              boxShadow: 3,
              px: 2,
              py: 1,
            }}
          >
            <RouteSelector
              current={currentRouteIndex}
              total={totalRoutes}
              onNext={onNextRoute}
            />
          </Box>

          <Box
            sx={{
              position: "fixed",
              bottom: 16,
              left: "50%",
              transform: "translateX(-50%)",
              zIndex: 1000,
              backgroundColor: "#fff",
              borderRadius: 2,
              boxShadow: 3,
              px: 2,
              py: 1,
            }}
          >
            <SimulationControls
              onPlay={onPlay}
              onPause={onPause}
              onReset={onReset}
              onCenterMap={onCenterMap}
            />
          </Box>
        </>
      )}
    </Paper>
  );
}
