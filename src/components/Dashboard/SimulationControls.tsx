import {
  IconButton,
  Tooltip,
  ButtonGroup,
  Button,
  Stack,
  useMediaQuery,
} from "@mui/material";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseIcon from "@mui/icons-material/Pause";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import MyLocationIcon from "@mui/icons-material/MyLocation";
import { useTranslation } from "react-i18next";
import { useTheme } from "@mui/material/styles";

interface SimulationControlsProps {
  onPlay: () => void;
  onPause: () => void;
  onReset: () => void;
  onCenterMap: () => void;
}

export default function SimulationControls({
  onPlay,
  onPause,
  onReset,
  onCenterMap,
}: SimulationControlsProps) {
  const { t } = useTranslation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  if (isMobile) {
    return (
      <Stack
        spacing={1}
        sx={{
          position: "fixed",
          top: 16,
          right: 16,
          zIndex: 1500,
          background: "#fff",
          borderRadius: 2,
          padding: 1,
          boxShadow: 3,
        }}
      >
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
      </Stack>
    );
  }

  return (
    <Stack spacing={1}>
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

      <Button
        variant="outlined"
        fullWidth
        startIcon={<MyLocationIcon />}
        onClick={onCenterMap}
      >
        {t("controls.centerMap")}
      </Button>
    </Stack>
  );
}
