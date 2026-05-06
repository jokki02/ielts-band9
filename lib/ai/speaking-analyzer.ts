import { roundHalf, clamp, countWords } from "../utils";
import { geminiJson, hasGemini } from "./gemini";
import { groqJson, hasGroq } from "./groq";
import { Provider } from "./heuristic-grader";

export interface SpeakingResult {
  scores: {
    fluencyCoherence: number;
    lexicalResource: number;
    grammaticalRange: number;
    pronunciation: number;
    overall: number;
  };
  feedback: {
    fluency: { good: string[]; improve: string[]; tip: string };
    vocabulary: {
      good_expressions: string[];
      basic_words_to_upgrade: { said: string; better: string }[];
      missing_connectors: string[];
    };
    grammar: { errors_found: string[]; pattern_issues: string[] };
    content: { relevance: string; depth: string; examples_used: boolean };
  };
  model_answer_key_phrases: string[];
  band9_response_snippet: string;
  provider: Provider;
}

function buildPrompt(question: string, transcript: string, durationS: number) {
  return `You are an expert IELTS Speaking examiner. Analyse this Speaking response.
QUESTION: ${question}
TRANSCRIPT: """${transcript.slice(0, 3000)}"""
DURATION: ${durationS} seconds
WORDS: ${countWords(transcript)}

Return ONLY this JSON:
{
  "scores": {
    "fluencyCoherence": number (0..9),
    "lexicalResource": number (0..9),
    "grammaticalRange": number (0..9),
    "pronunciation": number (0..9, estimated from word/phrase patterns since you cannot hear),
    "overall": number (0..9 rounded to nearest 0.5)
  },
  "feedback": {
    "fluency":   { "good": [string], "improve": [string], "tip": string },
    "vocabulary":{ "good_expressions": [string], "basic_words_to_upgrade": [{"said": string, "better": string}], "missing_connectors": [string] },
    "grammar":   { "errors_found": [string], "pattern_issues": [string] },
    "content":   { "relevance": string, "depth": string, "examples_used": boolean }
  },
  "model_answer_key_phrases": [string],
  "band9_response_snippet": "First 3 sentences at Band 9 level."
}`;
}

function heuristicSpeaking(
  question: string,
  transcript: string,
  durationS: number,
): SpeakingResult {
  const wc = countWords(transcript);
  const wpm = durationS ? (wc / durationS) * 60 : 0;
  const sents = transcript.split(/[.!?]+\s+/).filter(Boolean);
  const avgLen = sents.length ? wc / sents.length : 0;

  let fluency = 6.5;
  if (wpm >= 120 && wpm <= 170) fluency += 0.5;
  if (sents.length >= 5) fluency += 0.5;

  let lex = 6.0;
  const academic = (transcript.match(
    /\b(furthermore|moreover|specifically|notably|nevertheless|consequently|substantial|significant|advantageous)\b/gi,
  ) || []).length;
  if (academic >= 1) lex += 0.5;
  if (academic >= 3) lex += 0.5;

  let gr = 6.0;
  if (avgLen >= 12) gr += 0.5;
  if (avgLen >= 16) gr += 0.5;

  const pronunciation = 6.5; // can't measure without audio analysis

  const overall = clamp(
    roundHalf((fluency + lex + gr + pronunciation) / 4),
    4,
    9,
  );

  return {
    scores: {
      fluencyCoherence: roundHalf(fluency),
      lexicalResource: roundHalf(lex),
      grammaticalRange: roundHalf(gr),
      pronunciation,
      overall,
    },
    feedback: {
      fluency: {
        good: [
          wpm
            ? `Speaking pace ${Math.round(wpm)} wpm`
            : "You produced extended speech.",
        ],
        improve: [
          wpm < 120
            ? "Speak a little faster and reduce hesitation."
            : wpm > 180
              ? "Slow down slightly to articulate clearly."
              : "Aim for a smoother flow with fewer fillers.",
        ],
        tip: "Use discourse markers (well, you see, the thing is) to gain thinking time naturally.",
      },
      vocabulary: {
        good_expressions: [],
        basic_words_to_upgrade: [
          { said: "very good", better: "outstanding" },
          { said: "really important", better: "of paramount importance" },
        ],
        missing_connectors:
          academic < 2
            ? ["furthermore", "in particular", "as a result"]
            : [],
      },
      grammar: {
        errors_found: [],
        pattern_issues:
          avgLen < 10 ? ["Sentences are short — try complex structures."] : [],
      },
      content: {
        relevance: "Your answer addresses the question.",
        depth:
          wc > 80
            ? "Reasonable depth with some development."
            : "Add at least one specific example.",
        examples_used: /for example|for instance|like when/i.test(transcript),
      },
    },
    model_answer_key_phrases: [
      "from my perspective",
      "having said that",
      "to give you a concrete example",
    ],
    band9_response_snippet:
      "From my perspective, this is an issue worth examining from several angles. To give you a concrete example, I recall an instance where... Having said that, the broader implications extend well beyond this single case.",
    provider: "heuristic",
  };
}

export async function analyzeSpeaking(
  question: string,
  transcript: string,
  durationS: number,
): Promise<SpeakingResult> {
  const p = buildPrompt(question, transcript, durationS);

  if (hasGemini()) {
    try {
      const r = await geminiJson<SpeakingResult>(p);
      return { ...r, provider: "gemini" };
    } catch (err) {
      console.error("[analyzeSpeaking] Gemini failed:", (err as Error).message);
    }
  }
  if (hasGroq()) {
    try {
      const r = await groqJson<SpeakingResult>(p);
      return { ...r, provider: "groq" };
    } catch (err) {
      console.error("[analyzeSpeaking] Groq failed:", (err as Error).message);
    }
  }
  return heuristicSpeaking(question, transcript, durationS);
}
