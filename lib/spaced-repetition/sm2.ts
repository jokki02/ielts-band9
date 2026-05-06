// SM-2 (SuperMemo) spaced repetition algorithm.
// Reference: https://en.wikipedia.org/wiki/SuperMemo#Description_of_SM-2_algorithm
//
// rating: 0..5 (0 = total blackout, 5 = perfect recall)
// We accept 1..5 from the UI and treat 1..2 as "didn't know" → reset.

export interface Sm2Input {
  rating: 1 | 2 | 3 | 4 | 5;
  repetitions: number;
  easeFactor: number;
  interval: number; // in days
}

export interface Sm2Output {
  newRepetitions: number;
  newEaseFactor: number;
  nextInterval: number;
  nextReviewAt: Date;
}

export function sm2Step(input: Sm2Input): Sm2Output {
  const { rating } = input;
  let { repetitions, easeFactor, interval } = input;

  if (rating < 3) {
    repetitions = 0;
    interval = 1;
  } else {
    if (repetitions === 0) interval = 1;
    else if (repetitions === 1) interval = 6;
    else interval = Math.round(interval * easeFactor);
    repetitions += 1;
  }

  // Update ease factor (clamped at 1.3)
  const q = rating;
  const newEf = easeFactor + (0.1 - (5 - q) * (0.08 + (5 - q) * 0.02));
  easeFactor = Math.max(1.3, newEf);

  const nextReviewAt = new Date();
  nextReviewAt.setDate(nextReviewAt.getDate() + interval);

  return {
    newRepetitions: repetitions,
    newEaseFactor: Number(easeFactor.toFixed(3)),
    nextInterval: interval,
    nextReviewAt,
  };
}
