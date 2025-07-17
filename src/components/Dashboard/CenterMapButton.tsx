// src/components/Dashboard/CenterMapButton.tsx
import { Button } from "@mui/material";
import MyLocationIcon from "@mui/icons-material/MyLocation";

interface CenterMapButtonProps {
  onClick: () => void;
}

export default function CenterMapButton({ onClick }: CenterMapButtonProps) {
  return (
    <Button
      onClick={onClick}
      variant="outlined"
      startIcon={<MyLocationIcon />}
      fullWidth
    >
      Centralizar Mapa
    </Button>
  );
}
