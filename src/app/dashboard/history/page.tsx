import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { FileText, Target, Calendar } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function HistoryPage() {
  const { userId } = await auth();

  if (!userId) {
    return null;
  }

  const sessions = await prisma.optimizationSession.findMany({
    where: { userId },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-heading font-bold text-zinc-900 dark:text-white">Your History</h1>
        <p className="text-zinc-600 dark:text-zinc-400 mt-2">
          View your past resume optimizations, ATS scores, and recruiter simulator feedback.
        </p>
      </div>

      {sessions.length === 0 ? (
        <div className="glass-card p-12 text-center border border-zinc-200 dark:border-zinc-800">
          <FileText className="w-12 h-12 text-zinc-300 dark:text-zinc-700 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-zinc-900 dark:text-white mb-2">No history yet</h3>
          <p className="text-zinc-500 dark:text-zinc-400 mb-6">
            You haven't run any AI optimizations yet. Your results will appear here.
          </p>
          <Link href="/dashboard/optimize" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 font-medium hover:scale-105 transition-transform">
            Start Your First Optimization
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {sessions.map((session: any) => (
            <div key={session.id} className="glass-card p-6 border border-zinc-200 dark:border-zinc-800 hover:border-teal-500/50 transition-colors group relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                <Target className="w-24 h-24 text-teal-500" />
              </div>
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-4">
                  <span className="px-3 py-1 bg-teal-50 dark:bg-teal-500/10 text-teal-700 dark:text-teal-400 rounded-full text-xs font-bold tracking-wider uppercase">
                    {session.role}
                  </span>
                  <div className="flex items-center gap-1 text-zinc-400 text-sm">
                    <Calendar className="w-4 h-4" />
                    {new Date(session.createdAt).toLocaleDateString()}
                  </div>
                </div>

                <div className="flex items-end gap-2 mb-6">
                  <span className="text-4xl font-black text-zinc-900 dark:text-white">
                    {session.atsScore || "-"}
                  </span>
                  <span className="text-zinc-500 font-medium mb-1">/ 100 ATS Match</span>
                </div>

                <div className="border-t border-zinc-100 dark:border-zinc-800 pt-4 flex gap-4">
                  <Link href={`/dashboard/history/${session.id}`} className="text-teal-600 dark:text-teal-400 font-medium hover:underline text-sm flex items-center gap-1">
                    View Full Report &rarr;
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
