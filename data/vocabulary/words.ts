export interface VocabWord {
  word: string;
  pronunciation: string;
  partOfSpeech: string;
  bandLevel: number;
  topic: string;
  definition: string;
  ieltsDefinition: string;
  exampleIELTS: string;
  collocations: string[];
  synonyms: string[];
  antonyms: string[];
  taskUsage: { task2?: string; speaking?: string };
  commonError?: string;
}

export const VOCAB_WORDS: VocabWord[] = [
  // Society
  {
    word: "proliferate",
    pronunciation: "/prəˈlɪfəreɪt/",
    partOfSpeech: "verb",
    bandLevel: 7.5,
    topic: "society",
    definition: "to increase rapidly in number",
    ieltsDefinition: "rapid, often unchecked growth in society",
    exampleIELTS:
      "Social-media platforms have proliferated at an unprecedented rate over the past decade.",
    collocations: ["rapidly proliferate", "proliferate unchecked", "begin to proliferate"],
    synonyms: ["multiply", "burgeon", "mushroom"],
    antonyms: ["diminish", "dwindle"],
    taskUsage: {
      task2: "Ideal for problem essays discussing rapid growth.",
      speaking: "Use in Part 3 when discussing societal trends.",
    },
    commonError:
      "Don't confuse with 'grow' — proliferate implies rapid AND widespread growth.",
  },
  {
    word: "burgeoning",
    pronunciation: "/ˈbɜː.dʒən.ɪŋ/",
    partOfSpeech: "adjective",
    bandLevel: 8,
    topic: "society",
    definition: "growing or developing rapidly",
    ieltsDefinition: "describes a sector or population in rapid expansion",
    exampleIELTS:
      "The country's burgeoning middle class has reshaped its consumer landscape.",
    collocations: ["burgeoning industry", "burgeoning population", "burgeoning demand"],
    synonyms: ["expanding", "thriving"],
    antonyms: ["shrinking"],
    taskUsage: { task2: "Use to characterise a fast-growing demographic or sector." },
  },
  {
    word: "exacerbate",
    pronunciation: "/ɪɡˈzæs.ə.beɪt/",
    partOfSpeech: "verb",
    bandLevel: 8,
    topic: "society",
    definition: "to make a problem or situation worse",
    ieltsDefinition: "intensifies an existing negative situation",
    exampleIELTS: "Income inequality has been exacerbated by the rapid pace of automation.",
    collocations: ["exacerbate the problem", "exacerbate tensions", "exacerbate the crisis"],
    synonyms: ["aggravate", "worsen", "intensify"],
    antonyms: ["alleviate", "ameliorate"],
    taskUsage: { task2: "Strong verb for problem-solution Task 2 essays." },
  },
  {
    word: "ameliorate",
    pronunciation: "/əˈmiː.li.ə.reɪt/",
    partOfSpeech: "verb",
    bandLevel: 8.5,
    topic: "society",
    definition: "to make something better",
    ieltsDefinition: "to improve a poor or difficult situation",
    exampleIELTS: "Targeted welfare programmes can ameliorate the worst effects of poverty.",
    collocations: ["ameliorate poverty", "ameliorate conditions", "ameliorate the situation"],
    synonyms: ["improve", "alleviate"],
    antonyms: ["exacerbate"],
    taskUsage: { task2: "Use in solution paragraphs as a sophisticated alternative to 'help'." },
  },
  {
    word: "ubiquitous",
    pronunciation: "/juːˈbɪk.wɪ.təs/",
    partOfSpeech: "adjective",
    bandLevel: 8,
    topic: "technology",
    definition: "found everywhere",
    ieltsDefinition: "present at all times in everyday life",
    exampleIELTS: "Smartphones have become ubiquitous, with global ownership exceeding 6 billion.",
    collocations: ["ubiquitous in modern life", "near-ubiquitous", "the ubiquitous presence of"],
    synonyms: ["omnipresent", "pervasive"],
    antonyms: ["scarce", "rare"],
    taskUsage: { task2: "Useful in technology, media, and globalisation essays." },
  },
  {
    word: "preponderance",
    pronunciation: "/prɪˈpɒn.dər.əns/",
    partOfSpeech: "noun",
    bandLevel: 9,
    topic: "society",
    definition: "the larger part or amount",
    ieltsDefinition:
      "expresses that the bulk of evidence or majority points one way",
    exampleIELTS:
      "The preponderance of evidence suggests that early intervention yields the greatest returns.",
    collocations: ["preponderance of evidence", "preponderance of opinion"],
    synonyms: ["majority", "predominance"],
    antonyms: ["minority"],
    taskUsage: { task2: "Power phrase for concluding paragraphs." },
  },
  {
    word: "detrimental",
    pronunciation: "/ˌdet.rɪˈmen.təl/",
    partOfSpeech: "adjective",
    bandLevel: 7.5,
    topic: "health",
    definition: "causing damage or harm",
    ieltsDefinition: "describes a harmful effect on something",
    exampleIELTS:
      "Excessive screen time can be detrimental to children's social development.",
    collocations: ["detrimental effect", "detrimental impact", "detrimental to health"],
    synonyms: ["harmful", "damaging", "deleterious"],
    antonyms: ["beneficial"],
    taskUsage: { task2: "A standard upgrade for 'bad'." },
    commonError: "Often mis-spelled 'detremental' — note the 'i'.",
  },
  {
    word: "advantageous",
    pronunciation: "/ˌæd.vənˈteɪ.dʒəs/",
    partOfSpeech: "adjective",
    bandLevel: 7,
    topic: "general",
    definition: "giving an advantage",
    ieltsDefinition: "describes something that produces benefit",
    exampleIELTS: "Bilingualism has been shown to be advantageous in cognitive ageing.",
    collocations: ["advantageous to", "prove advantageous", "highly advantageous"],
    synonyms: ["beneficial", "favourable"],
    antonyms: ["disadvantageous", "detrimental"],
    taskUsage: { task2: "An upgrade for 'good' in advantage/disadvantage essays." },
  },
  {
    word: "scrutinise",
    pronunciation: "/ˈskruː.tɪ.naɪz/",
    partOfSpeech: "verb",
    bandLevel: 8,
    topic: "media",
    definition: "to examine carefully",
    ieltsDefinition: "implies systematic, often critical inspection",
    exampleIELTS: "Election results are scrutinised by independent observers.",
    collocations: ["closely scrutinise", "scrutinise the data", "publicly scrutinise"],
    synonyms: ["examine", "inspect"],
    antonyms: ["overlook"],
    taskUsage: { task2: "Useful when discussing media and accountability." },
  },
  {
    word: "compelling",
    pronunciation: "/kəmˈpel.ɪŋ/",
    partOfSpeech: "adjective",
    bandLevel: 7.5,
    topic: "general",
    definition: "evoking interest or admiration",
    ieltsDefinition: "describes a forceful or persuasive argument",
    exampleIELTS: "There is a compelling case for investing in renewable infrastructure.",
    collocations: ["compelling argument", "compelling case", "compelling evidence"],
    synonyms: ["persuasive", "convincing"],
    antonyms: ["unconvincing"],
    taskUsage: { task2: "Use to introduce a strong argument." },
  },

  // Education
  {
    word: "pedagogy",
    pronunciation: "/ˈped.ə.ɡɒ.dʒi/",
    partOfSpeech: "noun",
    bandLevel: 8,
    topic: "education",
    definition: "the method and practice of teaching",
    ieltsDefinition: "the underlying theory of how teaching is conducted",
    exampleIELTS:
      "Modern pedagogy emphasises active learning over passive information transfer.",
    collocations: ["progressive pedagogy", "child-centred pedagogy", "evidence-based pedagogy"],
    synonyms: ["teaching method"],
    antonyms: [],
    taskUsage: { task2: "Sophisticated alternative to 'teaching'." },
  },
  {
    word: "rote learning",
    pronunciation: "/rəʊt ˈlɜː.nɪŋ/",
    partOfSpeech: "noun phrase",
    bandLevel: 7,
    topic: "education",
    definition: "memorisation by repetition",
    ieltsDefinition:
      "negative term for memorising without understanding the underlying concept",
    exampleIELTS:
      "Critics argue that rote learning fails to develop higher-order thinking skills.",
    collocations: ["rely on rote learning", "rote-learning culture"],
    synonyms: ["memorisation"],
    antonyms: ["critical thinking", "active learning"],
    taskUsage: { task2: "Helpful in education essays critiquing exam-driven systems." },
  },
  {
    word: "literacy",
    pronunciation: "/ˈlɪt.ər.ə.si/",
    partOfSpeech: "noun",
    bandLevel: 6.5,
    topic: "education",
    definition: "the ability to read and write",
    ieltsDefinition:
      "extends in modern usage to digital, financial, and media literacy",
    exampleIELTS:
      "Improving adult literacy is a prerequisite for inclusive economic growth.",
    collocations: ["adult literacy", "digital literacy", "media literacy"],
    synonyms: ["reading ability"],
    antonyms: ["illiteracy"],
    taskUsage: { task2: "Pair with 'numeracy' for stronger phrasing." },
  },
  {
    word: "rigorous",
    pronunciation: "/ˈrɪɡ.ər.əs/",
    partOfSpeech: "adjective",
    bandLevel: 7.5,
    topic: "education",
    definition: "extremely thorough or accurate",
    ieltsDefinition: "describes high academic or research standards",
    exampleIELTS: "The university is known for its rigorous entrance examination.",
    collocations: ["rigorous standards", "rigorous testing", "academically rigorous"],
    synonyms: ["thorough", "stringent"],
    antonyms: ["lax", "lenient"],
    taskUsage: { task2: "Common upgrade for 'tough' or 'hard' in academic contexts." },
  },

  // Environment
  {
    word: "deforestation",
    pronunciation: "/diːˌfɒr.ɪˈsteɪ.ʃən/",
    partOfSpeech: "noun",
    bandLevel: 7,
    topic: "environment",
    definition: "clearing of forests on a large scale",
    ieltsDefinition:
      "industrial-scale forest loss, often linked with climate change",
    exampleIELTS:
      "Tropical deforestation accounts for an estimated 10% of global carbon emissions.",
    collocations: ["large-scale deforestation", "rampant deforestation"],
    synonyms: ["forest clearance"],
    antonyms: ["reforestation", "afforestation"],
    taskUsage: { task2: "Cornerstone vocabulary for environment essays." },
  },
  {
    word: "renewable",
    pronunciation: "/rɪˈnjuː.ə.bəl/",
    partOfSpeech: "adjective",
    bandLevel: 6.5,
    topic: "environment",
    definition: "capable of being replaced or replenished",
    ieltsDefinition:
      "describes energy sources whose stock is naturally restored",
    exampleIELTS:
      "A transition to renewable energy is widely viewed as essential for decarbonisation.",
    collocations: ["renewable energy", "renewable sources"],
    synonyms: ["sustainable"],
    antonyms: ["non-renewable", "finite"],
    taskUsage: { task2: "Use in any environment essay." },
  },
  {
    word: "biodiversity",
    pronunciation: "/ˌbaɪ.əʊ.daɪˈvɜː.sə.ti/",
    partOfSpeech: "noun",
    bandLevel: 7.5,
    topic: "environment",
    definition: "the variety of life in a particular habitat",
    ieltsDefinition:
      "richness of species in an ecosystem, threatened by human activity",
    exampleIELTS: "The Amazon basin harbours an unparalleled level of biodiversity.",
    collocations: ["biodiversity loss", "rich biodiversity", "biodiversity hotspot"],
    synonyms: ["species variety"],
    antonyms: [],
    taskUsage: { task2: "Pair with 'ecosystem services' for elevated phrasing." },
  },
  {
    word: "mitigate",
    pronunciation: "/ˈmɪt.ɪ.ɡeɪt/",
    partOfSpeech: "verb",
    bandLevel: 8,
    topic: "environment",
    definition: "to lessen the severity of",
    ieltsDefinition:
      "reducing — but not eliminating — the impact of a problem",
    exampleIELTS: "Reforestation can mitigate the worst effects of climate change.",
    collocations: ["mitigate the impact", "mitigate climate change", "mitigate risks"],
    synonyms: ["alleviate", "reduce"],
    antonyms: ["exacerbate"],
    taskUsage: { task2: "A go-to verb for environmental and policy essays." },
  },

  // Technology
  {
    word: "innovation",
    pronunciation: "/ˌɪn.əˈveɪ.ʃən/",
    partOfSpeech: "noun",
    bandLevel: 6.5,
    topic: "technology",
    definition: "introduction of new ideas, methods, or products",
    ieltsDefinition: "core concept in technology and business essays",
    exampleIELTS:
      "Government investment in research drives long-term technological innovation.",
    collocations: ["technological innovation", "drive innovation", "stifle innovation"],
    synonyms: ["invention"],
    antonyms: ["stagnation"],
    taskUsage: { task2: "Versatile noun for tech/economy essays." },
  },
  {
    word: "automation",
    pronunciation: "/ˌɔː.təˈmeɪ.ʃən/",
    partOfSpeech: "noun",
    bandLevel: 7,
    topic: "technology",
    definition: "the use of machines and computers to do work previously done by humans",
    ieltsDefinition: "key term in jobs and AI essays",
    exampleIELTS:
      "Workplace automation has displaced certain manual jobs whilst creating new technical roles.",
    collocations: ["industrial automation", "fear of automation"],
    synonyms: ["mechanisation"],
    antonyms: ["manual labour"],
    taskUsage: { task2: "Pair with 'reskilling' for nuanced argument." },
  },
  {
    word: "digital divide",
    pronunciation: "/ˈdɪdʒ.ɪ.təl dɪˈvaɪd/",
    partOfSpeech: "noun phrase",
    bandLevel: 8,
    topic: "technology",
    definition: "the gap between those who have and don't have access to technology",
    ieltsDefinition:
      "central concept in inequality, education and tech access essays",
    exampleIELTS:
      "The digital divide deepens existing socioeconomic inequalities, particularly in education.",
    collocations: ["narrow the digital divide", "digital divide between rural and urban"],
    synonyms: [],
    antonyms: [],
    taskUsage: { task2: "Strong concept noun for inequality arguments." },
  },

  // Health
  {
    word: "sedentary",
    pronunciation: "/ˈsed.ən.ter.i/",
    partOfSpeech: "adjective",
    bandLevel: 7.5,
    topic: "health",
    definition: "involving much sitting and little physical activity",
    ieltsDefinition: "describes lifestyles that increase chronic-disease risk",
    exampleIELTS:
      "A sedentary lifestyle is now recognised as a major risk factor for cardiovascular disease.",
    collocations: ["sedentary lifestyle", "sedentary occupation"],
    synonyms: ["inactive"],
    antonyms: ["active"],
    taskUsage: { task2: "Standard term for health/lifestyle essays." },
  },
  {
    word: "preventative",
    pronunciation: "/prɪˈven.tə.tɪv/",
    partOfSpeech: "adjective",
    bandLevel: 7.5,
    topic: "health",
    definition: "designed to prevent something",
    ieltsDefinition: "common in healthcare-policy contexts",
    exampleIELTS:
      "Preventative medicine reduces long-term healthcare costs more effectively than treatment alone.",
    collocations: ["preventative care", "preventative measures"],
    synonyms: ["preventive"],
    antonyms: ["reactive"],
    taskUsage: { task2: "Pair with 'curative' for stronger comparisons." },
  },
];

export const VOCAB_TOPICS = [
  "society",
  "education",
  "environment",
  "technology",
  "health",
  "media",
  "general",
];
