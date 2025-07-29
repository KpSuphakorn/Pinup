import { api } from "@/libs/api";
import { BoundTambonGeoJSON } from "./types";

export async function getBoundTambonData(): Promise<BoundTambonGeoJSON> {
  return api
    .get<BoundTambonGeoJSON>("/cnx/bound-tambon")
    .then((res) => res.data);
}
