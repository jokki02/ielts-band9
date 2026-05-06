export const APP_NAME =
  process.env.NEXT_PUBLIC_APP_NAME || "IELTS Band 9 Prep";

export const MODULES = [
  "writing",
  "reading",
  "listening",
  "speaking",
  "vocabulary",
  "mock",
] as const;

export type Module = (typeof MODULES)[number];

export const MODULE_LABEL: Record<Module, string> = {
  writing: "Writing",
  reading: "Reading",
  listening: "Listening",
  speaking: "Speaking",
  vocabulary: "Vocabulary",
  mock: "Mock Test",
};

export const MODULE_COLOR: Record<Module, string> = {
  writing: "writing",
  reading: "reading",
  listening: "listening",
  speaking: "speaking",
  vocabulary: "vocabulary",
  mock: "primary",
};

export const TASK2_TYPES = [
  "opinion",
  "discussion",
  "problem-solution",
  "advantages-disadvantages",
  "direct-questions",
] as const;

export const TASK1_TYPES = [
  "bar-chart",
  "line-graph",
  "pie-chart",
  "table",
  "map",
  "process",
  "mixed",
] as const;

export const TOPICS = [
  "education",
  "environment",
  "technology",
  "health",
  "society",
  "crime",
  "media",
  "globalization",
  "work",
  "government",
  "science",
  "arts",
] as const;
