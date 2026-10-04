import type { Metadata } from "next";
import { getSuburbMetadata, SuburbCityPageView } from "@/components/suburb-city-page-component";

export const metadata: Metadata = getSuburbMetadata("courbevoie");

export default function Page() {
  return <SuburbCityPageView slug="courbevoie" />;
}
