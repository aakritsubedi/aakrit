import { describe, expect, it } from "vitest";

import {
  cvAwards,
  cvEducation,
  cvHeadline,
  cvProjects,
  cvRoles,
  cvSkills,
  cvSummary,
} from "@/config/cv";
import { projects } from "@/config/projects";
import { person } from "@/config/site";
import { getMarkdownDocument } from "@/lib/content/markdown";
import resumeSpec from "@/output/spec/resume-spec.json";

describe("cv content", () => {
  it("leads with a summary that states scope rather than adjectives", () => {
    expect(cvSummary.length).toBeGreaterThan(200);
    expect(cvHeadline).toContain("Engineering Manager");

    // The previous PDF opened with template filler. These phrases are the
    // tell — if any of them reappear, the summary has regressed to boilerplate.
    for (const filler of [
      "Proud team player",
      "Forward-thinking",
      "Eager to deepen",
      "passionate",
    ]) {
      expect(cvSummary.toLowerCase()).not.toContain(filler.toLowerCase());
    }
  });

  /**
   * The phone number was removed from the résumé on purpose. This asserts it
   * cannot creep back in through any CV field.
   */
  it("publishes no phone number anywhere", () => {
    const serialized = JSON.stringify({
      cvSummary,
      cvRoles,
      cvProjects,
      cvSkills,
      cvEducation,
      cvAwards,
    });

    expect(person.telephone).toBeUndefined();
    expect(serialized).not.toMatch(/\+?977[-\s]?\d/);
    expect(serialized).not.toMatch(/\b98\d{8}\b/);
  });

  it("gives every role enough evidence and dates the formal positions", () => {
    expect(cvRoles.length).toBeGreaterThanOrEqual(3);
    for (const role of cvRoles) {
      expect(role.company).toBeTruthy();
      expect(role.title).toBeTruthy();
      if (role.period) expect(role.period).toMatch(/\d{4}|ongoing|present/i);
      expect(role.bullets.length).toBeGreaterThanOrEqual(2);
    }
  });

  it("covers the companies the work page lists", () => {
    const companies = JSON.stringify(cvRoles);
    for (const expected of ["reAlpha", "Naamche", "AiChat", "Leapfrog"]) {
      expect(companies).toContain(expected);
    }
  });

  /**
   * Reverse-chronological means ordered by when a role *ended*, not when it
   * started: Naamche (2021–2026) correctly outranks AiChat (2022–2024) despite
   * starting earlier. Ties break on the later start year.
  */
  it("orders roles reverse-chronologically by end date", () => {
    const bounds = cvRoles.flatMap((role) => {
      const years = role.period?.match(/\d{4}/g)?.map(Number);
      if (!years?.length) return [];
      const start = years[0];
      const end = /present|ongoing/i.test(role.period!) ? Infinity : (years[1] ?? start);
      return [{ start, end }];
    });

    // The undated "Ongoing" entry sits last by choice because it is concurrent
    // with the salaried roles, so only numeric employment ranges are ordered.
    const salaried = bounds.filter((bound) => Number.isFinite(bound.end));

    for (let i = 1; i < salaried.length; i += 1) {
      const previous = salaried[i - 1];
      const current = salaried[i];

      expect(previous.end).toBeGreaterThanOrEqual(current.end);
      if (previous.end === current.end) {
        expect(previous.start).toBeGreaterThanOrEqual(current.start);
      }
    }
  });

  it("only lists projects that exist in the projects config", () => {
    const known = new Set(projects.map((project) => project.slug));
    for (const project of cvProjects) {
      expect(known.has(project.slug)).toBe(true);
    }
  });

  /**
   * The CV shortens display names ("Obol: AI credit tracker" → "Obol"), so the
   * link is the one field that must survive verbatim — a wrong URL on a résumé
   * is worse than an omitted one.
   */
  it("links each project to the URL the projects config publishes", () => {
    const bySlug = new Map(projects.map((project) => [project.slug, project]));

    for (const entry of cvProjects) {
      if (!entry.link) continue;
      const canonical = bySlug.get(entry.slug)?.link;
      expect(canonical).toBeDefined();
      expect(canonical!.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, "")).toBe(
        entry.link.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, "")
      );
    }
  });

  it("keeps the project subset short enough for a two-page document", () => {
    expect(cvProjects.length).toBeGreaterThanOrEqual(3);
    expect(cvProjects.length).toBeLessThanOrEqual(6);
  });

  it("states BCTNotes' current reach, not the stale figure", () => {
    const bctnotes = cvProjects.find((project) => project.name === "BCTNotes");

    expect(bctnotes?.description).toContain("14,000+");
    expect(bctnotes?.description).not.toContain("5 thousand");
  });

  it("groups skills without leaving a group empty", () => {
    expect(cvSkills.length).toBeGreaterThanOrEqual(5);
    for (const group of cvSkills) {
      expect(group.label).toBeTruthy();
      expect(group.items.length).toBeGreaterThan(0);
    }
  });

  it("keeps education to the entries worth a hiring reader's time", () => {
    expect(cvEducation.length).toBeGreaterThanOrEqual(1);
    expect(cvEducation[0].qualification).toContain("Computer Engineering");
    expect(cvEducation[0].details.join(" ")).toContain("Derm Meds");
  });

  it("lists awards and community work", () => {
    expect(cvAwards.length).toBeGreaterThanOrEqual(4);
  });
});

describe("ATS resume specification", () => {
  it("keeps the PDF single-column and text-first", () => {
    expect(resumeSpec.schema).toBe("resume-spec/v1");
    expect(resumeSpec.page.size).toBe("letter");
    expect(resumeSpec.page.footer.enabled).toBe(false);
    expect(resumeSpec.styles.summary.alignment).toBe("left");
    expect(resumeSpec.styles.bullet.fontSize).toBeGreaterThanOrEqual(9.5);
    expect(resumeSpec.styles.contact.fontSize).toBeGreaterThanOrEqual(8.9);
  });

  it("uses parser-friendly headings, dates, and skill separators", () => {
    const sections = resumeSpec.blocks.filter((block) => block.type === "section");
    const roles = resumeSpec.blocks.filter((block) => block.type === "role");
    const skills = resumeSpec.blocks.find((block) => block.type === "skills");

    for (const section of sections) {
      expect(section.title).toMatch(/^[A-Z& ]+$/);
      expect(section.title).not.toMatch(/(?:[A-Z] ){3,}[A-Z]/);
    }
    for (const role of roles) expect(role.period).toBeTruthy();
    for (const row of skills?.rows ?? []) {
      expect(row.items).toContain(",");
      expect(row.items).not.toContain(" | ");
    }
  });
});

describe("cv markdown twin", () => {
  const document = getMarkdownDocument("/cv");

  it("is served for /cv", () => {
    expect(document).not.toBeNull();
  });

  it("renders every section an agent needs", () => {
    const markdown = document!.markdown;

    for (const heading of [
      "## Experience",
      "## Selected projects",
      "## Technical skills",
      "## Education",
      "## Awards and community",
    ]) {
      expect(markdown).toContain(heading);
    }
  });

  it("includes every role and project", () => {
    const markdown = document!.markdown;

    for (const role of cvRoles) expect(markdown).toContain(role.company);
    for (const project of cvProjects) expect(markdown).toContain(project.name);
  });

  it("points at the PDF version", () => {
    expect(document!.markdown).toContain(person.resume);
  });

  it("carries no phone number", () => {
    expect(document!.markdown).not.toMatch(/\+?977[-\s]?\d/);
  });
});
