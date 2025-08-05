'use server';

import { GateCountGeoJSON } from "@/types";

export async function getGateCountData(): Promise<GateCountGeoJSON> {
  const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

  const response = await fetch(`${BACKEND_URL}/api/cnx/gate-count`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error('Failed to fetch gate count data');
  }

  return await response.json();
}