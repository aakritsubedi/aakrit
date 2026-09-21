import type { Metadata } from "next";

import { absoluteUrl, person, siteUrl } from "@/config/site";
import { alternatesFor } from "@/lib/seo/metadata";

export const metadataConfig: Metadata = {
  metadataBase: new URL(siteUrl),
  alternates: alternatesFor("/"),
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
    url: absoluteUrl("/"),
    siteName: "Aakrit Subedi Portfolio",
    images: [
      {
        url: person.image,
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
    images: [person.image],
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
