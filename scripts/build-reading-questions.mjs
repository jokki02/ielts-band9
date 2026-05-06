// Generate IELTS-style reading-comprehension questions for each Wikipedia
// passage using Gemini (model: gemini-flash-latest). Every question is
// anchored in the passage text — the model is forced to return JSON that
// names the answer span verbatim and the source paragraph letter.
//
// Run after build-reading.mjs:  node scripts/build-reading-questions.mjs

import { readFile, writeFile } from "node:fs/promises";
import { setTimeout as sleep } from "node:timers/promises";

// Load .env manually so we don't take a runtime dep on dotenv.
try {
  const env = await readFile(new URL("../.env", import.meta.url), "utf-8");
  for (const line of env.split(/\r?\n/)) {
    const m = /^([A-Z0-9_]+)\s*=\s*"?(.*?)"?\s*$/.exec(line);
    if (m && !process.env[m[1]]) process.env[m[1]] = m[2];
  }
} catch {}

const RAW_PATH = new URL("../data/reading/raw-passages.json", import.meta.url);
const OUT_PATH = new URL("../data/reading/passages-with-questions.json", import.meta.url);

const KEY = process.env.GEMINI_API_KEY;
if (!KEY) {
  console.error("GEMINI_API_KEY missing");
  process.exit(1);
}

const MODEL = process.env.GEMINI_MODEL || "gemini-flash-latest";

const SYSTEM_PROMPT = `You are an experienced IELTS Academic Reading test writer.
You will be given a real Wikipedia passage split into lettered paragraphs (A, B, C…).
Generate exactly 13 questions in the official IELTS Reading style, mixing question types in this exact distribution:

- 4 × tfng   (True / False / Not Given)
- 3 × matching_information   (which paragraph contains the following information)
- 2 × multiple_choice   (one correct answer, four options A-D)
- 2 × short_answer   (NO MORE THAN THREE WORDS / NUMBER from the passage)
- 2 × summary_completion   (single-word fill-in-the-blank from the passage)

CRITICAL RULES — non-negotiable:
1. Every question's answer must appear LITERALLY in the passage (or be the literal token "TRUE", "FALSE", or "NOT GIVEN" for tfng).
2. For tfng items, include at least ONE FALSE and at least ONE NOT GIVEN.
3. Each question must be answerable using only the passage — no outside knowledge.
4. paragraphRef must be the single capital letter of the paragraph that contains the evidence.
5. explanation must paraphrase the evidence sentence in 1-2 short sentences and quote the key clause.
6. bandLevel: 6, 7, 8, or 9 — set higher for items that require inference or paraphrase rather than literal lookup.
7. For multiple_choice, the 4 options must be plausible (not obviously wrong); the expected answer is the option text exactly (not "A", "B", etc).
8. For short_answer, expected must be ≤ 3 words copied verbatim from the passage.
9. For summary_completion, the question stem must be one sentence with "______" marking the gap; expected is the single missing word as it appears in the passage.
10. For matching_information, the question text describes the information; expected is the single paragraph letter (A, B, C…).

Return ONLY a JSON array of 13 question objects with this shape:
{
  "num": 1,
  "type": "tfng" | "matching_information" | "multiple_choice" | "short_answer" | "summary_completion",
  "question": "…",
  "options": ["…", "…", "…", "…"]   // only for multiple_choice
  "expected": "…",
  "explanation": "…",
  "paragraphRef": "A",
  "bandLevel": 7
}
No prose around the array, just JSON.`;

async function geminiJson(passageTitle, passageText) {
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent?key=${KEY}`;
  const body = {
    systemInstruction: { parts: [{ text: SYSTEM_PROMPT }] },
    contents: [
      {
        role: "user",
        parts: [
          {
            text: `Passage title: ${passageTitle}\n\nPassage:\n${passageText}\n\nGenerate the 13 questions now.`,
          },
        ],
      },
    ],
    generationConfig: {
      temperature: 0.4,
      responseMimeType: "application/json",
    },
  };
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  if (!res.ok) {
    const txt = await res.text();
    throw new Error(`Gemini ${res.status}: ${txt.slice(0, 300)}`);
  }
  const data = await res.json();
  const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
  if (!text) throw new Error("Empty Gemini response");
  return JSON.parse(text);
}

const raw = JSON.parse(await readFile(RAW_PATH, "utf-8"));
const out = [];

for (const p of raw) {
  process.stdout.write(`generating questions for ${p.title}… `);
  const passageText = p.paragraphs.join("\n\n");
  let questions;
  for (let attempt = 0; attempt < 3; attempt += 1) {
    try {
      questions = await geminiJson(p.title, passageText);
      break;
    } catch (err) {
      if (attempt === 2) throw err;
      console.log("retry:", err.message);
      await sleep(1500 * (attempt + 1));
    }
  }
  if (!Array.isArray(questions) || questions.length !== 13) {
    console.log(`skipped (got ${Array.isArray(questions) ? questions.length : "non-array"})`);
    continue;
  }
  // Light validation: ensure each question has the required fields.
  const valid = questions.every((q) =>
    q && typeof q.question === "string" && q.expected != null && typeof q.paragraphRef === "string",
  );
  if (!valid) {
    console.log("invalid question shape — skipping");
    continue;
  }
  out.push({ ...p, questions });
  console.log("OK");
  await sleep(1200);
}

await writeFile(OUT_PATH, JSON.stringify(out, null, 2), "utf-8");
console.log(`\nWrote ${out.length} passages with questions → ${OUT_PATH.pathname}`);
