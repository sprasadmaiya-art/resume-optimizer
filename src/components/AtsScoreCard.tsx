"use client";

import { motion } from "framer-motion";
import { 
  AlertTriangle, CheckCircle, TrendingUp, Search, Info, 
  Target, Zap, ListChecks, Award, Briefcase, FileSearch
} from "lucide-react";
import { cn } from "@/lib/utils";

interface AtsScoreCardProps {
  score: number;
  category: "Poor" | "Average" | "Good" | "Excellent";
  analysis: {
    keywordMatch: string;
    formatting: string;
    missingSkills: string;
    overall: string;
  };
  strengths?: string[];
  interviewChance?: string;
  interviewReadiness?: string;
  improvementChecklist?: string[];
  feedback: string[];
  missingKeywords: string[];
  weakSections: string[];
}

export default function AtsScoreCard({
  score,
  category,
  analysis,
  strengths = [],
  interviewChance,
  interviewReadiness,
  improvementChecklist = [],
  feedback,
  missingKeywords,
  weakSections,
}: AtsScoreCardProps) {
  const colorMap = {
    Poor: "text-red-500",
    Average: "text-amber-500",
    Good: "text-blue-500",
    Excellent: "text-emerald-500",
  };

  const bgMap = {
    Poor: "bg-red-50 border-red-100",
    Average: "bg-amber-50 border-amber-100",
    Good: "bg-blue-50 border-blue-100",
    Excellent: "bg-emerald-50 border-emerald-100",
  };

  const strokeColorMap = {
    Poor: "#ef4444",
    Average: "#f59e0b",
    Good: "#3b82f6",
    Excellent: "#10b981",
  };

  const currentStrokeColor = strokeColorMap[category] || strokeColorMap.Average;
  const currentTextColor = colorMap[category] || colorMap.Average;
  const currentBgColor = bgMap[category] || bgMap.Average;

  const radius = 60;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  return (
    <div className="w-full space-y-6">
      {/* Top Level: Score & Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Main Score Area */}
        <div className={cn("col-span-1 rounded-2xl border p-6 flex flex-col items-center justify-center text-center shadow-sm relative overflow-hidden", currentBgColor)}>
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-current opacity-20 to-transparent" />
          
          <div className="relative w-40 h-40 flex items-center justify-center mb-4">
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 140 140">
              <circle cx="70" cy="70" r={radius} className="stroke-black/5" strokeWidth="12" fill="none" />
              <motion.circle
                initial={{ strokeDashoffset: circumference }}
                animate={{ strokeDashoffset }}
                transition={{ duration: 1.5, ease: "easeOut" }}
                cx="70"
                cy="70"
                r={radius}
                stroke={currentStrokeColor}
                strokeWidth="12"
                fill="none"
                strokeLinecap="round"
                strokeDasharray={circumference}
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className={cn("text-5xl font-extrabold tracking-tighter", currentTextColor)}>
                {score}
              </span>
              <span className="text-xs font-semibold text-zinc-500 uppercase tracking-widest mt-1">
                / 100
              </span>
            </div>
          </div>
          <h3 className={cn("text-xl font-bold mb-1", currentTextColor)}>{category} Match</h3>
          <p className="text-sm text-zinc-600 font-medium flex items-center justify-center gap-1.5 mt-2">
            <Target className="w-4 h-4" />
            Against Job Description
          </p>
        </div>

        {/* Analysis & Interview Chance */}
        <div className="col-span-1 md:col-span-2 flex flex-col gap-6">
          <div className="glass-card p-6 flex-1 flex flex-col justify-center">
            <h3 className="font-semibold text-lg text-zinc-800 flex items-center gap-2 mb-4">
              <Search className="w-5 h-5 text-indigo-500" />
              Match Analysis
            </h3>
            <div className="space-y-3">
              <AnalysisItem label="Keyword Match" value={analysis.keywordMatch} />
              <AnalysisItem label="Formatting" value={analysis.formatting} />
              <AnalysisItem label="Skills Assessment" value={analysis.missingSkills} />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {interviewChance && (
              <div className="glass-card p-4 flex items-center gap-4 bg-gradient-to-br from-indigo-50 to-purple-50 border-indigo-100">
                <div className="p-3 bg-indigo-100 text-indigo-600 rounded-xl">
                  <Award className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-indigo-500 uppercase tracking-wider mb-1">Interview Chance</p>
                  <p className="text-xl font-bold text-indigo-900">{interviewChance}</p>
                </div>
              </div>
            )}
            
            <div className="glass-card p-4 flex items-center gap-4 bg-gradient-to-br from-teal-50 to-emerald-50 border-teal-100">
              <div className="p-3 bg-teal-100 text-teal-600 rounded-xl">
                <Briefcase className="w-6 h-6" />
              </div>
              <div className="flex-1">
                <p className="text-xs font-semibold text-teal-600 uppercase tracking-wider mb-1">Overall Alignment</p>
                <p className="text-sm font-medium text-teal-900 leading-tight line-clamp-2">
                  {analysis.overall}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Middle Level: Strengths vs Weaknesses */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="glass-card p-6 border-t-4 border-t-emerald-400">
          <h3 className="font-semibold text-lg text-zinc-800 flex items-center gap-2 mb-4">
            <Zap className="w-5 h-5 text-emerald-500" />
            Top Strengths
          </h3>
          <ul className="space-y-3">
            {strengths.map((str, idx) => (
              <li key={idx} className="flex gap-3 text-sm text-zinc-600 items-start">
                <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                <span>{str}</span>
              </li>
            ))}
            {strengths.length === 0 && (
              <span className="text-sm text-zinc-500 italic">No major strengths identified against this specific JD.</span>
            )}
          </ul>
        </div>

        <div className="glass-card p-6 border-t-4 border-t-red-400">
          <h3 className="font-semibold text-lg text-zinc-800 flex items-center gap-2 mb-4">
            <TrendingUp className="w-5 h-5 text-red-500" />
            Weak Sections & Gaps
          </h3>
          <ul className="space-y-3">
            {weakSections.map((section, idx) => (
              <li key={idx} className="flex gap-3 text-sm text-zinc-600 items-start">
                <AlertTriangle className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                <span>{section}</span>
              </li>
            ))}
            {weakSections.length === 0 && (
              <span className="text-sm text-zinc-500 italic">No weak sections found!</span>
            )}
          </ul>
        </div>
      </div>

      {/* Keyword Analysis */}
      <div className="glass-card p-6 bg-amber-50/30 border-amber-100">
        <h3 className="font-semibold text-lg text-zinc-800 flex items-center gap-2 mb-4">
          <FileSearch className="w-5 h-5 text-amber-500" />
          Missing JD Keywords
        </h3>
        <p className="text-sm text-zinc-600 mb-4">These keywords appear in the job description but are missing or underrepresented in your resume.</p>
        <div className="flex flex-wrap gap-2">
          {missingKeywords.map((kw, idx) => (
            <span key={idx} className="px-3 py-1.5 rounded-lg bg-amber-100 text-amber-800 text-sm font-medium border border-amber-200 shadow-sm">
              {kw}
            </span>
          ))}
          {missingKeywords.length === 0 && (
            <span className="text-sm text-zinc-500 bg-white px-3 py-1.5 rounded-lg border">No major keywords missing! Great job.</span>
          )}
        </div>
      </div>

      {/* Bottom Level: Recruiter Insights & Checklist */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1 glass-card p-6 bg-zinc-900 text-white">
          <h3 className="font-semibold text-lg flex items-center gap-2 mb-4 text-zinc-100">
            <Info className="w-5 h-5 text-teal-400" />
            Recruiter Insights
          </h3>
          <ul className="space-y-4">
            {feedback.map((tip, idx) => (
              <li key={idx} className="flex gap-3 text-sm text-zinc-300">
                <div className="w-1.5 h-1.5 rounded-full bg-teal-500 shrink-0 mt-1.5" />
                <span className="leading-relaxed">{tip}</span>
              </li>
            ))}
          </ul>
          
          {interviewReadiness && (
            <div className="mt-6 pt-6 border-t border-zinc-800">
              <p className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-2">Interview Readiness</p>
              <p className="text-sm text-zinc-300 leading-relaxed">{interviewReadiness}</p>
            </div>
          )}
        </div>

        <div className="lg:col-span-2 glass-card p-6">
          <h3 className="font-semibold text-lg text-zinc-800 flex items-center gap-2 mb-4">
            <ListChecks className="w-5 h-5 text-indigo-500" />
            Improvement Checklist
          </h3>
          <p className="text-sm text-zinc-500 mb-5">Follow these specific steps to improve your ATS match score for this role.</p>
          <div className="space-y-3">
            {improvementChecklist.map((item, idx) => (
              <div key={idx} className="flex items-start gap-3 p-3 rounded-xl hover:bg-zinc-50 transition-colors border border-transparent hover:border-zinc-100">
                <div className="flex items-center justify-center w-6 h-6 rounded-full bg-indigo-100 text-indigo-700 text-xs font-bold shrink-0 mt-0.5">
                  {idx + 1}
                </div>
                <p className="text-sm text-zinc-700 leading-relaxed">{item}</p>
              </div>
            ))}
            {improvementChecklist.length === 0 && (
              <p className="text-sm text-zinc-500 italic p-3">Your resume is perfectly optimized!</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function AnalysisItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-3 text-sm pb-2 border-b border-zinc-100 last:border-0 last:pb-0">
      <span className="font-semibold text-zinc-700 min-w-[140px]">{label}:</span>
      <span className="text-zinc-600 leading-relaxed">{value}</span>
    </div>
  );
}
