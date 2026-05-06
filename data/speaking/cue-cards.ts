export interface SpeakingPart1 {
  topic: string;
  questions: string[];
}

export interface SpeakingPart2 {
  id: string;
  topic: string;
  task: string;
  prompts: string[];
  followUpPart3: string[];
  bandLevel: number;
  modelVocabulary: string[];
  band9Tips: string;
}

export const PART1_TOPICS: SpeakingPart1[] = [
  {
    topic: "Hometown",
    questions: [
      "Where is your hometown?",
      "What do you like most about your hometown?",
      "Has your hometown changed much over the years?",
      "Would you like to live in your hometown in the future?",
    ],
  },
  {
    topic: "Studies / Work",
    questions: [
      "Are you a student or do you work?",
      "Why did you choose this subject / job?",
      "What do you enjoy most about it?",
      "What would you like to do in the future?",
    ],
  },
  {
    topic: "Hobbies",
    questions: [
      "What do you do in your free time?",
      "Have your hobbies changed since you were a child?",
      "Do you prefer indoor or outdoor activities?",
      "Is it important to have a hobby?",
    ],
  },
  {
    topic: "Reading",
    questions: [
      "Do you like reading?",
      "What kind of books do you read?",
      "Do you prefer e-books or printed books?",
      "Did you enjoy reading as a child?",
    ],
  },
  {
    topic: "Technology",
    questions: [
      "How often do you use a computer?",
      "What do you use the internet for most?",
      "Has technology made your life easier?",
      "Do you think people rely on technology too much?",
    ],
  },
];

export const PART2_CUE_CARDS: SpeakingPart2[] = [
  {
    id: "p2-001",
    topic: "Person",
    task: "Describe a person who has had an important influence on your life.",
    prompts: [
      "who this person is",
      "how you know them",
      "what they have done that influenced you",
      "and explain why their influence has been so significant",
    ],
    followUpPart3: [
      "Do you think parents are the most important influence on their children?",
      "How can teachers influence students positively?",
      "Are role models more important now than in the past?",
      "What qualities make someone influential?",
    ],
    bandLevel: 8,
    modelVocabulary: [
      "instilled in me",
      "lasting impression",
      "looked up to",
      "shaped my outlook",
      "owe a great deal to",
    ],
    band9Tips:
      "Pick someone you can describe vividly with at least one specific anecdote. Vague answers ('she's a great person') hurt your Lexical Resource score.",
  },
  {
    id: "p2-002",
    topic: "Experience",
    task: "Describe a memorable trip you have taken.",
    prompts: [
      "where you went",
      "who you went with",
      "what you did",
      "and explain why this trip was memorable for you",
    ],
    followUpPart3: [
      "Why do people travel abroad?",
      "Has tourism affected the environment?",
      "Do you think virtual travel could ever replace real travel?",
      "How has international travel changed in recent decades?",
    ],
    bandLevel: 7.5,
    modelVocabulary: [
      "off the beaten track",
      "an unforgettable experience",
      "took my breath away",
      "soak up the atmosphere",
      "a once-in-a-lifetime opportunity",
    ],
    band9Tips:
      "Use 1–2 idiomatic expressions naturally — 'off the beaten track', 'soak up the atmosphere'. Avoid forcing them.",
  },
  {
    id: "p2-003",
    topic: "Object",
    task:
      "Describe a piece of technology that has changed the way you live.",
    prompts: [
      "what it is",
      "when you started using it",
      "how often you use it",
      "and explain how it has changed your life",
    ],
    followUpPart3: [
      "Do you think people rely too much on technology?",
      "How is technology changing the way we work?",
      "What technology will be most important in the next 10 years?",
      "Are there negative consequences of rapid technological change?",
    ],
    bandLevel: 8,
    modelVocabulary: [
      "indispensable",
      "revolutionised",
      "second nature",
      "at my fingertips",
      "increasingly reliant on",
    ],
    band9Tips:
      "Move beyond simple description into evaluative language: how, exactly, has it reshaped your routine?",
  },
  {
    id: "p2-004",
    topic: "Event",
    task: "Describe an important decision you have made recently.",
    prompts: [
      "what the decision was",
      "when you made it",
      "what factors influenced your choice",
      "and explain why this decision was important",
    ],
    followUpPart3: [
      "Do you think children should be involved in family decisions?",
      "Are major decisions made differently in different cultures?",
      "Is it better to make decisions quickly or slowly?",
      "How can we make better decisions?",
    ],
    bandLevel: 8,
    modelVocabulary: [
      "weigh up the pros and cons",
      "in hindsight",
      "a watershed moment",
      "give it considerable thought",
      "a leap of faith",
    ],
    band9Tips:
      "Use the past perfect ('I had been considering it for months') to demonstrate grammatical range.",
  },
  {
    id: "p2-005",
    topic: "Place",
    task: "Describe a public place that you enjoy visiting.",
    prompts: [
      "where it is",
      "how often you visit",
      "what you do there",
      "and explain why you enjoy this place",
    ],
    followUpPart3: [
      "Why do public spaces matter for community life?",
      "Are public spaces in your city well designed?",
      "How can governments make cities more liveable?",
      "Should public spaces be free of advertising?",
    ],
    bandLevel: 7.5,
    modelVocabulary: [
      "a buzzing atmosphere",
      "the heart of the city",
      "tucked away",
      "people-watching",
      "a stone's throw from",
    ],
    band9Tips:
      "Bring the place to life with sensory detail — sounds, smells, light. This drives Lexical Resource.",
  },
  {
    id: "p2-006",
    topic: "Skill",
    task:
      "Describe a skill you would like to learn in the future.",
    prompts: [
      "what the skill is",
      "why you want to learn it",
      "how you plan to learn it",
      "and explain how it would be useful",
    ],
    followUpPart3: [
      "Why do many adults take up new skills?",
      "Should schools teach more practical skills?",
      "Is online learning effective?",
      "What skills will be most valuable in the future?",
    ],
    bandLevel: 7.5,
    modelVocabulary: [
      "broaden my horizons",
      "have a knack for",
      "from scratch",
      "hands-on practice",
      "self-directed learning",
    ],
    band9Tips:
      "Use future-perfect ('by the end of the year, I will have completed…') for grammatical range.",
  },
];
