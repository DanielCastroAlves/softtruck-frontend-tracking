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
  duration?: number;
  speed_max?: number;
  speed_avg?: number;
  total_stop_time?: number;
  stop_points?: {
    type: string;
    coordinates: (number | null)[][];
  };
}

export interface CourseInfo {
  index: number;
  start_at: string;
  end_at: string;
  distance: number;
  stops: number;
}

export interface CarAnimationParams {
  speedRef: React.MutableRefObject<number>;
  setCarPosition: (pos: [number, number]) => void;
  setCarAngle: (angle: number) => void;
  setTempoParado: (cb: (t: number) => number) => void;
  setTempoRodando: (cb: (t: number) => number) => void;
  roadCoords: [number, number][];
  onFinish?: () => void; // 👈 adicione esta linha
}
