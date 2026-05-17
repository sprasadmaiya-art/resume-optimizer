"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Sparkles, Loader2, Briefcase } from "lucide-react";
import FileUpload from "./FileUpload";
import SkillsInput from "./SkillsInput";

interface OptimizerFormProps {
  onSubmit: (resume: string, jobDescription: string, role: string, skills: string[]) => void;
  isLoading: boolean;
}

export default function OptimizerForm({ onSubmit, isLoading }: OptimizerFormProps) {
  const [resume, setResume] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [role, setRole] = useState("");
  const [skills, setSkills] = useState<string[]>([]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!resume.trim() || !jobDescription.trim() || !role.trim()) return;
    onSubmit(resume, jobDescription, role, skills);
  };

  const handleResumeExtracted = (text: string) => {
    setResume(text);
  };

  const handleJDExtracted = (text: string) => {
    setJobDescription(text);
  };

  return (
    <motion.form
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      onSubmit={handleSubmit}
      className="glass-card p-6 md:p-8 w-full max-w-3xl mx-auto space-y-10"
    >
      {/* 1. Resume Section */}
      <div className="space-y-4">
        <div>
          <h3 className="text-xl font-bold text-zinc-800 flex items-center gap-2">
            <span className="flex items-center justify-center w-6 h-6 rounded-full bg-teal-100 text-teal-700 text-sm">1</span>
            Your Resume
          </h3>
          <p className="text-sm text-zinc-500 mb-3 ml-8">Upload your current resume or paste the text.</p>
        </div>
        
        <div className="ml-8 space-y-4">
          <FileUpload onTextExtracted={handleResumeExtracted} isLoading={isLoading} />
          
          <div className="space-y-2 pt-2">
            <label htmlFor="resume" className="block text-sm font-medium text-zinc-700">
              Resume Content
            </label>
            <textarea
              id="resume"
              placeholder="Paste your current resume content here or upload a file above..."
              value={resume}
              onChange={(e) => setResume(e.target.value)}
              rows={6}
              className="w-full bg-white border border-zinc-200 rounded-xl px-4 py-3 text-zinc-900 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-teal-500/50 shadow-sm transition-all resize-y"
              disabled={isLoading}
              required
            />
          </div>
        </div>
      </div>

      {/* 2. Job Description Section */}
      <div className="border-t border-zinc-100 pt-8 space-y-4">
        <div>
          <h3 className="text-xl font-bold text-zinc-800 flex items-center gap-2">
            <span className="flex items-center justify-center w-6 h-6 rounded-full bg-indigo-100 text-indigo-700 text-sm">2</span>
            Job Description
          </h3>
          <p className="text-sm text-zinc-500 mb-3 ml-8">Paste the job description or upload it as a file to match against.</p>
        </div>

        <div className="ml-8 space-y-4">
          <FileUpload onTextExtracted={handleJDExtracted} isLoading={isLoading} />

          <div className="space-y-2 pt-2">
            <label htmlFor="jobDescription" className="block text-sm font-medium text-zinc-700 flex items-center gap-2">
              <Briefcase className="w-4 h-4 text-indigo-500" />
              Job Description Content
            </label>
            <textarea
              id="jobDescription"
              placeholder="Paste the target job description here..."
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
              rows={6}
              className="w-full bg-white border border-zinc-200 rounded-xl px-4 py-3 text-zinc-900 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 shadow-sm transition-all resize-y"
              disabled={isLoading}
              required
            />
          </div>
        </div>
      </div>

      {/* 3. Target Role & Skills */}
      <div className="border-t border-zinc-100 pt-8 space-y-6">
        <div>
          <h3 className="text-xl font-bold text-zinc-800 flex items-center gap-2">
            <span className="flex items-center justify-center w-6 h-6 rounded-full bg-amber-100 text-amber-700 text-sm">3</span>
            Role & Skills
          </h3>
          <p className="text-sm text-zinc-500 mb-3 ml-8">Tell us your target title and specific skills.</p>
        </div>

        <div className="ml-8 space-y-6">
          <div className="space-y-2">
            <label htmlFor="role" className="block text-sm font-medium text-zinc-700">
              Target Role
            </label>
            <input
              id="role"
              type="text"
              placeholder="e.g. Senior Frontend Developer, Product Manager"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full bg-white border border-zinc-200 rounded-xl px-4 py-3 text-zinc-900 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-amber-500/50 shadow-sm transition-all"
              disabled={isLoading}
              required
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-zinc-700">
              Your Skills (Optional)
            </label>
            <SkillsInput skills={skills} onChange={setSkills} disabled={isLoading} />
          </div>
        </div>
      </div>

      <div className="pt-6">
        <button
          type="submit"
          disabled={isLoading || !resume.trim() || !jobDescription.trim() || !role.trim()}
          className="w-full relative group overflow-hidden rounded-xl bg-zinc-900 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-md hover:shadow-xl hover:-translate-y-0.5"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-teal-500 to-indigo-500 opacity-90 group-hover:opacity-100 transition-opacity" />
          <div className="relative px-6 py-4 rounded-xl flex items-center justify-center gap-2 transition-all">
            {isLoading ? (
              <Loader2 className="w-5 h-5 text-white animate-spin" />
            ) : (
              <Sparkles className="w-5 h-5 text-white" />
            )}
            <span className="font-bold text-white text-lg tracking-wide">
              {isLoading ? "Generating Career Intelligence Report..." : "Generate Full Analysis"}
            </span>
          </div>
        </button>
      </div>
    </motion.form>
  );
}
