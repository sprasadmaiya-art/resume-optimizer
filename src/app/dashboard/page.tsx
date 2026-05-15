import { currentUser, auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { ArrowRight, FileText, Target, Users } from "lucide-react";
export const dynamic = "force-dynamic";

export default async function DashboardOverview() {
  try {
    const user = await currentUser();
    const { userId } = await auth();

    let totalOptimizations = 0;
    let avgAtsScore = 0;

    if (userId) {
      const sessions = await prisma.optimizationSession.findMany({
        where: { userId },
        select: { atsScore: true },
      });

      totalOptimizations = sessions.length;
      const scoredSessions = sessions.filter((s: any) => s.atsScore !== null);
      if (scoredSessions.length > 0) {
        const totalScore = scoredSessions.reduce((acc: number, curr: any) => acc + (curr.atsScore || 0), 0);
        avgAtsScore = Math.round(totalScore / scoredSessions.length);
      }
    }

    return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-heading font-bold text-zinc-900 dark:text-white">
          Welcome back, {user?.firstName || "Professional"}
        </h1>
        <p className="text-zinc-600 dark:text-zinc-400 mt-2">
          Here's an overview of your career intelligence data.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="glass-card p-6 border border-zinc-200 dark:border-zinc-800">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-zinc-800 dark:text-zinc-200">Resumes Optimized</h3>
            <div className="w-10 h-10 rounded-full bg-indigo-50 dark:bg-indigo-500/10 flex items-center justify-center text-indigo-500">
              <FileText className="w-5 h-5" />
            </div>
          </div>
          <p className="text-3xl font-bold text-zinc-900 dark:text-white">{totalOptimizations}</p>
          <Link href="/dashboard/history" className="text-sm text-indigo-500 hover:underline mt-4 inline-block">
            View history &rarr;
          </Link>
        </div>

        <div className="glass-card p-6 border border-zinc-200 dark:border-zinc-800">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-zinc-800 dark:text-zinc-200">Average ATS Score</h3>
            <div className="w-10 h-10 rounded-full bg-teal-50 dark:bg-teal-500/10 flex items-center justify-center text-teal-500">
              <Target className="w-5 h-5" />
            </div>
          </div>
          <p className="text-3xl font-bold text-zinc-900 dark:text-white">{avgAtsScore > 0 ? avgAtsScore : "-"}</p>
          <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-4">Across all your applications</p>
        </div>

        <div className="glass-card p-6 border border-zinc-200 dark:border-zinc-800">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-zinc-800 dark:text-zinc-200">Interviews Prepped</h3>
            <div className="w-10 h-10 rounded-full bg-amber-50 dark:bg-amber-500/10 flex items-center justify-center text-amber-500">
              <Users className="w-5 h-5" />
            </div>
          </div>
          <p className="text-3xl font-bold text-zinc-900 dark:text-white">{totalOptimizations}</p>
          <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-4">From optimization runs</p>
        </div>
      </div>

      <div className="mt-8">
        <div className="glass-card p-8 border border-zinc-200 dark:border-zinc-800 text-center">
          <h2 className="text-2xl font-bold mb-4 text-zinc-900 dark:text-white">Ready for your next application?</h2>
          <p className="text-zinc-600 dark:text-zinc-400 mb-8 max-w-xl mx-auto">
            Upload your resume and a target job description to get instant ATS feedback and a highly optimized resume.
          </p>
          <Link href="/dashboard/optimize" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-teal-600 text-white font-medium hover:bg-teal-700 transition-colors shadow-lg shadow-teal-500/20">
            Start New Optimization <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
    );
  } catch (error: any) {
    let debugHost = "unknown";
    try {
      const url = process.env.DATABASE_URL || "";
      const split = url.split('@');
      if (split.length > 1) {
        debugHost = split.pop()?.split('/')[0] || "unknown";
      }
    } catch (e) {}

    return (
      <div className="p-8 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl max-w-4xl mx-auto mt-12">
        <h2 className="text-2xl font-bold text-red-600 dark:text-red-400 mb-4">Dashboard Error</h2>
        <p className="text-zinc-700 dark:text-zinc-300 mb-4">There was an error loading your dashboard data. Please share this exact error message:</p>
        <div className="bg-white dark:bg-zinc-950 p-4 rounded-lg overflow-x-auto text-sm font-mono text-red-600 dark:text-red-400 border border-red-100 dark:border-red-900/50">
          <strong>Message:</strong> {error?.message || "Unknown error"}<br/><br/>
          <strong>Attempting to connect to host:</strong> {debugHost}<br/><br/>
          <strong>Stack:</strong> {error?.stack || "No stack trace"}
        </div>
      </div>
    );
  }
}
