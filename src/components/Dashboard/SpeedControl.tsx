// src/components/Dashboard/SpeedControl.tsx
import { Box, Slider, Typography } from "@mui/material";

interface SpeedControlProps {
  value: number;
  onChange: (_: Event, value: number | number[]) => void;
}

const speedMarks = [
  { value: 20, label: "20" },
  { value: 60, label: "60" },
  { value: 100, label: "100" },
  { value: 150, label: "150" },
  { value: 200, label: "200" },
  { value: 300, label: "300" },
];

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
        marks={speedMarks}
        step={1}
      />
    </Box>
  );
}
