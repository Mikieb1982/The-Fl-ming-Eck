
import { GoogleGenAI, Type } from "@google/genai";

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

export async function generateImage(prompt: string): Promise<string> {
    try {
        const response = await ai.models.generateImages({
            model: 'imagen-4.0-generate-001',
            prompt: prompt,
            config: {
              numberOfImages: 1,
              outputMimeType: 'image/jpeg',
              aspectRatio: '16:9',
            },
        });
        
        const base64ImageBytes = response.generatedImages[0].image.imageBytes;
        return `data:image/jpeg;base64,${base64ImageBytes}`;

    } catch (error) {
        console.error("Error generating image:", error);
        throw new Error("Failed to generate image. The model may be unavailable or the request timed out.");
    }
}

export async function moderateContent(text: string): Promise<{isAppropriate: boolean; reason: string}> {
    try {
        const prompt = `
          You are a content moderator for a small, local community forum for a town in Germany with many English-speaking residents.
          Your goal is to keep the discussion friendly, respectful, and on-topic (local events, community life, guides, history).
          Analyze the following text and determine if it is appropriate based on the rules.

          Rules for inappropriate content:
          - Hate speech, racism, sexism, or any form of discrimination.
          - Personal attacks, harassment, or bullying.
          - Spam, advertisements, or self-promotion.
          - Profanity or vulgar language.
          - Illegal content or activities.
          - Off-topic content that is completely unrelated to local life in the Fläming region.

          Text to analyze:
          "${text}"
        `;

        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                responseSchema: {
                    type: Type.OBJECT,
                    properties: {
                        isAppropriate: { type: Type.BOOLEAN, description: 'Whether the content is appropriate or not.' },
                        reason: { type: Type.STRING, description: 'A brief, user-friendly reason if inappropriate.' },
                    },
                    required: ["isAppropriate", "reason"],
                }
            }
        });

        const result = JSON.parse(response.text.trim());
        return result;

    } catch (error) {
        console.error("Error moderating content:", error);
        // Fail open for better user experience, but log the issue.
        return { isAppropriate: true, reason: 'Moderation check failed.' };
    }
}

export async function generateTopicSuggestion(): Promise<string> {
    try {
        const prompt = `You are an AI assistant for a local digital magazine for Bad Belzig and the Hoher Fläming region in Germany.
        Generate a single, friendly, and engaging conversation starter topic for the community forum.
        The topic should be about local life, culture, history, or events in the region.
        Keep it concise, under 20 words.
        
        Example topics:
        - What's the best hidden spot in the Hoher Fläming Nature Park?
        - If you could add one new shop to Bad Belzig's old town, what would it be?
        - What's your favorite memory from a past Altstadtsommer festival?

        Generate a new one now.`;

        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
        });

        return response.text.trim().replace(/"/g, ''); // Remove quotes if the model adds them

    } catch (error) {
        console.error("Error generating topic suggestion:", error);
        return "What's your favorite place to visit in the region?";
    }
}