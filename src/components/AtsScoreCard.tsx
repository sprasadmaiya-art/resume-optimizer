"use client";

import { motion } from "framer-motion";
import { AlertTriangle, CheckCircle, TrendingUp, Search, Info } from "lucide-react";
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
  feedback: string[];
  missingKeywords: string[];
  weakSections: string[];
}

export default function AtsScoreCard({
  score,
  category,
  analysis,
  feedback,
  missingKeywords,
  weakSections,
}: AtsScoreCardProps) {
  // Determine colors based on category
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

  // Circular progress math
  const radius = 60;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  return (
    <div className="w-full space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Main Score Area */}
        <div className={cn("col-span-1 rounded-2xl border p-6 flex flex-col items-center justify-center text-center", currentBgColor)}>
          <div className="relative w-40 h-40 flex items-center justify-center mb-4">
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 140 140">
              {/* Background circle */}
              <circle
                cx="70"
                cy="70"
                r={radius}
                className="stroke-black/5"
                strokeWidth="12"
                fill="none"
              />
              {/* Progress circle */}
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
              <span className={cn("text-4xl font-extrabold tracking-tighter", currentTextColor)}>
                {score}
              </span>
              <span className="text-xs font-semibold text-zinc-500 uppercase tracking-widest mt-1">
                / 100
              </span>
            </div>
          </div>
          <h3 className={cn("text-xl font-bold mb-1", currentTextColor)}>{category} Match</h3>
          <p className="text-sm text-zinc-600 font-medium">ATS Compatibility Score</p>
        </div>

        {/* Analysis Overview */}
        <div className="col-span-1 md:col-span-2 glass-card p-6 flex flex-col justify-center space-y-4">
          <h3 className="font-semibold text-lg text-zinc-800 flex items-center gap-2">
            <Search className="w-5 h-5 text-indigo-500" />
            Resume Analysis
          </h3>
          
          <div className="space-y-3">
            <AnalysisItem label="Keyword Match" value={analysis.keywordMatch} />
            <AnalysisItem label="Formatting" value={analysis.formatting} />
            <AnalysisItem label="Skills Assessment" value={analysis.missingSkills} />
          </div>
          
          <div className="mt-2 pt-4 border-t border-zinc-100">
            <p className="text-sm text-zinc-600 leading-relaxed italic">
              &quot;{analysis.overall}&quot;
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Recruiter Feedback */}
        <div className="glass-card p-6">
          <h3 className="font-semibold text-lg text-zinc-800 flex items-center gap-2 mb-4">
            <CheckCircle className="w-5 h-5 text-emerald-500" />
            Recruiter Tips
          </h3>
          <ul className="space-y-3">
            {feedback.map((tip, idx) => (
              <li key={idx} className="flex gap-3 text-sm text-zinc-600">
                <Info className="w-4 h-4 text-emerald-500 mt-0.5 shrink-0" />
                <span className="leading-relaxed">{tip}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Areas for Improvement */}
        <div className="space-y-6">
          <div className="glass-card p-6 border-l-4 border-l-amber-400">
            <h3 className="font-semibold text-lg text-zinc-800 flex items-center gap-2 mb-3">
              <AlertTriangle className="w-5 h-5 text-amber-500" />
              Missing Keywords
            </h3>
            <div className="flex flex-wrap gap-2">
              {missingKeywords.map((kw, idx) => (
                <span key={idx} className="px-2.5 py-1 rounded-md bg-amber-50 text-amber-700 text-xs font-medium border border-amber-100">
                  {kw}
                </span>
              ))}
              {missingKeywords.length === 0 && (
                <span className="text-sm text-zinc-500">No major keywords missing!</span>
              )}
            </div>
          </div>

          <div className="glass-card p-6 border-l-4 border-l-red-400">
            <h3 className="font-semibold text-lg text-zinc-800 flex items-center gap-2 mb-3">
              <TrendingUp className="w-5 h-5 text-red-500" />
              Weak Sections
            </h3>
            <ul className="space-y-2">
              {weakSections.map((section, idx) => (
                <li key={idx} className="flex gap-2 text-sm text-zinc-600 items-start">
                  <span className="text-red-500 shrink-0 mt-0.5">•</span>
                  <span>{section}</span>
                </li>
              ))}
              {weakSections.length === 0 && (
                <span className="text-sm text-zinc-500">Your sections look strong.</span>
              )}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

function AnalysisItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-3 text-sm">
      <span className="font-medium text-zinc-700 min-w-[140px]">{label}:</span>
      <span className="text-zinc-600">{value}</span>
    </div>
  );
}
