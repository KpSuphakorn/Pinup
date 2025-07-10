'use server';

export async function getOsmData() {
  const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

  const response = await fetch(`${BACKEND_URL}/api/osm-data`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch OSM data");
  }

  return await response.json();
}