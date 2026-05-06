// IELTS Writing Task 1 (Academic) prompts.
//
// Sources:
// - "IELTS Updates and Recent Exams" — student-shared reported exam tasks from
//   real IELTS sittings around the world (https://www.ieltsupdatesandrecentexams.com/).
//   Exam-question wording is a factual record and not copyrightable; we still
//   credit the curator who collected each report.
// - IELTS Liz public sample tasks (https://ieltsliz.com/) — additional widely
//   circulated practice items.
//
// `dataDescription` is our own concise textual sketch of the chart/map so the
// learner has something to work with even without the original artwork.

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
  /** Plain-English description of the visual the prompt refers to. */
  dataDescription: string;
  keyVocabulary: string[];
  band9Tips: string;
  /** Where the prompt was originally reported. */
  source?: string;
  sourceUrl?: string;
}

const SRC_RECENT = "IELTS Updates and Recent Exams";
const SRC_RECENT_URL = "https://www.ieltsupdatesandrecentexams.com/";
const SRC_LIZ = "IELTS Liz — sample Task 1";
const SRC_LIZ_URL = "https://ieltsliz.com/";

export const TASK1_PROMPTS: Task1Prompt[] = [
  // --- REAL REPORTED EXAM PROMPTS (Sept-Nov 2024) ------------------------
  {
    id: "t1-2024-09-au",
    type: "bar-chart",
    prompt:
      "The bar chart below illustrates the proportion of households in owned and rented housing in Sydney and Perth between 1980 and 2016. Summarise the information by selecting and reporting the main features, and make comparisons where relevant.",
    bandLevel: 7,
    dataDescription:
      "Grouped bars: Sydney owned vs rented and Perth owned vs rented across 1980, 1990, 2000, 2010, 2016. Both cities show ownership falling and renting rising, with Sydney's shift sharper.",
    keyVocabulary: [
      "home-ownership rate",
      "rental tenancy",
      "diverging trend",
      "by far the largest",
      "narrowed the gap",
    ],
    band9Tips:
      "Group the four series into two pairs (cities) and treat ownership decline as the headline feature.",
    source: SRC_RECENT,
    sourceUrl: SRC_RECENT_URL,
  },
  {
    id: "t1-2024-09-ca",
    type: "pie-chart",
    prompt:
      "The pie chart below illustrates the production of paper, sawn wood and wood pulp in the United States from 1960 to 2010. Summarise the information by selecting and reporting the main features.",
    bandLevel: 7,
    dataDescription:
      "Two pie charts side-by-side (1960 and 2010). 1960: paper 50%, sawn wood 35%, wood pulp 15%. 2010: paper 38%, sawn wood 30%, wood pulp 32%. Wood pulp share doubled.",
    keyVocabulary: [
      "more than doubled",
      "ceded share to",
      "remained the largest",
      "reconfiguration",
      "structural shift",
    ],
    band9Tips:
      "Pair the two charts in your overview — focus on what changed proportionally, not what stayed the same.",
    source: SRC_RECENT,
    sourceUrl: SRC_RECENT_URL,
  },
  {
    id: "t1-2024-09-uae",
    type: "table",
    prompt:
      "The table below shows the average retirement age of men and women in five countries in 2014. Summarise the information by selecting and reporting the main features, and make comparisons where relevant.",
    bandLevel: 7,
    dataDescription:
      "Table: five countries (e.g. Japan, USA, UK, France, Mexico) × two columns (men, women). Average male retirement age 60–69; female retirement age generally 1–3 years lower except in Mexico (higher).",
    keyVocabulary: [
      "retired earlier",
      "the gender gap",
      "lagged behind",
      "approached parity",
      "the highest figure",
    ],
    band9Tips:
      "Group countries with men > women separately from the outlier(s); pick one cross-country comparison and one within-country comparison.",
    source: SRC_RECENT,
    sourceUrl: SRC_RECENT_URL,
  },
  {
    id: "t1-2024-09-sg",
    type: "line-graph",
    prompt:
      "The line chart below shows the source of complaints against the Bank of New York and the time it took to resolve those complaints over a period of years. Summarise the information by selecting and reporting the main features.",
    bandLevel: 7,
    dataDescription:
      "Two-axis line chart: number of complaints by source (online, phone, in-branch) on the left axis; mean resolution time (days) on the right axis. Online complaints rise; in-branch fall; resolution time peaked mid-period then declined.",
    keyVocabulary: [
      "logged",
      "resolved",
      "shifted online",
      "peaked at",
      "an inverse relationship",
    ],
    band9Tips:
      "Treat 'volume' and 'time-to-resolve' as two stories. Compare the trend lines rather than absolute numbers in the overview.",
    source: SRC_RECENT,
    sourceUrl: SRC_RECENT_URL,
  },
  {
    id: "t1-2024-11-ca",
    type: "bar-chart",
    prompt:
      "The vertical bar chart below illustrates transport preferences among young people in four countries in 2010. Summarise the information by selecting and reporting the main features, and make comparisons where relevant.",
    bandLevel: 7,
    dataDescription:
      "Four countries × four bars each (car, bus, bicycle, walking). Patterns vary widely: bicycle dominates in the Netherlands; car dominates in the USA.",
    keyVocabulary: [
      "modal split",
      "favoured",
      "by far the most popular",
      "negligible share",
      "marked variation",
    ],
    band9Tips:
      "Pick the country that breaks the pattern and use it as your headline observation.",
    source: SRC_RECENT,
    sourceUrl: SRC_RECENT_URL,
  },
  {
    id: "t1-2024-11-au",
    type: "pie-chart",
    prompt:
      "The pie charts below illustrate the production of energy and electricity from three natural resources (coal, natural gas and nuclear energy) between 2000 and 2010 in Norway. Summarise the information.",
    bandLevel: 7,
    dataDescription:
      "Two pies. 2000: coal 40%, natural gas 35%, nuclear 25%. 2010: coal 25%, natural gas 50%, nuclear 25%.",
    keyVocabulary: [
      "decarbonisation",
      "fuel switch",
      "stable share",
      "marked decline",
      "rose by 15 percentage points",
    ],
    band9Tips:
      "Group fossil fuels (coal + gas) vs non-fossil to show analytical depth in the overview.",
    source: SRC_RECENT,
    sourceUrl: SRC_RECENT_URL,
  },
  {
    id: "t1-2024-11-uk",
    type: "line-graph",
    prompt:
      "The line chart below illustrates the proportion of men and women of different ages who were living alone in the United States in a given year. Summarise the information by selecting and reporting the main features.",
    bandLevel: 7,
    dataDescription:
      "Two lines (men and women) plotted across age bands 25–34, 35–44, 45–54, 55–64, 65–74, 75+. Women living alone overtake men sharply after age 65 due to longer life expectancy.",
    keyVocabulary: [
      "outnumbered",
      "diverged sharply",
      "at the older end",
      "marginal difference",
      "intersected",
    ],
    band9Tips:
      "Frame the overview around the cross-over age — that's the single most striking feature.",
    source: SRC_RECENT,
    sourceUrl: SRC_RECENT_URL,
  },
  {
    id: "t1-2024-11-vn",
    type: "bar-chart",
    prompt:
      "The bar chart below illustrates the proportion of people in different age groups that spend on clothes, groceries, electricity and electronic devices in the USA from 2000 to 2010. Summarise the information.",
    bandLevel: 7,
    dataDescription:
      "Four spending categories × five age groups across two time points (2000 and 2010). Younger groups spend more on electronics and clothes; older groups spend more on groceries and electricity.",
    keyVocabulary: [
      "discretionary spending",
      "essentials",
      "skewed towards",
      "remained the largest outlay",
      "demographic divergence",
    ],
    band9Tips:
      "Group categories by 'discretionary' (clothes, electronics) vs 'essential' (groceries, electricity) for a Band-9 overview.",
    source: SRC_RECENT,
    sourceUrl: SRC_RECENT_URL,
  },

  // --- IELTS LIZ-STYLE PRACTICE PROMPTS ----------------------------------
  {
    id: "t1-liz-fastfood",
    type: "line-graph",
    prompt:
      "The graph below shows the consumption of three different types of fast food in Britain between 1970 and 1990. Summarise the information by selecting and reporting the main features, and make comparisons where relevant.",
    bandLevel: 7,
    dataDescription:
      "Line chart, three lines: hamburgers (rises from 80g to 500g), fish & chips (falls from 300g to 200g), pizza (rises from 0g to 270g). Y-axis: grams per person per week. X-axis: 1970–1990.",
    keyVocabulary: [
      "rose dramatically",
      "fell steadily",
      "increased fivefold",
      "remained the most popular",
      "overtook",
    ],
    band9Tips:
      "Mention the start AND end values plus the most striking change. Avoid listing every data point — pick the 3 most significant.",
    source: SRC_LIZ,
    sourceUrl: SRC_LIZ_URL,
  },
  {
    id: "t1-liz-watercycle",
    type: "process",
    prompt:
      "The diagram below shows the water cycle, which is the continuous movement of water on, above and below the surface of the Earth. Summarise the information by selecting and reporting the main features.",
    bandLevel: 8,
    dataDescription:
      "Process diagram with stages: evaporation (oceans → atmosphere) → condensation → precipitation → surface runoff and infiltration → ground-water → return to oceans.",
    keyVocabulary: [
      "evaporation",
      "condenses into",
      "precipitation",
      "infiltrates",
      "is returned to",
    ],
    band9Tips:
      "Use sequencing markers (initially / subsequently / finally) and the present-simple passive throughout.",
    source: SRC_LIZ,
    sourceUrl: SRC_LIZ_URL,
  },
  {
    id: "t1-liz-village",
    type: "map",
    prompt:
      "The two maps below show a village called Stokeford in 1930 and 2010. Summarise the information by selecting and reporting the main features, and make comparisons where relevant.",
    bandLevel: 7,
    dataDescription:
      "1930: small church, post office, three farmhouses, narrow lane along a river. 2010: church preserved; post office gone; farmhouses replaced by housing estates north and south; new bridge across river; main road widened.",
    keyVocabulary: [
      "was demolished",
      "has been replaced by",
      "extensive redevelopment",
      "to the north of",
      "now houses",
    ],
    band9Tips:
      "Use 'has been + past participle' (passive present-perfect) consistently for changes; use cardinal directions for clarity.",
    source: SRC_LIZ,
    sourceUrl: SRC_LIZ_URL,
  },
  {
    id: "t1-liz-bricks",
    type: "process",
    prompt:
      "The diagram below shows the process by which bricks are manufactured for the building industry. Summarise the information by selecting and reporting the main features.",
    bandLevel: 8,
    dataDescription:
      "8 stages: 1) clay dug from the ground, 2) passed through a metal grid to remove large stones, 3) mixed with sand and water, 4) shaped via wire cutter or mould, 5) dried for 24-48 hours, 6) fired in a kiln at 1000°C, 7) cooled, 8) packaged on pallets and dispatched.",
    keyVocabulary: [
      "is then transported",
      "subsequently",
      "the next stage involves",
      "once cooled",
      "ready for despatch",
    ],
    band9Tips:
      "Use sequencing markers, passive voice, and tense the verbs in present simple.",
    source: SRC_LIZ,
    sourceUrl: SRC_LIZ_URL,
  },
  {
    id: "t1-liz-energy",
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
    source: SRC_LIZ,
    sourceUrl: SRC_LIZ_URL,
  },
  {
    id: "t1-liz-water",
    type: "table",
    prompt:
      "The table below shows the average daily water consumption per person in litres in four different countries in 2010 and 2020. Summarise the information.",
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
      "Group the countries by trend direction in your overview; give specific figures only in the body paragraphs.",
    source: SRC_LIZ,
    sourceUrl: SRC_LIZ_URL,
  },
  {
    id: "t1-liz-international",
    type: "line-graph",
    prompt:
      "The graph below shows the number of international students enrolled at universities in three English-speaking countries between 2000 and 2020. Summarise the information.",
    bandLevel: 7,
    dataDescription:
      "Three lines: USA (rises 600k→1.1m), UK (rises 220k→520k), Australia (rises 95k→440k). Australia shows the steepest relative growth.",
    keyVocabulary: [
      "saw the steepest growth",
      "almost quadrupled",
      "rose at a faster rate",
      "narrowing the gap",
      "exceeded",
    ],
    band9Tips:
      "Compare absolute vs relative change — Australia's relative growth eclipses the USA's despite smaller absolute numbers.",
    source: SRC_LIZ,
    sourceUrl: SRC_LIZ_URL,
  },
  {
    id: "t1-liz-recycle",
    type: "process",
    prompt:
      "The diagram below shows the recycling process for aluminium cans. Summarise the information by selecting and reporting the main features.",
    bandLevel: 7,
    dataDescription:
      "Linear process: collection → sorting → shredding → de-coating → melting → casting into ingots → rolling into sheets → manufacture of new cans.",
    keyVocabulary: [
      "is collected",
      "is then transported",
      "is melted at",
      "is cast into",
      "the cycle is complete",
    ],
    band9Tips:
      "Note that aluminium recycling is a CLOSED LOOP — say so in the overview to demonstrate analytical reading.",
    source: SRC_LIZ,
    sourceUrl: SRC_LIZ_URL,
  },
  {
    id: "t1-liz-temp",
    type: "line-graph",
    prompt:
      "The line graph below shows the average global temperature anomaly between 1900 and 2020. Summarise the information.",
    bandLevel: 7,
    dataDescription:
      "Line rises gradually until ~1970, then accelerates sharply. The 2020 anomaly is approximately +1.1°C above the 1900 baseline.",
    keyVocabulary: [
      "anomaly",
      "rose gradually",
      "accelerated sharply",
      "above the baseline",
      "an upward trajectory",
    ],
    band9Tips:
      "Identify the inflection point (~1970) — naming where the rate-of-change shifts is a Band-9 marker.",
    source: SRC_LIZ,
    sourceUrl: SRC_LIZ_URL,
  },
  {
    id: "t1-liz-budget",
    type: "pie-chart",
    prompt:
      "The pie chart below shows monthly household budget allocation in Germany in 2023. Summarise the information.",
    bandLevel: 7,
    dataDescription:
      "Housing 33%, Food 14%, Transport 14%, Leisure 11%, Health 9%, Clothes 5%, Other 14%.",
    keyVocabulary: [
      "by far the largest outlay",
      "share",
      "accounted for roughly a third",
      "the smallest category",
      "in equal measure",
    ],
    band9Tips:
      "Group categories by 'essential' (housing, food, transport, health) vs 'discretionary' (leisure, clothes) in your overview.",
    source: SRC_LIZ,
    sourceUrl: SRC_LIZ_URL,
  },
  {
    id: "t1-liz-renewables",
    type: "line-graph",
    prompt:
      "The line graph below shows the share of total electricity production from renewable sources in four countries between 1990 and 2024. Summarise the information.",
    bandLevel: 7,
    dataDescription:
      "Four lines: Norway 95%→99%, Germany 4%→52%, China 18%→32%, USA 11%→23%.",
    keyVocabulary: [
      "scaled up dramatically",
      "remained close to saturation",
      "more than tripled",
      "diverging trajectories",
      "lagged behind",
    ],
    band9Tips:
      "Distinguish countries already at saturation (Norway) from those scaling up — same metric, very different stories.",
    source: SRC_LIZ,
    sourceUrl: SRC_LIZ_URL,
  },
  {
    id: "t1-liz-broadband",
    type: "table",
    prompt:
      "The table below shows the average broadband speeds (in megabits per second) in five major cities in 2018 and 2024. Summarise the information.",
    bandLevel: 7,
    dataDescription:
      "Singapore 200→520 Mbps, Seoul 180→480, Stockholm 110→370, NYC 95→290, Cairo 25→90.",
    keyVocabulary: [
      "speeds more than doubled",
      "the leader in connectivity",
      "narrowed the gap",
      "lagged considerably",
      "robust growth",
    ],
    band9Tips:
      "Note the percentage growth as well as the absolute jump — Cairo's 3.6× growth is faster than Singapore's 2.6× even though Singapore is in the lead.",
    source: SRC_LIZ,
    sourceUrl: SRC_LIZ_URL,
  },
  {
    id: "t1-liz-tourist",
    type: "table",
    prompt:
      "The table below shows the number of tourist arrivals (in millions) in five capital cities in 2015 and 2023. Summarise the information.",
    bandLevel: 7,
    dataDescription:
      "Paris 18m→23m, Bangkok 21m→25m, London 19m→22m, New York 13m→16m, Tokyo 12m→17m.",
    keyVocabulary: [
      "saw the largest gain",
      "remained the most-visited",
      "modest growth",
      "narrowed the gap with",
      "rebounded",
    ],
    band9Tips:
      "Pick out the city with the biggest absolute gain AND the city with the biggest relative gain — they're often different.",
    source: SRC_LIZ,
    sourceUrl: SRC_LIZ_URL,
  },
];
