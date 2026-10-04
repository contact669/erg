import type { Metadata } from "next";
import { getSuburbMetadata, SuburbCityPageView } from "@/components/suburb-city-page-component";

export const metadata: Metadata = getSuburbMetadata("les-lilas");

export default function Page() {
  return <SuburbCityPageView slug="les-lilas" />;
}
