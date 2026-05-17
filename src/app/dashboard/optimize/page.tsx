"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import OptimizerForm from "@/components/OptimizerForm";
import ResultsDisplay from "@/components/ResultsDisplay";
import { usePostHog } from 'posthog-js/react';

export default function OptimizePage() {
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState(null);
  const [error, setError] = useState<string | null>(null);
  const posthog = usePostHog();

  const handleOptimize = async (resume: string, jobDescription: string, role: string, skills: string[]) => {
    posthog.capture('optimize_clicked', { target_role: role });
    if (jobDescription) {
      posthog.capture('job_description_added', { target_role: role });
    }
    
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch("/api/optimize", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ resume, jobDescription, role, skills }),
      });

      if (!response.ok) {
        const errData = await response.json().catch(() => null);
        throw new Error(errData?.error || "Failed to generate Career Intelligence Report. Please try again.");
      }

      const data = await response.json();
      setResults(data);
      
      posthog.capture('job_match_generated', { target_role: role });
      posthog.capture('recruiter_analysis_generated');
      posthog.capture('interview_prep_generated');
      posthog.capture('career_recommendations_generated');
      
      if (data.match?.atsScore) {
        posthog.capture('ats_score_generated', { 
          score: data.match.atsScore, 
          category: data.match.atsScoreCategory,
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
    <div className="space-y-8 pb-12">
      <div>
        <h1 className="text-3xl font-heading font-bold text-zinc-900 dark:text-white">New Optimization</h1>
        <p className="text-zinc-600 dark:text-zinc-400 mt-2">
          Enter your details below to generate a comprehensive AI career intelligence report.
        </p>
      </div>

      <div className="w-full">
        {/* We reuse the glass styles for the form but ensure it renders fine in the dashboard */}
        <div id="app-section" className="force-light-mode">
          <OptimizerForm onSubmit={handleOptimize} isLoading={isLoading} />
        </div>
        
        {error && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-8 w-full p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-500/30 rounded-xl text-red-600 dark:text-red-400 text-center shadow-sm flex items-center justify-center gap-2"
          >
            <span>{error}</span>
          </motion.div>
        )}

        <div className="mt-12" id="app-section">
          <ResultsDisplay results={results} />
        </div>
      </div>
    </div>
  );
}
