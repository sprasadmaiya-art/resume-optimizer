"use client";

import { motion } from "framer-motion";
import { 
  AlertTriangle, CheckCircle, Target, FileSearch, Zap, TrendingUp
} from "lucide-react";
import { cn } from "@/lib/utils";

interface AtsScoreCardProps {
  match: {
    atsScore: number;
    atsScoreCategory: "Poor" | "Average" | "Good" | "Excellent";
    jobMatchPercentage: number;
    skillStrengthScore: number;
    missingSkills: string[];
    matchingSkills: string[];
    strengths: string[];
    weakAreas: string[];
    recommendedImprovements: string[];
  };
}

export default function AtsScoreCard({ match }: AtsScoreCardProps) {
  if (!match) return null;

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

  const currentStrokeColor = strokeColorMap[match.atsScoreCategory] || strokeColorMap.Average;
  const currentTextColor = colorMap[match.atsScoreCategory] || colorMap.Average;
  const currentBgColor = bgMap[match.atsScoreCategory] || bgMap.Average;

  const radius = 60;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (match.atsScore / 100) * circumference;

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
                {match.atsScore}
              </span>
              <span className="text-xs font-semibold text-zinc-500 uppercase tracking-widest mt-1">
                / 100
              </span>
            </div>
          </div>
          <h3 className={cn("text-xl font-bold mb-1", currentTextColor)}>{match.atsScoreCategory} ATS Match</h3>
        </div>

        {/* Holistic Scores */}
        <div className="col-span-1 md:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="glass-card p-6 flex flex-col justify-center items-center text-center bg-gradient-to-br from-indigo-50 to-purple-50 border-indigo-100">
            <Target className="w-8 h-8 text-indigo-500 mb-3" />
            <p className="text-sm font-semibold text-indigo-600 uppercase tracking-wider mb-2">Overall Job Match</p>
            <div className="flex items-baseline gap-1">
              <span className="text-4xl font-extrabold text-indigo-900">{match.jobMatchPercentage}</span>
              <span className="text-xl font-bold text-indigo-500">%</span>
            </div>
            <div className="w-full max-w-[150px] bg-indigo-200 h-1.5 rounded-full mt-4 overflow-hidden">
              <div className="bg-indigo-600 h-full rounded-full transition-all duration-1000" style={{ width: `${match.jobMatchPercentage}%` }} />
            </div>
          </div>

          <div className="glass-card p-6 flex flex-col justify-center items-center text-center bg-gradient-to-br from-blue-50 to-cyan-50 border-blue-100">
            <Zap className="w-8 h-8 text-blue-500 mb-3" />
            <p className="text-sm font-semibold text-blue-600 uppercase tracking-wider mb-2">Skill Strength Score</p>
            <div className="flex items-baseline gap-1">
              <span className="text-4xl font-extrabold text-blue-900">{match.skillStrengthScore}</span>
              <span className="text-xl font-bold text-blue-500">/ 100</span>
            </div>
            <div className="w-full max-w-[150px] bg-blue-200 h-1.5 rounded-full mt-4 overflow-hidden">
              <div className="bg-blue-600 h-full rounded-full transition-all duration-1000" style={{ width: `${match.skillStrengthScore}%` }} />
            </div>
          </div>
        </div>
      </div>

      {/* Skills Gap Analysis */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="glass-card p-6 border-t-4 border-t-emerald-400">
          <h3 className="font-semibold text-lg text-zinc-800 flex items-center gap-2 mb-4">
            <CheckCircle className="w-5 h-5 text-emerald-500" />
            Matching Skills
          </h3>
          <div className="flex flex-wrap gap-2">
            {match.matchingSkills.map((kw, idx) => (
              <span key={idx} className="px-3 py-1.5 rounded-lg bg-emerald-50 text-emerald-700 text-sm font-medium border border-emerald-100 shadow-sm">
                {kw}
              </span>
            ))}
          </div>
        </div>

        <div className="glass-card p-6 border-t-4 border-t-red-400">
          <h3 className="font-semibold text-lg text-zinc-800 flex items-center gap-2 mb-4">
            <FileSearch className="w-5 h-5 text-red-500" />
            Missing Skills (Gap)
          </h3>
          <div className="flex flex-wrap gap-2">
            {match.missingSkills.map((kw, idx) => (
              <span key={idx} className="px-3 py-1.5 rounded-lg bg-red-50 text-red-700 text-sm font-medium border border-red-100 shadow-sm">
                {kw}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Strengths & Weaknesses */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="glass-card p-6 bg-zinc-50 border border-zinc-200">
          <h3 className="font-semibold text-lg text-zinc-800 flex items-center gap-2 mb-4">
            <TrendingUp className="w-5 h-5 text-zinc-700" />
            Resume Strengths
          </h3>
          <ul className="space-y-3">
            {match.strengths.map((str, idx) => (
              <li key={idx} className="flex gap-3 text-sm text-zinc-600 items-start">
                <span className="text-zinc-400 font-bold shrink-0">•</span>
                <span>{str}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="glass-card p-6 bg-amber-50/30 border border-amber-100">
          <h3 className="font-semibold text-lg text-amber-900 flex items-center gap-2 mb-4">
            <AlertTriangle className="w-5 h-5 text-amber-500" />
            Weak Areas
          </h3>
          <ul className="space-y-3">
            {match.weakAreas.map((weak, idx) => (
              <li key={idx} className="flex gap-3 text-sm text-amber-800 items-start">
                <span className="text-amber-500 font-bold shrink-0">•</span>
                <span>{weak}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Recommended Improvements */}
      <div className="glass-card p-6 bg-zinc-900 text-white">
        <h3 className="font-semibold text-lg flex items-center gap-2 mb-4">
          <Zap className="w-5 h-5 text-yellow-400" />
          Recommended Improvements
        </h3>
        <ul className="space-y-3">
          {match.recommendedImprovements.map((imp, idx) => (
            <li key={idx} className="flex gap-3 text-sm text-zinc-300 items-start">
              <div className="w-5 h-5 rounded-full bg-yellow-400/20 text-yellow-400 flex items-center justify-center text-xs font-bold shrink-0">
                {idx + 1}
              </div>
              <span className="leading-relaxed mt-0.5">{imp}</span>
            </li>
          ))}
        </ul>
      </div>

    </div>
  );
}
