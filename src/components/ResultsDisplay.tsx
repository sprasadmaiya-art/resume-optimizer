"use client";

import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { Check, Copy, ChevronDown, ChevronUp, Download, FileText, FileDown } from "lucide-react";
import { usePostHog } from 'posthog-js/react';
import AtsScoreCard from "./AtsScoreCard";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

interface ResultsDisplayProps {
  results: {
    atsScore: number;
    atsScoreCategory: "Poor" | "Average" | "Good" | "Excellent";
    scoreAnalysis: {
      keywordMatch: string;
      formatting: string;
      missingSkills: string;
      overall: string;
    };
    strengths?: string[];
    interviewChance?: string;
    interviewReadiness?: string;
    improvementChecklist?: string[];
    feedback: string[];
    missingKeywords: string[];
    weakSections: string[];
    optimizedResume: string;
    linkedinAbout: string;
    skills: string[];
    achievements: string[];
  } | null;
}

export default function ResultsDisplay({ results }: ResultsDisplayProps) {
  const [isExporting, setIsExporting] = useState(false);
  const resumeRef = useRef<HTMLPreElement>(null);
  const posthog = usePostHog();

  if (!results) return null;

  const handleExportTXT = () => {
    const element = document.createElement("a");
    const file = new Blob([results.optimizedResume], { type: "text/plain" });
    element.href = URL.createObjectURL(file);
    element.download = "Optimized_Resume.txt";
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
    posthog.capture("export_txt_clicked");
  };

  const handleExportPDF = async () => {
    if (!resumeRef.current) return;
    setIsExporting(true);
    posthog.capture("export_pdf_clicked");
    
    try {
      // Basic PDF generation for text-heavy content
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "pt",
        format: "letter"
      });
      
      const margin = 40;
      const pdfWidth = pdf.internal.pageSize.getWidth() - (margin * 2);
      
      // Use jspdf's text splitting to handle wrap
      const textLines = pdf.splitTextToSize(results.optimizedResume, pdfWidth);
      
      let y = margin;
      const pageHeight = pdf.internal.pageSize.getHeight();
      
      for (let i = 0; i < textLines.length; i++) {
        if (y > pageHeight - margin) {
          pdf.addPage();
          y = margin;
        }
        pdf.text(textLines[i], margin, y);
        y += 14; // Line height
      }
      
      pdf.save("Optimized_Resume.pdf");
    } catch (error) {
      console.error("Error generating PDF:", error);
      alert("Failed to generate PDF. Please try TXT export instead.");
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className="w-full max-w-5xl mx-auto space-y-12 mt-16 mb-24">
      {/* ATS Score Section */}
      <section>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <h2 className="text-3xl font-extrabold text-zinc-900 tracking-tight">ATS Dashboard</h2>
          <p className="text-zinc-600 mt-2 text-lg">Comprehensive match analysis against the Job Description.</p>
        </motion.div>
        
        <AtsScoreCard
          score={results.atsScore}
          category={results.atsScoreCategory}
          analysis={results.scoreAnalysis}
          strengths={results.strengths}
          interviewChance={results.interviewChance}
          interviewReadiness={results.interviewReadiness}
          improvementChecklist={results.improvementChecklist}
          feedback={results.feedback}
          missingKeywords={results.missingKeywords}
          weakSections={results.weakSections}
        />
      </section>

      {/* Optimized Content Section */}
      <section className="pt-8 border-t border-zinc-200">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4"
        >
          <div>
            <h2 className="text-3xl font-extrabold text-zinc-900 tracking-tight">Optimized Profile</h2>
            <p className="text-zinc-600 mt-2 text-lg">AI-tailored content ready to use.</p>
          </div>
          
          <div className="flex flex-wrap gap-3">
            <button
              onClick={handleExportTXT}
              className="flex items-center gap-2 px-4 py-2 bg-white border border-zinc-200 text-zinc-700 rounded-lg hover:bg-zinc-50 transition-colors shadow-sm text-sm font-medium"
            >
              <FileText className="w-4 h-4" />
              TXT
            </button>
            <button
              onClick={handleExportPDF}
              disabled={isExporting}
              className="flex items-center gap-2 px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors shadow-sm text-sm font-medium disabled:opacity-70"
            >
              <FileDown className="w-4 h-4" />
              {isExporting ? "Generating..." : "Export PDF"}
            </button>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 gap-6">
          <ResultCard 
            title="Optimized Resume" 
            content={results.optimizedResume} 
            delay={0.2} 
            contentRef={resumeRef}
          />
          <ResultCard title="LinkedIn About Section" content={results.linkedinAbout} delay={0.3} />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <ListCard title="Targeted Skills to Add" items={results.skills} delay={0.4} />
            <ListCard title="JD-Specific Achievements" items={results.achievements} delay={0.5} />
          </div>
        </div>
      </section>
    </div>
  );
}

function ResultCard({ title, content, delay, contentRef }: { title: string; content: string; delay: number; contentRef?: React.RefObject<HTMLPreElement | null> }) {
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
        <div className="p-6 bg-white">
          <pre ref={contentRef} className="whitespace-pre-wrap font-sans text-zinc-700 leading-relaxed text-sm max-w-none">
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
      className="glass-card flex flex-col h-full overflow-hidden"
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
    </motion.div>
  );
}
