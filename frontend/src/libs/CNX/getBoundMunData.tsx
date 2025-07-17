'use server';

import { BoundMunGeoJSON } from '@/types/index';

export async function getBoundMunData(): Promise<BoundMunGeoJSON> {
  const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

  const response = await fetch(`${BACKEND_URL}/api/cnx/bound-mun`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error('Failed to fetch bound municipality data');
  }

  return await response.json();
}