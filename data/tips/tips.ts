// Curated IELTS test-day and skill-building tips.
//
// Each tip is paraphrased from a publicly available guide produced by an
// official IELTS test partner (British Council "Take IELTS" / IELTS Ready,
// IDP IELTS, Cambridge English) or a respected former-examiner blog
// (IELTS Liz, IELTS Simon). Advice itself is not copyrightable, but every
// tip carries a `source` field so users can read the original guidance.

export interface Tip {
  id: string;
  module: "writing" | "reading" | "listening" | "speaking" | "vocabulary" | "general";
  title: string;
  body: string;
  level: "beginner" | "intermediate" | "advanced";
  source: string;
  sourceUrl: string;
}

const SRC_BC_PREP = "British Council — Take IELTS preparation";
const SRC_BC_PREP_URL = "https://takeielts.britishcouncil.org/prepare";
const SRC_BC_TIPS_RW =
  "British Council — Improve your reading and writing with these top IELTS tips";
const SRC_BC_TIPS_RW_URL =
  "https://www.britishcouncil.org.tw/en/english/exam-preparation/ielts-tips/improve-reading-writing";
const SRC_IDP_T2 =
  "IDP IELTS — An Overview of IELTS Academic Writing Task 2: Tips";
const SRC_IDP_T2_URL =
  "https://ielts.idp.com/uae/about/news-and-articles/article-how-to-understand-task-2-writing-questions";
const SRC_IDP_STRUCTURE =
  "IDP IELTS — Easy ways to structure your IELTS academic writing tasks";
const SRC_IDP_STRUCTURE_URL =
  "https://ielts.idp.com/prepare/article-easy-ways-to-structure-your-ielts-academic-writing-tasks";
const SRC_LIZ_BAND9 = "IELTS Liz — Band 9 essay tips and strategies";
const SRC_LIZ_BAND9_URL = "https://ieltsliz.com/ielts-writing-task-2/";
const SRC_SIMON =
  "IELTS Simon — Former IELTS examiner's blog (Band 9 model essays and tips)";
const SRC_SIMON_URL = "https://ielts-simon.com/";
const SRC_CAMBRIDGE =
  "Cambridge English — Official IELTS preparation materials";
const SRC_CAMBRIDGE_URL =
  "https://www.cambridgeenglish.org/exams-and-tests/ielts/preparation/";

export const TIPS: Tip[] = [
  // --- WRITING ----------------------------------------------------------
  {
    id: "w-001",
    module: "writing",
    title: "Always plan before you start writing Task 2",
    body:
      "British Council and IDP both stress the same thing: spend ~5 minutes outlining your thesis, two main ideas, and conclusion direction before you write. A short plan saves you 10 minutes of mid-essay floundering and produces tighter Coherence & Cohesion.",
    level: "beginner",
    source: SRC_BC_TIPS_RW,
    sourceUrl: SRC_BC_TIPS_RW_URL,
  },
  {
    id: "w-002",
    module: "writing",
    title: "Read the Task 2 question carefully — don't write a memorised answer",
    body:
      "IDP examiners warn that 'formulaic' essays — pre-memorised paragraphs forced onto a question — score lower on Task Response. Treat each prompt as unique; learn frameworks, not exact wording.",
    level: "beginner",
    source: SRC_IDP_T2,
    sourceUrl: SRC_IDP_T2_URL,
  },
  {
    id: "w-003",
    module: "writing",
    title: "Write a clear introduction with a thesis statement",
    body:
      "IDP recommends a four-part essay structure: introduction (paraphrase + thesis), two body paragraphs each developing one main idea, and a conclusion that summarises and gives a final view. Your thesis must directly answer the prompt.",
    level: "intermediate",
    source: SRC_IDP_STRUCTURE,
    sourceUrl: SRC_IDP_STRUCTURE_URL,
  },
  {
    id: "w-004",
    module: "writing",
    title: "PEEL every body paragraph",
    body:
      "Point — state the argument; Explain — develop it; Example — give a concrete instance; Link — connect back to the question. PEEL is the structure most consistently recommended by Cambridge and British Council.",
    level: "beginner",
    source: SRC_CAMBRIDGE,
    sourceUrl: SRC_CAMBRIDGE_URL,
  },
  {
    id: "w-005",
    module: "writing",
    title: "Write the Task 1 overview as a separate paragraph",
    body:
      "IDP and Cambridge agree: a Task 1 report MUST include a one-paragraph overview that names the 2–3 most striking features. No specific data in the overview — keep numbers for the body.",
    level: "intermediate",
    source: SRC_IDP_STRUCTURE,
    sourceUrl: SRC_IDP_STRUCTURE_URL,
  },
  {
    id: "w-006",
    module: "writing",
    title: "Highlight key words in the question before writing",
    body:
      "British Council's #1 writing tip: circle the topic, the task, and any limiting words ('only', 'in your country', 'children'). Most off-topic essays fail because the candidate missed a single word.",
    level: "beginner",
    source: SRC_BC_TIPS_RW,
    sourceUrl: SRC_BC_TIPS_RW_URL,
  },
  {
    id: "w-007",
    module: "writing",
    title: "Aim for 270–290 words on Task 2",
    body:
      "Anything below 250 triggers an automatic Band 5 ceiling on Task Achievement. Anything above 320 risks losing focus. IELTS Simon (former examiner) recommends a tight 270–290.",
    level: "beginner",
    source: SRC_SIMON,
    sourceUrl: SRC_SIMON_URL,
  },
  {
    id: "w-008",
    module: "writing",
    title: "Use a small, varied set of cohesive devices",
    body:
      "IDP and Liz both warn against 'linker bingo'. Master 5–6 well: 'Furthermore', 'Nevertheless', 'In particular', 'As a result', 'By comparison', 'Ultimately'. Variety + accuracy beats quantity.",
    level: "intermediate",
    source: SRC_LIZ_BAND9,
    sourceUrl: SRC_LIZ_BAND9_URL,
  },
  {
    id: "w-009",
    module: "writing",
    title: "Use the inversion structure for Band 9 grammar",
    body:
      "Once per essay, lead with a negative or restrictive adverbial: 'Not only does this approach…', 'Only when governments…', 'Rarely has a single technology so transformed…'. This is one of the few reliable Band 9 grammar markers.",
    level: "advanced",
    source: SRC_SIMON,
    sourceUrl: SRC_SIMON_URL,
  },

  // --- READING ----------------------------------------------------------
  {
    id: "r-001",
    module: "reading",
    title: "Don't dwell on a single hard question",
    body:
      "British Council's first reading tip: leave a hard question for later. Spending 4 minutes on one answer is never worth it. Mark it, move on, return at the end if time allows.",
    level: "beginner",
    source: SRC_BC_TIPS_RW,
    sourceUrl: SRC_BC_TIPS_RW_URL,
  },
  {
    id: "r-002",
    module: "reading",
    title: "Specialist subject knowledge isn't required",
    body:
      "British Council emphasises that EVERY answer is in the passage. If you don't know the topic, that's fine — read literally and answer from the text, not from real-world knowledge.",
    level: "beginner",
    source: SRC_BC_TIPS_RW,
    sourceUrl: SRC_BC_TIPS_RW_URL,
  },
  {
    id: "r-003",
    module: "reading",
    title: "There is NO extra transfer time in Reading",
    body:
      "Unlike Listening, Reading gives you no extra 10 minutes to copy answers to the answer sheet. Write your answers directly on the answer sheet as you go.",
    level: "beginner",
    source: SRC_BC_TIPS_RW,
    sourceUrl: SRC_BC_TIPS_RW_URL,
  },
  {
    id: "r-004",
    module: "reading",
    title: "Read widely as preparation",
    body:
      "British Council recommends reading newspapers, magazines and academic journals — not just IELTS books. The Reading test source materials are real published articles, so wide reading exposes you to the kinds of register the test will use.",
    level: "intermediate",
    source: SRC_BC_TIPS_RW,
    sourceUrl: SRC_BC_TIPS_RW_URL,
  },
  {
    id: "r-005",
    module: "reading",
    title: "TFNG: 'No info in passage' = Not Given",
    body:
      "If you cannot find a clear contradiction in the passage, the answer is Not Given — even if the statement seems obviously true in real life. Examiners actively penalise 'common-sense' reasoning here.",
    level: "intermediate",
    source: SRC_LIZ_BAND9,
    sourceUrl: SRC_LIZ_BAND9_URL,
  },
  {
    id: "r-006",
    module: "reading",
    title: "Watch your spelling and singular/plural",
    body:
      "British Council warns: careless mistakes cost points. Copy the exact spelling from the passage, and re-read each answer to confirm singular vs plural matches what the question asks.",
    level: "intermediate",
    source: SRC_BC_TIPS_RW,
    sourceUrl: SRC_BC_TIPS_RW_URL,
  },
  {
    id: "r-007",
    module: "reading",
    title: "Match Headings: locate the topic sentence first",
    body:
      "Each heading matches the main idea of a paragraph, almost always expressed in its first or last sentence. Underline the topic sentence, then match — don't read the whole paragraph word-for-word.",
    level: "intermediate",
    source: SRC_LIZ_BAND9,
    sourceUrl: SRC_LIZ_BAND9_URL,
  },
  {
    id: "r-008",
    module: "reading",
    title: "20 minutes per passage, no exceptions",
    body:
      "Time-box rigorously. Question 14 is worth the same as question 1 — you cannot afford to lose easy points on passage 3 because you over-invested in passage 1.",
    level: "beginner",
    source: SRC_CAMBRIDGE,
    sourceUrl: SRC_CAMBRIDGE_URL,
  },

  // --- LISTENING --------------------------------------------------------
  {
    id: "l-001",
    module: "listening",
    title: "Use the 30-second window to read all questions",
    body:
      "British Council preparation videos: at the start of every section, you have ~30 seconds. Skim ALL the questions in that section, not just the first few. Predict each answer's type (number, name, place).",
    level: "beginner",
    source: SRC_BC_PREP,
    sourceUrl: SRC_BC_PREP_URL,
  },
  {
    id: "l-002",
    module: "listening",
    title: "Beware of self-correction (the 'distractor' trick)",
    body:
      "Speakers very often state a wrong answer and then correct themselves: 'I'd like a single room… actually, make that a double.' The correct answer is the SECOND one. Train your ear for 'actually', 'sorry', 'on second thoughts'.",
    level: "intermediate",
    source: SRC_LIZ_BAND9,
    sourceUrl: SRC_LIZ_BAND9_URL,
  },
  {
    id: "l-003",
    module: "listening",
    title: "Use the 10 transfer minutes carefully",
    body:
      "Triple-check spelling, capitalisation of names, and singular vs plural. Cambridge data shows most lost points in Listening come from transfer errors, not comprehension errors.",
    level: "advanced",
    source: SRC_CAMBRIDGE,
    sourceUrl: SRC_CAMBRIDGE_URL,
  },
  {
    id: "l-004",
    module: "listening",
    title: "Practise with different accents",
    body:
      "British Council recommends exposure to UK, US, Australian and Canadian English. The IELTS Listening test deliberately mixes accents — passive exposure to English-language podcasts and radio is the cheapest preparation.",
    level: "intermediate",
    source: SRC_BC_PREP,
    sourceUrl: SRC_BC_PREP_URL,
  },
  {
    id: "l-005",
    module: "listening",
    title: "Don't write more words than the question allows",
    body:
      "When the rubric says 'NO MORE THAN TWO WORDS', a three-word answer is automatically wrong even if the meaning is right. Read each question's word limit carefully.",
    level: "beginner",
    source: SRC_CAMBRIDGE,
    sourceUrl: SRC_CAMBRIDGE_URL,
  },

  // --- SPEAKING ---------------------------------------------------------
  {
    id: "s-001",
    module: "speaking",
    title: "Don't memorise answers",
    body:
      "British Council and IDP both flag this as the #1 cause of low Speaking scores. Examiners can spot scripted Part 1 answers immediately and will pivot to follow-up questions where memorised material collapses.",
    level: "beginner",
    source: SRC_BC_PREP,
    sourceUrl: SRC_BC_PREP_URL,
  },
  {
    id: "s-002",
    module: "speaking",
    title: "Use natural fillers (sparingly)",
    body:
      "'Well, …', 'Let me think for a second', 'That's an interesting question because…' buy you a moment to formulate. Avoid robotic 'um' and over-hedging.",
    level: "intermediate",
    source: SRC_LIZ_BAND9,
    sourceUrl: SRC_LIZ_BAND9_URL,
  },
  {
    id: "s-003",
    module: "speaking",
    title: "Use the full 1-minute Part 2 prep",
    body:
      "British Council's Speaking video: jot bullet points (NOT full sentences) and lock in one specific person/place/event for each prompt. This seeds your 2-minute talk with concrete detail.",
    level: "intermediate",
    source: SRC_BC_PREP,
    sourceUrl: SRC_BC_PREP_URL,
  },
  {
    id: "s-004",
    module: "speaking",
    title: "Show one complex grammatical structure per part",
    body:
      "A third conditional ('If I had known earlier, I would have…'), a participle phrase ('Having considered the alternatives…'), or a cleft sentence ('What strikes me most is…') are reliable Band 8+ markers.",
    level: "advanced",
    source: SRC_SIMON,
    sourceUrl: SRC_SIMON_URL,
  },
  {
    id: "s-005",
    module: "speaking",
    title: "Use a wide range of intonation",
    body:
      "Cambridge: monotone speech is penalised under 'Pronunciation'. Vary pitch on key words (intensifiers, contrastive nouns) — examiners listen for rhythm as well as accuracy.",
    level: "intermediate",
    source: SRC_CAMBRIDGE,
    sourceUrl: SRC_CAMBRIDGE_URL,
  },

  // --- VOCABULARY -------------------------------------------------------
  {
    id: "v-001",
    module: "vocabulary",
    title: "Learn collocations, not isolated words",
    body:
      "Cambridge data shows Band 9 lexis is largely about collocation accuracy. Memorise 'detrimental EFFECT', 'detrimental TO health', 'profoundly detrimental' — not the headword in isolation.",
    level: "beginner",
    source: SRC_CAMBRIDGE,
    sourceUrl: SRC_CAMBRIDGE_URL,
  },
  {
    id: "v-002",
    module: "vocabulary",
    title: "Avoid thesaurus traps",
    body:
      "IDP examiners explicitly warn: don't replace 'happy' with 'jubilant' if the context calls for 'pleased'. Wrong-register or wrong-collocation 'big words' are penalised more harshly than they're rewarded.",
    level: "advanced",
    source: SRC_IDP_T2,
    sourceUrl: SRC_IDP_T2_URL,
  },
  {
    id: "v-003",
    module: "vocabulary",
    title: "Build a topic sheet per Task 2 area",
    body:
      "For each common topic (education, environment, technology, health…), maintain 8–10 high-band phrases. When you face a Task 2 prompt on that topic, you have a vocabulary toolkit ready.",
    level: "intermediate",
    source: SRC_LIZ_BAND9,
    sourceUrl: SRC_LIZ_BAND9_URL,
  },
  {
    id: "v-004",
    module: "vocabulary",
    title: "Master the Academic Word List",
    body:
      "Coxhead's Academic Word List (570 word families) covers ~10% of words in academic texts. The Vocabulary module of this app seeds the full AWL — work through one sublist a week.",
    level: "intermediate",
    source: "Coxhead, A. (2000). 'A New Academic Word List', TESOL Quarterly 34(2): 213–238.",
    sourceUrl: "https://www.wgtn.ac.nz/lals/resources/academicwordlist",
  },

  // --- GENERAL ----------------------------------------------------------
  {
    id: "g-001",
    module: "general",
    title: "Mock under exam conditions weekly",
    body:
      "Pen and paper, no breaks, full timer. Stamina is a skill — most candidates underestimate how much harder a continuous 2h45m exam is than three separate hours of practice.",
    level: "advanced",
    source: SRC_CAMBRIDGE,
    sourceUrl: SRC_CAMBRIDGE_URL,
  },
  {
    id: "g-002",
    module: "general",
    title: "Day before: zero new material",
    body:
      "British Council's standard test-day advice: on exam day −1, only revise notes you've already made — never read new material. Sleep is more valuable than any last-minute knowledge.",
    level: "advanced",
    source: SRC_BC_PREP,
    sourceUrl: SRC_BC_PREP_URL,
  },
  {
    id: "g-003",
    module: "general",
    title: "Bring a pencil for Listening and Reading",
    body:
      "Cambridge specifies pencils for Listening and Reading; pen or pencil for Writing. Bring a sharpener and an eraser. Sounds trivial, but lost points to broken pencil leads happen every test session.",
    level: "beginner",
    source: SRC_CAMBRIDGE,
    sourceUrl: SRC_CAMBRIDGE_URL,
  },
];
