export type ReadingQuestionType =
  | "tfng"
  | "ynng"
  | "mcq"
  | "mcq_multi"
  | "matching_headings"
  | "matching_information"
  | "matching_features"
  | "matching_sentence_endings"
  | "sentence_completion"
  | "summary_completion"
  | "note_completion"
  | "table_completion"
  | "flowchart_completion"
  | "short_answer";

export const QUESTION_TYPE_LABEL: Record<ReadingQuestionType, string> = {
  tfng: "True / False / Not Given",
  ynng: "Yes / No / Not Given",
  mcq: "Multiple Choice (single)",
  mcq_multi: "Multiple Choice (multiple)",
  matching_headings: "Matching Headings",
  matching_information: "Matching Information",
  matching_features: "Matching Features",
  matching_sentence_endings: "Matching Sentence Endings",
  sentence_completion: "Sentence Completion",
  summary_completion: "Summary Completion",
  note_completion: "Note Completion",
  table_completion: "Table Completion",
  flowchart_completion: "Flow-chart Completion",
  short_answer: "Short Answer",
};

export function normaliseAnswer(s: string) {
  return s.trim().toLowerCase().replace(/\s+/g, " ");
}

export function isReadingAnswerCorrect(
  type: ReadingQuestionType,
  expected: string | string[],
  given: string | string[] | undefined | null,
): boolean {
  if (given === undefined || given === null) return false;
  if (Array.isArray(expected)) {
    if (!Array.isArray(given)) return false;
    if (given.length !== expected.length) return false;
    const a = expected.map(normaliseAnswer).sort();
    const b = given.map(normaliseAnswer).sort();
    return a.every((v, i) => v === b[i]);
  }
  if (Array.isArray(given)) return false;
  // Allow "OR" alternatives separated by " | " in the expected answer.
  const acceptable = expected.split("|").map(normaliseAnswer);
  return acceptable.includes(normaliseAnswer(given));
}
