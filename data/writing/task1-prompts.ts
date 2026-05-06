export interface Task1Prompt {
  id: string;
  type:
    | "bar-chart"
    | "line-graph"
    | "pie-chart"
    | "table"
    | "map"
    | "process"
    | "mixed";
  prompt: string;
  bandLevel: number;
  // ASCII / SVG-style visual cue (we don't ship images — the prompt textually
  // describes the data the candidate would see)
  dataDescription: string;
  keyVocabulary: string[];
  band9Tips: string;
}

export const TASK1_PROMPTS: Task1Prompt[] = [
  {
    id: "t1-001",
    type: "line-graph",
    prompt:
      "The graph below shows the consumption of three different types of fast food in Britain between 1970 and 1990. Summarise the information by selecting and reporting the main features, and make comparisons where relevant.",
    bandLevel: 7,
    dataDescription:
      "Line chart, three lines: hamburgers (rises from 80g to 500g), fish & chips (falls from 300g to 200g), pizza (rises from 0g to 270g). Y-axis: grams per person per week. X-axis: 1970–1990, 5-year intervals.",
    keyVocabulary: [
      "rose dramatically",
      "fell steadily",
      "increased fivefold",
      "remained the most popular",
      "overtook",
    ],
    band9Tips:
      "Mention the start AND end values plus the most striking change. Avoid listing every data point — pick the 3 most significant.",
  },
  {
    id: "t1-002",
    type: "bar-chart",
    prompt:
      "The chart below shows the percentage of people in different age groups who use social networking sites in five countries in 2023. Summarise the information by selecting and reporting the main features.",
    bandLevel: 7,
    dataDescription:
      "Grouped bar chart, three age bands (18–29, 30–49, 50+) across UK, US, Japan, Brazil, India. Generally older bands have lower usage; Brazil leads in 18–29 (96%); Japan trails in 50+ (28%).",
    keyVocabulary: [
      "marked disparity",
      "by far the highest",
      "negligible difference",
      "considerably lower",
      "an inverse relationship",
    ],
    band9Tips:
      "Identify the country/age band that breaks the pattern. Comparisons in pairs (highest vs lowest, oldest vs youngest) earn highest marks.",
  },
  {
    id: "t1-003",
    type: "pie-chart",
    prompt:
      "The pie charts below show the main reasons why students chose a particular university in 1990 and 2020. Summarise the information by selecting and reporting the main features.",
    bandLevel: 7,
    dataDescription:
      "Two pies: 1990 — Reputation 45%, Course content 30%, Cost 15%, Location 10%. 2020 — Cost 38%, Course content 28%, Reputation 22%, Location 12%.",
    keyVocabulary: [
      "shifted dramatically",
      "overtook",
      "more than doubled",
      "halved",
      "the most striking change",
    ],
    band9Tips:
      "Pair the two charts in the overview — focus on what changed, not what stayed the same.",
  },
  {
    id: "t1-004",
    type: "table",
    prompt:
      "The table below shows the average daily water consumption per person in litres in four different countries in 2010 and 2020. Summarise the information by selecting and reporting the main features.",
    bandLevel: 7,
    dataDescription:
      "Table — USA 380→320, UK 150→120, Brazil 95→110, India 60→70. Trend: developed countries' usage falling; developing countries' rising.",
    keyVocabulary: [
      "halved",
      "rose by",
      "marginal change",
      "narrowed the gap",
      "diverging trends",
    ],
    band9Tips:
      "Group the countries by trend direction in your overview, then give specific figures in the body paragraphs only.",
  },
  {
    id: "t1-005",
    type: "map",
    prompt:
      "The maps below show a town centre in 1985 and now. Summarise the information by selecting and reporting the main features.",
    bandLevel: 7,
    dataDescription:
      "Two town-centre maps. 1985: a market square, two shops, a small library, open green field to the east. Now: market replaced by shopping mall, library expanded into a multi-storey building, the green field is now a car park and bus station.",
    keyVocabulary: [
      "was demolished",
      "has been replaced by",
      "an extensive redevelopment",
      "to the east",
      "now houses",
    ],
    band9Tips:
      "Use 'has been + past participle' (passive present-perfect) consistently for changes; use cardinal directions for clarity.",
  },
  {
    id: "t1-006",
    type: "process",
    prompt:
      "The diagram below shows the process by which bricks are manufactured for the building industry. Summarise the information by selecting and reporting the main features.",
    bandLevel: 8,
    dataDescription:
      "8 stages: 1) clay dug from ground, 2) passed through metal grid to remove large stones, 3) mixed with sand and water, 4) shaped via wire cutter or mould, 5) dried for 24-48 hours, 6) fired in kiln at 1000°C, 7) cooled, 8) packaged on pallets and dispatched.",
    keyVocabulary: [
      "is then transported",
      "subsequently",
      "the next stage involves",
      "once cooled",
      "ready for despatch",
    ],
    band9Tips:
      "Use sequencing markers (initially / subsequently / finally), passive voice, and tense the verbs in present simple.",
  },
  {
    id: "t1-007",
    type: "line-graph",
    prompt:
      "The graph below shows the number of international students enrolled at universities in three countries between 2000 and 2020. Summarise the information.",
    bandLevel: 7,
    dataDescription:
      "Three lines: USA (rises 600k→1.1m), UK (rises 220k→520k), Australia (rises 95k→440k). Australia shows steepest relative growth.",
    keyVocabulary: [
      "saw the steepest growth",
      "almost quadrupled",
      "rose at a faster rate",
      "narrowing the gap",
      "exceeded",
    ],
    band9Tips:
      "Compare absolute vs relative change — Australia's relative growth eclipses the USA's despite smaller absolute numbers.",
  },
  {
    id: "t1-008",
    type: "bar-chart",
    prompt:
      "The bar chart below shows the average monthly spending on entertainment by households of different income levels in 2022. Summarise the information.",
    bandLevel: 7,
    dataDescription:
      "Five bars (income quintiles, lowest to highest): $40, $85, $150, $260, $510. Spending rises non-linearly; top quintile spends ~13× the bottom quintile.",
    keyVocabulary: [
      "an exponential increase",
      "a stark contrast",
      "13 times higher",
      "disproportionate share",
      "scaled with income",
    ],
    band9Tips:
      "Calculate ratios in the overview ('top earners spent 13× as much') — this signals analytical maturity.",
  },
  {
    id: "t1-009",
    type: "pie-chart",
    prompt:
      "The two pie charts below show energy production in a country in 1990 and 2020. Summarise the information by selecting and reporting the main features.",
    bandLevel: 7,
    dataDescription:
      "1990 — Coal 60%, Oil 25%, Gas 10%, Renewables 5%. 2020 — Coal 25%, Oil 15%, Gas 30%, Renewables 30%.",
    keyVocabulary: [
      "underwent a transformation",
      "halved",
      "sextupled",
      "diversification",
      "decarbonisation",
    ],
    band9Tips:
      "Frame the change as a 'pivot' or 'transition'. Group fossil fuels vs renewables in the overview for higher coherence.",
  },
  {
    id: "t1-010",
    type: "table",
    prompt:
      "The table below shows the proportion of male and female workers in five different industries in 2010 and 2020. Summarise the information.",
    bandLevel: 8,
    dataDescription:
      "Industries: tech, healthcare, finance, education, construction. Tech M:F shifted 85:15→72:28. Healthcare 25:75→30:70. Finance 70:30→55:45. Education 30:70→32:68. Construction 95:5→93:7.",
    keyVocabulary: [
      "narrowed",
      "remained heavily male-dominated",
      "approached parity",
      "modest progress",
      "marginal shift",
    ],
    band9Tips:
      "Distinguish industries with substantial change from those that were stagnant — the contrast is the headline insight.",
  },
];

const TYPES: Task1Prompt["type"][] = [
  "bar-chart",
  "line-graph",
  "pie-chart",
  "table",
  "map",
  "process",
];

// Generate variations to reach 50+
let counter = TASK1_PROMPTS.length;
const generators: Array<{ type: Task1Prompt["type"]; subject: string; data: string }> = [
  { type: "bar-chart", subject: "household electricity consumption by appliance category", data: "Bars for fridge, washing machine, lighting, heating, electronics — heating dominates at 42%." },
  { type: "line-graph", subject: "average global temperature anomaly 1900–2020", data: "Line rises gradually until 1970, then accelerates sharply; 2020 anomaly is +1.1°C above 1900 baseline." },
  { type: "pie-chart", subject: "monthly household budget allocation in Germany 2023", data: "Housing 33%, Food 14%, Transport 14%, Leisure 11%, Health 9%, Clothes 5%, Other 14%." },
  { type: "table", subject: "tourist arrivals in five capital cities 2015 vs 2023", data: "Paris 18m→23m, Bangkok 21m→25m, London 19m→22m, New York 13m→16m, Tokyo 12m→17m." },
  { type: "map", subject: "the development of an urban park between 2000 and 2024", data: "Old: open grass, perimeter fence, single entrance. New: paved walking paths, café in NW corner, playground in SE corner, three entrances, native-tree planting throughout." },
  { type: "process", subject: "the lifecycle of a salmon", data: "Egg → alevin → fry → smolt → adult (in ocean) → spawning return upstream → eggs laid → death of adult — 5–8 years total." },
  { type: "bar-chart", subject: "employment rates of recent graduates by field of study", data: "Bars for medicine, engineering, business, arts, humanities — medicine and engineering above 90%; humanities below 70%." },
  { type: "line-graph", subject: "smartphone ownership across age groups 2010–2024", data: "Three lines: 18-29 (40%→98%), 30-49 (25%→95%), 50+ (5%→78%). All converge over time." },
  { type: "pie-chart", subject: "sources of plastic waste in the ocean", data: "Fishing gear 46%, Single-use packaging 26%, Microplastics 17%, Industrial pellets 7%, Other 4%." },
  { type: "table", subject: "average weekly screen time in hours by country 2023", data: "S. Korea 47, USA 42, UK 39, Brazil 41, Germany 33." },
  { type: "map", subject: "campus expansion plans for a university over 10 years", data: "New: science block (north), additional residence halls (east), expanded library, removed staff car park, added bike lanes throughout." },
  { type: "process", subject: "the manufacturing of chocolate from cocoa bean to bar", data: "Pods harvested → beans fermented → dried → roasted → winnowed → ground into liquor → conched → tempered → moulded → packaged." },
  { type: "bar-chart", subject: "monthly book sales by genre across Q1, Q2, Q3, Q4 2022", data: "Fiction dominates Q4 (gift season). Non-fiction peaks in Q1 (New Year). Children's books peak in Q3 (back-to-school)." },
  { type: "line-graph", subject: "average house prices in three regions 2005–2024", data: "Capital region: 2005 £200k → 2024 £580k. Northern: £100k → £180k. Coastal: £130k → £290k." },
  { type: "pie-chart", subject: "reasons given for moving abroad in a 2023 survey", data: "Work 38%, Study 22%, Family 18%, Quality of life 15%, Climate 7%." },
  { type: "table", subject: "literacy rates among adults across five regions 1990 vs 2020", data: "South Asia 47%→74%. Sub-Saharan Africa 53%→67%. East Asia 80%→97%. Latin America 85%→95%. North America 99%→99%." },
  { type: "map", subject: "redevelopment of a coastal area for tourism", data: "Old: jetty, fishing huts, narrow road. New: marina, hotel complex, paved promenade, restaurants, dual-carriageway approach road." },
  { type: "process", subject: "the recycling process for aluminium cans", data: "Collection → sorting → shredding → de-coating → melting → casting into ingots → rolling into sheets → manufacture of new cans." },
  { type: "bar-chart", subject: "average daily fruit and vegetable consumption by age group", data: "Younger groups consume the least (~250g); 50+ groups exceed the WHO 400g target." },
  { type: "line-graph", subject: "renewable-energy share of total power 1990–2024 in four countries", data: "Norway 95%→99%, Germany 4%→52%, China 18%→32%, USA 11%→23%." },
  { type: "pie-chart", subject: "global carbon emissions by sector 2022", data: "Energy 73%, Agriculture 11%, Industrial processes 6%, Land use change 6%, Waste 4%." },
  { type: "table", subject: "average broadband speeds in five cities 2018 vs 2024", data: "Singapore 200→520 Mbps, Seoul 180→480, Stockholm 110→370, NYC 95→290, Cairo 25→90." },
  { type: "map", subject: "transformation of a hospital site between 1995 and now", data: "Old: 3 small wards, surface car park, walled garden. New: 6-storey wing, multi-storey car park, helipad, walled garden retained." },
  { type: "process", subject: "how rainwater becomes drinking water in a treatment plant", data: "Reservoir → screen → coagulation → flocculation → sedimentation → filtration → chlorination → distribution." },
  { type: "bar-chart", subject: "average annual book reading by age group in 2023", data: "Children 24, Teens 14, 20s 11, 30-40s 9, 50+ 18." },
  { type: "line-graph", subject: "passenger numbers at three airports 2010-2024", data: "Heathrow 65m→79m, Dubai 47m→92m, Atlanta 92m→101m." },
  { type: "pie-chart", subject: "ownership of pets in a 2024 survey", data: "Dogs 33%, Cats 27%, Fish 14%, Birds 7%, Reptiles 4%, None 15%." },
  { type: "table", subject: "average commute times in five cities 2010 vs 2024", data: "Mexico City 65→78 mins, Mumbai 60→75, Tokyo 47→44, London 53→58, Madrid 39→36." },
  { type: "map", subject: "village layout in 1900 and 2020", data: "Old: church, mill, three farms, narrow lane. New: housing estate, primary school, supermarket, expanded road, mill converted to museum." },
  { type: "process", subject: "the wine-making process from grape to bottle", data: "Harvest → crushing → fermentation → ageing in oak → racking → blending → fining → bottling → cellaring." },
  { type: "bar-chart", subject: "energy efficiency ratings of new homes by region", data: "Bars for five regions; northern regions average B-rated; southern regions average A-rated due to subsidy programmes." },
  { type: "line-graph", subject: "obesity rates in five countries 1990–2020", data: "USA 20%→42%, UK 14%→28%, Mexico 18%→36%, Japan 3%→4%, S. Korea 5%→6%." },
  { type: "pie-chart", subject: "first-language speakers worldwide 2023", data: "Mandarin 14%, Spanish 6%, English 5%, Hindi 5%, Arabic 4%, Other 66%." },
  { type: "table", subject: "average household saving rate as % of income 2010 vs 2024", data: "Germany 11→12, France 16→17, USA 6→4, UK 7→8, Japan 6→8." },
  { type: "map", subject: "redesigned high-school campus", data: "Old: linear corridors, single sports hall. New: courtyard layout, two sports halls, dedicated science wing, central courtyard for outdoor learning." },
  { type: "process", subject: "the process of glass recycling", data: "Collection → colour-sorting → cleaning → crushing into cullet → melting at 1500°C → moulding into new bottles → cooling → distribution." },
  { type: "bar-chart", subject: "weekly hours of physical activity by age group", data: "Children 14h, Teens 9h, 20s 6h, 30-40s 4h, 50+ 5h." },
  { type: "line-graph", subject: "annual cinema admissions per capita 2000–2024 in three countries", data: "USA 5.6→3.1, UK 2.9→2.1, India 4.4→2.8." },
  { type: "pie-chart", subject: "household waste composition in a major city", data: "Food 35%, Paper 22%, Plastic 14%, Metal 8%, Glass 7%, Other 14%." },
  { type: "table", subject: "tourist nights spent in five regions 2015 vs 2023", data: "Mediterranean 380m→420m, Caribbean 95m→112m, S.E. Asia 160m→210m, Northern Europe 240m→260m, S. America 140m→160m." },
];

for (const g of generators) {
  counter++;
  TASK1_PROMPTS.push({
    id: `t1-${String(counter).padStart(3, "0")}`,
    type: g.type,
    prompt: `The diagram below shows ${g.subject}. Summarise the information by selecting and reporting the main features, and make comparisons where relevant.`,
    bandLevel: 7,
    dataDescription: g.data,
    keyVocabulary: [
      "rose markedly",
      "fell sharply",
      "remained stable",
      "overtook",
      "the most striking feature",
    ],
    band9Tips:
      "Frame the overview around the 2 most significant features only — no specific data in the overview paragraph.",
  });
}
