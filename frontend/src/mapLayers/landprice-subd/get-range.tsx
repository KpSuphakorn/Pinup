import { api } from "@/libs/api";
import { LandPriceSubdRangeData } from "./types";

export async function getLandPriceRange(): Promise<LandPriceSubdRangeData> {
  return api
    .get<LandPriceSubdRangeData>("/bkk/land-price-subd/range")
    .then((res) => res.data);
}
