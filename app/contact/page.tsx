import React from "react";

import { LongFormPageView } from "@/components/long-form-page";
import { contactPage } from "@/config/pages";
import { buildPageMetadata } from "@/lib/seo/metadata";

export const metadata = buildPageMetadata("/contact");

export default function ContactPage() {
  return <LongFormPageView page={contactPage} />;
}
