import { api } from "@/libs/api";
import { LowDenseResAreaGeoJSON } from "./types";

export async function getLowDenseResAreaData(): Promise<LowDenseResAreaGeoJSON> {
  return api
    .get<LowDenseResAreaGeoJSON>("/cnx/low-dense-res-area")
    .then((res) => res.data);
}
