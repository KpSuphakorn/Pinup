'use server';

import { PopulationGeoJSON} from '@/types/index';

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
