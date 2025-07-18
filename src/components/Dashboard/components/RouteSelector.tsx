import { MenuItem, Select, Typography } from "@mui/material";
import type { SelectChangeEvent } from "@mui/material";
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
    <Select
      value={current.toString()}
      onChange={handleRouteChange}
      variant="outlined"
      size="small"
      displayEmpty
      sx={{
        minWidth: 220,
        borderRadius: 2,
        px: 3,
        py: 0.5,
        backgroundColor: "#fff",
        boxShadow: "0 1px 2px rgba(0,0,0,0.1)",
        fontFamily: '"Inter", sans-serif',
        fontWeight: 400,
        ".MuiSelect-select": {
          display: "flex",
          alignItems: "center",
          gap: "4px",
          paddingY: "6px",
        },
      }}
    >
      {routes.map((route, idx) => (
        <MenuItem key={idx} value={idx.toString()}>
          <Typography component="span" fontWeight={600}>
            {t("controls.route.label")} {idx + 1}
          </Typography>
          <Typography component="span" ml={1} color="text.secondary">
            – {formatKm(route.distance)}, {formatDuration(route.duration)}
          </Typography>
        </MenuItem>
      ))}
    </Select>
  );
}
