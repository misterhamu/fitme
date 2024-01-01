import "./globals.scss";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Providers } from "./providers";
import clsx from "clsx";
import Navbar from "./components/Navbar";
import DayThemes from "./components/DayThemes";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "FitMe | Your Fitness Companion",
  description:
    "Tailored workouts, real-time tracking. Your fitness journey, simplified.",
  generator: "Next.js",
  manifest: "/manifest.json",
  keywords: [
    "Fitness",
    "Exercise",
    "Personalized",
    "Tracking",
    "Workouts",
    "Motivation",
  ],
  themeColor: [{ media: "(prefers-color-scheme: dark)", color: "#fff" }],
  authors: [
    { name: "Thitipat Na Nakorn" },
    {
      name: "Thitipat Na Nakorn",
      url: "https://www.linkedin.com/in/thitipat-na-nakorn/",
    },
  ],
  viewport:
    "minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, viewport-fit=cover",
  icons: [
    { rel: "apple-touch-icon", url: "icons/apple-touch-icon.png" },
    { rel: "icon", url: "icons/favicon-32x32.png" },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={clsx("min-h-screen bg antialiased")}>
        <Providers themeProps={{ attribute: "class", defaultTheme: "dark" }}>
          <div className="relative flex flex-col min-h-screen">
            <Navbar />
            <main className="mb-6 relative px-4 mt-4 flex-1">
              <DayThemes />
              {children}
            </main>
            <footer className="w-full flex items-center justify-center pt-12">
              <span className="text-default-600">
                2024 © Powered by misterhamu
              </span>
            </footer>
          </div>
        </Providers>
      </body>
    </html>
  );
}
