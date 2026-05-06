import { hasGemini, geminiJson } from "./gemini";

export type DiscoverModule = "listening" | "reading" | "writing-task1" | "writing-task2" | "vocabulary" | "speaking" | "tips";

export interface DiscoverSuggestion {
  /** Short title shown in the suggestion card. */
  title: string;
  /** 1–2 sentence description of what the material is. */
  description: string;
  /** Display name of the source (e.g. "TED-Ed", "Wikipedia", "IELTS Liz"). */
  sourceName: string;
  /** Canonical URL the user can open to read/watch the material. */
  sourceUrl: string;
  /** Free-form licence label (e.g. "CC-BY-NC-ND 4.0", "Public domain", "Reported exam question"). */
  licence: string;
  /**
   * 1–2 sentences explaining why this fits the requested IELTS module/topic.
   */
  why: string;
  /**
   * Module-specific extra fields (optional). Examples:
   * - listening: { youtubeId?: string, durationSec?: number, section?: 1|2|3|4 }
   * - vocabulary: { word: string, partOfSpeech: string, definition: string, exampleSent: string, bandLevel: number }
   * - writing-task1: { chartType: "bar-chart"|"line-graph"|"pie-chart"|"table"|"map"|"process"|"mixed", visual: string }
   */
  meta?: Record<string, string | number | boolean | null>;
}

export interface DiscoverResponse {
  suggestions: DiscoverSuggestion[];
  provider: "gemini" | "heuristic";
  warning?: string;
}

const MODULE_INSTRUCTIONS: Record<DiscoverModule, string> = {
  listening: `Suggest 5 IELTS-suitable listening materials that are publicly available under an open / educational-fair-use licence.
ONLY recommend from these source families (do NOT invent new platforms):
- TED-Ed lessons (https://ed.ted.com/lessons/...) — CC-BY-NC-ND 4.0, embed via official YouTube player
- TED Talks (https://www.ted.com/talks/...) — CC-BY-NC-ND 4.0
- VOA Learning English (https://learningenglish.voanews.com/...) — Public domain (US Government)
- BBC Learning English (https://www.bbc.co.uk/learningenglish/...) — Educational fair use (link-out only)
- British Council LearnEnglish (https://learnenglish.britishcouncil.org/...) — Educational fair use (link-out only)
For each suggestion include in 'meta' an "section" (1, 2, 3 or 4 — IELTS section number this best matches), and if the suggestion is a TED-Ed or TED talk also include "youtubeId" (the YouTube video ID, 11 chars). Do NOT invent YouTube IDs — if you are not sure of the exact ID, omit the field.`,

  reading: `Suggest 5 IELTS-suitable reading passages (~700–950 words at IELTS Academic level) that are publicly available.
ONLY recommend from these source families (do NOT invent new platforms):
- Wikipedia featured / good articles (https://en.wikipedia.org/wiki/...) — CC-BY-SA 4.0
- OpenStax textbooks (https://openstax.org/books/...) — CC-BY 4.0
- Project Gutenberg (https://www.gutenberg.org/...) — Public domain
- The Conversation (https://theconversation.com/...) — CC-BY-ND 4.0
- NASA / NOAA / NIH publications — Public domain (US Government)
For each suggestion include in 'meta' "topic" (one of: science, environment, history, society, technology, health, education, business, arts), and "approxWordCount" (an integer estimate).`,

  "writing-task1": `Suggest 5 IELTS Writing Task 1 prompts (Academic) that are reported real exam questions or examiner-published samples.
ONLY recommend from these archives (do NOT invent prompts):
- IELTS Liz (https://ieltsliz.com/) — public archive
- IELTS Updates and Recent Exams (https://www.ieltsupdatesandrecentexams.com/) — student-shared real exam reports
- IELTS Simon (https://ielts-simon.com/) — examiner blog
For each suggestion include in 'meta' "chartType" (one of: bar-chart, line-graph, pie-chart, table, map, process, mixed), and "visual" — a short description of the data the chart shows. The 'title' should be the prompt text (one sentence, ≤220 chars). Do NOT include any chart image — only a textual prompt + visual description.`,

  "writing-task2": `Suggest 5 IELTS Writing Task 2 prompts that are reported real exam questions or examiner-published samples.
ONLY recommend from these archives (do NOT invent prompts):
- IELTS Liz "100 IELTS Essay Questions" (https://ieltsliz.com/ielts-writing-task-2/100-ielts-essay-questions/)
- IELTS Liz Recent Topics (https://ieltsliz.com/ielts-writing-task-2-essay-topics-2024/)
- IELTS Updates and Recent Exams (https://www.ieltsupdatesandrecentexams.com/)
- IELTS Simon (https://ielts-simon.com/)
For each suggestion include in 'meta' "promptType" (one of: opinion, discussion, problem-solution, advantages-disadvantages, two-part), and "topic" (one of: education, environment, technology, health, society, government, work, family, media, culture). The 'title' should be the prompt text itself.`,

  vocabulary: `Suggest 8 high-band IELTS academic vocabulary items (single words or short collocations) that are useful at Band 7.5+ writing or speaking.
For each item include in 'meta':
- "word" (the headword)
- "partOfSpeech" (noun/verb/adjective/adverb)
- "definition" (one short, plain-English definition — under 100 chars)
- "exampleSent" (one IELTS-context example sentence demonstrating the word)
- "bandLevel" (a number: 7, 7.5, 8, or 8.5 — based on Coxhead AWL sublist or general academic frequency)
- "topic" (one of: education, environment, technology, health, society, government, work, business, science, arts, awl-sublist-1 through awl-sublist-10)
The 'sourceUrl' should be the Wiktionary entry for the word, e.g. https://en.wiktionary.org/wiki/<word>.
The 'licence' field should be "CC-BY-SA 4.0 (Wiktionary)".
Definitions and examples MUST be paraphrased / your own writing, not copy-pasted. The user will treat your suggestions as AI-generated definitions and verify them against Wiktionary.`,

  speaking: `Suggest 5 IELTS Speaking Part 2 cue cards that match real IELTS exam style.
ONLY draw from these archives (do NOT invent prompts):
- IELTS Liz Speaking topics (https://ieltsliz.com/ielts-speaking/)
- IELTS Simon Speaking topics (https://ielts-simon.com/)
- IELTS Updates and Recent Exams Speaking
For each suggestion include in 'meta' "topic" (one of: person, place, object, event, experience, abstract), and "prompts" — a JSON-array-as-string of 4 follow-up bullet points the cue card should ask the candidate to cover.`,

  tips: `Suggest 5 IELTS preparation tips paraphrased from official IELTS partner sources.
ONLY draw from these sources (do NOT invent guidance):
- British Council Take IELTS (https://takeielts.britishcouncil.org/...)
- IDP IELTS (https://ielts.idp.com/...)
- Cambridge English IELTS (https://www.cambridgeenglish.org/exams-and-tests/ielts/...)
- IELTS Liz blog (https://ieltsliz.com/)
- IELTS Simon blog (https://ielts-simon.com/)
For each suggestion include in 'meta' "module" (one of: writing, reading, listening, speaking, vocabulary, general), and "level" (one of: beginner, intermediate, advanced). The 'title' is the tip headline; the 'description' is the paraphrased advice (under 280 chars).`,
};

export async function discover(
  module: DiscoverModule,
  topic?: string,
): Promise<DiscoverResponse> {
  if (!hasGemini()) {
    return {
      suggestions: [],
      provider: "heuristic",
      warning:
        "AI discovery requires the GEMINI_API_KEY environment variable. Set it in Vercel project settings (Settings → Environment Variables) and redeploy.",
    };
  }

  const moduleInstructions = MODULE_INSTRUCTIONS[module];
  const topicLine = topic ? `\nTopic focus: ${topic}` : "";

  const prompt = `You are an IELTS preparation expert helping a student find more practice material from real, openly-licensed academic sources.

${moduleInstructions}${topicLine}

CRITICAL RULES:
1. Every URL must point to a real, publicly-accessible page. If you are not certain a URL exists, omit that suggestion.
2. Do NOT fabricate facts about a source. If you don't know a video's exact YouTube ID, omit it rather than invent.
3. Do NOT recommend paid courses, login-walled sites, or anything not available for free educational use.
4. Each suggestion's 'licence' must be one of: "CC-BY 4.0", "CC-BY-SA 4.0", "CC-BY-NC 4.0", "CC-BY-NC-ND 4.0", "CC-BY-ND 4.0", "Public domain", "Reported exam question", "Educational fair use".

Respond ONLY with this JSON shape (no surrounding text, no markdown):
{
  "suggestions": [
    {
      "title": "string",
      "description": "string",
      "sourceName": "string",
      "sourceUrl": "string (full https:// URL)",
      "licence": "string",
      "why": "string",
      "meta": { /* module-specific fields per the instructions above */ }
    }
  ]
}`;

  try {
    const data = await geminiJson<{ suggestions: DiscoverSuggestion[] }>(prompt);
    // Defensive: validate URL shape and trim oversize fields.
    const cleaned = (data.suggestions || [])
      .filter((s) => s && typeof s.sourceUrl === "string" && /^https?:\/\//i.test(s.sourceUrl))
      .map((s) => ({
        ...s,
        title: (s.title || "").slice(0, 240),
        description: (s.description || "").slice(0, 600),
        why: (s.why || "").slice(0, 400),
      }));
    return { suggestions: cleaned, provider: "gemini" };
  } catch (err) {
    return {
      suggestions: [],
      provider: "heuristic",
      warning: `AI call failed: ${(err as Error).message}`,
    };
  }
}
