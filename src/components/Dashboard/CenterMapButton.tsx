import { Button } from "@mui/material";
import MyLocationIcon from "@mui/icons-material/MyLocation";
import { useTranslation } from "react-i18next";

interface CenterMapButtonProps {
  onClick: () => void;
}

export default function CenterMapButton({ onClick }: CenterMapButtonProps) {
  const { t } = useTranslation();

  return (
    <Button
      variant="outlined"
      fullWidth
      startIcon={<MyLocationIcon />}
      onClick={onClick}
    >
      {t("controls.centerMap")}
    </Button>
  );
}
