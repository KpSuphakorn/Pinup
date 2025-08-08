'use server';

import { Pop5564GeoJSON } from '@/types/index';

export async function getPop5564Data(year: number): Promise<Pop5564GeoJSON> {
  const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

  const response = await fetch(`${BACKEND_URL}/api/cnx/pop-55-64?year=${year}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error('Failed to fetch cnx population map data');
  }

  return await response.json();
}
