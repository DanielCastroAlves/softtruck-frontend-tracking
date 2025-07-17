import { ButtonGroup, IconButton, Tooltip } from "@mui/material";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseIcon from "@mui/icons-material/Pause";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import { useTranslation } from "react-i18next";

interface SimulationControlsProps {
  onPlay: () => void;
  onPause: () => void;
  onReset: () => void;
}

export default function SimulationControls({
  onPlay,
  onPause,
  onReset,
}: SimulationControlsProps) {
  const { t } = useTranslation();

  return (
    <ButtonGroup variant="outlined" fullWidth>
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
    </ButtonGroup>
  );
}
