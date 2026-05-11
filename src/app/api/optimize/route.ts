import { NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export async function POST(req: Request) {
  try {
    const { resume, jobDescription, role, skills } = await req.json();

    if (!resume || !jobDescription || !role) {
      return NextResponse.json(
        { error: "Resume, Job Description, and Target Role are required." },
        { status: 400 }
      );
    }

    const skillsContext = skills && skills.length > 0 
      ? `\nThe user also specifically highlighted these skills they possess: ${skills.join(", ")}\nPlease factor these into the analysis.` 
      : "";

    const prompt = `
You are an elite Executive Recruiter, ATS Systems Expert, and Career Coach.
Your task is to deeply analyze a user's resume against a specific Job Description and target role.

You must return the result as a raw JSON object (without any markdown formatting like \`\`\`json) with the exact following structure:
{
  "atsScore": 85, // A number between 0 and 100 representing how well the resume matches the Job Description.
  "atsScoreCategory": "Good", // Must be exactly one of: "Poor", "Average", "Good", "Excellent".
  "scoreAnalysis": {
    "keywordMatch": "Analysis of how well their keywords match the specific Job Description requirements.",
    "formatting": "Brief analysis of their resume's formatting for ATS parsers.",
    "missingSkills": "Analysis of major skills required by the JD that are missing from the resume.",
    "overall": "A 1-2 sentence overall summary of their match."
  },
  "strengths": ["Strength 1", "Strength 2"], // 2-3 areas where the resume strongly aligns with the JD.
  "interviewChance": "High", // A short qualitative string, e.g., "High", "Medium", "Low", or "80%".
  "interviewReadiness": "Feedback on how ready they are for an interview based on the JD requirements.",
  "feedback": ["Recruiter tip 1", "Recruiter tip 2", "Recruiter tip 3"], // 3 actionable tips for improvement based on the JD.
  "missingKeywords": ["Keyword 1", "Keyword 2"], // Array of missing keywords specifically found in the JD.
  "weakSections": ["Section 1 name", "Section 2 name"], // Array of resume sections that need improvement.
  "improvementChecklist": ["Step 1 to improve", "Step 2 to improve", "Step 3 to improve"], // 3-5 step-by-step actionable items to align perfectly with the JD.
  "optimizedResume": "A full, professional rewrite of their resume tailored precisely to the Job Description. Format with clear headings, bullet points, and spacing.",
  "linkedinAbout": "A compelling, first-person LinkedIn About section (2-3 paragraphs) highlighting their fit for this specific type of role.",
  "skills": ["Skill 1", "Skill 2"], // Array of 8-12 highly relevant keywords/skills extracted from the JD that the user should add.
  "achievements": ["Achievement 1", "Achievement 2"] // Array of 3-5 high-impact, quantifiable bullet points tailored to the JD requirements.
}

Here is the user's current resume/profile information:
---
${resume}
---

Here is the Job Description they are applying for:
---
${jobDescription}
---

Here is the target role title:
---
${role}
---${skillsContext}

Analyze the gaps critically. Be professional, direct, and persuasive in the optimized content. Provide the raw JSON only.
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
