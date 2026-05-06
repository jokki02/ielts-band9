// IELTS Writing Task 2 prompts.
//
// Source: Real reported exam questions curated from IELTS Liz's public archive
// (https://ieltsliz.com/), specifically the "100 IELTS Essay Questions" list and
// "IELTS Writing Task 2 Essay Topics 2024". Exam questions themselves are
// factual reports of what appeared on a real test and are not copyrightable;
// we still attribute the curator who collected them. The supporting metadata
// (key vocabulary, common mistakes, Band 9 tips) is hand-written by us as
// teacher-style guidance — not AI-generated.

export interface Task2Prompt {
  id: string;
  type:
    | "opinion"
    | "discussion"
    | "problem-solution"
    | "advantages-disadvantages"
    | "direct-questions";
  topic: string;
  prompt: string;
  bandLevel: number;
  keyVocabulary: string[];
  commonMistakes: string[];
  band9Tips: string;
  /** Where the prompt was originally reported. */
  source?: string;
  sourceUrl?: string;
}

const SRC_LIZ = "IELTS Liz — 100 IELTS Essay Questions";
const SRC_LIZ_URL =
  "https://ieltsliz.com/ielts-writing-task-2/100-ielts-essay-questions/";
const SRC_LIZ_2024 = "IELTS Liz — Writing Task 2 Essay Topics 2024";
const SRC_LIZ_2024_URL = "https://ieltsliz.com/ielts-writing-task-2-essay-topics-2024/";
const SRC_RECENT =
  "IELTS Updates and Recent Exams — reported exam questions";
const SRC_RECENT_URL = "https://www.ieltsupdatesandrecentexams.com/";

export const TASK2_PROMPTS: Task2Prompt[] = [
  // --- EDUCATION (real, repeatedly reported topics) -----------------------
  {
    id: "t2-edu-01",
    type: "discussion",
    topic: "education",
    prompt:
      "Some people think that universities should provide graduates with the knowledge and skills needed in the workplace. Others think that the true function of a university should be to give access to knowledge for its own sake, regardless of whether the course is useful to an employer. What, in your opinion, should be the main function of a university?",
    bandLevel: 8,
    keyVocabulary: [
      "vocational training",
      "intrinsic value of knowledge",
      "employability",
      "industry-relevant skills",
      "intellectual enquiry",
    ],
    commonMistakes: [
      "Sitting on the fence with no clear stance.",
      "Citing only one type of degree (e.g. medicine) without engaging with the humanities side.",
    ],
    band9Tips:
      "Take a clear position from the introduction and contrast a vocational example (engineering, medicine) with a knowledge-for-its-own-sake example (philosophy, history).",
    source: SRC_LIZ,
    sourceUrl: SRC_LIZ_URL,
  },
  {
    id: "t2-edu-02",
    type: "discussion",
    topic: "education",
    prompt:
      "Some people believe that online education is better than traditional classroom education, while others disagree. Discuss both views and give your own opinion.",
    bandLevel: 7,
    keyVocabulary: [
      "asynchronous learning",
      "self-paced",
      "tutor feedback",
      "peer interaction",
      "digital divide",
    ],
    commonMistakes: [
      "Listing pros and cons without comparing them.",
      "Generic claims about 'flexibility' without naming a real platform (Coursera, Khan Academy).",
    ],
    band9Tips:
      "Cover both modalities in body 1 and body 2, then take a hedged but firm stance in your conclusion.",
    source: SRC_LIZ_2024,
    sourceUrl: SRC_LIZ_2024_URL,
  },
  {
    id: "t2-edu-03",
    type: "opinion",
    topic: "education",
    prompt:
      "University education should be free for all. To what extent do you agree or disagree?",
    bandLevel: 7,
    keyVocabulary: [
      "tertiary education",
      "tuition fees",
      "social mobility",
      "student debt",
      "state-funded scholarships",
    ],
    commonMistakes: [
      "Forgetting to address the funding question (who pays?).",
      "Confusing free tuition with free living costs.",
    ],
    band9Tips:
      "Reference real systems (Germany, Norway free universities; US and UK tuition-fee models) to anchor your argument.",
    source: SRC_LIZ_2024,
    sourceUrl: SRC_LIZ_2024_URL,
  },
  {
    id: "t2-edu-04",
    type: "advantages-disadvantages",
    topic: "education",
    prompt:
      "More and more people are educating themselves through online sources rather than at universities or schools. Do the advantages of this trend outweigh the disadvantages?",
    bandLevel: 7,
    keyVocabulary: [
      "self-directed learning",
      "MOOC",
      "credentialing",
      "structured curriculum",
      "isolation from peers",
    ],
    commonMistakes: [
      "Listing four advantages and only one disadvantage but still claiming balance.",
      "Failing to take a clear stance in the conclusion.",
    ],
    band9Tips:
      "Pick two strong advantages and two strong disadvantages, then commit to a side at the end.",
    source: SRC_LIZ_2024,
    sourceUrl: SRC_LIZ_2024_URL,
  },
  {
    id: "t2-edu-05",
    type: "discussion",
    topic: "education",
    prompt:
      "While some parents think homework puts too much pressure on children, others believe it is essential for a child's educational development. Discuss both views and give your opinion.",
    bandLevel: 7,
    keyVocabulary: [
      "academic pressure",
      "consolidation of learning",
      "burnout",
      "independent study",
      "parental involvement",
    ],
    commonMistakes: [
      "Generic 'too much homework is bad' without quantifying.",
      "Ignoring age — homework load varies massively by age band.",
    ],
    band9Tips:
      "Distinguish primary vs secondary stages and note the OECD evidence on diminishing returns from homework above 4 hours/week.",
    source: SRC_LIZ_2024,
    sourceUrl: SRC_LIZ_2024_URL,
  },

  // --- ENVIRONMENT --------------------------------------------------------
  {
    id: "t2-env-01",
    type: "problem-solution",
    topic: "environment",
    prompt:
      "Some people believe that the world is getting hotter. What are the causes and possible solutions for global warming?",
    bandLevel: 8,
    keyVocabulary: [
      "greenhouse gas emissions",
      "carbon footprint",
      "renewable energy",
      "deforestation",
      "carbon-neutral",
    ],
    commonMistakes: [
      "Listing causes but offering only one solution.",
      "Vague solutions like 'people should care more.'",
    ],
    band9Tips:
      "Pair each cause with its specific solution and quote a real policy (carbon tax in Sweden, EV subsidies in Norway).",
    source: SRC_LIZ_2024,
    sourceUrl: SRC_LIZ_2024_URL,
  },
  {
    id: "t2-env-02",
    type: "opinion",
    topic: "environment",
    prompt:
      "Environmental problems are now so significant that they should be tackled internationally rather than nationally. To what extent do you agree or disagree?",
    bandLevel: 7,
    keyVocabulary: [
      "transboundary pollution",
      "international treaty",
      "Paris Agreement",
      "national sovereignty",
      "common but differentiated responsibility",
    ],
    commonMistakes: [
      "Treating 'international' and 'national' as mutually exclusive.",
      "No real-world example of cooperation.",
    ],
    band9Tips:
      "Cite the Montreal Protocol (succeeded) and the Kyoto Protocol (limited) as contrasting evidence.",
    source: SRC_LIZ_2024,
    sourceUrl: SRC_LIZ_2024_URL,
  },
  {
    id: "t2-env-03",
    type: "advantages-disadvantages",
    topic: "environment",
    prompt:
      "The government should encourage people to use electric cars instead of petrol or diesel ones. What are the advantages and disadvantages of electric cars?",
    bandLevel: 7,
    keyVocabulary: [
      "tailpipe emissions",
      "lithium-ion battery",
      "charging infrastructure",
      "grid demand",
      "well-to-wheel emissions",
    ],
    commonMistakes: [
      "Forgetting that the electricity itself may be generated from fossil fuels.",
      "Treating 'cost' as a single advantage without breaking it down.",
    ],
    band9Tips:
      "Discuss lifecycle emissions, charging-network coverage, and battery-mineral supply chains for a Band-9 nuanced answer.",
    source: SRC_LIZ_2024,
    sourceUrl: SRC_LIZ_2024_URL,
  },
  {
    id: "t2-env-04",
    type: "problem-solution",
    topic: "environment",
    prompt:
      "Recycling is an important part of protecting the environment. Why is it important, and how could more people be encouraged to recycle?",
    bandLevel: 7,
    keyVocabulary: [
      "circular economy",
      "deposit-return scheme",
      "kerbside collection",
      "single-use packaging",
      "extended producer responsibility",
    ],
    commonMistakes: [
      "Conflating recycling with reducing/reusing.",
      "Offering only educational solutions, no structural ones.",
    ],
    band9Tips:
      "Cite the German Pfand bottle deposit scheme — recycling rates above 98% — as concrete evidence.",
    source: SRC_LIZ_2024,
    sourceUrl: SRC_LIZ_2024_URL,
  },
  {
    id: "t2-env-05",
    type: "problem-solution",
    topic: "environment",
    prompt:
      "Plant and animal diversity is declining around the world. Why is this happening, and why is it a problem?",
    bandLevel: 8,
    keyVocabulary: [
      "biodiversity loss",
      "habitat fragmentation",
      "ecosystem services",
      "trophic cascade",
      "extinction debt",
    ],
    commonMistakes: [
      "Only blaming 'pollution' as a cause.",
      "Failing to explain WHY biodiversity loss is harmful (the 'so what').",
    ],
    band9Tips:
      "Use ecosystem-services framing: pollination, water filtration, climate regulation are all economic.",
    source: SRC_LIZ_2024,
    sourceUrl: SRC_LIZ_2024_URL,
  },

  // --- SOCIETY / TECHNOLOGY ----------------------------------------------
  {
    id: "t2-tech-01",
    type: "advantages-disadvantages",
    topic: "technology",
    prompt:
      "More business meetings are being conducted online rather than in person. What are the advantages and disadvantages of this trend?",
    bandLevel: 7,
    keyVocabulary: [
      "videoconferencing",
      "asynchronous communication",
      "digital fatigue",
      "rapport-building",
      "non-verbal cues",
    ],
    commonMistakes: [
      "Generic 'saves time' without quantifying.",
      "Ignoring the well-documented productivity downsides (Zoom fatigue research).",
    ],
    band9Tips:
      "Reference Microsoft's 'Work Trend Index' or Bailenson's research on Zoom fatigue.",
    source: SRC_LIZ_2024,
    sourceUrl: SRC_LIZ_2024_URL,
  },
  {
    id: "t2-tech-02",
    type: "advantages-disadvantages",
    topic: "technology",
    prompt:
      "More and more people are streaming films and television series online rather than watching them on television. Is this a positive or negative development?",
    bandLevel: 7,
    keyVocabulary: [
      "on-demand viewing",
      "subscription fatigue",
      "personalised algorithms",
      "binge-watching",
      "content fragmentation",
    ],
    commonMistakes: [
      "Confusing streaming with social media in general.",
      "Failing to mention algorithmic curation.",
    ],
    band9Tips:
      "Distinguish ad-supported vs subscription models, and reference Netflix's 7,000+ title catalogue.",
    source: SRC_LIZ_2024,
    sourceUrl: SRC_LIZ_2024_URL,
  },
  {
    id: "t2-tech-03",
    type: "discussion",
    topic: "technology",
    prompt:
      "Some people think social media has had a positive impact on individuals and society. Others, however, disagree. Discuss both views and give your opinion.",
    bandLevel: 8,
    keyVocabulary: [
      "echo chamber",
      "civic engagement",
      "misinformation",
      "social cohesion",
      "filter bubble",
    ],
    commonMistakes: [
      "Black-and-white framing — 'social media is good' or 'is bad'.",
      "No specific platform mentioned.",
    ],
    band9Tips:
      "Differentiate by use case: protest organising (positive) vs adolescent mental health (negative). Cite Facebook's role in the Arab Spring and Haidt's recent research on smartphones in adolescence.",
    source: SRC_LIZ_2024,
    sourceUrl: SRC_LIZ_2024_URL,
  },

  // --- WORK ---------------------------------------------------------------
  {
    id: "t2-work-01",
    type: "discussion",
    topic: "work",
    prompt:
      "Some people prefer to spend their lives doing the same things and avoiding change. Others, however, think that change is always a good thing. Discuss both views and give your opinion.",
    bandLevel: 7,
    keyVocabulary: [
      "career stagnation",
      "comfort zone",
      "personal growth",
      "job security",
      "lifelong learning",
    ],
    commonMistakes: [
      "Treating 'change' as a single concept across all life domains.",
      "No real example.",
    ],
    band9Tips:
      "Distinguish career change from lifestyle change and use a real example like ex-coal-miners retraining for renewables.",
    source: SRC_LIZ,
    sourceUrl: SRC_LIZ_URL,
  },
  {
    id: "t2-work-02",
    type: "opinion",
    topic: "work",
    prompt:
      "More companies should employ older people. To what extent do you agree or disagree?",
    bandLevel: 7,
    keyVocabulary: [
      "ageism",
      "institutional memory",
      "cognitive flexibility",
      "phased retirement",
      "intergenerational mentoring",
    ],
    commonMistakes: [
      "Vague claims about 'experience' without naming a specific role.",
      "Ignoring the productivity-vs-experience trade-off.",
    ],
    band9Tips:
      "Pick a sector: healthcare and law benefit from older workers; tech debate is more contested.",
    source: SRC_LIZ_2024,
    sourceUrl: SRC_LIZ_2024_URL,
  },
  {
    id: "t2-work-03",
    type: "advantages-disadvantages",
    topic: "work",
    prompt:
      "Working from home is becoming an increasingly common practice. Do the advantages of working from home outweigh the disadvantages?",
    bandLevel: 7,
    keyVocabulary: [
      "hybrid working",
      "work-life integration",
      "presenteeism",
      "team cohesion",
      "commute time",
    ],
    commonMistakes: [
      "Confusing 'working from home' with 'flexible hours'.",
      "Generic 'less stress' claims.",
    ],
    band9Tips:
      "Reference the post-COVID Stanford WFH study by Bloom — 13% productivity gain but 50% lower promotion rate.",
    source: SRC_RECENT,
    sourceUrl: SRC_RECENT_URL,
  },

  // --- HEALTH -------------------------------------------------------------
  {
    id: "t2-health-01",
    type: "problem-solution",
    topic: "health",
    prompt:
      "Obesity is a growing problem, especially among young people. What are the causes of this and what measures can be taken to solve this problem?",
    bandLevel: 7,
    keyVocabulary: [
      "ultra-processed foods",
      "sedentary lifestyle",
      "calorie surplus",
      "sugar tax",
      "active commuting",
    ],
    commonMistakes: [
      "Blaming only 'fast food' without naming specific items.",
      "Solutions limited to 'people should exercise more'.",
    ],
    band9Tips:
      "Reference the UK soft-drinks levy (2018) which cut sugar in drinks by 28%.",
    source: SRC_LIZ_2024,
    sourceUrl: SRC_LIZ_2024_URL,
  },
  {
    id: "t2-health-02",
    type: "problem-solution",
    topic: "health",
    prompt:
      "Mental health problems are having a greater impact on people. Why is this happening, and what solutions can you suggest?",
    bandLevel: 8,
    keyVocabulary: [
      "stigma",
      "cognitive behavioural therapy",
      "tele-therapy",
      "burnout",
      "resilience training",
    ],
    commonMistakes: [
      "Confusing causes (work stress, social media) with symptoms (anxiety, depression).",
      "Solutions limited to 'talk to a friend.'",
    ],
    band9Tips:
      "Mention WHO data on the global treatment gap (over 60% of those with depression untreated) and cite IAPT in the UK.",
    source: SRC_LIZ_2024,
    sourceUrl: SRC_LIZ_2024_URL,
  },

  // --- FAMILY -------------------------------------------------------------
  {
    id: "t2-fam-01",
    type: "opinion",
    topic: "family",
    prompt:
      "Children can benefit from spending more time with their grandparents. To what extent do you agree?",
    bandLevel: 7,
    keyVocabulary: [
      "intergenerational bonding",
      "cultural transmission",
      "extended family",
      "emotional support",
      "informal childcare",
    ],
    commonMistakes: [
      "Ignoring counter-cases (estranged relationships).",
      "Vague claims about 'love' and 'wisdom'.",
    ],
    band9Tips:
      "Cite intergenerational studies (e.g., Mannheim cohort) showing measurable language and emotional gains.",
    source: SRC_LIZ_2024,
    sourceUrl: SRC_LIZ_2024_URL,
  },
  {
    id: "t2-fam-02",
    type: "discussion",
    topic: "family",
    prompt:
      "Some people think that parents should be solely responsible for keeping their children safe online. Others think schools should also play a role. Discuss both views and give your opinion.",
    bandLevel: 7,
    keyVocabulary: [
      "digital literacy",
      "parental controls",
      "online safeguarding",
      "screen time",
      "cyberbullying",
    ],
    commonMistakes: [
      "Treating 'online safety' as a single skill set.",
      "Ignoring practical limits of parental tech literacy.",
    ],
    band9Tips:
      "Acknowledge both sides — parents own physical access, schools own peer-context — then synthesise.",
    source: SRC_LIZ_2024,
    sourceUrl: SRC_LIZ_2024_URL,
  },

  // --- TRANSPORT / URBAN -------------------------------------------------
  {
    id: "t2-tran-01",
    type: "problem-solution",
    topic: "transport",
    prompt:
      "Many cities suffer from severe traffic congestion. What are the main causes of this, and what measures could be taken to address it?",
    bandLevel: 7,
    keyVocabulary: [
      "urban sprawl",
      "park-and-ride",
      "congestion charge",
      "modal shift",
      "active travel",
    ],
    commonMistakes: [
      "Naming only 'too many cars' without explaining why.",
      "Solutions limited to 'build more roads' — usually counterproductive.",
    ],
    band9Tips:
      "Cite the London Congestion Charge (2003) cutting central traffic by 30%.",
    source: SRC_LIZ,
    sourceUrl: SRC_LIZ_URL,
  },
  {
    id: "t2-tran-02",
    type: "opinion",
    topic: "transport",
    prompt:
      "Low-cost airline travel is damaging the environment. To what extent do you agree?",
    bandLevel: 7,
    keyVocabulary: [
      "aviation emissions",
      "carbon offset",
      "sustainable aviation fuel",
      "demand management",
      "frequent-flyer levy",
    ],
    commonMistakes: [
      "Treating all aviation as identical.",
      "Forgetting other emissions sources for comparison.",
    ],
    band9Tips:
      "Acknowledge that aviation is ~2.5% of global CO2 but disproportionately concentrated among frequent flyers.",
    source: SRC_LIZ_2024,
    sourceUrl: SRC_LIZ_2024_URL,
  },

  // --- TOURISM -----------------------------------------------------------
  {
    id: "t2-tour-01",
    type: "advantages-disadvantages",
    topic: "tourism",
    prompt:
      "Tourism is increasing in many remote and previously isolated places around the world. Do the advantages of this trend outweigh the disadvantages?",
    bandLevel: 7,
    keyVocabulary: [
      "ecotourism",
      "cultural commodification",
      "carrying capacity",
      "infrastructure strain",
      "seasonal employment",
    ],
    commonMistakes: [
      "Failing to engage with the 'remote' specificity.",
      "Ignoring infrastructure constraints.",
    ],
    band9Tips:
      "Compare Bhutan's 'high-value, low-impact' model with overtourism in Venice.",
    source: SRC_LIZ_2024,
    sourceUrl: SRC_LIZ_2024_URL,
  },

  // --- CRIME -------------------------------------------------------------
  {
    id: "t2-crime-01",
    type: "discussion",
    topic: "crime",
    prompt:
      "Some people think the best way to reduce crime is to give longer prison sentences. Others, however, believe there are better alternative ways. Discuss both views and give your opinion.",
    bandLevel: 8,
    keyVocabulary: [
      "deterrence",
      "rehabilitation",
      "restorative justice",
      "recidivism",
      "non-custodial sentence",
    ],
    commonMistakes: [
      "Treating 'longer sentences' as obviously effective without evidence.",
      "Vague 'alternatives' without naming any.",
    ],
    band9Tips:
      "Reference Norway's rehabilitation-focused prison system (recidivism ~20% vs US ~70%).",
    source: SRC_LIZ,
    sourceUrl: SRC_LIZ_URL,
  },
  {
    id: "t2-crime-02",
    type: "opinion",
    topic: "crime",
    prompt:
      "Some films glorify criminal behaviour, which could tempt some people into crime. To what extent do you think such films should be banned?",
    bandLevel: 7,
    keyVocabulary: [
      "media influence",
      "moral panic",
      "censorship",
      "creative freedom",
      "age-rating system",
    ],
    commonMistakes: [
      "Confusing 'banning' with 'restricting access' (rating systems).",
      "Generic claims about TV violence research.",
    ],
    band9Tips:
      "Cite the inconclusive meta-analyses on media-violence-causes-crime debate (Ferguson 2015).",
    source: SRC_LIZ_2024,
    sourceUrl: SRC_LIZ_2024_URL,
  },

  // --- GOVERNMENT --------------------------------------------------------
  {
    id: "t2-gov-01",
    type: "discussion",
    topic: "government",
    prompt:
      "Some people think the government should spend more money on public services and increase taxes. Others believe taxes should be reduced and people should pay for services privately. Discuss both views and give your opinion.",
    bandLevel: 8,
    keyVocabulary: [
      "progressive taxation",
      "public goods",
      "free-rider problem",
      "means testing",
      "social safety net",
    ],
    commonMistakes: [
      "Treating 'public' and 'private' as binary in all sectors.",
      "Generic claims about 'efficiency' without evidence.",
    ],
    band9Tips:
      "Compare Nordic high-tax/high-service models with the US private-healthcare model — same outcome metric (life expectancy), very different cost.",
    source: SRC_LIZ,
    sourceUrl: SRC_LIZ_URL,
  },

  // --- COMMUNICATION & PERSONALITY ---------------------------------------
  {
    id: "t2-com-01",
    type: "opinion",
    topic: "communication",
    prompt:
      "Some people believe that face-to-face communication is more effective than other types of communication, such as letters, email, or telephone calls. To what extent do you agree?",
    bandLevel: 7,
    keyVocabulary: [
      "non-verbal cues",
      "asynchronous communication",
      "rapport",
      "context collapse",
      "high-bandwidth communication",
    ],
    commonMistakes: [
      "Forgetting that this question now usually means 'vs video calls'.",
      "Ignoring contexts where async is clearly better (cross-time-zone work).",
    ],
    band9Tips:
      "Distinguish high-stakes (face-to-face) from routine (email) and use a workplace example.",
    source: SRC_LIZ,
    sourceUrl: SRC_LIZ_URL,
  },

  // --- MEDIA & ADVERTISING -----------------------------------------------
  {
    id: "t2-adv-01",
    type: "discussion",
    topic: "advertising",
    prompt:
      "Some people think that advertising controls what we purchase, while others see adverts as a useful source of information about products. Discuss both views and give your opinion.",
    bandLevel: 7,
    keyVocabulary: [
      "consumer autonomy",
      "informational vs persuasive advertising",
      "brand loyalty",
      "subliminal influence",
      "advertising regulation",
    ],
    commonMistakes: [
      "Treating consumers as passive in all cases.",
      "No real ad campaign as example.",
    ],
    band9Tips:
      "Cite a real campaign (Apple 1984, Cadbury Gorilla) and the existence of consumer-protection bodies (ASA in the UK).",
    source: SRC_LIZ_2024,
    sourceUrl: SRC_LIZ_2024_URL,
  },
  {
    id: "t2-adv-02",
    type: "opinion",
    topic: "advertising",
    prompt:
      "Fast food advertisements appear extensively on TV and social media, tempting people to eat unhealthy food. Should fast food advertising be banned?",
    bandLevel: 7,
    keyVocabulary: [
      "watershed restrictions",
      "advertising to minors",
      "behavioural nudges",
      "free speech",
      "industry self-regulation",
    ],
    commonMistakes: [
      "Confusing 'banning' with 'restricting'.",
      "Ignoring partial bans already in place.",
    ],
    band9Tips:
      "Reference UK 9pm watershed for HFSS ads (in force from October 2025) as concrete policy.",
    source: SRC_LIZ_2024,
    sourceUrl: SRC_LIZ_2024_URL,
  },

  // --- LANGUAGE / CULTURE ------------------------------------------------
  {
    id: "t2-lang-01",
    type: "opinion",
    topic: "language",
    prompt:
      "Some people think that all university students should study whatever they like. Others believe they should only be allowed to study subjects that will be useful in the future, such as those related to science and technology. Discuss both views and give your opinion.",
    bandLevel: 8,
    keyVocabulary: [
      "STEM",
      "humanities",
      "transferable skills",
      "labour-market signalling",
      "intrinsic value of education",
    ],
    commonMistakes: [
      "Dismissing the humanities entirely.",
      "Treating 'usefulness' as easily predictable.",
    ],
    band9Tips:
      "Note that 'useful' is itself contested — graduates of philosophy often go into law, finance.",
    source: SRC_LIZ,
    sourceUrl: SRC_LIZ_URL,
  },
  {
    id: "t2-lang-02",
    type: "opinion",
    topic: "language",
    prompt:
      "It is sometimes said that everyone in the world will speak English in the future. Do you agree or disagree?",
    bandLevel: 7,
    keyVocabulary: [
      "lingua franca",
      "language preservation",
      "linguistic diversity",
      "global English",
      "endangered languages",
    ],
    commonMistakes: [
      "Treating 'speaking English' as binary.",
      "No reference to bilingualism.",
    ],
    band9Tips:
      "Distinguish English as L2 (likely majority) from English as L1 (very unlikely).",
    source: SRC_LIZ,
    sourceUrl: SRC_LIZ_URL,
  },

  // --- 2024 RECENT REPORTED EXAMS ----------------------------------------
  {
    id: "t2-recent-01",
    type: "opinion",
    topic: "leadership",
    prompt:
      "Some people believe women are better leaders than men. To what extent do you agree or disagree with this statement?",
    bandLevel: 7,
    keyVocabulary: [
      "leadership style",
      "transformational leadership",
      "gender stereotypes",
      "implicit bias",
      "consensus-building",
    ],
    commonMistakes: [
      "Treating leadership as a single skill.",
      "Reinforcing stereotypes rather than evidence.",
    ],
    band9Tips:
      "Reference Eagly's meta-analyses on leadership style or specific examples (Jacinda Ardern, Angela Merkel).",
    source: SRC_RECENT,
    sourceUrl: SRC_RECENT_URL,
  },
  {
    id: "t2-recent-02",
    type: "opinion",
    topic: "tourism",
    prompt:
      "International tourism has brought great benefits to many places. However, there are serious concerns about its impact on the local environment and residents. Do the negative effects of international tourism outweigh the benefits?",
    bandLevel: 8,
    keyVocabulary: [
      "overtourism",
      "carrying capacity",
      "cultural commodification",
      "economic multiplier",
      "carbon-intensive travel",
    ],
    commonMistakes: [
      "Treating all destinations identically.",
      "Generic 'tourism is good' or 'bad' framing.",
    ],
    band9Tips:
      "Compare positive case (low-volume Bhutan, Costa Rica) with negative case (Venice, Barcelona protests).",
    source: SRC_RECENT,
    sourceUrl: SRC_RECENT_URL,
  },
  {
    id: "t2-recent-03",
    type: "discussion",
    topic: "space",
    prompt:
      "Some people believe that using taxpayer funds to look for life on other planets is important. Others, however, think that it is a waste of public money because there are many more important issues requiring funding on our own planet. Discuss both views and give your opinion.",
    bandLevel: 8,
    keyVocabulary: [
      "astrobiology",
      "opportunity cost",
      "blue-sky research",
      "spin-off technology",
      "scientific inspiration",
    ],
    commonMistakes: [
      "Treating space spending as 'wasted in space' — most is spent on Earth.",
      "No real mission as example.",
    ],
    band9Tips:
      "Reference NASA's annual budget (<0.5% of US federal spending) and Mars rover spin-offs.",
    source: SRC_RECENT,
    sourceUrl: SRC_RECENT_URL,
  },
  {
    id: "t2-recent-04",
    type: "discussion",
    topic: "crime",
    prompt:
      "Some people believe that more measures need to be taken to prevent crime, while others believe that crime is now being tackled effectively. Discuss both points of view and give your opinion.",
    bandLevel: 7,
    keyVocabulary: [
      "crime prevention",
      "community policing",
      "CCTV",
      "underreporting",
      "criminological evidence",
    ],
    commonMistakes: [
      "Treating 'crime' as monolithic — burglary trends differ from cybercrime.",
      "Anecdotal evidence over statistics.",
    ],
    band9Tips:
      "Distinguish recorded vs reported vs survey crime; cite Crime Survey for England and Wales.",
    source: SRC_RECENT,
    sourceUrl: SRC_RECENT_URL,
  },
  {
    id: "t2-recent-05",
    type: "opinion",
    topic: "society",
    prompt:
      "Some people think that countries should produce all the food their population needs, rather than importing it from other countries. To what extent do you agree?",
    bandLevel: 8,
    keyVocabulary: [
      "food security",
      "comparative advantage",
      "food miles",
      "import dependency",
      "agricultural self-sufficiency",
    ],
    commonMistakes: [
      "Ignoring climate constraints (you can't grow tropical fruit in northern Europe).",
      "Treating self-sufficiency as obviously good.",
    ],
    band9Tips:
      "Acknowledge strategic-staples logic (cereals) but reject blanket autarky for climate-mismatched goods.",
    source: SRC_RECENT,
    sourceUrl: SRC_RECENT_URL,
  },

  // --- LIFESTYLE / SOCIETY -----------------------------------------------
  {
    id: "t2-soc-01",
    type: "opinion",
    topic: "society",
    prompt:
      "People in the past had more hobbies and interests, which made their lives more interesting compared to people today. To what extent do you agree?",
    bandLevel: 7,
    keyVocabulary: [
      "leisure time",
      "passive consumption",
      "active engagement",
      "screen-mediated entertainment",
      "social atomisation",
    ],
    commonMistakes: [
      "Romanticising the past without evidence.",
      "Treating 'screen time' as automatically passive.",
    ],
    band9Tips:
      "Cite Putnam's 'Bowling Alone' on the long-term decline of associational life in the US.",
    source: SRC_LIZ_2024,
    sourceUrl: SRC_LIZ_2024_URL,
  },
  {
    id: "t2-soc-02",
    type: "problem-solution",
    topic: "society",
    prompt:
      "More and more elderly people are living at home alone with very little social contact. Why is this happening, and what can be done to improve the situation?",
    bandLevel: 7,
    keyVocabulary: [
      "social isolation",
      "loneliness epidemic",
      "ageing population",
      "intergenerational housing",
      "befriending schemes",
    ],
    commonMistakes: [
      "Confusing being alone with being lonely.",
      "Solutions limited to 'visit grandparents more'.",
    ],
    band9Tips:
      "Reference the UK's Loneliness Strategy (2018) and Japan's 'kodokushi' (lonely deaths) crisis.",
    source: SRC_LIZ_2024,
    sourceUrl: SRC_LIZ_2024_URL,
  },

  // --- MONEY / BUSINESS --------------------------------------------------
  {
    id: "t2-money-01",
    type: "discussion",
    topic: "money",
    prompt:
      "Some people think that saving money is the most important thing, while others believe it is better to spend money and enjoy life. Discuss both views and give your opinion.",
    bandLevel: 7,
    keyVocabulary: [
      "deferred gratification",
      "compound interest",
      "discretionary spending",
      "financial resilience",
      "experiential vs material spending",
    ],
    commonMistakes: [
      "Treating saving and spending as fully opposed.",
      "Ignoring the fact that most people must do both.",
    ],
    band9Tips:
      "Mention behavioural-economics research showing experiential purchases produce more durable happiness.",
    source: SRC_LIZ_2024,
    sourceUrl: SRC_LIZ_2024_URL,
  },

  // --- ADDITIONAL REPORTED PROMPTS (2023–2024 archives) -------------------
  {
    id: "t2-edu-extra-01",
    type: "opinion",
    topic: "education",
    prompt:
      "Some people believe that students should be taught practical skills such as money management at school. To what extent do you agree or disagree?",
    bandLevel: 7.5,
    keyVocabulary: [
      "financial literacy",
      "compound interest",
      "budgeting",
      "real-world readiness",
      "core curriculum",
    ],
    commonMistakes: [
      "Vague claims that schools 'teach nothing useful'.",
      "Forgetting to address how this would fit into the existing curriculum.",
    ],
    band9Tips:
      "Concede that academic subjects matter, then argue for an integrated approach (mathematics lessons taught through real-world budgeting examples).",
    source: SRC_RECENT,
    sourceUrl: SRC_RECENT_URL,
  },
  {
    id: "t2-env-extra-01",
    type: "discussion",
    topic: "environment",
    prompt:
      "Some people believe that individual action is the best way to address climate change, while others argue that only government policy can make a real difference. Discuss both views and give your own opinion.",
    bandLevel: 8,
    keyVocabulary: [
      "carbon footprint",
      "systemic change",
      "regulatory frameworks",
      "behavioural shift",
      "free-rider problem",
    ],
    commonMistakes: [
      "Presenting one side as straw man.",
      "Listing actions without acknowledging scale of impact.",
    ],
    band9Tips:
      "Acknowledge that individual action signals demand but argue that legislation (carbon pricing, emissions standards) drives the structural shifts at the scale climate science demands.",
    source: SRC_RECENT,
    sourceUrl: SRC_RECENT_URL,
  },
  {
    id: "t2-tech-extra-01",
    type: "advantages-disadvantages",
    topic: "technology",
    prompt:
      "More and more people are working remotely from home rather than commuting to an office. What are the advantages and disadvantages of this trend?",
    bandLevel: 7.5,
    keyVocabulary: [
      "remote work",
      "asynchronous collaboration",
      "presenteeism",
      "knowledge worker",
      "work-life balance",
    ],
    commonMistakes: [
      "Treating 'flexibility' as the only advantage.",
      "Ignoring industries where remote work is impossible.",
    ],
    band9Tips:
      "Use specific examples (Slack, Zoom, GitHub) and contrast knowledge work with service industries that cannot remote.",
    source: SRC_RECENT,
    sourceUrl: SRC_RECENT_URL,
  },
  {
    id: "t2-society-extra-01",
    type: "problem-solution",
    topic: "society",
    prompt:
      "In many cities the gap between rich and poor has widened in recent years. What problems does this cause, and what solutions can you suggest?",
    bandLevel: 8,
    keyVocabulary: [
      "income inequality",
      "social mobility",
      "progressive taxation",
      "affordable housing",
      "public services",
    ],
    commonMistakes: [
      "Vague reference to 'the gap' without naming concrete metrics.",
      "Listing solutions without explaining the mechanism.",
    ],
    band9Tips:
      "Cite at least one concrete metric (Gini coefficient, ratio of top-decile to bottom-decile income) and propose a policy with the mechanism by which it reduces the gap.",
    source: SRC_RECENT,
    sourceUrl: SRC_RECENT_URL,
  },
  {
    id: "t2-health-extra-01",
    type: "discussion",
    topic: "health",
    prompt:
      "Some people think that governments should focus on reducing healthcare costs by promoting healthier lifestyles, while others believe they should invest more in medical research and treatment. Discuss both views.",
    bandLevel: 7.5,
    keyVocabulary: [
      "preventative medicine",
      "non-communicable diseases",
      "biomedical research",
      "public-health campaigns",
      "lifestyle interventions",
    ],
    commonMistakes: [
      "Treating prevention and treatment as mutually exclusive.",
      "Forgetting demographic differences (ageing populations).",
    ],
    band9Tips:
      "Argue that long-run cost reduction comes from prevention but that ageing populations still require sustained R&D investment.",
    source: SRC_RECENT,
    sourceUrl: SRC_RECENT_URL,
  },
  {
    id: "t2-media-extra-01",
    type: "opinion",
    topic: "media",
    prompt:
      "Social media has had a significant impact on how news is shared and consumed. Do you think this has been mostly positive or mostly negative?",
    bandLevel: 8,
    keyVocabulary: [
      "filter bubble",
      "citizen journalism",
      "misinformation",
      "algorithmic amplification",
      "media literacy",
    ],
    commonMistakes: [
      "Black-and-white framing of social media as good or bad.",
      "Generalising 'young people' without nuance.",
    ],
    band9Tips:
      "Concede genuine benefits (Arab Spring coverage, citizen journalism) before arguing that algorithmic amplification of misinformation outweighs them.",
    source: SRC_RECENT,
    sourceUrl: SRC_RECENT_URL,
  },
  {
    id: "t2-work-extra-01",
    type: "advantages-disadvantages",
    topic: "work",
    prompt:
      "In some countries young people are increasingly choosing to start their own business rather than work for a company. What are the advantages and disadvantages of this trend?",
    bandLevel: 7.5,
    keyVocabulary: [
      "entrepreneurship",
      "venture capital",
      "risk appetite",
      "gig economy",
      "career capital",
    ],
    commonMistakes: [
      "Romanticising entrepreneurship as universally positive.",
      "Ignoring failure rates.",
    ],
    band9Tips:
      "Acknowledge the high failure rate of new ventures and argue that the experience still builds 'career capital' useful in subsequent employed roles.",
    source: SRC_RECENT,
    sourceUrl: SRC_RECENT_URL,
  },
  {
    id: "t2-culture-extra-01",
    type: "discussion",
    topic: "culture",
    prompt:
      "Some people argue that traditional festivals and customs are losing importance in modern society, while others believe they are still relevant. Discuss both views and give your own opinion.",
    bandLevel: 7.5,
    keyVocabulary: [
      "cultural identity",
      "intangible heritage",
      "globalisation",
      "communal ritual",
      "intergenerational transmission",
    ],
    commonMistakes: [
      "Sweeping claims about 'modern life' without examples.",
      "Ignoring evidence of festival revival in some communities.",
    ],
    band9Tips:
      "Reference UNESCO's 2003 Convention for the Safeguarding of Intangible Cultural Heritage as evidence that festivals remain a recognised part of cultural identity.",
    source: SRC_RECENT,
    sourceUrl: SRC_RECENT_URL,
  },
];
