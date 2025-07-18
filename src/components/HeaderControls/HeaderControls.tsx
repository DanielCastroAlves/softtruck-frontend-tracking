import { Box, Button, Typography, Stack } from "@mui/material";
import { RouteSelector } from "../Dashboard/components";

interface Props {
  selectedRouteIndex: number;
  setSelectedRouteIndex: (i: number) => void;
  modoReal: boolean;
  snapDisponivel: boolean;
  toggleModo: () => void;
}

export function HeaderControls({
  selectedRouteIndex,
  setSelectedRouteIndex,
  modoReal,
  snapDisponivel,
  toggleModo
}: Props) {
  return (
    <Box
      sx={{
        position: "fixed",
        top: 16,
        left: "50%",
        transform: "translateX(-50%)",
        zIndex: 1100,
        backgroundColor: "#fff",
        borderRadius: 2,
        boxShadow: 3,
        px: 2,
        py: 1.5,
        display: "flex",
        alignItems: "center",
        gap: 2,
      }}
    >
      <RouteSelector
        current={selectedRouteIndex}
        onChange={setSelectedRouteIndex}
      />
      <Stack spacing={0.5} alignItems="center">
        <Button
          size="small"
          variant="outlined"
          color={modoReal ? "secondary" : "primary"}
          onClick={toggleModo}
          disabled={!snapDisponivel}
          sx={{
            whiteSpace: "nowrap",
            minWidth: 110,
            fontWeight: 600,
          }}
        >
          MODO: {modoReal ? "REAL" : "BETA"}
        </Button>
        {!snapDisponivel && (
          <Typography variant="caption" color="error">
            Modo BETA indisponível
          </Typography>
        )}
      </Stack>
    </Box>
  );
}
