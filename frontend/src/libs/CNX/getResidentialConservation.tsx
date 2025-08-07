'use server';

import { ResidentialConservationGeoJSON } from '@/types/index';

export async function getResidentialConservationData(): Promise<ResidentialConservationGeoJSON> {
  const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

  const response = await fetch(`${BACKEND_URL}/api/cnx/residential_conservation`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error('Failed to fetch residential conservation data');
  }

  return await response.json();
}