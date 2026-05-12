import { UserButton } from "@clerk/nextjs";
import Link from "next/link";
import { Briefcase, History, LayoutDashboard, Plus, Sparkles } from "lucide-react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 flex flex-col md:flex-row">
      {/* Sidebar */}
      <aside className="w-full md:w-64 border-r border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 flex-shrink-0">
        <div className="h-16 flex items-center px-6 border-b border-zinc-200 dark:border-zinc-800">
          <Link href="/" className="flex items-center gap-2 font-heading font-bold text-xl text-zinc-900 dark:text-white">
            <Sparkles className="w-5 h-5 text-teal-500" />
            <span>Career AI</span>
          </Link>
        </div>
        
        <div className="p-4 flex flex-col gap-2">
          <Link href="/dashboard" className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors">
            <LayoutDashboard className="w-4 h-4" />
            Overview
          </Link>
          <Link href="/dashboard/optimize" className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium bg-teal-50 dark:bg-teal-500/10 text-teal-700 dark:text-teal-400 hover:bg-teal-100 dark:hover:bg-teal-500/20 transition-colors">
            <Plus className="w-4 h-4" />
            New Optimization
          </Link>
          <Link href="/dashboard/history" className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors">
            <History className="w-4 h-4" />
            History
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden">
        {/* Topbar */}
        <header className="h-16 border-b border-zinc-200 dark:border-zinc-800 bg-white/50 dark:bg-zinc-900/50 backdrop-blur-md flex items-center justify-end px-6 flex-shrink-0">
          <UserButton />
        </header>

        {/* Scrollable Area */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-8">
          <div className="max-w-6xl mx-auto">
            {children}
          </div>
        </div>
      </main>
    </div>
  );
}
