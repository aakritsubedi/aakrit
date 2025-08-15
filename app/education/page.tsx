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
import { Avatar, AvatarImage } from "@/components/ui/avatar";
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
      <section className="container mx-auto max-w-3xl px-4 py-10 pb-20">
        <div className="flex gap-4 flex-col">
          <span className="text-7xl">🎓</span>
          <h1 className="text-3xl font-semibold tracking-tight">Education</h1>
        </div>
        <section aria-labelledby="education-heading" className="space-y-12">
          <h2 id="education-heading" className="sr-only">
            Education
          </h2>

          {educationInformation.map((education, index) => (
            <article
              key={index}
              aria-labelledby={`education-${index}`}
              className="space-y-6"
            >
              <div className="flex flex-col-reverse md:flex-row gap-2 md:justify-between md:items-center">
                <p
                  id={`education-${index}`}
                  className="text-lg md:text-xl text-muted-foreground"
                >
                  {education.title}
                </p>
                <span>
                  <time className="text-sm text-muted-foreground">
                    {education.year}
                  </time>
                </span>
              </div>

              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-3">
                  <Avatar className="h-8 w-8 rounded-md">
                    <AvatarImage
                      src={education.logo}
                      alt={`${education.instituteName} logo`}
                    />
                  </Avatar>
                  <h3 className="md:text-lg font-semibold">
                    {education.instituteName}
                  </h3>
                </div>

                <ul className="list-disc  text-muted-foreground space-y-1.5 pl-6 leading-relaxed">
                  {education.details.map((detail, index) => (
                    <li key={index}>{detail}</li>
                  ))}
                </ul>

                <div className="flex flex-col gap-1">
                  {education.academicProjects && (
                    <p className="text-gray-500 text-lg">Academic Projects</p>
                  )}
                  <Accordion
                    type="single"
                    collapsible
                    className="w-full"
                    defaultValue="item-0"
                  >
                    {education.academicProjects?.map((project, index) => (
                      <AccordionItem
                        value={`item-${index}`}
                        key={index}
                        className=""
                      >
                        <AccordionTrigger className="font-semibold">
                          {project.title}
                        </AccordionTrigger>
                        <AccordionContent className="space-y-4">
                          <p className="text-muted-foreground">
                            {project.description}
                          </p>
                          <ul className="list-disc text-muted-foreground space-y-1 pl-6 text-sm">
                            {project.details.map((detail, index) => (
                              <li key={index}>{detail}</li>
                            ))}
                          </ul>
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </div>
              </div>
            </article>
          ))}
        </section>
      </section>
    </main>
  );
}

export default EducationPage;
