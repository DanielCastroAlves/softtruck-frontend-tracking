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
   <Card
  elevation={4}
  sx={{
    mt: 2,
    bgcolor: "#f7f9fc",
    borderRadius: 3,
    boxShadow: "0 2px 6px rgba(0,0,0,0.08)",
  }}
>
  <CardContent sx={{ p: 3 }}>
    <Typography
      variant="h6"
      gutterBottom
      sx={{
        fontSize: 20,
        fontWeight: 600,
        fontFamily: '"Inter", "Arial", sans-serif',
        color: "#1A1A1A",
      }}
    >
      {t("hud.status.title")}
    </Typography>

    <Divider sx={{ my: 1 }} />

    <Stack spacing={1.5}>
      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        width="100%"
      >
        <Box display="flex" alignItems="center" gap={1}>
          <PauseCircleOutlineIcon color="action" />
          <Typography
            variant="body2"
            sx={{ fontWeight: 500, fontFamily: "Inter" }}
          >
            {t("hud.status.stoppedTime")}
          </Typography>
        </Box>
        <Typography variant="body2" sx={{ fontFamily: "Inter" }}>
          {formatElapsedTime(tempoParado)}
        </Typography>
      </Box>

      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        width="100%"
      >
        <Box display="flex" alignItems="center" gap={1}>
          <PlayCircleOutlineIcon color="success" />
          <Typography
            variant="body2"
            sx={{ fontWeight: 500, fontFamily: "Inter" }}
          >
            {t("hud.status.runningTime")}
          </Typography>
        </Box>
        <Typography variant="body2" sx={{ fontFamily: "Inter" }}>
          {formatElapsedTime(tempoRodando)}
        </Typography>
      </Box>

      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        width="100%"
      >
        <Box display="flex" alignItems="center" gap={1}>
          <SpeedIcon color="primary" />
          <Typography
            variant="body2"
            sx={{ fontWeight: 500, fontFamily: "Inter" }}
          >
            {t("hud.status.currentSpeed")}
          </Typography>
        </Box>
        <Typography variant="body2" sx={{ fontFamily: "Inter" }}>
          {velocidade.toFixed(1)} km/h
        </Typography>
      </Box>
    </Stack>
  </CardContent>
</Card>

  );
}
