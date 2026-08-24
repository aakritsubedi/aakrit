import React from "react";

import { LongFormPageView } from "@/components/long-form-page";
import { aboutPage } from "@/config/pages";
import { buildPageMetadata } from "@/lib/seo/metadata";

export const metadata = buildPageMetadata("/about");

export default function AboutPage() {
  return <LongFormPageView page={aboutPage} />;
}
