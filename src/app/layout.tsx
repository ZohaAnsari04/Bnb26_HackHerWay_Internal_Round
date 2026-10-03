import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import { AppProvider } from "@/context/AppContext";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "CreatorAI — AI-Powered Creator Operating Platform",
  description: "Turn one long-form video or audio asset into high-potential short clips, platform-tailored scripts, captions, and an intelligent scheduled publishing pipeline.",
  keywords: ["CreatorAI", "AI Video Repurposing", "Content Operating System", "Shorts Generator", "Reels", "TikTok", "AI Captions"],
  authors: [{ name: "CreatorAI Team" }],
  icons: {
    icon: [
      { url: '/logo-icon.png', type: 'image/png' },
      { url: '/favicon.ico', sizes: 'any' }
    ],
    shortcut: '/logo-icon.png',
    apple: '/logo-icon.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${montserrat.variable} antialiased light`}>
      <head>
        <link rel="icon" type="image/png" href="/logo-icon.png" />
        <link rel="shortcut icon" type="image/png" href="/logo-icon.png" />
        <link rel="apple-touch-icon" href="/logo-icon.png" />
      </head>
      <body className="bg-[#FAFAF7] text-[#17172A] selection:bg-[#635BFF]/15 selection:text-[#635BFF] min-h-screen relative overflow-x-hidden">
        <AppProvider>
          {children}
        </AppProvider>
      </body>
    </html>
  );
}

