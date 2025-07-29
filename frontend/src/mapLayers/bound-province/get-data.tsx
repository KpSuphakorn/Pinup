import { api } from "@/libs/api";
import { BoundProvinceGeoJSON } from "./types";

export async function getBoundProvinceData(): Promise<BoundProvinceGeoJSON> {
  return api
    .get<BoundProvinceGeoJSON>("/cnx/bound-prov")
    .then((res) => res.data);
}
