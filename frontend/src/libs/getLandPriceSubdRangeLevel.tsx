import { LandPriceSubdRange } from "@/mapLayers/landprice-subd/types";

export function getLandPriceSubdRangeLevel(
  landPrice: number,
  ranges: LandPriceSubdRange[]
): number {
  for (const range of ranges) {
    if (landPrice >= range.min && landPrice <= range.max) {
      return range.range;
    }
  }
  return 1; // Default level if no range matches
}
