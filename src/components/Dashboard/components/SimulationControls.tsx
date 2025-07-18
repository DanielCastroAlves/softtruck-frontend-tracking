import {
  Button,
  IconButton,
  Stack,
  Tooltip,
  useMediaQuery,
} from "@mui/material";
import MyLocationIcon from "@mui/icons-material/MyLocation";
import PauseIcon from "@mui/icons-material/Pause";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import { useTheme } from "@mui/material/styles";
import { useTranslation } from "react-i18next";
import { useState } from "react";

interface SimulationControlsProps {
  onCenterMap: () => void;
  onPause: () => void;
  onPlay: () => void;
  onReset: () => void;
}

export function SimulationControls({
  onCenterMap,
  onPause,
  onPlay,
  onReset,
}: SimulationControlsProps) {
  const { t } = useTranslation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlayPause = () => {
    if (isPlaying) {
      onPause();
    } else {
      onPlay();
    }
    setIsPlaying(!isPlaying);
  };

  const followCarLabel = t("controls.followCar") || "Seguir veículo";

  if (isMobile) {
    return (
      <Stack
        spacing={1}
        sx={{
          background: "#fff",
          borderRadius: 2,
          boxShadow: 3,
          padding: 1,
          position: "fixed",
          right: 16,
          top: 160,
          zIndex: 1500,
        }}
      >
        <Tooltip title={isPlaying ? t("simulation.pause") : t("simulation.start")}>
          <IconButton onClick={handlePlayPause}>
            {isPlaying ? <PauseIcon /> : <PlayArrowIcon />}
          </IconButton>
        </Tooltip>

        <Tooltip title={t("simulation.reset")}>
          <IconButton onClick={onReset}>
            <RestartAltIcon />
          </IconButton>
        </Tooltip>

        <Tooltip title={followCarLabel}>
          <IconButton onClick={onCenterMap}>
            <MyLocationIcon />
          </IconButton>
        </Tooltip>
      </Stack>
    );
  }

  return (
    <Stack spacing={1} direction="row" alignItems="center" justifyContent="center">
      <Tooltip title={isPlaying ? t("simulation.pause") : t("simulation.start")}>
        <IconButton onClick={handlePlayPause}>
          {isPlaying ? <PauseIcon /> : <PlayArrowIcon />}
        </IconButton>
      </Tooltip>

      <Tooltip title={t("simulation.reset")}>
        <IconButton onClick={onReset}>
          <RestartAltIcon />
        </IconButton>
      </Tooltip>

      <Button
        onClick={onCenterMap}
        startIcon={<MyLocationIcon />}
        variant="outlined"
        sx={{
          fontWeight: 500,
          fontSize: "0.875rem",
          textTransform: "none",
        }}
      >
        {followCarLabel}
      </Button>
    </Stack>
  );
}
