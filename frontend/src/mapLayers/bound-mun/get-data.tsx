import { BoundMunGeoJSON } from "@/types/index";
import { api } from "../api";

export async function getBoundMunData(): Promise<BoundMunGeoJSON> {
  return api.get<BoundMunGeoJSON>("/cnx/bound-mun").then((res) => res.data);
}
