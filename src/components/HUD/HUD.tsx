import {
  Card,
  CardContent,
  Typography,
  Box,
  Divider,
  Stack
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

function formatElapsed(s: number) {
  const min = Math.floor(s / 60);
  const sec = Math.floor(s % 60);
  return `${min}:${sec.toString().padStart(2, "0")}`;
}

export default function HUD({
  tempoParado,
  tempoRodando,
  velocidade
}: HUDProps) {
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
            <Typography variant="body2">{formatElapsed(tempoParado)}</Typography>
          </Box>

          <Box display="flex" alignItems="center" gap={1}>
            <PlayCircleOutlineIcon />
            <Typography variant="body2" sx={{ fontWeight: 500, minWidth: 130 }}>
              {t("hud.status.runningTime")}
            </Typography>
            <Typography variant="body2">{formatElapsed(tempoRodando)}</Typography>
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
