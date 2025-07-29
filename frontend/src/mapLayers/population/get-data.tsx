import { api } from "@/libs/api";
import { PopulationGeoJSON } from "./types";

export async function getPopulationMapData(): Promise<PopulationGeoJSON> {
  return api
    .get<PopulationGeoJSON>("/bkk/population/map-data")
    .then((res) => res.data);
}
