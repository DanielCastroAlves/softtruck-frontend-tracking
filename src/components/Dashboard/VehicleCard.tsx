import { Card, CardContent, Typography, Box, Avatar } from "@mui/material";
import data from "../../data/frontend_data_gps.json";
import styles from "./VehicleCard.module.scss";

const vehicle = data.vehicle;

export default function VehicleCard() {
  if (!vehicle) return null;

  const { plate, vin, color, picture } = vehicle;

  return (
    <Card className={styles.cardRoot} sx={{ mb: 2 }}>
      <CardContent className={styles.cardContent}>
        <Avatar
          src={picture?.address}
          alt="Veículo"
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
                width: 16,
                height: 16,
                backgroundColor: color,
                borderRadius: "50%",
                border: "1px solid #888",
                mr: 1,
              }}
            />
            <Typography variant="body2">{color}</Typography>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
}
