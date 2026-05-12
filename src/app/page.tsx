"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useTheme } from "next-themes";
import { SignInButton, UserButton, useAuth } from "@clerk/nextjs";
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
  CheckCircle2
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
  const { isSignedIn, isLoaded } = useAuth();

  return (
    <nav className="fixed top-0 w-full z-50 glass border-b border-zinc-200/50 dark:border-zinc-800/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2 font-heading font-bold text-xl text-zinc-900 dark:text-white">
          <Sparkles className="w-5 h-5 text-teal-500" />
          <span>Career AI</span>
        </div>
        <div className="flex items-center gap-4">
          <ThemeToggle />
          {isLoaded && !isSignedIn && (
            <SignInButton mode="modal">
              <button className="px-4 py-2 rounded-full bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 text-sm font-medium hover:scale-105 transition-transform">
                Sign In
              </button>
            </SignInButton>
          )}
          {isLoaded && isSignedIn && (
            <>
              <Link href="/dashboard" className="px-4 py-2 rounded-full text-sm font-medium hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors">
                Dashboard
              </Link>
              <UserButton />
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default function Home() {
  const { isSignedIn, isLoaded } = useAuth();

  return (
    <div className="relative w-full overflow-x-hidden">
      <Navbar />

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
          {isLoaded && !isSignedIn && (
            <SignInButton mode="modal">
              <button className="px-8 py-4 rounded-full bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 font-semibold text-lg hover:scale-105 transition-transform flex items-center gap-2 shadow-xl shadow-zinc-900/20 dark:shadow-white/10">
                Start Optimizing Free <ChevronRight size={20} />
              </button>
            </SignInButton>
          )}
          {isLoaded && isSignedIn && (
            <Link href="/dashboard" className="px-8 py-4 rounded-full bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 font-semibold text-lg hover:scale-105 transition-transform flex items-center gap-2 shadow-xl shadow-zinc-900/20 dark:shadow-white/10">
              Go to Dashboard <ChevronRight size={20} />
            </Link>
          )}
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

      {/* --- CTA SECTION --- */}
      <section className="py-32 px-4 sm:px-6 lg:px-8 bg-zinc-900 dark:bg-black text-white text-center">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-heading font-bold mb-6">Ready to elevate your career?</h2>
          <p className="text-xl text-zinc-400 mb-10">Join thousands of professionals landing their dream roles with AI.</p>
          {isLoaded && !isSignedIn && (
            <SignInButton mode="modal">
              <button className="px-8 py-4 rounded-full bg-white text-zinc-900 font-bold text-lg hover:scale-105 transition-transform shadow-xl">
                Get Started for Free
              </button>
            </SignInButton>
          )}
          {isLoaded && isSignedIn && (
            <Link href="/dashboard" className="px-8 py-4 rounded-full bg-white text-zinc-900 font-bold text-lg hover:scale-105 transition-transform shadow-xl inline-block">
              Open Dashboard
            </Link>
          )}
        </div>
      </section>

      {/* --- FOOTER --- */}
      <footer className="py-10 text-center border-t border-zinc-200 dark:border-zinc-800 text-zinc-500 dark:text-zinc-400 text-sm">
         <p>© {new Date().getFullYear()} AI Career Intelligence. All rights reserved.</p>
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
