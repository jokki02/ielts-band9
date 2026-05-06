// IELTS listening tracks built around real, openly-licensed videos. We
// embed the original publisher's player (TED-Ed / TED on YouTube) so that
// the audio is the genuine human-recorded narration, not synthesised speech.
//
// All transcripts are reproduced verbatim from the publisher's official
// transcript page. TED-Ed lessons and TED Talks are released under the
// Creative Commons BY-NC-ND 4.0 licence. Reproduction here is for
// non-commercial educational use, with full attribution.
//
// Source: TED-Ed (https://ed.ted.com), TED Conferences LLC.
// Licence: CC-BY-NC-ND 4.0 (see https://www.ted.com/about/our-organization/our-policies-terms/ted-talks-usage-policy)

export interface ListeningTrack {
  id: string;
  title: string;
  section: 1 | 2 | 3 | 4;
  description: string;
  /** YouTube video ID — drives the embedded player. */
  youtubeId?: string;
  /** Canonical lesson page (TED-Ed) or talk page (TED.com). */
  sourceUrl: string;
  /** SPDX-style identifier or short licence label. */
  licence: string;
  /** Human-readable attribution shown beside the player. */
  attribution: string;
  /** Approximate duration in seconds (helps IELTS Section pacing). */
  durationSec: number;
  /** Verbatim transcript split into speaker turns. */
  transcript: { speaker: string; text: string }[];
  questions: ListeningQuestion[];
}

export interface ListeningQuestion {
  num: number;
  type: "form" | "mcq" | "short_answer" | "matching" | "labeling";
  question: string;
  options?: string[];
  /**
   * Pipe-separated list of accepted answers. Each candidate is
   * compared to the user's input via `normaliseAnswer`.
   */
  expected: string;
  explanation: string;
}

export const LISTENING_TRACKS: ListeningTrack[] = [
  {
    id: "lt-photosynthesis",
    title: "The simple story of photosynthesis and food — Amanda Ooten",
    section: 4,
    description:
      "TED-Ed lesson explaining how carbohydrates, starch, fibre and the air we breathe all trace back to a single photosynthetic reaction. Section 4 — academic monologue.",
    youtubeId: "eo5XndJaz-Y",
    sourceUrl:
      "https://ed.ted.com/lessons/the-simple-but-fascinating-story-of-photosynthesis-and-food-amanda-ooten",
    licence: "CC-BY-NC-ND-4.0",
    attribution:
      'TED-Ed: "The simple story of photosynthesis and food" by Amanda Ooten. © TED Conferences LLC. CC-BY-NC-ND 4.0.',
    durationSec: 241,
    transcript: [
      {
        speaker: "Narrator",
        text: "Ever wonder where most of the food you eat every day comes from? Well, about 60% of the food you eat is carbohydrates. As you can probably tell from its name, carbohydrates contain carbon, hydrogen, and oxygen. But where do these atoms originally come from and how do they join together to make delicious foods like fruits and pasta?",
      },
      {
        speaker: "Narrator",
        text: "It actually all starts with the air you are exhaling this very minute, specifically the carbon dioxide molecules. Plants are going to breathe in this very same carbon dioxide through pores in their skin, called stomata. Plants drink in water from their roots to get the needed oxygen and hydrogen atoms, and their electrons, in order to build carbohydrates.",
      },
      {
        speaker: "Narrator",
        text: "What is that thing? Well, that's a special plant organelle inside the leaves of plants called a chloroplast. It's green because of a special light-absorbing pigment called chlorophyll. Each leaf has about 44,000 cells and every cell can have anywhere between 20 to 100 chloroplasts. That's up to 4,400,000 chloroplasts!",
      },
      {
        speaker: "Narrator",
        text: "By now, you've probably guessed that we're talking about the process of photosynthesis and you might be wondering when the sun is going to make its entrance. Let's go back to that original molecule of water. The plant has to split this molecule of water so it can get electrons from it. But the plant can't pull that water apart by itself. It needs help from the high-energy rays of the sun.",
      },
      {
        speaker: "Narrator",
        text: "So now that the chloroplast has all the building blocks — carbon, hydrogen, oxygen, and electrons — it can use them to go through the rest of the steps of photosynthesis to transform that original carbon dioxide gas into a simple carbohydrate called glucose, C-6-H-12-O-6.",
      },
      {
        speaker: "Narrator",
        text: "That little glucose molecule then helps to build bigger and better carbohydrates like cellulose. Cellulose is a type of carbohydrate found in plants that our body cannot break down. We call it fiber and we eat it in vegetables like lettuce, broccoli, and celery. Plants use cellulose to keep themselves strong. The plant could also turn that glucose into starch, a large molecule that stores energy for the plant. We love eating starch from plants like potatoes, corn, and rice.",
      },
      {
        speaker: "Narrator",
        text: "So you see, when you eat plants, we're actually benefiting from photosynthesis. The plant makes things like starch, which we eat and then break back down into glucose, the first form the plant made. Then, the mitochondria in our cells, powered by the oxygen we breathe, can turn glucose into pure energy molecules called ATP. ATP powers all work done by each and every one of your cells, things like communication, movement, and transport.",
      },
      {
        speaker: "Narrator",
        text: "But why do we have to turn that glucose into ATP? Well, think of it like this. You're excited to start your summer job at the local ice cream stand, but your boss has just told you that she is going to pay you in ice cream cones. What are you going to be able to do with those ice cream cones? Nothing, which is why you kindly asked to be paid in dollars. ATP is just like dollars. It is the currency that all cells of life use while glucose is, well, kind of like ice cream. Even plants have mitochondria in their cells to break down the glucose they make into ATP.",
      },
      {
        speaker: "Narrator",
        text: "So as you can see, humans and plants are intricately connected. The air we breathe out is used by plants to make the carbohydrates we enjoy so much. And, in the process, they are releasing the very same oxygen molecules we need to breathe in in order that our mitochondria can break down our delicious carbohydrate meal.",
      },
    ],
    questions: [
      {
        num: 1,
        type: "form",
        question: "About what percentage of the food you eat is carbohydrates?",
        expected: "60% | 60 percent | 60",
        explanation: "'About 60% of the food you eat is carbohydrates.'",
      },
      {
        num: 2,
        type: "mcq",
        question: "Carbohydrates contain which three elements?",
        options: [
          "carbon, hydrogen, nitrogen",
          "carbon, hydrogen, oxygen",
          "carbon, oxygen, sulfur",
        ],
        expected: "carbon, hydrogen, oxygen",
        explanation:
          "'Carbohydrates contain carbon, hydrogen, and oxygen.'",
      },
      {
        num: 3,
        type: "short_answer",
        question:
          "What is the name of the pores in a plant's skin through which it breathes in carbon dioxide?",
        expected: "stomata",
        explanation:
          "'Plants are going to breathe in this very same carbon dioxide through pores in their skin, called stomata.'",
      },
      {
        num: 4,
        type: "short_answer",
        question:
          "What is the name of the plant organelle inside leaves where photosynthesis takes place?",
        expected: "chloroplast | chloroplasts",
        explanation:
          "'A special plant organelle inside the leaves of plants called a chloroplast.'",
      },
      {
        num: 5,
        type: "short_answer",
        question:
          "Approximately how many cells does each leaf contain?",
        expected: "44,000 | 44000",
        explanation: "'Each leaf has about 44,000 cells.'",
      },
      {
        num: 6,
        type: "form",
        question:
          "Each cell can have between 20 and ____ chloroplasts.",
        expected: "100",
        explanation:
          "'Every cell can have anywhere between 20 to 100 chloroplasts.'",
      },
      {
        num: 7,
        type: "mcq",
        question:
          "What does the plant need from the sun to split a water molecule?",
        options: ["high-energy rays", "infrared rays", "ultraviolet light only"],
        expected: "high-energy rays",
        explanation:
          "'It needs help from the high-energy rays of the sun.'",
      },
      {
        num: 8,
        type: "short_answer",
        question:
          "What simple sugar is the first carbohydrate produced by photosynthesis?",
        expected: "glucose",
        explanation:
          "'A simple carbohydrate called glucose, C-6-H-12-O-6.'",
      },
      {
        num: 9,
        type: "short_answer",
        question:
          "What type of carbohydrate found in plants do we call 'fiber'?",
        expected: "cellulose",
        explanation:
          "'Cellulose is a type of carbohydrate found in plants that our body cannot break down. We call it fiber.'",
      },
      {
        num: 10,
        type: "short_answer",
        question:
          "What energy molecule do mitochondria produce from glucose?",
        expected: "ATP",
        explanation:
          "'The mitochondria in our cells … can turn glucose into pure energy molecules called ATP.'",
      },
    ],
  },
  {
    id: "lt-jellyfish",
    title:
      "Jellyfish predate dinosaurs. How have they survived so long? — David Gruber",
    section: 4,
    description:
      "TED-Ed lesson on the biology of jellyfish: anatomy, defence, fluorescence, and the only known biologically immortal animal. Section 4 — academic monologue.",
    youtubeId: "yQduHyiWe9o",
    sourceUrl:
      "https://ed.ted.com/lessons/jellyfish-predate-dinosaurs-how-have-they-survived-so-long-david-gruber",
    licence: "CC-BY-NC-ND-4.0",
    attribution:
      'TED-Ed: "Jellyfish predate dinosaurs. How have they survived so long?" by David Gruber. © TED Conferences LLC. CC-BY-NC-ND 4.0.',
    durationSec: 325,
    transcript: [
      {
        speaker: "Narrator",
        text: "Some are longer than a blue whale. Others are barely larger than a grain of sand. One species unleashes one of the most deadly venoms on Earth. Another holds a secret that's behind some of the greatest breakthroughs in biology. They've inhabited the ocean for at least half a billion years, and they're still flourishing as the sea changes around them.",
      },
      {
        speaker: "Narrator",
        text: "Jellyfish are soft-bodied sea creatures that aren't really fish. They're part of a diverse team of gelatinous zooplankton, zooplankton being animals that drift in the ocean. There are more than 1,000 species of jellyfish, and many others that are often mistaken for them.",
      },
      {
        speaker: "Narrator",
        text: "A noted feature of jellyfish is a translucent bell made of a soft delicate material called mesoglea. Sandwiched between two layers of skin, the mesoglea is more than 95% water held together by protein fibers. The jellyfish can contract and relax their bells to propel themselves. They don't have a brain or a spinal cord, but a neural net around the bell's inner margin forms a rudimentary nervous system that can sense the ocean's currents and the touch of other animals.",
      },
      {
        speaker: "Narrator",
        text: "Jellyfish don't have typical digestive systems, either. These gelatinous carnivores consume plankton and other small sea creatures through a hole in the underside of their bells. The nutrients are absorbed by an inner layer of cells with waste excreted back through their mouths.",
      },
      {
        speaker: "Narrator",
        text: "But the jellyfish's relatively simple anatomy doesn't prevent it from having some remarkable abilities. One kind of box jellyfish has 24 eyes. Scientists think it can see color and form images within its simple nervous system. Four of its eyes are curved upward on stalks. This allows the jellyfish to peer through the surface of the water, looking for the canopy of the mangrove trees where it feeds. In fact, this may be one of the only creatures with a 360-degree view of its environment.",
      },
      {
        speaker: "Narrator",
        text: "The jellyfish's sting, which helps it capture prey and defend itself, is its most infamous calling card. In the jelly's epidermis, cells called nematocysts lie coiled like poisonous harpoons. When they're triggered by contact, they shoot with an explosive force. It exerts over 550 times the pressure of Mike Tyson's strongest punch to inject venom into the victim. Some jellyfish stings barely tingle, but others cause severe skin damage. The venom of one box jellyfish can kill a human in under five minutes, making it one of the most potent poisons of any animal in the world.",
      },
      {
        speaker: "Narrator",
        text: "Other jellyfish superpowers are less lethal. One species of jellyfish glows green when it's agitated, mostly thanks to a biofluorescent compound called green fluorescent protein, or GFP. Scientists isolated the gene for GFP and figured out how to insert it into the DNA of other cells. There, it acts like a biochemical beacon, marking genetic modifications, or revealing the path of critical molecules. Scientists have used the glow of GFP to watch cancer cells proliferate, track the development of Alzheimer's, and illuminate countless other biological processes. Developing the tools and techniques from GFP has netted three scientists a Nobel Prize in 2008, and another three in 2014.",
      },
      {
        speaker: "Narrator",
        text: "But it's jellyfish who may be the most successful organisms on Earth. Ancient fossils prove that jellyfish have inhabited the seas for at least 500 million years, and maybe go back over 700 million. That's longer than any other multiorgan animal. And as other marine animals are struggling to survive in warmer and more acidic oceans, the jellyfish are thriving, and perhaps getting even more numerous. It doesn't hurt that some can lay as many as 45,000 eggs in a single night.",
      },
      {
        speaker: "Narrator",
        text: "And there's some jellyfish whose survival strategy almost sounds like science fiction. When the immortal jellyfish is sick, aging, or under stress, its struggling cells can change their identity. The tiny bell and tentacles deteriorate and turn into an immature polyp that spawns brand new clones of the parent. As far as we know, these are the only animals who found a loophole when facing mortality. That's pretty sophisticated for species that are 95% water and predate the dinosaurs.",
      },
    ],
    questions: [
      {
        num: 1,
        type: "form",
        question:
          "Jellyfish are part of a group of animals called gelatinous _______.",
        expected: "zooplankton",
        explanation:
          "'They're part of a diverse team of gelatinous zooplankton.'",
      },
      {
        num: 2,
        type: "short_answer",
        question:
          "What is the soft material the jellyfish bell is made of?",
        expected: "mesoglea",
        explanation:
          "'A translucent bell made of a soft delicate material called mesoglea.'",
      },
      {
        num: 3,
        type: "form",
        question: "The mesoglea is more than ____% water.",
        expected: "95% | 95",
        explanation: "'The mesoglea is more than 95% water.'",
      },
      {
        num: 4,
        type: "mcq",
        question: "How many eyes does one kind of box jellyfish have?",
        options: ["4", "24", "8"],
        expected: "24",
        explanation: "'One kind of box jellyfish has 24 eyes.'",
      },
      {
        num: 5,
        type: "short_answer",
        question:
          "What name is given to the cells in the jellyfish's epidermis that contain its sting?",
        expected: "nematocysts",
        explanation:
          "'In the jelly's epidermis, cells called nematocysts lie coiled like poisonous harpoons.'",
      },
      {
        num: 6,
        type: "mcq",
        question: "What does GFP stand for?",
        options: [
          "green fluorescent protein",
          "generic fluorescent particle",
          "glowing fish protein",
        ],
        expected: "green fluorescent protein",
        explanation:
          "'A biofluorescent compound called green fluorescent protein, or GFP.'",
      },
      {
        num: 7,
        type: "form",
        question:
          "Jellyfish have inhabited the seas for at least ____ million years.",
        expected: "500",
        explanation:
          "'Jellyfish have inhabited the seas for at least 500 million years.'",
      },
      {
        num: 8,
        type: "form",
        question:
          "Some jellyfish can lay as many as ____ eggs in a single night.",
        expected: "45,000 | 45000",
        explanation:
          "'Some can lay as many as 45,000 eggs in a single night.'",
      },
      {
        num: 9,
        type: "short_answer",
        question:
          "When sick or stressed, the immortal jellyfish reverts back into an immature ______.",
        expected: "polyp",
        explanation:
          "'The tiny bell and tentacles deteriorate and turn into an immature polyp.'",
      },
      {
        num: 10,
        type: "mcq",
        question:
          "How does the narrator describe the jellyfish's survival in changing oceans?",
        options: [
          "they are struggling like other marine animals",
          "they are thriving and perhaps getting even more numerous",
          "their populations are stable",
        ],
        expected:
          "they are thriving and perhaps getting even more numerous",
        explanation:
          "'The jellyfish are thriving, and perhaps getting even more numerous.'",
      },
    ],
  },
  {
    id: "lt-urbanization",
    title:
      "Urbanization and the future of cities — Vance Kite",
    section: 4,
    description:
      "TED-Ed lesson tracing the rise of cities from 10,000-year-old villages to the modern megacity, and asking what cities of the future will look like. Section 4 — academic monologue.",
    youtubeId: "fKnAJCSGSdk",
    sourceUrl:
      "https://ed.ted.com/lessons/urbanization-and-the-future-of-cities-vance-kite",
    licence: "CC-BY-NC-ND-4.0",
    attribution:
      'TED-Ed: "Urbanization and the future of cities" by Vance Kite. © TED Conferences LLC. CC-BY-NC-ND 4.0.',
    durationSec: 248,
    transcript: [
      {
        speaker: "Narrator",
        text: "Today, more than half of all people in the world live in an urban area. By mid-century, this will increase to 70%. But as recently as 100 years ago, only two out of ten people lived in a city, and before that, it was even less. How have we reached such a high degree of urbanization, and what does it mean for our future?",
      },
      {
        speaker: "Narrator",
        text: "In the earliest days of human history, humans were hunter-gatherers, often moving from place to place in search of food. But about 10,000 years ago, our ancestors began to learn the secrets of selective breeding and early agricultural techniques. For the first time, people could raise food rather than search for it, and this led to the development of semi-permanent villages for the first time in history.",
      },
      {
        speaker: "Narrator",
        text: "Why only semi-permanent? Well, at first, the villages still had to relocate every few years as the soil became depleted. It was only with the advent of techniques like irrigation and soil tilling about 5,000 years ago that people could rely on a steady and long-term supply of food, making permanent settlements possible.",
      },
      {
        speaker: "Narrator",
        text: "And with the food surpluses that these techniques produced, it was no longer necessary for everyone to farm. This allowed the development of other specialized trades, and, by extension, cities. With cities now producing surplus food, as well as tools, crafts, and other goods, there was now the possibility of commerce and interaction over longer distances. And as trade flourished, so did technologies that facilitated it, like carts, ships, roads, and ports. Of course, these things required even more labor to build and maintain, so more people were drawn from the countryside to the cities as more jobs and opportunities became available.",
      },
      {
        speaker: "Narrator",
        text: "If you think modern cities are overcrowded, you may be surprised to learn that some cities in 2000 B.C. had population densities nearly twice as high as that of Shanghai or Calcutta. One reason for this was that transportation was not widely available, so everything had to be within walking distance, including the few sources of clean water that existed then. And the land area of the city was further restricted by the need for walls to defend against attacks.",
      },
      {
        speaker: "Narrator",
        text: "The Roman Empire was able to develop infrastructure to overcome these limitations, but other than that, modern cities as we know them didn't really get their start until the Industrial Revolution, when new technology deployed on a mass scale allowed cities to expand and integrate further, establishing police, fire, and sanitation departments, as well as road networks, and later electricity distribution.",
      },
      {
        speaker: "Narrator",
        text: "So, what is the future of cities? Global population is currently more than 7 billion and is predicted to top out around 10 billion. Most of this growth will occur in the urban areas of the world's poorest countries. So, how will cities need to change to accommodate this growth?",
      },
      {
        speaker: "Narrator",
        text: "First, the world will need to seek ways to provide adequate food, sanitation, and education for all people. Second, growth will need to happen in a way that does not damage the land that provides us with the goods and services that support the human population. Food production might move to vertical farms and skyscrapers, rooftop gardens, or vacant lots in city centers, while power will increasingly come from multiple sources of renewable energy. Instead of single-family homes, more residences will be built vertically. We may see buildings that contain everything that people need for their daily life, as well as smaller, self-sufficient cities focused on local and sustainable production.",
      },
    ],
    questions: [
      {
        num: 1,
        type: "form",
        question:
          "By mid-century, the percentage of people living in urban areas will rise to ____%.",
        expected: "70% | 70",
        explanation: "'By mid-century, this will increase to 70%.'",
      },
      {
        num: 2,
        type: "form",
        question:
          "About 100 years ago, only ____ out of ten people lived in a city.",
        expected: "two | 2",
        explanation:
          "'Only two out of ten people lived in a city.'",
      },
      {
        num: 3,
        type: "short_answer",
        question:
          "Roughly how many years ago did our ancestors begin to use early agricultural techniques?",
        expected: "10,000 | 10000",
        explanation:
          "'About 10,000 years ago, our ancestors began to learn the secrets of selective breeding and early agricultural techniques.'",
      },
      {
        num: 4,
        type: "short_answer",
        question:
          "Permanent settlements became possible roughly how many years ago?",
        expected: "5,000 | 5000",
        explanation:
          "'It was only with the advent of techniques like irrigation and soil tilling about 5,000 years ago that people could rely on a steady and long-term supply of food, making permanent settlements possible.'",
      },
      {
        num: 5,
        type: "mcq",
        question:
          "What does the narrator say about cities in 2000 B.C.?",
        options: [
          "They were less crowded than modern cities.",
          "Some had population densities nearly twice as high as Shanghai or Calcutta.",
          "They could only contain a few hundred people each.",
        ],
        expected:
          "Some had population densities nearly twice as high as Shanghai or Calcutta.",
        explanation:
          "'Some cities in 2000 B.C. had population densities nearly twice as high as that of Shanghai or Calcutta.'",
      },
      {
        num: 6,
        type: "short_answer",
        question:
          "Which historical period is said to mark the beginning of modern cities as we know them?",
        expected: "Industrial Revolution | the Industrial Revolution",
        explanation:
          "'Modern cities as we know them didn't really get their start until the Industrial Revolution.'",
      },
      {
        num: 7,
        type: "form",
        question:
          "Global population is predicted to top out at around ____ billion.",
        expected: "10 | 10 billion",
        explanation:
          "'Global population … is predicted to top out around 10 billion.'",
      },
      {
        num: 8,
        type: "short_answer",
        question:
          "Most future urban growth will occur in the world's _______ countries.",
        expected: "poorest",
        explanation:
          "'Most of this growth will occur in the urban areas of the world's poorest countries.'",
      },
      {
        num: 9,
        type: "mcq",
        question:
          "Which of the following is mentioned as a possible site for future food production?",
        options: [
          "underground tunnels",
          "vertical farms and skyscrapers",
          "deep-sea farms",
        ],
        expected: "vertical farms and skyscrapers",
        explanation:
          "'Food production might move to vertical farms and skyscrapers, rooftop gardens, or vacant lots in city centers.'",
      },
      {
        num: 10,
        type: "mcq",
        question:
          "What kind of cities does the narrator suggest may emerge alongside megacities?",
        options: [
          "smaller, self-sufficient cities focused on local and sustainable production",
          "single-family suburban developments",
          "underground bunker cities",
        ],
        expected:
          "smaller, self-sufficient cities focused on local and sustainable production",
        explanation:
          "'Smaller, self-sufficient cities focused on local and sustainable production.'",
      },
    ],
  },
];
