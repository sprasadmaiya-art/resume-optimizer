import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";
import { notFound, redirect } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import ResultsDisplay from "@/components/ResultsDisplay";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";
export const revalidate = 0;

export default async function HistoryDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const { userId } = await auth();

  if (!userId) {
    redirect("/");
  }

  let session = null;

  try {
    session = await prisma.optimizationSession.findUnique({
      where: { id },
    });
  } catch (error) {
    console.error(error);
    return null;
  }

  if (!session) {
    notFound();
  }

  // Ensure users can only view their own history
  if (session.userId !== userId) {
    redirect("/dashboard/history");
  }

  return (
    <div className="space-y-8">
      <div>
        <Link
          href="/dashboard/history"
          className="inline-flex items-center gap-2 text-zinc-500 hover:text-zinc-900 dark:hover:text-white mb-6 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to History
        </Link>

        <h1 className="text-3xl font-heading font-bold text-zinc-900 dark:text-white">
          Optimization Report: {session.role}
        </h1>

        <p className="text-zinc-600 dark:text-zinc-400 mt-2">
          Generated on {new Date(session.createdAt).toLocaleString()}
        </p>
      </div>

      <div className="w-full" id="app-section">
        <ResultsDisplay results={session.results} />
      </div>
    </div>
  );
}