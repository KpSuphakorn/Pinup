import { LandPriceSubdRangeData } from "@/types";
import { api } from "./api";

export async function getLandPriceRange(): Promise<LandPriceSubdRangeData> {
  return api
    .get<LandPriceSubdRangeData>("/bkk/land-price-subd/range")
    .then((res) => res.data);
}
