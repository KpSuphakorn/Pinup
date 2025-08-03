import { api } from "@/libs/api";
import { ArtCultGeoJSON } from "./types";

export async function getArtCultData(): Promise<ArtCultGeoJSON> {
  return api.get<ArtCultGeoJSON>("/cnx/art-cult").then((res) => res.data);
}
