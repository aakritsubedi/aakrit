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
    position: "Tech Lead",
    period: "Sept 2021 - Present",
    description: [
      "Lead the engineering team, ensuring efficient development processes, mentorship, and alignment with business goals.",
      "Oversee the entire product development lifecycle, from ideation to deployment, focusing on scalability and performance.",
      "Drive architectural decisions across backend, frontend, and infrastructure to ensure robust, maintainable systems.",
      "Collaborate closely with stakeholders and customers to refine product features and enhance user experience.",
      "Streamline Agile development by facilitating sprint planning, daily stand-ups, and retrospective meetings.",
      "Actively contribute to hands-on development when required, ensuring high-quality code and best practices.",
    ],
    additionalInfo: {
      title: "AI Chat  – Agentic AI Chatbot",
      subtitle: "Sister Company of reAlpha",
      description: [
        "Led the design and development of an AI-powered chatbot, integrating advanced LLM enhancements for improved responses.",
        "Managed the full AI Chat ecosystem – backend, frontend, and infrastructure – to deliver a seamless user experience.",
        "Conducted stakeholder meetings and client demos, ensuring seamless onboarding and adoption of AI Chat.",
        "Played a key role in onboarding new clients and expanding the AI Chat user base.",
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
      "Excelled in application development with minimal supervision, demonstrating increased autonomy in projects.",
      "Engaged in project planning discussions, exploring foundational technologies, and developing scalable applications.",
      "Mentored new team members and trained intern batches on building API systems using Node.js.",
      "Participated in conducting interviews for software engineers and interns.",
    ],
    additionalInfo: {
      title: "Internship Coordinator",
      subtitle: " Data Internship Program",
      description: [
        "Led the internship program by managing mentors and ensuring smooth training sessions.",
        "Interviewed candidates and contributed to the selection process for the internship batch.",
        "Provided mentorship and guidance to interns, helping them develop technical and problem-solving skills.",
        "Oversaw intern performance, offering feedback and support to enhance their learning experience.",
      ],
    },
    techStack: ["Node.js", "React", "Vue", "REST API", "PostgreSQL"],
  },
];

export function Experience() {
  return (
    <section className="p-24 bg-muted/30" id="experience">
      <div className="container px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="space-y-4 mb-12"
        >
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
            👨🏻‍💻 Professional Experience
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
      <Card>
        <CardHeader>
          <CardTitle>
            {experience.position} at {experience.company}
          </CardTitle>
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
                  <span className="text-muted-foreground">
                    {experience.additionalInfo.subtitle}
                  </span>
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
