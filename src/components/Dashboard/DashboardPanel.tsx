import styles from "./DashboardPanel.module.scss";
import SpeedControl from "./SpeedControl";
import RouteSelector from "./RouteSelector";
import CenterMapButton from "./CenterMapButton";
import HUD from "../HUD/HUD";

interface DashboardPanelProps {
  speedKmh: number;
  onSpeedChange: (_: Event, value: number | number[]) => void;
  currentRouteIndex: number;
  totalRoutes: number;
  onNextRoute: () => void;
  onCenterMap: () => void;
  tempoParado: number;
  tempoRodando: number;
  angulo: number;
}

export default function DashboardPanel({
  speedKmh,
  onSpeedChange,
  currentRouteIndex,
  totalRoutes,
  onNextRoute,
  onCenterMap,
  tempoParado,
  tempoRodando,
  angulo,
}: DashboardPanelProps) {
  return (
    <div className={styles.panel}>
      <div className={styles.section}>
        <SpeedControl value={speedKmh} onChange={onSpeedChange} />
      </div>

      <div className={styles.section}>
        <RouteSelector
          current={currentRouteIndex}
          total={totalRoutes}
          onNext={onNextRoute}
        />
      </div>

      <div className={styles.section}>
        <CenterMapButton onClick={onCenterMap} />
      </div>

      <HUD
        tempoParado={tempoParado}
        tempoRodando={tempoRodando}
        velocidade={speedKmh}
        angulo={angulo}
      />
    </div>
  );
}
