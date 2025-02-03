"use client";

import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { GraduationCap } from "lucide-react";

const educationData = [
  {
    degree: "Bachelor in Computer Engineering",
    institution: "Kantipur Engineering College, Tribhuvan University",
    period: "2015 - 2019",
    description: "",
    details: [
      "Awarded with full scholarship",
      "Winner of Best Software Award in LITE 2018",
      "Member of Computer club",
    ],
  },
  {
    degree: "Higher Secondary Education",
    institution: "National School of Science, NIST",
    period: "2013 - 2014",
    description: "",
    details: ["Awarded with academic based partial scholarship"],
  },
];

export function Education() {
  return (
    <section className="py-16 md:p-24" id="education">
      <div className="container px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="space-y-4  mb-12"
        >
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
            🎓 Education
          </h2>
          <p className="max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
            My academic journey and achievements.
          </p>
        </motion.div>
        <div className="space-y-8">
          {educationData.map((edu, index) => (
            <motion.div
              key={edu.degree}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <GraduationCap className="h-6 w-6" />
                    {edu.degree}
                  </CardTitle>
                  <p className="text-sm text-muted-foreground">
                    {edu.institution}
                  </p>
                  <p className="text-sm text-muted-foreground">{edu.period}</p>
                </CardHeader>
                {edu.details.length > 0 && (
                  <CardContent>
                    <ul className="list-disc pl-5 space-y-2">
                      {edu.details.map((detail, i) => (
                        <li key={i}>{detail}</li>
                      ))}
                    </ul>
                  </CardContent>
                )}
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
