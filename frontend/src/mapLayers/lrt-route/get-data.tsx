import { LRTRouteGeoJSON } from "@/types";
import { api } from "../api";

export async function getLRTRouteData(): Promise<LRTRouteGeoJSON> {
  return api.get<LRTRouteGeoJSON>("/cnx/LRT-route").then((res) => res.data);
}
