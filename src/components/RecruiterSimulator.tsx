"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, User, AlertCircle, CheckCircle2 } from "lucide-react";

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

const TypingIndicator = () => (
  <div className="flex space-x-1 p-4 bg-zinc-100 dark:bg-zinc-800/80 rounded-2xl rounded-tl-none w-fit border border-zinc-200/50 dark:border-zinc-700/50">
    <motion.div
      className="w-2 h-2 bg-zinc-400 dark:bg-zinc-500 rounded-full"
      animate={{ y: [0, -5, 0] }}
      transition={{ duration: 0.6, repeat: Infinity, delay: 0 }}
    />
    <motion.div
      className="w-2 h-2 bg-zinc-400 dark:bg-zinc-500 rounded-full"
      animate={{ y: [0, -5, 0] }}
      transition={{ duration: 0.6, repeat: Infinity, delay: 0.2 }}
    />
    <motion.div
      className="w-2 h-2 bg-zinc-400 dark:bg-zinc-500 rounded-full"
      animate={{ y: [0, -5, 0] }}
      transition={{ duration: 0.6, repeat: Infinity, delay: 0.4 }}
    />
  </div>
);

export default function RecruiterSimulator({ data }: RecruiterSimulatorProps) {
  const [messages, setMessages] = useState<number[]>([]);
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    if (!data) return;
    
    // Sequence the messages to appear like a chat
    const sequence = async () => {
      setMessages([]);
      
      const delays = [1000, 2000, 2500, 2500, 2000]; // Delays between messages
      
      for (let i = 0; i < 5; i++) {
        setIsTyping(true);
        await new Promise(r => setTimeout(r, delays[i]));
        setIsTyping(false);
        setMessages(prev => [...prev, i]);
      }
    };
    
    sequence();
  }, [data]);

  if (!data) return null;

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="flex items-center gap-4 mb-8 p-4 glass-card border border-zinc-200 dark:border-zinc-800 rounded-2xl shadow-sm">
        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-400 to-pink-500 flex items-center justify-center shadow-lg border-2 border-white dark:border-zinc-800 shrink-0">
          <Sparkles className="w-5 h-5 text-white" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-zinc-900 dark:text-white flex items-center gap-2">
            Alex (AI Recruiter) 
            <span className="px-2 py-0.5 rounded-full bg-purple-100 dark:bg-purple-900/30 text-[10px] text-purple-600 dark:text-purple-400 font-bold uppercase tracking-wider border border-purple-200 dark:border-purple-800">
              Online
            </span>
          </h2>
          <p className="text-sm text-zinc-500 dark:text-zinc-400">Reviewing your profile against the job description...</p>
        </div>
      </div>

      <div className="space-y-6 px-2 md:px-6">
        <AnimatePresence>
          {messages.includes(0) && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex gap-4"
            >
              <div className="w-8 h-8 rounded-full bg-purple-100 dark:bg-purple-900/30 shrink-0 border border-purple-200 dark:border-purple-800 flex items-center justify-center mt-1">
                 <Sparkles className="w-4 h-4 text-purple-500" />
              </div>
              <div className="bg-zinc-100 dark:bg-zinc-800/80 p-4 rounded-2xl rounded-tl-none w-full md:w-4/5 shadow-sm border border-zinc-200/50 dark:border-zinc-700/50 text-zinc-800 dark:text-zinc-200">
                <p className="font-semibold text-sm text-purple-600 dark:text-purple-400 mb-2">First Impression</p>
                <p className="leading-relaxed">{data.firstImpression}</p>
              </div>
            </motion.div>
          )}

          {messages.includes(1) && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex gap-4"
            >
              <div className="w-8 h-8 rounded-full bg-purple-100 dark:bg-purple-900/30 shrink-0 border border-purple-200 dark:border-purple-800 flex items-center justify-center mt-1">
                 <Sparkles className="w-4 h-4 text-purple-500" />
              </div>
              <div className="bg-zinc-100 dark:bg-zinc-800/80 p-4 rounded-2xl rounded-tl-none w-full md:w-4/5 shadow-sm border border-zinc-200/50 dark:border-zinc-700/50 text-zinc-800 dark:text-zinc-200">
                <p className="font-semibold text-sm text-indigo-600 dark:text-indigo-400 mb-2">Scanning Behavior</p>
                <p className="mb-3 leading-relaxed">{data.scanningBehavior}</p>
                <div className="bg-white dark:bg-zinc-900/50 p-3 rounded-xl border border-zinc-200 dark:border-zinc-800">
                  <p className="text-xs font-bold text-zinc-500 uppercase tracking-wider mb-2">What caught my eye first:</p>
                  <div className="flex flex-wrap gap-2">
                    {data.noticesFirst.map((item, idx) => (
                      <span key={idx} className="px-3 py-1 bg-indigo-50 dark:bg-indigo-900/20 text-indigo-700 dark:text-indigo-300 text-sm font-medium rounded-md border border-indigo-100 dark:border-indigo-800/50">
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {messages.includes(2) && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex gap-4"
            >
              <div className="w-8 h-8 rounded-full bg-amber-100 dark:bg-amber-900/30 shrink-0 border border-amber-200 dark:border-amber-800 flex items-center justify-center mt-1">
                 <AlertCircle className="w-4 h-4 text-amber-600" />
              </div>
              <div className="bg-amber-50 dark:bg-amber-900/10 p-4 rounded-2xl rounded-tl-none w-full md:w-4/5 shadow-sm border border-amber-200/50 dark:border-amber-800/30 text-zinc-800 dark:text-zinc-200">
                <p className="font-semibold text-sm text-amber-700 dark:text-amber-500 mb-2">Likely Concerns</p>
                <p className="mb-3 text-sm text-amber-900/70 dark:text-amber-200/70">To be completely transparent, here are the main concerns I have:</p>
                <ul className="space-y-2">
                  {data.likelyConcerns.map((concern, idx) => (
                    <li key={idx} className="flex gap-2 text-sm items-start">
                      <span className="text-amber-500 mt-0.5 shrink-0">•</span>
                      <span className="leading-relaxed">{concern}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          )}

          {messages.includes(3) && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex gap-4"
            >
              <div className="w-8 h-8 rounded-full bg-red-100 dark:bg-red-900/30 shrink-0 border border-red-200 dark:border-red-800 flex items-center justify-center mt-1">
                 <AlertCircle className="w-4 h-4 text-red-600" />
              </div>
              <div className="bg-red-50 dark:bg-red-900/10 p-4 rounded-2xl rounded-tl-none w-full md:w-4/5 shadow-sm border border-red-200/50 dark:border-red-800/30 text-zinc-800 dark:text-zinc-200">
                <p className="font-semibold text-sm text-red-700 dark:text-red-500 mb-2">Rejection Risks</p>
                <p className="mb-3 text-sm text-red-900/70 dark:text-red-200/70">If I had to pass on this resume, it would probably be due to these factors:</p>
                <ul className="space-y-2">
                  {data.rejectionRisks.map((risk, idx) => (
                    <li key={idx} className="flex gap-2 text-sm items-start">
                      <span className="text-red-500 mt-0.5 shrink-0">✕</span>
                      <span className="leading-relaxed font-medium">{risk}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          )}

          {messages.includes(4) && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex gap-4"
            >
              <div className="w-8 h-8 rounded-full bg-teal-100 dark:bg-teal-900/30 shrink-0 border border-teal-200 dark:border-teal-800 flex items-center justify-center mt-1">
                 <CheckCircle2 className="w-4 h-4 text-teal-600" />
              </div>
              <div className="bg-zinc-100 dark:bg-zinc-800/80 p-4 rounded-2xl rounded-tl-none w-full md:w-4/5 shadow-sm border border-zinc-200/50 dark:border-zinc-700/50 text-zinc-800 dark:text-zinc-200">
                <p className="font-semibold text-sm text-teal-600 dark:text-teal-400 mb-2">Formatting & Readability</p>
                <p className="leading-relaxed text-sm">{data.readabilityFeedback}</p>
              </div>
            </motion.div>
          )}
          
          {isTyping && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="flex gap-4"
            >
              <div className="w-8 h-8 rounded-full bg-purple-100 dark:bg-purple-900/30 shrink-0 border border-purple-200 dark:border-purple-800 flex items-center justify-center mt-1">
                 <Sparkles className="w-4 h-4 text-purple-500" />
              </div>
              <TypingIndicator />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
