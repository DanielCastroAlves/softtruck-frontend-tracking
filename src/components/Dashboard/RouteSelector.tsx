// src/components/Dashboard/RouteSelector.tsx
import { Box, Select, MenuItem, FormControl, InputLabel } from "@mui/material";
import { useTranslation } from "react-i18next";
import gpsData from "../../data/frontend_data_gps.json";
import { formatDuration, formatKm } from "../../utils/format";

interface RouteSelectorProps {
  current: number;
  onChange: (index: number) => void;
}



export default function RouteSelector({ current, onChange }: RouteSelectorProps) {
  const { t } = useTranslation();
  const routes = gpsData.courses;

  return (
    <Box>
      <FormControl size="small" fullWidth>
        <InputLabel id="route-select-label">
          {t("controls.route.label")}
        </InputLabel>
        <Select
          labelId="route-select-label"
          value={current}
          label={t("controls.route.label")}
          onChange={(e) => onChange(Number(e.target.value))}
        >
          {routes.map((route: any, idx: number) => (
            <MenuItem key={idx} value={idx}>
              Rota {idx + 1} – {formatKm(route.distance)}, {formatDuration(route.duration)}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
}
