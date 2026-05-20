import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { FileText, Target, Calendar, ArrowRight, TrendingUp, AlertTriangle, Briefcase, Zap } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function HistoryPage() {
  const { userId } = await auth();

  if (!userId) {
    return null;
  }

  let sessions: any[] = [];
  let dbError = false;

  try {
    sessions = await prisma.optimizationSession.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
    });
  } catch (error) {
    console.error("Database connection failed:", error);
    dbError = true;
  }

  return (
    <div className="space-y-10">
      <div className="relative">
        <div className="absolute -inset-1 bg-gradient-to-r from-teal-500/20 to-indigo-500/20 blur-2xl -z-10 rounded-full" />
        <h1 className="text-4xl font-heading font-extrabold text-zinc-900 dark:text-white tracking-tight flex items-center gap-3">
          <HistoryIcon className="w-8 h-8 text-teal-500" />
          Career Intelligence History
        </h1>
        <p className="text-zinc-500 dark:text-zinc-400 mt-3 text-lg max-w-2xl">
          Review your past AI optimizations. Track your ATS scores, identify skills gaps, and master your interview prep.
        </p>
      </div>

      {dbError ? (
        <div className="glass-card p-12 text-center border-2 border-red-200 dark:border-red-900/50 bg-red-50/50 dark:bg-red-900/10 rounded-3xl relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay"></div>
          <AlertTriangle className="w-16 h-16 text-red-500 mx-auto mb-6 relative z-10 animate-pulse" />
          <h3 className="text-2xl font-black text-red-900 dark:text-red-400 mb-3 relative z-10">Connection Interrupted</h3>
          <p className="text-red-700 dark:text-red-300 mb-6 max-w-lg mx-auto relative z-10 text-lg">
            We couldn't reach the database server. If you are using a free tier database, it might be paused. Please verify your connection string.
          </p>
        </div>
      ) : sessions.length === 0 ? (
        <div className="glass-card p-16 text-center border border-zinc-200 dark:border-zinc-800 rounded-3xl relative overflow-hidden bg-white/40 dark:bg-zinc-900/40 backdrop-blur-xl">
          <div className="absolute inset-0 bg-gradient-to-br from-teal-500/5 to-indigo-500/5"></div>
          
          <div className="w-24 h-24 mx-auto bg-zinc-100 dark:bg-zinc-800 rounded-full flex items-center justify-center mb-6 relative z-10 shadow-inner">
            <FileText className="w-10 h-10 text-zinc-400 dark:text-zinc-500" />
          </div>
          
          <h3 className="text-2xl font-extrabold text-zinc-900 dark:text-white mb-3 relative z-10">No history yet</h3>
          <p className="text-zinc-500 dark:text-zinc-400 mb-8 max-w-md mx-auto relative z-10 text-lg">
            You haven't run any AI optimizations yet. Generate your first Career Intelligence Report to see it here.
          </p>
          <Link href="/dashboard/optimize" className="relative inline-flex group z-10">
            <div className="absolute inset-0 bg-gradient-to-r from-teal-500 to-indigo-500 rounded-xl blur opacity-60 group-hover:opacity-100 transition duration-200"></div>
            <div className="relative inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 font-bold text-lg hover:scale-[1.02] transition-transform">
              <Zap className="w-5 h-5" /> Start Your First Optimization
            </div>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sessions.map((session: any) => {
            // Determine score color based on value
            const score = session.atsScore || 0;
            let scoreColor = "text-zinc-500";
            let scoreBg = "bg-zinc-100 dark:bg-zinc-800";
            
            if (score >= 80) {
              scoreColor = "text-emerald-600 dark:text-emerald-400";
              scoreBg = "bg-emerald-50 dark:bg-emerald-500/10 border-emerald-200 dark:border-emerald-500/20";
            } else if (score >= 60) {
              scoreColor = "text-amber-600 dark:text-amber-400";
              scoreBg = "bg-amber-50 dark:bg-amber-500/10 border-amber-200 dark:border-amber-500/20";
            } else if (score > 0) {
              scoreColor = "text-red-600 dark:text-red-400";
              scoreBg = "bg-red-50 dark:bg-red-500/10 border-red-200 dark:border-red-500/20";
            }

            return (
              <Link 
                href={`/dashboard/history/${session.id}`} 
                key={session.id} 
                className="group relative block rounded-3xl overflow-hidden bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 hover:border-teal-500/50 dark:hover:border-teal-500/50 transition-all duration-300 hover:shadow-xl hover:shadow-teal-500/10 hover:-translate-y-1"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-teal-500/0 to-indigo-500/0 group-hover:from-teal-500/5 group-hover:to-indigo-500/5 transition-all"></div>
                
                <div className="p-6 relative z-10">
                  <div className="flex items-start justify-between mb-6">
                    <div className="flex items-center gap-2">
                      <div className="w-10 h-10 rounded-full bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center">
                        <Briefcase className="w-5 h-5 text-zinc-600 dark:text-zinc-400" />
                      </div>
                      <div>
                        <h3 className="font-bold text-zinc-900 dark:text-white line-clamp-1 group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors" title={session.role}>
                          {session.role}
                        </h3>
                        <div className="flex items-center gap-1 text-zinc-400 text-xs font-medium">
                          <Calendar className="w-3 h-3" />
                          {new Date(session.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between mt-8 pt-6 border-t border-zinc-100 dark:border-zinc-800/80">
                    <div className="flex flex-col">
                      <span className="text-xs font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider mb-1">ATS Match</span>
                      <div className="flex items-baseline gap-1">
                        <span className={`text-3xl font-black ${scoreColor}`}>
                          {score || "-"}
                        </span>
                        <span className="text-zinc-400 text-sm font-medium">%</span>
                      </div>
                    </div>
                    
                    <div className={`w-12 h-12 rounded-full border ${scoreBg} flex items-center justify-center transform group-hover:scale-110 transition-transform`}>
                      <TrendingUp className={`w-5 h-5 ${scoreColor}`} />
                    </div>
                  </div>
                  
                  <div className="mt-6 flex items-center text-sm font-bold text-teal-600 dark:text-teal-400 opacity-0 group-hover:opacity-100 transition-opacity translate-x-2 group-hover:translate-x-0">
                    View Full Report <ArrowRight className="w-4 h-4 ml-1" />
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}

function HistoryIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
      <path d="M3 3v5h5" />
      <path d="M12 7v5l4 2" />
    </svg>
  );
}
