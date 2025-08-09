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
            years building and maintaining high-quality web and mobile
            applications. I then joined Naamche Inc., a product lab helping
            startups bring their ideas to life, where I currently work as a
            Engineering Manager, guiding teams and overseeing the development of
            multiple internal and client projects and also involved on active
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
                  <li>
                    Lead the engineering team, ensuring efficient development,
                    mentorship, and business alignment
                  </li>
                  <li>
                    Oversee product lifecycle from ideation to deployment,
                    prioritizing scalability and performance
                  </li>
                  <li>
                    Drive architectural decisions for backend, frontend, and
                    infrastructure to build robust systems
                  </li>
                  <li>
                    Collaborate with stakeholders to refine features and enhance
                    user experience
                  </li>
                  <li>
                    Optimize Agile workflows through sprint planning, stand-ups,
                    and retrospectives
                  </li>
                  <li>
                    Contribute hands-on to development, maintaining high code
                    quality and best practices
                  </li>
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
                  <li>
                    Designed and developed an AI-powered chatbot with advanced
                    LLM enhancements
                  </li>
                  <li>
                    Managed the full AI Chat ecosystem, ensuring a seamless user
                    experience
                  </li>
                  <li>
                    Led stakeholder meetings and client demos for smooth
                    onboarding and adoption
                  </li>
                  <li>Played a key role in expanding the AI Chat user base</li>
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
                <li>
                  Developed applications independently, showcasing strong
                  autonomy
                </li>
                <li>
                  Led project planning and built scalable applications with
                  foundational technologies
                </li>
                <li>
                  Mentored new team members and interns in API development with
                  Node.js
                </li>
                <li>Assisted in interviewing software engineers and interns</li>
                <li>
                  Internship Coordinator for the first Data Internship Batch
                </li>
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
                <li>
                  Worked on multiple client projects, delivering high-quality
                  web and mobile solutions.
                </li>
                <li>
                  Assisted the founder directly with initial research and
                  developed proof-of-concepts (POCs) to acquire new clients.
                </li>
                <li>
                  Built an internal employee management tool to streamline
                  company operations.
                </li>
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
