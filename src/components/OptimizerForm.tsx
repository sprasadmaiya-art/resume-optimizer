"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Loader2, Briefcase, FileText, UploadCloud, Edit3, Target } from "lucide-react";
import FileUpload from "./FileUpload";
import SkillsInput from "./SkillsInput";
import { cn } from "@/lib/utils";

interface OptimizerFormProps {
  onSubmit: (resume: string, jobDescription: string, role: string, skills: string[]) => void;
  isLoading: boolean;
}

export default function OptimizerForm({ onSubmit, isLoading }: OptimizerFormProps) {
  const [resume, setResume] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [role, setRole] = useState("");
  const [skills, setSkills] = useState<string[]>([]);
  
  const [resumeMode, setResumeMode] = useState<"upload" | "paste">("upload");
  const [jdMode, setJdMode] = useState<"upload" | "paste">("upload");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!resume.trim() || !jobDescription.trim() || !role.trim()) return;
    onSubmit(resume, jobDescription, role, skills);
  };

  const handleResumeExtracted = (text: string) => {
    setResume(text);
    // Automatically switch to paste mode to show the extracted text so they can edit if needed
    setResumeMode("paste");
  };

  const handleJDExtracted = (text: string) => {
    setJobDescription(text);
    setJdMode("paste");
  };

  return (
    <motion.form
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      onSubmit={handleSubmit}
      className="w-full max-w-4xl mx-auto space-y-12 relative"
    >
      {/* Decorative background blur */}
      <div className="absolute inset-0 bg-gradient-to-br from-teal-500/5 to-indigo-500/5 dark:from-teal-900/10 dark:to-indigo-900/10 rounded-3xl -z-10 blur-xl"></div>

      {/* 1. Resume Section */}
      <div className="relative">
        <div className="absolute top-8 bottom-[-3rem] left-[15px] w-[2px] bg-gradient-to-b from-teal-200 to-indigo-200 dark:from-teal-800 dark:to-indigo-800 -z-10 hidden sm:block"></div>
        <div className="flex items-start gap-4">
          <div className="hidden sm:flex shrink-0 items-center justify-center w-8 h-8 rounded-full bg-teal-100 dark:bg-teal-900/50 text-teal-600 dark:text-teal-400 font-bold border-4 border-white dark:border-zinc-950 z-10 shadow-sm">
            1
          </div>
          <div className="flex-1 space-y-6 bg-white/60 dark:bg-zinc-900/40 backdrop-blur-md p-6 sm:p-8 rounded-3xl border border-zinc-200/50 dark:border-zinc-800/50 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h3 className="text-xl font-extrabold text-zinc-900 dark:text-white flex items-center gap-2">
                  <FileText className="w-5 h-5 text-teal-500" />
                  Your Resume
                </h3>
                <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">Upload your current resume or paste the content.</p>
              </div>
              
              <div className="flex p-1 bg-zinc-100 dark:bg-zinc-900 rounded-xl">
                <button
                  type="button"
                  onClick={() => setResumeMode("upload")}
                  className={cn(
                    "flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all",
                    resumeMode === "upload" ? "bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white shadow-sm" : "text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300"
                  )}
                >
                  <UploadCloud className="w-4 h-4" /> Upload
                </button>
                <button
                  type="button"
                  onClick={() => setResumeMode("paste")}
                  className={cn(
                    "flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all",
                    resumeMode === "paste" ? "bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white shadow-sm" : "text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300"
                  )}
                >
                  <Edit3 className="w-4 h-4" /> Paste Text
                </button>
              </div>
            </div>

            <AnimatePresence mode="wait">
              {resumeMode === "upload" ? (
                <motion.div
                  key="upload"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                >
                  <FileUpload onTextExtracted={handleResumeExtracted} isLoading={isLoading} />
                </motion.div>
              ) : (
                <motion.div
                  key="paste"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                >
                  <textarea
                    id="resume"
                    placeholder="Paste your resume content here..."
                    value={resume}
                    onChange={(e) => setResume(e.target.value)}
                    rows={8}
                    className="w-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl px-5 py-4 text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-teal-500/50 shadow-inner transition-all resize-y"
                    disabled={isLoading}
                    required
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* 2. Job Description Section */}
      <div className="relative">
        <div className="absolute top-8 bottom-[-3rem] left-[15px] w-[2px] bg-gradient-to-b from-indigo-200 to-amber-200 dark:from-indigo-800 dark:to-amber-800 -z-10 hidden sm:block"></div>
        <div className="flex items-start gap-4">
          <div className="hidden sm:flex shrink-0 items-center justify-center w-8 h-8 rounded-full bg-indigo-100 dark:bg-indigo-900/50 text-indigo-600 dark:text-indigo-400 font-bold border-4 border-white dark:border-zinc-950 z-10 shadow-sm">
            2
          </div>
          <div className="flex-1 space-y-6 bg-white/60 dark:bg-zinc-900/40 backdrop-blur-md p-6 sm:p-8 rounded-3xl border border-zinc-200/50 dark:border-zinc-800/50 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h3 className="text-xl font-extrabold text-zinc-900 dark:text-white flex items-center gap-2">
                  <Briefcase className="w-5 h-5 text-indigo-500" />
                  Job Description
                </h3>
                <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">Paste or upload the target job description.</p>
              </div>
              
              <div className="flex p-1 bg-zinc-100 dark:bg-zinc-900 rounded-xl">
                <button
                  type="button"
                  onClick={() => setJdMode("upload")}
                  className={cn(
                    "flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all",
                    jdMode === "upload" ? "bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white shadow-sm" : "text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300"
                  )}
                >
                  <UploadCloud className="w-4 h-4" /> Upload
                </button>
                <button
                  type="button"
                  onClick={() => setJdMode("paste")}
                  className={cn(
                    "flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all",
                    jdMode === "paste" ? "bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white shadow-sm" : "text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300"
                  )}
                >
                  <Edit3 className="w-4 h-4" /> Paste Text
                </button>
              </div>
            </div>

            <AnimatePresence mode="wait">
              {jdMode === "upload" ? (
                <motion.div
                  key="upload"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                >
                  <FileUpload onTextExtracted={handleJDExtracted} isLoading={isLoading} />
                </motion.div>
              ) : (
                <motion.div
                  key="paste"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                >
                  <textarea
                    id="jobDescription"
                    placeholder="Paste the target job description here..."
                    value={jobDescription}
                    onChange={(e) => setJobDescription(e.target.value)}
                    rows={8}
                    className="w-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl px-5 py-4 text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 shadow-inner transition-all resize-y"
                    disabled={isLoading}
                    required
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* 3. Target Role & Skills */}
      <div className="relative">
        <div className="flex items-start gap-4">
          <div className="hidden sm:flex shrink-0 items-center justify-center w-8 h-8 rounded-full bg-amber-100 dark:bg-amber-900/50 text-amber-600 dark:text-amber-400 font-bold border-4 border-white dark:border-zinc-950 z-10 shadow-sm">
            3
          </div>
          <div className="flex-1 space-y-6 bg-white/60 dark:bg-zinc-900/40 backdrop-blur-md p-6 sm:p-8 rounded-3xl border border-zinc-200/50 dark:border-zinc-800/50 shadow-sm hover:shadow-md transition-shadow">
            <div>
              <h3 className="text-xl font-extrabold text-zinc-900 dark:text-white flex items-center gap-2">
                <Target className="w-5 h-5 text-amber-500" />
                Role & Skills
              </h3>
              <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">Specify your target title and additional skills.</p>
            </div>

            <div className="space-y-6">
              <div className="space-y-3">
                <label htmlFor="role" className="block text-sm font-bold text-zinc-700 dark:text-zinc-300">
                  Target Role
                </label>
                <input
                  id="role"
                  type="text"
                  placeholder="e.g. Senior Frontend Developer, Product Manager"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className="w-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl px-5 py-3 text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-amber-500/50 shadow-inner transition-all"
                  disabled={isLoading}
                  required
                />
              </div>

              <div className="space-y-3">
                <label className="block text-sm font-bold text-zinc-700 dark:text-zinc-300">
                  Additional Skills (Optional)
                </label>
                <div className="bg-white dark:bg-zinc-900 rounded-xl p-2 border border-zinc-200 dark:border-zinc-800 shadow-inner">
                  <SkillsInput skills={skills} onChange={setSkills} disabled={isLoading} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="pt-8 sm:pl-12">
        <button
          type="submit"
          disabled={isLoading || !resume.trim() || !jobDescription.trim() || !role.trim()}
          className="w-full relative group overflow-hidden rounded-2xl bg-zinc-900 dark:bg-white disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-[0_0_40px_-10px_rgba(20,184,166,0.3)] hover:shadow-[0_0_60px_-10px_rgba(20,184,166,0.5)] hover:-translate-y-1 duration-300"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-teal-500 via-indigo-500 to-teal-500 opacity-90 group-hover:opacity-100 transition-opacity bg-[length:200%_auto] animate-gradient" />
          <div className="relative px-8 py-5 rounded-2xl flex items-center justify-center gap-3 transition-all">
            {isLoading ? (
              <Loader2 className="w-6 h-6 text-white animate-spin" />
            ) : (
              <Sparkles className="w-6 h-6 text-white" />
            )}
            <span className="font-extrabold text-white text-xl tracking-tight">
              {isLoading ? "Analyzing Profile..." : "Generate Career Intelligence Report"}
            </span>
          </div>
        </button>
      </div>
    </motion.form>
  );
}
