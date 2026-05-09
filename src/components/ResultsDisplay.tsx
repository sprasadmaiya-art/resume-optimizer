"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Check, Copy, ChevronDown, ChevronUp } from "lucide-react";

interface ResultsDisplayProps {
  results: {
    optimizedResume: string;
    linkedinAbout: string;
    skills: string[];
    achievements: string[];
  } | null;
}

export default function ResultsDisplay({ results }: ResultsDisplayProps) {
  if (!results) return null;

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6 mt-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <h2 className="text-2xl font-bold text-center text-gradient mb-8">Your Optimized Profile</h2>
      </motion.div>

      <div className="grid grid-cols-1 gap-6">
        <ResultCard title="Optimized Resume" content={results.optimizedResume} delay={0.2} />
        <ResultCard title="LinkedIn About Section" content={results.linkedinAbout} delay={0.3} />
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <ListCard title="Suggested Skills" items={results.skills} delay={0.4} />
          <ListCard title="Achievement Bullets" items={results.achievements} delay={0.5} />
        </div>
      </div>
    </div>
  );
}

function ResultCard({ title, content, delay }: { title: string; content: string; delay: number }) {
  const [copied, setCopied] = useState(false);
  const [expanded, setExpanded] = useState(true);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      className="glass-card overflow-hidden"
    >
      <div className="flex items-center justify-between p-4 border-b border-zinc-200 bg-zinc-50/50">
        <h3 className="font-semibold text-lg text-zinc-800">{title}</h3>
        <div className="flex items-center gap-2">
          <button
            onClick={handleCopy}
            className="p-2 hover:bg-zinc-200/50 rounded-lg transition-colors text-zinc-500 hover:text-zinc-800"
            title="Copy to clipboard"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
          </button>
          <button
            onClick={() => setExpanded(!expanded)}
            className="p-2 hover:bg-zinc-200/50 rounded-lg transition-colors text-zinc-500 hover:text-zinc-800"
          >
            {expanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>
        </div>
      </div>
      {expanded && (
        <div className="p-6">
          <pre className="whitespace-pre-wrap font-sans text-zinc-600 leading-relaxed text-sm">
            {content}
          </pre>
        </div>
      )}
    </motion.div>
  );
}

function ListCard({ title, items, delay }: { title: string; items: string[]; delay: number }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    const content = items.map(item => `• ${item}`).join('\n');
    await navigator.clipboard.writeText(content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      className="glass-card flex flex-col h-full"
    >
      <div className="flex items-center justify-between p-4 border-b border-zinc-200 bg-zinc-50/50">
        <h3 className="font-semibold text-lg text-zinc-800">{title}</h3>
        <button
          onClick={handleCopy}
          className="p-2 hover:bg-zinc-200/50 rounded-lg transition-colors text-zinc-500 hover:text-zinc-800"
          title="Copy to clipboard"
        >
          {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
        </button>
      </div>
      <div className="p-6 flex-grow">
        <ul className="space-y-3">
          {items.map((item, idx) => (
            <li key={idx} className="flex gap-3 text-sm text-zinc-600">
              <span className="text-teal-500 mt-1">•</span>
              <span className="leading-relaxed">{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
}
