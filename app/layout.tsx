import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import "./globals.css";
import type React from "react"; // Import React
import Script from "next/script";
import { metadataConfig } from "@/config/metadata";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = metadataConfig;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <Script
          id="structured-data"
          type="application/ld+json"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Aakrit Subedi",
              url: "https://aakritsubedi.com.np",
              sameAs: [
                "https://github.com/aakritsubedi",
                "https://twitter.com/SubediAakrit",
              ],
              jobTitle: "Software Engineer",
              image: "https://aakritsubedi.com.np/og-image.png",
            }),
          }}
        />
      </head>
      <body className={inter.className} suppressHydrationWarning>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Navigation />
          <main className="flex-1">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
