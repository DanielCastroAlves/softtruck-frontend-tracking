// src/data/routes.ts
import gpsData from "../data/frontend_data_gps.json";

export interface GpsPoint {
  latitude: number;
  longitude: number;
}

export function getRouteByIndex(index: number): { gps: GpsPoint[] } | null {
  const course = gpsData.courses?.[index];
  if (!course || !course.gps) return null;

  const gps = course.gps.map((p: any) => ({
    longitude: p.longitude,
    latitude: p.latitude,
  }));

  return { gps };
}
