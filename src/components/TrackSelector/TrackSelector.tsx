import { useGps } from '../../contexts/GpsContext';
import { getAvailableRoutes } from '../../services/useRouteData';
import styles from './TrackSelector.module.scss';

const TrackSelector = () => {
  const { selectedRouteIndex, setSelectedRouteIndex } = useGps();
  const routes = getAvailableRoutes();

  return (
    <div className={styles.selectorContainer}>
      <label htmlFor="route-select" className={styles.label}>
        Selecione a Rota:
      </label>
      <select
        id="route-select"
        className={styles.select}
        value={selectedRouteIndex}
        onChange={(e) => setSelectedRouteIndex(Number(e.target.value))}
      >
        {routes.map((route) => (
          <option key={route.index} value={route.index}>
            {new Date(route.start_at).toLocaleTimeString()} → {new Date(route.end_at).toLocaleTimeString()} ({Math.round(route.distance / 1000)} km)
          </option>
        ))}
      </select>
    </div>
  );
};

export default TrackSelector;
