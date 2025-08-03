import { api } from "@/libs/api";
import { RoadGeoJSON } from "./types";

export async function getRoadData(): Promise<RoadGeoJSON> {
  return api.get<RoadGeoJSON>("/cnx/road").then((res) => res.data);
}
