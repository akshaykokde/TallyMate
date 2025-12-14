import { GoogleGenAI, GenerateContentResponse } from "@google/genai";
import { getFinancialSummary, mockLedgers, mockVouchers, mockStock } from './mockData';

const getAiClient = () => {
  if (!process.env.API_KEY) {
    throw new Error("API Key is missing");
  }
  return new GoogleGenAI({ apiKey: process.env.API_KEY });
};

// Construct a context string for the AI to understand the business data
const getDataContext = () => {
  const summary = getFinancialSummary();
  return JSON.stringify({
    summary,
    topLedgers: mockLedgers.slice(0, 5),
    recentVouchers: mockVouchers.slice(0, 10),
    lowStock: mockStock.filter(s => s.quantity < 5)
  });
};

export const chatWithBusinessData = async (userMessage: string): Promise<string> => {
  try {
    const ai = getAiClient();
    const dataContext = getDataContext();
    
    const systemPrompt = `
      You are an intelligent financial assistant for TallyMate. 
      You have access to the following business data summary in JSON format:
      ${dataContext}

      Answer the user's questions specifically based on this data.
      If asked about "Sales", refer to the salesTotal or recent sales vouchers.
      If asked about "Outstanding", refer to receivables and debtors.
      If asked about "Stock", refer to low stock or specific items.
      
      Keep answers concise, professional, and actionable. 
      If the user asks something outside this data, politely say you only have access to the current dashboard snapshot.
    `;

    const response: GenerateContentResponse = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: userMessage,
      config: {
        systemInstruction: systemPrompt,
      },
    });

    return response.text || "I couldn't generate a response.";
  } catch (error) {
    console.error("Gemini Chat Error:", error);
    return "Sorry, I'm having trouble connecting to the AI service right now.";
  }
};

export const analyzeBillImage = async (base64Image: string): Promise<string> => {
  try {
    const ai = getAiClient();
    
    // We want structured data extracted
    const prompt = "Analyze this image. It is likely an invoice or bill. Extract the Vendor Name, Invoice Date, Invoice Number, and Total Amount. Format the output as a clean JSON string only.";

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash', // Flash supports multimodal input
      contents: {
        parts: [
          { inlineData: { mimeType: 'image/png', data: base64Image } },
          { text: prompt }
        ]
      }
    });

    return response.text || "Could not extract data.";
  } catch (error) {
    console.error("Gemini Vision Error:", error);
    return "Failed to analyze image.";
  }
};

export const getSmartInsights = async (): Promise<string> => {
  try {
    const ai = getAiClient();
    const dataContext = getDataContext();
    
    const prompt = `
      Based on this financial data: ${dataContext}
      Provide 3 brief, bullet-pointed insights or alerts for the business owner. 
      Focus on cash flow, overdue payments, or low stock.
      Example: "- Customer X is overdue by 5 days."
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });

    return response.text || "No insights available.";
  } catch (error) {
    return "Insights temporarily unavailable.";
  }
};