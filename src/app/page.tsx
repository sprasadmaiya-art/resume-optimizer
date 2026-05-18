"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useTheme } from "next-themes";
import { SignInButton, SignUpButton, UserButton, Show } from "@clerk/nextjs";
import Link from "next/link";
import { 
  Sparkles, 
  FileText, 
  UserCircle, 
  Target, 
  BarChart, 
  MessageSquare,
  Moon,
  Sun,
  ChevronRight,
  CheckCircle2,
  TrendingUp,
  BrainCircuit,
  Briefcase,
  Mic,
  LineChart
} from "lucide-react";

// --- Theme Toggle Component ---
function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="p-2 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-600 dark:text-zinc-300 transition-colors"
      aria-label="Toggle theme"
    >
      {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
    </button>
  );
}

// --- Navbar ---
function Navbar() {
  return (
    <nav className="fixed top-0 w-full z-50 glass border-b border-zinc-200/50 dark:border-zinc-800/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2 font-heading font-bold text-xl text-zinc-900 dark:text-white">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-teal-400 to-indigo-600 flex items-center justify-center shadow-lg shadow-teal-500/20">
            <Sparkles className="w-4 h-4 text-white" />
          </div>
          <span>CareerOS</span>
        </div>
        <div className="flex items-center gap-4">
          <ThemeToggle />
          <Show when="signed-out">
            <SignInButton mode="modal">
              <button className="px-4 py-2 text-sm font-medium text-zinc-700 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white transition-colors">
                Sign In
              </button>
            </SignInButton>
            <SignUpButton mode="modal">
              <button className="px-4 py-2 rounded-full bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 text-sm font-medium hover:scale-105 transition-transform shadow-md">
                Sign Up
              </button>
            </SignUpButton>
          </Show>
          <Show when="signed-in">
            <UserButton />
          </Show>
        </div>
      </div>
    </nav>
  );
}

export default function Home() {

  return (
    <div className="relative w-full overflow-x-hidden selection:bg-teal-500/30">
      <Navbar />

      {/* --- HERO SECTION --- */}
      <section className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto flex flex-col items-center text-center min-h-[95vh] justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-teal-50 dark:bg-teal-500/10 border border-teal-200/50 dark:border-teal-500/20 text-xs font-semibold uppercase tracking-widest text-teal-700 dark:text-teal-400 mb-8 shadow-sm"
        >
          <Sparkles className="w-3 h-3" />
          <span>The New Standard in Career Growth</span>
        </motion.div>
        
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-6xl md:text-8xl font-black tracking-tight leading-[1.05] font-heading max-w-5xl"
        >
          Upload your Resume. <br className="hidden md:block" />
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 via-purple-500 to-teal-400">Get Optimized.</span>
        </motion.h1>
        
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-8 text-xl md:text-2xl text-zinc-600 dark:text-zinc-400 max-w-3xl mx-auto leading-relaxed font-medium"
        >
          Practice your interview with the AI recruiter that just analyzed your resume against the job description. Get an instant ATS Score and tailored feedback.
        </motion.p>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-10 flex flex-col sm:flex-row gap-4 items-center justify-center"
        >
          <Show when="signed-out">
            <SignUpButton mode="modal">
              <button className="px-8 py-4 rounded-full bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 font-semibold text-lg hover:scale-105 transition-all flex items-center gap-2 shadow-xl shadow-zinc-900/20 dark:shadow-white/10 hover:shadow-2xl">
                Start Optimizing Free <ChevronRight size={20} />
              </button>
            </SignUpButton>
          </Show>
          <Show when="signed-in">
            <Link href="/dashboard/optimize" className="px-8 py-4 rounded-full bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 font-semibold text-lg hover:scale-105 transition-all flex items-center gap-2 shadow-xl shadow-zinc-900/20 dark:shadow-white/10 hover:shadow-2xl">
              Get Optimized <ChevronRight size={20} />
            </Link>
          </Show>
          <button 
            onClick={() => document.getElementById("features")?.scrollIntoView({ behavior: "smooth" })}
            className="px-8 py-4 rounded-full glass-card font-semibold text-lg hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors border-zinc-200 dark:border-zinc-800"
          >
            See How it Works
          </button>
        </motion.div>

        {/* Floating Dashboard Premium Mockup */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="mt-20 w-full max-w-5xl relative perspective-1000"
        >
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-50 dark:from-zinc-950 via-transparent to-transparent z-20 bottom-0 h-40 mt-auto" />
          
          <motion.div 
            animate={{ y: [0, -8, 0] }} 
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="rounded-2xl p-4 md:p-6 shadow-2xl border border-white/40 dark:border-white/10 bg-white/40 dark:bg-zinc-900/40 backdrop-blur-3xl overflow-hidden relative"
          >
             {/* Mockup Top Bar */}
             <div className="flex items-center justify-between mb-8 pb-6 border-b border-zinc-200/50 dark:border-zinc-800/50">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-teal-400 to-indigo-500 flex items-center justify-center text-white font-bold shadow-inner">AL</div>
                  <div>
                    <div className="h-4 w-32 bg-zinc-200 dark:bg-zinc-800 rounded-full mb-2"></div>
                    <div className="h-3 w-24 bg-zinc-100 dark:bg-zinc-800/50 rounded-full"></div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <div className="w-8 h-8 rounded-full bg-zinc-100 dark:bg-zinc-800"></div>
                  <div className="w-8 h-8 rounded-full bg-zinc-100 dark:bg-zinc-800"></div>
                </div>
             </div>

             {/* Mockup Content Grid */}
             <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10 text-left">
                {/* Score Card */}
                <div className="glass-card p-6 bg-white/80 dark:bg-zinc-900/80 rounded-xl border border-white/60 dark:border-white/5 flex flex-col items-center justify-center h-48 relative overflow-hidden shadow-sm">
                   <div className="absolute top-0 right-0 p-4 opacity-10"><Target className="w-24 h-24 text-teal-500" /></div>
                   <div className="relative z-10 text-center">
                     <p className="text-sm text-zinc-500 dark:text-zinc-400 font-medium mb-2 uppercase tracking-widest">ATS Match Score</p>
                     <div className="flex items-end justify-center gap-1">
                       <span className="text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-br from-teal-600 to-emerald-400 dark:from-teal-400 dark:to-emerald-200">94</span>
                       <span className="text-xl text-zinc-400 dark:text-zinc-500 font-medium mb-1">/100</span>
                     </div>
                     <div className="mt-4 inline-flex items-center gap-1 text-xs font-semibold text-emerald-700 dark:text-emerald-300 bg-emerald-100 dark:bg-emerald-500/20 px-3 py-1.5 rounded-full shadow-inner">
                       <TrendingUp className="w-3 h-3" /> Top 5% of applicants
                     </div>
                   </div>
                </div>

                {/* Skills Match Card */}
                <div className="glass-card p-6 bg-white/80 dark:bg-zinc-900/80 rounded-xl border border-white/60 dark:border-white/5 h-48 flex flex-col justify-between shadow-sm">
                   <div>
                     <p className="text-sm text-zinc-500 dark:text-zinc-400 font-medium mb-4 uppercase tracking-widest">Skills Match</p>
                     <div className="space-y-4">
                       {['Project Management', 'Data Analysis', 'Leadership'].map((skill, i) => (
                         <div key={i} className="flex items-center gap-3">
                           <span className="text-[11px] text-zinc-700 dark:text-zinc-200 font-bold w-24 uppercase tracking-wide">{skill}</span>
                           <div className="w-full bg-zinc-100 dark:bg-zinc-800/80 rounded-full h-2 overflow-hidden shadow-inner">
                             <motion.div 
                               initial={{ width: 0 }}
                               whileInView={{ width: ['100%', '85%', '92%'][i] }}
                               transition={{ duration: 1.5, delay: 0.2 + i * 0.1, ease: "easeOut" }}
                               className="bg-gradient-to-r from-indigo-500 via-purple-500 to-teal-400 h-full rounded-full"
                             />
                           </div>
                         </div>
                       ))}
                     </div>
                   </div>
                </div>

                {/* AI Recruiter Feedback */}
                <div className="glass-card p-6 bg-white/80 dark:bg-zinc-900/80 rounded-xl border border-white/60 dark:border-white/5 h-48 overflow-hidden relative shadow-sm">
                   <p className="text-sm text-zinc-500 dark:text-zinc-400 font-medium mb-4 uppercase tracking-widest">AI Recruiter Notes</p>
                   <div className="space-y-5">
                     <div className="flex gap-3">
                       <div className="w-8 h-8 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center shrink-0 shadow-sm border border-purple-200 dark:border-purple-800">
                         <Sparkles className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                       </div>
                       <div className="flex-1 mt-1">
                         <div className="h-2 w-full bg-zinc-200 dark:bg-zinc-800 rounded-full mb-2"></div>
                         <div className="h-2 w-3/4 bg-zinc-200 dark:bg-zinc-800 rounded-full"></div>
                       </div>
                     </div>
                     <div className="flex gap-3">
                       <div className="w-8 h-8 rounded-full bg-teal-100 dark:bg-teal-900/30 flex items-center justify-center shrink-0 shadow-sm border border-teal-200 dark:border-teal-800">
                         <CheckCircle2 className="w-4 h-4 text-teal-600 dark:text-teal-400" />
                       </div>
                       <div className="flex-1 mt-1">
                         <div className="h-2 w-5/6 bg-zinc-200 dark:bg-zinc-800 rounded-full mb-2"></div>
                         <div className="h-2 w-1/2 bg-zinc-200 dark:bg-zinc-800 rounded-full"></div>
                       </div>
                     </div>
                   </div>
                   <div className="absolute bottom-0 left-0 w-full h-16 bg-gradient-to-t from-white dark:from-zinc-900 to-transparent"></div>
                </div>
             </div>
          </motion.div>
        </motion.div>
      </section>

      {/* --- FEATURES SHOWCASE --- */}
      <section id="features" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-32">
        <FeatureShowcase 
          title="Resume Optimization"
          subtitle="Engineered to beat the ATS every time."
          description="Our AI engine cross-references your resume against millions of successful profiles. We dynamically inject missing keywords and restructure your bullet points to ensure you pass automated screenings and land on the recruiter's desk."
          icon={<FileText className="w-6 h-6 text-indigo-500" />}
          imageContent={
            <motion.div 
              whileHover={{ y: -5 }}
              className="w-full h-full relative rounded-3xl border border-zinc-200/50 dark:border-zinc-800/50 bg-white/50 dark:bg-zinc-900/30 backdrop-blur-sm shadow-2xl overflow-hidden p-8 flex flex-col justify-center"
            >
               <div className="flex items-center gap-3 border-b border-zinc-100 dark:border-zinc-800/80 pb-4 mb-6">
                 <div className="w-3 h-3 rounded-full bg-zinc-300 dark:bg-zinc-700"></div>
                 <div className="w-3 h-3 rounded-full bg-zinc-300 dark:bg-zinc-700"></div>
                 <div className="w-3 h-3 rounded-full bg-zinc-300 dark:bg-zinc-700"></div>
               </div>
               <div className="space-y-8 mt-2">
                 {/* Before Section */}
                 <div className="w-full relative group">
                   <div className="flex items-center gap-2 mb-3">
                     <span className="text-[10px] font-bold uppercase tracking-wider text-red-500 bg-red-100 dark:bg-red-500/10 px-2.5 py-1 rounded-full border border-red-200/50 dark:border-red-900/30">Original (Weak)</span>
                   </div>
                   <p className="text-sm text-zinc-400 dark:text-zinc-500 line-through decoration-red-500/40 decoration-2 pl-2 border-l-2 border-red-200 dark:border-red-900/50">
                     Led a team of 5 to improve product sales and made the website load faster.
                   </p>
                 </div>
                 
                 {/* Connection Arrow */}
                 <div className="flex justify-center -my-2 opacity-50 relative z-10">
                    <div className="w-8 h-8 rounded-full bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center shadow-sm border border-zinc-200 dark:border-zinc-700">
                      <ChevronRight className="w-4 h-4 text-teal-500 transform rotate-90" />
                    </div>
                 </div>

                 {/* After Section */}
                 <div className="w-full relative">
                   <div className="flex items-center gap-2 mb-3">
                     <span className="text-[10px] font-bold uppercase tracking-wider text-teal-700 dark:text-teal-300 bg-teal-100 dark:bg-teal-900/30 px-2.5 py-1 rounded-full border border-teal-200 dark:border-teal-800 shadow-sm flex items-center gap-1.5">
                       <Sparkles className="w-3 h-3" /> AI Optimized
                     </span>
                   </div>
                   <p className="text-[15px] font-medium text-zinc-800 dark:text-zinc-200 leading-relaxed bg-gradient-to-br from-teal-50/80 to-white/80 dark:from-teal-900/20 dark:to-zinc-900/50 p-4 rounded-xl border border-teal-100 dark:border-teal-900/30 shadow-md">
                     <span className="text-teal-800 dark:text-teal-200 font-bold bg-teal-200/50 dark:bg-teal-800/50 px-1.5 py-0.5 rounded shadow-sm mx-0.5">Directed</span> a cross-functional team of 5 to drive <span className="text-teal-800 dark:text-teal-200 font-bold bg-teal-200/50 dark:bg-teal-800/50 px-1.5 py-0.5 rounded shadow-sm mx-0.5">30% YoY revenue growth</span> and optimize web performance, reducing load times by <span className="text-teal-800 dark:text-teal-200 font-bold bg-teal-200/50 dark:bg-teal-800/50 px-1.5 py-0.5 rounded shadow-sm mx-0.5">40%</span>.
                   </p>
                 </div>
                 
                 <div className="absolute bottom-6 right-6 flex items-center gap-2 bg-white/95 dark:bg-zinc-900/95 backdrop-blur-md border border-indigo-200/50 dark:border-indigo-500/20 px-4 py-2.5 rounded-full shadow-xl hover:scale-105 transition-transform cursor-default z-20">
                   <Sparkles className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                   <span className="text-xs font-bold uppercase tracking-wider text-indigo-700 dark:text-indigo-300">Action Verbs Injected</span>
                 </div>
               </div>
            </motion.div>
          }
        />
        
        <FeatureShowcase 
          title="ATS Score Analysis"
          subtitle="Real-time match metrics at your fingertips."
          description="See exactly how well you match a job description before you apply. Get an instant ATS score, missing keywords, and actionable, line-by-line steps to improve your fit."
          icon={<LineChart className="w-6 h-6 text-teal-500" />}
          reverse
          imageContent={
            <div className="w-full h-full relative rounded-3xl border border-zinc-200/50 dark:border-zinc-800/50 bg-white/50 dark:bg-zinc-900/30 backdrop-blur-sm shadow-2xl overflow-hidden flex items-center justify-center p-8">
                <div className="relative w-48 h-48">
                  {/* Outer glowing ring */}
                  <div className="absolute inset-0 rounded-full border-[12px] border-teal-50 dark:border-teal-900/20"></div>
                  {/* Progress ring mockup */}
                  <svg className="absolute inset-0 w-full h-full transform -rotate-90">
                    <circle cx="96" cy="96" r="84" stroke="currentColor" strokeWidth="12" fill="none" className="text-teal-400 dark:text-teal-500" strokeDasharray="527" strokeDashoffset="52" strokeLinecap="round" />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-5xl font-black text-zinc-900 dark:text-white">90%</span>
                    <span className="text-xs font-semibold uppercase tracking-widest text-zinc-500 mt-1">Match</span>
                  </div>
                </div>
                
                {/* Floating elements */}
                <motion.div animate={{ y: [0, 10, 0] }} transition={{ duration: 4, repeat: Infinity }} className="absolute top-12 right-12 glass-card px-4 py-3 rounded-xl border border-white/40 dark:border-white/10 shadow-lg flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-green-500"></div>
                  <span className="text-sm font-medium text-zinc-700 dark:text-zinc-200">High Probability</span>
                </motion.div>
                
                <motion.div animate={{ y: [0, -10, 0] }} transition={{ duration: 5, repeat: Infinity, delay: 1 }} className="absolute bottom-16 left-8 glass-card px-4 py-3 rounded-xl border border-white/40 dark:border-white/10 shadow-lg flex flex-col gap-2">
                  <div className="flex items-center gap-2">
                     <Target className="w-4 h-4 text-zinc-400" />
                     <div className="h-2 w-24 bg-zinc-200 dark:bg-zinc-700 rounded-full"></div>
                  </div>
                  <div className="flex items-center gap-2">
                     <Target className="w-4 h-4 text-zinc-400" />
                     <div className="h-2 w-16 bg-zinc-200 dark:bg-zinc-700 rounded-full"></div>
                  </div>
                </motion.div>
            </div>
          }
        />

        <FeatureShowcase 
          title="AI Recruiter Simulation"
          subtitle="Know what they'll ask before they do."
          description="Experience a simulated screening call with our AI recruiter. Get personalized feedback on your tone, answers, and confidence level to perfect your pitch and eliminate interview anxiety."
          icon={<BrainCircuit className="w-6 h-6 text-purple-500" />}
          imageContent={
            <div className="w-full h-full relative rounded-3xl border border-zinc-200/50 dark:border-zinc-800/50 bg-white/50 dark:bg-zinc-900/30 backdrop-blur-sm shadow-2xl overflow-hidden p-6 flex flex-col">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-400 to-pink-500 flex items-center justify-center shadow-lg border-2 border-white dark:border-zinc-800">
                   <Sparkles className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h4 className="font-bold text-zinc-900 dark:text-white">Alex (AI Recruiter)</h4>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400 flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-green-500"></span> Online</p>
                </div>
              </div>
              
              <div className="flex-1 space-y-6">
                 {/* AI Message */}
                 <div className="flex gap-4">
                   <div className="w-8 h-8 rounded-full bg-purple-100 dark:bg-purple-900/30 shrink-0"></div>
                   <div className="bg-zinc-100 dark:bg-zinc-800/80 p-4 rounded-2xl rounded-tl-none w-3/4 shadow-sm border border-zinc-200/50 dark:border-zinc-700/50">
                      <div className="h-2 w-full bg-zinc-300 dark:bg-zinc-600 rounded-full mb-3"></div>
                      <div className="h-2 w-4/5 bg-zinc-300 dark:bg-zinc-600 rounded-full mb-3"></div>
                      <div className="h-2 w-2/3 bg-zinc-300 dark:bg-zinc-600 rounded-full"></div>
                   </div>
                 </div>
                 
                 {/* User Message */}
                 <div className="flex gap-4 flex-row-reverse">
                   <div className="w-8 h-8 rounded-full bg-teal-100 dark:bg-teal-900/30 shrink-0"></div>
                   <div className="bg-gradient-to-r from-teal-500 to-emerald-500 p-4 rounded-2xl rounded-tr-none w-2/3 shadow-md">
                      <div className="h-2 w-full bg-white/40 rounded-full mb-3"></div>
                      <div className="h-2 w-3/4 bg-white/40 rounded-full"></div>
                   </div>
                 </div>
              </div>
              
              <div className="mt-4 border border-zinc-200 dark:border-zinc-700 rounded-full p-2 flex items-center gap-3 bg-white dark:bg-zinc-800 shadow-inner">
                <div className="w-8 h-8 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
                  <Mic className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                </div>
                <div className="flex-1 flex gap-1 items-center px-2">
                   {[1,2,3,4,5,4,3,2,1,2,3,4].map((h, i) => (
                     <motion.div key={i} animate={{ height: [8, h*6, 8] }} transition={{ duration: 1, repeat: Infinity, delay: i * 0.1 }} className="w-1 bg-purple-400 dark:bg-purple-500 rounded-full" />
                   ))}
                </div>
                <div className="w-8 h-8 rounded-full bg-zinc-900 dark:bg-zinc-100"></div>
              </div>
            </div>
          }
        />

        <FeatureShowcase 
          title="Career Trajectory Design"
          subtitle="Chart your path forward with precision."
          description="Discover hidden career paths and adjacent roles where your unique skill overlap is highly valued. Let our intelligence engine guide your long-term career trajectory."
          icon={<Briefcase className="w-6 h-6 text-amber-500" />}
          reverse
          imageContent={
            <div className="w-full h-full relative rounded-3xl border border-zinc-200/50 dark:border-zinc-800/50 bg-white/50 dark:bg-zinc-900/30 backdrop-blur-sm shadow-2xl overflow-hidden p-8 flex items-center justify-center">
                <div className="relative w-full max-w-sm">
                   {/* Main Node */}
                   <div className="absolute top-1/2 left-0 transform -translate-y-1/2 w-16 h-16 rounded-xl bg-gradient-to-br from-amber-400 to-orange-500 shadow-lg flex items-center justify-center z-10">
                     <UserCircle className="w-8 h-8 text-white" />
                   </div>
                   
                   {/* Lines */}
                   <svg className="absolute inset-0 w-full h-full z-0" style={{ transform: 'translate(32px, 0)' }}>
                      <path d="M 0 50% C 50 50%, 50 20%, 120 20%" fill="none" stroke="currentColor" className="text-zinc-300 dark:text-zinc-700" strokeWidth="2" strokeDasharray="4 4" />
                      <path d="M 0 50% C 50 50%, 50 50%, 120 50%" fill="none" stroke="currentColor" className="text-zinc-300 dark:text-zinc-700" strokeWidth="2" />
                      <path d="M 0 50% C 50 50%, 50 80%, 120 80%" fill="none" stroke="currentColor" className="text-zinc-300 dark:text-zinc-700" strokeWidth="2" strokeDasharray="4 4" />
                   </svg>

                   {/* Branch Nodes */}
                   <div className="absolute top-[20%] left-[100px] transform -translate-y-1/2 glass-card px-4 py-2 border border-amber-200 dark:border-amber-900/50 rounded-lg shadow-sm whitespace-nowrap">
                      <p className="text-xs font-bold text-zinc-900 dark:text-white">Product Manager</p>
                      <p className="text-[10px] text-amber-600 dark:text-amber-400">85% Skill Match</p>
                   </div>
                   
                   <div className="absolute top-[50%] left-[100px] transform -translate-y-1/2 glass-card px-4 py-2 border border-teal-200 dark:border-teal-900/50 rounded-lg shadow-md ring-2 ring-teal-500/20 whitespace-nowrap z-10">
                      <p className="text-xs font-bold text-zinc-900 dark:text-white">Sr. Software Engineer</p>
                      <p className="text-[10px] text-teal-600 dark:text-teal-400">98% Skill Match</p>
                   </div>
                   
                   <div className="absolute top-[80%] left-[100px] transform -translate-y-1/2 glass-card px-4 py-2 border border-zinc-200 dark:border-zinc-800 rounded-lg shadow-sm opacity-60 whitespace-nowrap">
                      <p className="text-xs font-bold text-zinc-900 dark:text-white">Solutions Architect</p>
                      <p className="text-[10px] text-zinc-500">72% Skill Match</p>
                   </div>
                </div>
            </div>
          }
        />
      </section>

      {/* --- CTA SECTION --- */}
      <section className="py-32 px-4 sm:px-6 lg:px-8 mt-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-zinc-900 dark:bg-black z-0"></div>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-teal-900/40 via-zinc-900 to-zinc-900 dark:from-teal-900/20 dark:via-black dark:to-black z-0"></div>
        
        <div className="max-w-4xl mx-auto relative z-10 text-center">
          <h2 className="text-5xl md:text-6xl font-heading font-black mb-6 text-white tracking-tight">Ready to elevate your career?</h2>
          <p className="text-2xl text-zinc-400 mb-10 max-w-3xl mx-auto font-medium">Join thousands of professionals landing their dream roles with precision-engineered AI intelligence.</p>
          <Show when="signed-out">
            <SignUpButton mode="modal">
              <button className="px-8 py-4 rounded-full bg-white text-zinc-900 font-bold text-lg hover:scale-105 transition-all shadow-2xl shadow-white/10 hover:shadow-white/20">
                Get Started for Free
              </button>
            </SignUpButton>
          </Show>
          <Show when="signed-in">
            <Link href="/dashboard/optimize" className="px-8 py-4 rounded-full bg-teal-500 text-white font-bold text-lg hover:scale-105 transition-all shadow-2xl shadow-teal-500/20 inline-block">
              Start Optimizing
            </Link>
          </Show>
        </div>
      </section>

      {/* --- FOOTER --- */}
      <footer className="py-12 text-center bg-zinc-900 dark:bg-black border-t border-zinc-800 text-zinc-500 text-sm relative z-10">
         <div className="flex items-center justify-center gap-2 mb-4">
            <Sparkles className="w-4 h-4" />
            <span className="font-heading font-bold text-zinc-400">CareerOS</span>
         </div>
         <p>© {new Date().getFullYear()} CareerOS Intelligence. All rights reserved.</p>
      </footer>
    </div>
  );
}

function FeatureShowcase({ title, subtitle, description, icon, imageContent, reverse = false }: any) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.7 }}
      className={`flex flex-col ${reverse ? 'md:flex-row-reverse' : 'md:flex-row'} items-center gap-12 md:gap-20`}
    >
      <div className="flex-1 space-y-6">
        <div className="w-12 h-12 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm flex items-center justify-center mb-6">
          {icon}
        </div>
        <h3 className="text-4xl md:text-5xl font-heading font-black tracking-tight text-zinc-900 dark:text-white">{title}</h3>
        <p className="text-xl md:text-2xl font-bold text-teal-600 dark:text-teal-400">{subtitle}</p>
        <p className="text-xl text-zinc-600 dark:text-zinc-400 leading-relaxed font-medium">{description}</p>
        <ul className="space-y-3 mt-8">
          <li className="flex items-center gap-3 text-zinc-700 dark:text-zinc-300 font-medium"><CheckCircle2 className="w-5 h-5 text-teal-500 shrink-0" /> Enterprise-grade AI Analysis</li>
          <li className="flex items-center gap-3 text-zinc-700 dark:text-zinc-300 font-medium"><CheckCircle2 className="w-5 h-5 text-teal-500 shrink-0" /> Instant actionable feedback</li>
          <li className="flex items-center gap-3 text-zinc-700 dark:text-zinc-300 font-medium"><CheckCircle2 className="w-5 h-5 text-teal-500 shrink-0" /> Privacy-first architecture</li>
        </ul>
      </div>
      <div className="flex-1 w-full relative">
        <div className="aspect-square md:aspect-[4/3] w-full">
          {imageContent}
        </div>
        {/* Subtle glow behind the image content */}
        <div className="absolute inset-0 bg-gradient-to-tr from-teal-500/5 to-purple-500/5 blur-3xl -z-10 rounded-full transform scale-90"></div>
      </div>
    </motion.div>
  );
}
