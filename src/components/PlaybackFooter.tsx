// src/components/PlaybackFooter/index.tsx
import { Box, Paper, ButtonGroup, IconButton, Tooltip } from "@mui/material";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseIcon from "@mui/icons-material/Pause";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import MyLocationIcon from "@mui/icons-material/MyLocation";
import { useTranslation } from "react-i18next";

interface PlaybackFooterProps {
  onPlay: () => void;
  onPause: () => void;
  onReset: () => void;
  onCenterMap: () => void;
}

export default function PlaybackFooter({
  onPlay,
  onPause,
  onReset,
  onCenterMap,
}: PlaybackFooterProps) {
  const { t } = useTranslation();

  return (
    <Paper
      elevation={4}
      sx={{
        position: "fixed",
        bottom: 16,
        left: "50%",
        transform: "translateX(-50%)",
        zIndex: 999,
        padding: "8px 16px",
        borderRadius: 4,
        backgroundColor: "#fff",
      }}
    >
      <ButtonGroup>
        <Tooltip title={t("simulation.start")}>
          <IconButton onClick={onPlay}>
            <PlayArrowIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title={t("simulation.pause")}>
          <IconButton onClick={onPause}>
            <PauseIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title={t("simulation.reset")}>
          <IconButton onClick={onReset}>
            <RestartAltIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title={t("controls.centerMap")}>
          <IconButton onClick={onCenterMap}>
            <MyLocationIcon />
          </IconButton>
        </Tooltip>
      </ButtonGroup>
    </Paper>
  );
}
