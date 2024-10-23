import { TelemetricProvider } from "@offuntitledapps/telemetric";
import { createClient } from "@supabase/supabase-js";
import { SpeedInsights } from "@vercel/speed-insights/next";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

import { ThemeProvider } from "@/components/theme-provider";
import "./globals.css";

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
      <body className={inter.className} style={{ margin: "0px" }}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <TelemetricProvider
            projectId="your-project-id"
            version="1.0.0"
            trackOnLocalhost={true}
          >
            {children}
          </TelemetricProvider>
        </ThemeProvider>

        <SpeedInsights />
      </body>
    </html>
  );
}
