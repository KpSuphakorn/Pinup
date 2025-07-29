import { BoundProvinceGeoJSON } from "@/types/index";
import { api } from "../api";

export async function getBoundProvinceData(): Promise<BoundProvinceGeoJSON> {
  return api
    .get<BoundProvinceGeoJSON>("/cnx/bound-prov")
    .then((res) => res.data);
}
