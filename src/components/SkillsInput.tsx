"use client";

import { useState, KeyboardEvent } from "react";
import { X, Plus } from "lucide-react";
import { usePostHog } from "posthog-js/react";

interface SkillsInputProps {
  skills: string[];
  onChange: (skills: string[]) => void;
  disabled?: boolean;
}

export default function SkillsInput({ skills, onChange, disabled }: SkillsInputProps) {
  const [inputValue, setInputValue] = useState("");
  const posthog = usePostHog();

  const handleAddSkill = (skillText: string) => {
    const newSkills = skillText
      .split(",")
      .map((s) => s.trim())
      .filter((s) => s.length > 0 && !skills.includes(s));

    if (newSkills.length > 0) {
      onChange([...skills, ...newSkills]);
      setInputValue("");
      posthog.capture("skills_added", { count: newSkills.length });
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      handleAddSkill(inputValue);
    }
  };

  const handleRemoveSkill = (skillToRemove: string) => {
    onChange(skills.filter((s) => s !== skillToRemove));
  };

  const handleBlur = () => {
    if (inputValue.trim()) {
      handleAddSkill(inputValue);
    }
  };

  return (
    <div className="w-full space-y-3">
      <div className="flex flex-wrap gap-2">
        {skills.map((skill) => (
          <div
            key={skill}
            className="flex items-center gap-1.5 bg-indigo-50 border border-indigo-100 text-indigo-700 px-3 py-1.5 rounded-full text-sm font-medium transition-all"
          >
            <span>{skill}</span>
            {!disabled && (
              <button
                type="button"
                onClick={() => handleRemoveSkill(skill)}
                className="hover:bg-indigo-200/50 rounded-full p-0.5 transition-colors"
                aria-label={`Remove ${skill}`}
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        ))}
      </div>

      <div className="relative">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          onBlur={handleBlur}
          disabled={disabled}
          placeholder={skills.length === 0 ? "e.g. React, UI/UX, Python, Selenium, Figma..." : "Add more skills..."}
          className="w-full bg-white border border-zinc-200 rounded-xl pl-4 pr-10 py-3 text-sm text-zinc-900 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-teal-500/50 shadow-sm transition-all"
        />
        <button
          type="button"
          onClick={() => handleAddSkill(inputValue)}
          disabled={disabled || !inputValue.trim()}
          className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 text-zinc-400 hover:text-teal-600 disabled:opacity-50 disabled:hover:text-zinc-400 transition-colors"
        >
          <Plus className="w-5 h-5" />
        </button>
      </div>
      <p className="text-xs text-zinc-500">Press Enter or comma to add a skill.</p>
    </div>
  );
}
