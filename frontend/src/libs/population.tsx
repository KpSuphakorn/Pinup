// 'use server';

import { PopulationGeoJSON, PopulationRange, PopulationRangeData } from '@/types/index';

// ฟังก์ชันสำหรับดึงข้อมูล population map data
export async function getPopulationMapData(): Promise<PopulationGeoJSON> {
  const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

  const response = await fetch(`${BACKEND_URL}/api/population/map-data`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error('Failed to fetch population map data');
  }

  return await response.json();
}

// ฟังก์ชันสำหรับดึงข้อมูล population range
export async function getPopulationRange(): Promise<PopulationRangeData> {
  const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

  const response = await fetch(`${BACKEND_URL}/api/population/range`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error('Failed to fetch population range data');
  }

  return await response.json();
}

// ฟังก์ชันสำหรับหา range ของ population
export function getPopulationRangeLevel(population: number, ranges: PopulationRange[]): number {
  for (const range of ranges) {
    if (population >= range.min && population <= range.max) {
      return range.range;
    }
  }
  return 1; // default range
}