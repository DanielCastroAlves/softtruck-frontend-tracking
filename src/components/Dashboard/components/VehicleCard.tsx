import { Avatar, Box, Card, CardContent, Typography } from "@mui/material";
import data from "../../../data/frontend_data_gps.json";
import styles from "../styles/VehicleCard.module.scss";
import { useTranslation } from "react-i18next";

const { vehicle } = data;

export function VehicleCard() {
  const { t } = useTranslation();

  if (!vehicle) return null;

  const { plate, vin, picture } = vehicle;

  return (
    <Card
      className={styles.cardRoot}
      sx={{
        mb: 2,
        bgcolor: "#f7f9fc",
        borderRadius: 3,
        p: 2,
        boxShadow: "0 2px 6px rgba(0,0,0,0.08)",
      }}
    >
      <CardContent className={styles.cardContent}>
        <Avatar
          alt="Veículo"
          src={picture?.address}
          variant="rounded"
          sx={{ width: 64, height: 64 }}
        />
        <Box className={styles.vehicleText}>
          <Typography variant="subtitle1" fontWeight="bold">
            {t("hud.vehicleCard.plate")} {plate}
          </Typography>
          <Typography variant="body2">
            {t("hud.vehicleCard.vin")} {vin}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
}
