import { Card, CardContent, Typography, Slider } from "@mui/material";
import { PieChart, Pie } from "recharts";

interface SpeedControlPanelProps {
  value: number;
  onChange: (_: Event, value: number | number[]) => void;
}

const RADIAN = Math.PI / 180;
const chartData = [{ name: "Velocidade", value: 300 }];

function needle({
  value,
  cx,
  cy,
  iR,
  oR,
  color,
}: {
  value: number;
  cx: number;
  cy: number;
  iR: number;
  oR: number;
  color: string;
}) {
  const ang = 180 * (1 - value / 300);
  const length = (iR + 2 * oR) / 3;
  const sin = Math.sin(-RADIAN * ang);
  const cos = Math.cos(-RADIAN * ang);
  const r = 5;
  const x0 = cx;
  const y0 = cy;
  const xba = x0 + r * sin;
  const yba = y0 - r * cos;
  const xbb = x0 - r * sin;
  const ybb = y0 + r * cos;
  const xp = x0 + length * cos;
  const yp = y0 + length * sin;

  return [
    <circle key="needle-circle" cx={x0} cy={y0} r={r} fill={color} stroke="none" />,
    <path key="needle-path" d={`M${xba},${yba} L${xbb},${ybb} L${xp},${yp} Z`} fill={color} />,
  ];
}

export default function SpeedControlPanel({ value, onChange }: SpeedControlPanelProps) {
  const cx = 150;
  const cy = 100;
  const iR = 60;
  const oR = 100;

  return (
    <Card elevation={3}>
      <CardContent>
        <Typography
          variant="h4"
          align="center"
          sx={{
            fontWeight: 600,
            fontSize: 32,
            mb: 1,
          }}
        >
          {value} km/h
        </Typography>

        <PieChart width={300} height={160}>
          <defs>
            <linearGradient id="gradienteVelocidade" x1="0" y1="1" x2="1" y2="1">
              <stop offset="10%" stopColor="#4caf50" />
              <stop offset="40%" stopColor="#ffc107" />
              <stop offset="65%" stopColor="#ff9800" />
              <stop offset="85%" stopColor="#f44336" />
              <stop offset="100%" stopColor="#d32f2f" />
            </linearGradient>
          </defs>

          <Pie
            data={chartData}
            startAngle={180}
            endAngle={0}
            cx={cx}
            cy={cy}
            innerRadius={iR}
            outerRadius={oR}
            dataKey="value"
            stroke="none"
            fill="url(#gradienteVelocidade)"
          />
          {needle({ value, cx, cy, iR, oR, color: "#333" })}
        </PieChart>

        <Slider
          min={1}
          max={300}
          value={value}
          onChange={onChange}
          valueLabelDisplay="auto"
          sx={{ mt: 2 }}
        />
      </CardContent>
    </Card>
  );
}
