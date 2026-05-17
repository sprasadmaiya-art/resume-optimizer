"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, Code, Users, FolderKanban, ShieldAlert, Sparkles, ChevronRight, ChevronLeft } from "lucide-react";
import { cn } from "@/lib/utils";

interface InterviewPrepProps {
  data: {
    difficultyScore: number;
    readinessPercentage: number;
    technicalQuestions: string[];
    hrQuestions: string[];
    projectQuestions: string[];
    weakAreaQuestions: string[];
    confidenceTips: string[];
  };
}

export default function InterviewPrep({ data }: InterviewPrepProps) {
  if (!data) return null;

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="w-full space-y-8"
    >
      <div className="flex items-center gap-4 mb-8 glass-card p-6 border-b border-zinc-200 dark:border-zinc-800 rounded-3xl">
        <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-violet-500 to-fuchsia-500 flex items-center justify-center shadow-lg shadow-violet-500/20 text-white shrink-0">
          <MessageSquare className="w-7 h-7" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-zinc-900 dark:text-white">Interactive Interview Prep</h2>
          <p className="text-zinc-500 dark:text-zinc-400">Custom tailored questions based on your resume and the job description.</p>
        </div>
      </div>

      {/* Top Stats - SVG Gauges */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="glass-card p-8 flex items-center justify-between bg-gradient-to-br from-violet-50/50 to-transparent dark:from-violet-900/10 rounded-3xl border border-violet-100 dark:border-violet-900/30 overflow-hidden relative group">
          <div className="relative z-10">
            <p className="text-sm font-bold text-violet-600 dark:text-violet-400 uppercase tracking-widest mb-2">Expected Difficulty</p>
            <p className="text-sm text-zinc-600 dark:text-zinc-400 max-w-[200px] mb-4">Based on the strictness of the job requirements.</p>
            <div className="flex items-baseline gap-2">
              <span className="text-6xl font-black text-violet-900 dark:text-white">{data.difficultyScore}</span>
              <span className="text-2xl font-bold text-violet-300 dark:text-violet-700">/ 10</span>
            </div>
          </div>
          
          <div className="relative w-32 h-32 mr-4 z-10">
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="40" className="stroke-violet-100 dark:stroke-violet-900/30" strokeWidth="12" fill="none" />
              <motion.circle
                initial={{ strokeDashoffset: 251 }}
                animate={{ strokeDashoffset: 251 - ((data.difficultyScore / 10) * 251) }}
                transition={{ duration: 1.5, ease: "easeOut" }}
                cx="50"
                cy="50"
                r="40"
                className="stroke-violet-500"
                strokeWidth="12"
                fill="none"
                strokeLinecap="round"
                strokeDasharray="251"
              />
            </svg>
          </div>
          <div className="absolute -right-10 -bottom-10 opacity-5 group-hover:scale-110 transition-transform duration-700">
            <ShieldAlert className="w-64 h-64 text-violet-500" />
          </div>
        </div>

        <div className="glass-card p-8 flex items-center justify-between bg-gradient-to-br from-emerald-50/50 to-transparent dark:from-emerald-900/10 rounded-3xl border border-emerald-100 dark:border-emerald-900/30 overflow-hidden relative group">
          <div className="relative z-10">
            <p className="text-sm font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-widest mb-2">Your Readiness</p>
            <p className="text-sm text-zinc-600 dark:text-zinc-400 max-w-[200px] mb-4">Overall preparedness based on skill alignment.</p>
            <div className="flex items-baseline gap-1">
              <span className="text-6xl font-black text-emerald-900 dark:text-white">{data.readinessPercentage}</span>
              <span className="text-2xl font-bold text-emerald-600">%</span>
            </div>
          </div>
          
          <div className="relative w-32 h-32 mr-4 z-10">
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="40" className="stroke-emerald-100 dark:stroke-emerald-900/30" strokeWidth="12" fill="none" />
              <motion.circle
                initial={{ strokeDashoffset: 251 }}
                animate={{ strokeDashoffset: 251 - ((data.readinessPercentage / 100) * 251) }}
                transition={{ duration: 1.5, ease: "easeOut", delay: 0.2 }}
                cx="50"
                cy="50"
                r="40"
                className="stroke-emerald-500"
                strokeWidth="12"
                fill="none"
                strokeLinecap="round"
                strokeDasharray="251"
              />
            </svg>
          </div>
          <div className="absolute -right-10 -bottom-10 opacity-5 group-hover:scale-110 transition-transform duration-700">
            <Sparkles className="w-64 h-64 text-emerald-500" />
          </div>
        </div>
      </div>

      {/* Interactive Question Banks (Flashcards) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <FlashcardDeck 
          icon={<Code className="w-6 h-6 text-blue-500" />}
          title="Technical Assessment" 
          questions={data.technicalQuestions} 
          color="blue"
        />
        <FlashcardDeck 
          icon={<FolderKanban className="w-6 h-6 text-amber-500" />}
          title="Project Deep-Dives" 
          questions={data.projectQuestions} 
          color="amber"
        />
        <FlashcardDeck 
          icon={<ShieldAlert className="w-6 h-6 text-rose-500" />}
          title="Probing Weak Areas" 
          questions={data.weakAreaQuestions} 
          color="rose"
        />
        <FlashcardDeck 
          icon={<Users className="w-6 h-6 text-indigo-500" />}
          title="Behavioral & HR" 
          questions={data.hrQuestions} 
          color="indigo"
        />
      </div>

      {/* Confidence Tips */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="p-8 bg-zinc-900 border border-zinc-800 text-white rounded-3xl relative overflow-hidden shadow-xl"
      >
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-yellow-900/40 via-transparent to-transparent"></div>
        <h3 className="font-bold text-xl flex items-center gap-3 mb-8 relative z-10">
          <div className="p-2 bg-yellow-500/20 rounded-xl border border-yellow-500/30">
             <Sparkles className="w-6 h-6 text-yellow-400" />
          </div>
          Strategy & Confidence Tips
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 relative z-10">
          {data.confidenceTips.map((tip, idx) => (
            <motion.div 
              key={idx} 
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="flex gap-4 p-4 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors"
            >
              <div className="w-8 h-8 rounded-full bg-yellow-500/20 text-yellow-400 flex items-center justify-center shrink-0 font-bold border border-yellow-500/30 shadow-sm shadow-yellow-500/10">
                {idx + 1}
              </div>
              <span className="leading-relaxed text-zinc-300 text-sm mt-1">{tip}</span>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}

function FlashcardDeck({ title, questions, icon, color }: { title: string; questions: string[]; icon: React.ReactNode; color: 'blue' | 'amber' | 'rose' | 'indigo' }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const colorMap = {
    blue: "from-blue-50 to-transparent dark:from-blue-900/20 border-blue-200 dark:border-blue-800",
    amber: "from-amber-50 to-transparent dark:from-amber-900/20 border-amber-200 dark:border-amber-800",
    rose: "from-rose-50 to-transparent dark:from-rose-900/20 border-rose-200 dark:border-rose-800",
    indigo: "from-indigo-50 to-transparent dark:from-indigo-900/20 border-indigo-200 dark:border-indigo-800"
  };

  const nextCard = () => setCurrentIndex((prev) => (prev + 1) % questions.length);
  const prevCard = () => setCurrentIndex((prev) => (prev - 1 + questions.length) % questions.length);

  if (!questions || questions.length === 0) return null;

  return (
    <div className={cn("glass-card flex flex-col h-[280px] rounded-3xl overflow-hidden border-2", colorMap[color].split(' ')[2])}>
      {/* Header */}
      <div className={cn("p-4 border-b flex items-center justify-between bg-gradient-to-r", colorMap[color].split(' ')[0], colorMap[color].split(' ')[1])}>
        <h3 className="font-bold text-zinc-800 dark:text-zinc-100 flex items-center gap-2">
          {icon}
          {title}
        </h3>
        <span className="text-xs font-bold px-2 py-1 bg-white/50 dark:bg-black/20 rounded-md text-zinc-500 dark:text-zinc-400">
          {currentIndex + 1} / {questions.length}
        </span>
      </div>
      
      {/* Card Content area */}
      <div className="flex-1 relative p-6 flex flex-col justify-center bg-white/50 dark:bg-zinc-900/50">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.2 }}
            className="text-center"
          >
            <p className="text-lg font-medium text-zinc-700 dark:text-zinc-200 leading-relaxed">
              "{questions[currentIndex]}"
            </p>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Controls */}
      <div className="p-4 border-t border-zinc-100 dark:border-zinc-800 flex justify-between items-center bg-zinc-50 dark:bg-zinc-900/80">
        <button 
          onClick={prevCard}
          className="flex items-center gap-1 px-4 py-2 rounded-xl bg-zinc-200 dark:bg-zinc-800 hover:bg-zinc-300 dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-300 transition-colors shadow-sm font-semibold text-sm"
        >
          <ChevronLeft className="w-4 h-4" /> Prev
        </button>
        <p className="text-xs text-zinc-500 uppercase tracking-widest font-bold">More Cards</p>
        <button 
          onClick={nextCard}
          className="flex items-center gap-1 px-4 py-2 rounded-xl bg-zinc-900 dark:bg-zinc-100 hover:bg-zinc-800 dark:hover:bg-zinc-200 text-white dark:text-zinc-900 transition-colors shadow-sm font-semibold text-sm"
        >
          Next <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
