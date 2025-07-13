'use server';

import { LandPriceSubdGeoJSON } from '@/types/index';

export async function getLandPriceMapData(): Promise<LandPriceSubdGeoJSON> {
  const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

  const response = await fetch(`${BACKEND_URL}/api/land-price-subd/map-data`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error('Failed to fetch land price map data');
  }

  return await response.json();
}