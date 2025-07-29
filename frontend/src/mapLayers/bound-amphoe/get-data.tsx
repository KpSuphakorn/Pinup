import { api } from "@/libs/api";
import { BoundAmphoeGeoJSON } from "./types";

export async function getBoundAmphoeData(): Promise<BoundAmphoeGeoJSON> {
  return api
    .get<BoundAmphoeGeoJSON>("/cnx/bound-amphoe")
    .then((res) => res.data);
}
