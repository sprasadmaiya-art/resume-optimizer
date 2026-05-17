"use client";

import { motion } from "framer-motion";
import { Compass, TrendingUp, Award, DollarSign, Route, Star, ArrowRight, BookOpen } from "lucide-react";

interface CareerRecommendationsProps {
  data: {
    suitableRoles: string[];
    highDemandSkills: string[];
    careerGrowthSuggestions: string[];
    recommendedCertifications: string[];
    salaryGrowthSuggestions: string;
    learningRoadmap: string[];
    suggestedCareerPaths: string[];
    mostValuableSkillNext: string;
  };
}

export default function CareerRecommendations({ data }: CareerRecommendationsProps) {
  if (!data) return null;

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } }
  };

  return (
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className="w-full space-y-8"
    >
      <div className="flex items-center gap-4 mb-8 glass-card p-6 border-b border-zinc-200 dark:border-zinc-800 rounded-3xl">
        <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-blue-500/20 text-white shrink-0">
          <Compass className="w-7 h-7" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-zinc-900 dark:text-white">Career Trajectory</h2>
          <p className="text-zinc-500 dark:text-zinc-400">Long-term strategic guidance and learning paths.</p>
        </div>
      </div>

      {/* Hero Recommendation - Pulsing Card */}
      <motion.div variants={itemVariants} className="relative group">
        {/* Animated glow background */}
        <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-3xl blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200 animate-pulse"></div>
        <div className="glass-card p-8 md:p-12 bg-gradient-to-br from-blue-600 to-indigo-700 text-white relative overflow-hidden rounded-3xl border border-blue-400/30">
          <motion.div 
            animate={{ rotate: 360 }}
            transition={{ duration: 100, repeat: Infinity, ease: "linear" }}
            className="absolute -right-20 -top-20 opacity-10"
          >
            <Star className="w-96 h-96" />
          </motion.div>
          
          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-8">
            <div className="flex-1">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-blue-100 text-xs font-bold uppercase tracking-wider mb-6">
                <Star className="w-3.5 h-3.5" fill="currentColor" /> Highest ROI Action
              </div>
              <h3 className="text-4xl md:text-5xl font-extrabold mb-4 tracking-tight leading-tight bg-clip-text text-transparent bg-gradient-to-b from-white to-blue-100">
                Learn {data.mostValuableSkillNext}
              </h3>
              <p className="text-blue-100/80 max-w-2xl text-lg leading-relaxed">
                Mastering this single skill will drastically increase your market value and ATS match rate for your target roles in the current market.
              </p>
            </div>
          </div>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Roles & Paths */}
        <div className="space-y-6">
          <motion.div variants={itemVariants} className="glass-card p-8 rounded-3xl dark:bg-zinc-900/50">
            <h3 className="font-bold text-xl text-zinc-900 dark:text-white flex items-center gap-3 mb-6">
              <div className="p-2 bg-indigo-100 dark:bg-indigo-900/30 rounded-xl">
                 <Route className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
              </div>
              Career Path Branching
            </h3>
            
            {/* Tree Branching Visualization */}
            <div className="relative pl-6 space-y-6">
              {/* Central Node representing current state is implicit here */}
              {data.suggestedCareerPaths.map((path, idx) => (
                <motion.div 
                  key={idx} 
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 + (idx * 0.15) }}
                  className="relative"
                >
                  {/* Branch Line */}
                  <div className="absolute -left-6 top-1/2 w-6 h-[2px] bg-indigo-200 dark:bg-indigo-800 -translate-y-1/2"></div>
                  {/* Vertical Connector */}
                  {idx !== data.suggestedCareerPaths.length - 1 && (
                    <div className="absolute -left-6 top-1/2 w-[2px] h-[calc(100%+1.5rem)] bg-indigo-200 dark:bg-indigo-800"></div>
                  )}
                  {/* Node */}
                  <div className="absolute -left-[27px] top-1/2 w-2 h-2 rounded-full bg-indigo-500 -translate-y-1/2 z-10 shadow-[0_0_0_4px_rgba(99,102,241,0.2)]"></div>
                  
                  <div className="p-4 bg-white dark:bg-zinc-800 border border-zinc-100 dark:border-zinc-700/50 rounded-xl shadow-sm group hover:border-indigo-300 dark:hover:border-indigo-600 transition-colors">
                    <span className="text-sm font-bold text-zinc-800 dark:text-zinc-200 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">{path}</span>
                  </div>
                </motion.div>
              ))}
            </div>
            
            <div className="mt-8 pt-6 border-t border-zinc-100 dark:border-zinc-800">
              <h4 className="text-xs font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-wider mb-4">Alternative Lateral Roles</h4>
              <div className="flex flex-wrap gap-2">
                {data.suitableRoles.map((role, idx) => (
                  <span key={idx} className="px-3 py-1.5 bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 text-xs font-semibold rounded-lg">
                    {role}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>

          <motion.div variants={itemVariants} className="glass-card p-8 rounded-3xl bg-gradient-to-br from-emerald-50/50 to-transparent dark:from-emerald-900/10 border-emerald-100 dark:border-emerald-900/30">
            <h3 className="font-bold text-xl text-zinc-900 dark:text-white flex items-center gap-3 mb-4">
              <div className="p-2 bg-emerald-100 dark:bg-emerald-900/30 rounded-xl">
                 <DollarSign className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
              </div>
              Salary Growth Potential
            </h3>
            <p className="text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed font-medium">{data.salaryGrowthSuggestions}</p>
          </motion.div>
        </div>

        {/* Learning Roadmap & Certs */}
        <div className="space-y-6">
          <motion.div variants={itemVariants} className="glass-card p-8 rounded-3xl dark:bg-zinc-900/50">
            <h3 className="font-bold text-xl text-zinc-900 dark:text-white flex items-center gap-3 mb-8">
              <div className="p-2 bg-teal-100 dark:bg-teal-900/30 rounded-xl">
                 <TrendingUp className="w-6 h-6 text-teal-600 dark:text-teal-400" />
              </div>
              Learning Subway Map
            </h3>
            
            {/* Subway Map Timeline */}
            <div className="relative pl-8 space-y-8">
              {/* Main Line */}
              <div className="absolute left-3.5 top-2 bottom-2 w-1.5 bg-gradient-to-b from-teal-400 via-cyan-400 to-blue-500 rounded-full"></div>
              
              {data.learningRoadmap.map((step, idx) => (
                <motion.div 
                  key={idx} 
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ delay: 0.3 + (idx * 0.2) }}
                  className="relative group"
                >
                  {/* Stop Node */}
                  <div className="absolute -left-[30px] top-1 w-5 h-5 rounded-full bg-white dark:bg-zinc-950 border-4 border-teal-500 z-10 shadow-sm group-hover:scale-125 transition-transform"></div>
                  
                  <div className="bg-white/50 dark:bg-zinc-800/50 border border-zinc-100 dark:border-zinc-700 p-4 rounded-2xl hover:shadow-md transition-all">
                    <p className="text-sm text-zinc-800 dark:text-zinc-200 leading-relaxed font-semibold">{step}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div variants={itemVariants} className="glass-card p-8 rounded-3xl border-t-4 border-t-yellow-400 dark:bg-zinc-900/50">
            <h3 className="font-bold text-xl text-zinc-900 dark:text-white flex items-center gap-3 mb-6">
              <div className="p-2 bg-yellow-100 dark:bg-yellow-900/30 rounded-xl">
                 <Award className="w-6 h-6 text-yellow-600 dark:text-yellow-400" />
              </div>
              Target Certifications
            </h3>
            <div className="grid grid-cols-1 gap-3">
              {data.recommendedCertifications.map((cert, idx) => (
                <motion.div 
                  key={idx}
                  whileHover={{ scale: 1.02 }}
                  className="flex items-center justify-between p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-800/80 border border-zinc-200 dark:border-zinc-700/50 group cursor-default"
                >
                  <div className="flex items-center gap-3">
                    <BookOpen className="w-5 h-5 text-yellow-500" />
                    <span className="font-bold text-sm text-zinc-800 dark:text-zinc-200">{cert}</span>
                  </div>
                  <ArrowRight className="w-4 h-4 text-zinc-400 group-hover:text-yellow-500 transition-colors" />
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}
