export function smoothAngle(prev: number, next: number, factor = 0.2): number {
  const diff = ((((next - prev) % 360) + 540) % 360) - 180;
  return (prev + diff * factor + 360) % 360;
}
