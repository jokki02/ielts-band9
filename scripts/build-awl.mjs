// Build the Academic Word List dataset from the canonical AWL headword list
// (Coxhead 2000) and Wiktionary (CC-BY-SA) definitions via the Wikimedia REST
// API. Run with `node scripts/build-awl.mjs` from the repo root.
//
// Output: data/vocabulary/awl.json — consumed by the seed route.

import { readFile, writeFile } from "node:fs/promises";
import { setTimeout as sleep } from "node:timers/promises";

const RAW_PATH = new URL("./awl-raw.txt", import.meta.url);
const OUT_PATH = new URL("../data/vocabulary/awl.json", import.meta.url);
const API = "https://en.wiktionary.org/api/rest_v1/page/definition/";
const UA = "ielts-band9-prep/1.0 (https://ielts-band9.vercel.app contact: shokhrukh900@gmail.com)";

function stripHtml(s) {
  return s
    .replace(/<sup[^>]*>.*?<\/sup>/gi, "")
    .replace(/<[^>]+>/g, "")
    .replace(/\[(?:edit|sense)[^\]]*\]/gi, "")
    .replace(/\s+/g, " ")
    .trim();
}

async function fetchDef(word) {
  for (let attempt = 0; attempt < 3; attempt += 1) {
    try {
      const res = await fetch(API + encodeURIComponent(word), {
        headers: { "User-Agent": UA, Accept: "application/json" },
      });
      if (res.status === 404) return null;
      if (res.status === 429) {
        await sleep(2000 * (attempt + 1));
        continue;
      }
      if (!res.ok) throw new Error(`status ${res.status}`);
      return await res.json();
    } catch (err) {
      if (attempt === 2) throw err;
      await sleep(800 * (attempt + 1));
    }
  }
  return null;
}

function stripWiktionaryArtifacts(s) {
  return s
    .replace(/\.mw-parser-output[^}]*\{[^}]*\}/g, "")
    .replace(/\(transitive\)\s*/i, "")
    .replace(/\(intransitive\)\s*/i, "")
    .replace(/\(\s*\)\s*/g, "")
    .replace(/\s+/g, " ")
    .trim()
    .replace(/^[;:,\.\s]+/, "")
    .replace(/[\s;:,]+$/, "")
    .trim();
}

function isJunk(def) {
  if (!def) return true;
  if (def.length < 8) return true;
  return /^(plural|past tense|present participle|gerund|comparative|superlative|simple past|inflection|alternative form|alternative spelling|misspelling|obsolete form|archaic form|British standard spelling|American standard spelling|nonstandard form) of\b/i.test(def);
}

function pickBest(payload, headword) {
  if (!payload) return null;
  const groups = payload.en;
  if (!Array.isArray(groups) || groups.length === 0) return null;
  // Use the canonical order Wiktionary returns (which is the lexicographer's
  // judgement of which sense is dominant). Walk all groups and pick the first
  // one with a non-inflection, non-stub definition. This avoids picking
  // surprising verb senses for headwords that are primarily nouns
  // (e.g. "concept", "context", "policy").
  for (const group of groups) {
    for (const d of group.definitions ?? []) {
      const cleaned = stripWiktionaryArtifacts(stripHtml(d.definition || ""));
      if (isJunk(cleaned)) continue;
      const example = (d.parsedExamples ?? [])
          .map((e) => stripWiktionaryArtifacts(stripHtml(e.example || "")))
          .filter(Boolean)[0]
        || (d.examples ?? [])
          .map((e) => stripWiktionaryArtifacts(stripHtml(typeof e === "string" ? e : e.example || "")))
          .filter(Boolean)[0]
        || "";
      return {
        word: headword,
        partOfSpeech: group.partOfSpeech.toLowerCase(),
        definition: cleaned,
        example,
      };
    }
  }
  return null;
}

const raw = await readFile(RAW_PATH, "utf-8");
const lines = raw.split("\n").map((l) => l.trim()).filter(Boolean);
const out = [];
let okCount = 0;
let missingCount = 0;

for (let i = 0; i < lines.length; i += 1) {
  const m = /^(.+?)\s+(\d+)$/.exec(lines[i]);
  if (!m) continue;
  const [, word, sublist] = m;
  process.stdout.write(`[${i + 1}/${lines.length}] ${word.padEnd(20)} `);
  let payload;
  try {
    payload = await fetchDef(word);
  } catch (err) {
    console.log("ERROR", err.message);
    out.push({ word, sublist: Number(sublist), missing: true });
    missingCount += 1;
    continue;
  }
  const picked = pickBest(payload, word);
  if (!picked) {
    console.log("missing");
    out.push({ word, sublist: Number(sublist), missing: true });
    missingCount += 1;
  } else {
    out.push({ ...picked, sublist: Number(sublist) });
    console.log(picked.partOfSpeech, "OK");
    okCount += 1;
  }
  await sleep(120);
}

await writeFile(OUT_PATH, JSON.stringify(out, null, 2), "utf-8");
console.log(`\nWrote ${out.length} entries → ${OUT_PATH.pathname}`);
console.log(`OK: ${okCount}, missing: ${missingCount}`);
