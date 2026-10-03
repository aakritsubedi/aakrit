import cvData from "./cv-data.json";

/**
 * Resume content shared by the human-readable `/cv.md` representation and the
 * PDF generator. Keeping the copy in JSON lets the print artifact consume the
 * same facts as the site instead of maintaining a second, drifting resume.
 */

export type CvRole = {
  company: string;
  note?: string;
  title: string;
  period?: string;
  location?: string;
  context?: string;
  bullets: string[];
};

export type CvProject = {
  slug: string;
  name: string;
  link?: string;
  description: string;
  stack?: string;
};

export type CvSkillGroup = {
  label: string;
  items: string[];
};

export type CvEducationEntry = {
  qualification: string;
  institution: string;
  period: string;
  details: string[];
};

export const cvHeadline: string = cvData.headline;
export const cvSummary: string = cvData.summary;
export const cvRoles: CvRole[] = cvData.roles;
export const cvProjects: CvProject[] = cvData.projects;
export const cvSkills: CvSkillGroup[] = cvData.skills;
export const cvEducation: CvEducationEntry[] = cvData.education;
export const cvAwards: string[] = cvData.awards;
