import type { Metadata } from "next";
import { getSuburbMetadata, SuburbCityPageView } from "@/components/suburb-city-page-component";

export const metadata: Metadata = getSuburbMetadata("saint-maur-des-fosses");

export default function Page() {
  return <SuburbCityPageView slug="saint-maur-des-fosses" />;
}
