import { roundHalf, clamp, countWords } from "../utils";

export type Provider = "gemini" | "groq" | "heuristic";

export interface CriterionFeedback {
  score_justification: string;
  strengths: string[];
  improvements: string[];
  band9_tip: string;
}

export interface GradingResult {
  scores: {
    taskAchievement: number;
    coherenceCohesion: number;
    lexicalResource: number;
    grammaticalRange: number;
    overall: number;
  };
  feedback: {
    taskAchievement: CriterionFeedback;
    coherenceCohesion: CriterionFeedback;
    lexicalResource: CriterionFeedback;
    grammaticalRange: CriterionFeedback;
  };
  vocabulary: {
    good_phrases: string[];
    overused_words: string[];
    suggested_upgrades: { original: string; better: string }[];
  };
  grammar_errors: { error: string; correction: string; explanation: string }[];
  overall_comment: string;
  band9_version_intro: string;
  provider: Provider;
}

const BASIC_OVERUSED = [
  "very",
  "really",
  "good",
  "bad",
  "big",
  "many",
  "lot",
  "lots",
  "thing",
  "things",
  "stuff",
  "nice",
  "great",
  "people",
  "say",
  "said",
  "shows",
  "show",
  "because",
  "but",
  "and",
  "also",
  "so",
  "more",
  "important",
];

const STRONG_LINKERS = [
  "furthermore",
  "moreover",
  "in addition",
  "nevertheless",
  "however",
  "conversely",
  "as a result",
  "consequently",
  "therefore",
  "in particular",
  "specifically",
  "notably",
  "in contrast",
  "by comparison",
  "subsequently",
  "ultimately",
  "to illustrate",
  "for instance",
];

const ACADEMIC_VOCAB = [
  "substantial",
  "significant",
  "considerable",
  "advantageous",
  "beneficial",
  "detrimental",
  "deleterious",
  "demonstrate",
  "illustrate",
  "indicate",
  "underscore",
  "highlight",
  "proliferate",
  "disparity",
  "diminish",
  "amelior",
  "exacerbate",
  "preponderance",
  "phenomenon",
  "interrelated",
  "inevitable",
  "compelling",
];

const VOCAB_UPGRADES: Record<string, string> = {
  many: "a substantial proportion of",
  big: "considerable",
  good: "beneficial",
  bad: "detrimental",
  shows: "demonstrates",
  because: "owing to the fact that",
  "a lot": "a considerable amount",
  "really": "particularly",
  "very important": "of paramount importance",
  "in my opinion": "from my perspective",
  "I think": "it can be argued that",
  "more and more": "an increasing number of",
};

function stripHtml(s: string) {
  return s.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
}

function countMatches(text: string, list: string[]) {
  const lower = ` ${text.toLowerCase()} `;
  let n = 0;
  for (const w of list) {
    const re = new RegExp(`\\b${w.replace(/[-/\\^$*+?.()|[\]{}]/g, "\\$&")}\\b`, "g");
    const m = lower.match(re);
    if (m) n += m.length;
  }
  return n;
}

function uniqueWords(text: string): Set<string> {
  return new Set(
    text
      .toLowerCase()
      .replace(/[^a-z\s']/g, " ")
      .split(/\s+/)
      .filter((w) => w.length > 2),
  );
}

function sentences(text: string): string[] {
  return text
    .split(/[.!?]+\s+/)
    .map((s) => s.trim())
    .filter(Boolean);
}

/**
 * Heuristic grader — used when no AI keys are configured. Produces a
 * believable, informative report that mirrors the structure of an AI grading.
 */
export function heuristicGrade(
  prompt: string,
  rawEssay: string,
  taskType: "task1" | "task2",
): GradingResult {
  const essay = stripHtml(rawEssay);
  const wc = countWords(rawEssay);
  const minWords = taskType === "task1" ? 150 : 250;
  const targetMax = taskType === "task1" ? 200 : 320;

  const sents = sentences(essay);
  const avgSentenceLen = sents.length
    ? sents.reduce((s, x) => s + x.split(/\s+/).length, 0) / sents.length
    : 0;
  const longSents = sents.filter((s) => s.split(/\s+/).length >= 18).length;
  const complexRatio = sents.length ? longSents / sents.length : 0;

  const unique = uniqueWords(essay);
  const ttr = wc ? unique.size / wc : 0; // type-token ratio (vocab variety)

  const linkers = countMatches(essay, STRONG_LINKERS);
  const academic = countMatches(essay, ACADEMIC_VOCAB);
  const overused = countMatches(essay, BASIC_OVERUSED);
  const paragraphs = rawEssay
    .split(/<\/?p>|\n{2,}/g)
    .map((p) => stripHtml(p))
    .filter((p) => p.length > 30);

  // ---- Score each criterion ----
  // Task Achievement
  let ta = 6.5;
  if (wc >= minWords) ta += 0.5;
  if (wc >= minWords + 30 && wc <= targetMax + 50) ta += 0.5;
  if (paragraphs.length >= (taskType === "task1" ? 3 : 4)) ta += 0.5;
  if (academic >= 3) ta += 0.5;
  if (wc < minWords) ta -= 1.5;

  // Coherence & Cohesion
  let cc = 6.5;
  if (paragraphs.length >= 4) cc += 0.5;
  if (linkers >= 3) cc += 0.5;
  if (linkers >= 6) cc += 0.5;
  if (paragraphs.length >= 4 && paragraphs.every((p) => p.length > 80))
    cc += 0.5;
  if (paragraphs.length < 3) cc -= 0.5;

  // Lexical Resource
  let lr = 6.0;
  if (ttr >= 0.45) lr += 0.5;
  if (ttr >= 0.55) lr += 0.5;
  if (academic >= 4) lr += 0.5;
  if (academic >= 8) lr += 0.5;
  if (overused >= 8) lr -= 0.5;
  if (overused >= 14) lr -= 0.5;

  // Grammatical Range & Accuracy
  let gr = 6.0;
  if (avgSentenceLen >= 14) gr += 0.5;
  if (avgSentenceLen >= 18) gr += 0.5;
  if (complexRatio >= 0.35) gr += 0.5;
  if (complexRatio >= 0.55) gr += 0.5;
  if (sents.length < 6) gr -= 0.5;

  ta = clamp(roundHalf(ta), 4, 9);
  cc = clamp(roundHalf(cc), 4, 9);
  lr = clamp(roundHalf(lr), 4, 9);
  gr = clamp(roundHalf(gr), 4, 9);
  const overall = clamp(roundHalf((ta + cc + lr + gr) / 4), 4, 9);

  // ---- Vocabulary feedback ----
  const goodPhrases: string[] = [];
  for (const w of ACADEMIC_VOCAB) {
    const re = new RegExp(`\\b\\w*${w}\\w*\\b`, "i");
    const m = essay.match(re);
    if (m) goodPhrases.push(m[0]);
    if (goodPhrases.length >= 6) break;
  }
  const overusedWords: string[] = [];
  for (const w of BASIC_OVERUSED) {
    const re = new RegExp(`\\b${w}\\b`, "gi");
    const m = essay.match(re);
    if (m && m.length >= 2) overusedWords.push(`${w} (${m.length}×)`);
    if (overusedWords.length >= 6) break;
  }
  const suggestedUpgrades: { original: string; better: string }[] = [];
  for (const [orig, better] of Object.entries(VOCAB_UPGRADES)) {
    const re = new RegExp(`\\b${orig.replace(/ /g, "\\s+")}\\b`, "i");
    if (re.test(essay))
      suggestedUpgrades.push({ original: orig, better });
    if (suggestedUpgrades.length >= 5) break;
  }

  // ---- Surface grammar checks ----
  const grammarErrors: GradingResult["grammar_errors"] = [];
  const lower = essay.toLowerCase();
  if (/\bpeoples\b/.test(lower))
    grammarErrors.push({
      error: "peoples",
      correction: "people",
      explanation:
        '"People" is already plural; "peoples" only refers to distinct ethnic/national groups.',
    });
  if (/\binformations\b/.test(lower))
    grammarErrors.push({
      error: "informations",
      correction: "information / pieces of information",
      explanation: '"Information" is uncountable.',
    });
  if (/\b(advices|advices)\b/.test(lower))
    grammarErrors.push({
      error: "advices",
      correction: "advice / pieces of advice",
      explanation: '"Advice" is uncountable.',
    });
  if (/\bdiscuss about\b/.test(lower))
    grammarErrors.push({
      error: "discuss about",
      correction: "discuss",
      explanation: 'The verb "discuss" is transitive — no preposition needed.',
    });
  if (/\bin nowadays\b/.test(lower))
    grammarErrors.push({
      error: "in nowadays",
      correction: "nowadays / in modern times",
      explanation: '"Nowadays" already functions as an adverb.',
    });
  if (sents.length && avgSentenceLen > 35)
    grammarErrors.push({
      error: "Very long sentences detected",
      correction: "Break into shorter clauses",
      explanation:
        "Excessively long sentences obscure meaning and risk run-on errors. Aim for 15–22 words on average.",
    });

  // ---- Build feedback ----
  const taFb: CriterionFeedback = {
    score_justification:
      wc < minWords
        ? `Your essay is under the ${minWords}-word minimum, so the response cannot be fully developed.`
        : paragraphs.length < (taskType === "task1" ? 3 : 4)
          ? "Position is present but ideas are not extended across enough paragraphs."
          : "All parts of the task are addressed and ideas are developed with appropriate detail.",
    strengths:
      wc >= minWords
        ? [
            `Word count is ${wc} (target ${minWords}+).`,
            paragraphs.length >= 4
              ? "Clear paragraph structure."
              : "Position is identifiable.",
          ]
        : [`Position is identifiable in ${wc} words.`],
    improvements:
      wc < minWords
        ? [
            `Reach at least ${minWords} words.`,
            "Add at least one fully-developed example.",
          ]
        : [
            "Make your thesis statement more explicit in the introduction.",
            "Add a specific data point or named real-world example to each body paragraph.",
          ],
    band9_tip:
      taskType === "task1"
        ? "In Task 1, your overview paragraph should mention the 2 most significant features without any specific data — data belongs only in body paragraphs."
        : "Band 9 essays take a clear, consistent position from the very first paragraph and never sit on the fence.",
  };

  const ccFb: CriterionFeedback = {
    score_justification:
      paragraphs.length < 3
        ? "Paragraphing is insufficient — Band 7+ requires distinct intro / body / conclusion."
        : linkers < 3
          ? "Cohesive devices are present but limited in range."
          : "Information is sequenced logically with a range of cohesive devices.",
    strengths: [
      paragraphs.length >= 4
        ? "Four-paragraph structure is in place."
        : "Some paragraphing is present.",
      linkers >= 3 ? "Uses linkers between ideas." : "Ideas are mostly grouped.",
    ],
    improvements: [
      linkers < 6
        ? "Use more sophisticated linkers: 'Furthermore', 'Nevertheless', 'Consequently', 'In particular'."
        : "Vary your linkers — avoid starting consecutive sentences with the same connector.",
      "Use referencing (it, this, such, the former/the latter) to avoid repetition.",
    ],
    band9_tip:
      "Band 9 candidates use cohesion that 'attracts no attention' — devices feel inevitable, not bolted on.",
  };

  const lrFb: CriterionFeedback = {
    score_justification:
      ttr < 0.4
        ? "Vocabulary is repetitive — variety is below the Band 7 threshold."
        : academic < 4
          ? "Vocabulary is sufficient but topic-specific academic items are limited."
          : "Wide range of academic vocabulary used flexibly.",
    strengths: goodPhrases.length
      ? [`Effective items: ${goodPhrases.slice(0, 3).join(", ")}`]
      : ["Vocabulary is generally appropriate."],
    improvements: [
      overusedWords.length
        ? `Overused: ${overusedWords.slice(0, 3).join(", ")}.`
        : "Replace 1–2 common verbs with more precise academic alternatives.",
      "Use natural collocations (e.g. 'pose a threat', 'reap the benefits', 'address the issue').",
    ],
    band9_tip:
      "Band 9 lexis is precise, idiomatic and stylistically aware. One strong, well-chosen word beats three vague ones.",
  };

  const grFb: CriterionFeedback = {
    score_justification:
      complexRatio < 0.3
        ? "Most sentences are simple or compound — limited grammatical range."
        : "Variety of structures, though accuracy is uneven in complex constructions.",
    strengths: [
      avgSentenceLen >= 14
        ? "Average sentence length suggests complex structures."
        : "Punctuation control is acceptable.",
      grammarErrors.length === 0
        ? "No major errors detected by surface checks."
        : "Most basic structures are accurate.",
    ],
    improvements: [
      "Use a wider range: relative clauses, conditionals, participle phrases, cleft sentences.",
      grammarErrors.length
        ? "Fix the issues highlighted in the grammar section."
        : "Try one passive-voice and one inversion structure where appropriate.",
    ],
    band9_tip:
      "Aim for at least one of each: a 3rd-conditional, a participle phrase, and a cleft sentence (e.g. 'It is X that…').",
  };

  return {
    scores: {
      taskAchievement: ta,
      coherenceCohesion: cc,
      lexicalResource: lr,
      grammaticalRange: gr,
      overall,
    },
    feedback: {
      taskAchievement: taFb,
      coherenceCohesion: ccFb,
      lexicalResource: lrFb,
      grammaticalRange: grFb,
    },
    vocabulary: {
      good_phrases: goodPhrases,
      overused_words: overusedWords,
      suggested_upgrades: suggestedUpgrades,
    },
    grammar_errors: grammarErrors,
    overall_comment:
      overall >= 8
        ? "A strong response with the hallmarks of an upper-band performance. Tighten lexis and add one more sophisticated structure to push toward Band 9."
        : overall >= 7
          ? "Solid Band 7 performance. Focus on (a) more precise lexis and (b) a wider range of complex structures to reach Band 8+."
          : "There is a clear position but the response lacks the range and accuracy expected at Band 7. Prioritise paragraph structure, linkers, and complex sentences.",
    band9_version_intro:
      taskType === "task1"
        ? "The chart depicts a marked disparity in the trends under examination, with one variable rising steeply over the period while another remained largely stagnant. Overall, the most striking feature is the divergence between the two trajectories, a phenomenon worthy of closer investigation in the body that follows."
        : "It is often contended that " +
          (sents[0]?.toLowerCase().slice(0, 80) ||
            "this issue warrants close examination") +
          ". While there are compelling arguments on either side of the debate, this essay will argue that — on balance — the considerations outlined below render one position decisively more persuasive than the other.",
    provider: "heuristic",
  };
}
