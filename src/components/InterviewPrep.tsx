"use client";

import { motion } from "framer-motion";
import { MessageSquare, Code, Users, FolderKanban, ShieldAlert, Sparkles, Activity } from "lucide-react";
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
    <div className="w-full space-y-8">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 rounded-full bg-violet-100 flex items-center justify-center border border-violet-200">
          <MessageSquare className="w-6 h-6 text-violet-600" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-zinc-900">Interview Preparation</h2>
          <p className="text-sm text-zinc-500">Custom questions generated specifically for this Job Description and your profile.</p>
        </div>
      </div>

      {/* Top Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="glass-card p-6 flex flex-col items-center justify-center text-center bg-gradient-to-br from-violet-50 to-fuchsia-50 border-violet-100">
          <p className="text-sm font-semibold text-violet-600 uppercase tracking-widest mb-2">Expected Difficulty</p>
          <div className="flex items-baseline gap-2">
            <span className="text-5xl font-extrabold text-violet-900">{data.difficultyScore}</span>
            <span className="text-xl font-bold text-violet-300">/ 10</span>
          </div>
          <div className="w-full bg-violet-200 h-2 rounded-full mt-4 overflow-hidden">
            <div 
              className="bg-violet-600 h-full rounded-full transition-all duration-1000" 
              style={{ width: `${(data.difficultyScore / 10) * 100}%` }}
            />
          </div>
        </div>

        <div className="glass-card p-6 flex flex-col items-center justify-center text-center bg-gradient-to-br from-emerald-50 to-teal-50 border-emerald-100">
          <p className="text-sm font-semibold text-emerald-600 uppercase tracking-widest mb-2">Your Readiness</p>
          <div className="flex items-baseline gap-1">
            <span className="text-5xl font-extrabold text-emerald-900">{data.readinessPercentage}</span>
            <span className="text-2xl font-bold text-emerald-600">%</span>
          </div>
          <div className="w-full bg-emerald-200 h-2 rounded-full mt-4 overflow-hidden">
            <div 
              className="bg-emerald-500 h-full rounded-full transition-all duration-1000" 
              style={{ width: `${data.readinessPercentage}%` }}
            />
          </div>
        </div>
      </div>

      {/* Question Banks */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <QuestionBank 
          icon={<Code className="w-5 h-5 text-blue-500" />}
          title="Technical Questions" 
          questions={data.technicalQuestions} 
          color="blue"
        />
        <QuestionBank 
          icon={<FolderKanban className="w-5 h-5 text-amber-500" />}
          title="Project Deep-Dives" 
          questions={data.projectQuestions} 
          color="amber"
        />
        <QuestionBank 
          icon={<ShieldAlert className="w-5 h-5 text-rose-500" />}
          title="Probing Weak Areas" 
          questions={data.weakAreaQuestions} 
          color="rose"
        />
        <QuestionBank 
          icon={<Users className="w-5 h-5 text-indigo-500" />}
          title="Behavioral / HR" 
          questions={data.hrQuestions} 
          color="indigo"
        />
      </div>

      {/* Confidence Tips */}
      <div className="glass-card p-6 bg-zinc-900 text-white">
        <h3 className="font-semibold text-lg flex items-center gap-2 mb-4">
          <Sparkles className="w-5 h-5 text-yellow-400" />
          Confidence & Strategy Tips
        </h3>
        <ul className="space-y-4">
          {data.confidenceTips.map((tip, idx) => (
            <li key={idx} className="flex gap-3 text-sm text-zinc-300">
              <div className="w-1.5 h-1.5 rounded-full bg-yellow-400 shrink-0 mt-1.5" />
              <span className="leading-relaxed">{tip}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function QuestionBank({ title, questions, icon, color }: { title: string; questions: string[]; icon: React.ReactNode; color: 'blue' | 'amber' | 'rose' | 'indigo' }) {
  const colorStyles = {
    blue: "border-t-blue-400",
    amber: "border-t-amber-400",
    rose: "border-t-rose-400",
    indigo: "border-t-indigo-400"
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className={cn("glass-card p-6 border-t-4", colorStyles[color])}
    >
      <h3 className="font-semibold text-lg text-zinc-800 flex items-center gap-2 mb-4">
        {icon}
        {title}
      </h3>
      <ul className="space-y-4">
        {questions.map((q, idx) => (
          <li key={idx} className="flex gap-3 text-sm text-zinc-700 items-start p-3 bg-zinc-50 rounded-lg border border-zinc-100">
            <span className="font-bold text-zinc-400 shrink-0 select-none">Q.</span>
            <span className="leading-relaxed font-medium">{q}</span>
          </li>
        ))}
      </ul>
    </motion.div>
  );
}
