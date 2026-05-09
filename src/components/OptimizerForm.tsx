"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Sparkles, Loader2 } from "lucide-react";

interface OptimizerFormProps {
  onSubmit: (resume: string, role: string) => void;
  isLoading: boolean;
}

export default function OptimizerForm({ onSubmit, isLoading }: OptimizerFormProps) {
  const [resume, setResume] = useState("");
  const [role, setRole] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!resume.trim() || !role.trim()) return;
    onSubmit(resume, role);
  };

  return (
    <motion.form
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      onSubmit={handleSubmit}
      className="glass-card p-6 md:p-8 w-full max-w-3xl mx-auto space-y-6"
    >
      <div className="space-y-2">
        <label htmlFor="role" className="block text-sm font-medium text-zinc-300">
          Target Role
        </label>
        <input
          id="role"
          type="text"
          placeholder="e.g. Senior Frontend Developer, Product Manager"
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="w-full bg-zinc-900/50 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-violet-500/50 transition-all"
          disabled={isLoading}
          required
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="resume" className="block text-sm font-medium text-zinc-300">
          Current Resume / Profile
        </label>
        <textarea
          id="resume"
          placeholder="Paste your current resume content here..."
          value={resume}
          onChange={(e) => setResume(e.target.value)}
          rows={8}
          className="w-full bg-zinc-900/50 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-violet-500/50 transition-all resize-none"
          disabled={isLoading}
          required
        />
      </div>

      <button
        type="submit"
        disabled={isLoading || !resume.trim() || !role.trim()}
        className="w-full relative group overflow-hidden rounded-xl bg-gradient-to-r from-violet-600 to-cyan-600 p-[1px] disabled:opacity-50 disabled:cursor-not-allowed transition-all"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-violet-600 to-cyan-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-md" />
        <div className="relative bg-zinc-950/80 px-6 py-4 rounded-xl flex items-center justify-center gap-2 transition-all group-hover:bg-transparent">
          {isLoading ? (
            <Loader2 className="w-5 h-5 text-white animate-spin" />
          ) : (
            <Sparkles className="w-5 h-5 text-white" />
          )}
          <span className="font-semibold text-white">
            {isLoading ? "Optimizing with AI..." : "Optimize Resume"}
          </span>
        </div>
      </button>
    </motion.form>
  );
}
