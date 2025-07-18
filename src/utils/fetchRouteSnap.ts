import { lineString } from "@turf/helpers";
import length from "@turf/length";
import { OSRM_BASE_URL, DISTANCE_UNIT } from "../config/map";

export async function fetchSnappedRoute(rawPoints: [number, number][]) {
  const coordsParam = rawPoints.map(([lon, lat]) => `${lon},${lat}`).join(";");

  const res = await fetch(`${OSRM_BASE_URL}/${coordsParam}?overview=full&geometries=geojson`);
  const data = await res.json();
  const snapped = data.routes?.[0]?.geometry?.coordinates || rawPoints;

  const snappedLine = lineString(snapped);
  const totalKm = length(snappedLine, DISTANCE_UNIT);

  return {
    snappedCoords: snapped.map(([lng, lat]: [number, number]) => [lat, lng]) as [number, number][],
    snappedLine,
    totalKm
  };
}
