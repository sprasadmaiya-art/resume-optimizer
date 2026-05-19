"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, AlertCircle, CheckCircle2, Mic, MicOff, Send, Loader2 } from "lucide-react";

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

interface ChatMessage {
  role: 'ai' | 'user';
  text: string;
  isInitial?: boolean; // To distinguish the initial analysis stream
}

declare global {
  interface Window {
    SpeechRecognition: any;
    webkitSpeechRecognition: any;
  }
}

const TypingIndicator = () => (
  <div className="flex space-x-1 p-4 bg-zinc-100 dark:bg-zinc-800/80 rounded-2xl rounded-tl-none w-fit border border-zinc-200/50 dark:border-zinc-700/50">
    <motion.div className="w-2 h-2 bg-zinc-400 dark:bg-zinc-500 rounded-full" animate={{ y: [0, -5, 0] }} transition={{ duration: 0.6, repeat: Infinity, delay: 0 }} />
    <motion.div className="w-2 h-2 bg-zinc-400 dark:bg-zinc-500 rounded-full" animate={{ y: [0, -5, 0] }} transition={{ duration: 0.6, repeat: Infinity, delay: 0.2 }} />
    <motion.div className="w-2 h-2 bg-zinc-400 dark:bg-zinc-500 rounded-full" animate={{ y: [0, -5, 0] }} transition={{ duration: 0.6, repeat: Infinity, delay: 0.4 }} />
  </div>
);

export default function RecruiterSimulator({ data }: RecruiterSimulatorProps) {
  const [messages, setMessages] = useState<number[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isListening, setIsListening] = useState(false);
  const [initialSequenceDone, setInitialSequenceDone] = useState(false);
  
  const recognitionRef = useRef<any>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, chatHistory, isTyping, inputValue]);

  // Initial Sequence Effect
  useEffect(() => {
    if (!data) return;
    const sequence = async () => {
      setMessages([]);
      const delays = [1000, 2000, 2500, 2500, 2000];
      for (let i = 0; i < 5; i++) {
        setIsTyping(true);
        await new Promise(r => setTimeout(r, delays[i]));
        setIsTyping(false);
        setMessages(prev => [...prev, i]);
      }
      setIsTyping(true);
      await new Promise(r => setTimeout(r, 1500));
      setIsTyping(false);
      setChatHistory([{
        role: 'ai',
        text: "That's my initial read on your resume. How do you feel about this feedback? Let's treat this like a quick screening call—why don't you start by telling me a bit about your most recent role?",
        isInitial: false
      }]);
      setInitialSequenceDone(true);
    };
    sequence();
  }, [data]);

  // Speech Recognition Setup
  useEffect(() => {
    if (typeof window !== "undefined") {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      if (SpeechRecognition) {
        const recognition = new SpeechRecognition();
        recognition.continuous = true;
        recognition.interimResults = true;

        recognition.onresult = (event: any) => {
          let currentTranscript = "";
          for (let i = event.resultIndex; i < event.results.length; i++) {
            currentTranscript += event.results[i][0].transcript;
          }
          setInputValue(prev => {
             // If continuous, we might want to append, but for simplicity we'll just set it
             // since interimResults are constantly firing. We'll track the finalized parts.
             let final = "";
             for (let i = 0; i < event.results.length; i++) {
                final += event.results[i][0].transcript;
             }
             return final;
          });
        };

        recognition.onerror = (event: any) => {
          console.error("Speech recognition error", event.error);
          setIsListening(false);
        };

        recognition.onend = () => {
          setIsListening(false);
        };

        recognitionRef.current = recognition;
      }
    }
  }, []);

  const toggleListening = () => {
    if (!recognitionRef.current) {
      alert("Speech recognition is not supported in this browser. Please try Chrome or Edge.");
      return;
    }
    
    if (isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    } else {
      setInputValue("");
      recognitionRef.current.start();
      setIsListening(true);
    }
  };

  const handleSendMessage = async (e?: React.FormEvent) => {
    e?.preventDefault();
    const text = inputValue.trim();
    if (!text) return;
    
    if (isListening && recognitionRef.current) {
       recognitionRef.current.stop();
       setIsListening(false);
    }

    const newUserMsg: ChatMessage = { role: 'user', text };
    setChatHistory(prev => [...prev, newUserMsg]);
    setInputValue("");
    setIsTyping(true);

    try {
      const response = await fetch('/api/recruiter-chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          history: chatHistory,
          message: text,
          context: data
        })
      });
      
      const result = await response.json();
      
      if (!response.ok) throw new Error(result.error);
      
      setChatHistory(prev => [...prev, { role: 'ai', text: result.reply }]);
    } catch (error) {
      console.error(error);
      setChatHistory(prev => [...prev, { role: 'ai', text: "Sorry, I lost connection for a second there. Could you repeat that?" }]);
    } finally {
      setIsTyping(false);
    }
  };

  if (!data) return null;

  return (
    <div className="w-full max-w-4xl mx-auto flex flex-col h-[800px] max-h-[80vh]">
      <div className="flex items-center gap-4 mb-4 p-4 glass-card border border-zinc-200 dark:border-zinc-800 rounded-2xl shadow-sm shrink-0">
        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-400 to-pink-500 flex items-center justify-center shadow-lg border-2 border-white dark:border-zinc-800 shrink-0">
          <Sparkles className="w-5 h-5 text-white" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-zinc-900 dark:text-white flex items-center gap-2">
            Vera (AI Recruiter) 
            <span className="px-2 py-0.5 rounded-full bg-purple-100 dark:bg-purple-900/30 text-[10px] text-purple-600 dark:text-purple-400 font-bold uppercase tracking-wider border border-purple-200 dark:border-purple-800">
              Online
            </span>
          </h2>
          <p className="text-sm text-zinc-500 dark:text-zinc-400">Reviewing your profile & conducting screening...</p>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto space-y-6 px-2 md:px-6 pb-4 scrollbar-thin scrollbar-thumb-zinc-300 dark:scrollbar-thumb-zinc-700">
        <AnimatePresence>
          {messages.includes(0) && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex gap-4">
              <div className="w-8 h-8 rounded-full bg-purple-100 dark:bg-purple-900/30 shrink-0 border border-purple-200 dark:border-purple-800 flex items-center justify-center mt-1"><Sparkles className="w-4 h-4 text-purple-500" /></div>
              <div className="bg-zinc-100 dark:bg-zinc-800/80 p-4 rounded-2xl rounded-tl-none w-full md:w-4/5 shadow-sm border border-zinc-200/50 dark:border-zinc-700/50 text-zinc-800 dark:text-zinc-200">
                <p className="font-semibold text-sm text-purple-600 dark:text-purple-400 mb-2">First Impression</p>
                <p className="leading-relaxed">{data.firstImpression}</p>
              </div>
            </motion.div>
          )}

          {messages.includes(1) && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex gap-4">
              <div className="w-8 h-8 rounded-full bg-purple-100 dark:bg-purple-900/30 shrink-0 border border-purple-200 dark:border-purple-800 flex items-center justify-center mt-1"><Sparkles className="w-4 h-4 text-purple-500" /></div>
              <div className="bg-zinc-100 dark:bg-zinc-800/80 p-4 rounded-2xl rounded-tl-none w-full md:w-4/5 shadow-sm border border-zinc-200/50 dark:border-zinc-700/50 text-zinc-800 dark:text-zinc-200">
                <p className="font-semibold text-sm text-indigo-600 dark:text-indigo-400 mb-2">Scanning Behavior</p>
                <p className="mb-3 leading-relaxed">{data.scanningBehavior}</p>
                <div className="bg-white dark:bg-zinc-900/50 p-3 rounded-xl border border-zinc-200 dark:border-zinc-800">
                  <p className="text-xs font-bold text-zinc-500 uppercase tracking-wider mb-2">What caught my eye first:</p>
                  <div className="flex flex-wrap gap-2">
                    {data.noticesFirst.map((item, idx) => (
                      <span key={idx} className="px-3 py-1 bg-indigo-50 dark:bg-indigo-900/20 text-indigo-700 dark:text-indigo-300 text-sm font-medium rounded-md border border-indigo-100 dark:border-indigo-800/50">{item}</span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {messages.includes(2) && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex gap-4">
              <div className="w-8 h-8 rounded-full bg-amber-100 dark:bg-amber-900/30 shrink-0 border border-amber-200 dark:border-amber-800 flex items-center justify-center mt-1"><AlertCircle className="w-4 h-4 text-amber-600" /></div>
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
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex gap-4">
              <div className="w-8 h-8 rounded-full bg-red-100 dark:bg-red-900/30 shrink-0 border border-red-200 dark:border-red-800 flex items-center justify-center mt-1"><AlertCircle className="w-4 h-4 text-red-600" /></div>
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
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex gap-4">
              <div className="w-8 h-8 rounded-full bg-teal-100 dark:bg-teal-900/30 shrink-0 border border-teal-200 dark:border-teal-800 flex items-center justify-center mt-1"><CheckCircle2 className="w-4 h-4 text-teal-600" /></div>
              <div className="bg-zinc-100 dark:bg-zinc-800/80 p-4 rounded-2xl rounded-tl-none w-full md:w-4/5 shadow-sm border border-zinc-200/50 dark:border-zinc-700/50 text-zinc-800 dark:text-zinc-200">
                <p className="font-semibold text-sm text-teal-600 dark:text-teal-400 mb-2">Formatting & Readability</p>
                <p className="leading-relaxed text-sm">{data.readabilityFeedback}</p>
              </div>
            </motion.div>
          )}

          {chatHistory.map((msg, idx) => (
             <motion.div key={idx} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className={`flex gap-4 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
                <div className={`w-8 h-8 rounded-full shrink-0 flex items-center justify-center mt-1 ${msg.role === 'ai' ? 'bg-purple-100 dark:bg-purple-900/30 border border-purple-200 dark:border-purple-800' : 'bg-zinc-900 dark:bg-white text-white dark:text-zinc-900'}`}>
                  {msg.role === 'ai' ? <Sparkles className="w-4 h-4 text-purple-500" /> : <div className="text-xs font-bold">ME</div>}
                </div>
                <div className={`p-4 rounded-2xl w-full md:max-w-[80%] shadow-sm ${msg.role === 'ai' ? 'bg-zinc-100 dark:bg-zinc-800/80 rounded-tl-none border border-zinc-200/50 dark:border-zinc-700/50 text-zinc-800 dark:text-zinc-200' : 'bg-teal-600 text-white rounded-tr-none'}`}>
                  <p className="leading-relaxed whitespace-pre-wrap">{msg.text}</p>
                </div>
             </motion.div>
          ))}

          {isTyping && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95 }} className="flex gap-4">
              <div className="w-8 h-8 rounded-full bg-purple-100 dark:bg-purple-900/30 shrink-0 border border-purple-200 dark:border-purple-800 flex items-center justify-center mt-1"><Sparkles className="w-4 h-4 text-purple-500" /></div>
              <TypingIndicator />
            </motion.div>
          )}
          <div ref={messagesEndRef} />
        </AnimatePresence>
      </div>

      {/* Chat Input Section */}
      <AnimatePresence>
        {initialSequenceDone && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="shrink-0 p-4 border-t border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 mt-4 rounded-b-2xl">
            <form onSubmit={handleSendMessage} className="flex items-center gap-3">
              <button 
                type="button" 
                onClick={toggleListening}
                className={`p-4 rounded-full transition-all ${isListening ? 'bg-red-500 text-white animate-pulse shadow-lg shadow-red-500/30' : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-500 hover:text-zinc-900 dark:hover:text-white'}`}
                title={isListening ? "Stop listening" : "Start speaking"}
              >
                {isListening ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
              </button>
              
              <div className="flex-1 relative">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder={isListening ? "Listening..." : "Type your response..."}
                  disabled={isListening || isTyping}
                  className="w-full bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-full px-6 py-4 focus:outline-none focus:ring-2 focus:ring-teal-500/50 disabled:opacity-70 transition-all text-zinc-900 dark:text-white"
                />
              </div>

              <button 
                type="submit" 
                disabled={!inputValue.trim() || isTyping}
                className="p-4 rounded-full bg-teal-600 text-white hover:bg-teal-700 disabled:opacity-50 disabled:hover:bg-teal-600 transition-all shadow-md shadow-teal-600/20"
              >
                {isTyping && !isListening ? <Loader2 className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5" />}
              </button>
            </form>
            <p className="text-center text-[10px] text-zinc-400 mt-3 font-medium uppercase tracking-wider">
              {isListening ? "Speak clearly into your microphone" : "Press Enter to send"}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
