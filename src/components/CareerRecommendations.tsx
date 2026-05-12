"use client";

import { motion } from "framer-motion";
import { Compass, TrendingUp, Award, DollarSign, Route, Star } from "lucide-react";

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

  return (
    <div className="w-full space-y-8">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center border border-blue-200">
          <Compass className="w-6 h-6 text-blue-600" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-zinc-900">Career Trajectory</h2>
          <p className="text-sm text-zinc-500">Long-term strategic guidance based on your profile.</p>
        </div>
      </div>

      {/* Hero Recommendation */}
      <div className="glass-card p-8 bg-gradient-to-r from-blue-600 to-indigo-600 text-white relative overflow-hidden">
        <Star className="absolute -right-10 -top-10 w-48 h-48 text-white opacity-10" />
        <p className="text-blue-100 text-sm font-semibold uppercase tracking-wider mb-2">Most Valuable Skill to Learn Next</p>
        <h3 className="text-3xl font-extrabold mb-4">{data.mostValuableSkillNext}</h3>
        <p className="text-blue-100 max-w-2xl">Mastering this single skill will drastically increase your market value and ATS match rate for your target roles.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Roles & Paths */}
        <div className="space-y-6">
          <div className="glass-card p-6">
            <h3 className="font-semibold text-lg text-zinc-800 flex items-center gap-2 mb-4">
              <Route className="w-5 h-5 text-indigo-500" />
              Suggested Career Paths
            </h3>
            <div className="space-y-4">
              {data.suggestedCareerPaths.map((path, idx) => (
                <div key={idx} className="p-3 bg-zinc-50 border border-zinc-100 rounded-lg">
                  <span className="text-sm font-medium text-zinc-700">{path}</span>
                </div>
              ))}
            </div>
            
            <h4 className="text-xs font-bold text-zinc-400 uppercase tracking-wider mt-6 mb-3">Alternative Suitable Roles</h4>
            <div className="flex flex-wrap gap-2">
              {data.suitableRoles.map((role, idx) => (
                <span key={idx} className="px-3 py-1 bg-white border border-zinc-200 text-zinc-600 text-xs font-medium rounded-full shadow-sm">
                  {role}
                </span>
              ))}
            </div>
          </div>

          <div className="glass-card p-6 border-l-4 border-l-emerald-400">
            <h3 className="font-semibold text-lg text-zinc-800 flex items-center gap-2 mb-4">
              <DollarSign className="w-5 h-5 text-emerald-500" />
              Salary Growth
            </h3>
            <p className="text-sm text-zinc-600 leading-relaxed">{data.salaryGrowthSuggestions}</p>
          </div>
        </div>

        {/* Learning Roadmap & Certs */}
        <div className="space-y-6">
          <div className="glass-card p-6">
            <h3 className="font-semibold text-lg text-zinc-800 flex items-center gap-2 mb-4">
              <TrendingUp className="w-5 h-5 text-teal-500" />
              Learning Roadmap
            </h3>
            <div className="relative pl-6 space-y-6 border-l-2 border-teal-100 ml-3">
              {data.learningRoadmap.map((step, idx) => (
                <div key={idx} className="relative">
                  <div className="absolute -left-[31px] top-1 w-4 h-4 rounded-full bg-white border-2 border-teal-500" />
                  <p className="text-sm text-zinc-700 leading-relaxed font-medium">{step}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="glass-card p-6 bg-zinc-900 text-white">
            <h3 className="font-semibold text-lg flex items-center gap-2 mb-4">
              <Award className="w-5 h-5 text-yellow-400" />
              Recommended Certifications
            </h3>
            <ul className="space-y-3">
              {data.recommendedCertifications.map((cert, idx) => (
                <li key={idx} className="flex gap-3 text-sm text-zinc-300 items-start">
                  <span className="text-yellow-400 mt-0.5 shrink-0">✦</span>
                  <span className="leading-relaxed font-medium">{cert}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
