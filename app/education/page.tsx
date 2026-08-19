export const metadata = {
  title: "Education | Aakrit Subedi",
  description: "Academic background, degrees, and projects of Aakrit Subedi.",
  robots: "index, follow",
  openGraph: {
    title: "Education | Aakrit Subedi",
    description: "Academic background, degrees, and projects of Aakrit Subedi.",
    url: "https://aakritsubedi.com.np/education",
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
    title: "Education | Aakrit Subedi",
    description: "Academic background, degrees, and projects of Aakrit Subedi.",
    creator: "@SubediAakrit",
    images: ["https://aakritsubedi.com.np/og-image.png"],
  },
};
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { AccordionContent } from "@radix-ui/react-accordion";
import React from "react";

function EducationPage() {
  const educationInformation = [
    {
      title: "Bachelor in Computer Engineering",
      instituteName: "Kantipur Engineering College, Tribhuvan University",
      year: "2015 - 2019",
      logo: "/education/kec.png",
      details: [
        "Awarded with full scholarship",
        "Winner of Best Software Award in LITE 2018",
        "Member of Computer club",
        "Won multiple intra college software competitions",
      ],
      academicProjects: [
        {
          title: "Derm Meds",
          description:
            "Derm Meds is a web-based application designed with an engaging and interactive user interface that is based on an AI model to predict the stages of skin cancer. At its core, the system utilizes machine learning algorithms and Convolutional Neural Networks (CNN), to analyze skin images and accurately determine the potential phase of cancer.",
          details: [
            "Oversaw the development of a successful prediction model for the study and selection of Convolutional Neural Networks (CNN) for image-based skin cancer detection.",
            "Carried out several trials to optimize the CNN model's stage prediction accuracy.",
            "Involvement in the curation of datasets and selected high-quality photos that were essential for training the model and also consulted with doctors and the research team in DISHARC for real datasets and testing accuracy of the model",
            "Contributed to project documentation that covered the development of the Flask API and the use of machine learning methods.",
          ],
          type: "Major Project",
        },
        {
          title: "Easy Election",
          description:
            "Easy Election is a user-friendly web application designed to simplify the election process for both voters and administrators. The platform streamlines voter registration, ballot casting, and result tabulation, ensuring a transparent and efficient electoral experience. All votes and user identities were encrypted to guarantee privacy and security throughout the election process. Vote was confirmed by the fingerprint confirmation that was stored during the registration process.",
          details: [
            "Led the development of a secure voter registration system that verifies user identities and prevents fraud.",
            "Implemented a real-time voting interface that allows users to cast their votes easily and securely.",
            "All votes and user identities were encrypted to ensure privacy and data protection.",
            "Vote was confirmed by the fingerprint confirmation that was stored during the registration process.",
            "Developed an admin dashboard for monitoring the election process and viewing real-time results.",
            "Collaborated with a team of designers to create an intuitive user interface that enhances the user experience.",
          ],
          type: "Minor Project",
        },
      ],
    },
    {
      title: "+2 Science",
      instituteName: "National School of Science, NIST",
      year: "2013 - 2014",
      logo: "/education/nist.png",
      details: ["Awarded with academic based partial scholarship"],
    },
    {
      title: "School Leaving Certificate",
      instituteName: "Paragon Public School",
      year: "2012",
      logo: "/education/paragon.png",
      details: ["Completed SLC with Distinction."],
    },
  ];
  return (
    <main className="min-h-[100dvh]">
      <section className="container mx-auto max-w-3xl px-4 py-14 pb-24 sm:px-6">
        <div className="flex gap-4 flex-col">
          {/* <span className="text-7xl">🎓</span> */}
          <h1 className="text-3xl font-semibold tracking-tight">Education</h1>
        </div>

        {/* Sheet header — ties the page to the rest of the site */}
        <div className="mt-6 flex items-baseline justify-between border-b border-foreground/15 pb-2 font-mono text-[11px] text-muted-foreground">
          <span className="text-foreground">academic record</span>
          <span>2012 — 2019</span>
        </div>

        <section aria-labelledby="education-heading" className="mt-12">
          <h2 id="education-heading" className="sr-only">
            Education
          </h2>

          {educationInformation.map((education, index) => (
            <article
              key={index}
              aria-labelledby={`education-${index}`}
              className="grid gap-y-3 sm:grid-cols-[7.5rem_1fr] sm:gap-x-8"
            >
              {/* Date rail */}
              <time className="font-mono text-xs leading-relaxed text-muted-foreground sm:pt-1">
                {education.year}
              </time>

              <div className="relative border-foreground/15 pb-14 sm:border-l sm:pl-8">
                <span
                  aria-hidden
                  className="absolute -left-[3.5px] top-2 hidden h-1.5 w-1.5 rounded-full bg-foreground sm:block"
                />

                <h3
                  id={`education-${index}`}
                  className="text-lg font-semibold tracking-tight"
                >
                  {education.title}
                </h3>

                <div className="mt-4 flex items-center gap-3">
                  <Avatar className="h-7 w-7 rounded-md">
                    <AvatarImage
                      src={education.logo}
                      alt={`${education.instituteName} logo`}
                    />
                    <AvatarFallback className="rounded-md text-[10px]">
                      {education.instituteName.slice(0, 2).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <p className="font-medium">{education.instituteName}</p>
                </div>

                <ul className="mt-4 space-y-2 font-light leading-relaxed text-muted-foreground">
                  {education.details.map((detail, i) => (
                    <li key={i} className="flex gap-3 text-sm">
                      <span
                        aria-hidden
                        className="mt-[0.75em] h-px w-3 shrink-0 bg-foreground/25"
                      />
                      <span>{detail}</span>
                    </li>
                  ))}
                </ul>

                {education.academicProjects && (
                  <div className="mt-8">
                    <p className="mb-1 border-b border-foreground/15 pb-2 font-mono text-[11px] text-foreground">
                      academic projects
                    </p>
                    <Accordion
                      type="single"
                      collapsible
                      className="w-full"
                      // defaultValue="item-0"
                    >
                      {education.academicProjects.map((project, i) => (
                        <AccordionItem value={`item-${i}`} key={i} className="text-sm">
                          <AccordionTrigger className="py-3 hover:no-underline">
                            <span className="flex flex-wrap items-baseline gap-x-3 gap-y-1 text-left">
                              <span className="font-medium">
                                {project.title}
                              </span>
                              <span className="font-mono text-[10px] font-normal text-muted-foreground/70">
                                {project.type}
                              </span>
                            </span>
                          </AccordionTrigger>
                          <AccordionContent className="space-y-3 pb-5">
                            <p className="font-light leading-relaxed text-muted-foreground">
                              {project.description}
                            </p>
                            <ul className="space-y-2 text-sm font-light leading-relaxed text-muted-foreground">
                              {project.details.map((detail, j) => (
                                <li key={j} className="flex gap-3">
                                  <span
                                    aria-hidden
                                    className="mt-[0.75em] h-px w-3 shrink-0 bg-foreground/25"
                                  />
                                  <span>{detail}</span>
                                </li>
                              ))}
                            </ul>
                          </AccordionContent>
                        </AccordionItem>
                      ))}
                    </Accordion>
                  </div>
                )}
              </div>
            </article>
          ))}
        </section>
      </section>
    </main>
  );
}

export default EducationPage;
