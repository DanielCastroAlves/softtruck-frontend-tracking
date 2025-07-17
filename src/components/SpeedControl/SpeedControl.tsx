import { Slider } from "@mui/material";

interface SpeedControlProps {
  speedKmh: number;
  onChange: (value: number) => void;
}

export default function SpeedControl({ speedKmh, onChange }: SpeedControlProps) {
  return (
    <div style={{ marginBottom: 8 }}>
      <label>Velocidade: {speedKmh} km/h</label>
      <Slider
        min={1}
        max={300}
        value={speedKmh}
        onChange={(_, value) => onChange(Array.isArray(value) ? value[0] : value)}
        style={{ width: 180, marginTop: 4 }}
      />
    </div>
  );
}
