'use server';

import { EducationGeoJSON } from '@/types/index';

export async function getEducationData(): Promise<EducationGeoJSON> {
  const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

  const response = await fetch(`${BACKEND_URL}/api/cnx/education`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error('Failed to fetch education data');
  }

  return await response.json();
}