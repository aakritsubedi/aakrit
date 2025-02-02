import { Hero } from "@/components/hero";
import { Experience } from "@/components/experience";
import { Projects } from "@/components/projects";
import { Blog } from "@/components/blog";
import { Contact } from "@/components/contact";
import { Education } from "@/components/education";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Hero />
      <Experience />
      <Education />
      <Projects />
      <Blog />
      <Contact />
    </div>
  );
}
