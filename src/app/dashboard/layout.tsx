import { UserButton } from "@clerk/nextjs";
import Link from "next/link";
import { Briefcase, History, LayoutDashboard, Plus, Sparkles } from "lucide-react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 flex flex-col">
      {/* Topbar */}
      <header className="h-16 border-b border-zinc-200 dark:border-zinc-800 bg-white/50 dark:bg-zinc-900/50 backdrop-blur-md flex items-center justify-between px-6 flex-shrink-0 z-50 sticky top-0">
        <div className="flex items-center gap-8">
          <Link href="/" className="flex items-center gap-2 font-heading font-bold text-xl text-zinc-900 dark:text-white hover:opacity-80 transition-opacity">
            <Sparkles className="w-5 h-5 text-teal-500" />
            <span>CareerOS</span>
          </Link>
          
          <nav className="hidden sm:flex items-center gap-6">
            <Link href="/dashboard/optimize" className="flex items-center gap-2 text-sm font-bold text-zinc-600 dark:text-zinc-400 hover:text-teal-600 dark:hover:text-teal-400 transition-colors">
              <Plus className="w-4 h-4" />
              New Optimization
            </Link>
            <Link href="/dashboard/history" className="flex items-center gap-2 text-sm font-bold text-zinc-600 dark:text-zinc-400 hover:text-teal-600 dark:hover:text-teal-400 transition-colors">
              <History className="w-4 h-4" />
              History
            </Link>
          </nav>
        </div>
        <div className="flex items-center gap-4">
          <UserButton />
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col">
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
