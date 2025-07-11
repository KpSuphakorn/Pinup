// 'use server';

export interface PopulationData {
  id: number;
  population: number;
  label: string;
  province: string;
  district: string;
  subdistrict: string;
}

export interface PopulationFeature {
  type: 'Feature';
  geometry: {
    type: 'Polygon';
    coordinates: number[][][];
  };
  properties: PopulationData;
}

export interface PopulationGeoJSON {
  type: 'FeatureCollection';
  features: PopulationFeature[];
}

export interface PopulationRange {
  range: number;
  min: number;
  max: number;
  label: string;
}

export interface PopulationRangeData {
  min: number;
  max: number;
  avg: number;
  ranges: PopulationRange[];
  total_ranges: number;
}

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