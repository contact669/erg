import type { Metadata } from "next";
import { getSuburbMetadata, SuburbCityPageView } from "@/components/suburb-city-page-component";

export const metadata: Metadata = getSuburbMetadata("nogent-sur-marne");

export default function Page() {
  return <SuburbCityPageView slug="nogent-sur-marne" />;
}
