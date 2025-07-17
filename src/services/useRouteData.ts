import data from "../data/frontend_data_gps.json";

export interface GpsPoint {
  latitude: number;
  longitude: number;
  acquisition_time_unix: number;
  acquisition_time: string;
  speed: number;
  direction?: number;
  address?: string;
  vehicle_id?: string;
}

export interface Route {
  start_at: string;
  end_at: string;
  distance: number;
  stops: number;
  gps: GpsPoint[];
}

export interface CourseInfo {
  index: number;
  start_at: string;
  end_at: string;
  distance: number;
  stops: number;
}

export function getAvailableRoutes(): CourseInfo[] {
  return data.courses.map((course, index) => ({
    index,
    start_at: course.start_at,
    end_at: course.end_at,
    distance: course.distance,
    stops: course.stops,
  }));
}

export function getRouteByIndex(index: number): Route | null {
  if (index < 0 || index >= data.courses.length) return null;
  return data.courses[index];
}
