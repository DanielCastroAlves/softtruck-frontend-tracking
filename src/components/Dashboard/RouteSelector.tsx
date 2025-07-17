// src/components/Dashboard/RouteSelector.tsx
import { Box, Typography, Button } from "@mui/material";

interface RouteSelectorProps {
  current: number;
  total: number;
  onNext: () => void;
}

export default function RouteSelector({ current, total, onNext }: RouteSelectorProps) {
  return (
    <Box mb={2} display="flex" alignItems="center" gap={1}>
      <Typography variant="subtitle2">
        Rota: ({current + 1}/{total})
      </Typography>
      <Button variant="outlined" size="small" onClick={onNext}>
        Próxima
      </Button>
    </Box>
  );
}
