'use server'

import { PopulationRangeData } from "@/types";

export async function getPopulationRange(): Promise<PopulationRangeData> {
  const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

  const response = await fetch(`${BACKEND_URL}/api/population/range`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error('Failed to fetch population range data');
  }

  return await response.json();
}