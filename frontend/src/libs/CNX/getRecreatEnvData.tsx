'use server';

import { RecreatEnvGeoJSON } from '@/types/index';

export async function getRecreatEnvData(): Promise<RecreatEnvGeoJSON> {
  const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

  const response = await fetch(`${BACKEND_URL}/api/cnx/recreat-env`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error('Failed to fetch recreate environment data');
  }

  return await response.json();
}