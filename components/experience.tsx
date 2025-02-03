"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronUp } from "lucide-react";

const experiences = [
  {
    company: "Naamche Inc",
    position: "Engineering Manager",
    period: "Sept 2021 - Present",
    description: [
      "Lead the engineering team, ensuring efficient development, mentorship, and business alignment",
      "Oversee product lifecycle from ideation to deployment, prioritizing scalability and performance",
      "Drive architectural decisions for backend, frontend, and infrastructure to build robust systems",
      "Collaborate with stakeholders to refine features and enhance user experience",
      "Optimize Agile workflows through sprint planning, stand-ups, and retrospectives",
      "Contribute hands-on to development, maintaining high code quality and best practices",
    ],
    additionalInfo: {
      title: "AI Chat  – Agentic AI Chatbot",
      subtitle: "Sister Company of reAlpha",
      description: [
        "Designed and developed an AI-powered chatbot with advanced LLM enhancements",
        "Managed the full AI Chat ecosystem, ensuring a seamless user experience",
        "Led stakeholder meetings and client demos for smooth onboarding and adoption",
        "Played a key role in expanding the AI Chat user base",
      ],
    },
    techStack: [
      "Node.js",
      "React",
      "TypeScript",
      "GraphQL",
      "Python",
      "Docker",
      "PostgreSQL",
      "AWS",
    ],
  },
  {
    company: "Leapfrog Technology",
    position: "Software Engineer II",
    period: "Oct 2019 - March 2022",
    description: [
      "Developed applications independently, showcasing strong autonomy",
      "Led project planning and built scalable applications with foundational technologies",
      "Mentored new team members and interns in API development with Node.js",
      "Assisted in interviewing software engineers and interns",
    ],
    additionalInfo: {
      title: "Internship Coordinator",
      subtitle: " Data Internship Program",
      description: [
        "Led the internship program, managing mentors and training sessions",
        "Interviewed and selected candidates for the internship batch",
        "Mentored interns, fostering technical and problem-solving skills",
        "Monitored performance, providing feedback for growth",
      ],
    },
    techStack: ["Node.js", "React", "Vue", "REST API", "PostgreSQL"],
  },
];

export function Experience() {
  return (
    <section className="py-16 md:p-24 bg-muted/30" id="experience">
      <div className="container px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="space-y-4 mb-12"
        >
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
            👨🏻‍💻 Experience
          </h2>
          <p className="max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
            My journey in software development and team leadership.
          </p>
        </motion.div>
        <div className="space-y-8">
          {experiences.map((exp, index) => (
            <ExperienceCard key={exp.company} experience={exp} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ExperienceCard({
  experience,
  index,
}: {
  experience: (typeof experiences)[0];
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
    >
      <Card className="border-none">
        <CardHeader>
          <CardTitle>{experience.position}</CardTitle>
          <CardDescription>{experience.company}</CardDescription>
          <CardDescription>{experience.period}</CardDescription>
        </CardHeader>
        <CardContent>
          <ul className="list-disc pl-5 space-y-2 mb-4">
            {experience.description.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
          <div className="flex flex-wrap gap-2 mb-4">
            {experience.techStack.map((tech) => (
              <Badge key={tech} variant="secondary">
                {tech}
              </Badge>
            ))}
          </div>
          <AnimatePresence>
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Card className="mt-4 border-none px-0">
                <CardHeader>
                  <CardTitle className="text-lg">
                    {experience.additionalInfo.title}
                  </CardTitle>
                  <CardDescription className="text-muted-foreground">
                    {experience.additionalInfo.subtitle}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="list-disc pl-5 space-y-2">
                    {experience.additionalInfo.description.map((item, i) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </motion.div>
          </AnimatePresence>
        </CardContent>
      </Card>
    </motion.div>
  );
}
