'use server';

import { GovernmentGeoJSON } from '@/types/index';

export async function getGovernmentData(): Promise<GovernmentGeoJSON> {
  const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

  const response = await fetch(`${BACKEND_URL}/api/cnx/government`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error('Failed to fetch government data');
  }

  return await response.json();
}