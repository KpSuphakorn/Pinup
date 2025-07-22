'use server';

import { BoundAmphoeGeoJSON } from "@/types";

export async function getBoundAmphoeData(): Promise<BoundAmphoeGeoJSON> {
    const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

  const response = await fetch(`${BACKEND_URL}/api/cnx/bound-amphoe`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error('Failed to fetch bound amphoe data');
  }

  return await response.json();
}