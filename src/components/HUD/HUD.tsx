import {
  Card,
  CardContent,
  Typography,
  Box,
  Divider,
  Stack,
} from "@mui/material";
import PauseCircleOutlineIcon from "@mui/icons-material/PauseCircleOutline";
import PlayCircleOutlineIcon from "@mui/icons-material/PlayCircleOutline";
import SpeedIcon from "@mui/icons-material/Speed";
import ExploreIcon from "@mui/icons-material/Explore";

interface HUDProps {
  tempoParado: number;
  tempoRodando: number;
  velocidade: number;
  angulo: number;
}

function formatElapsed(s: number) {
  const min = Math.floor(s / 60);
  const sec = Math.floor(s % 60);
  return `${min}:${sec.toString().padStart(2, "0")}`;
}

export default function HUD({
  tempoParado,
  tempoRodando,
  velocidade,
  angulo,
}: HUDProps) {
  return (
    <Card elevation={3} sx={{ mt: 2 }}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Status do Veículo
        </Typography>

        <Divider sx={{ mb: 2 }} />

        <Stack spacing={1}>
          <Box display="flex" alignItems="center" gap={1}>
            <PauseCircleOutlineIcon />
            <Typography variant="body2" sx={{ fontWeight: 500, minWidth: 130 }}>
              Tempo parado:
            </Typography>
            <Typography variant="body2">{formatElapsed(tempoParado)}</Typography>
          </Box>

          <Box display="flex" alignItems="center" gap={1}>
            <PlayCircleOutlineIcon />
            <Typography variant="body2" sx={{ fontWeight: 500, minWidth: 130 }}>
              Tempo rodando:
            </Typography>
            <Typography variant="body2">{formatElapsed(tempoRodando)}</Typography>
          </Box>

          <Box display="flex" alignItems="center" gap={1}>
            <SpeedIcon />
            <Typography variant="body2" sx={{ fontWeight: 500, minWidth: 130 }}>
              Velocidade atual:
            </Typography>
            <Typography variant="body2">
              {velocidade.toFixed(1)} km/h
            </Typography>
          </Box>

          <Box display="flex" alignItems="center" gap={1}>
            <ExploreIcon />
            <Typography variant="body2" sx={{ fontWeight: 500, minWidth: 130 }}>
              Ângulo de direção:
            </Typography>
            <Typography variant="body2">{angulo.toFixed(1)}°</Typography>
          </Box>
        </Stack>
      </CardContent>
    </Card>
  );
}
