import {
  Stack,
  Divider,
  Paper,
  Box,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useState } from "react";
import {
  SimulationControls,
  SpeedControlPanel,
  LanguageSelector,
  VehicleCard,
} from "./components";
import { HUD } from "../HUD/HUD";

interface DashboardPanelProps {
  speedKmh: number;
  onChange: (_: Event, value: number | number[]) => void;
  currentRouteIndex: number;
  onRouteChange: (index: number) => void;
  onCenterMap: () => void;
  tempoParado: number;
  tempoRodando: number;
  angulo: number;
  onPlay: () => void;
  onPause: () => void;
  onReset: () => void;
}

export function DashboardPanel({
  speedKmh,
  onChange,
  onCenterMap,
  tempoParado,
  tempoRodando,
  onPlay,
  onPause,
  onReset,
}: DashboardPanelProps) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [expanded, setExpanded] = useState(false);

  if (isMobile) {
    return (
      <Box
        sx={{
          position: "fixed",
          bottom: 0,
          left: 0,
          right: 0,
          zIndex: 1300,
          bgcolor: "#ffffff",
          borderTopLeftRadius: 16,
          borderTopRightRadius: 16,
          maxHeight: expanded ? "40vh" : "64px",
          transition: "max-height 0.3s ease",
          display: "flex",
          flexDirection: "column",
          boxShadow: "0px -2px 8px rgba(0, 0, 0, 0.1)",
          fontFamily: '"Inter", "Arial", sans-serif',
        }}
      >
        <Box
          onClick={() => setExpanded(!expanded)}
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            height: 64,
            cursor: "pointer",
            borderBottom: "1px solid #e0e0e0",
            px: 2,
          }}
        >
          <Box
            sx={{
              width: 36,
              height: 4,
              borderRadius: 2,
              bgcolor: "#999",
              mb: 0.5,
            }}
          />
          <Typography
            sx={{
              fontSize: "0.85rem",
              fontWeight: 600,
              color: "#444",
              fontFamily: '"Inter", "Arial", sans-serif',
            }}
          >
            {expanded ? "Ocultar painel" : "Mostrar painel"}
          </Typography>
        </Box>

        <Box
          sx={{
            px: 2,
            py: 1,
            flex: 1,
            overflowY: "auto",
          }}
        >
          <Stack spacing={2} divider={<Divider flexItem />}>
            <LanguageSelector />
            <VehicleCard />
            <HUD
              tempoParado={tempoParado}
              tempoRodando={tempoRodando}
              velocidade={speedKmh}
            />
            <SpeedControlPanel value={speedKmh} onChange={onChange} />
            <SimulationControls
              onPlay={onPlay}
              onPause={onPause}
              onReset={onReset}
              onCenterMap={onCenterMap}
            />
          </Stack>
        </Box>
      </Box>
    );
  }

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
        bgcolor: "#f7f9fc",
        fontFamily: '"Inter", "Arial", sans-serif',
      }}
    >
      <Stack
        spacing={2}
        divider={<Divider flexItem />}
        sx={{ flex: 1, pr: 1, overflowY: "auto" }}
      >
        <LanguageSelector />
        <VehicleCard />
        <HUD
          tempoParado={tempoParado}
          tempoRodando={tempoRodando}
          velocidade={speedKmh}
        />
        <SpeedControlPanel
          value={speedKmh}
          onChange={onChange}
          sx={{ mt: 1, mb: 1 }}
        />
      </Stack>

      <Box
        sx={{
          position: "fixed",
          bottom: 16,
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 1000,
          backgroundColor: "#ffffff",
          borderRadius: 2,
          boxShadow: "0px 4px 8px rgba(0,0,0,0.12)",
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
    </Paper>
  );
}
