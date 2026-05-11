"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Sparkles, Loader2 } from "lucide-react";
import FileUpload from "./FileUpload";
import SkillsInput from "./SkillsInput";

interface OptimizerFormProps {
  onSubmit: (resume: string, role: string, skills: string[]) => void;
  isLoading: boolean;
}

export default function OptimizerForm({ onSubmit, isLoading }: OptimizerFormProps) {
  const [resume, setResume] = useState("");
  const [role, setRole] = useState("");
  const [skills, setSkills] = useState<string[]>([]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!resume.trim() || !role.trim()) return;
    onSubmit(resume, role, skills);
  };

  const handleTextExtracted = (text: string) => {
    setResume(text);
  };

  return (
    <motion.form
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      onSubmit={handleSubmit}
      className="glass-card p-6 md:p-8 w-full max-w-3xl mx-auto space-y-8"
    >
      {/* Resume Section */}
      <div className="space-y-4">
        <div>
          <h3 className="text-lg font-semibold text-zinc-800">1. Upload Resume</h3>
          <p className="text-sm text-zinc-500 mb-3">Upload your current resume or paste the text below.</p>
        </div>
        
        <FileUpload onTextExtracted={handleTextExtracted} isLoading={isLoading} />
        
        <div className="space-y-2 pt-2">
          <label htmlFor="resume" className="block text-sm font-medium text-zinc-700">
            Resume Content
          </label>
          <textarea
            id="resume"
            placeholder="Paste your current resume content here or upload a file above..."
            value={resume}
            onChange={(e) => setResume(e.target.value)}
            rows={8}
            className="w-full bg-white border border-zinc-200 rounded-xl px-4 py-3 text-zinc-900 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-teal-500/50 shadow-sm transition-all resize-y"
            disabled={isLoading}
            required
          />
        </div>
      </div>

      <div className="border-t border-zinc-100 pt-6 space-y-6">
        <div>
          <h3 className="text-lg font-semibold text-zinc-800">2. Target Role & Skills</h3>
          <p className="text-sm text-zinc-500 mb-3">Tell us what you are aiming for.</p>
        </div>

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
            className="w-full bg-white border border-zinc-200 rounded-xl px-4 py-3 text-zinc-900 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-teal-500/50 shadow-sm transition-all"
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

      <div className="pt-4">
        <button
          type="submit"
          disabled={isLoading || !resume.trim() || !role.trim()}
          className="w-full relative group overflow-hidden rounded-xl bg-gradient-to-r from-teal-500 to-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5"
        >
          <div className="relative px-6 py-4 rounded-xl flex items-center justify-center gap-2 transition-all">
            {isLoading ? (
              <Loader2 className="w-5 h-5 text-white animate-spin" />
            ) : (
              <Sparkles className="w-5 h-5 text-white" />
            )}
            <span className="font-semibold text-white text-lg tracking-wide">
              {isLoading ? "Generating ATS Analysis..." : "Optimize Resume & Get ATS Score"}
            </span>
          </div>
        </button>
      </div>
    </motion.form>
  );
}
