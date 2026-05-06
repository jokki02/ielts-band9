// Official IELTS writing band descriptors (abridged for in-app reference).

export type WritingCriterion =
  | "taskAchievement"
  | "coherenceCohesion"
  | "lexicalResource"
  | "grammaticalRange";

export const CRITERION_LABEL: Record<WritingCriterion, string> = {
  taskAchievement: "Task Achievement",
  coherenceCohesion: "Coherence & Cohesion",
  lexicalResource: "Lexical Resource",
  grammaticalRange: "Grammatical Range & Accuracy",
};

export const CRITERION_DESC: Record<WritingCriterion, string> = {
  taskAchievement:
    "How well you address all parts of the task with relevant, fully-developed ideas and a clear position.",
  coherenceCohesion:
    "How logically your ideas flow, with clear paragraphing and skilful use of cohesive devices.",
  lexicalResource:
    "Your vocabulary range, accuracy, and ability to use less-common items naturally.",
  grammaticalRange:
    "Your range of complex structures, grammatical accuracy, and punctuation control.",
};

export const BAND_DESCRIPTORS: Record<
  WritingCriterion,
  Record<7 | 8 | 9, string>
> = {
  taskAchievement: {
    9: "Fully addresses all parts of the task. Presents a fully developed position with relevant, fully-extended and well-supported ideas.",
    8: "Sufficiently addresses all parts of the task; clear position; well-developed ideas with appropriate support.",
    7: "Addresses all parts of the task; clear position; main ideas extended and supported but may over-generalise or have unclear/inappropriate detail.",
  },
  coherenceCohesion: {
    9: "Uses cohesion in a way that attracts no attention. Skilful paragraphing.",
    8: "Sequences information and ideas logically; manages all aspects of cohesion well; uses paragraphing sufficiently and appropriately.",
    7: "Logically organises information; clear progression throughout; uses a range of cohesive devices appropriately, although there may be some under-/over-use.",
  },
  lexicalResource: {
    9: "Uses a wide range of vocabulary with very natural and sophisticated control of lexical features; rare minor errors occur only as 'slips'.",
    8: "Uses a wide range of vocabulary fluently and flexibly; skilful use of uncommon items; occasional inaccuracies in word choice/collocation.",
    7: "Uses a sufficient range of vocabulary to allow some flexibility and precision; uses less-common items with some awareness of style; may produce occasional errors in word choice, spelling or word formation.",
  },
  grammaticalRange: {
    9: "Uses a wide range of structures with full flexibility and accuracy; rare minor errors occur only as 'slips'.",
    8: "Uses a wide range of structures; the majority of sentences are error-free; makes only very occasional errors or inappropriacies.",
    7: "Uses a variety of complex structures; produces frequent error-free sentences; has good control of grammar and punctuation but may make a few errors.",
  },
};
