// src/components/Dashboard/CenterMapButton.tsx
import { Button } from "@mui/material";
import MyLocationIcon from "@mui/icons-material/MyLocation";

interface CenterMapButtonProps {
  onClick: () => void;
}

export default function CenterMapButton({ onClick }: CenterMapButtonProps) {
  return (
    <Button
      variant="outlined"
      fullWidth
      startIcon={<MyLocationIcon />}
      onClick={onClick}
    >
      Centralizar Mapa
    </Button>
  );
}
