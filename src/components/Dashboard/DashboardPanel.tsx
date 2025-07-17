import styles from "./DashboardPanel.module.scss";
import SpeedControl from "./SpeedControl";
import RouteSelector from "./RouteSelector";
import CenterMapButton from "./CenterMapButton";

interface DashboardPanelProps {
  speedKmh: number;
  onSpeedChange: (_: Event, value: number | number[]) => void;
  currentRouteIndex: number;
  totalRoutes: number;
  onNextRoute: () => void;
  onCenterMap: () => void;
}

export default function DashboardPanel({
  speedKmh,
  onSpeedChange,
  currentRouteIndex,
  totalRoutes,
  onNextRoute,
  onCenterMap,
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
        <button className={styles.centerButton} onClick={onCenterMap}>
          🔁 Centralizar
        </button>
      </div>
    </div>
  );
}
