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
    "atsScore": 85, // A number between 0 and 100 representing how well the resume matches the JD.
    "atsScoreCategory": "Good", // Must be exactly one of: "Poor", "Average", "Good", "Excellent".
    "jobMatchPercentage": 80, // Overall holistic match percentage (0-100).
    "skillStrengthScore": 75, // How strong their skills are relative to the JD requirements (0-100).
    "missingSkills": ["Skill 1", "Skill 2"], // Critical skills from the JD missing in the resume.
    "matchingSkills": ["Skill 3", "Skill 4"], // Skills they successfully demonstrated.
    "strengths": ["Strength 1", "Strength 2"], // 2-3 areas where the resume strongly aligns with the JD.
    "weakAreas": ["Weakness 1", "Weakness 2"], // 2-3 areas that need immediate improvement.
    "recommendedImprovements": ["Action 1", "Action 2"] // Actionable steps to fix the weak areas.
  },
  "recruiterSimulator": {
    "firstImpression": "A 1-2 sentence honest first impression a recruiter would have.",
    "likelyConcerns": ["Concern 1", "Concern 2"], // Things a recruiter might flag as a risk.
    "readabilityFeedback": "Feedback on formatting, density, and ease of scanning.",
    "scanningBehavior": "What a recruiter's eyes will gravitate to first on this resume.",
    "noticesFirst": ["Detail 1", "Detail 2"], // The most prominent details.
    "rejectionRisks": ["Risk 1", "Risk 2"] // Why they might pass on this candidate.
  },
  "interviewPrep": {
    "difficultyScore": 8, // Estimated interview difficulty out of 10.
    "readinessPercentage": 65, // How ready they seem based on their resume (0-100).
    "technicalQuestions": ["Question 1", "Question 2"], // Likely technical/hard-skill questions based on the JD.
    "hrQuestions": ["Question 1", "Question 2"], // Likely behavioral/HR questions.
    "projectQuestions": ["Question 1", "Question 2"], // Questions directly targeting their resume projects/experience.
    "weakAreaQuestions": ["Question 1", "Question 2"], // Questions probing their missing skills or weak areas.
    "confidenceTips": ["Tip 1", "Tip 2"] // Psychological/confidence tips tailored to them.
  },
  "careerRecommendations": {
    "suitableRoles": ["Role 1", "Role 2"], // Alternative or next-step roles they are suited for.
    "highDemandSkills": ["Skill 1", "Skill 2"], // General high-demand skills in this field right now.
    "careerGrowthSuggestions": ["Suggestion 1", "Suggestion 2"], // Long-term strategic advice.
    "recommendedCertifications": ["Cert 1", "Cert 2"], // Specific certs to boost their profile.
    "salaryGrowthSuggestions": "Advice on how to position themselves for higher compensation.",
    "learningRoadmap": ["Step 1", "Step 2", "Step 3"], // A quick 3-step learning path.
    "suggestedCareerPaths": ["Path 1", "Path 2"], // Potential trajectories (e.g. IC vs Management).
    "mostValuableSkillNext": "The single most impactful skill they should learn tomorrow."
  },
  "optimization": {
    "optimizedResume": "A full, professional rewrite of their resume tailored precisely to the Job Description. Use powerful action verbs and quantify achievements.",
    "linkedinAbout": "A compelling, first-person LinkedIn About section (2-3 paragraphs) highlighting their fit.",
    "achievements": ["Achievement 1", "Achievement 2"] // 3-5 high-impact, quantifiable bullet points they can copy-paste.
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

    if (userId) {
      try {
        await prisma.optimizationSession.create({
          data: {
            userId,
            role,
            originalResume: resume,
            jobDescription,
            skills: skills || [],
            atsScore: parsedData.match?.atsScore || null,
            results: parsedData,
          }
        });
      } catch (dbError) {
        console.error("Failed to save optimization session to DB:", dbError);
        // Continue and return the results anyway so user is not blocked
      }
    }

    return NextResponse.json(parsedData);
  } catch (error: any) {
    console.error("Error optimizing resume:", error);
    return NextResponse.json(
      { error: error.message || "Failed to generate Career Intelligence Report." },
      { status: 500 }
    );
  }
}
