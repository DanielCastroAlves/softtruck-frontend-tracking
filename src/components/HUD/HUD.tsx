import {
  Box,
  Card,
  CardContent,
  Divider,
  Stack,
  Typography,
} from "@mui/material";
import PauseCircleOutlineIcon from "@mui/icons-material/PauseCircleOutline";
import PlayCircleOutlineIcon from "@mui/icons-material/PlayCircleOutline";
import SpeedIcon from "@mui/icons-material/Speed";
import { useTranslation } from "react-i18next";

interface HUDProps {
  tempoParado: number;
  tempoRodando: number;
  velocidade: number;
}

function formatElapsedTime(seconds: number) {
  const minutes = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${minutes}:${secs.toString().padStart(2, "0")}`;
}

export function HUD({ tempoParado, tempoRodando, velocidade }: HUDProps) {
  const { t } = useTranslation();

  return (
    <Card elevation={3} sx={{ mt: 2 }}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          {t("hud.status.title")}
        </Typography>

        <Divider sx={{ mb: 2 }} />

        <Stack spacing={1}>
          <Box display="flex" alignItems="center" gap={1}>
            <PauseCircleOutlineIcon />
            <Typography variant="body2" sx={{ fontWeight: 500, minWidth: 130 }}>
              {t("hud.status.stoppedTime")}
            </Typography>
            <Typography variant="body2">
              {formatElapsedTime(tempoParado)}
            </Typography>
          </Box>

          <Box display="flex" alignItems="center" gap={1}>
            <PlayCircleOutlineIcon />
            <Typography variant="body2" sx={{ fontWeight: 500, minWidth: 130 }}>
              {t("hud.status.runningTime")}
            </Typography>
            <Typography variant="body2">
              {formatElapsedTime(tempoRodando)}
            </Typography>
          </Box>

          <Box display="flex" alignItems="center" gap={1}>
            <SpeedIcon />
            <Typography variant="body2" sx={{ fontWeight: 500, minWidth: 130 }}>
              {t("hud.status.currentSpeed")}
            </Typography>
            <Typography variant="body2">
              {velocidade.toFixed(1)} km/h
            </Typography>
          </Box>
        </Stack>
      </CardContent>
    </Card>
  );
}
