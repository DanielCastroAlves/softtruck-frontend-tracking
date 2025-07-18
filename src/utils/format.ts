export function formatKm(meters: number) {
  return `${(meters / 1000).toFixed(1)} km`;
}

export function formatDuration(seconds: number) {
  const min = Math.floor(seconds / 60);
  const sec = seconds % 60;
  return `${min}min ${sec}s`;
}
