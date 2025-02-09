import type { Metadata } from "next";

export const metadataConfig: Metadata = {
  title: "Aakrit Subedi - Software Engineer",
  description:
    "Aakrit Subedi's personal portfolio showcasing projects, blogs, and more. Expertise in full-stack development, team leadership, and indie projects.",
  keywords: [
    "Aakrit Subedi",
    "software engineer",
    "engineering manager",
    "indie project hacker",
    "personal projects",
    "BCTNotes",
    "developer portfolio",
    "full-stack developer",
    "web development",
    "JavaScript",
    "TypeScript",
    "React",
    "Node.js",
    "Naamche",
    "reAlpha",
    "BCTNotes",
  ],
  authors: [{ name: "Aakrit Subedi" }],
  creator: "Aakrit Subedi",
  publisher: "Aakrit Subedi",
  openGraph: {
    title: "Aakrit Subedi - Software Engineer",
    description:
      "Aakrit Subedi's personal portfolio showcasing projects, blogs, and more. Expertise in full-stack development, team leadership, and indie projects.",
    url: "https://aakritsubedi.com.np",
    siteName: "Aakrit Subedi Portfolio",
    images: [
      {
        url: "https://aakritsubedi.com.np/og-image.png",
        width: 1200,
        height: 630,
        alt: "Aakrit Subedi - Software Engineer Portfolio",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Aakrit Subedi - Software Engineer",
    description:
      "Aakrit Subedi's personal portfolio showcasing projects, blogs, and more. Expertise in full-stack development, team leadership, and indie projects.",
    creator: "@SubediAakrit",
    images: ["https://aakritsubedi.com.np/og-image.png"],
  },
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
};
