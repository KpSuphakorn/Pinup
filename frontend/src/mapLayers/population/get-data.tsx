import { PopulationGeoJSON } from "@/types/index";
import { api } from "./api";

export async function getPopulationMapData(): Promise<PopulationGeoJSON> {
  return api
    .get<PopulationGeoJSON>("/bkk/population/map-data")
    .then((res) => res.data);
}
