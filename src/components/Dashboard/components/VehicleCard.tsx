import { Avatar, Box, Card, CardContent, Typography } from "@mui/material";
import data from "../../../data/frontend_data_gps.json";
import styles from "../styles/VehicleCard.module.scss";

const { vehicle } = data;

export function VehicleCard() {
  if (!vehicle) return null;

  const { plate, vin, color, picture } = vehicle;

  return (
    <Card className={styles.cardRoot} sx={{ mb: 2 }}>
      <CardContent className={styles.cardContent}>
        <Avatar
          alt="Veículo"
          src={picture?.address}
          variant="rounded"
          sx={{ width: 64, height: 64 }}
        />
        <Box className={styles.vehicleText}>
          <Typography variant="subtitle1" fontWeight="bold">
            Placa: {plate}
          </Typography>
          <Typography variant="body2">Chassi: {vin}</Typography>
          <Box display="flex" alignItems="center" mt={1}>
            <Box
              sx={{
                backgroundColor: color,
                border: "1px solid #888",
                borderRadius: "50%",
                height: 16,
                mr: 1,
                width: 16,
              }}
            />
            <Typography variant="body2">{color}</Typography>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
}
