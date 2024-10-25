import { createClient } from "@supabase/supabase-js";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

import { ThemeProvider } from "@/components/theme-provider";
import "./globals.css";
import { TelemetricProviderClient } from "@/components/TelemetricProviderClient";

const inter = Inter({ subsets: ["latin"] });

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);
export const metadata: Metadata = {
  title: "Telemetric",
  description:
    "Telemetric is a privacy-focused analytics platform for your apps, web apps, and websites. Tired of all the mediocre analytics platforms out there? Telemetric is here to change that.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          <TelemetricProviderClient>{children}</TelemetricProviderClient>
        </ThemeProvider>
      </body>
    </html>
  );
}
