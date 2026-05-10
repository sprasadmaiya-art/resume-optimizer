import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { CSPostHogProvider } from './providers';
import PostHogPageView from './PostHogPageView';
import { Suspense } from 'react';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "AI Resume & LinkedIn Optimizer",
  description: "Optimize your resume and LinkedIn profile with AI.",
  verification: {
    google: "n1vEJ5TDbUtkniHrf6BBba-FUsNhrQ_lfxKAHiwalcQ",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <CSPostHogProvider>
        <body className={`${inter.className} min-h-screen bg-zinc-50 text-zinc-900 selection:bg-teal-500/30`}>
          <Suspense fallback={null}>
            <PostHogPageView />
          </Suspense>
          {/* Background Gradients */}
          <div className="fixed inset-0 z-[-1] overflow-hidden pointer-events-none bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-teal-50/50 via-white to-white">
            <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-teal-400/10 blur-[120px]" />
            <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-indigo-400/10 blur-[120px]" />
          </div>
          {children}
        </body>
      </CSPostHogProvider>
    </html>
  );
}
