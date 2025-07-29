import { api } from "@/libs/api";
import { BoundMunGeoJSON } from "./types";

export async function getBoundMunData(): Promise<BoundMunGeoJSON> {
  return api.get<BoundMunGeoJSON>("/cnx/bound-mun").then((res) => res.data);
}
