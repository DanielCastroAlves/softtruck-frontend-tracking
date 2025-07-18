import data from "../data/frontend_data_gps.json";
import type { CourseInfo, Route } from "../types/route";


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
