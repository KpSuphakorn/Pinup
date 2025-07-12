'use server';

import { PopulationRange } from "@/types";

export function getPopulationRangeLevel(population: number, ranges: PopulationRange[]): number {
  for (const range of ranges) {
    if (population >= range.min && population <= range.max) {
      return range.range;
    }
  }
  return 1;
}