"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import OptimizerForm from "@/components/OptimizerForm";
import ResultsDisplay from "@/components/ResultsDisplay";
import { usePostHog } from 'posthog-js/react';
import { Sparkles, CheckCircle2 } from "lucide-react";

export default function OptimizePage() {
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState(null);
  const [error, setError] = useState<string | null>(null);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
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
      setShowSuccessModal(true);
      
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
      let errorMessage = err.message || "An unexpected error occurred.";
      try {
        // Attempt to parse if it's a JSON string (e.g., from Gemini API)
        const parsed = JSON.parse(errorMessage);
        if (parsed?.error?.message) {
          errorMessage = parsed.error.message;
        } else if (parsed?.message) {
          errorMessage = parsed.message;
        }
      } catch (e) {
        // Ignore parse error, use original message
      }
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const resetForm = () => {
    setResults(null);
    setError(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      {/* Full Screen Success Modal */}
      <AnimatePresence>
        {showSuccessModal && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
          >
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-8 max-w-md w-full shadow-2xl text-center relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-teal-500/10 to-indigo-500/10 dark:from-teal-900/20 dark:to-indigo-900/20"></div>
              
              <div className="w-20 h-20 mx-auto bg-gradient-to-br from-teal-400 to-emerald-500 rounded-full flex items-center justify-center mb-6 shadow-lg shadow-teal-500/30 relative z-10">
                <CheckCircle2 className="w-10 h-10 text-white" />
              </div>
              
              <h2 className="text-3xl font-extrabold text-zinc-900 dark:text-white mb-3 relative z-10 tracking-tight">Analysis Complete!</h2>
              <p className="text-zinc-600 dark:text-zinc-400 mb-8 relative z-10 leading-relaxed">
                Your Career Intelligence Report is ready. We've mapped out your skills gap, prepared your interview flashcards, and plotted your career trajectory.
              </p>
              
              <button 
                onClick={() => setShowSuccessModal(false)}
                className="w-full py-4 bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 rounded-xl font-bold text-lg hover:bg-zinc-800 dark:hover:bg-zinc-100 transition-colors shadow-md relative z-10 flex justify-center items-center gap-2 group"
              >
                <Sparkles className="w-5 h-5 group-hover:rotate-12 transition-transform" /> Enter Dashboard
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="space-y-8 pb-12">
        {!results && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="mb-8">
              <h1 className="text-3xl font-heading font-bold text-zinc-900 dark:text-white">New Optimization</h1>
              <p className="text-zinc-600 dark:text-zinc-400 mt-2">
                Enter your details below to generate a comprehensive AI career intelligence report.
              </p>
            </div>

            <div className="w-full">
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
            </div>
          </motion.div>
        )}

        {results && !showSuccessModal && (
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="w-full"
          >
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8 bg-zinc-50 dark:bg-zinc-900/50 p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800">
              <div>
                <h1 className="text-2xl font-heading font-bold text-zinc-900 dark:text-white flex items-center gap-3">
                  <Sparkles className="w-6 h-6 text-teal-500" /> Career Intelligence Report
                </h1>
                <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">Review your personalized AI career feedback below.</p>
              </div>
              <button 
                onClick={resetForm}
                className="px-5 py-2.5 text-sm font-bold text-zinc-700 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white bg-white dark:bg-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-700 border border-zinc-200 dark:border-zinc-700 shadow-sm rounded-xl transition-all"
              >
                Start New Analysis
              </button>
            </div>
            
            <div id="app-section">
              <ResultsDisplay results={results} />
            </div>
          </motion.div>
        )}
      </div>
    </>
  );
}
