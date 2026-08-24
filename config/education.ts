export type AcademicProject = {
  title: string;
  description: string;
  details: string[];
  type: string;
};

export type EducationEntry = {
  title: string;
  instituteName: string;
  year: string;
  logo: string;
  details: string[];
  academicProjects?: AcademicProject[];
};

export const educationInformation: EducationEntry[] = [
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
