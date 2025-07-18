import { useRef } from "react";
import { point as turfPoint } from "@turf/helpers";
import along from "@turf/along";
import bearing from "@turf/bearing";
import { DISTANCE_UNIT } from "../config/map";
import type { CarAnimationParams } from "../types/route";



export function useCarAnimation({
  speedRef,
  setCarPosition,
  setCarAngle,
  setTempoParado,
  setTempoRodando,
}: CarAnimationParams) {
  const routeLineRef = useRef<any>(null);
  const totalDistanceRef = useRef(0);
  const distanceRef = useRef(0);
  const prevTimeRef = useRef<number | null>(null);
  const animationRef = useRef<number | null>(null);
  const angleRef = useRef(0);

  function smoothAngle(prev: number, next: number, factor = 0.2) {
    const diff = ((((next - prev) % 360) + 540) % 360) - 180;
    return (prev + diff * factor + 360) % 360;
  }

  function animate(ts: number) {
    if (!routeLineRef.current) return;

    if (!prevTimeRef.current) prevTimeRef.current = ts;
    const delta = (ts - prevTimeRef.current) / 1000;
    prevTimeRef.current = ts;

    const speed = speedRef.current / 3600;
    distanceRef.current += speed * delta;

    if (speedRef.current < 2) {
      setTempoParado((prev) => prev + delta);
    } else {
      setTempoRodando((prev) => prev + delta);
    }

    if (distanceRef.current > totalDistanceRef.current) {
      cancelAnimationFrame(animationRef.current!);
      animationRef.current = null;
      return;
    }

    const curr = along(
      routeLineRef.current,
      distanceRef.current,
      DISTANCE_UNIT
    );
    const prev = along(
      routeLineRef.current,
      Math.max(distanceRef.current - 0.0001, 0),
      DISTANCE_UNIT
    );
    const next = along(
      routeLineRef.current,
      Math.min(distanceRef.current + 0.0001, totalDistanceRef.current),
      DISTANCE_UNIT
    );

    const rawAngle = bearing(
      turfPoint(prev.geometry.coordinates),
      turfPoint(next.geometry.coordinates)
    );
    angleRef.current = smoothAngle(angleRef.current, rawAngle);

    const [lng, lat] = curr.geometry.coordinates;
    setCarPosition([lat, lng]);
    setCarAngle(angleRef.current);
    

    animationRef.current = requestAnimationFrame(animate);
  }

  function handlePlay() {
    if (!animationRef.current) {
      prevTimeRef.current = null;
      animationRef.current = requestAnimationFrame(animate);
    }
  }

  function handlePause() {
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
      animationRef.current = null;
    }
  }

  function handleReset() {
    distanceRef.current = 0;
    prevTimeRef.current = null;
    angleRef.current = 0;
    setTempoParado(() => 0);
    setTempoRodando(() => 0);

    if (routeLineRef.current) {
      const [lng, lat] = routeLineRef.current.geometry.coordinates[0];
      setCarPosition([lat, lng]);
      setCarAngle(0);
    }
  }

  return {
    routeLineRef,
    totalDistanceRef,
    animationRef,
    prevTimeRef,
    handlePlay,
    handlePause,
    handleReset,
  };
}
