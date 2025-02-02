"use client";

import { motion } from "framer-motion";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

const projects = [
  {
    title: "BCTNotes",
    description: "Resource sharing platform for Computer Engineering students",
    tags: ["Next.js", "Node.js", "LLM AI"],
    link: "https://www.aakritsubedi9.com.np",
  },
  {
    title: "Plan OS",
    description: "Open-source project management and planning system",
    tags: ["TypeScript", "Next.js", "Tailwind"],
    link: "https://plan-os.space/",
  },
  {
    title: "NEPSE AI",
    description: "AI-powered Nepal Stock Exchange analysis automation bot",
    tags: ["Nodejs", "Airflow", "Postgres"],
    link: "https://instagram.com/nepse.ai",
  },
];

export function Projects() {
  return (
    <section className="p-24 bg-muted/50" id="projects">
      <div className="container px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="space-y-4 mb-12"
        >
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
            🗂️ Indie Projects
          </h2>
          <p className="max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
            Personal projects I work on during weekends to explore new
            technologies and solve real problems.
          </p>
        </motion.div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Link href={project.link}>
                <Card
                  className="h-full cursor-pointer"
                  onClick={() => window.open(project.link)}
                >
                  <CardHeader>
                    <CardTitle>{project.title}</CardTitle>
                    <CardDescription>{project.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {project.tags.map((tag) => (
                        <Badge key={tag} variant="secondary">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
