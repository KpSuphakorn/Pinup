import { BoundAmphoeGeoJSON } from "@/types";
import { api } from "../api";

export async function getBoundAmphoeData(): Promise<BoundAmphoeGeoJSON> {
  return api
    .get<BoundAmphoeGeoJSON>("/cnx/bound-amphoe")
    .then((res) => res.data);
}
