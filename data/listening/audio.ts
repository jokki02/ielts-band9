export interface ListeningTrack {
  id: string;
  title: string;
  section: 1 | 2 | 3 | 4;
  description: string;
  /**
   * Path or URL to an audio file. We don't ship real recordings — the user is
   * expected to provide them, or we use the browser's SpeechSynthesis API as a
   * stand-in (handled by `synthSpeechFor` in the listening UI).
   */
  audioUrl?: string;
  /**
   * Transcript used for stand-in speech synthesis when audioUrl is missing.
   * Each entry is one speaker turn.
   */
  transcript: { speaker: string; text: string }[];
  questions: ListeningQuestion[];
}

export interface ListeningQuestion {
  num: number;
  type: "form" | "mcq" | "short_answer" | "matching" | "labeling";
  question: string;
  options?: string[];
  expected: string;
  explanation: string;
}

export const LISTENING_TRACKS: ListeningTrack[] = [
  {
    id: "lt-001",
    title: "Library Membership Form",
    section: 1,
    description:
      "A student calls a public library to register for membership. (Section 1 — everyday social context, transactional.)",
    transcript: [
      {
        speaker: "Librarian",
        text: "Good afternoon, Hartwell Public Library, this is Catherine speaking. How can I help you?",
      },
      {
        speaker: "Caller",
        text: "Hi, I'd like to apply for a library membership, please.",
      },
      {
        speaker: "Librarian",
        text: "Of course. May I take your full name?",
      },
      {
        speaker: "Caller",
        text: "Sure, it's Daniel Kowalski. K-O-W-A-L-S-K-I.",
      },
      {
        speaker: "Librarian",
        text: "Thank you, Daniel. And your date of birth?",
      },
      {
        speaker: "Caller",
        text: "The fourteenth of March, nineteen ninety-eight.",
      },
      {
        speaker: "Librarian",
        text: "Lovely. Could I take a current address?",
      },
      {
        speaker: "Caller",
        text: "Yes — flat 7B, Marlborough House, Belgrave Road. The post code is RG14 7QF.",
      },
      {
        speaker: "Librarian",
        text: "Got it. And which membership type would you like? We have Standard, which is fifteen pounds a year, or Plus, which is twenty-five pounds and includes audiobooks.",
      },
      {
        speaker: "Caller",
        text: "Plus, please.",
      },
      {
        speaker: "Librarian",
        text: "Excellent. You'll need to bring photo ID and a recent utility bill when you collect the card.",
      },
    ],
    questions: [
      {
        num: 1,
        type: "form",
        question: "Surname:",
        expected: "Kowalski",
        explanation: "Spelt out by the caller (K-O-W-A-L-S-K-I).",
      },
      {
        num: 2,
        type: "form",
        question: "Date of birth:",
        expected: "14 March 1998 | 14/03/1998 | 14th March 1998",
        explanation: "Spoken as 'fourteenth of March nineteen ninety-eight'.",
      },
      {
        num: 3,
        type: "form",
        question: "Flat number:",
        expected: "7B",
        explanation: "'Flat 7B, Marlborough House'.",
      },
      {
        num: 4,
        type: "form",
        question: "Post code:",
        expected: "RG14 7QF",
        explanation: "Spelt out at the end of address.",
      },
      {
        num: 5,
        type: "mcq",
        question: "Which membership did the caller choose?",
        options: ["Standard (£15)", "Plus (£25)", "Concessionary"],
        expected: "Plus (£25)",
        explanation:
          "The caller said 'Plus, please' after hearing both options.",
      },
      {
        num: 6,
        type: "short_answer",
        question:
          "What two things must the caller bring when collecting the card?",
        expected: "photo ID and utility bill | photo ID and a utility bill",
        explanation:
          "Librarian: 'photo ID and a recent utility bill'.",
      },
    ],
  },
  {
    id: "lt-002",
    title: "Photosynthesis Lecture",
    section: 4,
    description:
      "A short academic lecture on photosynthesis. (Section 4 — academic monologue.)",
    transcript: [
      {
        speaker: "Lecturer",
        text:
          "Good afternoon, everyone. Today we'll examine the process of photosynthesis — arguably the most consequential biochemical reaction on the planet. Photosynthesis can be summarised by a deceptively simple equation: six molecules of carbon dioxide combine with six of water, in the presence of light, to yield one molecule of glucose and six of oxygen.",
      },
      {
        speaker: "Lecturer",
        text:
          "The reaction itself, however, occurs in two distinct stages. The first, the so-called light-dependent reactions, take place in the thylakoid membrane of the chloroplast. Here, photons strike chlorophyll, dislodging electrons that are used to generate ATP — the cell's energy currency.",
      },
      {
        speaker: "Lecturer",
        text:
          "The second stage, the Calvin cycle, occurs in the stroma. It is in this cycle that carbon dioxide is fixed — that is, incorporated into an organic molecule — by the enzyme RuBisCO. Despite being one of the most abundant proteins on Earth, RuBisCO is famously inefficient. It is for this reason that some plant biologists view it as a prime target for genetic improvement.",
      },
      {
        speaker: "Lecturer",
        text:
          "Finally, three quick implications. First, all atmospheric oxygen is, ultimately, photosynthetic in origin. Second, fossil fuels are simply the long-term storage of carbon once captured by photosynthesis. And third, any civilisation that hopes to feed nine billion people will, in one way or another, need to make this single reaction more productive.",
      },
    ],
    questions: [
      {
        num: 1,
        type: "short_answer",
        question:
          "How many molecules of carbon dioxide are required to produce one molecule of glucose?",
        expected: "six | 6",
        explanation:
          "Lecturer states 'six molecules of carbon dioxide … yield one molecule of glucose.'",
      },
      {
        num: 2,
        type: "short_answer",
        question:
          "Where do the light-dependent reactions take place?",
        expected: "thylakoid membrane | thylakoid",
        explanation:
          "'Take place in the thylakoid membrane of the chloroplast.'",
      },
      {
        num: 3,
        type: "short_answer",
        question:
          "What energy molecule is generated in the light-dependent reactions?",
        expected: "ATP",
        explanation: "'…used to generate ATP — the cell's energy currency.'",
      },
      {
        num: 4,
        type: "short_answer",
        question:
          "Which enzyme fixes carbon dioxide in the Calvin cycle?",
        expected: "RuBisCO | rubisco",
        explanation: "'…by the enzyme RuBisCO.'",
      },
      {
        num: 5,
        type: "mcq",
        question:
          "The lecturer suggests RuBisCO is:",
        options: [
          "the most abundant protein on Earth",
          "famously inefficient",
          "a recent discovery",
        ],
        expected: "famously inefficient",
        explanation: "'RuBisCO is famously inefficient.'",
      },
    ],
  },
];
