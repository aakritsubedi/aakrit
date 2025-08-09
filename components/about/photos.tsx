import Image from "next/image";
import React from "react";
import { Separator } from "../ui/separator";

function PhotoCard({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={
        "relative rounded-xl overflow-hidden border bg-card shadow-sm " +
        className
      }
    >
      {children}
    </div>
  );
}

function PhotoGallery() {
  return (
    <div className="mx-auto max-w-3xl" id="photos">
      {/* First row: two photos */}
      <div className="grid grid-cols-2 gap-5 mb-4">
        <PhotoCard className="h-[220px] sm:h-[260px] md:h-[300px] lg:h-[260px]">
          <Image
            src="/mentorship.jpg"
            alt="Giving a presentation on stage"
            fill
            priority
            sizes="(min-width: 1024px) 50vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover"
          />
        </PhotoCard>
        <PhotoCard className="h-[220px] sm:h-[260px] md:h-[300px] lg:h-[260px]">
          <Image
            src="/hack-a-week.jpg"
            alt="Mentoring students during a workshop"
            fill
            sizes="(min-width: 1024px) 50vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover"
          />
        </PhotoCard>
      </div>

      {/* Second row: one centered video */}
      <div className="flex justify-center mb-4">
        <PhotoCard className="w-full h-[300px] sm:h-[375px]">
          <video
            autoPlay
            muted
            loop
            playsInline
            className="h-full w-full object-cover"
            poster="/community-event-video-poster.png"
          >
            <source src="/hero.mp4" type="video/mp4" />
            <source
              src="https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
              type="video/mp4"
            />
            Your browser does not support the video tag.
          </video>
        </PhotoCard>
      </div>

      {/* Third row: three photos */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-5">
        <PhotoCard className="h-[180px] sm:h-[200px] md:h-[220px]">
          <Image
            src="/kec-mentorship.jpeg"
            alt="Giving a presentation on stage"
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 33vw, 100vw"
            className="object-cover"
          />
        </PhotoCard>
        <PhotoCard className="h-[180px] sm:h-[200px] md:h-[220px]">
          <Image
            src="/hack-a-week.jpg"
            alt="Mentoring students during a workshop"
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 33vw, 100vw"
            className="object-cover"
          />
        </PhotoCard>
        <PhotoCard className="h-[180px] sm:h-[200px] md:h-[220px]">
          <Image
            src="/mentorship.jpg"
            alt="Giving a presentation on stage"
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 33vw, 100vw"
            className="object-cover"
          />
        </PhotoCard>
      </div>

      <div className="text-center my-4">
        <p className="text-gray-500 text-center">
          Mentorship sessions and talks — leading, helping peers, and sharing
          knowledge.
        </p>
      </div>

      <div className="flex items-center justify-center">
        <Separator className="my-8 w-40" />
      </div>
    </div>
  );
}

export default PhotoGallery;
