import Image from "next/image";
import React from "react";
import { cn } from "@/lib/utils";

// Captions are derived from the existing file names / alt text — edit freely.
const photos = [
  {
    src: "/kec-mentorship.jpeg",
    alt: "Speaking at a mentorship session",
    caption: "mentorship session at KEC",
    span: "col-span-2 sm:col-span-1",
    aspect: "aspect-[16/10] sm:aspect-[4/3]",
    priority: true,
  },
  {
    src: "/hack-a-week.jpg",
    alt: "Mentoring students during a workshop",
    caption: "hack-a-week workshop",
    aspect: "aspect-[4/3]",
  },
  {
    src: "/mentorship.jpg",
    alt: "Giving a presentation on stage",
    caption: "sharing what I've learned",
    aspect: "aspect-[4/3]",
  },
];

/** Fine horizontal scanlines — the CRT/print texture that sells the retro feel. */
const SCANLINES: React.CSSProperties = {
  backgroundImage:
    "repeating-linear-gradient(0deg, rgba(0,0,0,0.55) 0px, rgba(0,0,0,0.55) 1px, transparent 1px, transparent 3px)",
};

function Frame({
  index,
  caption,
  span,
  aspect,
  children,
}: {
  index: number;
  caption: string;
  span?: string;
  aspect?: string;
  children: React.ReactNode;
}) {
  const slug = String(index + 1).padStart(2, "0");

  return (
    <figure tabIndex={0} className={cn("group outline-none", span)}>
      <div
        className={cn(
          "relative w-full overflow-hidden border border-foreground/20 bg-muted",
          aspect,
          // Hard offset shadow instead of a soft blur — print, not material.
          "transition-[box-shadow,transform] duration-300 ease-out",
          "group-hover:-translate-x-0.5 group-hover:-translate-y-0.5",
          "group-focus-visible:-translate-x-0.5 group-focus-visible:-translate-y-0.5",
          "group-hover:shadow-[4px_4px_0_0_hsl(var(--foreground))]",
          "group-focus-visible:shadow-[4px_4px_0_0_hsl(var(--foreground))]",
          "motion-reduce:transform-none motion-reduce:transition-none"
        )}
      >
        {children}

        {/* Scanline overlay, eased off on hover so the photo can breathe */}
        <span
          aria-hidden
          style={SCANLINES}
          className={cn(
            "pointer-events-none absolute inset-0 opacity-30 mix-blend-multiply",
            "transition-opacity duration-500 group-hover:opacity-10",
            "dark:opacity-40 dark:mix-blend-screen dark:group-hover:opacity-15"
          )}
        />

        {/* Contact-sheet index chip */}
        <span className="pointer-events-none absolute left-0 top-0 bg-background px-1.5 py-0.5 font-mono text-[10px] leading-none text-foreground">
          {slug}
        </span>

        {/* Corner registration ticks */}
        <span
          aria-hidden
          className="pointer-events-none absolute bottom-1 right-1 h-2 w-2 border-b border-r border-foreground/40"
        />
      </div>

      <figcaption className="mt-2 font-mono text-[10px] leading-snug text-muted-foreground sm:text-[11px]">
        <span className="text-foreground/70">{slug}</span>
        <span className="px-1 text-muted-foreground/40">·</span>
        {caption}
      </figcaption>
    </figure>
  );
}

/** Shared photo treatment: desaturated by default, colour on hover. */
const STOCK = cn(
  "object-cover",
  "grayscale contrast-[1.15] brightness-[0.97] sepia-[0.25]",
  "transition-[filter,transform] duration-700 ease-out",
  "group-hover:grayscale-0 group-hover:sepia-0 group-hover:scale-[1.03]",
  "group-focus-visible:grayscale-0 group-focus-visible:sepia-0",
  "motion-reduce:transform-none motion-reduce:transition-none"
);

function PhotoGallery() {
  return (
    <div className="mx-auto max-w-3xl" id="photos">
      {/* Sheet header */}
      <div className="mb-4 flex items-baseline justify-between border-b border-foreground/15 pb-2 font-mono text-[11px] text-muted-foreground">
        <span className="text-foreground">contact sheet</span>
        <span>{photos.length + 1} frames · talks &amp; mentorship</span>
      </div>

      <div className="grid grid-cols-2 gap-x-3 gap-y-5 sm:grid-cols-3 sm:gap-x-4">
        {photos.map((photo, i) => (
          <Frame
            key={photo.src}
            index={i}
            caption={photo.caption}
            span={photo.span}
            aspect={photo.aspect}
          >
            <Image
              src={photo.src}
              alt={photo.alt}
              fill
              priority={photo.priority}
              sizes="(min-width: 768px) 245px, (min-width: 640px) 33vw, 50vw"
              className={STOCK}
            />
          </Frame>
        ))}

        <Frame
          index={photos.length}
          caption="community events, meetups and talks"
          span="col-span-2 sm:col-span-3"
          aspect="aspect-[16/9]"
        >
          <video
            autoPlay
            muted
            loop
            playsInline
            className={cn(STOCK, "h-full w-full")}
            poster="/community-event-video-poster.png"
          >
            <source src="/hero.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </Frame>
      </div>

      {/* Dashed rule reads more like a perforated film edge than a solid line */}
      <div className="mt-8 border-t border-dashed border-foreground/20 pt-3">
        <p className="font-mono text-[11px] leading-relaxed text-muted-foreground">
          mentorship sessions and talks — leading, helping peers, and sharing
          knowledge.
        </p>
      </div>
    </div>
  );
}

export default PhotoGallery;
