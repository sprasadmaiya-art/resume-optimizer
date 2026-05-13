import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import { CSPostHogProvider } from './providers';
import PostHogPageView from './PostHogPageView';
import { Suspense } from 'react';
import { ClerkProvider } from '@clerk/nextjs';

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const outfit = Outfit({ subsets: ["latin"], variable: "--font-outfit" });

export const metadata: Metadata = {
  title: "AI Career Intelligence Platform",
  description: "Optimize your resume and LinkedIn profile with AI. Get instant recruiter feedback, customized interview prep, and deep job matching.",
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
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <body className={`${inter.variable} ${outfit.variable} font-sans min-h-screen bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-50 selection:bg-teal-500/30 transition-colors duration-300`}>
          <CSPostHogProvider>
            <Suspense fallback={null}>
              <PostHogPageView />
            </Suspense>
            {/* Background Gradients */}
            <div className="fixed inset-0 z-[-1] overflow-hidden pointer-events-none bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-teal-50/50 via-white to-white dark:from-teal-900/20 dark:via-zinc-950 dark:to-zinc-950">
              <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-teal-400/10 blur-[120px] dark:bg-teal-500/5" />
              <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-indigo-400/10 blur-[120px] dark:bg-indigo-500/5" />
            </div>
            {children}
          </CSPostHogProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
