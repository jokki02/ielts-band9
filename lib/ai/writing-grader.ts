import { countWords, roundHalf } from "../utils";
import { geminiJson, hasGemini } from "./gemini";
import { groqJson, hasGroq } from "./groq";
import {
  GradingResult,
  Provider,
  heuristicGrade,
} from "./heuristic-grader";

function prompt(taskType: "task1" | "task2", taskPrompt: string, essay: string) {
  const wc = countWords(essay);
  return `You are an expert IELTS examiner with 20 years of experience. Grade the following IELTS Academic Writing ${taskType === "task1" ? "Task 1" : "Task 2"} response STRICTLY using the official Band Descriptors.

PROMPT:
"""
${taskPrompt}
"""

CANDIDATE RESPONSE (HTML stripped):
"""
${essay.replace(/<[^>]+>/g, " ").slice(0, 6000)}
"""

WORD COUNT: ${wc}
MINIMUM: ${taskType === "task1" ? 150 : 250}

Return ONLY a valid JSON object — no prose before or after — matching this exact schema:
{
  "scores": {
    "taskAchievement": number (0..9, half-points),
    "coherenceCohesion": number (0..9, half-points),
    "lexicalResource": number (0..9, half-points),
    "grammaticalRange": number (0..9, half-points),
    "overall": number (0..9, rounded to nearest 0.5)
  },
  "feedback": {
    "taskAchievement":   { "score_justification": string, "strengths": [string,string], "improvements": [string,string], "band9_tip": string },
    "coherenceCohesion": { "score_justification": string, "strengths": [string,string], "improvements": [string,string], "band9_tip": string },
    "lexicalResource":   { "score_justification": string, "strengths": [string,string], "improvements": [string,string], "band9_tip": string },
    "grammaticalRange":  { "score_justification": string, "strengths": [string,string], "improvements": [string,string], "band9_tip": string }
  },
  "vocabulary": {
    "good_phrases": [string],
    "overused_words": [string],
    "suggested_upgrades": [{ "original": string, "better": string }]
  },
  "grammar_errors": [{ "error": string, "correction": string, "explanation": string }],
  "overall_comment": string,
  "band9_version_intro": "Rewrite ONLY the introduction paragraph at Band 9 level."
}

Be strict. Provide concrete, candidate-specific feedback (quote phrases from the essay). Do not invent text not present in the essay. The "overall" score must be the average of the four criteria, rounded to the nearest 0.5.`;
}

function normalise(result: GradingResult): GradingResult {
  // Ensure scores are valid and overall is consistent.
  const s = result.scores;
  const overall = roundHalf(
    (s.taskAchievement + s.coherenceCohesion + s.lexicalResource + s.grammaticalRange) /
      4,
  );
  return {
    ...result,
    scores: {
      ...s,
      taskAchievement: roundHalf(s.taskAchievement),
      coherenceCohesion: roundHalf(s.coherenceCohesion),
      lexicalResource: roundHalf(s.lexicalResource),
      grammaticalRange: roundHalf(s.grammaticalRange),
      overall,
    },
    vocabulary: {
      good_phrases: result.vocabulary?.good_phrases ?? [],
      overused_words: result.vocabulary?.overused_words ?? [],
      suggested_upgrades: result.vocabulary?.suggested_upgrades ?? [],
    },
    grammar_errors: result.grammar_errors ?? [],
  };
}

export async function gradeEssay(
  taskPrompt: string,
  essay: string,
  taskType: "task1" | "task2",
): Promise<GradingResult> {
  const p = prompt(taskType, taskPrompt, essay);

  // Try Gemini first
  if (hasGemini()) {
    try {
      const r = await geminiJson<GradingResult>(p);
      return normalise({ ...r, provider: "gemini" as Provider });
    } catch (err) {
      console.error("[gradeEssay] Gemini failed:", (err as Error).message);
    }
  }

  // Fall back to Groq
  if (hasGroq()) {
    try {
      const r = await groqJson<GradingResult>(p);
      return normalise({ ...r, provider: "groq" as Provider });
    } catch (err) {
      console.error("[gradeEssay] Groq failed:", (err as Error).message);
    }
  }

  // Last resort: local heuristic grader
  return heuristicGrade(taskPrompt, essay, taskType);
}
