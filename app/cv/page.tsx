import { person } from "@/config/site";
import { buildPageMetadata } from "@/lib/seo/metadata";

export const metadata = buildPageMetadata("/cv");

const resumePath = new URL(person.resume).pathname;

/**
 * The PDF is the canonical visual resume. The route embeds it directly so a
 * visitor sees the exact reviewed artifact instead of a second HTML layout
 * that can drift from the downloadable file.
 */
export default function CvPage() {
  return (
    <>
      <style>{viewerStyles}</style>

      <main className="cv-viewer-shell">
        <header className="cv-viewer-bar">
          <div>
            <p className="cv-viewer-kicker">Resume</p>
            <h1>{person.name}</h1>
          </div>

          <nav aria-label="Resume actions" className="cv-viewer-actions">
            <a href={resumePath} target="_blank" rel="noreferrer">
              Open PDF
            </a>
            <a href={resumePath} download="Aakrit-Subedi-CV.pdf">
              Download PDF
            </a>
          </nav>
        </header>

        <object
          aria-label={`${person.name} resume PDF`}
          className="cv-pdf"
          data={`${resumePath}#view=FitH&toolbar=1&navpanes=0`}
          type="application/pdf"
        >
          <div className="cv-pdf-fallback">
            <p>Your browser cannot display the PDF inline.</p>
            <a href={resumePath}>Open Aakrit Subedi&apos;s resume</a>
          </div>
        </object>
      </main>
    </>
  );
}

const viewerStyles = `
.cv-viewer-shell {
  width: min(100%, 76rem);
  margin: 0 auto;
  padding: 1.25rem 1rem 2rem;
}

.cv-viewer-bar {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 1rem;
  margin-bottom: 0.75rem;
}

.cv-viewer-kicker {
  margin: 0 0 0.15rem;
  font-family: var(--font-mono), monospace;
  font-size: 0.68rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: hsl(var(--muted-foreground));
}

.cv-viewer-bar h1 {
  margin: 0;
  font-size: clamp(1.35rem, 2vw, 1.75rem);
  font-weight: 600;
  letter-spacing: -0.025em;
}

.cv-viewer-actions {
  display: flex;
  gap: 0.5rem;
}

.cv-viewer-actions a {
  border: 1px solid hsl(var(--border));
  border-radius: 0.4rem;
  padding: 0.5rem 0.7rem;
  font-family: var(--font-mono), monospace;
  font-size: 0.7rem;
  color: hsl(var(--muted-foreground));
  transition: border-color 150ms ease, color 150ms ease, background 150ms ease;
}

.cv-viewer-actions a:hover {
  border-color: hsl(var(--foreground) / 0.35);
  background: hsl(var(--muted) / 0.55);
  color: hsl(var(--foreground));
}

.cv-pdf {
  display: block;
  width: 100%;
  height: calc(100dvh - 12rem);
  min-height: 44rem;
  border: 1px solid hsl(var(--border));
  border-radius: 0.5rem;
  background: #ececea;
  box-shadow: 0 1rem 3rem rgb(0 0 0 / 0.08);
}

.cv-pdf-fallback {
  display: grid;
  min-height: 20rem;
  place-content: center;
  gap: 0.75rem;
  padding: 2rem;
  text-align: center;
}

.cv-pdf-fallback p { margin: 0; color: hsl(var(--muted-foreground)); }
.cv-pdf-fallback a { text-decoration: underline; text-underline-offset: 0.2em; }

@media (max-width: 40rem) {
  .cv-viewer-shell { padding-inline: 0; }
  .cv-viewer-bar { align-items: flex-start; padding-inline: 1rem; }
  .cv-viewer-actions { flex-direction: column; }
  .cv-pdf { min-height: 38rem; border-inline: 0; border-radius: 0; }
}
`;
