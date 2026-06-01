import { NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";
import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";

// Allow longer execution time for the massive prompt (Vercel specific)
export const maxDuration = 60;

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export async function POST(req: Request) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json(
        { error: "User must be logged in to generate optimizations." },
        { status: 401 }
      );
    }

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
You are an elite Career Intelligence AI. Your role encompasses being an Expert ATS system, an Executive Recruiter, a Technical Interviewer, and a Career Strategist.
Your task is to deeply analyze a user's resume against a specific Job Description and target role.

You must return the result as a raw JSON object (without any markdown formatting like \`\`\`json) with the exact following structure:
{
  "match": {
    "atsScore": 85,
    "atsScoreCategory": "Good",
    "jobMatchPercentage": 80,
    "skillStrengthScore": 75,
    "missingSkills": ["Skill 1", "Skill 2"],
    "matchingSkills": ["Skill 3", "Skill 4"],
    "strengths": ["Strength 1", "Strength 2"],
    "weakAreas": ["Weakness 1", "Weakness 2"],
    "recommendedImprovements": ["Action 1", "Action 2"]
  },
  "recruiterSimulator": {
    "firstImpression": "A 1-2 sentence honest first impression a recruiter would have.",
    "likelyConcerns": ["Concern 1", "Concern 2"],
    "readabilityFeedback": "Feedback on formatting, density, and ease of scanning.",
    "scanningBehavior": "What a recruiter's eyes will gravitate to first on this resume.",
    "noticesFirst": ["Detail 1", "Detail 2"],
    "rejectionRisks": ["Risk 1", "Risk 2"]
  },
  "interviewPrep": {
    "difficultyScore": 8,
    "readinessPercentage": 65,
    "technicalQuestions": ["Question 1", "Question 2"],
    "hrQuestions": ["Question 1", "Question 2"],
    "projectQuestions": ["Question 1", "Question 2"],
    "weakAreaQuestions": ["Question 1", "Question 2"],
    "confidenceTips": ["Tip 1", "Tip 2"]
  },
  "careerRecommendations": {
    "suitableRoles": ["Role 1", "Role 2"],
    "highDemandSkills": ["Skill 1", "Skill 2"],
    "careerGrowthSuggestions": ["Suggestion 1", "Suggestion 2"],
    "recommendedCertifications": ["Cert 1", "Cert 2"],
    "salaryGrowthSuggestions": "Advice on how to position themselves for higher compensation.",
    "learningRoadmap": ["Step 1", "Step 2", "Step 3"],
    "suggestedCareerPaths": ["Path 1", "Path 2"],
    "mostValuableSkillNext": "The single most impactful skill they should learn tomorrow."
  },
  "optimization": {
    "optimizedResume": "A full, professional rewrite of their resume tailored precisely to the Job Description. Use powerful action verbs and quantify achievements.",
    "linkedinAbout": "A compelling, first-person LinkedIn About section (2-3 paragraphs) highlighting their fit.",
    "achievements": ["Achievement 1", "Achievement 2"]
  }
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

Provide a harsh but constructive, deeply insightful analysis. Provide the raw JSON only.
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

    // Save the optimization session to the database
    const session = await prisma.optimizationSession.create({
      data: {
        userId: userId,
        role: role,
        originalResume: resume,
        jobDescription: jobDescription,
        skills: skills || [],
        atsScore: parsedData?.match?.atsScore || null,
        results: parsedData,
      },
    });

    return NextResponse.json({ ...parsedData, sessionId: session.id });
  } catch (error: any) {
    console.error("Error optimizing resume:", error);
    return NextResponse.json(
      { error: error.message || "Failed to generate Career Intelligence Report." },
      { status: 500 }
    );
  }
}
