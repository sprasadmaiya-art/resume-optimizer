"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { History, Plus } from "lucide-react";
import { cn } from "@/lib/utils";

export function DashboardNav() {
  const pathname = usePathname();

  return (
    <nav className="flex items-center gap-1 sm:gap-2">
      <Link 
        href="/dashboard/optimize" 
        className={cn(
          "flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-4 py-2 rounded-full text-xs sm:text-sm font-bold transition-all",
          pathname === "/dashboard/optimize" || pathname === "/dashboard"
            ? "bg-teal-500/10 text-teal-600 dark:text-teal-400"
            : "text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800/50 hover:text-zinc-900 dark:hover:text-white"
        )}
      >
        <Plus className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
        <span className="hidden sm:inline">New Optimization</span>
        <span className="sm:hidden">New</span>
      </Link>
      <Link 
        href="/dashboard/history" 
        className={cn(
          "flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-4 py-2 rounded-full text-xs sm:text-sm font-bold transition-all",
          pathname?.startsWith("/dashboard/history")
            ? "bg-indigo-500/10 text-indigo-600 dark:text-indigo-400"
            : "text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800/50 hover:text-zinc-900 dark:hover:text-white"
        )}
      >
        <History className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
        <span className="hidden sm:inline">History</span>
      </Link>
    </nav>
  );
}
