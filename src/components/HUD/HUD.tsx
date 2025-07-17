// src/components/HUD/HUD.tsx
import { Card, CardContent, Typography, Box } from "@mui/material";

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
    <Card elevation={2}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          📊 Status do Veículo
        </Typography>

        <Box display="flex" flexDirection="column" gap={1}>
          <Typography variant="body2">
            ⏸ Tempo parado: <strong>{formatElapsed(tempoParado)}</strong>
          </Typography>
          <Typography variant="body2">
            ▶️ Tempo rodando: <strong>{formatElapsed(tempoRodando)}</strong>
          </Typography>
          <Typography variant="body2">
            🚗 Velocidade atual: <strong>{velocidade.toFixed(1)} km/h</strong>
          </Typography>
          <Typography variant="body2">
            🧭 Ângulo de direção: <strong>{angulo.toFixed(1)}°</strong>
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
}
