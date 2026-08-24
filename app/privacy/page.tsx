import React from "react";

import { LongFormPageView } from "@/components/long-form-page";
import { privacyPage } from "@/config/pages";
import { buildPageMetadata } from "@/lib/seo/metadata";

export const metadata = buildPageMetadata("/privacy");

export default function PrivacyPage() {
  return <LongFormPageView page={privacyPage} />;
}
