"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useTheme } from "next-themes";
import OptimizerForm from "@/components/OptimizerForm";
import ResultsDisplay from "@/components/ResultsDisplay";
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
  Star
} from "lucide-react";
import { usePostHog } from 'posthog-js/react';

// --- Theme Toggle Component ---
function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="fixed top-4 right-4 z-50 p-2 rounded-full glass-card text-zinc-600 dark:text-zinc-300 hover:text-teal-500 transition-colors"
      aria-label="Toggle theme"
    >
      {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
    </button>
  );
}

export default function Home() {
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState(null);
  const [error, setError] = useState<string | null>(null);
  const posthog = usePostHog();

  const handleOptimize = async (resume: string, jobDescription: string, role: string, skills: string[]) => {
    posthog.capture('optimize_clicked', { target_role: role });
    if (jobDescription) {
      posthog.capture('job_description_added', { target_role: role });
    }
    
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch("/api/optimize", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ resume, jobDescription, role, skills }),
      });

      if (!response.ok) {
        throw new Error("Failed to generate ATS match analysis. Please try again.");
      }

      const data = await response.json();
      setResults(data);
      
      posthog.capture('job_match_generated', { target_role: role });
      posthog.capture('recruiter_analysis_generated');
      posthog.capture('interview_prep_generated');
      posthog.capture('career_recommendations_generated');
      
      if (data.match?.atsScore) {
        posthog.capture('ats_score_generated', { 
          score: data.match.atsScore, 
          category: data.match.atsScoreCategory,
          target_role: role
        });
      }
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred.");
    } finally {
      setIsLoading(false);
    }
  };

  const scrollToApp = () => {
    document.getElementById("app-section")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="relative w-full overflow-x-hidden">
      <ThemeToggle />

      {/* --- HERO SECTION --- */}
      <section className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto flex flex-col items-center text-center min-h-[90vh] justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-teal-50 dark:bg-teal-500/10 border border-teal-100 dark:border-teal-500/20 text-sm font-medium text-teal-700 dark:text-teal-300 mb-8 shadow-sm"
        >
          <Sparkles className="w-4 h-4" />
          <span>Next-Gen AI Career Intelligence Platform</span>
        </motion.div>
        
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-5xl md:text-7xl font-extrabold tracking-tight leading-tight font-heading max-w-4xl"
        >
          Land Your Dream Role with <br className="hidden md:block" />
          <span className="text-gradient">Data-Driven Precision.</span>
        </motion.h1>
        
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-6 text-lg md:text-xl text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto leading-relaxed"
        >
          Stop guessing what recruiters want. Get instant ATS feedback, customized interview prep, deep job matching, and an AI-optimized resume tailored specifically to your target role.
        </motion.p>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-10 flex flex-col sm:flex-row gap-4 items-center justify-center"
        >
          <button 
            onClick={scrollToApp}
            className="px-8 py-4 rounded-full bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 font-semibold text-lg hover:scale-105 transition-transform flex items-center gap-2 shadow-xl shadow-zinc-900/20 dark:shadow-white/10"
          >
            Start Optimizing Free <ChevronRight size={20} />
          </button>
          <button 
            onClick={() => document.getElementById("features")?.scrollIntoView({ behavior: "smooth" })}
            className="px-8 py-4 rounded-full glass-card font-semibold text-lg hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors"
          >
            See How it Works
          </button>
        </motion.div>

        {/* Dashboard Preview Graphic */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="mt-20 w-full max-w-5xl relative"
        >
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-50 dark:from-zinc-950 via-transparent to-transparent z-10 bottom-0 h-32 mt-auto" />
          <div className="glass rounded-2xl p-2 md:p-4 shadow-2xl border border-zinc-200/50 dark:border-zinc-800/50">
             <div className="bg-zinc-100 dark:bg-zinc-900 rounded-xl overflow-hidden border border-zinc-200 dark:border-zinc-800 aspect-[16/9] flex items-center justify-center relative">
                <div className="absolute top-4 left-4 flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-400"></div>
                  <div className="w-3 h-3 rounded-full bg-amber-400"></div>
                  <div className="w-3 h-3 rounded-full bg-green-400"></div>
                </div>
                <div className="text-center">
                  <BarChart className="w-16 h-16 text-teal-500 mx-auto mb-4 opacity-50" />
                  <p className="text-zinc-400 dark:text-zinc-600 font-medium text-lg">AI Analytics Dashboard</p>
                </div>
             </div>
          </div>
        </motion.div>
      </section>

      {/* --- LOGO CLOUD --- */}
      <section className="py-10 border-y border-zinc-200 dark:border-zinc-800/50 bg-white/50 dark:bg-zinc-900/20 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-sm font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider mb-6">Trusted by ambitious professionals from</p>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
             <span className="font-heading font-bold text-xl">Google</span>
             <span className="font-heading font-bold text-xl">Microsoft</span>
             <span className="font-heading font-bold text-xl">Amazon</span>
             <span className="font-heading font-bold text-xl">Meta</span>
             <span className="font-heading font-bold text-xl">Apple</span>
          </div>
        </div>
      </section>

      {/* --- FEATURES SHOWCASE --- */}
      <section id="features" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-32">
        <FeatureShowcase 
          title="Resume Optimization"
          subtitle="Beat the ATS every time."
          description="Our AI analyzes your resume against millions of successful profiles to dynamically optimize your content, ensuring you pass automated screenings and land on the recruiter's desk."
          icon={<FileText className="w-8 h-8 text-indigo-500" />}
          imageContent={<div className="w-full h-full bg-indigo-50 dark:bg-indigo-900/20 rounded-2xl flex items-center justify-center border border-indigo-100 dark:border-indigo-500/20"><FileText className="w-24 h-24 text-indigo-400 opacity-50" /></div>}
        />
        
        <FeatureShowcase 
          title="ATS Score Analysis"
          subtitle="Real-time match metrics."
          description="See exactly how well you match a job description before you apply. Get an instant ATS score, missing keywords, and actionable steps to improve your fit."
          icon={<BarChart className="w-8 h-8 text-teal-500" />}
          imageContent={<div className="w-full h-full bg-teal-50 dark:bg-teal-900/20 rounded-2xl flex items-center justify-center border border-teal-100 dark:border-teal-500/20"><BarChart className="w-24 h-24 text-teal-400 opacity-50" /></div>}
          reverse
        />

        <FeatureShowcase 
          title="AI Recruiter Simulation"
          subtitle="Know what they'll ask."
          description="Experience a simulated screening call with our AI recruiter. Get personalized feedback on your tone, answers, and confidence level to perfect your pitch."
          icon={<UserCircle className="w-8 h-8 text-purple-500" />}
          imageContent={<div className="w-full h-full bg-purple-50 dark:bg-purple-900/20 rounded-2xl flex items-center justify-center border border-purple-100 dark:border-purple-500/20"><UserCircle className="w-24 h-24 text-purple-400 opacity-50" /></div>}
        />

        <FeatureShowcase 
          title="Interview Preparation"
          subtitle="Practice makes perfect."
          description="Receive a curated list of behavioral and technical questions based on your specific role and industry. Formulate winning STAR method responses with our guided framework."
          icon={<MessageSquare className="w-8 h-8 text-pink-500" />}
          imageContent={<div className="w-full h-full bg-pink-50 dark:bg-pink-900/20 rounded-2xl flex items-center justify-center border border-pink-100 dark:border-pink-500/20"><MessageSquare className="w-24 h-24 text-pink-400 opacity-50" /></div>}
          reverse
        />

        <FeatureShowcase 
          title="Career Recommendations"
          subtitle="Chart your path forward."
          description="Discover hidden career paths and adjacent roles where your skills are highly valued. Let AI guide your long-term career trajectory."
          icon={<Target className="w-8 h-8 text-amber-500" />}
          imageContent={<div className="w-full h-full bg-amber-50 dark:bg-amber-900/20 rounded-2xl flex items-center justify-center border border-amber-100 dark:border-amber-500/20"><Target className="w-24 h-24 text-amber-400 opacity-50" /></div>}
        />
      </section>

      {/* --- TESTIMONIALS --- */}
      <section className="py-24 bg-zinc-900 dark:bg-black text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-teal-500/20 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-indigo-500/20 rounded-full blur-[120px]" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <h2 className="text-3xl md:text-5xl font-heading font-bold mb-16">Don't just take our word for it.</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <TestimonialCard 
              name="Sarah J." 
              role="Senior Product Manager" 
              text="The AI recruiter feedback was spot on. It highlighted gaps in my resume I never would have noticed. Landed 3 interviews the following week."
            />
            <TestimonialCard 
              name="David M." 
              role="Software Engineer" 
              text="The ATS scoring saved me hours of tweaking my resume for every application. The tailored keyword suggestions are a game changer."
            />
            <TestimonialCard 
              name="Emily R." 
              role="Marketing Director" 
              text="I used the interview prep module before my final round at a FAANG company. The questions it generated were shockingly similar to the real ones."
            />
          </div>
        </div>
      </section>

      {/* --- APP SECTION --- */}
      <section id="app-section" className="py-32 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-heading font-bold mb-4">Ready to elevate your career?</h2>
            <p className="text-xl text-zinc-600 dark:text-zinc-400">Try the platform below. No credit card required.</p>
          </div>

          <div className="glass dark:bg-zinc-900/80 rounded-3xl p-6 md:p-12 shadow-2xl border border-zinc-200/50 dark:border-zinc-700 relative overflow-hidden">
             {/* Glow effect behind the form */}
             <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-3/4 bg-teal-400/10 dark:bg-teal-500/10 rounded-full blur-[120px] pointer-events-none" />
             
             <div className="relative z-10">
                <OptimizerForm onSubmit={handleOptimize} isLoading={isLoading} />
                
                {error && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="mt-8 w-full p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-500/30 rounded-xl text-red-600 dark:text-red-400 text-center shadow-sm flex items-center justify-center gap-2"
                  >
                    <span>{error}</span>
                  </motion.div>
                )}

                <div className="mt-12">
                  <ResultsDisplay results={results} />
                </div>
             </div>
          </div>
        </div>
      </section>

      {/* --- FOOTER --- */}
      <footer className="py-10 text-center border-t border-zinc-200 dark:border-zinc-800 text-zinc-500 dark:text-zinc-400 text-sm">
         <p>© {new Date().getFullYear()} AI Career Intelligence. All rights reserved.</p>
      </footer>
    </div>
  );
}

// --- SUBCOMPONENTS ---

function FeatureShowcase({ title, subtitle, description, icon, imageContent, reverse = false }: any) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.7 }}
      className={`flex flex-col ${reverse ? 'md:flex-row-reverse' : 'md:flex-row'} items-center gap-12 md:gap-24`}
    >
      <div className="flex-1 space-y-6">
        <div className="w-16 h-16 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm flex items-center justify-center mb-6">
          {icon}
        </div>
        <h3 className="text-3xl md:text-4xl font-heading font-bold">{title}</h3>
        <p className="text-xl font-medium text-teal-600 dark:text-teal-400">{subtitle}</p>
        <p className="text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed">{description}</p>
        <ul className="space-y-3 mt-6">
          <li className="flex items-center gap-3 text-zinc-700 dark:text-zinc-300"><CheckCircle2 className="w-5 h-5 text-teal-500" /> Advanced AI Analysis</li>
          <li className="flex items-center gap-3 text-zinc-700 dark:text-zinc-300"><CheckCircle2 className="w-5 h-5 text-teal-500" /> Real-time feedback</li>
          <li className="flex items-center gap-3 text-zinc-700 dark:text-zinc-300"><CheckCircle2 className="w-5 h-5 text-teal-500" /> Export to PDF/Word</li>
        </ul>
      </div>
      <div className="flex-1 w-full aspect-square md:aspect-[4/3]">
        {imageContent}
      </div>
    </motion.div>
  );
}

function TestimonialCard({ name, role, text }: { name: string, role: string, text: string }) {
  return (
    <div className="bg-zinc-800/50 dark:bg-zinc-900/50 border border-zinc-700 dark:border-zinc-800 p-8 rounded-2xl text-left hover:-translate-y-2 transition-transform duration-300">
      <div className="flex gap-1 text-amber-400 mb-6">
        <Star size={18} fill="currentColor" />
        <Star size={18} fill="currentColor" />
        <Star size={18} fill="currentColor" />
        <Star size={18} fill="currentColor" />
        <Star size={18} fill="currentColor" />
      </div>
      <p className="text-zinc-300 text-lg leading-relaxed mb-8">"{text}"</p>
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 bg-zinc-700 rounded-full flex items-center justify-center font-bold text-white">
          {name.charAt(0)}
        </div>
        <div>
          <p className="font-bold text-white">{name}</p>
          <p className="text-sm text-zinc-400">{role}</p>
        </div>
      </div>
    </div>
  );
}
