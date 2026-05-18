"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, Copy, ChevronDown, ChevronUp, FileText, FileDown, Briefcase, Eye, MessageSquare, Compass, FileSignature } from "lucide-react";
import { usePostHog } from 'posthog-js/react';
import jsPDF from "jspdf";

import AtsScoreCard from "./AtsScoreCard";
import RecruiterSimulator from "./RecruiterSimulator";
import InterviewPrep from "./InterviewPrep";
import CareerRecommendations from "./CareerRecommendations";
import { cn } from "@/lib/utils";

interface ResultsDisplayProps {
  results: any; // We'll just use any for now to handle the massive schema
}

export default function ResultsDisplay({ results }: ResultsDisplayProps) {
  const [activeTab, setActiveTab] = useState<"match" | "recruiter" | "interview" | "career" | "resume">("match");
  const [isExporting, setIsExporting] = useState(false);
  const resumeRef = useRef<HTMLPreElement>(null);
  const posthog = usePostHog();

  if (!results) return null;

  const tabs = [
    { id: "match", label: "Job Match", icon: <Briefcase className="w-4 h-4" /> },
    { id: "recruiter", label: "Recruiter AI", icon: <Eye className="w-4 h-4" /> },
    { id: "interview", label: "Interview Prep", icon: <MessageSquare className="w-4 h-4" /> },
    { id: "career", label: "Career Path", icon: <Compass className="w-4 h-4" /> },
    { id: "resume", label: "Optimized Resume", icon: <FileSignature className="w-4 h-4" /> },
  ] as const;

  const handleTabChange = (tabId: typeof activeTab) => {
    setActiveTab(tabId);
    posthog.capture(`viewed_tab_${tabId}`);
  };

  // Global export functions have been removed in favor of localized PDF downloads

  return (
    <div className="w-full max-w-5xl mx-auto space-y-8 mt-16 mb-24">
      {/* Header & Exports */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h2 className="text-3xl font-extrabold text-zinc-900 tracking-tight">Career Intelligence Dashboard</h2>
          <p className="text-zinc-600 mt-2 text-lg">Your personalized career and interview strategy.</p>
        </div>
      </div>

      {/* Navigation Tabs - High Visibility */}
      <div className="flex flex-wrap justify-center gap-4 pb-8 mb-4 border-b border-zinc-200/50 dark:border-zinc-800/50">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => handleTabChange(tab.id)}
              className={cn(
                "group flex items-center gap-3 px-8 py-4 text-base font-extrabold rounded-2xl transition-all duration-300 whitespace-nowrap shadow-sm border-2",
                activeTab === tab.id 
                  ? "bg-gradient-to-br from-teal-500 to-emerald-600 text-white border-transparent shadow-teal-500/30 shadow-xl transform scale-105 ring-4 ring-teal-500/20" 
                  : "bg-white/80 dark:bg-zinc-900/80 backdrop-blur-sm border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400 hover:border-teal-400 dark:hover:border-teal-600 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-50 dark:hover:bg-zinc-800 hover:shadow-lg hover:-translate-y-1"
              )}
            >
              <div className={cn(
                "p-2 rounded-xl transition-colors duration-300",
                activeTab === tab.id 
                  ? "bg-white/20 text-white" 
                  : "bg-zinc-100 dark:bg-zinc-800 text-zinc-500 dark:text-zinc-400 group-hover:bg-teal-100 dark:group-hover:bg-teal-900/30 group-hover:text-teal-600 dark:group-hover:text-teal-400"
              )}>
                {tab.icon}
              </div>
              <span className="tracking-wide uppercase text-sm">{tab.label}</span>
            </button>
          ))}
      </div>

      {/* Tab Content */}
      <div className="pt-6 min-h-[400px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            {activeTab === "match" && results.match && <AtsScoreCard match={results.match} />}
            {activeTab === "recruiter" && results.recruiterSimulator && <RecruiterSimulator data={results.recruiterSimulator} />}
            {activeTab === "interview" && results.interviewPrep && <InterviewPrep data={results.interviewPrep} />}
            {activeTab === "career" && results.careerRecommendations && <CareerRecommendations data={results.careerRecommendations} />}
            
            {activeTab === "resume" && results.optimization && (
              <div className="grid grid-cols-1 gap-6">
                <ResultCard 
                  title="Optimized Resume" 
                  content={results.optimization.optimizedResume} 
                  contentRef={resumeRef}
                  showDownload={true}
                />
                <ResultCard title="LinkedIn About Section" content={results.optimization.linkedinAbout} />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <ListCard title="Achievements to Add" items={results.optimization.achievements || []} />
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

function ResultCard({ title, content, contentRef, showDownload = false }: { title: string; content: string; contentRef?: React.RefObject<HTMLPreElement | null>; showDownload?: boolean }) {
  const [copied, setCopied] = useState(false);
  const [expanded, setExpanded] = useState(true);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadPDF = () => {
    const pdf = new jsPDF({ orientation: "portrait", unit: "pt", format: "letter" });
    const margin = 40;
    const pdfWidth = pdf.internal.pageSize.getWidth() - (margin * 2);
    let y = margin;

    pdf.setFont("helvetica", "normal");
    pdf.setFontSize(11);
    const lines = pdf.splitTextToSize(content, pdfWidth);
    for (let i = 0; i < lines.length; i++) {
      if (y > pdf.internal.pageSize.getHeight() - margin) {
        pdf.addPage();
        y = margin;
      }
      pdf.text(lines[i], margin, y);
      y += 16;
    }
    pdf.save(`${title.replace(/\s+/g, "_")}.pdf`);
  };

  return (
    <div className="glass-card overflow-hidden border border-zinc-200">
      <div className="flex items-center justify-between p-4 border-b border-zinc-200 bg-zinc-50/50">
        <h3 className="font-semibold text-lg text-zinc-800">{title}</h3>
        <div className="flex items-center gap-2">
          {showDownload && (
            <button
              onClick={handleDownloadPDF}
              className="p-2 hover:bg-zinc-200/50 rounded-lg transition-colors text-zinc-500 hover:text-zinc-800"
              title="Download PDF"
            >
              <FileDown className="w-4 h-4" />
            </button>
          )}
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
        <div className="p-6 bg-white">
          <pre ref={contentRef} className="whitespace-pre-wrap font-sans text-zinc-700 leading-relaxed text-sm max-w-none">
            {content}
          </pre>
        </div>
      )}
    </div>
  );
}

function ListCard({ title, items }: { title: string; items: string[] }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    const content = items.map(item => `• ${item}`).join('\n');
    await navigator.clipboard.writeText(content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="glass-card flex flex-col h-full overflow-hidden border border-zinc-200">
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
      <div className="p-6 bg-white flex-grow">
        <ul className="space-y-3">
          {items.map((item, idx) => (
            <li key={idx} className="flex gap-3 text-sm text-zinc-700 items-start">
              <span className="text-teal-500 mt-1 shrink-0">•</span>
              <span className="leading-relaxed">{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
