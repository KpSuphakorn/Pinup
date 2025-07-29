import { api } from "@/libs/api";
import { LRTRouteGeoJSON } from "./types";

export async function getLRTRouteData(): Promise<LRTRouteGeoJSON> {
  return api.get<LRTRouteGeoJSON>("/cnx/LRT-route").then((res) => res.data);
}
