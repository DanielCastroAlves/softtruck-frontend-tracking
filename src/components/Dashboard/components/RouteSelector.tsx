import { Box, FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import type { SelectChangeEvent } from "@mui/material/Select";
import { useTranslation } from "react-i18next";
import gpsData from "../../../data/frontend_data_gps.json";
import { formatDuration, formatKm } from "../../../utils/format";

interface RouteSelectorProps {
  current: number;
  onChange: (index: number) => void;
}

export function RouteSelector({ current, onChange }: RouteSelectorProps) {
  const { t } = useTranslation();
  const routes = gpsData.courses;

  const handleRouteChange = (event: SelectChangeEvent) => {
    onChange(Number(event.target.value));
  };

  return (
    <Box>
      <FormControl size="small" fullWidth>
        <InputLabel id="route-select-label">{t("controls.route.label")}</InputLabel>
        <Select
          labelId="route-select-label"
          value={current.toString()}
          label={t("controls.route.label")}
          onChange={handleRouteChange}
        >
          {routes.map((route, idx) => (
            <MenuItem key={idx} value={idx.toString()}>
              {`Rota ${idx + 1} – ${formatKm(route.distance)}, ${formatDuration(route.duration)}`}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
}
