export const metadata = {
  title: "Blog | Aakrit Subedi",
  description: "Technical articles, tutorials, and thoughts by Aakrit Subedi.",
  robots: "index, follow",
  openGraph: {
    title: "Blog | Aakrit Subedi",
    description:
      "Technical articles, tutorials, and thoughts by Aakrit Subedi.",
    url: "https://aakritsubedi.com.np/blogs",
    images: [
      {
        url: "https://aakritsubedi.com.np/og-image.png",
        width: 1200,
        height: 630,
        alt: "Aakrit Subedi - Software Engineer Portfolio",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Blog | Aakrit Subedi",
    description:
      "Technical articles, tutorials, and thoughts by Aakrit Subedi.",
    creator: "@SubediAakrit",
    images: ["https://aakritsubedi.com.np/og-image.png"],
  },
};
import React from "react";

function BlogPage() {
  return (
    <main className="min-h-[100dvh]">
      <section className="container mx-auto max-w-3xl px-4 py-10 pb-20">
        <div className="flex gap-4 flex-col">
          <span className="text-7xl">✍️</span>
          <h1 className="text-3xl font-semibold tracking-tight">Blog</h1>
        </div>
      </section>
    </main>
  );
}

export default BlogPage;
