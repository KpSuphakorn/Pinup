import { PopulationRangeData } from "@/types";
import { api } from "./api";

export async function getPopulationRange(): Promise<PopulationRangeData> {
  return api
    .get<PopulationRangeData>("/bkk/population/range")
    .then((res) => res.data);
}
