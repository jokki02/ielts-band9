import { PageWrapper, PageHeader } from "@/components/layout/PageWrapper";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

interface SourceEntry {
  module: string;
  name: string;
  url: string;
  licence: string;
  description: string;
}

const SOURCES: { group: string; items: SourceEntry[] }[] = [
  {
    group: "Vocabulary",
    items: [
      {
        module: "Vocabulary",
        name: "Coxhead Academic Word List (AWL)",
        url: "https://www.wgtn.ac.nz/lals/resources/academicwordlist",
        licence: "Public research output (free academic use)",
        description:
          "570 word families across 10 sublists. Coxhead, A. (2000). 'A New Academic Word List', TESOL Quarterly 34(2): 213–238. The AWL is the standard vocabulary reference for IELTS, EAP and TOEFL preparation.",
      },
      {
        module: "Vocabulary",
        name: "Wiktionary (definitions and examples)",
        url: "https://en.wiktionary.org/",
        licence: "CC-BY-SA 4.0",
        description:
          "Definitions, parts of speech, and example sentences for each AWL entry are sourced from Wiktionary, which releases its content under the Creative Commons Attribution-ShareAlike 4.0 licence.",
      },
    ],
  },
  {
    group: "Reading",
    items: [
      {
        module: "Reading",
        name: "Wikipedia (academic passages)",
        url: "https://en.wikipedia.org/",
        licence: "CC-BY-SA 4.0",
        description:
          "10 IELTS-length academic passages adapted from Wikipedia featured/good articles (Photosynthesis, Industrial Revolution, Climate Change, etc.). Each passage cites its source URL; comprehension questions are written to match the passage text verbatim.",
      },
    ],
  },
  {
    group: "Listening",
    items: [
      {
        module: "Listening",
        name: "TED-Ed",
        url: "https://ed.ted.com/",
        licence: "CC-BY-NC-ND 4.0 (embedded via official YouTube player)",
        description:
          "Real, professionally recorded TED-Ed lessons embedded via the official YouTube no-cookie player. Transcripts are reproduced verbatim from the public TED-Ed transcript pages. Listening questions follow IELTS Section 4 conventions.",
      },
    ],
  },
  {
    group: "Writing — Task 1 & Task 2",
    items: [
      {
        module: "Writing",
        name: "IELTS Updates and Recent Exams",
        url: "https://www.ieltsupdatesandrecentexams.com/",
        licence: "Reported exam questions (factual record, not copyrightable)",
        description:
          "Student-shared reports of real IELTS sittings around the world (2024). Used as the primary source for Task 1 chart/map prompts and a portion of Task 2 essay prompts.",
      },
      {
        module: "Writing",
        name: "IELTS Liz — 100 IELTS Essay Questions",
        url: "https://ieltsliz.com/ielts-writing-task-2/100-ielts-essay-questions/",
        licence: "Public archive of reported exam questions",
        description:
          "Curated archive of 100+ reported Task 2 essay questions, organised by topic. Used as a primary source of authentic Task 2 prompts.",
      },
      {
        module: "Writing",
        name: "IELTS Liz — Task 2 Topics 2024",
        url: "https://ieltsliz.com/ielts-writing-task-2-essay-topics-2024/",
        licence: "Public archive of reported exam questions",
        description:
          "Recent (2024) reported Task 2 prompts compiled from real test sittings.",
      },
    ],
  },
  {
    group: "Tips & Strategy",
    items: [
      {
        module: "Tips",
        name: "British Council — Take IELTS",
        url: "https://takeielts.britishcouncil.org/prepare",
        licence: "Free preparation guidance, paraphrased with attribution",
        description:
          "Official British Council preparation portal. Tips on planning, accent exposure, transfer time, and exam-day logistics are paraphrased from the British Council preparation pages and 'Top IELTS Tips' articles.",
      },
      {
        module: "Tips",
        name: "British Council — Top IELTS Tips (Reading & Writing)",
        url: "https://www.britishcouncil.org.tw/en/english/exam-preparation/ielts-tips/improve-reading-writing",
        licence: "Free preparation guidance, paraphrased with attribution",
        description:
          "Source for several Reading and Writing tips: skipping hard questions, no specialist knowledge needed, no extra reading transfer time, careful spelling and singular/plural.",
      },
      {
        module: "Tips",
        name: "IDP IELTS — Writing Task 2 overview",
        url: "https://ielts.idp.com/uae/about/news-and-articles/article-how-to-understand-task-2-writing-questions",
        licence: "Free preparation guidance, paraphrased with attribution",
        description:
          "Source for Task 2 framing: read the question carefully, avoid memorised answers, write to the prompt rather than to a category.",
      },
      {
        module: "Tips",
        name: "IDP IELTS — Easy ways to structure your IELTS academic writing tasks",
        url: "https://ielts.idp.com/prepare/article-easy-ways-to-structure-your-ielts-academic-writing-tasks",
        licence: "Free preparation guidance, paraphrased with attribution",
        description:
          "Source for paragraphing structure, intro / body / conclusion patterns, and the importance of a separate Task 1 overview paragraph.",
      },
      {
        module: "Tips",
        name: "Cambridge English — IELTS preparation",
        url: "https://www.cambridgeenglish.org/exams-and-tests/ielts/preparation/",
        licence: "Free preparation guidance, paraphrased with attribution",
        description:
          "Official Cambridge guidance on time management, transfer-error avoidance, and word-limit rules.",
      },
      {
        module: "Tips",
        name: "IELTS Liz",
        url: "https://ieltsliz.com/",
        licence: "Free preparation blog, paraphrased with attribution",
        description:
          "Former-examiner blog with band-9 strategy notes — used as a source for collocation advice, distractor handling, and topic-sheet vocabulary practice.",
      },
      {
        module: "Tips",
        name: "IELTS Simon",
        url: "https://ielts-simon.com/",
        licence: "Free preparation blog, paraphrased with attribution",
        description:
          "Former-examiner blog with Band-9 model essays. Source for word-count guidance and advanced grammar markers (inversions, complex structures).",
      },
    ],
  },
  {
    group: "AI grading (essay & speaking analysis)",
    items: [
      {
        module: "Grading",
        name: "Google AI Studio — Gemini API",
        url: "https://ai.google.dev/",
        licence: "Free tier; provider terms apply",
        description:
          "Essay and speaking samples are analysed by Google's Gemini Flash model against the four official IELTS band descriptors. The system prompt is grounded in the public Cambridge IELTS Band Descriptors. If the Gemini key is unavailable, a deterministic local heuristic grader is used as a fallback.",
      },
    ],
  },
];

export default function SourcesPage() {
  return (
    <PageWrapper>
      <PageHeader
        title="Sources & Attributions"
        description="Every passage, audio file, prompt, vocabulary card and tip in this app comes from a real, openly-licensed academic source. This page lists each one with its licence and original URL."
      />
      <div className="space-y-6">
        {SOURCES.map((group) => (
          <Card key={group.group}>
            <CardHeader>
              <CardTitle className="text-base">{group.group}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {group.items.map((s) => (
                <div
                  key={s.name}
                  className="rounded-lg border border-border/60 bg-muted/20 p-3 space-y-2"
                >
                  <div className="flex flex-wrap items-start justify-between gap-2">
                    <div>
                      <Link
                        href={s.url}
                        target="_blank"
                        rel="noreferrer noopener"
                        className="text-sm font-medium underline hover:text-primary"
                      >
                        {s.name}
                      </Link>
                      <div className="text-[11px] text-muted-foreground mt-0.5 break-all">
                        {s.url}
                      </div>
                    </div>
                    <Badge variant="muted" className="shrink-0">
                      {s.licence}
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    {s.description}
                  </p>
                </div>
              ))}
            </CardContent>
          </Card>
        ))}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Notes on copyright</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-xs text-muted-foreground leading-relaxed">
            <p>
              Where source material is licensed under Creative Commons (CC-BY,
              CC-BY-SA, CC-BY-NC-ND), we comply with the attribution and
              share-alike conditions: the original work is identified, the
              author is credited, the licence is named, and a link to the
              licensed copy is provided.
            </p>
            <p>
              Reported IELTS exam questions are factual records of public test
              sittings and are not themselves copyrightable; we still credit the
              archive that compiled each report.
            </p>
            <p>
              TED-Ed videos remain the property of TED Conferences LLC and are
              embedded via the official YouTube no-cookie player rather than
              being downloaded or redistributed. Transcripts are reproduced
              verbatim from the public TED-Ed transcript pages for
              educational purposes.
            </p>
            <p>
              If you are a rights-holder and believe any item is misattributed
              or used outside its licence, please open an issue on the project
              repository.
            </p>
          </CardContent>
        </Card>
      </div>
    </PageWrapper>
  );
}
