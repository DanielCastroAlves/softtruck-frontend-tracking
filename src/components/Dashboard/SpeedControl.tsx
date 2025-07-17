// src/components/Dashboard/SpeedControl.tsx
import { Box, Slider, Typography } from "@mui/material";

interface SpeedControlProps {
  value: number;
  onChange: (_: Event, value: number | number[]) => void;
}

export default function SpeedControl({ value, onChange }: SpeedControlProps) {
  return (
    <Box mb={2}>
      <Typography variant="subtitle2" gutterBottom>
        Velocidade: {value} km/h
      </Typography>
      <Slider
        min={1}
        max={300}
        value={value}
        onChange={onChange}
        valueLabelDisplay="auto"
      />
    </Box>
  );
}
