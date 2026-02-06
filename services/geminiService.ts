
import { GoogleGenAI, Type } from "@google/genai";

// Always use the direct process.env.API_KEY and correct initialization format.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateMarketingCampaign = async (topic: string) => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Generate a high-end marketing campaign title, subtitle, and primary call-to-action for a luxury brand. Theme: ${topic}. 
      Return format: 
      Title: [Text]
      Subtitle: [Text]
      CTA: [Text]`,
    });
    // Access .text property directly as per guidelines.
    return response.text || "Failed to generate campaign.";
  } catch (error) {
    return "Error generating marketing copy.";
  }
};

export const generateProductDescription = async (productName: string, category: string, features: string[]) => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Write a compelling, professional e-commerce product description for "${productName}" in the "${category}" category. Key features: ${features.join(', ')}.`,
    });
    return response.text || "Failed to generate description.";
  } catch (error) {
    return "Error generating content.";
  }
};

export const generateProductImage = async (prompt: string) => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: { parts: [{ text: `A professional, studio-quality product photograph of ${prompt}, clean white background, 4k, cinematic lighting.` }] },
      config: { imageConfig: { aspectRatio: "1:1" } }
    });
    
    // Iterate through parts to find the image as per guidelines.
    for (const part of response.candidates?.[0]?.content?.parts || []) {
      if (part.inlineData) {
        return `data:image/png;base64,${part.inlineData.data}`;
      }
    }
    return null;
  } catch (error) {
    return null;
  }
};

export const analyzeImageForSearch = async (base64Image: string, inventory: string) => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: {
        parts: [
          { inlineData: { data: base64Image, mimeType: 'image/jpeg' } },
          { text: `Analyze this image. Based on our inventory: [${inventory}], which product is most similar? Explain why.` }
        ]
      }
    });
    return response.text || "No similar products found.";
  } catch (error) {
    return "Visual search unavailable.";
  }
};

export const getShoppingAssistantResponse = async (query: string, availableProducts: string) => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `You are a helpful shopping assistant for Lumina Luxe. Inventory: ${availableProducts}. User: ${query}.`,
    });
    return response.text || "I'm sorry, I couldn't process that.";
  } catch (error) {
    return "Offline.";
  }
};
