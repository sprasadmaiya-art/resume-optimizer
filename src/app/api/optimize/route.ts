import { NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";

// Initialize the Google Gen AI client
// It automatically picks up GEMINI_API_KEY from environment variables
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export async function POST(req: Request) {
  try {
    const { resume, role } = await req.json();

    if (!resume || !role) {
      return NextResponse.json(
        { error: "Resume and role are required." },
        { status: 400 }
      );
    }

    const prompt = `
You are an expert career coach and professional resume writer.
Your task is to optimize a user's resume for a specific target role.
You must return the result as a raw JSON object (without any markdown formatting like \`\`\`json) with the exact following structure:
{
  "optimizedResume": "A full, professional rewrite of their resume tailored to the target role. Format with clear headings, bullet points, and spacing.",
  "linkedinAbout": "A compelling, first-person LinkedIn About section (2-3 paragraphs) highlighting their fit for the target role.",
  "skills": ["Skill 1", "Skill 2", "Skill 3"], // Array of 8-12 highly relevant keywords/skills for ATS optimization
  "achievements": ["Achievement 1", "Achievement 2"] // Array of 3-5 high-impact, quantifiable bullet points they can add to their experience
}

Here is the user's current resume/profile information:
---
${resume}
---

Here is the target role they are applying for:
---
${role}
---

Ensure the tone is professional, confident, and persuasive. Provide the raw JSON only.
`;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
      }
    });

    const text = response.text;
    if (!text) {
      throw new Error("No response generated from AI.");
    }

    // Attempt to parse the JSON
    let parsedData;
    try {
      parsedData = JSON.parse(text);
    } catch (parseError) {
      console.error("Failed to parse JSON response:", text);
      throw new Error("The AI returned an invalid response format.");
    }

    return NextResponse.json(parsedData);
  } catch (error: any) {
    console.error("Error optimizing resume:", error);
    return NextResponse.json(
      { error: error.message || "Failed to optimize resume." },
      { status: 500 }
    );
  }
}
