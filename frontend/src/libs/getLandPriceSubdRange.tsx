'use server';

import { LandPriceSubdRangeData } from "@/types";

export async function getLandPriceRange(): Promise<LandPriceSubdRangeData> {
  const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

  const response = await fetch(`${BACKEND_URL}/api/bkk/land-price-subd/range`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error('Failed to fetch land price range data');
  }

  return await response.json();
}