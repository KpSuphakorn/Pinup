'use server';

import { RuralArgiGeoJSON } from '@/types/index';

export async function getRuralArgiData(): Promise<RuralArgiGeoJSON> {
  const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

  const response = await fetch(`${BACKEND_URL}/api/cnx/rural-argi`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error('Failed to fetch rural arigicultural data');
  }

  return await response.json();
}