// Official IELTS Academic raw-score → band-score conversion tables.
//
// Listening: 0–40 raw points
// Reading (Academic): 0–40 raw points

const LISTENING_TABLE: Array<[number, number, number]> = [
  // [minRaw, maxRaw, band]
  [39, 40, 9.0],
  [37, 38, 8.5],
  [35, 36, 8.0],
  [33, 34, 7.5],
  [30, 32, 7.0],
  [27, 29, 6.5],
  [23, 26, 6.0],
  [20, 22, 5.5],
  [16, 19, 5.0],
  [13, 15, 4.5],
  [11, 12, 4.0],
  [8, 10, 3.5],
  [6, 7, 3.0],
  [4, 5, 2.5],
  [3, 3, 2.0],
  [2, 2, 1.5],
  [1, 1, 1.0],
  [0, 0, 0.0],
];

const READING_ACADEMIC_TABLE: Array<[number, number, number]> = [
  [39, 40, 9.0],
  [37, 38, 8.5],
  [35, 36, 8.0],
  [33, 34, 7.5],
  [30, 32, 7.0],
  [27, 29, 6.5],
  [23, 26, 6.0],
  [19, 22, 5.5],
  [15, 18, 5.0],
  [13, 14, 4.5],
  [11, 12, 4.0],
  [10, 10, 3.5],
  [8, 9, 3.0],
  [6, 7, 2.5],
  [4, 5, 2.0],
  [3, 3, 1.5],
  [1, 2, 1.0],
  [0, 0, 0.0],
];

function fromTable(
  table: Array<[number, number, number]>,
  raw: number,
  total: number,
): number {
  // Tables are calibrated for full 40-question tests; for shorter passages we
  // proportionally extrapolate to a 40-question equivalent before lookup.
  const equiv = Math.round((raw / Math.max(1, total)) * 40);
  for (const [min, max, band] of table) {
    if (equiv >= min && equiv <= max) return band;
  }
  return 0;
}

export function listeningRawToBand(raw: number, total = 40) {
  return fromTable(LISTENING_TABLE, raw, total);
}

export function readingRawToBand(raw: number, total = 40) {
  return fromTable(READING_ACADEMIC_TABLE, raw, total);
}

/**
 * Average four section bands, rounded to the nearest 0.5 (official IELTS rule).
 * 7.0 + 7.5 + 8.0 + 8.0 = 30.5 / 4 = 7.625 → rounds UP to 7.5 (banker round) or
 * IELTS rule rounds to nearest .25 ⇒ 7.5. We follow the official rule: averages
 * ending in .25 round UP, .75 also round UP.
 */
export function averageOverall(bands: number[]): number {
  const avg = bands.reduce((s, b) => s + b, 0) / Math.max(1, bands.length);
  // Official IELTS averaging rule: round to nearest 0.5, with x.25 rounding up.
  const x10 = Math.round(avg * 10);
  const lastDigit = x10 % 10;
  let rounded: number;
  if (lastDigit <= 2) rounded = x10 - lastDigit;
  else if (lastDigit <= 7) rounded = x10 - lastDigit + 5;
  else rounded = x10 - lastDigit + 10;
  return rounded / 10;
}
