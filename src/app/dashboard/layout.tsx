import { UserButton } from "@clerk/nextjs";
import Link from "next/link";
import { Briefcase, History, LayoutDashboard, Plus, Sparkles } from "lucide-react";
import { Logo } from "../../components/Logo";
import { DashboardNav } from "../../components/DashboardNav";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 flex flex-col">
      {/* Topbar */}
      <header className="h-16 border-b border-zinc-200 dark:border-zinc-800 bg-white/50 dark:bg-zinc-900/50 backdrop-blur-md flex items-center justify-between px-3 sm:px-6 flex-shrink-0 z-50 sticky top-0">
        <div className="flex items-center gap-2 sm:gap-8">
          <Link href="/" className="flex items-center gap-1 sm:gap-2.5 font-heading text-lg sm:text-xl tracking-tight hover:opacity-80 transition-opacity">
            <Logo className="w-5 h-5 sm:w-6 sm:h-6" />
            <span className="text-zinc-900 dark:text-white font-black">
              Verta<span className="text-teal-600 dark:text-teal-500 font-bold">Match</span>
            </span>
          </Link>
          
          <DashboardNav />
        </div>
        <div className="flex items-center gap-2 sm:gap-4 shrink-0 pl-2">
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
