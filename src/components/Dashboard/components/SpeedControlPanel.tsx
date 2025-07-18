import {
  Box,
  Card,
  CardContent,
  Slider,
  Typography,
  useMediaQuery,
} from "@mui/material";
import type { SxProps, Theme } from "@mui/material";
import { Pie, PieChart } from "recharts";

interface SpeedControlPanelProps {
  value: number;
  onChange: (_: Event, value: number | number[]) => void;
  sx?: SxProps<Theme>;
}

const RADIAN = Math.PI / 180;
const CHART_DATA = [{ name: "Velocidade", value: 300 }];

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
  const angle = 180 * (1 - value / 300);
  const length = (iR + 2 * oR) / 3;
  const sin = Math.sin(-RADIAN * angle);
  const cos = Math.cos(-RADIAN * angle);
  const r = 4;
  const x0 = cx;
  const y0 = cy;
  const xba = x0 + r * sin;
  const yba = y0 - r * cos;
  const xbb = x0 - r * sin;
  const ybb = y0 + r * cos;
  const xp = x0 + length * cos;
  const yp = y0 + length * sin;

  return [
    <circle key="needle-circle" cx={x0} cy={y0} r={r} fill={color} />,
    <path
      key="needle-path"
      d={`M${xba},${yba} L${xbb},${ybb} L${xp},${yp} Z`}
      fill={color}
    />,
  ];
}

export function SpeedControlPanel({
  value,
  onChange,
  sx,
}: SpeedControlPanelProps) {
  const isMobile = useMediaQuery("(max-width:600px)");
  const chartWidth = isMobile ? 200 : 260;
  const cx = chartWidth / 2;
  const cy = 90;
  const innerRadius = isMobile ? 35 : 50;
  const outerRadius = isMobile ? 60 : 85;

  return (
    <Card
      elevation={4}
      sx={{
        bgcolor: "#f7f9fc",
        borderRadius: 3,
        p: 2,
        boxShadow: "0 2px 6px rgba(0,0,0,0.08)",
        ...(sx || {}),
      }}
    >
      <CardContent sx={{ p: 0 }}>
        <Box
          sx={{
            width: chartWidth,
            margin: "0 auto",
            textAlign: "center",
          }}
        >
          <Typography
            sx={{
              fontSize: isMobile ? 20 : 26,
              fontWeight: 500,
              mt: 1,
              fontFamily: '"Inter", "Arial", sans-serif',
              color: "#1A1A1A",
            }}
          >
            {value} km/h
          </Typography>

          <PieChart width={chartWidth} height={140}>
            <defs>
              <linearGradient id="speedGradient" x1="0" y1="1" x2="1" y2="1">
                <stop offset="10%" stopColor="#4caf50" />
                <stop offset="40%" stopColor="#ffc107" />
                <stop offset="65%" stopColor="#ff9800" />
                <stop offset="85%" stopColor="#f44336" />
                <stop offset="100%" stopColor="#d32f2f" />
              </linearGradient>
            </defs>

            <Pie
              data={CHART_DATA}
              startAngle={180}
              endAngle={0}
              cx={cx}
              cy={cy}
              innerRadius={innerRadius}
              outerRadius={outerRadius}
              dataKey="value"
              stroke="none"
              fill="url(#speedGradient)"
            />

            {needle({
              value,
              cx,
              cy,
              iR: innerRadius,
              oR: outerRadius,
              color: "#333",
            })}
          </PieChart>
        </Box>

        <Slider
          aria-label="Velocidade do veículo"
          min={1}
          max={500}
          onChange={onChange}
          value={value}
          valueLabelDisplay="auto"
          sx={{
            mt: 1.5,
            mb: 1,
            width: "90%",
            display: "block",
            margin: "0 auto",
            height: 6,
            color: "#1976d2",
            "& .MuiSlider-track": {
              border: "none",
            },
            "& .MuiSlider-rail": {
              opacity: 0.3,
              backgroundColor: "#bdbdbd",
            },
            "& .MuiSlider-thumb": {
              height: 16,
              width: 16,
              backgroundColor: "#fff",
              border: "2px solid currentColor",
              "&:focus, &:hover, &.Mui-active, &.Mui-focusVisible": {
                boxShadow: "0px 0px 0px 6px rgba(25, 118, 210, 0.16)",
              },
            },
            "& .MuiSlider-valueLabel": {
              display: "none",
            },
          }}
        />
      </CardContent>
    </Card>
  );
}
