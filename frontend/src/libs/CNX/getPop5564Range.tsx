'use server'

import { Pop5564RangeData } from "@/types";

export async function getPop5564Range(): Promise<Pop5564RangeData> {
  const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

  const response = await fetch(`${BACKEND_URL}/api/cnx/pop-55-64/range`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error('Failed to fetch cnx population range data');
  }

  return await response.json();
}