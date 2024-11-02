import { createClient } from "@supabase/supabase-js";
import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";

import { HelpButton } from "@/components/app/helpbutton";
import { TelemetricProviderClient } from "@/components/TelemetricProviderClient";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import "./globals.css";
import { UserProvider } from "@/components/providers/UserProvider";

const inter = Inter({ subsets: ["latin"] });

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);
export const metadata: Metadata = {
  title: "Telemetric",
  description:
    "Privacy-focused analytics platform for your apps, websites and web apps. Open source and built with You.",
  manifest: "/manifest.ts",

  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Telemetric",
  },
  formatDetection: {
    telephone: false,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider attribute="class" enableSystem>
          <UserProvider>
            <TelemetricProviderClient>{children}</TelemetricProviderClient>
            <HelpButton />
          </UserProvider>
        </ThemeProvider>
        <Toaster expand={true} />
      </body>
    </html>
  );
}
