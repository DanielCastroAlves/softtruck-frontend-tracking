import { Slider } from "@mui/material";

interface SpeedControlProps {
  value: number;
  onChange: (_: Event, value: number | number[]) => void;
}

export default function SpeedControl({ value, onChange }: SpeedControlProps) {
  return (
    <div style={{ marginBottom: 8 }}>
      <label>Velocidade: {value} km/h</label>
      <Slider
        min={1}
        max={300}
        value={value}
        onChange={onChange}
        style={{ width: 180, marginTop: 4 }}
      />
    </div>
  );
}
