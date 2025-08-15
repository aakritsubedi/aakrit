export const metadata = {
  title: "Work Experience | Aakrit Subedi",
  description:
    "Professional experience, roles, and achievements of Aakrit Subedi as a software engineer and manager.",
  robots: "index, follow",
  openGraph: {
    title: "Work Experience | Aakrit Subedi",
    description:
      "Professional experience, roles, and achievements of Aakrit Subedi as a software engineer and manager.",
    url: "https://aakritsubedi.com.np/work",
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
    title: "Work Experience | Aakrit Subedi",
    description:
      "Professional experience, roles, and achievements of Aakrit Subedi as a software engineer and manager.",
    creator: "@SubediAakrit",
    images: ["https://aakritsubedi.com.np/og-image.png"],
  },
};
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import React from "react";

function WorkPage() {
  return (
    <main className="min-h-[100dvh]">
      <section className="container mx-auto max-w-3xl px-4 py-10 pb-20">
        <div className="flex gap-4 flex-col">
          <span className="text-7xl">💼</span>
          <h1 className="text-3xl font-semibold tracking-tight">
            Work Experience
          </h1>
          <p className="text-muted-foreground">
            After completing my undergraduate studies, I began my career as a
            Software Engineer at Leapfrog Technology, where I spent over two
            years building ed-tech and health-tech web and mobile applications.
          </p>
          <p className="text-muted-foreground">
            I then joined Naamche Inc., as software engineer. Initially, I
            helped build some of the products for reAlpha. I currently work as a
            Engineering Manager, guiding teams and overseeing the development of
            multiple client and internal projects and also involved on active
            development across the multiple products.
          </p>
          <p className="text-muted-foreground">
            Alongside my professional roles, I actively work on personal
            projects and occasionally take on freelance work for both national
            and international clients, allowing me to explore new technologies
            and deliver impactful solutions across diverse domains.
          </p>
        </div>

        {/* Jod Description */}
        <section aria-labelledby="experience-heading" className="space-y-12">
          <h2 id="experience-heading" className="sr-only">
            Experience
          </h2>

          {/* Engineering Manager */}
          <article aria-labelledby="em-title" className="space-y-6">
            <p id="em-title" className="text-xl text-muted-foreground">
              Engineering Manager, 2023 - Present
            </p>

            <div className="space-y-4">
              {/* Naamche Inc */}
              <div className="space-y-2">
                <div className="flex items-center gap-3">
                  <Avatar className="h-8 w-8 rounded-md">
                    <AvatarImage
                      src="/work/naamche.png"
                      alt="Naamche Inc. logo"
                    />
                  </Avatar>
                  <h3 className="text-lg font-semibold">
                    Naamche Inc.{" "}
                    <span className="font-normal text-muted-foreground">
                      (acquired by reAlpha)
                    </span>
                  </h3>
                </div>
                <ul className="list-disc pl-7 text-muted-foreground space-y-1.5 leading-relaxed">
                  {[
                    "Lead and actively contribute to engineering efforts, balancing strategic direction with hands-on coding across backend, frontend, and infrastructure",
                    "Manage the full product lifecycle — from initial setup and deployment to continuous iteration based on client and end-user feedback",
                    "Architect scalable, high-performance systems while mentoring team members to elevate technical standards",
                    "Collaborate closely with stakeholders to refine requirements and deliver impactful, user-centric features",
                    "Enhance Agile workflows through effective sprint planning, stand-ups, and retrospectives to maximize team productivity",
                    "Uphold rigorous code quality, best practices, and performance benchmarks through personal contributions and peer reviews",
                  ].map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </div>

              {/* AiChat Pte Ltd. */}
              <div className="space-y-2">
                <div className="flex items-center gap-3">
                  <Avatar className="h-8 w-8 rounded-md">
                    <AvatarImage src="/work/aichat.png" alt="AiChat logo" />
                  </Avatar>
                  <h3 className="text-lg font-semibold">
                    AiChat Pte Ltd.{" "}
                    <span className="font-normal text-muted-foreground">
                      (acquired by reAlpha)
                    </span>
                  </h3>
                </div>
                <ul className="list-disc pl-7 text-muted-foreground space-y-1.5 leading-relaxed">
                  {[
                    "Lead a cross-country team — tech (Nepal & Indonesia) and sales/product (Singapore) — balancing technical feasibility with product requirements",
                    "Design, develop, and ship full-stack features for the AI-powered chatbot, integrating advanced LLM capabilities for enhanced performance",
                    "Oversee the entire AI Chat ecosystem, from infrastructure and architecture to user experience, ensuring reliability and scalability",
                    "Contribute directly to codebases, maintaining high standards of quality, performance, and security while mentoring team members",
                    "Drive user growth through feature improvements, onboarding flows, and seamless integrations with platforms like WhatsApp, Facebook Messenger, and Instagram",
                  ].map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>
          </article>

          {/* Software Engineer */}
          <article aria-labelledby="se-title" className="space-y-6">
            <p id="se-title" className="text-xl text-muted-foreground">
              Software Engineer, 2021 - 2023
            </p>

            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <Avatar className="h-8 w-8 rounded-md">
                  <AvatarImage
                    src="/work/lf-logo.png"
                    alt="Leapfrog Technology logo"
                  />
                </Avatar>
                <h3 className="text-lg font-semibold">Leapfrog Technology</h3>
              </div>
              <ul className="list-disc pl-7 text-muted-foreground space-y-1.5 leading-relaxed">
                {[
                  "Designed and developed scalable Ed-tech and Health-tech applications",
                  "Participated in project planning, and core implementation using foundational web and backend technologies",
                  "Mentored new team members and interns in backend API development with Node.js, fostering best practices and code quality",
                  "Played a key role in recruitment by interviewing software engineers and interns to build high-performing teams",
                  "Served as Internship Coordinator for Leapfrog’s first Data Internship Batch, guiding curriculum and hands-on projects",
                ].map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>
          </article>

          {/* Freelance Engineer */}
          <article aria-labelledby="fe-title" className="space-y-6">
            <p id="fe-title" className="text-xl text-muted-foreground">
              Freelance Engineer
            </p>

            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <Avatar className="h-8 w-8 rounded-md">
                  <AvatarImage
                    src="/work/wealthtech.png"
                    alt="WealthTech logo"
                  />
                </Avatar>
                <h3 className="text-lg font-semibold">WealthTech</h3>
              </div>
              <ul className="list-disc pl-7 text-muted-foreground space-y-1.5 leading-relaxed">
                {[
                  "Delivered multiple wealth-tech client projects, building high-quality web and mobile solutions tailored to financial services needs",
                  "Involved directly with the founder to conduct market and technical research, developing proof-of-concepts (POCs) that helped secure new clients",
                  "Designed and implemented an internal employee management system, streamlining operations and improving team productivity",
                ].map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>
          </article>
        </section>

        {/* Floating Button */}
        <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 ">
          <Button
            variant="ghost"
            className="bg-gray-100 text-gray-600 px-4 py-3 rounded-full shadow-2xl border border-gray-300"
          >
            View Resume
          </Button>
        </div>
      </section>
    </main>
  );
}

export default WorkPage;
