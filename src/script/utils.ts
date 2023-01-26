export function randomInteger(min: number, max: number): number {
  let rand = min + Math.random() * (max + 1 - min);
  return Math.floor(rand);
}

export function parseTimestamp(timestamp: number) {
  const m = Math.floor(timestamp / 1000 / 60);
  const s = Math.floor(timestamp / 1000 - m * 60);

  return `${m > 10 ? m : "0" + m}:${s > 10 ? s : "0" + s}`;
}
