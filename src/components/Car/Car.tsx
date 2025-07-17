import { Marker } from "react-leaflet";
import L from "leaflet";
import "./Car.scss";

export interface CarProps {
  position: [number, number];
  angle: number; // Em graus, vindo do JSON ou calculado via bearing()
}

const Car = ({ position, angle }: CarProps) => {
  const totalFrames = 120;
  const frameWidth = 152;
  const frameHeight = 151;

  const scale = 0.5;
  const iconW = frameWidth * scale;
  const iconH = frameHeight * scale;

  // Corrige o offset de direção (sprite começa apontando para o sul)
  const correctedAngle = (angle + 180 + 360) % 360; // Garante valor entre 0-359
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
};

export default Car;
