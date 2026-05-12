"use client";

import { motion } from "framer-motion";
import { UserX, Eye, ShieldAlert, Crosshair, AlertOctagon } from "lucide-react";

interface RecruiterSimulatorProps {
  data: {
    firstImpression: string;
    likelyConcerns: string[];
    readabilityFeedback: string;
    scanningBehavior: string;
    noticesFirst: string[];
    rejectionRisks: string[];
  };
}

export default function RecruiterSimulator({ data }: RecruiterSimulatorProps) {
  if (!data) return null;

  return (
    <div className="w-full space-y-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 rounded-full bg-rose-100 flex items-center justify-center border border-rose-200">
          <UserX className="w-6 h-6 text-rose-600" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-zinc-900">Recruiter AI Simulator</h2>
          <p className="text-sm text-zinc-500">Unfiltered feedback from an AI trained on recruiter behavior.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* First Impression & Scanning */}
        <div className="space-y-6">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-card p-6 border-t-4 border-t-rose-500 bg-gradient-to-b from-rose-50/50 to-white"
          >
            <h3 className="font-semibold text-lg text-zinc-800 flex items-center gap-2 mb-3">
              <Eye className="w-5 h-5 text-rose-500" />
              First Impression (6-Second Scan)
            </h3>
            <p className="text-zinc-700 leading-relaxed italic border-l-2 border-rose-200 pl-4 py-1">
              "{data.firstImpression}"
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="glass-card p-6"
          >
            <h3 className="font-semibold text-lg text-zinc-800 flex items-center gap-2 mb-3">
              <Crosshair className="w-5 h-5 text-indigo-500" />
              Scanning Behavior
            </h3>
            <p className="text-sm text-zinc-600 mb-4">{data.scanningBehavior}</p>
            
            <h4 className="text-xs font-bold text-zinc-400 uppercase tracking-wider mb-2">What They Notice First</h4>
            <div className="flex flex-wrap gap-2">
              {data.noticesFirst.map((item, idx) => (
                <span key={idx} className="px-3 py-1 bg-indigo-50 text-indigo-700 text-sm font-medium rounded-md border border-indigo-100">
                  {item}
                </span>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Concerns & Risks */}
        <div className="space-y-6">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="glass-card p-6 bg-amber-50/30 border-amber-100"
          >
            <h3 className="font-semibold text-lg text-zinc-800 flex items-center gap-2 mb-4">
              <ShieldAlert className="w-5 h-5 text-amber-500" />
              Likely Concerns
            </h3>
            <ul className="space-y-3">
              {data.likelyConcerns.map((concern, idx) => (
                <li key={idx} className="flex gap-3 text-sm text-zinc-700 items-start">
                  <span className="text-amber-500 mt-0.5 shrink-0">•</span>
                  <span className="leading-relaxed">{concern}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="glass-card p-6 border-l-4 border-l-red-500"
          >
            <h3 className="font-semibold text-lg text-zinc-800 flex items-center gap-2 mb-4">
              <AlertOctagon className="w-5 h-5 text-red-500" />
              Rejection Risks
            </h3>
            <ul className="space-y-3">
              {data.rejectionRisks.map((risk, idx) => (
                <li key={idx} className="flex gap-3 text-sm text-zinc-700 items-start">
                  <span className="text-red-500 mt-0.5 shrink-0">✕</span>
                  <span className="leading-relaxed font-medium">{risk}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
      
      <div className="glass-card p-5 bg-zinc-50 border border-zinc-200">
        <h4 className="text-xs font-bold text-zinc-500 uppercase tracking-wider mb-2">Readability & Formatting</h4>
        <p className="text-sm text-zinc-600">{data.readabilityFeedback}</p>
      </div>
    </div>
  );
}
