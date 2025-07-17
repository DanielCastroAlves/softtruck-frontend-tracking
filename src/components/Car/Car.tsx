import { Marker, useMap } from "react-leaflet";
import L from "leaflet";
import "./Car.scss";

export interface CarProps {
  position: [number, number];
  angle: number;
}

export default function Car({ position, angle }: CarProps) {
  const map = useMap();
  const zoom = map.getZoom();

  const baseZoom = 17;
  const baseScale = 0.3;
  const scale = Math.max(
    0.15,
    Math.min(0.5, baseScale * (zoom / baseZoom))
  );

  const totalFrames = 120;
  const frameWidth = 152;
  const frameHeight = 151;

  const iconW = frameWidth * scale;
  const iconH = frameHeight * scale;

  const correctedAngle = (360 - angle) % 360;
  const degreesPerFrame = 360 / totalFrames;
  const frameIndex = Math.round(correctedAngle / degreesPerFrame) % totalFrames;

  const icon = L.divIcon({
    className: "car-icon",
    html: `
      <div
        class="car-sprite"
        style="
          width: ${frameWidth}px;
          height: ${frameHeight}px;
          background-position: -${frameIndex * frameWidth}px 0;
          transform: scale(${scale});
          transform-origin: top left;
        "
      ></div>
    `,
    iconSize: [iconW, iconH],
    iconAnchor: [iconW / 2, iconH / 2],
  });

  return <Marker position={position} icon={icon} />;
}
