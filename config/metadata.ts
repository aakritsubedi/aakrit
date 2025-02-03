import type { Metadata } from "next";

export const metadataConfig: Metadata = {
  // Basic metadata
  title: "Aakrit Subedi - Software Engineer",
  description:
    "Forward-thinking software engineer with expertise in full-stack development and team leadership",
  icons: "/favicon.ico",
  // Standard metadata tags
  keywords: [
    "software engineer",
    "full-stack developer",
    "team leader",
    "web development",
    "JavaScript",
    "TypeScript",
    "React",
    "Node.js",
    "Naamche",
    "reAlpha",
    "Leapfrog Technology",
    "engineering manager",
    "AI Chat",
    "BCTNotes",
    "Aakrit Subedi",
    "Aakrit",
    "Aakrit Note",
    "Aakrit Subedi Note",
    "Aakrit Subedi Portfolio",
  ],
  authors: [{ name: "Aakrit Subedi" }],
  creator: "Aakrit Subedi",
  publisher: "Aakrit Subedi",

  // Robots directives
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  // Open Graph metadata
  openGraph: {
    title: "Aakrit Subedi - Software Engineer",
    description:
      "Forward-thinking software engineer with expertise in full-stack development and team leadership",
    url: "https://aakritsubedi.com.np",
    siteName: "Aakrit Subedi Portfolio",
    images: [
      {
        url: "https://your-domain.com/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Aakrit Subedi - Software Engineer Portfolio",
      },
    ],
    locale: "en_US",
    type: "website",
  },

  // Twitter metadata
  twitter: {
    card: "summary_large_image",
    title: "Aakrit Subedi - Software Engineer",
    description:
      "Forward-thinking software engineer with expertise in full-stack development and team leadership",
    images: ["https://aakritsubedi9.com.np/twitter-image.jpg"],
    creator: "@SubediAakrit",
  },

  // Verification tokens
  //   TODO: Replace the placeholder values with your actual verification tokens
  verification: {
    google: "your-google-site-verification",
    yandex: "your-yandex-verification",
    // other search engine verifications as needed
  },

  // Theme color
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0f172a" },
  ],

  // Viewport
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
  },
};
