import { GoogleGenerativeAI } from "@google/generative-ai";

export function hasGemini() {
  return Boolean(process.env.GEMINI_API_KEY);
}

let _client: GoogleGenerativeAI | null = null;
function client() {
  if (!_client) {
    if (!process.env.GEMINI_API_KEY) {
      throw new Error("GEMINI_API_KEY is not set");
    }
    _client = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
  }
  return _client;
}

export async function geminiJson<T>(prompt: string): Promise<T> {
  const model = client().getGenerativeModel({
    model: "gemini-1.5-flash",
    generationConfig: {
      temperature: 0.4,
      responseMimeType: "application/json",
    },
  });
  const result = await model.generateContent(prompt);
  const text = result.response.text();
  return JSON.parse(text) as T;
}

export async function geminiText(prompt: string): Promise<string> {
  const model = client().getGenerativeModel({
    model: "gemini-1.5-flash",
    generationConfig: { temperature: 0.5 },
  });
  const result = await model.generateContent(prompt);
  return result.response.text();
}
