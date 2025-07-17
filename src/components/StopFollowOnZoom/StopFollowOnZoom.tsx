import { useMapEvents } from "react-leaflet";

interface StopFollowOnZoomProps {
  onStop: () => void;
}

export default function StopFollowOnZoom({ onStop }: StopFollowOnZoomProps) {
  useMapEvents({
    zoomstart: onStop,
    dragstart: onStop,
  });

  return null;
}
