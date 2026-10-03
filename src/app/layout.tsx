import type { Metadata } from "next";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "CreatorAI — AI-Powered Creator Operating Platform",
  description: "Turn one long-form video or audio asset into high-potential short clips, platform-tailored scripts, captions, and an intelligent scheduled publishing pipeline.",
  keywords: ["CreatorAI", "AI Video Repurposing", "Content Operating System", "Shorts Generator", "Reels", "TikTok", "AI Captions"],
  authors: [{ name: "CreatorAI Team" }],
  viewport: "width=device-width, initial-scale=1, maximum-scale=1",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${jakarta.variable} antialiased light`}>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body className="bg-[#FAFAF7] text-[#17172A] selection:bg-[#635BFF]/15 selection:text-[#635BFF] min-h-screen">
        {children}
      </body>
    </html>
  );
}
