import type { Metadata } from "next";
import { getSuburbMetadata, SuburbCityPageView } from "@/components/suburb-city-page-component";

export const metadata: Metadata = getSuburbMetadata("neuilly-sur-seine");

export default function Page() {
  return <SuburbCityPageView slug="neuilly-sur-seine" />;
}
