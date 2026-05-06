import { ReadingQuestionType } from "@/lib/ielts/question-types";

export interface ReadingQuestion {
  num: number;
  type: ReadingQuestionType;
  question: string;
  options?: string[];
  /**
   * For multi-answer questions, expected is a string array. For single-answer
   * questions it's a string. Multiple acceptable answers can be encoded in
   * a single answer string separated by " | ".
   */
  expected: string | string[];
  explanation: string;
  paragraphRef?: string; // e.g. "B" — paragraph that contains the answer
  bandLevel: number;
}

export interface ReadingPassage {
  id: string;
  title: string;
  source: string;
  difficulty: "band6" | "band7" | "band8" | "band9";
  topic: "science" | "society" | "humanities" | "history" | "psychology" | "environment";
  /**
   * Paragraphs as an array — each starts with the paragraph letter (A, B, C…)
   * for "Matching Headings" / "Matching Information" question types.
   */
  paragraphs: string[];
  questions: ReadingQuestion[];
}

export const READING_PASSAGES: ReadingPassage[] = [
  {
    id: "rp-001",
    title: "The Evolution of Urban Planning",
    source: "Academic Geography Review",
    difficulty: "band7",
    topic: "society",
    paragraphs: [
      "A. Urban planning, as a recognised professional discipline, emerged in the late nineteenth century, but its origins lie far deeper in human history. The grid-iron streets of Mohenjo-daro, the radiating boulevards of imperial Beijing, and the disciplined orthogonal layouts of Roman colonial towns all attest to a longstanding human impulse to impose order on the city. What was new about modern planning, then, was less the activity itself than the conviction that the city could be the object of systematic, scientific study, and that its problems were tractable to expert intervention.",
      "B. The catalyst for this conviction was the upheaval of nineteenth-century industrialisation. As workshops gave way to factories and rural populations migrated into rapidly expanding cities, observers were confronted with conditions that earlier generations had never encountered: streets so narrow and so densely packed that sunlight scarcely reached the lower windows; tenement blocks where families occupied a single room and shared one privy with twenty others; and a recurring tide of cholera that paid no respect to wealth or station. The Victorian commentator Edwin Chadwick, in his celebrated 1842 report, demonstrated that the cost of poor sanitation was borne not only by the poor but, through epidemic and lost productivity, by society at large. Chadwick was not a planner in the contemporary sense, yet his insistence on the public-health rationale for spatial intervention laid the moral foundation upon which the discipline would be built.",
      "C. The first generation of professional planners drew its inspiration from two seemingly disparate sources: utopian social theory and engineering pragmatism. From figures such as Ebenezer Howard came the conviction that the city, properly designed, could heal social as well as physical ailments. Howard's 1898 essay To-morrow: A Peaceful Path to Real Reform proposed the 'garden city' — a self-contained settlement of around 32,000 inhabitants encircled by an inviolable green belt, in which the benefits of urban density and rural amenity would be combined. From the engineering side came the great public-works projects of Baron Haussmann's Paris and the gridded street systems of mid-western American cities, which demonstrated that bold spatial reorganisation, however unlovely its initial reception, could deliver tangible improvements in circulation, drainage, and fire safety.",
      "D. By the inter-war years these two strands were beginning to converge. The 1909 Housing, Town Planning, &c. Act, in Britain, gave municipal authorities formal powers to prepare schemes for new development, and the discipline acquired its first university chairs and professional bodies. In the United States, zoning ordinances pioneered in New York spread rapidly across the country, separating residential, commercial, and industrial uses on the assumption that proximity between them was inherently undesirable. It is at this point in the history of planning that we encounter the seeds of the difficulties that would later vex the profession: a tendency to assume that physical separation could resolve social tensions, and a willingness to treat the city as a machine whose components could be rearranged at will.",
      "E. The post-war decades, often retrospectively termed the 'high modernist' phase of planning, brought these tendencies to their fullest expression. Cities devastated by bombing, or simply judged obsolete by reformers, were rebuilt on principles that owed much to the radical theorist Le Corbusier. Streets were widened to accommodate the private car; pedestrians were elevated on walkways or relegated to subterranean passages; mixed-use neighbourhoods were demolished and their populations re-housed in monolithic blocks of social housing on the urban periphery. For a brief period these projects were celebrated as the herald of a new and rational urbanism. Within a generation, however, a counter-movement emerged. Critics such as the journalist Jane Jacobs argued that the very features the planners had set out to extinguish — the busy mixed-use street, the small block, the building of varied age — were the source of the city's social and economic vitality.",
      "F. The contemporary planner inhabits a world that has absorbed Jacobs' critique without fully resolving it. The fashionable categories of the present — 'walkable neighbourhood', 'mixed-use development', 'transit-oriented design' — are in large part a re-discovery of the urban morphologies that high modernism set out to demolish. Yet the underlying tools of the profession — the master plan, the zoning ordinance, the capital budget — remain those of an era confident in the planner's capacity to design, from the top down, the city of the future. Bridging the conceptual gap between bottom-up vitality and top-down direction may well be the defining task of the discipline in the decades to come.",
    ],
    questions: [
      {
        num: 1,
        type: "tfng",
        question:
          "Early urban planners prioritised residential comfort over industrial efficiency.",
        expected: "NOT GIVEN",
        explanation:
          "The passage describes early planners' concerns with sanitation, circulation, and density, but never compares residential comfort to industrial efficiency. Watch for trap statements that combine plausible-sounding ideas not present in the text.",
        paragraphRef: "C",
        bandLevel: 7,
      },
      {
        num: 2,
        type: "tfng",
        question:
          "Edwin Chadwick was professionally trained as a town planner.",
        expected: "FALSE",
        explanation:
          "Paragraph B states explicitly that Chadwick 'was not a planner in the contemporary sense'.",
        paragraphRef: "B",
        bandLevel: 7,
      },
      {
        num: 3,
        type: "tfng",
        question:
          "Garden cities were intended to combine the benefits of urban density with rural amenity.",
        expected: "TRUE",
        explanation:
          "Paragraph C describes Howard's garden city as combining 'the benefits of urban density and rural amenity'.",
        paragraphRef: "C",
        bandLevel: 7,
      },
      {
        num: 4,
        type: "matching_headings",
        question: "Choose the most suitable heading for paragraph D.",
        options: [
          "i. The mistakes of post-war reconstruction",
          "ii. The convergence of utopian and pragmatic strands",
          "iii. Public health as a planning rationale",
          "iv. Pre-modern origins of urban order",
        ],
        expected: "ii. The convergence of utopian and pragmatic strands",
        explanation:
          "Paragraph D opens with 'By the inter-war years these two strands were beginning to converge' and goes on to describe early legislation and zoning.",
        paragraphRef: "D",
        bandLevel: 8,
      },
      {
        num: 5,
        type: "matching_headings",
        question: "Choose the most suitable heading for paragraph E.",
        options: [
          "i. Modernist excesses and their critics",
          "ii. The garden city movement",
          "iii. Continuity with pre-industrial layouts",
          "iv. Public-health origins",
        ],
        expected: "i. Modernist excesses and their critics",
        explanation:
          "Paragraph E explicitly discusses high-modernist planning and its critique by Jacobs.",
        paragraphRef: "E",
        bandLevel: 8,
      },
      {
        num: 6,
        type: "mcq",
        question:
          "What was Ebenezer Howard's main contribution to urban planning?",
        options: [
          "A. Designing the boulevards of Paris",
          "B. Inventing zoning ordinances",
          "C. Proposing the garden-city concept",
          "D. Writing the 1909 Town Planning Act",
        ],
        expected: "C. Proposing the garden-city concept",
        explanation:
          "Paragraph C identifies Howard with the 'garden city' proposal in his 1898 essay.",
        paragraphRef: "C",
        bandLevel: 7,
      },
      {
        num: 7,
        type: "mcq",
        question:
          "According to the passage, what did Jane Jacobs argue?",
        options: [
          "A. That cars should be banned from cities",
          "B. That mixed-use streets and varied buildings produce vitality",
          "C. That all post-war housing was a success",
          "D. That zoning ordinances were progressive",
        ],
        expected:
          "B. That mixed-use streets and varied buildings produce vitality",
        explanation:
          "Paragraph E summarises her view: the very features planners tried to remove were the source of urban vitality.",
        paragraphRef: "E",
        bandLevel: 7,
      },
      {
        num: 8,
        type: "sentence_completion",
        question:
          "Cholera epidemics during the nineteenth century paid no respect to ____ or station. (one word)",
        expected: "wealth",
        explanation: "Paragraph B: 'paid no respect to wealth or station.'",
        paragraphRef: "B",
        bandLevel: 7,
      },
      {
        num: 9,
        type: "sentence_completion",
        question:
          "Howard's garden city was to be encircled by an inviolable ____ ____ . (two words)",
        expected: "green belt",
        explanation: "Paragraph C: 'an inviolable green belt'.",
        paragraphRef: "C",
        bandLevel: 7,
      },
      {
        num: 10,
        type: "summary_completion",
        question:
          "The first generation of professional planners drew on (A) ____ social theory and (B) ____ pragmatism. Choose two single words.",
        expected: ["utopian", "engineering"],
        explanation:
          "Paragraph C: 'utopian social theory and engineering pragmatism'.",
        paragraphRef: "C",
        bandLevel: 8,
      },
      {
        num: 11,
        type: "matching_information",
        question:
          "Which paragraph contains a description of physical separation as a planning device?",
        options: ["A", "B", "C", "D", "E", "F"],
        expected: "D",
        explanation:
          "Paragraph D describes zoning ordinances that 'separat[ed] residential, commercial and industrial uses'.",
        paragraphRef: "D",
        bandLevel: 8,
      },
      {
        num: 12,
        type: "short_answer",
        question:
          "What is described as the 'defining task' of the discipline in the decades to come? (no more than five words)",
        expected:
          "bridging the conceptual gap | bridge the conceptual gap | bottom-up vitality and top-down direction",
        explanation:
          "Paragraph F refers to bridging the gap 'between bottom-up vitality and top-down direction'.",
        paragraphRef: "F",
        bandLevel: 8,
      },
      {
        num: 13,
        type: "tfng",
        question:
          "Modern planning's tools have been entirely replaced since the high modernist era.",
        expected: "FALSE",
        explanation:
          "Paragraph F: 'the underlying tools of the profession… remain those of an era confident in the planner's capacity to design, from the top down…'",
        paragraphRef: "F",
        bandLevel: 7,
      },
    ],
  },
  {
    id: "rp-002",
    title: "Octopus Cognition",
    source: "Journal of Comparative Neurobiology",
    difficulty: "band8",
    topic: "science",
    paragraphs: [
      "A. The octopus has long captured the popular imagination, but the scientific community's appreciation of its cognitive abilities is comparatively recent. Cephalopods diverged from the lineage that produced vertebrates more than five hundred million years ago, and so any cognitive sophistication they exhibit must be regarded as having evolved independently. This makes the octopus a uniquely valuable subject for the study of intelligence: a kind of natural experiment in which the same outcome — the capacity for flexible problem-solving — has arisen along an entirely separate evolutionary path.",
      "B. Among the most remarkable features of cephalopod neurology is the distribution of the nervous system itself. Of the roughly 500 million neurons that compose the octopus's nervous system, fewer than half reside in the central brain. The remainder are distributed through the eight arms, each of which contains a substantial ganglion and is, to a considerable extent, capable of independent action. Experimental work in the 1990s demonstrated that severed arms continued to perform purposeful, exploratory movements for several minutes after separation; more recent studies suggest that an intact octopus uses central-brain control sparingly, delegating much of its motor planning to the arms themselves.",
      "C. This distributed architecture would, on its own, be a curiosity. What gives it broader significance is the pairing of decentralised control with what appears to be sophisticated central cognition. Octopuses can, under laboratory conditions, learn to open jars to obtain food, navigate mazes, and discriminate between visual patterns. Field observations have catalogued striking instances of apparent tool use: a 2009 study off the coast of Indonesia recorded individuals of the species Amphioctopus marginatus carrying coconut-shell halves, holding them under their bodies as they 'walked' across the seafloor on stiffened arms, and assembling them into protective shelters when threatened. The deliberate transport of an object for later use — particularly one that imposes a locomotor cost — has been described by some researchers as the strongest evidence yet of forward planning in an invertebrate.",
      "D. Equally compelling is the evidence for individual variation. Captive octopuses kept in identical conditions reliably develop distinct, observable temperaments: some are bold, others shy; some appear to recognise particular keepers and to behave differently towards them. Such individual variation is well-documented in vertebrates, where it is generally regarded as a marker of cognitive complexity. Whether the octopus's behaviour reflects truly individual personalities, or merely consistent statistical differences in response patterns, remains a matter of ongoing debate.",
      "E. A particularly intriguing aspect of cephalopod cognition concerns the role of the skin. The octopus is famed for its near-instantaneous changes of colour and texture, mediated by millions of pigment-containing chromatophores embedded in the dermis. Recent molecular work has shown that octopus skin contains the same opsin proteins that vertebrate eyes use to detect light. The implication — that the skin itself may possess a degree of light sensitivity, even pattern recognition — is consistent with the observation that colour-blind octopuses can produce camouflage that matches the colour of their surroundings. If confirmed, this would represent a form of distributed sensory processing without close parallel in any known vertebrate.",
      "F. Caution, however, is warranted. Anthropomorphic interpretation is a perennial hazard in cognitive ethology, and the temptation to read human-like deliberation into the behaviour of an animal so different in form is considerable. Several apparent feats of octopus problem-solving have, on closer inspection, turned out to be explicable in simpler associative terms. The proper question is therefore not whether the octopus is 'as intelligent as' a chimpanzee or a crow — a comparison that may be conceptually empty — but rather what kind of intelligence has emerged in this lineage, and what the existence of such an intelligence tells us about the conditions under which complex cognition arises in the natural world.",
      "G. To these scientific questions are now being added ethical ones. In 2021 the United Kingdom recognised cephalopods as sentient beings under animal-welfare legislation; the European Union's directive on animals used in research has done the same since 2010. As cephalopods continue to be the subject of laboratory work in fields from neuroscience to robotics, the protocols under which they are housed, manipulated and ultimately euthanised are coming under closer scrutiny. The octopus, in this respect, has joined the small but expanding club of animals whose welfare science has compelled us to consider seriously.",
    ],
    questions: [
      {
        num: 1,
        type: "tfng",
        question: "Cephalopods and vertebrates share a recent common ancestor.",
        expected: "FALSE",
        explanation:
          "Paragraph A: cephalopods diverged from the vertebrate lineage 'more than five hundred million years ago'.",
        paragraphRef: "A",
        bandLevel: 7,
      },
      {
        num: 2,
        type: "tfng",
        question:
          "The majority of an octopus's neurons are concentrated in its central brain.",
        expected: "FALSE",
        explanation:
          "Paragraph B: 'fewer than half reside in the central brain'.",
        paragraphRef: "B",
        bandLevel: 7,
      },
      {
        num: 3,
        type: "tfng",
        question:
          "The 2009 Indonesian study recorded octopuses carrying tools for later use.",
        expected: "TRUE",
        explanation:
          "Paragraph C: octopuses carrying coconut-shell halves and assembling them into shelters.",
        paragraphRef: "C",
        bandLevel: 7,
      },
      {
        num: 4,
        type: "tfng",
        question:
          "Researchers unanimously agree that the variations in octopus behaviour reflect distinct personalities.",
        expected: "FALSE",
        explanation:
          "Paragraph D states the matter 'remains a matter of ongoing debate'.",
        paragraphRef: "D",
        bandLevel: 8,
      },
      {
        num: 5,
        type: "ynng",
        question:
          "The author considers it pointless to compare octopus intelligence to that of a chimpanzee.",
        expected: "YES",
        explanation:
          "Paragraph F describes the comparison as 'conceptually empty'.",
        paragraphRef: "F",
        bandLevel: 8,
      },
      {
        num: 6,
        type: "ynng",
        question:
          "The author thinks the octopus's distributed nervous system is uninteresting.",
        expected: "NO",
        explanation:
          "Paragraph C states this 'distributed architecture would, on its own, be a curiosity' — uninteresting is the opposite of curiosity.",
        paragraphRef: "C",
        bandLevel: 7,
      },
      {
        num: 7,
        type: "matching_information",
        question:
          "Which paragraph mentions a legislative recognition of cephalopod sentience?",
        options: ["A", "B", "C", "D", "E", "F", "G"],
        expected: "G",
        explanation: "Paragraph G mentions UK 2021 and EU 2010 legislation.",
        paragraphRef: "G",
        bandLevel: 7,
      },
      {
        num: 8,
        type: "matching_information",
        question:
          "Which paragraph describes evidence that the skin itself may possess sensory abilities?",
        options: ["A", "B", "C", "D", "E", "F", "G"],
        expected: "E",
        explanation:
          "Paragraph E discusses opsin proteins and pattern recognition in skin.",
        paragraphRef: "E",
        bandLevel: 8,
      },
      {
        num: 9,
        type: "sentence_completion",
        question:
          "Octopus skin contains the same ____ proteins that vertebrate eyes use to detect light. (one word)",
        expected: "opsin",
        explanation: "Paragraph E.",
        paragraphRef: "E",
        bandLevel: 8,
      },
      {
        num: 10,
        type: "sentence_completion",
        question:
          "When threatened, the carrying octopus assembles the coconut-shell halves into a ____ ____ . (two words)",
        expected: "protective shelter",
        explanation: "Paragraph C: 'protective shelters'.",
        paragraphRef: "C",
        bandLevel: 7,
      },
      {
        num: 11,
        type: "summary_completion",
        question:
          "The author warns against (A) ____ interpretation, and proposes that the proper question concerns the (B) ____ of intelligence in this lineage. (one word each)",
        expected: ["anthropomorphic", "kind"],
        explanation:
          "Paragraph F: 'Anthropomorphic interpretation is a perennial hazard' and 'what kind of intelligence has emerged in this lineage'.",
        paragraphRef: "F",
        bandLevel: 9,
      },
      {
        num: 12,
        type: "mcq",
        question:
          "What does the passage suggest is the strongest evidence yet of forward planning in an invertebrate?",
        options: [
          "A. The octopus's near-instantaneous colour changes",
          "B. Distributed neurons throughout the arms",
          "C. The transport of coconut shells for later use",
          "D. Recognising particular human keepers",
        ],
        expected: "C. The transport of coconut shells for later use",
        explanation:
          "Paragraph C describes the deliberate transport for later use as the strongest evidence.",
        paragraphRef: "C",
        bandLevel: 8,
      },
      {
        num: 13,
        type: "short_answer",
        question:
          "Which two organisations have recognised cephalopods as sentient? (give country/organisation names, no more than three words each)",
        expected:
          "United Kingdom and European Union | UK and EU | UK and European Union",
        explanation: "Paragraph G.",
        paragraphRef: "G",
        bandLevel: 8,
      },
    ],
  },
  {
    id: "rp-003",
    title: "Why We Forget",
    source: "Cognitive Psychology Today",
    difficulty: "band7",
    topic: "psychology",
    paragraphs: [
      "A. Forgetting has, until recently, been treated as a deficiency — a failure of the apparatus by which the brain stores and retrieves information. Yet research over the last two decades has begun to overturn this view. Increasingly, forgetting is understood not as a passive loss but as an active, regulated process that is essential to adaptive cognition. The brain that remembered everything would be a brain incapable of generalisation, of decision-making, perhaps even of action. To understand why we forget, then, is to understand a great deal about why we are able to think.",
      "B. The classical analysis of forgetting was framed by the German psychologist Hermann Ebbinghaus, whose 1885 monograph reported the famous 'forgetting curve'. Ebbinghaus, working as his own subject, memorised lists of nonsense syllables and then tested himself at intervals; the resulting curve shows a steep decline in retention over the first hour, followed by a more gradual flattening over days and weeks. The curve has been replicated many times in the intervening century, but its interpretation has shifted: where Ebbinghaus took it to demonstrate the inevitable decay of an unrehearsed memory trace, today's researchers more often see in it the effect of accumulating interference from other, similar memories.",
      "C. Modern accounts of forgetting tend to distinguish at least three mechanisms. The first is decay: the gradual physical degradation of the synaptic connections in which memories are stored. The second is interference: as new memories form, they compete with older ones for retrieval, sometimes in ways that block the older trace. The third — perhaps the most counter-intuitive — is active erasure, in which specialised cellular machinery actively dismantles the traces of memories that the brain has, in effect, decided are no longer worth keeping.",
      "D. Evidence for active erasure has come from studies of a cellular process called long-term depression, the synaptic counterpart to long-term potentiation. Where potentiation strengthens a synapse and is the basis of memory formation, depression weakens or eliminates it. In a series of mouse studies in the 2010s, researchers demonstrated that interfering with the molecules responsible for depression caused mice to retain memories that, in normal circumstances, would have been forgotten. These animals were not better at remembering useful information; instead they were burdened by trivial detail and showed impaired performance on tasks requiring generalisation.",
      "E. The relationship between forgetting and learning is therefore subtler than the popular account suggests. To learn a category — say, what counts as a 'dog' — the brain must extract regularities across many encounters and discard the particularities of individual instances. Without forgetting, every Labrador, terrier and poodle would remain a separately encoded item, and 'dog' as a category could not be formed. Patients with hyperthymesia — a rare condition in which autobiographical detail is recalled with extraordinary fidelity — are not, on the whole, better at learning new skills or making decisions; if anything, they describe their memory as a burden.",
      "F. The story has practical consequences for educators. The traditional advice to revise material immediately and frequently, in order to combat the steepest part of the forgetting curve, is in tension with newer evidence on the value of 'desirable difficulties' — practices, such as spacing study sessions, that allow some forgetting to occur and that consequently demand the partial reconstruction of the memory at retrieval. Such reconstruction, the evidence suggests, leaves the memory in a more durable state than would frictionless rehearsal. The pedagogical lesson is paradoxical: it is precisely by allowing ourselves to forget a little that we secure the memory in the long term.",
    ],
    questions: [
      {
        num: 1,
        type: "tfng",
        question:
          "Forgetting was historically viewed as an active process essential to thinking.",
        expected: "FALSE",
        explanation:
          "Paragraph A states it was viewed as a 'deficiency' and a 'passive loss'.",
        paragraphRef: "A",
        bandLevel: 7,
      },
      {
        num: 2,
        type: "tfng",
        question:
          "Ebbinghaus's forgetting curve has not been reproduced since 1885.",
        expected: "FALSE",
        explanation:
          "Paragraph B: it 'has been replicated many times in the intervening century'.",
        paragraphRef: "B",
        bandLevel: 7,
      },
      {
        num: 3,
        type: "tfng",
        question:
          "Patients with hyperthymesia generally consider their memory advantageous.",
        expected: "FALSE",
        explanation: "Paragraph E: 'they describe their memory as a burden'.",
        paragraphRef: "E",
        bandLevel: 7,
      },
      {
        num: 4,
        type: "matching_headings",
        question: "Choose the most suitable heading for paragraph F.",
        options: [
          "i. Decay versus interference",
          "ii. Implications for teaching and learning",
          "iii. Evidence for active erasure",
          "iv. The classical view",
        ],
        expected: "ii. Implications for teaching and learning",
        explanation:
          "Paragraph F discusses revision strategies and 'desirable difficulties' for educators.",
        paragraphRef: "F",
        bandLevel: 8,
      },
      {
        num: 5,
        type: "matching_headings",
        question: "Choose the most suitable heading for paragraph C.",
        options: [
          "i. Three mechanisms of forgetting",
          "ii. The forgetting curve",
          "iii. Why generalisation matters",
          "iv. Forgetting in old age",
        ],
        expected: "i. Three mechanisms of forgetting",
        explanation:
          "Paragraph C distinguishes decay, interference, and active erasure.",
        paragraphRef: "C",
        bandLevel: 7,
      },
      {
        num: 6,
        type: "mcq",
        question:
          "The mice studies described in paragraph D demonstrated that, when active erasure was blocked,",
        options: [
          "A. mice remembered useful information more accurately",
          "B. mice were burdened by trivial detail and worse at generalising",
          "C. mice could no longer form new memories",
          "D. mice forgot more rapidly than normal",
        ],
        expected:
          "B. mice were burdened by trivial detail and worse at generalising",
        explanation:
          "Paragraph D explicitly states this: 'burdened by trivial detail and showed impaired performance on tasks requiring generalisation'.",
        paragraphRef: "D",
        bandLevel: 8,
      },
      {
        num: 7,
        type: "mcq",
        question:
          "What 'paradoxical' pedagogical lesson does paragraph F describe?",
        options: [
          "A. Frequent re-reading is the most effective study method",
          "B. Allowing some forgetting strengthens long-term memory",
          "C. Memory cannot be improved by practice",
          "D. Spacing makes no difference",
        ],
        expected:
          "B. Allowing some forgetting strengthens long-term memory",
        explanation: "Paragraph F directly states this paradox.",
        paragraphRef: "F",
        bandLevel: 8,
      },
      {
        num: 8,
        type: "sentence_completion",
        question:
          "Long-term depression weakens synapses; long-term ____ strengthens them. (one word)",
        expected: "potentiation",
        explanation: "Paragraph D.",
        paragraphRef: "D",
        bandLevel: 8,
      },
      {
        num: 9,
        type: "sentence_completion",
        question:
          "The brain extracts ____ across many encounters and discards the particulars of individual instances. (one word)",
        expected: "regularities",
        explanation: "Paragraph E.",
        paragraphRef: "E",
        bandLevel: 8,
      },
      {
        num: 10,
        type: "summary_completion",
        question:
          "Modern researchers see Ebbinghaus's curve less as evidence of (A) ____ and more as the effect of (B) ____ from other memories. (one word each)",
        expected: ["decay", "interference"],
        explanation: "Paragraph B describes the shift in interpretation.",
        paragraphRef: "B",
        bandLevel: 8,
      },
      {
        num: 11,
        type: "matching_information",
        question:
          "Which paragraph contains the claim that the brain that remembered everything could not act?",
        options: ["A", "B", "C", "D", "E", "F"],
        expected: "A",
        explanation:
          "Paragraph A: 'a brain incapable of generalisation, of decision-making, perhaps even of action.'",
        paragraphRef: "A",
        bandLevel: 7,
      },
      {
        num: 12,
        type: "short_answer",
        question:
          "What term describes the cellular process responsible for active erasure of memories? (no more than three words)",
        expected: "long-term depression",
        explanation: "Paragraph D.",
        paragraphRef: "D",
        bandLevel: 8,
      },
      {
        num: 13,
        type: "tfng",
        question: "Hermann Ebbinghaus tested only other people, not himself.",
        expected: "FALSE",
        explanation: "Paragraph B: 'working as his own subject'.",
        paragraphRef: "B",
        bandLevel: 7,
      },
    ],
  },
];
