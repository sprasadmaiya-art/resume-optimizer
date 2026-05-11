"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import OptimizerForm from "@/components/OptimizerForm";
import ResultsDisplay from "@/components/ResultsDisplay";
import { Sparkles, FileText, UserCircle, Target, BarChart } from "lucide-react";
import { usePostHog } from 'posthog-js/react';

export default function Home() {
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState(null);
  const [error, setError] = useState<string | null>(null);
  const posthog = usePostHog();

  const handleOptimize = async (resume: string, role: string, skills: string[]) => {
    posthog.capture('optimize_clicked', { target_role: role });
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch("/api/optimize", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ resume, role, skills }),
      });

      if (!response.ok) {
        throw new Error("Failed to optimize resume. Please try again.");
      }

      const data = await response.json();
      setResults(data);
      posthog.capture('resume_generated', { target_role: role });
      
      if (data.atsScore) {
        posthog.capture('ats_score_generated', { 
          score: data.atsScore, 
          category: data.atsScoreCategory,
          target_role: role
        });
      }
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen py-20 px-4 sm:px-6 lg:px-8 flex flex-col items-center">
      {/* Hero Section */}
      <div className="text-center max-w-3xl mx-auto mb-16 space-y-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-teal-50 border border-teal-100 text-sm font-medium text-teal-700 mb-4 shadow-sm"
        >
          <Sparkles className="w-4 h-4" />
          <span>Powered by Google Gemini 2.5 Flash</span>
        </motion.div>
        
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-4xl md:text-6xl font-extrabold tracking-tight"
        >
          Supercharge Your Career with <br className="hidden md:block" />
          <span className="text-gradient">AI ATS Optimization</span>
        </motion.h1>
        
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-lg md:text-xl text-zinc-600 max-w-2xl mx-auto leading-relaxed"
        >
          Upload your resume and get an instant ATS compatibility score, complete with recruiter feedback, optimized formatting, and targeted skills.
        </motion.p>
      </div>

      {/* Feature Pills */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="flex flex-wrap justify-center gap-4 mb-16"
      >
        <FeaturePill icon={<BarChart size={18} />} text="ATS Scoring" />
        <FeaturePill icon={<FileText size={18} />} text="Resume Revamp" />
        <FeaturePill icon={<Target size={18} />} text="Skill Matching" />
        <FeaturePill icon={<UserCircle size={18} />} text="LinkedIn About" />
      </motion.div>

      {/* Main App Section */}
      <div className="w-full max-w-6xl mx-auto flex flex-col items-center">
        <OptimizerForm onSubmit={handleOptimize} isLoading={isLoading} />
        
        {error && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-8 w-full max-w-3xl p-4 bg-red-50 border border-red-200 rounded-xl text-red-600 text-center shadow-sm flex items-center justify-center gap-2"
          >
            <span>{error}</span>
          </motion.div>
        )}

        <ResultsDisplay results={results} />
      </div>
    </main>
  );
}

function FeaturePill({ icon, text }: { icon: React.ReactNode; text: string }) {
  return (
    <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-zinc-200 text-zinc-700 text-sm shadow-sm transition-shadow hover:shadow-md">
      <span className="text-teal-500">{icon}</span>
      <span>{text}</span>
    </div>
  );
}
