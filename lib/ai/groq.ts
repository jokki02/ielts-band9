import Groq from "groq-sdk";

export function hasGroq() {
  return Boolean(process.env.GROQ_API_KEY);
}

let _client: Groq | null = null;
function client() {
  if (!_client) {
    if (!process.env.GROQ_API_KEY) {
      throw new Error("GROQ_API_KEY is not set");
    }
    _client = new Groq({ apiKey: process.env.GROQ_API_KEY });
  }
  return _client;
}

export async function groqJson<T>(prompt: string): Promise<T> {
  const completion = await client().chat.completions.create({
    model: "llama-3.3-70b-versatile",
    messages: [
      {
        role: "system",
        content:
          "You are an expert IELTS examiner. You respond ONLY with valid JSON.",
      },
      { role: "user", content: prompt },
    ],
    temperature: 0.4,
    response_format: { type: "json_object" },
  });
  const text = completion.choices[0]?.message?.content || "{}";
  return JSON.parse(text) as T;
}

export async function groqText(prompt: string): Promise<string> {
  const completion = await client().chat.completions.create({
    model: "llama-3.3-70b-versatile",
    messages: [{ role: "user", content: prompt }],
    temperature: 0.5,
  });
  return completion.choices[0]?.message?.content || "";
}
