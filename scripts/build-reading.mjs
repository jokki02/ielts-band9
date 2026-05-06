// Build reading passages from real Wikipedia featured / good articles.
//
// Source: Wikipedia (CC-BY-SA 4.0). Each passage is trimmed to the IELTS
// 700–900-word target and chunked into A–E paragraphs for matching-type
// questions. Questions are written separately by hand (`questions.ts`).
//
// Run: `node scripts/build-reading.mjs` from repo root.

import { writeFile } from "node:fs/promises";
import { setTimeout as sleep } from "node:timers/promises";

const OUT_PATH = new URL("../data/reading/raw-passages.json", import.meta.url);
const UA = "ielts-band9-prep/1.0 (https://ielts-band9.vercel.app contact: shokhrukh900@gmail.com)";

// Curated list of Wikipedia articles whose lead/first section reads at
// genuine IELTS academic difficulty (~Band 7–8.5). Each entry pairs the
// Wikipedia page slug with the IELTS topic taxonomy and a difficulty hint.
const TARGETS = [
  { id: "rp-photosynthesis",      slug: "Photosynthesis",          topic: "science",     difficulty: "band7" },
  { id: "rp-industrial-rev",      slug: "Industrial_Revolution",   topic: "history",     difficulty: "band8" },
  { id: "rp-climate-change",      slug: "Climate_change",          topic: "environment", difficulty: "band8" },
  { id: "rp-plate-tectonics",     slug: "Plate_tectonics",         topic: "science",     difficulty: "band8" },
  { id: "rp-renewable-energy",    slug: "Renewable_energy",        topic: "environment", difficulty: "band7" },
  { id: "rp-great-depression",    slug: "Great_Depression",        topic: "history",     difficulty: "band8" },
  { id: "rp-ancient-egypt",       slug: "Ancient_Egypt",           topic: "history",     difficulty: "band8" },
  { id: "rp-crispr",              slug: "CRISPR_gene_editing",     topic: "science",     difficulty: "band9" },
  { id: "rp-internet-of-things",  slug: "Internet_of_things",      topic: "science",     difficulty: "band8" },
  { id: "rp-circular-economy",    slug: "Circular_economy",        topic: "society",     difficulty: "band8" },
];

async function fetchExtract(slug) {
  const url =
    "https://en.wikipedia.org/w/api.php?" +
    new URLSearchParams({
      action: "query",
      format: "json",
      prop: "extracts",
      explaintext: "true",
      exsectionformat: "plain",
      redirects: "1",
      titles: slug,
      origin: "*",
    });
  const res = await fetch(url, { headers: { "User-Agent": UA } });
  if (!res.ok) throw new Error(`status ${res.status} for ${slug}`);
  const json = await res.json();
  const pages = json.query?.pages ?? {};
  const page = Object.values(pages)[0];
  if (!page || page.missing) throw new Error(`page missing: ${slug}`);
  return { title: page.title, extract: page.extract ?? "" };
}

function splitIntoParagraphs(text) {
  return text
    .split(/\n+/)
    .map((s) => s.trim())
    .filter((s) => s.length > 60); // drop short stubs
}

function trimToWordTarget(paragraphs, minWords = 700, maxWords = 950) {
  const out = [];
  let total = 0;
  for (const p of paragraphs) {
    const words = p.split(/\s+/).length;
    if (total + words > maxWords && total >= minWords) break;
    out.push(p);
    total += words;
    if (total >= maxWords) break;
  }
  return { paragraphs: out, wordCount: total };
}

function letterise(paragraphs) {
  // Prefix each paragraph with "A.", "B.", … for matching question types.
  return paragraphs.map((p, i) => `${String.fromCharCode(65 + i)}. ${p}`);
}

const out = [];
for (const t of TARGETS) {
  process.stdout.write(`fetching ${t.slug}… `);
  let raw;
  try {
    raw = await fetchExtract(t.slug);
  } catch (err) {
    console.log("ERROR", err.message);
    continue;
  }
  const paragraphs = splitIntoParagraphs(raw.extract);
  const { paragraphs: trimmed, wordCount } = trimToWordTarget(paragraphs);
  if (trimmed.length < 4) {
    console.log("too short:", trimmed.length);
    continue;
  }
  const lettered = letterise(trimmed);
  out.push({
    id: t.id,
    title: raw.title,
    topic: t.topic,
    difficulty: t.difficulty,
    wordCount,
    sourceTitle: raw.title,
    sourceUrl: `https://en.wikipedia.org/wiki/${encodeURIComponent(t.slug)}`,
    licence: "CC-BY-SA 4.0",
    attribution: `Adapted from "${raw.title}" on Wikipedia (CC-BY-SA 4.0).`,
    paragraphs: lettered,
  });
  console.log(`${trimmed.length} paragraphs / ${wordCount} words`);
  await sleep(300); // be nice to Wikipedia
}

await writeFile(OUT_PATH, JSON.stringify(out, null, 2), "utf-8");
console.log(`\nWrote ${out.length} passages → ${OUT_PATH.pathname}`);
