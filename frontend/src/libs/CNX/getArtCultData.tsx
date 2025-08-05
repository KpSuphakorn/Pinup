'use server';

import { ArtCultGeoJSON } from '@/types/index';

export async function getArtCultData(): Promise<ArtCultGeoJSON> {
  const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

  const response = await fetch(`${BACKEND_URL}/api/cnx/art-cult`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error('Failed to fetch art & cultural data');
  }

  return await response.json();
}