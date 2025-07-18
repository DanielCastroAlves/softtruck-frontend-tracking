import {
  Button,
  ButtonGroup,
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
          top: 16,
          zIndex: 1500,
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
      <ButtonGroup fullWidth variant="outlined">
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
        fullWidth
        onClick={onCenterMap}
        startIcon={<MyLocationIcon />}
        variant="outlined"
      >
        {t("controls.centerMap")}
      </Button>
    </Stack>
  );
}
