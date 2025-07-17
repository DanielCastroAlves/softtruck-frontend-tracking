// src/components/Dashboard/SimulationControls.tsx
import { ButtonGroup, IconButton, Tooltip } from "@mui/material";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseIcon from "@mui/icons-material/Pause";
import RestartAltIcon from "@mui/icons-material/RestartAlt";

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
  return (
    <ButtonGroup variant="outlined" fullWidth>
      <Tooltip title="Iniciar simulação">
        <IconButton onClick={onPlay}>
          <PlayArrowIcon />
        </IconButton>
      </Tooltip>
      <Tooltip title="Pausar simulação">
        <IconButton onClick={onPause}>
          <PauseIcon />
        </IconButton>
      </Tooltip>
      <Tooltip title="Resetar simulação">
        <IconButton onClick={onReset}>
          <RestartAltIcon />
        </IconButton>
      </Tooltip>
    </ButtonGroup>
  );
}
