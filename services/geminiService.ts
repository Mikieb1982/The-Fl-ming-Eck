
import { GoogleGenAI } from "@google/genai";

if (!process.env.API_KEY) {
  // In a real app, this would be handled more gracefully,
  // but for this context, we'll throw an error.
  // The environment is expected to provide the API key.
  console.warn("API_KEY environment variable is not set. AI features will not work.");
}

// FIX: Per coding guidelines, initialize with apiKey from process.env without a fallback.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export async function generateSummary(articleBody: string): Promise<string> {
    // FIX: Removed redundant API key check. The environment is assumed to be configured correctly.
    try {
        const prompt = `Summarize the following article for a 'Too Long; Didn't Read' section. Keep it to one concise paragraph. Article:\n\n${articleBody}`;

        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
        });
        
        return response.text.trim();

    } catch (error) {
        console.error("Error generating summary:", error);
        throw new Error("Failed to generate summary. The model may be unavailable or the request timed out.");
    }
}
