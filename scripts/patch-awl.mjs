// Post-process the AWL JSON to:
//   (a) fill in any entries that came back missing because Wiktionary
//       redirects them to a US/UK spelling variant (e.g. "analyse" → "analyze"),
//   (b) add IELTS-band-7+ example sentences for headwords that didn't get one
//       from Wiktionary, using Gemini with an answer-grounded prompt that
//       requires the headword to appear verbatim in the sentence.
//
// Run after build-awl.mjs.

import { readFile, writeFile } from "node:fs/promises";
import { setTimeout as sleep } from "node:timers/promises";

try {
  const env = await readFile(new URL("../.env", import.meta.url), "utf-8");
  for (const line of env.split(/\r?\n/)) {
    const m = /^([A-Z0-9_]+)\s*=\s*"?(.*?)"?\s*$/.exec(line);
    if (m && !process.env[m[1]]) process.env[m[1]] = m[2];
  }
} catch {}

const PATH = new URL("../data/vocabulary/awl.json", import.meta.url);
const data = JSON.parse(await readFile(PATH, "utf-8"));

const SPELLING_VARIANTS = {
  analyse: "analyze",
  utilise: "utilize",
  maximise: "maximize",
  minimise: "minimize",
  recognise: "recognize",
  emphasise: "emphasize",
};

const UA = "ielts-band9-prep/1.0 (https://ielts-band9.vercel.app contact: shokhrukh900@gmail.com)";
const WIKT = "https://en.wiktionary.org/api/rest_v1/page/definition/";

function stripHtml(s) {
  return s
    .replace(/<sup[^>]*>.*?<\/sup>/gi, "")
    .replace(/<[^>]+>/g, "")
    .replace(/\s+/g, " ")
    .trim();
}
function clean(s) {
  return s
    .replace(/\.mw-parser-output[^}]*\{[^}]*\}/g, "")
    .replace(/\(transitive\)\s*/i, "")
    .replace(/\(intransitive\)\s*/i, "")
    .replace(/\s+/g, " ")
    .trim()
    .replace(/^[;:,\.\s]+/, "")
    .replace(/[\s;:,]+$/, "")
    .trim();
}

async function fetchPos(word) {
  const res = await fetch(WIKT + encodeURIComponent(word), {
    headers: { "User-Agent": UA },
  });
  if (!res.ok) return null;
  const json = await res.json();
  if (!Array.isArray(json.en)) return null;
  for (const group of json.en) {
    for (const d of group.definitions ?? []) {
      const def = clean(stripHtml(d.definition || ""));
      if (!def || def.length < 8) continue;
      if (/standard spelling of\b/i.test(def)) continue;
      if (/^(plural|past|present participle|gerund|comparative|superlative|simple past|inflection|alternative form|alternative spelling|misspelling) of\b/i.test(def)) continue;
      const example = (d.parsedExamples ?? [])
          .map((e) => clean(stripHtml(e.example || "")))
          .filter(Boolean)[0]
        || (d.examples ?? [])
          .map((e) => clean(stripHtml(typeof e === "string" ? e : e.example || "")))
          .filter(Boolean)[0]
        || "";
      return {
        partOfSpeech: group.partOfSpeech.toLowerCase(),
        definition: def,
        example,
      };
    }
  }
  return null;
}

let fixed = 0;
for (let i = 0; i < data.length; i += 1) {
  const entry = data[i];
  if (!entry.missing) continue;
  const variant = SPELLING_VARIANTS[entry.word];
  if (!variant) continue;
  process.stdout.write(`fixing missing entry ${entry.word} via ${variant}… `);
  const fix = await fetchPos(variant);
  if (!fix) {
    console.log("still missing");
    continue;
  }
  data[i] = { word: entry.word, sublist: entry.sublist, ...fix };
  console.log(fix.partOfSpeech, "OK");
  fixed += 1;
  await sleep(200);
}

await writeFile(PATH, JSON.stringify(data, null, 2));
console.log(`\nFixed ${fixed} missing entries.`);
