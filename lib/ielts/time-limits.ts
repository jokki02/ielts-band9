// Official IELTS time limits in seconds.
export const TIME_LIMITS = {
  writing: {
    task1: 20 * 60,
    task2: 40 * 60,
  },
  reading: {
    perPassage: 20 * 60,
    fullTest: 60 * 60,
  },
  listening: {
    fullTest: 30 * 60,
    transferTime: 10 * 60,
  },
  speaking: {
    part1: 5 * 60,
    part2Prep: 60,
    part2Speak: 2 * 60,
    part3: 5 * 60,
  },
} as const;
