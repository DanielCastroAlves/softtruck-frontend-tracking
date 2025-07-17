import { Box, Typography, Button } from "@mui/material";
import { useTranslation } from "react-i18next";

interface RouteSelectorProps {
  current: number;
  total: number;
  onNext: () => void;
}

export default function RouteSelector({ current, total, onNext }: RouteSelectorProps) {
  const { t } = useTranslation();

  return (
    <Box mb={2} display="flex" alignItems="center" gap={1}>
      <Typography variant="subtitle2">
        {t("controls.route.label")} ({current + 1}/{total})
      </Typography>
      <Button variant="outlined" size="small" onClick={onNext}>
        {t("controls.route.next")}
      </Button>
    </Box>
  );
}
