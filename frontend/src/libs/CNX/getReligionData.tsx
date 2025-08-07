'use server';

import { ReligionGeoJSON } from '@/types/index';

export async function getReligionData(): Promise<ReligionGeoJSON> {
  const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

  const response = await fetch(`${BACKEND_URL}/api/cnx/religion`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error('Failed to fetch religion data');
  }

  return await response.json();
}