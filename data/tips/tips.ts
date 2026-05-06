export interface Tip {
  id: string;
  module: "writing" | "reading" | "listening" | "speaking" | "vocabulary" | "general";
  title: string;
  body: string;
  level: "beginner" | "intermediate" | "advanced";
}

export const TIPS: Tip[] = [
  // Writing
  {
    id: "w-001",
    module: "writing",
    title: "Always plan for 5 minutes before writing Task 2",
    body:
      "Band 9 candidates almost universally plan. A 5-minute outline (thesis + 2 body main ideas + conclusion direction) saves you 10 minutes of mid-essay floundering and produces better Coherence & Cohesion.",
    level: "beginner",
  },
  {
    id: "w-002",
    module: "writing",
    title: "Use the PEEL paragraph structure",
    body:
      "Point — state the argument; Explain — develop the reasoning; Example — give a concrete instance (named, specific); Link — connect back to the question. Every body paragraph should follow this.",
    level: "beginner",
  },
  {
    id: "w-003",
    module: "writing",
    title: "Replace 'people' with a more specific noun",
    body:
      "'People' appears in nearly every Band 6 essay and rarely in Band 9 ones. Replace with 'individuals', 'citizens', 'consumers', 'commuters', 'students' — whatever is contextually appropriate.",
    level: "intermediate",
  },
  {
    id: "w-004",
    module: "writing",
    title: "Master 5 cohesive devices, don't memorise 50",
    body:
      "Examiners reward natural, varied use — not a Linker Bingo card. Use 5–6 well: 'Furthermore', 'Nevertheless', 'In particular', 'As a result', 'By comparison', 'Ultimately'.",
    level: "intermediate",
  },
  {
    id: "w-005",
    module: "writing",
    title: "Task 1: write the overview FIRST, then come back",
    body:
      "Write a one-sentence overview at the very start, then refine after the body paragraphs are done. Your overview must mention only the 2 most striking features — no specific data.",
    level: "advanced",
  },
  {
    id: "w-006",
    module: "writing",
    title: "Use the 'inversion' to add Band 9 grammar variety",
    body:
      "Once per essay, lead with a negative or restrictive adverbial: 'Not only does this approach…', 'Only when governments…', 'Rarely has a single technology so transformed…'. This signals advanced grammatical range.",
    level: "advanced",
  },
  {
    id: "w-007",
    module: "writing",
    title: "Aim for 270–290 words on Task 2",
    body:
      "Anything below 250 is automatic Band 5 ceiling on Task Achievement. Anything above 320 risks losing focus. The sweet spot for Band 8+ is 270–290.",
    level: "beginner",
  },

  // Reading
  {
    id: "r-001",
    module: "reading",
    title: "Skim before reading questions, not after",
    body:
      "Spend 3 minutes skimming the passage to capture its argument and structure. THEN read the questions. This is faster overall than reading questions first and re-reading repeatedly.",
    level: "beginner",
  },
  {
    id: "r-002",
    module: "reading",
    title: "TFNG: 'No info' = Not Given",
    body:
      "If you cannot find a clear contradiction in the passage, it is Not Given — even if the statement seems obviously true in real life. Examiners punish 'common-sense' reasoning here.",
    level: "intermediate",
  },
  {
    id: "r-003",
    module: "reading",
    title: "Matching Headings: locate the topic sentence",
    body:
      "Each heading matches a paragraph's main idea, usually expressed in its first or last sentence. Underline that sentence first; then match.",
    level: "intermediate",
  },
  {
    id: "r-004",
    module: "reading",
    title: "Time-box per passage",
    body:
      "20 minutes per passage, no exceptions. If you have a stubborn question, mark it and move on. The 14th-question hard ones are worth the same as the easy first one.",
    level: "beginner",
  },
  {
    id: "r-005",
    module: "reading",
    title: "Use the question order as your reading guide",
    body:
      "Most question groups follow the order of the passage (TFNG, sentence completion, summary). Use this to narrow your search to a specific section.",
    level: "advanced",
  },

  // Listening
  {
    id: "l-001",
    module: "listening",
    title: "Read every question BEFORE the audio plays",
    body:
      "Use the 30 seconds at the start of each section to skim ALL questions in that section, not just the first few. Predict the answer type (number, name, place).",
    level: "beginner",
  },
  {
    id: "l-002",
    module: "listening",
    title: "Beware of distractor information",
    body:
      "Speakers often state a wrong answer, then correct themselves: 'I'd like to book a single room… actually, make that a double.' The correct answer is the second one.",
    level: "intermediate",
  },
  {
    id: "l-003",
    module: "listening",
    title: "Use the answer-transfer 10 minutes carefully",
    body:
      "Triple-check spelling, capitalisation of names, and singular vs plural. Most lost points in Listening come from transfer errors, not comprehension errors.",
    level: "advanced",
  },

  // Speaking
  {
    id: "s-001",
    module: "speaking",
    title: "Don't rehearse memorised answers",
    body:
      "Examiners can spot scripted Part 1 answers immediately — they will pivot to a follow-up question and your memorised material collapses. Practise topics, not exact wording.",
    level: "beginner",
  },
  {
    id: "s-002",
    module: "speaking",
    title: "Use natural fillers — sparingly",
    body:
      "'Well,…', 'Let me think…', 'That's an interesting question because…' buy you a second to formulate. Avoid robotic 'um' and excessive hedging.",
    level: "intermediate",
  },
  {
    id: "s-003",
    module: "speaking",
    title: "In Part 2, use the full 1-minute prep",
    body:
      "Use bullet points, not full sentences. Note one specific person/place/event for each prompt — this seeds your 2-minute talk with concrete detail.",
    level: "intermediate",
  },
  {
    id: "s-004",
    module: "speaking",
    title: "Show off one complex grammatical structure per part",
    body:
      "A third conditional ('If I had known earlier, I would have…'), a participle phrase ('Having considered the alternatives…'), or a cleft sentence ('What strikes me most is…') signals Band 8+.",
    level: "advanced",
  },

  // Vocabulary
  {
    id: "v-001",
    module: "vocabulary",
    title: "Learn collocations, not isolated words",
    body:
      "Memorising 'detrimental' alone is half the battle. Memorise 'detrimental EFFECT', 'detrimental TO health', 'profoundly detrimental'. Collocations are what makes Band 9 lexis sound natural.",
    level: "beginner",
  },
  {
    id: "v-002",
    module: "vocabulary",
    title: "Avoid thesaurus traps",
    body:
      "Don't replace 'happy' with 'jubilant' if the context calls for 'pleased'. Examiners penalise wrong-register or wrong-collocation 'big words' more harshly than they reward unusual vocabulary.",
    level: "advanced",
  },
  {
    id: "v-003",
    module: "vocabulary",
    title: "Build a 'topic sheet' per Task 2 area",
    body:
      "For each common topic (education, environment, technology…), maintain 8–10 high-band phrases. When you face a Task 2 prompt on that topic, you have a vocabulary toolkit ready.",
    level: "intermediate",
  },

  // General
  {
    id: "g-001",
    module: "general",
    title: "Mock under exam conditions weekly",
    body:
      "Pen and paper, no breaks, full timer. Stamina is a skill — and most candidates underestimate how much harder a 3-hour exam is than three 1-hour sessions.",
    level: "advanced",
  },
  {
    id: "g-002",
    module: "general",
    title: "The day before: zero new material",
    body:
      "On exam day −1, only revise notes you've made — never read new material. Sleep is more important than any last-minute knowledge.",
    level: "advanced",
  },
];
