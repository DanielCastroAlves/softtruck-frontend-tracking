import {
  Stack,
  Divider,
  Paper,
  Box,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useState } from "react";
import {
  RouteSelector,
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
  currentRouteIndex,
  onRouteChange,
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

  const handleRouteChange = (event: any) => {
    const idx = Number(event.target.value);
    if (!isNaN(idx)) {
      onRouteChange(idx);
    }
  };

  if (isMobile) {
    return (
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
            onChange={handleRouteChange}
          />
        </Box>

        <Box
          sx={{
            position: "fixed",
            bottom: 0,
            left: 0,
            right: 0,
            zIndex: 1300,
            bgcolor: "#fff",
            borderTopLeftRadius: 16,
            borderTopRightRadius: 16,
            maxHeight: expanded ? "70vh" : "64px",
            transition: "max-height 0.3s ease",
            display: "flex",
            flexDirection: "column",
            boxShadow: 3,
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
              borderBottom: "1px solid #eee",
              px: 2,
            }}
          >
            <Box
              sx={{
                width: 36,
                height: 4,
                borderRadius: 2,
                bgcolor: "#aaa",
                mb: 0.5,
              }}
            />
            <Box sx={{ fontSize: "0.85rem", color: "#777" }}>
              {expanded ? "Ocultar painel" : "Mostrar painel"}
            </Box>
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
      </>
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
        </Stack>
      </Box>

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
          onChange={handleRouteChange}
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
    </Paper>
  );
}
