import { Box, Slider, Typography } from "@mui/material";
import { PieChart, Pie, Cell } from "recharts";

interface SpeedControlPanelProps {
  value: number;
  onChange: (_: Event, value: number | number[]) => void;
}

const RADIAN = Math.PI / 180;

const chartData = [
  { name: "Baixa", value: 100, color: "#4caf50" },
  { name: "Média", value: 100, color: "#ffc107" },
  { name: "Alta", value: 100, color: "#f44336" },
];

function needle({
  value,
  cx,
  cy,
  iR,
  oR,
  color,
}: {
  value: number;
  data: typeof chartData;
  cx: number;
  cy: number;
  iR: number;
  oR: number;
  color: string;
}) {
  const ang = 180 * (1 - value / 300); // 300 é o valor máximo
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
    <circle
      key="needle-circle"
      cx={x0}
      cy={y0}
      r={r}
      fill={color}
      stroke="none"
    />,
    <path
      key="needle-path"
      d={`M${xba},${yba} L${xbb},${ybb} L${xp},${yp} Z`}
      fill={color}
    />,
  ];
}

export default function SpeedControlPanel({
  value,
  onChange,
}: SpeedControlPanelProps) {
  const cx = 150;
  const cy = 100;
  const iR = 60;
  const oR = 100;

  return (
    <Box>
      <Typography variant="subtitle2" gutterBottom>
        Velocidade: {value} km/h
      </Typography>

      <PieChart width={300} height={160}>
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
        >
          {chartData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.color} />
          ))}
        </Pie>
        {needle({
          value,
          data: chartData,
          cx,
          cy,
          iR,
          oR,
          color: "#333",
        })}
      </PieChart>

      <Slider
        min={1}
        max={300}
        value={value}
        onChange={onChange}
        valueLabelDisplay="auto"
        sx={{ mb: 2 }}
      />
    </Box>
  );
}
