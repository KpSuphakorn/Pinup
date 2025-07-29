import { api } from "@/libs/api";
import { LandPriceSubdGeoJSON } from "./types";

export async function getLandPriceMapData(): Promise<LandPriceSubdGeoJSON> {
  return api
    .get<LandPriceSubdGeoJSON>("/bkk/land-price-subd/map-data")
    .then((res) => res.data);
}
