'use server';

import { BoundTambonGeoJSON } from '@/types/index';

export async function getBoundTambonData(): Promise<BoundTambonGeoJSON> {
  const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

  const response = await fetch(`${BACKEND_URL}/api/cnx/bound-tambon`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error('Failed to fetch bound tambon data');
  }

  return await response.json();
}