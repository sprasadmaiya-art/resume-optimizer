"use client";

import { motion } from "framer-motion";
import { 
  AlertTriangle, CheckCircle, Target, FileSearch, Zap, TrendingUp, MinusCircle, PlusCircle, Scale
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
    Poor: "bg-red-50 dark:bg-red-900/10 border-red-100 dark:border-red-900/30",
    Average: "bg-amber-50 dark:bg-amber-900/10 border-amber-100 dark:border-amber-900/30",
    Good: "bg-blue-50 dark:bg-blue-900/10 border-blue-100 dark:border-blue-900/30",
    Excellent: "bg-emerald-50 dark:bg-emerald-900/10 border-emerald-100 dark:border-emerald-900/30",
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

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } }
  };

  return (
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className="w-full space-y-8"
    >
      {/* Top Level: Score & Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Main Score Area */}
        <motion.div variants={itemVariants} className={cn("col-span-1 rounded-3xl border p-8 flex flex-col items-center justify-center text-center shadow-lg relative overflow-hidden", currentBgColor)}>
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-current opacity-20 to-transparent" />
          
          <div className="relative w-40 h-40 flex items-center justify-center mb-4">
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 140 140">
              <circle cx="70" cy="70" r={radius} className="stroke-zinc-200 dark:stroke-zinc-800" strokeWidth="12" fill="none" />
              <motion.circle
                initial={{ strokeDashoffset: circumference }}
                animate={{ strokeDashoffset }}
                transition={{ duration: 1.5, ease: "easeOut", delay: 0.2 }}
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
              <span className={cn("text-6xl font-extrabold tracking-tighter", currentTextColor)}>
                {match.atsScore}
              </span>
              <span className="text-xs font-semibold text-zinc-500 uppercase tracking-widest mt-1">
                / 100
              </span>
            </div>
          </div>
          <h3 className={cn("text-xl font-bold mb-1", currentTextColor)}>{match.atsScoreCategory} ATS Match</h3>
        </motion.div>

        {/* Holistic Scores */}
        <div className="col-span-1 md:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-6">
          <motion.div variants={itemVariants} className="glass-card p-6 flex flex-col justify-center text-center bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-900/10 dark:to-purple-900/10 border-indigo-100 dark:border-indigo-900/30 rounded-3xl shadow-sm relative overflow-hidden">
            <div className="absolute -right-4 -top-4 opacity-5"><Target className="w-32 h-32 text-indigo-500" /></div>
            <Target className="w-8 h-8 text-indigo-500 mb-3 mx-auto relative z-10" />
            <p className="text-sm font-semibold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider mb-2 relative z-10">Overall Job Match</p>
            <div className="flex justify-center items-baseline gap-1 relative z-10">
              <span className="text-5xl font-extrabold text-indigo-900 dark:text-white">{match.jobMatchPercentage}</span>
              <span className="text-xl font-bold text-indigo-500">%</span>
            </div>
            <div className="w-full max-w-[200px] mx-auto bg-indigo-200 dark:bg-indigo-950 h-2 rounded-full mt-6 overflow-hidden relative z-10">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: `${match.jobMatchPercentage}%` }}
                transition={{ duration: 1.5, delay: 0.5, ease: "easeOut" }}
                className="bg-indigo-600 dark:bg-indigo-500 h-full rounded-full" 
              />
            </div>
          </motion.div>

          <motion.div variants={itemVariants} className="glass-card p-6 flex flex-col justify-center text-center bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/10 dark:to-cyan-900/10 border-blue-100 dark:border-blue-900/30 rounded-3xl shadow-sm relative overflow-hidden">
            <div className="absolute -right-4 -top-4 opacity-5"><Zap className="w-32 h-32 text-blue-500" /></div>
            <Zap className="w-8 h-8 text-blue-500 mb-3 mx-auto relative z-10" />
            <p className="text-sm font-semibold text-blue-600 dark:text-blue-400 uppercase tracking-wider mb-2 relative z-10">Skill Strength</p>
            <div className="flex justify-center items-baseline gap-1 relative z-10">
              <span className="text-5xl font-extrabold text-blue-900 dark:text-white">{match.skillStrengthScore}</span>
              <span className="text-xl font-bold text-blue-500">/ 100</span>
            </div>
            <div className="w-full max-w-[200px] mx-auto bg-blue-200 dark:bg-blue-950 h-2 rounded-full mt-6 overflow-hidden relative z-10">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: `${match.skillStrengthScore}%` }}
                transition={{ duration: 1.5, delay: 0.7, ease: "easeOut" }}
                className="bg-blue-600 dark:bg-blue-500 h-full rounded-full" 
              />
            </div>
          </motion.div>
        </div>
      </div>

      {/* Skills Gap Analysis */}
      <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="glass-card p-6 border-t-4 border-t-emerald-400 dark:bg-zinc-900/50">
          <h3 className="font-semibold text-lg text-zinc-800 dark:text-white flex items-center gap-2 mb-4">
            <CheckCircle className="w-5 h-5 text-emerald-500" />
            Present & Matching Skills
          </h3>
          <div className="flex flex-wrap gap-2">
            {match.matchingSkills.map((kw, idx) => (
              <motion.span 
                key={idx} 
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.8 + (idx * 0.05) }}
                className="px-3 py-1.5 rounded-lg bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-400 text-sm font-medium border border-emerald-100 dark:border-emerald-800/50 shadow-sm flex items-center gap-1.5"
              >
                <PlusCircle className="w-3 h-3" /> {kw}
              </motion.span>
            ))}
          </div>
        </div>

        <div className="glass-card p-6 border-t-4 border-t-red-400 dark:bg-zinc-900/50">
          <h3 className="font-semibold text-lg text-zinc-800 dark:text-white flex items-center gap-2 mb-4">
            <FileSearch className="w-5 h-5 text-red-500" />
            Missing Skills (Gap)
          </h3>
          <div className="flex flex-wrap gap-2">
            {match.missingSkills.map((kw, idx) => (
              <motion.span 
                key={idx} 
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1 + (idx * 0.05) }}
                className="px-3 py-1.5 rounded-lg bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400 text-sm font-medium border border-red-100 dark:border-red-800/50 shadow-sm flex items-center gap-1.5"
              >
                <MinusCircle className="w-3 h-3" /> {kw}
              </motion.span>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Balance Scale: Strengths vs Weaknesses */}
      <motion.div variants={itemVariants} className="glass-card overflow-hidden dark:bg-zinc-900/50">
        <div className="p-6 bg-zinc-50 dark:bg-zinc-800/50 border-b border-zinc-200 dark:border-zinc-800 flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-zinc-200 dark:bg-zinc-700 flex items-center justify-center">
             <Scale className="w-5 h-5 text-zinc-700 dark:text-zinc-300" />
          </div>
          <div>
            <h3 className="font-bold text-lg text-zinc-900 dark:text-white">Profile Balance</h3>
            <p className="text-sm text-zinc-500 dark:text-zinc-400">Comparing your core strengths against potential red flags.</p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-zinc-200 dark:divide-zinc-800">
          <div className="p-6 md:p-8 bg-gradient-to-br from-emerald-50/30 to-transparent dark:from-emerald-900/10">
            <h4 className="font-semibold text-emerald-700 dark:text-emerald-400 flex items-center gap-2 mb-6 uppercase tracking-wider text-sm">
              <TrendingUp className="w-4 h-4" /> Competitive Strengths
            </h4>
            <div className="space-y-4">
              {match.strengths.map((str, idx) => (
                <motion.div 
                  key={idx} 
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 + (idx * 0.1) }}
                  className="flex gap-4 items-start"
                >
                  <div className="w-6 h-6 rounded-full bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0 mt-0.5 border border-emerald-200 dark:border-emerald-800">
                    <CheckCircle className="w-3.5 h-3.5" />
                  </div>
                  <span className="text-zinc-700 dark:text-zinc-300 text-sm leading-relaxed">{str}</span>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="p-6 md:p-8 bg-gradient-to-br from-amber-50/30 to-transparent dark:from-amber-900/10">
            <h4 className="font-semibold text-amber-700 dark:text-amber-500 flex items-center gap-2 mb-6 uppercase tracking-wider text-sm">
              <AlertTriangle className="w-4 h-4" /> Areas of Concern
            </h4>
            <div className="space-y-4">
              {match.weakAreas.map((weak, idx) => (
                <motion.div 
                  key={idx} 
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 + (idx * 0.1) }}
                  className="flex gap-4 items-start"
                >
                  <div className="w-6 h-6 rounded-full bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-500 flex items-center justify-center shrink-0 mt-0.5 border border-amber-200 dark:border-amber-800">
                    <span className="font-bold text-xs">!</span>
                  </div>
                  <span className="text-zinc-700 dark:text-zinc-300 text-sm leading-relaxed">{weak}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>

      {/* Recommended Improvements - Animated Step List */}
      <motion.div variants={itemVariants} className="glass-card p-6 md:p-8 border-t-4 border-t-teal-500 dark:bg-zinc-900/50">
        <h3 className="font-bold text-xl text-zinc-900 dark:text-white flex items-center gap-3 mb-8">
          <div className="p-2 bg-teal-100 dark:bg-teal-900/30 rounded-lg">
             <Zap className="w-6 h-6 text-teal-600 dark:text-teal-400" />
          </div>
          Strategic Action Plan
        </h3>
        <div className="space-y-6 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-zinc-200 dark:before:via-zinc-800 before:to-transparent">
          {match.recommendedImprovements.map((imp, idx) => (
            <motion.div 
              key={idx} 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: idx * 0.15 }}
              className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active"
            >
              <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-white dark:border-zinc-950 bg-teal-100 dark:bg-teal-900 text-teal-600 dark:text-teal-400 shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10 font-bold">
                {idx + 1}
              </div>
              
              <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] glass-card p-4 rounded-2xl shadow-sm border border-zinc-100 dark:border-zinc-800/80 bg-white/50 dark:bg-zinc-900/50 hover:bg-white dark:hover:bg-zinc-800 transition-colors">
                <span className="leading-relaxed font-medium text-sm text-zinc-700 dark:text-zinc-300">{imp}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

    </motion.div>
  );
}
