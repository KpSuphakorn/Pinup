'use server';

import { Pop5564Range } from "@/types";

export function getPop5564RangeLevel(population: number, ranges: Pop5564Range[]): number {
  for (const range of ranges) {
    if (population >= range.min && population <= range.max) {
      return range.range;
    }
  }
  return 1;
}