import { BoundTambonGeoJSON } from "@/types/index";
import { api } from "../api";

export async function getBoundTambonData(): Promise<BoundTambonGeoJSON> {
  return api
    .get<BoundTambonGeoJSON>("/cnx/bound-tambon")
    .then((res) => res.data);
}
