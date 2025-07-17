import { useEffect } from "react";
import { useMap } from "react-leaflet";
import type { LatLngExpression } from "leaflet";

interface FollowCarControlProps {
  position: LatLngExpression;
  followCar: boolean;
}

export default function FollowCarControl({ position, followCar }: FollowCarControlProps) {
  const map = useMap();

  useEffect(() => {
    if (followCar) {
      map.setView(position, 17, { animate: true });
    }
  }, [position, followCar, map]);

  return null;
}
