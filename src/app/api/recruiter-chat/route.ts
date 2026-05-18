import { NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";
import { auth } from "@clerk/nextjs/server";

export const maxDuration = 30; // 30 seconds for chat

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export async function POST(req: Request) {
  try {
    const { userId } = await auth();
    const { history, message, context } = await req.json();

    if (!message) {
      return NextResponse.json(
        { error: "Message is required." },
        { status: 400 }
      );
    }

    const systemInstruction = `
You are an expert AI recruiter conducting a screening interview with a candidate based on their resume.
Here is some initial analysis about their resume:
- First Impression: ${context?.firstImpression || "Neutral"}
- Likely Concerns: ${context?.likelyConcerns?.join(", ") || "None"}
- Rejection Risks: ${context?.rejectionRisks?.join(", ") || "None"}

Your goal is to simulate a realistic, professional, and slightly conversational screening interview.
Ask targeted questions about their experience, probe into their likely concerns, and evaluate their responses.
Keep your responses concise (1-3 short paragraphs max). Act like a real person. 
Do NOT act like an AI or use robotic phrases.
`;

    let contents = [];
    if (history && history.length > 0) {
      contents = history.map((msg: any) => ({
        role: msg.role === 'ai' ? 'model' : 'user',
        parts: [{ text: msg.text }]
      }));
    }
    
    contents.push({
      role: 'user',
      parts: [{ text: message }]
    });

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: contents,
      config: {
        systemInstruction: systemInstruction
      }
    });

    const text = response.text;
    if (!text) {
      throw new Error("No response generated from AI.");
    }

    return NextResponse.json({ reply: text });
  } catch (error: any) {
    console.error("Error in recruiter chat:", error);
    return NextResponse.json(
      { error: error.message || "Failed to generate recruiter response." },
      { status: 500 }
    );
  }
}
