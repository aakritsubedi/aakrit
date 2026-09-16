import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import type React from "react"; // Import React
import { metadataConfig } from "@/config/metadata";
import {
  buildStructuredData,
  serializeStructuredData,
} from "@/lib/seo/structured-data";
import { Analytics } from '@vercel/analytics/next';

import "./globals.css";
import Script from "next/dist/client/script";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });
const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
});

export const metadata: Metadata = metadataConfig;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/*
          Rendered server-side rather than through next/script so the graph is
          in the initial HTML — an agent that never executes JavaScript still
          sees it.
        */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: serializeStructuredData(buildStructuredData()),
          }}
        />
        <Script
          data-website-id="dfid_XAVv3JFrXQfGX5iHBiZrA"
          data-domain="www.aakritsubedi.com.np"
          src="https://datafa.st/js/script.js"
          strategy="afterInteractive"
        />
      </head>
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} ${inter.className}`}
        suppressHydrationWarning
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <Navigation />
          <main className="flex-1">{children}</main>
          <Footer />
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  );
}
