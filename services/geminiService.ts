import { GoogleGenAI, Type } from "@google/genai";
import { Business, SearchResult } from '../types';

const apiKey = process.env.API_KEY || '';
const ai = new GoogleGenAI({ apiKey });

export const searchDirectoryWithAI = async (query: string, businesses: Business[]): Promise<SearchResult> => {
  // Fallback: Client-side keyword search if no API key is present
  if (!apiKey) {
    const lowerQuery = query.toLowerCase();
    const matches = businesses.filter(b => 
      b.name.toLowerCase().includes(lowerQuery) || 
      b.description.toLowerCase().includes(lowerQuery) ||
      b.category.toLowerCase().includes(lowerQuery) ||
      b.address.toLowerCase().includes(lowerQuery)
    );
    
    return {
      text: matches.length > 0 
        ? `I found ${matches.length} results matching "${query}".` 
        : `No results found for "${query}". Try searching for something else.`,
      recommendedIds: matches.map(b => b.id)
    };
  }

  // Create a simplified context of the directory for the AI using the passed data
  const directoryContext = businesses.map(b => ({
    id: b.id,
    name: b.name,
    category: b.category,
    description: b.description,
    address: b.address
  }));

  const prompt = `
    You are a helpful assistant for the Taungoo City Directory website.
    User Query: "${query}"
    
    Here is the database of businesses:
    ${JSON.stringify(directoryContext)}
    
    1. Identify which businesses are most relevant to the user's query.
    2. Provide a helpful, short response in Burmese (or English if the query is English) summarizing the recommendations.
    3. Return the IDs of the matching businesses.
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            responseText: {
              type: Type.STRING,
              description: 'A helpful response to the user explaining the recommendations.',
            },
            businessIds: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: 'List of matching business IDs.',
            },
          },
        },
      },
    });

    const jsonText = response.text;
    if (!jsonText) throw new Error("No response from AI");

    const result = JSON.parse(jsonText);
    
    return {
      text: result.responseText,
      recommendedIds: result.businessIds || []
    };

  } catch (error) {
    console.error("Gemini Search Error:", error);
    
    // Fallback on error (e.g. quota exceeded) to basic keyword search
    const lowerQuery = query.toLowerCase();
    const matches = businesses.filter(b => 
      b.name.toLowerCase().includes(lowerQuery) || 
      b.description.toLowerCase().includes(lowerQuery) ||
      b.category.toLowerCase().includes(lowerQuery)
    );

    return {
      text: "I'm having trouble connecting to AI, but here are some matches from our database.",
      recommendedIds: matches.map(b => b.id)
    };
  }
};