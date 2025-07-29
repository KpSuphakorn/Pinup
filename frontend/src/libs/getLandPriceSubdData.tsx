import { LandPriceSubdGeoJSON } from "@/types/index";
import { api } from "./api";

export async function getLandPriceMapData(): Promise<LandPriceSubdGeoJSON> {
  return api
    .get<LandPriceSubdGeoJSON>("/bkk/land-price-subd/map-data")
    .then((res) => res.data);
}
