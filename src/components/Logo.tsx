export function Logo({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg 
      viewBox="0 0 32 32" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg" 
      className={className}
    >
      <path 
        d="M16 2L2 26H30L16 2Z" 
        fill="url(#paint0_linear)" 
      />
      <path 
        d="M16 12L8 26H24L16 12Z" 
        fill="white" 
      />
      <defs>
        <linearGradient 
          id="paint0_linear" 
          x1="16" 
          y1="2" 
          x2="16" 
          y2="26" 
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#14B8A6" /> {/* Tailwind Teal-500 */}
          <stop offset="1" stopColor="#6366F1" /> {/* Tailwind Indigo-500 */}
        </linearGradient>
      </defs>
    </svg>
  );
}
