import { api } from "@/libs/api";
import { PopulationRangeData } from "./types";

export async function getPopulationRange(): Promise<PopulationRangeData> {
  return api
    .get<PopulationRangeData>("/bkk/population/range")
    .then((res) => res.data);
}
