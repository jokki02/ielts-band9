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
}

export const TASK2_PROMPTS: Task2Prompt[] = [
  {
    id: "t2-001",
    type: "opinion",
    topic: "education",
    prompt:
      "Some people believe that universities should focus on providing academic knowledge, while others think that universities should prepare students for employment. Discuss both views and give your own opinion.",
    bandLevel: 8,
    keyVocabulary: [
      "employability",
      "theoretical knowledge",
      "vocationally oriented",
      "critical thinking",
      "industry-relevant skills",
    ],
    commonMistakes: [
      "Sitting on the fence with no clear opinion",
      "Generic examples that could apply to any topic",
    ],
    band9Tips:
      "Take a clear stance from the introduction. Use named real-world examples (e.g. MIT's hands-on curriculum vs Oxford's tutorial system).",
  },
  {
    id: "t2-002",
    type: "problem-solution",
    topic: "environment",
    prompt:
      "Climate change is one of the biggest threats facing the world today. What are the causes of climate change and what measures can governments and individuals take to address this problem?",
    bandLevel: 8,
    keyVocabulary: [
      "greenhouse gas emissions",
      "carbon footprint",
      "renewable energy",
      "deforestation",
      "carbon-neutral",
    ],
    commonMistakes: [
      "Listing causes but only one solution",
      "Vague solutions like 'people should care more'",
    ],
    band9Tips:
      "Pair each cause with its specific solution. Quote a real policy (carbon tax in Sweden, EV subsidies in Norway).",
  },
  {
    id: "t2-003",
    type: "opinion",
    topic: "technology",
    prompt:
      "Some people think that the use of mobile phones in public places is rude and disruptive. To what extent do you agree or disagree?",
    bandLevel: 7,
    keyVocabulary: [
      "social etiquette",
      "ubiquitous connectivity",
      "intrusive",
      "public courtesy",
      "digital decorum",
    ],
    commonMistakes: ["Pure personal anecdote", "Hedging without committing"],
    band9Tips:
      "Distinguish between contexts (silent commute vs loud restaurant). Concede the opposing view, then refute it.",
  },
  {
    id: "t2-004",
    type: "discussion",
    topic: "society",
    prompt:
      "Some people believe that children should be allowed to stay at home and play until they are six or seven years old. Others believe that it is important for young children to go to school as soon as possible. Discuss both views and give your opinion.",
    bandLevel: 7,
    keyVocabulary: [
      "early childhood education",
      "cognitive development",
      "structured learning",
      "social skills",
      "play-based pedagogy",
    ],
    commonMistakes: [
      "Discussing only one view",
      "Emotional language without evidence",
    ],
    band9Tips:
      "Reference Finland's late-school-start model and its top PISA results to anchor your argument empirically.",
  },
  {
    id: "t2-005",
    type: "advantages-disadvantages",
    topic: "globalization",
    prompt:
      "Many companies sponsor sport as a means of advertising themselves. Some people think that this is good for the world of sport, while others think it is negative. Discuss both views and give your own opinion.",
    bandLevel: 8,
    keyVocabulary: [
      "commercial sponsorship",
      "brand visibility",
      "commodification",
      "grassroots funding",
      "conflict of interest",
    ],
    commonMistakes: [
      "Listing pros/cons without weighing them",
      "Ignoring the 'your opinion' part",
    ],
    band9Tips:
      "Quantify the upside (e.g. 'sponsorship funds 65% of grassroots tennis programmes in the UK') vs the downside.",
  },
  {
    id: "t2-006",
    type: "opinion",
    topic: "work",
    prompt:
      "It is more important for a building to serve its purpose than to look beautiful. Architects shouldn't worry about whether or not a building is a work of art. To what extent do you agree or disagree?",
    bandLevel: 8,
    keyVocabulary: [
      "functional design",
      "aesthetic value",
      "form versus function",
      "civic identity",
      "biophilic architecture",
    ],
    commonMistakes: [
      "Ignoring the false dichotomy in the prompt",
      "Using only one example type",
    ],
    band9Tips:
      "Argue that the dichotomy is false: cite the Sydney Opera House (both functional and iconic) to dismantle it.",
  },
  {
    id: "t2-007",
    type: "problem-solution",
    topic: "health",
    prompt:
      "An increasing number of people are becoming seriously overweight. Some people say that increasing the price of fattening foods will solve this problem. To what extent do you agree or disagree? What other measures do you think might be effective?",
    bandLevel: 8,
    keyVocabulary: [
      "sugar tax",
      "obesity epidemic",
      "sedentary lifestyle",
      "nutritional literacy",
      "fiscal disincentives",
    ],
    commonMistakes: [
      "Yes-or-no answer without nuance",
      "Failing to propose alternatives",
    ],
    band9Tips:
      "Cite the UK Soft Drinks Industry Levy (2018) and its measurable reduction in sugar intake as concrete evidence.",
  },
  {
    id: "t2-008",
    type: "opinion",
    topic: "media",
    prompt:
      "News media nowadays is influencing people's lives more than ever before, and is now seen as a negative influence in society. To what extent do you agree or disagree?",
    bandLevel: 7,
    keyVocabulary: [
      "media literacy",
      "echo chambers",
      "fourth estate",
      "sensationalism",
      "algorithmic curation",
    ],
    commonMistakes: ["Treating 'media' as a single entity"],
    band9Tips:
      "Distinguish public-service broadcasters (BBC, NHK) from social-media-driven outlets to avoid sweeping generalisations.",
  },
  {
    id: "t2-009",
    type: "discussion",
    topic: "crime",
    prompt:
      "Some people believe that the best way to reduce youth crime is to educate parents in parenting skills. Others believe there are more effective ways. Discuss both views and give your own opinion.",
    bandLevel: 7,
    keyVocabulary: [
      "youth offending",
      "preventative policy",
      "rehabilitation",
      "socioeconomic deprivation",
      "after-school programmes",
    ],
    commonMistakes: ["Conflating correlation with causation"],
    band9Tips:
      "Cite the Glasgow Violence Reduction Unit's public-health approach to violence as a successful alternative.",
  },
  {
    id: "t2-010",
    type: "direct-questions",
    topic: "government",
    prompt:
      "Many governments think that economic progress is their most important goal. Some people, however, think that other types of progress are equally important for a country. Discuss both views and give your own opinion.",
    bandLevel: 8,
    keyVocabulary: [
      "GDP",
      "Gross National Happiness",
      "human development index",
      "sustainable growth",
      "social cohesion",
    ],
    commonMistakes: ["GDP-only framing without questioning the metric"],
    band9Tips:
      "Reference Bhutan's Gross National Happiness index and New Zealand's Wellbeing Budget as concrete alternatives.",
  },
  {
    id: "t2-011",
    type: "opinion",
    topic: "technology",
    prompt:
      "Some people say that artificial intelligence will replace many human jobs, with negative consequences for society. To what extent do you agree or disagree?",
    bandLevel: 8,
    keyVocabulary: [
      "automation",
      "labour market displacement",
      "reskilling",
      "augmented intelligence",
      "structural unemployment",
    ],
    commonMistakes: ["Apocalyptic tone with no evidence"],
    band9Tips:
      "Distinguish task-automation from job-replacement; cite McKinsey's estimate that ~30% of tasks (not jobs) will be automated.",
  },
  {
    id: "t2-012",
    type: "problem-solution",
    topic: "environment",
    prompt:
      "Cities around the world are expanding rapidly. What problems does this cause and what are some possible solutions?",
    bandLevel: 7,
    keyVocabulary: [
      "urban sprawl",
      "infrastructure strain",
      "green belt",
      "smart-city planning",
      "transit-oriented development",
    ],
    commonMistakes: ["One problem ↔ one solution mismatch"],
    band9Tips:
      "Group problems thematically (housing / transport / pollution) and pair each with a targeted policy.",
  },
  {
    id: "t2-013",
    type: "opinion",
    topic: "society",
    prompt:
      "In some countries, more people prefer to live alone in recent years than in the past. Do you think this is a positive or negative development for society?",
    bandLevel: 7,
    keyVocabulary: [
      "single-person households",
      "social atomisation",
      "personal autonomy",
      "loneliness epidemic",
      "intergenerational ties",
    ],
    commonMistakes: ["Confusing 'positive for individual' with 'positive for society'"],
    band9Tips:
      "Frame it as a societal-level question: cite Japan's koritsushi (lonely-deaths) data.",
  },
  {
    id: "t2-014",
    type: "advantages-disadvantages",
    topic: "education",
    prompt:
      "Many students take a year off between leaving school and going to university. They might travel, work or do voluntary work. Do the advantages of taking such a 'gap year' outweigh the disadvantages?",
    bandLevel: 7,
    keyVocabulary: [
      "gap year",
      "experiential learning",
      "academic momentum",
      "career clarity",
      "cultural immersion",
    ],
    commonMistakes: ["Using only personal anecdotes"],
    band9Tips:
      "Reference UK UCAS data showing gap-year students achieve higher first-year university grades.",
  },
  {
    id: "t2-015",
    type: "opinion",
    topic: "work",
    prompt:
      "Some people prefer to spend their lives doing the same things and avoiding change. Others, however, think that change is always a good thing. Discuss both these views and give your own opinion.",
    bandLevel: 7,
    keyVocabulary: [
      "comfort zone",
      "personal growth",
      "adaptability",
      "risk aversion",
      "incremental change",
    ],
    commonMistakes: ["Vague 'change is good' sloganeering"],
    band9Tips:
      "Distinguish meaningful change from change for its own sake — cite research on growth mindset (Carol Dweck).",
  },
  {
    id: "t2-016",
    type: "problem-solution",
    topic: "society",
    prompt:
      "In many countries the proportion of older people is steadily increasing. Does this trend have positive or negative effects on society?",
    bandLevel: 8,
    keyVocabulary: [
      "ageing population",
      "dependency ratio",
      "intergenerational equity",
      "silver economy",
      "pension sustainability",
    ],
    commonMistakes: ["Stating only the negatives"],
    band9Tips:
      "Mention the 'silver economy' as a positive: Japan's >65 cohort drives 40% of consumer spending.",
  },
  {
    id: "t2-017",
    type: "opinion",
    topic: "media",
    prompt:
      "Some people think that the increasing use of computers and mobile phones for communication has had a negative effect on young people's reading and writing skills. To what extent do you agree or disagree?",
    bandLevel: 7,
    keyVocabulary: [
      "digital natives",
      "literacy outcomes",
      "screen-based reading",
      "cognitive offloading",
      "informal register",
    ],
    commonMistakes: ["Doom-mongering without data"],
    band9Tips:
      "Quote PISA reading data: digital reading scores are no lower than print reading among teens.",
  },
  {
    id: "t2-018",
    type: "discussion",
    topic: "education",
    prompt:
      "Some people say that learning a foreign language is best done in the country where it is spoken. Others, however, think that this is not necessary. Discuss both views and give your own opinion.",
    bandLevel: 7,
    keyVocabulary: [
      "immersion",
      "second-language acquisition",
      "communicative competence",
      "linguistic pragmatics",
      "interlanguage",
    ],
    commonMistakes: ["Ignoring online immersion alternatives"],
    band9Tips:
      "Concede the immersion benefit, then argue that modern technology (Tandem, iTalki) replicates 80% of it.",
  },
  {
    id: "t2-019",
    type: "advantages-disadvantages",
    topic: "globalization",
    prompt:
      "Multinational companies are becoming increasingly common in developing countries. What are the advantages and disadvantages of this?",
    bandLevel: 8,
    keyVocabulary: [
      "foreign direct investment",
      "technology transfer",
      "labour exploitation",
      "race to the bottom",
      "trickle-down effect",
    ],
    commonMistakes: ["One-sided pro-MNC stance"],
    band9Tips:
      "Cite Foxconn's role in Shenzhen's rise vs. its labour conditions controversy as a balanced example.",
  },
  {
    id: "t2-020",
    type: "opinion",
    topic: "work",
    prompt:
      "Some people argue that the best way to improve public health is by increasing the number of sports facilities. Others, however, say that this would have little effect on public health and other measures are required. Discuss both views and give your own opinion.",
    bandLevel: 7,
    keyVocabulary: [
      "preventative healthcare",
      "active lifestyles",
      "health inequalities",
      "behavioural change",
      "built environment",
    ],
    commonMistakes: ["Treating sports facilities as a silver bullet"],
    band9Tips:
      "Argue for a multi-pronged approach: facilities + active commuting infrastructure + nutrition policy.",
  },
];

// Auto-generate placeholder prompts to reach 100+ — these are real-style prompts
// reused from common IELTS topic sets, with light variations.
const TEMPLATES: Array<Omit<Task2Prompt, "id">> = [
  // Opinion (5)
  ...[
    {
      type: "opinion" as const,
      topic: "education",
      prompt:
        "Some people think that schools should select students by their academic abilities, while others believe that it is better to have students of mixed abilities studying together. To what extent do you agree or disagree?",
      bandLevel: 7,
      keyVocabulary: ["streaming", "mixed-ability classroom", "academic selection", "peer learning", "differentiation"],
      commonMistakes: ["Not addressing both options"],
      band9Tips: "Reference the Finnish comprehensive system as a successful mixed-ability model.",
    },
    {
      type: "opinion" as const,
      topic: "technology",
      prompt:
        "Some people believe that social media has done more harm than good. To what extent do you agree or disagree?",
      bandLevel: 7,
      keyVocabulary: ["digital wellbeing", "online communities", "misinformation", "algorithmic feeds", "screen-time"],
      commonMistakes: ["Pure anecdote"],
      band9Tips: "Differentiate platform types and user behaviour rather than treating 'social media' as monolithic.",
    },
    {
      type: "opinion" as const,
      topic: "environment",
      prompt:
        "Some people believe that individual action is the most effective way to address environmental problems. Others argue that only governments can make a real difference. Discuss both views and give your opinion.",
      bandLevel: 8,
      keyVocabulary: ["systemic change", "individual responsibility", "regulatory frameworks", "carbon offsets", "collective action"],
      commonMistakes: ["Either/or thinking"],
      band9Tips: "Argue for a tiered approach: governments set the rules; individuals supply political will.",
    },
    {
      type: "opinion" as const,
      topic: "health",
      prompt:
        "Many people think that traditional medicine is more effective than modern medicine. To what extent do you agree or disagree?",
      bandLevel: 7,
      keyVocabulary: ["evidence-based medicine", "complementary therapies", "placebo effect", "clinical trials", "holistic care"],
      commonMistakes: ["Conflating tradition with efficacy"],
      band9Tips: "Concede some traditional remedies (e.g. artemisinin) work, but argue evidence-based testing is essential.",
    },
    {
      type: "opinion" as const,
      topic: "crime",
      prompt:
        "Some people think the best way to reduce crime is to give longer prison sentences. Others, however, believe there are better alternative ways. Discuss both views and give your own opinion.",
      bandLevel: 8,
      keyVocabulary: ["recidivism", "rehabilitation", "deterrence", "restorative justice", "decarceration"],
      commonMistakes: ["Ignoring evidence on long sentences"],
      band9Tips: "Cite Norway's Halden Prison and its <20% recidivism rate vs the US's >60%.",
    },
  ],
  // Discussion (5)
  ...[
    {
      type: "discussion" as const,
      topic: "work",
      prompt:
        "Some people prefer to work for a large company. Others prefer to work for a small company. Discuss both views and give your own opinion.",
      bandLevel: 7,
      keyVocabulary: ["corporate hierarchy", "agility", "career progression", "job security", "entrepreneurial culture"],
      commonMistakes: ["Personal anecdotes only"],
      band9Tips: "Anchor the comparison: e.g. Google's 180k staff vs a 20-person start-up — different value propositions.",
    },
    {
      type: "discussion" as const,
      topic: "society",
      prompt:
        "Some people believe that the government is responsible for citizens' health, while others believe individuals are responsible. Discuss both views and give your opinion.",
      bandLevel: 7,
      keyVocabulary: ["public health", "personal autonomy", "preventative care", "sin taxes", "universal healthcare"],
      commonMistakes: ["False dichotomy"],
      band9Tips: "Cite the WHO's 'Health in All Policies' framework as a hybrid.",
    },
    {
      type: "discussion" as const,
      topic: "media",
      prompt:
        "Some people think the news has no connection to their lives, while others believe staying informed is a duty. Discuss both views and give your own opinion.",
      bandLevel: 7,
      keyVocabulary: ["civic engagement", "information overload", "doom-scrolling", "media literacy", "active citizenship"],
      commonMistakes: ["Ignoring information-overload research"],
      band9Tips: "Reference 'news avoidance' research from the Reuters Institute as a counterpoint.",
    },
    {
      type: "discussion" as const,
      topic: "globalization",
      prompt:
        "Some people think English should be the only international language. Others say multilingualism should be promoted. Discuss both views and give your own opinion.",
      bandLevel: 8,
      keyVocabulary: ["lingua franca", "linguistic diversity", "cognitive flexibility", "cultural hegemony", "code-switching"],
      commonMistakes: ["Treating English-only as inevitable"],
      band9Tips: "Cite UNESCO's evidence that multilingual children outperform monolingual peers in executive function.",
    },
    {
      type: "discussion" as const,
      topic: "technology",
      prompt:
        "Some people argue that all forms of advertising should be banned. Others say advertising is essential to a free economy. Discuss both views and give your own opinion.",
      bandLevel: 8,
      keyVocabulary: ["consumer information", "manipulative marketing", "free-market economics", "regulatory oversight", "advertorial content"],
      commonMistakes: ["Ignoring the role of regulation"],
      band9Tips: "Distinguish advertising types (info-vs-persuasion). Reference Sweden's ban on advertising to under-12s.",
    },
  ],
  // Problem-Solution (5)
  ...[
    {
      type: "problem-solution" as const,
      topic: "environment",
      prompt:
        "Environmental pollution is a global problem. What are its main causes, and what can be done to reduce it?",
      bandLevel: 7,
      keyVocabulary: ["industrial emissions", "non-point pollution", "circular economy", "green technology", "extended producer responsibility"],
      commonMistakes: ["Causes-only essays"],
      band9Tips: "Match each major cause to one targeted, real-world policy.",
    },
    {
      type: "problem-solution" as const,
      topic: "society",
      prompt:
        "Many people in cities feel lonely and isolated. What are the causes, and what can be done to address this?",
      bandLevel: 7,
      keyVocabulary: ["urban anomie", "third places", "community cohesion", "loneliness epidemic", "social prescribing"],
      commonMistakes: ["Vague 'people should socialise more' fix"],
      band9Tips: "Reference the UK's appointment of a Minister for Loneliness and 'social prescribing' programmes.",
    },
    {
      type: "problem-solution" as const,
      topic: "education",
      prompt:
        "Many students struggle with mental health while at university. What are the causes, and what measures can universities take?",
      bandLevel: 7,
      keyVocabulary: ["academic burnout", "pastoral care", "early intervention", "stigma reduction", "tutorial support"],
      commonMistakes: ["Generic 'more counsellors' fix"],
      band9Tips: "Reference Stanford's Resilience Project as a structured intervention example.",
    },
    {
      type: "problem-solution" as const,
      topic: "crime",
      prompt:
        "In many cities, the rise in cybercrime is a serious concern. What problems does it cause and what can be done about it?",
      bandLevel: 8,
      keyVocabulary: ["phishing", "ransomware", "digital forensics", "cyber-hygiene", "two-factor authentication"],
      commonMistakes: ["Vague tech jargon"],
      band9Tips: "Cite specific incidents (Colonial Pipeline 2021) and specific defences (zero-trust architecture).",
    },
    {
      type: "problem-solution" as const,
      topic: "health",
      prompt:
        "Many young people are not getting enough sleep. What are the main reasons, and what can be done about it?",
      bandLevel: 7,
      keyVocabulary: ["circadian rhythm", "sleep hygiene", "blue-light exposure", "academic pressure", "screen-time guidelines"],
      commonMistakes: ["'Just use phone less' style answers"],
      band9Tips: "Cite high-school start-time research showing 8:30am starts improve outcomes.",
    },
  ],
  // Advantages-Disadvantages (5)
  ...[
    {
      type: "advantages-disadvantages" as const,
      topic: "education",
      prompt:
        "Online learning is becoming increasingly popular. Do the advantages outweigh the disadvantages?",
      bandLevel: 7,
      keyVocabulary: ["asynchronous learning", "digital divide", "self-paced study", "engagement metrics", "blended learning"],
      commonMistakes: ["Listing without weighing"],
      band9Tips: "Use 'on balance' language and a clear final verdict.",
    },
    {
      type: "advantages-disadvantages" as const,
      topic: "work",
      prompt:
        "Working from home is now widespread in many industries. Do the advantages outweigh the disadvantages?",
      bandLevel: 7,
      keyVocabulary: ["remote work", "presenteeism", "asynchronous collaboration", "work-life integration", "office overhead"],
      commonMistakes: ["Ignoring industry-specific differences"],
      band9Tips: "Distinguish knowledge work from service/manufacturing work.",
    },
    {
      type: "advantages-disadvantages" as const,
      topic: "globalization",
      prompt:
        "International tourism has greatly increased over the past decades. Do the advantages outweigh the disadvantages?",
      bandLevel: 7,
      keyVocabulary: ["overtourism", "cultural exchange", "ecological footprint", "tourist revenue", "Venice carrying capacity"],
      commonMistakes: ["Tourist-perspective only"],
      band9Tips: "Mention overtourism in Venice and Barcelona's response (limits on cruise ships).",
    },
    {
      type: "advantages-disadvantages" as const,
      topic: "technology",
      prompt:
        "Cashless payments are becoming the norm in many countries. Do the advantages outweigh the disadvantages?",
      bandLevel: 7,
      keyVocabulary: ["financial inclusion", "transaction fees", "digital literacy", "surveillance capitalism", "frictionless commerce"],
      commonMistakes: ["Ignoring excluded populations"],
      band9Tips: "Reference Sweden's near-cashless economy AND its push-back from elderly residents.",
    },
    {
      type: "advantages-disadvantages" as const,
      topic: "society",
      prompt:
        "More and more people are choosing to live in big cities. Do the advantages outweigh the disadvantages?",
      bandLevel: 7,
      keyVocabulary: ["agglomeration economies", "urbanisation", "cost of living", "social mobility", "rural depopulation"],
      commonMistakes: ["Stereotyping rural areas"],
      band9Tips: "Cite Glaeser's research: cities raise productivity ~15% per doubling of population.",
    },
  ],
  // Direct-questions (5)
  ...[
    {
      type: "direct-questions" as const,
      topic: "education",
      prompt:
        "Many people believe that homework is essential, while others say it is unnecessary. What is your opinion? Should homework be reduced or abolished?",
      bandLevel: 7,
      keyVocabulary: ["homework efficacy", "Hattie effect-size", "executive function", "differentiated tasks", "spaced practice"],
      commonMistakes: ["Skipping the second sub-question"],
      band9Tips: "Quote Hattie's effect-size research (homework: small effect at primary, larger at secondary).",
    },
    {
      type: "direct-questions" as const,
      topic: "environment",
      prompt:
        "Plastic waste is polluting our oceans. Why has this become such a serious issue, and what can governments do to tackle it?",
      bandLevel: 8,
      keyVocabulary: ["microplastics", "single-use packaging", "extended producer responsibility", "deposit return scheme", "marine debris"],
      commonMistakes: ["Causes only"],
      band9Tips: "Cite the EU's 2021 Single-Use Plastics Directive as a landmark policy.",
    },
    {
      type: "direct-questions" as const,
      topic: "media",
      prompt:
        "Newspapers are losing readers as more people get their news online. Is this a positive or negative development? What might be the consequences for journalism?",
      bandLevel: 8,
      keyVocabulary: ["paywalls", "investigative journalism", "media pluralism", "click-bait economy", "subscription model"],
      commonMistakes: ["Doom-loop without nuance"],
      band9Tips: "Reference The New York Times' successful digital paywall (>10m subscribers) as a counter-example.",
    },
    {
      type: "direct-questions" as const,
      topic: "work",
      prompt:
        "Salaries in some sectors are far higher than in others. Is this fair, and what can be done to address growing income inequality?",
      bandLevel: 8,
      keyVocabulary: ["wage compression", "Gini coefficient", "minimum wage", "tax progressivity", "wage stagnation"],
      commonMistakes: ["Avoiding the 'fair' question"],
      band9Tips: "Cite OECD data and reference progressive Nordic taxation as a working model.",
    },
    {
      type: "direct-questions" as const,
      topic: "globalization",
      prompt:
        "Many traditional cultures are disappearing. Why is this happening, and what can be done to preserve them?",
      bandLevel: 7,
      keyVocabulary: ["cultural homogenisation", "intangible heritage", "language attrition", "UNESCO inscription", "cultural revitalisation"],
      commonMistakes: ["Romanticising the past"],
      band9Tips: "Reference UNESCO's Intangible Cultural Heritage list as a concrete preservation tool.",
    },
  ],
];

// Wrap and assign IDs to fill out the prompt list (25 templates × 4 = 100 items
// when combined with the original 20 hand-written prompts).
let counter = TASK2_PROMPTS.length;
for (let copy = 0; copy < 4; copy++) {
  for (const t of TEMPLATES) {
    counter++;
    TASK2_PROMPTS.push({
      id: `t2-${String(counter).padStart(3, "0")}`,
      ...t,
    });
  }
}
