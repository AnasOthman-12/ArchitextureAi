
import { GoogleGenAI, Modality, GenerateContentResponse } from '@google/genai';

if (!process.env.API_KEY) {
  console.warn("API_KEY environment variable not set. AI features will not work.");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY, vertexai: true });

export const generateRender = async (
  base64Image: string,
  mimeType: string,
  prompt: string
): Promise<{ imageUrl: string; text: string }> => {
  try {
    const imagePart = {
      inlineData: {
        data: base64Image,
        mimeType: mimeType,
      },
    };

    const textPart = {
      text: prompt,
    };

    const response: GenerateContentResponse = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image-preview',
      contents: {
        role: 'user',
        parts: [imagePart, textPart],
      },
      config: {
        responseModalities: [Modality.IMAGE, Modality.TEXT],
      },
    });

    let generatedImageUrl = '';
    let generatedText = 'Render complete. No additional text was generated.';

    if (response.candidates && response.candidates.length > 0) {
      for (const part of response.candidates[0].content.parts) {
        if (part.inlineData) {
          const base64ImageBytes: string = part.inlineData.data;
          generatedImageUrl = `data:${part.inlineData.mimeType};base64,${base64ImageBytes}`;
        } else if (part.text) {
          generatedText = part.text;
        }
      }
    }

    if (!generatedImageUrl) {
      throw new Error('API did not return an image. Please try a different prompt or image.');
    }

    return { imageUrl: generatedImageUrl, text: generatedText };
  } catch (error) {
    console.error('Error generating render with Gemini API:', error);
    if (error instanceof Error) {
        throw new Error(`Failed to generate render: ${error.message}`);
    }
    throw new Error('An unknown error occurred while generating the render.');
  }
};
